import SwiftUI

struct ListView: View {
    @EnvironmentObject var listViewModel: ListViewModel

    @State var selectedCat: EditCat?
    @State private var searchText = ""

    var filteredCats: [Cat] {
        if searchText.isEmpty {
            return listViewModel.cats
        } else {
            return listViewModel.cats.filter { $0.breed.lowercased().contains(searchText.lowercased()) }
        }
    }

    var body: some View {
        VStack {
            Text("Please help our app by updating information about cats if needed.")
                .font(.system(size: 13))
                .multilineTextAlignment(.center)
                .foregroundColor(.blue)

            SearchBar(searchText: $searchText)

            if filteredCats.isEmpty {
                Spacer()
                Text("No cats available for adoption")
                    .font(.system(size: 15))
                    .foregroundColor(.gray)
                Spacer()
            } else {
                List {
                    ForEach(filteredCats.indices, id: \.self) { index in
                        let cat = filteredCats[index]
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
            }
        }
        .navigationTitle("Cats for adoption")
        .navigationBarTitleDisplayMode(.inline)
        .navigationBarItems(
            trailing: NavigationLink(destination: AddView()) {
                Image(systemName: "plus.circle")
            }
        )
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
