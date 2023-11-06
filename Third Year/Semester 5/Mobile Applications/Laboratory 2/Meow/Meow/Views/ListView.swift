import SwiftUI

struct ListView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var listViewModel: ListViewModel
    
    @State var selectedCat: EditCat?
    
    var body: some View {
        VStack {
            Text("Please help our app by updating information about cats if needed.")
                .font(.system(size: 13))
                .multilineTextAlignment(.center)
                .foregroundColor(.blue)
            
            List {
                ForEach(listViewModel.cats.indices, id: \.self) { index in
                    let cat = listViewModel.cats[index]
                    NavigationLink(destination: CatDetailsView(cat: cat)) {
                        HStack {
                            ListRowView(cat: cat)
                        }
                        .swipeActions {
                            Button("Edit") {
                                selectedCat = EditCat(id: index, cat: $listViewModel.cats[index])
                            }
                            .tint(.blue)
                        }
                    }
                }
            }
            .sheet(item: $selectedCat) { editCat in
                EditView(cat: editCat.cat)
            }
            .navigationTitle("Cats for adoption")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

struct ListView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            ListView()
        }
        .environmentObject(ListViewModel())
    }
}
