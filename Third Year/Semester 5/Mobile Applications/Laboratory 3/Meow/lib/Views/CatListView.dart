import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import '../ViewModels/CatListViewModel.dart';
import 'CatDetailsView.dart';
import 'CatEditView.dart';
import 'CatAddView.dart';

class CatListView extends StatelessWidget {
  const CatListView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final viewModel = Provider.of<CatListViewModel>(context);

    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: const Text('Cats for Adoption'),
        trailing: CupertinoButton(
          padding: EdgeInsets.zero,
          onPressed: () {
            Navigator.of(context).push(
              CupertinoPageRoute(
                builder: (context) => const CatAddView(),
              ),
            );
          },
          child: const Icon(CupertinoIcons.add_circled),
        ),
      ),
      child: SafeArea(
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: const Center(
                child: Text(
                  'Please help our app by updating information about cats if needed.',
                  style: TextStyle(
                    fontSize: 16.0,
                    color: CupertinoColors.systemBlue,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            Expanded(
              child: viewModel.cats.isEmpty
                  ? const Center(
                      child: Padding(
                        padding: EdgeInsets.all(16.0),
                        child: Text(
                          'No cats available for adoption',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 18.0,
                            color: CupertinoColors.systemGrey,
                          ),
                        ),
                      ),
                    )
                  : CupertinoScrollbar(
                      child: ListView(
                        children: [
                          CupertinoListSection.insetGrouped(
                            children: List<Widget>.generate(
                              viewModel.cats.length,
                              (index) {
                                final cat = viewModel.cats[index];
                                return Slidable(
                                  key: ValueKey(cat.id),
                                  endActionPane: ActionPane(
                                    motion: const DrawerMotion(),
                                    children: [
                                      SlidableAction(
                                        backgroundColor:
                                            CupertinoColors.systemBlue,
                                        foregroundColor: CupertinoColors.white,
                                        label: 'Edit',
                                        onPressed: (_) {
                                          Navigator.of(context).push(
                                            CupertinoPageRoute(
                                              builder: (context) =>
                                                  CatEditView(cat: cat),
                                            ),
                                          );
                                        },
                                      ),
                                    ],
                                  ),
                                  child: CupertinoListTile(
                                    title: Padding(
                                      padding: const EdgeInsets.only(
                                          bottom: 4.0, top: 10.0),
                                      child: Text(
                                        cat.name,
                                        style: const TextStyle(
                                            fontSize: 18.0,
                                            color: CupertinoColors.systemBlue,
                                            fontWeight: FontWeight.w600),
                                      ),
                                    ),
                                    subtitle: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          'Breed: ${cat.breed}',
                                          style:
                                              const TextStyle(fontSize: 15.0),
                                        ),
                                        Text(
                                          'Gender: ${cat.gender}',
                                          style:
                                              const TextStyle(fontSize: 15.0),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              bottom: 10.0),
                                          child: Text(
                                            'Age: ${cat.age}',
                                            style:
                                                const TextStyle(fontSize: 14.0),
                                          ),
                                        ),
                                      ],
                                    ),
                                    trailing: const Icon(
                                      CupertinoIcons.forward,
                                      color: CupertinoColors.inactiveGray,
                                    ),
                                    onTap: () {
                                      viewModel.selectedCatIndex = index;
                                      Navigator.of(context).push(
                                        CupertinoPageRoute(
                                          builder: (context) =>
                                              CatDetailsView(cat: cat),
                                        ),
                                      );
                                    },
                                  ),
                                );
                              },
                            ),
                          ),
                        ],
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
