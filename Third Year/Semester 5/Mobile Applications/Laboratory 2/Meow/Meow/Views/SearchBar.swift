import SwiftUI

struct SearchBar: View {
    @Binding var searchText: String
    
    var body: some View {
        HStack {
            TextField("Search", text: $searchText)
                .padding(.leading, 30)
                .padding(10)
                .background(Color(.systemGray6))
                .cornerRadius(8)
                .padding(.horizontal, 20)
                .overlay(
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(.gray)
                            .frame(minWidth: 0, maxWidth: .infinity, alignment: .leading)
                            .padding(.leading, 30)
                        
                        if !searchText.isEmpty {
                            Button(action: {
                                searchText = ""
                            }) {
                                Image(systemName: "xmark.circle.fill")
                                    .foregroundColor(.gray)
                                    .padding(.trailing, 30)
                            }
                        }
                    }
                )
        }
    }
}

struct SearchBar_Previews: PreviewProvider {
    static var previews: some View {
        SearchBar(searchText: .constant("B"))
            .previewLayout(.sizeThatFits)
            .padding()
    }
}
