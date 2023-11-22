import SwiftUI

struct BreedGridView: View {
    let columns: [GridItem] = Array(repeating: .init(.flexible()), count: 2)
    var selectBreed: (String) -> Void
    
    @Binding var searchText: String
    @Environment(\.presentationMode) var presentationMode

    private var filteredBreeds: [CatBreed] {
        if searchText.isEmpty {
            return CatBreed.allCases
        } else {
            let lowercasedSearchText = searchText.lowercased()
            return CatBreed.allCases.filter { breed in
                if searchText.first!.isUppercase {
                    return breed.rawValue.starts(with: searchText)
                } else {
                    return breed.rawValue.lowercased().contains(lowercasedSearchText)
                }
            }
        }
    }

    var body: some View {
        VStack {
            SearchBar(searchText: $searchText)
                .padding(.top, 10)
            ScrollView {
                LazyVGrid(columns: columns, spacing: 20) {
                    ForEach(filteredBreeds, id: \.self) { breed in
                        VStack {
                            breed.image
                                .resizable()
                                .scaledToFit()
                                .frame(width: 150, height: 150)
                                .cornerRadius(8)
                                .onTapGesture {
                                    self.selectBreed(breed.rawValue)
                                    self.presentationMode.wrappedValue.dismiss()
                                }
                            Text(breed.rawValue)
                        }
                        .padding(.bottom, 10)
                    }
                }
                .padding(.horizontal)
            }
        }
    }
}
