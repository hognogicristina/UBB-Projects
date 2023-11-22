import 'package:flutter/cupertino.dart';
import '../Model/Cat.dart';


class CatListViewModel with ChangeNotifier {
  List<Cat> cats = [];
  int? selectedCatIndex;

  void deleteCat(int catId) {
    cats.removeWhere((c) => c.id == catId.toString());
    notifyListeners();
  }

  void addCat({
    required String name,
    required String breed,
    required String gender,
    required String age,
    required String healthProblem,
    required String description,
  }) {
    final idNum = cats.length;

    final newCat = Cat(
      id: idNum.toString(),
      name: name,
      breed: breed,
      gender: gender,
      age: age,
      healthProblem: healthProblem,
      description: description,
    );

    cats.add(newCat);
    notifyListeners();
  }

  void updateCat(int catId, Cat updatedCat) {
    final existingCatIndex = cats.indexWhere((c) => c.id == catId.toString());

    if (existingCatIndex != -1) {
      cats[existingCatIndex] = updatedCat;
      notifyListeners();
    }
  }
}