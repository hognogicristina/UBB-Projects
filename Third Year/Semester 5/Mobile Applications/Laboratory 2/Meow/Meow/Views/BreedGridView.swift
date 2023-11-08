import SwiftUI

struct BreedGridView: View {
    let columns: [GridItem] = Array(repeating: .init(.flexible()), count: 2)
    var selectBreed: (String) -> Void
    @Environment(\.presentationMode) var presentationMode

    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 20) {
                ForEach(CatBreed.allCases) { breed in
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
