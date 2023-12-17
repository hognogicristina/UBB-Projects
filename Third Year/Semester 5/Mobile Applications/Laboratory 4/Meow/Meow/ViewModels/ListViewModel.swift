import Foundation
import Combine

class ListViewModel: ObservableObject {
    @Published var cats: [Cat] = []
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
        cats = CatDataStore.shared.getAll()
    }
    
    func deleteCat(indexSet: IndexSet) {
        if let idString = indexSet.map({ self.cats[$0].id }).first,
           let id = Int64(idString) {
            _ = CatDataStore.shared.delete(id: id)
        }
    }

    
    func addCat(name: String, breed: String, gender: String, age: String, healthProblem: String, description: String) {
        _ = CatDataStore.shared.insert(name: name, breed: breed, gender: gender, age: age, healthProblem: healthProblem, description: description)
    }
    
    func updateCat(cat: Cat) {
        if let catIdInt64 = Int64(cat.id) {
            _ = CatDataStore.shared.update(
                id: catIdInt64,
                name: cat.name,
                breed: cat.breed,
                gender: cat.gender,
                age: cat.age,
                healthProblem: cat.healthProblem,
                description: cat.description
            )
        }
    }

}
