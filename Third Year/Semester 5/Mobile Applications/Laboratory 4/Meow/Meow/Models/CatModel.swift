import Foundation

struct Cat: Identifiable, Equatable, Codable {
    var id: String
    var name: String
    var breed: String
    var gender: String
    var age: String
    var healthProblem: String
    var description: String
    
    init(id: String = UUID().uuidString, name: String, breed: String, gender: String, age: String, healthProblem: String, description: String) {
        self.id = id
        self.name = name
        self.breed = breed
        self.gender = gender
        self.age = age
        self.healthProblem = healthProblem
        self.description = description
    }
}

