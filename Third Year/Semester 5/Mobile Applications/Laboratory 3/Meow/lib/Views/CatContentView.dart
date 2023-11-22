import 'package:flutter/cupertino.dart';
import 'CatListView.dart';

class CatContentView extends StatelessWidget {
  const CatContentView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.systemBackground,
      child: Stack(
        children: <Widget>[
          Image.asset(
            'assets/images/home.jpeg',
            fit: BoxFit.cover,
            height: double.infinity,
            width: double.infinity,
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const Text(
                  'Welcome to Meow',
                  style: TextStyle(
                    fontSize: 40.0,
                    fontWeight: FontWeight.bold,
                    color: CupertinoColors.activeBlue,
                  ),
                ),
                const SizedBox(height: 10.0),
                const Text(
                  'The "Adopt a Cat" app for your next fluffy friend',
                  style: TextStyle(
                    fontSize: 18.0,
                    color: CupertinoColors.activeBlue,
                  ),
                ),
                const SizedBox(height: 600.0),
                Padding(
                  padding: const EdgeInsets.only(top: 60.0),
                  child: SizedBox(
                    height: 44.0,
                    child: CupertinoButton.filled(
                      onPressed: () {
                        Navigator.pushNamed(context, '/cat_list_view');
                      },
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      borderRadius: BorderRadius.circular(10),
                      minSize: 350.0,
                      child: const Text(
                        "Get Started",
                        style: TextStyle(
                          fontSize: 18.0,
                          color: CupertinoColors.white,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
