import SwiftUI

struct CatDetailsView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var listViewModel: ListViewModel

    @State var cat: Cat
    @State var isConfirmationDialogPresented = false

    var body: some View {
        List {
            Section(header: Text("Breed")) {
                Text(cat.breed)
            }
            
            Section(header: Text("Gender")) {
                Text(cat.gender)
            }
            
            Section(header: Text("Age")) {
                Text(cat.age)
            }
            
            Section(header: Text("Health Problem")) {
                Text(cat.healthProblem)
            }
            
            Section(header: Text("Description")) {
                Text(cat.description)
            }
        }
        .navigationBarItems(trailing: Button(action: {
            isConfirmationDialogPresented.toggle()
        }) {
            Image(systemName: "paperplane.circle")
        }
        .alert(isPresented: $isConfirmationDialogPresented) {
            Alert(
                title: Text("Confirm Adoption"),
                message: Text("Are you sure you want to adopt this cat?"),
                primaryButton: .destructive(Text("Confirm")) {
                    if let index = listViewModel.cats.firstIndex(of: cat) {
                        listViewModel.deleteCat(indexSet: IndexSet([index]))
                    }
                    presentationMode.wrappedValue.dismiss()
                },
                secondaryButton: .cancel()
            )
        }
        .navigationTitle(cat.name)
        .navigationBarTitleDisplayMode(.inline)
    )}
}

struct CatDetailsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            CatDetailsView(cat: Cat(id: "1", name: "Fluffy", breed: "Persian", gender: "Female", age: "5 years", healthProblem: "Asthma", description: "A beautiful and fluffy Persian cat with a gentle temperament"))
        }
        .environmentObject(ListViewModel())
    }
}
