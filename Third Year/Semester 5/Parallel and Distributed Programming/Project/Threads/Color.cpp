#include "Color.h"

Color::Color(int n) : ColorNumber(n) {
    // Initialize the colors map with an empty string for each color
    for (int code = 0; code < n; code++) {
        colors[code] = "";
    }
}

std::map<int, std::string> Color::getColors() const {
    return colors;
}

void Color::addColor(int code, const std::string& name) {
    colors[code] = name;
}

std::string Color::getColor(int code) const {
    // Find the color in the map and return it
    auto it = colors.find(code);

    if (it != colors.end()) {
        return it->second;
    }

    return "";
}

int Color::getColorNumber() const {
    return ColorNumber;
}

std::map<int, std::string> Color::getColorsForCodes(const std::vector<int>& codes) const {
    // Create a map of the colors for the given codes and return it
    std::map<int, std::string> result; // The map to return

    for (size_t i = 0; i < codes.size(); i++) {
        // Get the color for the code and add it to the map
        std::string color = colors.at(codes[i]); // The color for the code
        result[i] = color; // Add the color to the map
    }

    return result;
}