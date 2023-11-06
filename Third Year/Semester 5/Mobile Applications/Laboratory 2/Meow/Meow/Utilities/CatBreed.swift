enum CatBreed: String, CaseIterable, Identifiable {
    case none = "None"
    case abyssinian = "Abyssinian"
    case americanShorthair = "American Shorthair"
    case bengal = "Bengal"
    case birman = "Birman"
    case bombay = "Bombay"
    case britishShorthair = "British Shorthair"
    case devonRex = "Devon Rex"
    case gingerTabby = "Ginger Tabby"
    case maineCoon = "Maine Coon"
    case munchkin = "Munchkin"
    case norwegianForest = "Norwegian Forest"
    case orientalShorthair = "Oriental Shorthair"
    case persian = "Persian"
    case ragdoll = "Ragdoll"
    case russianBlue = "Russian Blue"
    case scottishFold = "Scottish Fold"
    case siamese = "Siamese"
    case spynx = "Sphynx"
    case toyger = "Toyger"
    
    var id: String { self.rawValue }
}
