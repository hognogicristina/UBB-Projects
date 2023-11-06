enum CatGender: String, CaseIterable, Identifiable {
    case male = "Male"
    case female = "Female"
    
    var id: String { self.rawValue }
}
