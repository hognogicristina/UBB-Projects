import Foundation

class ListViewModel: ObservableObject {
    @Published var cats: [Cat] = [] {
        didSet {
            saveCats()
        }
    }
    
    @Published var selectedCatIndex: Int?
    
    init() {
        getCats()
    }
    
    let catsKey: String = "cats_list"
    
    func getCats() {
        guard
            let data = UserDefaults.standard.data(forKey: catsKey),
            let savedCats = try? JSONDecoder().decode([Cat].self, from: data)
        else { return }
        
        self.cats = savedCats
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
    
    func saveCats() {
        if let encodedData = try? JSONEncoder().encode(cats) {
            UserDefaults.standard.set(encodedData, forKey: catsKey)
        }
    }
}
