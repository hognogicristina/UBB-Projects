import SwiftUI

struct EditView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var listViewModel: ListViewModel

    @Binding var cat: Cat
    
    @State var editedCat: Cat
    @State var alertTitle: String = ""
    @State var showAlert: Bool = false
    @State var showingBreedGrid = false
    
    @State var filteredBreeds: [String] = []
    @State private var searchText = ""
    @State private var selectedBreed: String = "Mixed Breed"

    init(cat: Binding<Cat>) {
        _cat = cat
        _editedCat = State(initialValue: cat.wrappedValue)
    }

    var body: some View {
        VStack{
            Form {
                Section(header: Text("Name")) {
                    TextField("Required", text: $editedCat.name)
                }
                
                Section(header: Text("Breed")) {
                    Button(action: {
                        showingBreedGrid.toggle()
                    }) {
                        HStack {
                            Text("Select Breed")
                                .foregroundColor(Color("ColorText"))
                            Spacer()
                            Text(editedCat.breed)
                                .foregroundColor(Color("ColorGray"))
                            Image(systemName: "photo.on.rectangle.angled")
                                .foregroundColor(Color("ColorText"))
                                .onTapGesture {
                                    showingBreedGrid.toggle()
                                }
                        }
                    }
                    .sheet(isPresented: $showingBreedGrid) {
                        BreedGridView(selectBreed: { selectedBreed in
                            editedCat.breed = selectedBreed
                        }, searchText: $searchText)
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
                        ForEach(1...600, id: \.self) { age in
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
                
                
            }
            .navigationTitle("Edit this Cat")
            .navigationBarTitleDisplayMode(.inline)
            .alert(isPresented: $showAlert, content: getAlert)
        }
        
        Button(action: {
            if validateInput() {
                cat = editedCat
                listViewModel.updateCat(cat: cat)
                presentationMode.wrappedValue.dismiss()
            }
        }) {
            Text("Save")
                .font(.title3)
                .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                .foregroundColor(.white)
                .padding(.vertical, 15)
                .frame(maxWidth: .infinity)
                .background(Color.accentColor)
                .cornerRadius(10)
        }
        .padding(.horizontal, 50)
        .padding(.bottom, 20)
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
    @State static var cat = Cat(id: "1", name: "Fluffy", breed: "Persian", gender: "Female", age: "5 months", healthProblem: "Asthma", description: "A beautiful and fluffy Persian cat with a gentle temperament")
    
    static var previews: some View {
        NavigationView {
            EditView(cat: $cat)
        }
        .environmentObject(ListViewModel())
    }
}
