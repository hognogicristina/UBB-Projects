#ifndef A11_12_913_HOGNOGI_CRISTINA_DOMAIN_H
#define A11_12_913_HOGNOGI_CRISTINA_DOMAIN_H

#pragma once
#include <string>

class TrenchCoat {
private:
	int size;
	std::string colour;
	int price;
	int quantity;
	std::string photograph;

public:
	explicit TrenchCoat(int size = 0, std::string colour = "empty", int price = 0, int quantity = 0, std::string photograph = "empty");

	int sizeGetter() const;
	std::string colourGetter() const;
	int priceGetter() const;
	int quantityGetter() const;
	std::string photographGetter() const;

	~TrenchCoat();

	std::string toString() const;
	std::string toStringUser() const;
	std::string toStringGUI() const;

	bool operator==(const TrenchCoat &trenchCoatToCheck) const;
	friend std::istream &operator>>(std::istream &inputStream, TrenchCoat &trenchCoat);
	friend std::ostream &operator<<(std::ostream &outputStream, TrenchCoat &trenchCoat);
};

#endif //A11_12_913_HOGNOGI_CRISTINA_DOMAIN_H
