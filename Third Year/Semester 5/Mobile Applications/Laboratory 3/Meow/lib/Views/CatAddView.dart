import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';

import '../Utilities/CatBreed.dart';
import '../Utilities/CatGender.dart';
import '../ViewModels/CatListViewModel.dart';

class CatAddView extends StatefulWidget {
  const CatAddView({Key? key}) : super(key: key);

  @override
  _CatAddViewState createState() => _CatAddViewState();
}

class _CatAddViewState extends State<CatAddView> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  String _catName = '';
  final String _catBreed = '';
  CatGender? _catGender = CatGender.Male;
  String _catAge = '1 month';
  String _catHealthProblem = '';
  String _catDescription = '';

  CatBreed _selectedBreed = CatBreed.None;

  void _showValidationAlert(String message) {
    showCupertinoDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return CupertinoAlertDialog(
          title: Text(message),
          actions: <Widget>[
            CupertinoDialogAction(
              child: const Text('OK'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<CatListViewModel>(context);

    void addCatIfValid() {
      var hasValidationError = false;
      var errorMessage = '';

      if (_catName.trim().isEmpty || _catHealthProblem.trim().isEmpty || _catDescription.trim().isEmpty) {
        hasValidationError = true;
        errorMessage = 'Please complete all fields.';
      } else if (_catName.trim().length < 3 || _catHealthProblem.trim().length < 3) {
        hasValidationError = true;
        errorMessage = 'You must enter 3 characters at least.';
      } else if (_catDescription.trim().length < 10) {
        hasValidationError = true;
        errorMessage = 'Description should have at least 10 characters.';
      }

      if (hasValidationError) {
        _showValidationAlert(errorMessage);
      } else {
        viewModel.addCat(
          name: _catName,
          breed: _catBreed.isEmpty ? _selectedBreed.stringValue : _catBreed,
          gender: _catGender.toString().split('.').last,
          age: _catAge,
          healthProblem: _catHealthProblem,
          description: _catDescription,
        );
        Navigator.pop(context);
      }
    }

    int parseAge(String age) {
      final ageParts = age.split(' ');
      if (ageParts.length == 2) {
        return int.tryParse(ageParts.first) ?? 1;
      }
      return 1;
    }

    void showAgePicker(BuildContext context) {
      final backgroundColor = CupertinoTheme.of(context).brightness == Brightness.light
          ? CupertinoColors.systemBackground
          : CupertinoColors.systemBackground.resolveFrom(context);

      showCupertinoModalPopup<void>(
        context: context,
        builder: (BuildContext context) {
          return Container(
            height: 350.0,
            color: backgroundColor,
            child: Column(
              children: [
                Container(
                  alignment: Alignment.centerRight,
                  padding: const EdgeInsets.symmetric(horizontal: 20.0),
                ),
                Expanded(
                  child: CupertinoPicker(
                    scrollController: FixedExtentScrollController(
                      initialItem: parseAge(_catAge) - 1,
                    ),
                    itemExtent: 32.0,
                    onSelectedItemChanged: (int index) {
                      setState(() {
                        _catAge = '${index + 1}${index == 0 ? ' month' : ' months'}';
                      });
                    },
                    children: List<Widget>.generate(240, (int index) {
                      return Center(
                        child: Text(
                          '${index + 1}${index == 0 ? ' month' : ' months'}',
                          style: const TextStyle(fontSize: 20.0),
                        ),
                      );
                    }),
                  ),
                ),
              ],
            ),
          );
        },
      );
    }

    void showBreedPicker(BuildContext context) {
      final backgroundColor = CupertinoTheme.of(context).brightness == Brightness.light
          ? CupertinoColors.systemBackground
          : CupertinoColors.systemBackground.resolveFrom(context);

      const List<CatBreed> breeds = CatBreed.values;

      String formatBreedName(CatBreed breed) {
        String enumString = breed.toString().split('.').last;
        enumString = enumString.replaceAllMapped(
            RegExp(r'([a-z])([A-Z])'),
                (Match m) => '${m[1]} ${m[2]}'
        );

        return enumString;
      }

      showCupertinoModalPopup<void>(
        context: context,
        builder: (BuildContext context) {
          return Container(
            height: 350.0,
            color: backgroundColor,
            child: Column(
              children: [
                Container(
                  alignment: Alignment.centerRight,
                  padding: const EdgeInsets.symmetric(horizontal: 20.0),
                ),
                Expanded(
                  child: CupertinoPicker(
                    scrollController: FixedExtentScrollController(
                      initialItem: breeds.indexOf(_selectedBreed),
                    ),
                    itemExtent: 32.0,
                    onSelectedItemChanged: (int index) {
                      setState(() {
                        _selectedBreed = breeds[index];
                      });
                    },
                    children: breeds.map((breed) {
                      return Center(
                        child: Text(
                          formatBreedName(breed),
                          style: const TextStyle(fontSize: 20.0),
                        ),
                      );
                    }).toList(),
                  ),
                ),
              ],
            ),
          );
        },
      );
    }

    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: const Text('Add a Cat'),
        trailing: CupertinoButton(
          padding: EdgeInsets.zero,
          child: const Text('Add'),
          onPressed: () {
            addCatIfValid();
          },
        ),
      ),
      child: SafeArea(
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              children: <Widget>[
                CupertinoFormSection.insetGrouped(
                  header: const Text('NAME'),
                  children: <Widget>[
                    CupertinoFormRow(
                      child: CupertinoTextFormFieldRow(
                        placeholder: 'Required',
                        onChanged: (value) {
                          _catName = value;
                        },
                      ),
                    ),
                  ],
                ),
                CupertinoFormSection.insetGrouped(
                  header: const Text('BREED'),
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: CupertinoFormRow(
                        prefix: const Text('Select Breed'),
                        child: GestureDetector(
                          onTap: () {
                            showBreedPicker(context);
                          },
                          child: Text(_selectedBreed.stringValue,
                            style: const TextStyle(
                              fontSize: 16.0,
                              color: CupertinoColors.systemGrey,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                CupertinoFormSection.insetGrouped(
                  header: const Text('GENDER'),
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                        constraints: const BoxConstraints(minWidth: 450.0),
                        child: CupertinoSlidingSegmentedControl(
                          groupValue: _catGender,
                          onValueChanged: (value) {
                            setState(() {
                              _catGender = value as CatGender;
                            });
                          },
                          children: const {
                            CatGender.Male: Text('Male'),
                            CatGender.Female: Text('Female'),
                          },
                        ),
                      ),
                    ),
                  ],
                ),
                CupertinoFormSection.insetGrouped(
                  header: const Text('AGE'),
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: CupertinoFormRow(
                        prefix: const Text('Select Age'),
                        child: GestureDetector(
                          onTap: () {
                            showAgePicker(context);
                          },
                          child: Text(
                            _catAge,
                            style: const TextStyle(
                              fontSize: 16.0,
                              color: CupertinoColors.systemGrey,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                CupertinoFormSection.insetGrouped(
                  header: const Text('HEALTH PROBLEM'),
                  children: <Widget>[
                    CupertinoFormRow(
                      child: CupertinoTextFormFieldRow(
                        placeholder: 'Required',
                        onChanged: (value) {
                          _catHealthProblem = value;
                        },
                      ),
                    ),
                  ],
                ),
                CupertinoFormSection.insetGrouped(
                  header: const Text('DESCRIPTION'),
                  children: <Widget>[
                    CupertinoFormRow(
                      child: CupertinoTextFormFieldRow(
                        placeholder: 'Required',
                        onChanged: (value) {
                          _catDescription = value;
                        },
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}