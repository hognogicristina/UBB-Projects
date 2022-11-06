#ifndef A11_12_913_HOGNOGI_CRISTINA_VALIDATOR_H
#define A11_12_913_HOGNOGI_CRISTINA_VALIDATOR_H

#include "../Domain/Domain.h"

class ValidationException: public std::exception {
private:
	std::string message;
public:
	explicit ValidationException(std::string& _message);
	const char *what() const noexcept override;
};

class TrenchCoatValidator {
public:
	TrenchCoatValidator() = default;

	bool validateString(const std::string& input);

	void validateSizeString(const std::string& size);
	void validateSize(int size);

	void validateColour(const std::string& colour);

	void validatePriceString(const std::string& price);
	void validatePrice(int price);

	void validateQuantityString(const std::string& quantity);
	void validateQuantity(int quantity);

	void validatePhotoLink(const std::string& photograph);
};

#endif //A11_12_913_HOGNOGI_CRISTINA_VALIDATOR_H
