import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import '../ViewModels/CatListViewModel.dart';
import '../Model/Cat.dart';

class CatDetailsView extends StatelessWidget {
  final Cat cat;

  const CatDetailsView({
    super.key,
    required this.cat,
  });

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<CatListViewModel>(context);

    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text(cat.name),
      ),
      child: SafeArea(
        child: ListView(
          children: [
            CupertinoFormSection.insetGrouped(
              header: const Text('BREED'),
              children: [
                Container(
                  margin: const EdgeInsets.only(bottom: 8.0, top: 8.0),
                  child: SizedBox(
                    child: CupertinoFormRow(
                      prefix: Container(
                        alignment: Alignment.centerLeft,
                        child: Text(cat.breed,
                            style: const TextStyle(fontSize: 16.0)),
                      ),
                      child: const Text(''),
                    ),
                  ),
                )
              ],
            ),
            CupertinoFormSection.insetGrouped(
              header: const Text('GENDER'),
              children: [
                Container(
                  margin: const EdgeInsets.only(bottom: 8.0, top: 8.0),
                  child: SizedBox(
                    child: CupertinoFormRow(
                      prefix: Text(cat.gender,
                          style: const TextStyle(fontSize: 16.0)),
                      child: const Text(''),
                    ),
                  ),
                ),
              ],
            ),
            CupertinoFormSection.insetGrouped(
              header: const Text('AGE'),
              children: [
                Container(
                  margin: const EdgeInsets.only(bottom: 8.0, top: 8.0),
                  child: SizedBox(
                    child: CupertinoFormRow(
                      prefix: Center(
                        child: Text(cat.age,
                            style: const TextStyle(fontSize: 16.0)),
                      ),
                      child: const Center(child: Text('')),
                    ),
                  ),
                ),
              ],
            ),
            CupertinoFormSection.insetGrouped(
              header: const Text('HEALTH PROBLEM'),
              children: [
                Container(
                  margin: const EdgeInsets.only(bottom: 8.0, top: 8.0),
                  child: SizedBox(
                    child: CupertinoFormRow(
                      prefix: Text(cat.healthProblem,
                          style: const TextStyle(fontSize: 16.0)),
                      child: const Text(''),
                    ),
                  ),
                ),
              ],
            ),
            CupertinoFormSection.insetGrouped(
              header: const Text('DESCRIPTION'),
              children: [
                Container(
                  margin: const EdgeInsets.only(bottom: 8.0, top: 8.0),
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(
                      minHeight: 32.0,
                      maxHeight: double.infinity,
                    ),
                    child: CupertinoFormRow(
                      prefix: Container(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(
                          cat.description,
                          style: const TextStyle(fontSize: 16.0),
                          softWrap: true,
                        ),
                      ),
                      child: const Text(''),
                    ),
                  ),
                ),
              ],
            ),
            Center(
              child: Padding(
                padding: const EdgeInsets.only(top: 60.0),
                child: SizedBox(
                  height: 44.0,
                  child: CupertinoButton.filled(
                    onPressed: () {
                      showAdoptionConfirmation(context, viewModel);
                    },
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    borderRadius: BorderRadius.circular(10),
                    minSize: 350.0,
                    child: const Text(
                      "Adopt this Cat",
                      style: TextStyle(
                        fontSize: 18.0,
                        color: CupertinoColors.white,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  void showAdoptionConfirmation(
      BuildContext context, CatListViewModel viewModel) {
    showCupertinoDialog(
      context: context,
      builder: (context) {
        return CupertinoAlertDialog(
          title: const Text("Confirm Adoption"),
          content: const Text("Are you sure you want to adopt this cat?"),
          actions: [
            CupertinoDialogAction(
              child: const Text("Cancel"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            CupertinoDialogAction(
              onPressed: () {
                viewModel.deleteCat(int.parse(cat.id));
                Navigator.popUntil(
                    context, ModalRoute.withName('/cat_list_view'));
              },
              isDestructiveAction: true,
              child: const Text("Confirm"),
            ),
          ],
        );
      },
    );
  }
}
