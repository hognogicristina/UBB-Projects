import SwiftUI

struct AddView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var listViewModel: ListViewModel
    
    @State var newCatName: String = ""
    @State var newCatBreed: String = "None"
    @State var newCatGender: String = "Male"
    @State var newCatAge: String = "1 month"
    @State var newCatHealthProblem: String = ""
    @State var newCatDescription: String = ""
    
    @State var newCatAgeValue: Int = 1
    @State var newCatAgeUnit: String = "month"
    
    @State var alertTitle: String = ""
    @State var showAlert: Bool = false

    var body: some View {
        VStack {
            Form {
                Section(header: Text("Name")) {
                    TextField("Required", text: $newCatName)
                }
                
                Section(header: Text("Breed")) {
                    Picker("Select Breed", selection: $newCatBreed) {
                        ForEach(CatBreed.allCases) { breed in
                            Text(breed.rawValue)
                        }
                    }
                }
                Section(header: Text("Gender")) {
                    Picker("", selection: $newCatGender) {
                        ForEach(CatGender.allCases) { gender in
                            Text(gender.rawValue)
                        }
                    }
                    .pickerStyle(.segmented)
                }
                
                Section(header: Text("Age")) {
                    Picker("Select Age", selection: $newCatAgeValue) {
                        ForEach(1...240, id: \.self) { age in
                            Text("\(age) " + (age == 1 ? "month" : "months")).tag(age)
                        }
                    }
                }
                
                Section(header: Text("Health Problems")) {
                    TextField("Required", text: $newCatHealthProblem)
                }
                
                Section(header: Text("Description")) {
                    TextField("Required", text: $newCatDescription)
                }
            }
        }
        .navigationTitle("Add a Cat")
        .navigationBarTitleDisplayMode(.inline)
        .navigationBarItems(trailing: Button(action: {
            if areAllFieldsCompleted() && textIsAppropiate() && descIsAppropiate() {
                if newCatAgeValue > 1 {
                    newCatAgeUnit = "months"
                } else {
                    newCatAgeUnit = "month"
                }
                
                let newAge = "\(newCatAgeValue) \(newCatAgeUnit)"
                listViewModel.addCat(name: newCatName, breed: newCatBreed, gender: newCatGender, age: newAge, healthProblem: newCatHealthProblem, description: newCatDescription)
                presentationMode.wrappedValue.dismiss()
            }
        }) {
            Image(systemName: "plus.circle")
                .font(.headline)
        })
        .alert(isPresented: $showAlert, content: getAlert)
    }
    
    func areAllFieldsCompleted() -> Bool {
        if newCatName.isEmpty || newCatHealthProblem.isEmpty || newCatDescription.isEmpty {
            alertTitle = "Please complete all fields."
            showAlert.toggle()
            return false
        }
        return true
    }
    
    func textIsAppropiate() -> Bool {
        if newCatName.count < 3 || newCatHealthProblem.count < 3 {
            alertTitle = "You must enter 3 characters at least."
            showAlert.toggle()
            return false
        }
        return true
    }
    
    func descIsAppropiate() -> Bool {
        if newCatDescription.count < 10 {
            alertTitle = "Description should have at least 10 characters."
            showAlert.toggle()
            return false
        }
        return true
    }
    
    func getAlert() -> Alert {
        return Alert(title: Text(alertTitle))
    }
}

struct AddView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            AddView()
        }
        .environmentObject(ListViewModel())
    }
}