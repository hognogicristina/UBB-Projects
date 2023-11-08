import SwiftUI

struct CatDetailsView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var listViewModel: ListViewModel

    @State var cat: Cat
    @State var isConfirmationDialogPresented = false

    var body: some View {
        VStack {
            Image(cat.breed)
                .resizable()
                .scaledToFit()
                .frame(width: 120, height: 120)
                .clipShape(Circle())
                .overlay(
                    Circle()
                        .stroke(Color.primary, lineWidth: 2)
                )
                .padding(.vertical, 20)
            
            List {
                Section(header: Text("Cat Information")) {
                    Text("Name: \(cat.name)")
                    Text("Breed: \(cat.breed)")
                    Text("Gender: \(cat.gender)")
                    Text("Age: \(cat.age)")
                }
                
                Section(header: Text("Health Problem")) {
                    Text(cat.healthProblem)
                }
                
                Section(header: Text("Description")) {
                    Text(cat.description)
                }
            }
            
            Button(action: {
                isConfirmationDialogPresented.toggle()
            }) {
                Text("Adopt this Cat")
                    .font(.headline)
                    .foregroundColor(.white)
                    .padding(.vertical, 10)
                    .frame(maxWidth: .infinity)
                    .background(Color.accentColor)
                    .cornerRadius(10)
            }
            .padding(.horizontal, 20)
            .padding(.bottom, 20)
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
            .listStyle(GroupedListStyle())
            .navigationBarTitle(cat.name, displayMode: .inline)
        }
    }
}

struct CatDetailsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            CatDetailsView(cat: Cat(id: "1", name: "Fluffy", breed: "Persian", gender: "Female", age: "5 years", healthProblem: "Asthma", description: "A beautiful and fluffy Persian cat with a gentle temperament"))
        }
        .environmentObject(ListViewModel())
    }
}
