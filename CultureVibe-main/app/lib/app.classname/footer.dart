import 'package:app/app.API/API_loisir.dart';
import 'package:app/components/create_loisir_form.dart';
import 'package:app/screens/home_page.dart'; // Assurez-vous d'importer la HomePage
import 'package:app/screens/list_page.dart'; // Assurez-vous d'importer la ListPage
import 'package:flutter/material.dart';

class FooterWidget extends StatefulWidget {
  final String currentPage; // Ajouter un paramètre pour la page actuelle

  const FooterWidget({Key? key, required this.currentPage}) : super(key: key);

  @override
  _FooterWidgetState createState() => _FooterWidgetState();
}

class _FooterWidgetState extends State<FooterWidget> {
  late int currentPageIndex;

  @override
  void initState() {
    super.initState();
    currentPageIndex =
        _getPageIndex(widget.currentPage); // Initialiser currentPageIndex
  }

  int _getPageIndex(String page) {
    switch (page) {
      case 'Accueil':
        return 0;
      case 'Loisirs':
        return 1;
      default:
        return 0;
    }
  }

  void _navigateToPage(int index) {
    if (currentPageIndex != index) {
      setState(() {
        currentPageIndex = index;
      });
      switch (index) {
        case 0:
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => const HomePage()),
            (Route<dynamic> route) => false,
          );
          break;
        case 1:
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => ListPage()),
            (Route<dynamic> route) => false,
          );
          break;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        NavigationBar(
          onDestinationSelected: (int index) {
            _navigateToPage(index);
          },
          indicatorColor: const Color(0xFF806491),
          selectedIndex: currentPageIndex,
          destinations: <Widget>[
            NavigationDestination(
              selectedIcon: Icon(Icons.home,
                  color:
                      currentPageIndex == 0 ? Colors.white : Color(0xFF806491)),
              icon: Icon(Icons.home_outlined,
                  color:
                      currentPageIndex == 0 ? Colors.white : Color(0xFF806491)),
              label: 'Accueil',
            ),
            NavigationDestination(
              selectedIcon: Icon(Icons.book,
                  color:
                      currentPageIndex == 1 ? Colors.white : Color(0xFF806491)),
              icon: Icon(Icons.book_outlined,
                  color:
                      currentPageIndex == 1 ? Colors.white : Color(0xFF806491)),
              label: 'Loisirs',
            ),
          ],
        ),
        Positioned(
          top: 5,
          child: FloatingActionButton(
            onPressed: () {
              // appel de la page de création de loisir
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => CreateLoisirForm()),
              );
            },
            child: const Icon(Icons.add, color: Colors.white),
            backgroundColor: const Color(0xFF806491),
          ),
        ),
      ],
    );
  }
}
