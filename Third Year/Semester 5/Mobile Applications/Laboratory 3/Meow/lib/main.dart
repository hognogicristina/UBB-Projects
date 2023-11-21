import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import 'ViewModels/CatListViewModel.dart';
import 'Views/CatContentView.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => CatListViewModel(),
      child: const CupertinoApp(
        home: CatContentView(),
      ),
    );
  }
}