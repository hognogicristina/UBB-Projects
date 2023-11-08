import SwiftUI

struct ListRowView: View {
    let cat: Cat
    
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text(cat.name)
                    .font(.system(size: 18))
                    .fontWeight(.bold)
                    .foregroundColor(.blue)
                Text("Breed: \(cat.breed)")
                    .font(.system(size: 15))
                Text("Gender: \(cat.gender)")
                    .font(.system(size: 15))
                Text("Age: \(cat.age)")
                    .font(.system(size: 15))
            }
        }
    }
}

struct ListRowView_Previews: PreviewProvider {
    static var cat1 = Cat(name: "Fluffy", breed: "Persian", gender: "Female", age: "5 months", healthProblem: "Asthma", description: "A beautiful and fluffy Persian cat with a gentle temperament.")
    
    static var cat2 = Cat(name: "Simba", breed: "Bombay", gender: "Male", age: "2 months", healthProblem: "None", description: "A Bombay cat with a sleek black coat and a lot of energy.")
    
    static var previews: some View {
        Group {
            ListRowView(cat: cat1)
            ListRowView(cat: cat2)
        }
    }
}
