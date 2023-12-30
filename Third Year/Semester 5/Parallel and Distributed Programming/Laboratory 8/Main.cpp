#include <iostream>
#include <vector>
#include <set>
#include <thread>
#include <chrono>
#include <cstring>
#include <map>
#include <mpi.h>

class BaseMessage {
public:
    virtual ~BaseMessage() {}
};

class CloseMessage : public BaseMessage {};

class SubscribeMessage : public BaseMessage {
public:
    std::string variable;
    int rank;

    SubscribeMessage(const std::string& variable, int rank)
            : variable(variable), rank(rank) {}
};

class UpdateMessage : public BaseMessage {
public:
    std::string variable;
    int value;

    UpdateMessage(const std::string& variable, int value)
            : variable(variable), value(value) {}
};

class DSM {
private:
    std::map<std::string, std::set<int>> subscribers;
    std::map<std::string, int> variables;
    MPI_Comm communicator;

public:
    DSM(MPI_Comm comm) : communicator(comm) {
        variables["first"] = 0;
        variables["second"] = 1;
        variables["third"] = 2;

        subscribers["first"] = std::set<int>();
        subscribers["second"] = std::set<int>();
        subscribers["third"] = std::set<int>();
    }

    void setVariable(const std::string& variable, int value) {
        MPI_Barrier(communicator);
        variables[variable] = value;
        MPI_Barrier(communicator);
    }

    void updateVariable(const std::string& variable, int value) {
        setVariable(variable, value);
        sendMessageToSubscribers(variable, UpdateMessage(variable, value));
    }

    void checkAndReplace(const std::string& variable, int oldValue, int newValue) {
        MPI_Barrier(communicator);
        if (variables[variable] == oldValue) {
            updateVariable(variable, newValue);
        }
        MPI_Barrier(communicator);
    }

    void subscribeTo(const std::string& variable) {
        subscribers[variable].insert(MPI::COMM_WORLD.Get_rank());
        syncSubscription(variable, MPI::COMM_WORLD.Get_rank());
    }

    void syncSubscription(const std::string& variable, int rank) {
        subscribers[variable].insert(rank);
    }

    void sendMessageToSubscribers(const std::string& variable, const BaseMessage& message) {
        for (int i = 0; i < MPI::COMM_WORLD.Get_size(); i++) {
            if (MPI::COMM_WORLD.Get_rank() == i || subscribers[variable].count(i) == 0) {
                continue;
            }

            // Serialize the message into a buffer
            std::vector<char> messageData(sizeof(SubscribeMessage));
            memcpy(messageData.data(), &message, sizeof(SubscribeMessage));

            MPI_Send(messageData.data(), messageData.size(), MPI_CHAR, i, 0, MPI_COMM_WORLD);
        }
    }

    void sendMessageToAll(const BaseMessage& message) {
        for (int i = 0; i < MPI::COMM_WORLD.Get_size(); i++) {
            if (MPI::COMM_WORLD.Get_rank() == i && !dynamic_cast<const CloseMessage*>(&message)) {
                continue;
            }

            // Serialize the message into a buffer
            std::vector<char> messageData(sizeof(SubscribeMessage));
            memcpy(messageData.data(), &message, sizeof(SubscribeMessage));

            MPI_Send(messageData.data(), messageData.size(), MPI_CHAR, i, 0, MPI_COMM_WORLD);
        }
    }

    void close() {
        sendMessageToAll(CloseMessage());
    }

    friend std::ostream& operator<<(std::ostream& os, const DSM& dsm) {
        os << "DSM: \n";
        for (const auto& entry : dsm.subscribers) {
            os << "subscribers[" << entry.first << "] = ";
            for (int rank : entry.second) {
                os << rank << " ";
            }
            os << "\n";
        }
        os << "variables = ";
        for (const auto& variable : dsm.variables) {
            os << variable.first << ":" << variable.second << " ";
        }
        os << "\n";
        return os;
    }
};

