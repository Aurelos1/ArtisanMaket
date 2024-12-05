import 'package:flutter/material.dart';
import 'package:app/app.API/API_loisir.dart'; // Assurez-vous d'importer votre fichier API
import 'package:app/screens/loisirDetail_screen.dart';
import 'package:intl/intl.dart'; // Assurez-vous d'importer le fichier de détail

class SearchBarWidget extends StatefulWidget {
  const SearchBarWidget({Key? key}) : super(key: key);

  @override
  State<SearchBarWidget> createState() => _SearchBarWidgetState();
}

class _SearchBarWidgetState extends State<SearchBarWidget> {
  String? _searchingWithQuery;
  late Iterable<Widget> _lastOptions = <Widget>[];
  List<Map<String, dynamic>> _allLoisirs = [];

  @override
  void initState() {
    super.initState();
    _fetchAllLoisirs();
  }

  Future<void> _fetchAllLoisirs() async {
    try {
      final List<dynamic> allLoisirs = await LoisirApi.getAllLoisirs();
      setState(() {
        _allLoisirs = allLoisirs
            .map<Map<String, dynamic>>((loisir) => {
                  'id': loisir['id'].toString(),
                  'image': loisir['image'],
                  'titre': loisir['titre'],
                  'description': loisir['description'],
                  'categorie': loisir['categorie_nom'],
                  'note': loisir['note'],
                  'moyen_note': loisir['moyen_note'],
                  'date_publication': DateFormat('dd/MM/yyyy')
                      .format(DateTime.parse(loisir['date_publication']))
                })
            .toList();
      });
    } catch (e) {
      print('Erreur lors de la requête : $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final ThemeData themeData = ThemeData(
      useMaterial3: true,
    );

    return Theme(
      data: themeData,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Container(
          color: Colors.grey[200],
          child: SearchAnchor(
            builder: (BuildContext context, SearchController controller) {
              return SearchBar(
                controller: controller,
                padding: const MaterialStatePropertyAll<EdgeInsets>(
                  EdgeInsets.symmetric(horizontal: 16.0),
                ),
                onTap: () {
                  controller.openView();
                },
                onChanged: (_) {
                  controller.openView();
                },
                leading: const Icon(Icons.search),
                trailing: [
                  IconButton(
                    icon: const Icon(Icons.filter_list),
                    onPressed: () {},
                  ),
                ],
              );
            },
            suggestionsBuilder:
                (BuildContext context, SearchController controller) async {
              _searchingWithQuery = controller.text;

              final List<Map<String, dynamic>> options = _allLoisirs
                  .where((loisir) => loisir['titre']?.toString()
                      ?.toLowerCase()
                      ?.contains(_searchingWithQuery!.toLowerCase()) ?? false)
                  .toList();

              if (_searchingWithQuery != controller.text) {
                return _lastOptions;
              }

              _lastOptions = List<ListTile>.generate(options.length, (int index) {
                final Map<String, dynamic> item = options[index];
                return ListTile(
                  title: Text(item['titre'] ?? 'Nom inconnu'),
                  onTap: () {
                    setState(() {
                      controller.closeView(item['titre']);
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => LoisirDetailScreen(loisir: item),
                        ),
                      );
                    });
                  },
                );
              });

              return _lastOptions;
            },
          ),
        ),
      ),
    );
  }
}
