import Foundation
import Combine

class ListViewModel: ObservableObject {
    @Published var cats: [Cat] = []
    @Published var errorMessage: String?

    private var cancellables = Set<AnyCancellable>()

    init() {
        CatDataStore.shared.$dataChanged
            .sink { [weak self] _ in
                self?.getCats()
            }
            .store(in: &cancellables)
        getCats()
    }

    func getCats() {
        CatDataStore.shared.getAllAsync { [weak self] result in
            switch result {
            case .success(let cats):
                self?.cats = cats
            case .failure(let error):
                self?.errorMessage = error.localizedDescription
            }
        }
    }

    func deleteCat(indexSet: IndexSet) {
        if let idString = indexSet.map({ self.cats[$0].id }).first,
           let id = Int64(idString) {
            do {
                _ = try CatDataStore.shared.delete(id: id)
            } catch let error as DatabaseError {
                errorMessage = error.localizedDescription
            } catch {
                errorMessage = "An unknown error occurred."
            }
        }
    }


    func addCat(name: String, breed: String, gender: String, age: String, healthProblem: String, description: String) {
        do {
            _ = try CatDataStore.shared.insert(
                name: name,
                breed: breed,
                gender: gender,
                age: age,
                healthProblem: healthProblem,
                description: description
            )
        } catch let error as DatabaseError {
            errorMessage = error.localizedDescription
        } catch {
            errorMessage = "An unknown error occurred."
        }
    }

    func updateCat(cat: Cat) {
        if let catIdInt64 = Int64(cat.id) {
            do {
                _ = try CatDataStore.shared.update(
                    id: catIdInt64,
                    name: cat.name,
                    breed: cat.breed,
                    gender: cat.gender,
                    age: cat.age,
                    healthProblem: cat.healthProblem,
                    description: cat.description
                )
            } catch let error as DatabaseError {
                errorMessage = error.localizedDescription
            } catch {
                errorMessage = "An unknown error occurred."
            }
        }
    }
}
