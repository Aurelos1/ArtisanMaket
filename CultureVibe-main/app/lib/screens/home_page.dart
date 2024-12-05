import 'package:app/components/all_loisirs_grid.dart';
import 'package:app/components/top_loisirs_carousel.dart';
import 'package:flutter/material.dart';
import 'package:app/app.API/API_loisir.dart';
import 'package:app/app.classname/header.dart';
import 'package:app/app.classname/footer.dart';
import 'package:app/app.classname/search_bar.dart';
import 'package:app/screens/list_page.dart';
import 'package:app/screens/loisirDetail_screen.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int currentPageIndex = 0;
  List<dynamic> _topLoisirs = [];
  List<dynamic> _allLoisirs = [];

  @override
  void initState() {
    super.initState();
    _fetchTopLoisir();
    _fetchAllLoisirs();
  }

  Future<void> _fetchTopLoisir() async {
    try {
      final topLoisirs = await LoisirApi.getTopLoisir();
      setState(() {
        _topLoisirs = topLoisirs;
      });
    } catch (e) {
      print('Failed to load top loisirs: $e');
    }
  }

  Future<void> _fetchAllLoisirs() async {
    try {
      final allLoisirs = await LoisirApi.getAllLoisirs();
      setState(() {
        _allLoisirs = allLoisirs;
      });
    } catch (e) {
      print('Failed to load all loisirs: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: const HeaderWidget(
          title: 'Culture Vibe',
          imagePath: 'images/logo.png',
        ),
        backgroundColor: const Color(0xFF806491),
      ),
      bottomNavigationBar: FooterWidget(currentPage: 'Accueil'), // Passer le nom de la page actuelle
      body: <Widget>[
        /// Home page
        Column(
          children: [
            // La barre de recherche en haut
            const SearchBarWidget(),
            // Contenu de la page d'accueil
            Expanded(
              child: Column(
                children: [
                  TopLoisirsCarousel(topLoisirs: _topLoisirs),
                  Expanded(
                    child: AllLoisirsGrid(allLoisirs: _allLoisirs),
                  ),
                ],
              ),
            ),
          ],
        ),

        /// Notifications page
      ][currentPageIndex],
    );
  }
}