class Subscriber {
private:
    DSM& dsm;

public:
    Subscriber(DSM& dsm) : dsm(dsm) {}

    void run() {
        while (true) {
            int rank;
            MPI_Status status;
            char buffer[sizeof(BaseMessage)];

            std::cout << MPI::COMM_WORLD.Get_rank() << " is waiting" << std::endl;

            MPI_Recv(buffer, sizeof(BaseMessage), MPI_CHAR, MPI_ANY_SOURCE, MPI_ANY_TAG, MPI_COMM_WORLD, &status);

            if (status.MPI_TAG == CloseMessageTag) {
                std::cout << MPI::COMM_WORLD.Get_rank() << " stopped" << std::endl;
                break;
            } else if (status.MPI_TAG == SubscribeMessageTag) {
                SubscribeMessage subscribeMessage;
                memcpy(&subscribeMessage, buffer, sizeof(SubscribeMessage));
                std::cout << "Subscriber message in " << MPI::COMM_WORLD.Get_rank() << ": " << subscribeMessage.rank << " subscribes to " << subscribeMessage.variable << std::endl;
                this->dsm.syncSubscription(subscribeMessage.variable, subscribeMessage.rank);
            } else if (status.MPI_TAG == UpdateMessageTag) {
                UpdateMessage updateMessage;
                memcpy(&updateMessage, buffer, sizeof(UpdateMessage));
                std::cout << "Update message in " << MPI::COMM_WORLD.Get_rank() << ": " << updateMessage.variable << "->" << updateMessage.value << std::endl;
                this->dsm.setVariable(updateMessage.variable, updateMessage.value);
            }
        }

        std::cout << "Final " << MPI::COMM_WORLD.Get_rank() << " - " << this->dsm << std::endl;
    }
};

const int CloseMessageTag = 0;
const int SubscribeMessageTag = 1;
const int UpdateMessageTag = 2;

int main(int argc, char** argv) {
    MPI_Init(&argc, &argv);
    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    int size;
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    DSM dsm(MPI_COMM_WORLD);

    std::cout << "Start " << rank << " of " << size << std::endl;

    if (rank == 0) {
        std::thread subscriberThread([&]() {
            Subscriber subscriber(dsm);
            subscriber.run();
        });

        subscriberThread.detach();

        dsm.subscribeTo("first");
        std::this_thread::sleep_for(std::chrono::seconds(1));
        dsm.subscribeTo("second");
        std::this_thread::sleep_for(std::chrono::seconds(1));
        dsm.subscribeTo("third");
        std::this_thread::sleep_for(std::chrono::seconds(1));
        dsm.checkAndReplace("first", 0, 10);
        std::this_thread::sleep_for(std::chrono::seconds(1));
        dsm.checkAndReplace("third", 2, 30);
        std::this_thread::sleep_for(std::chrono::seconds(1));
        dsm.checkAndReplace("second", 1, 50);
        std::this_thread::sleep_for(std::chrono::seconds(1));
        dsm.close();
        std::this_thread::sleep_for(std::chrono::seconds(1));
    } else if (rank == 1) {
        std::thread subscriberThread([&]() {
            Subscriber subscriber(dsm);
            subscriber.run();
        });

        subscriberThread.detach();

        dsm.subscribeTo("first");
        std::this_thread::sleep_for(std::chrono::seconds(1));
        dsm.subscribeTo("third");
        std::this_thread::sleep_for(std::chrono::seconds(1));
    } else if (rank == 2) {
        std::thread subscriberThread([&]() {
            Subscriber subscriber(dsm);
            subscriber.run();
        });

        subscriberThread.detach();

        // Uncomment if needed:
        // dsm.subscribeTo("third");
        // std::this_thread::sleep_for(std::chrono::seconds(1));
        dsm.subscribeTo("second");
        std::this_thread::sleep_for(std::chrono::seconds(1));
        dsm.checkAndReplace("second", 1, 50);
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    MPI_Finalize();
    return 0;
}
