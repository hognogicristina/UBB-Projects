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
            return CatBreed.allCases.filter { breed in
                breed.rawValue.lowercased().contains(searchText.lowercased())
            }
        }
    }

    var body: some View {
        VStack {
            SearchBar(searchText: $searchText)
                .padding(.top, 10)
            
            if filteredBreeds.isEmpty {
                Text("No breeds found")
                    .font(.system(size: 15))
                    .foregroundColor(.gray)
                Spacer()
            } else {
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
}
