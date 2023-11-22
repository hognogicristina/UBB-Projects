import SwiftUI

struct AddView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var listViewModel: ListViewModel
    
    @State var newCatName: String = ""
    @State var newCatBreed: String = "Mixed Breed"
    @State var newCatGender: String = "Male"
    @State var newCatAge: String = "1 month"
    @State var newCatHealthProblem: String = ""
    @State var newCatDescription: String = ""
    
    @State var alertTitle: String = ""
    @State var showAlert: Bool = false
    @State var showingBreedGrid = false
    
    @State var filteredBreeds: [String] = []
    @State private var searchText = ""
    @State private var selectedBreed: String = "Mixed Breed"

    var body: some View {
        VStack {
            Form {
                Section(header: Text("Name")) {
                    TextField("Required", text: $newCatName)
                }
                
                Section(header: Text("Breed")) {
                    Button(action: {
                        showingBreedGrid.toggle()
                    }) {
                        HStack {
                            Text("Select Breed")
                                .foregroundColor(Color("ColorText"))
                            Spacer()
                            Text(newCatBreed)
                                .foregroundColor(Color("ColorGray"))
                            Image(systemName: "photo.on.rectangle.angled")
                                .foregroundColor(Color("ColorText"))
                        }
                    }
                    .sheet(isPresented: $showingBreedGrid) {
                        BreedGridView(selectBreed: { selectedBreed in
                            newCatBreed = selectedBreed
                        }, searchText: $searchText)
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
                    Picker("Select Age", selection: $newCatAge) {
                        ForEach(1...600, id: \.self) { age in
                            Text("\(age) " + (age == 1 ? "month" : "months")).tag("\(age) " + (age == 1 ? "month" : "months"))
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
                listViewModel.addCat(name: newCatName, breed: newCatBreed, gender: newCatGender, age: newCatAge, healthProblem: newCatHealthProblem, description: newCatDescription)
                presentationMode.wrappedValue.dismiss()
            }
        }) {
            Text("Add")
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
