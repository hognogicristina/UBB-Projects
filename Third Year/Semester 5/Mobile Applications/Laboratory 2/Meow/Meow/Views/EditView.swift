import SwiftUI

struct EditView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var listViewModel: ListViewModel

    @Binding var cat: Cat
    
    @State var editedCat: Cat
    @State var alertTitle: String = ""
    @State var showAlert: Bool = false

    init(cat: Binding<Cat>) {
        _cat = cat
        _editedCat = State(initialValue: cat.wrappedValue)
    }

    var body: some View {
        Form {
            Section(header: Text("Name")) {
                TextField("Required", text: $editedCat.name)
            }

            Section(header: Text("Breed")) {
                Picker("Select Breed", selection: $editedCat.breed) {
                    ForEach(CatBreed.allCases) { breed in
                        Text(breed.rawValue)
                    }
                }
            }
            
            Section(header: Text("Gender")) {
                Picker("", selection: $editedCat.gender) {
                    ForEach(CatGender.allCases) { gender in
                        Text(gender.rawValue)
                    }
                }
                .pickerStyle(.segmented)
            }

            Section(header: Text("Age")) {
                Picker("Select Age", selection: $editedCat.age) {
                    ForEach(1...240, id: \.self) { age in
                        Text("\(age) " + (age == 1 ? "month" : "months")).tag("\(age) " + (age == 1 ? "month" : "months"))
                    }
                }
            }
            
            Section(header: Text("Health Problem")) {
                TextField("Required", text: $editedCat.healthProblem)
            }
        
            Section(header: Text("Description")) {
                TextField("Required", text: $editedCat.description)
            }
            
            Button(action: {
                if validateInput() {
                    cat = editedCat
                    listViewModel.updateCat(cat: cat)
                    presentationMode.wrappedValue.dismiss()
                }
            }) {
                HStack {
                    Spacer()
                    Text("Save")
                    Spacer()
                }
            }
            .foregroundColor(.white)
            .padding(10)
            .background(Color.accentColor)
            .cornerRadius(8)
        }
        .navigationTitle("Edit this Cat")
        .navigationBarTitleDisplayMode(.inline)
        .alert(isPresented: $showAlert, content: getAlert)
    }
    
    func validateInput() -> Bool {
        if editedCat.name.isEmpty || editedCat.healthProblem.isEmpty || editedCat.description.isEmpty {
            alertTitle = "Please complete all fields."
        } else if editedCat.name.count < 3 || editedCat.healthProblem.count < 3 {
            alertTitle = "You must enter 3 characters at least."
        } else if editedCat.description.count < 10 {
            alertTitle = "Description should have at least 10 characters."
        } else {
            return true
        }
        
        showAlert.toggle()
        return false
    }
    
    func getAlert() -> Alert {
        return Alert(title: Text(alertTitle))
    }
}

struct EditView_Previews: PreviewProvider {
    @State static var cat = Cat(id: "1", name: "Fluffy", breed: "Persian", gender: "Female", age: "5 years", healthProblem: "Asthma", description: "A beautiful and fluffy Persian cat with a gentle temperament")
    
    static var previews: some View {
        NavigationView {
            EditView(cat: $cat)
        }
        .environmentObject(ListViewModel())
    }
}
