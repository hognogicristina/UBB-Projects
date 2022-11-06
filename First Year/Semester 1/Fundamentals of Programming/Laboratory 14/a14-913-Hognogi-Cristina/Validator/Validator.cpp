#include "Validator.h"

ValidationException::ValidationException(std::string &_message) : message(_message) {
	/// Constructor for the ValidationException class
	/// \param message - the message to be shown
}

const char *ValidationException::what() const noexcept {
	/// Call exception for the validator class

	return message.c_str();
}

bool TrenchCoatValidator::validateString(const std::string &input) {
	/// Validator for the string
	/// \param input - the string element entered

	for (char i: input)
		if (isdigit(i) != false)
			return false;

	return true;
}

void TrenchCoatValidator::validateSizeString(const std::string &size) {
	/// Validator for size string
	/// \param size - the specific size entered (string form)

	std::string errors;

	if (size.empty())
		errors += std::string("The size input is empty!\n");

	if (size.find_first_not_of("0123456789") != std::string::npos)
		errors += std::string("The size input has non-digit characters!\n");

	if (!errors.empty())
		throw ValidationException(errors);
}

void TrenchCoatValidator::validateSize(int size) {
	/// Validator for size
	/// \param size - the specific size entered (integer form)

	std::string errors;

	if (size < 30)
		errors += std::string("Size can't be smaller than 30!\n");

	if (size > 48)
		errors += std::string("Size can't be bigger than 48!\n");

	if (size % 2 == 1)
		errors += std::string("Size it can be only between 30 and 48 of numbers divisible with two!\n");

	if (!errors.empty())
		throw ValidationException(errors);
}

void TrenchCoatValidator::validateColour(const std::string &colour) {
	/// Validator for colour
	/// \param colour - the specific colour entered

	std::string errors;

	if (!validateString(colour))
		errors += std::string("The colour input contains digits!\n");

	if (colour.length() == 0)
		errors += std::string("The colour input is empty!\n");

	if (!isupper(colour[0]))
		errors += std::string("The colour should start with a capital letter!");

	if (!errors.empty())
		throw ValidationException(errors);
}

void TrenchCoatValidator::validatePriceString(const std::string &price) {
	/// Validator for price string
	/// \param price - the specific price entered (string form)

	std::string errors;

	if (price.empty())
		errors += std::string("The price input is empty!\n");

	if (price.find_first_not_of("0123456789") != std::string::npos)
		errors += std::string("The price input has non-digit characters!\n");

	if (!errors.empty())
		throw ValidationException(errors);
}

void TrenchCoatValidator::validatePrice(int price) {
	/// Validator for price
	/// \param price - the specific price entered (integer form)

	std::string errors;

	if (price < 0)
		errors += std::string("Price can't be smaller than 0!\n");

	if (price > 100)
		errors += std::string("Price can't be bigger than 100!\n");

	if (!errors.empty())
		throw ValidationException(errors);
}

void TrenchCoatValidator::validateQuantityString(const std::string &quantity) {
	/// Validator for quantity string
	/// \param quantity - the specific quantity entered (string form)

	std::string errors;

	if (quantity.empty())
		errors += std::string("The quantity input is empty!\n");

	if (quantity.find_first_not_of("0123456789") != std::string::npos)
		errors += std::string("The quantity input has non-digit characters!\n");

	if (!errors.empty())
		throw ValidationException(errors);
}

void TrenchCoatValidator::validateQuantity(int quantity) {
	/// Validator for size
	/// \param size - the specific size entered (integer form)

	std::string errors;

	if (quantity < 0)
		errors += std::string("Quantity can't be smaller than 0!\n");

	if (quantity > 100)
		errors += std::string("Quantity can't be bigger than 50!\n");

	if (!errors.empty())
		throw ValidationException(errors);
}

void TrenchCoatValidator::validatePhotoLink(const std::string &photograph) {
	/// Validator for photograph
	/// \param photograph - the specific photograph entered

	std::string errors;

	if (photograph.length() == 0)
		errors += std::string("The link input is empty!\n");

	if (photograph.find("d1flfk77wl2xk4") == std::string::npos)
		errors += std::string("The link is not a valid one!\n");

	if (!errors.empty())
		throw ValidationException(errors);
}

