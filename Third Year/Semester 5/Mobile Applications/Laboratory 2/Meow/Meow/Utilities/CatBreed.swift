import SwiftUI

enum CatBreed: String, CaseIterable, Identifiable {
    case none = "None"
    case abyssinian = "Abyssinian"
    case americanBobtail = "American Bobtail"
    case americanCurl = "American Curl"
    case americanShorthair = "American Shorthair"
    case americanWirehair = "American Wirehair"
    case australianMist = "Australian Mist"
    case balinese = "Balinese"
    case bengal = "Bengal"
    case birman = "Birman"
    case bombay = "Bombay"
    case britishShorthair = "British Shorthair"
    case californiaSpangled = "California Spangled"
    case carey = "Carey"
    case cornishRex = "Cornish Rex"
    case britishLonghair = "British Longhair"
    case devonRex = "Devon Rex"
    case egyptianMau = "Egyptian Mau"
    case gingerTabby = "Ginger Tabby"
    case havanaBrown = "Havana Brown"
    case khaoManee = "Khao Manee"
    case maineCoon = "Maine Coon"
    case multicolor = "Multicolor"
    case munchkin = "Munchkin"
    case norwegianForest = "Norwegian Forest"
    case orientalShorthair = "Oriental Shorthair"
    case persian = "Persian"
    case ragdoll = "Ragdoll"
    case russianBlue = "Russian Blue"
    case scottishFold = "Scottish Fold"
    case siamese = "Siamese"
    case somali = "Somali"
    case sphynx = "Sphynx"
    case tonkinese = "Tonkinese"
    case toyger = "Toyger"
    case tuxedo = "Tuxedo"
    
    var image: Image {
        Image(self.rawValue)
    }
    
    var id: String { self.rawValue }
}
