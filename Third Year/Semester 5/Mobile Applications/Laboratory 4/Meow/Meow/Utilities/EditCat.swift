import SwiftUI

struct EditCat: Identifiable {
    var id: Int
    var cat: Binding<Cat>
}
