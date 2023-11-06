import Foundation

class ListViewModel: ObservableObject {
    @Published var cats: [Cat] = []
    
    @Published var selectedCatIndex: Int?
    
    init() {
        getCats()
    }
    
    func getCats() {
        let newCats = [
            Cat(name: "Whiskers", breed: "Siamese", gender: "Male", age: "38 months", healthProblem: "None", description: "A playful Siamese cat with a love for climbing."),
            Cat(name: "Fluffy", breed: "Persian", gender: "Female", age: "56 months", healthProblem: "Asthma", description: "A beautiful and fluffy Persian cat with a gentle temperament."),
            Cat(name: "Simba", breed: "Bombay", gender: "Male", age: "25 months", healthProblem: "None", description: "A Bombay cat with a sleek black coat and a lot of energy."),
            Cat(name: "Luna", breed: "British Shorthair", gender: "Female", age: "40 months", healthProblem: "Obesity", description: "A British Shorthair cat known for its round face and dense coat."),
            Cat(name: "Tiger", breed: "Scottish Fold", gender: "Male", age: "1 month", healthProblem: "Allergies", description: "An adorable Scottish Fold cat with folded ears and a sweet personality."),
            Cat(name: "Winny", breed: "Siamese", gender: "Male", age: "3 months", healthProblem: "Arthritis", description: "An affectionate Siamese cat who enjoys cuddles."),
            Cat(name: "Mimi", breed: "Toyger", gender: "Female", age: "15 months", healthProblem: "Diabetes", description: "A Toyger cat with tiger-like stripes and a loving nature."),
            Cat(name: "Joe", breed: "Munchkin", gender: "Male", age: "22 months", healthProblem: "Hip Dysplasia", description: "A Munchkin cat known for its short legs and playful antics."),
            Cat(name: "Clara", breed: "Bombay", gender: "Female", age: "14 months", healthProblem: "None", description: "A Bombay cat with a striking black coat."),
            Cat(name: "Spyke", breed: "Ginger Tabby", gender: "Male", age: "19 months", healthProblem: "Food Allergies", description: "A Bengal cat with wild and spotted coat patterns.")
        ]
        
        cats.append(contentsOf: newCats)
    }
    
    func deleteCat(indexSet: IndexSet) {
        cats.remove(atOffsets: indexSet)
    }
    
    func addCat(name: String, breed: String, gender: String, age: String, healthProblem: String, description: String) {
        let newCat = Cat(name: name, breed: breed, gender: gender, age: age, healthProblem: healthProblem, description: description)
        cats.append(newCat)
    }
    
    func updateCat(cat: Cat) {
        if let index = cats.firstIndex(where: { $0.id == cat.id }) {
            cats[index] = cat.updateCompletation()
        }
    }
}
