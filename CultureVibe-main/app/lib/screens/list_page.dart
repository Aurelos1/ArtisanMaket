import 'package:flutter/material.dart';
import 'package:app/app.classname/header.dart';
import 'package:app/app.classname/footer.dart';
import 'package:app/app.API/API_loisir.dart';
import 'package:intl/intl.dart';
import 'package:app/components/sort_filter_buttons.dart';
import 'package:app/components/loisir_item.dart';

class ListPage extends StatefulWidget {
  const ListPage({Key? key}) : super(key: key);

  @override
  _ListPageState createState() => _ListPageState();
}

class _ListPageState extends State<ListPage> {
  List<Map<String, dynamic>> _loisirs = [];
  List<Map<String, dynamic>> _allLoisirs = [];
  List<String> _categories = [];
  bool _isLoading = true;
  String _sortCriteria = 'date'; // Initial sort criteria is now date
  String? _selectedCategory = 'Toutes les catégories';

  @override
  void initState() {
    super.initState();
    _fetchLoisirs();
    _fetchCategories();
  }

  Future<void> _fetchLoisirs() async {
    setState(() {
      _isLoading = true;
    });

    try {
      var loisirs = await LoisirApi.getAllLoisirs();
      setState(() {
        _allLoisirs = loisirs
            .map<Map<String, dynamic>>((loisir) => {
                  'id': loisir['id'].toString(),
                  'image': loisir['image'],
                  'titre': loisir['titre'],
                  'description': loisir['description'],
                  'categorie': loisir['category_nom'],
                  'note': loisir['note'],
                  'moyen_note': loisir['moyen_note'],
                  'date_publication': loisir['date_publication'] // Keep original format
                })
            .toList();
        _sortLoisirs();
      });
    } catch (e) {
      print('Erreur lors de la récupération des loisirs: $e');
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _fetchCategories() async {
    try {
      var categories = await LoisirApi.getAllCategories();
      setState(() {
        _categories = ['Toutes les catégories'];
        _categories.addAll(
            categories.map<String>((cat) => cat['nom'].toString()).toList());
      });
    } catch (e) {
      print('Erreur lors de la récupération des catégories: $e');
    }
  }

  void _sortLoisirs() {
    setState(() {
      _loisirs = List.from(_allLoisirs);

      if (_sortCriteria == 'titre') {
        _loisirs.sort((a, b) => a['titre'].compareTo(b['titre']));
      } else if (_sortCriteria == 'date') {
        _loisirs.sort(
            (a, b) => DateTime.parse(b['date_publication'])
                .compareTo(DateTime.parse(a['date_publication'])));
      }

      if (_selectedCategory != null &&
          _selectedCategory!.isNotEmpty &&
          _selectedCategory != 'Toutes les catégories') {
        _loisirs = _loisirs
            .where((loisir) => loisir['categorie'] == _selectedCategory)
            .toList();
      }
    });
  }

  void _sortLoisirsByTitle() {
    setState(() {
      _sortCriteria = 'titre';
      _sortLoisirs();
    });
  }

  void _sortLoisirsByDate() {
    setState(() {
      _sortCriteria = 'date';
      _sortLoisirs();
    });
  }

  void _filterByCategory(String? category) {
    setState(() {
      _selectedCategory = category;
      _sortLoisirs();
    });
  }

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: HeaderWidget(
          title: 'Culture Vibe',
          imagePath: 'images/logo.png',
        ),
        backgroundColor: const Color(0xFF806491),
      ),
      bottomNavigationBar: FooterWidget(currentPage: 'Loisirs'), // Passer le nom de la page actuelle
      body: Center(
        child: Container(
          constraints: const BoxConstraints(maxWidth: 500),
          child: Column(
            children: [
              SortFilterButtons(
                selectedCategory: _selectedCategory,
                categories: _categories,
                onSortByTitle: _sortLoisirsByTitle,
                onSortByDate: _sortLoisirsByDate,
                onCategorySelected: _filterByCategory,
              ),
              Expanded(
                child: _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : ListView.builder(
                        itemCount: _loisirs.length,
                        itemBuilder: (BuildContext context, int index) {
                          final loisir = _loisirs[index];
                          // Format the date for display purposes
                          final displayDate = DateFormat('dd/MM/yyyy').format(DateTime.parse(loisir['date_publication']));
                          return LoisirItem(
                            loisir: {
                              ...loisir,
                              'date_publication': displayDate, // Use formatted date for display
                            },
                          );
                        },
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
