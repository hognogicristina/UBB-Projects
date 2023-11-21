enum CatBreed {
  None,
  Abyssinian,
  AmericanShorthair,
  Bengal,
  Birman,
  Bombay,
  BritishShorthair,
  DevonRex,
  GingerTabby,
  MaineCoon,
  Munchkin,
  NorwegianForest,
  OrientalShorthair,
  Persian,
  Ragdoll,
  RussianBlue,
  ScottishFold,
  Siamese,
  Spynx,
  Toyger,
}

extension CatBreedExtension on CatBreed {
  String get stringValue {
    switch (this) {
      case CatBreed.None:
        return "None";
      case CatBreed.Abyssinian:
        return "Abyssinian";
      case CatBreed.AmericanShorthair:
        return "American Shorthair";
      case CatBreed.Bengal:
        return "Bengal";
      case CatBreed.Birman:
        return "Birman";
      case CatBreed.Bombay:
        return "Bombay";
      case CatBreed.BritishShorthair:
        return "British Shorthair";
      case CatBreed.DevonRex:
        return "Devon Rex";
      case CatBreed.GingerTabby:
        return "Ginger Tabby";
      case CatBreed.MaineCoon:
        return "Maine Coon";
      case CatBreed.Munchkin:
        return "Munchkin";
      case CatBreed.NorwegianForest:
        return "Norwegian Forest";
      case CatBreed.OrientalShorthair:
        return "Oriental Shorthair";
      case CatBreed.Persian:
        return "Persian";
      case CatBreed.Ragdoll:
        return "Ragdoll";
      case CatBreed.RussianBlue:
        return "Russian Blue";
      case CatBreed.ScottishFold:
        return "Scottish Fold";
      case CatBreed.Siamese:
        return "Siamese";
      case CatBreed.Spynx:
        return "Sphynx";
      case CatBreed.Toyger:
        return "Toyger";
    }
  }
}