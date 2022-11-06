#include "Domain.h"
#include <vector>
#include <sstream>
#include <utility>

TrenchCoat::TrenchCoat(int size, std::string colour, int price, int quantity, std::string photograph) {
	/// Constructor method for the TrenchCoat class
	/// \param size - the size of the trench coat, 0 by default
	/// \param colour - the colour of the trench coat, "empty" by default
	/// \param price - the price of the trench coat, 0 by default
	/// \param quantity - the quantity of the trench coat, 0 by default
	/// \param photograph - the link of the photo of the trench coat, "empty" by default

	if (price < 0) {
		throw "Price can't be smaller than 0!";
	}

	this->size = size;
	this->colour = std::move(colour);
	this->price = price;
	this->quantity = quantity;
	this->photograph = std::move(photograph);
}

int TrenchCoat::sizeGetter() const {
	/// Getter method for the size
	/// \return - the size of the trench coat

	return this->size;
}

std::string TrenchCoat::colourGetter() const {
	/// Getter method for the colour
	/// \return - the colour of the trench coat

	return this->colour;
}

int TrenchCoat::priceGetter() const {
	/// Getter method for the price
	/// \return - the price of the trench coat

	return this->price;
}

int TrenchCoat::quantityGetter() const {
	/// Getter method for the quantity
	/// \return - the quantity of the trench coat

	return this->quantity;
}

std::string TrenchCoat::photographGetter() const {
	/// Getter method for the photograph
	/// \return - the link of the photo of the trench coat

	return this->photograph;
}

/// Destructor of the class
TrenchCoat::~TrenchCoat() = default;

std::string TrenchCoat::toString() const {
	/// Method to format an entity into a string
	/// \return - the string format of a trench coat

	auto string_size = std::to_string(this->size);
	auto string_price = std::to_string(this->price);
	auto string_quantity = std::to_string(this->quantity);

	return "Size: " + string_size + " | Colour: " + this->colour + " | Price: " + string_price + "$" + " | Quantity: "
		   + string_quantity + " | Photograph link: " + this->photograph;
}

std::string TrenchCoat::toStringUser() const {
	/// Method to format an entity into a string
	/// \return - the string format of a trench coat in User Mode

	auto string_size = std::to_string(this->size);
	auto string_price = std::to_string(this->price);

	return "Size: " + string_size + " | Colour: " + this->colour + " | Price: " + string_price + "$" +
		   " | Photograph link: " + this->photograph;
}

std::string TrenchCoat::toStringGUI() const {
	/// Method to format an entity into a string
	/// \return - the string format of a trench coat in GUI

	auto string_size = std::to_string(this->size);
	return "Size: " + string_size + " | Colour: " + this->colour;
}

bool TrenchCoat::operator==(const TrenchCoat &trenchCoatToCheck) const {
	/// Operator for identifying a trench coat

	return this->size == trenchCoatToCheck.size && this->colour == trenchCoatToCheck.colour;
}

std::vector<std::string> tokenize(const std::string &string, char delimiter) {
	/// Function used for delimitating the object from a TrenchCoat class
	/// \param string - the object from TrenchCoat class
	/// \param delimiter - the delimitator, in our case is ','

	std::vector<std::string> result;
	std::stringstream stringstream(string);
	std::string token;

	while (std::getline(stringstream, token, delimiter))
		result.push_back(token);

	return result;
}

std::istream &operator>>(std::istream &inputStream, TrenchCoat &trenchCoat) {
	/// Function for input file

	std::string line;
	std::getline(inputStream, line);
	std::vector<std::string> tokens;

	if (line.empty())
		return inputStream;

	tokens = tokenize(line, ',');
	trenchCoat.size = std::stoi(tokens[0]);
	trenchCoat.colour = tokens[1];
	trenchCoat.price = std::stoi(tokens[2]);
	trenchCoat.quantity = std::stoi(tokens[3]);
	trenchCoat.photograph = tokens[4];

	return inputStream;
}

std::ostream &operator<<(std::ostream &outputStream, TrenchCoat &trenchCoat) {
	/// Function for output file

	outputStream << std::to_string(trenchCoat.size) << "," << trenchCoat.colour << ","
				 << std::to_string(trenchCoat.price) << "," << std::to_string(trenchCoat.quantity) << ","
				 << trenchCoat.photograph;

	return outputStream;
}
