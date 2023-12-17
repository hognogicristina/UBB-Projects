import SwiftUI

struct ListView: View {
    @EnvironmentObject var listViewModel: ListViewModel

    @State var selectedCat: EditCat?
    @State private var searchText = ""

    var filteredCats: [Cat] {
        if searchText.isEmpty {
            return listViewModel.cats
        } else {
            return listViewModel.cats.filter { cat in
                cat.breed.range(of: searchText, options: .caseInsensitive) != nil
            }
        }
    }

    var groupedCats: [String: [Cat]] {
        Dictionary(grouping: filteredCats, by: { $0.breed })
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
                    ForEach(groupedCats.keys.sorted(), id: \.self) { breed in
                        Section(header: Text(breed)) {
                            ForEach(groupedCats[breed]!, id: \.id) { cat in
                                NavigationLink(destination: CatDetailsView(cat: cat)) {
                                    HStack {
                                        ListRowView(cat: cat)
                                    }
                                    .swipeActions {
                                        Button("Edit") {
                                            if let index = listViewModel.cats.firstIndex(where: { $0.id == cat.id }) {
                                                selectedCat = EditCat(id: index, cat: $listViewModel.cats[index])
                                            }
                                        }
                                        .tint(.blue)
                                    }
                                }
                            }
                        }
                    }
                }
                .listStyle(InsetGroupedListStyle())
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
