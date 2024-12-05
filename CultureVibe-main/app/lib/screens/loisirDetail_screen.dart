import 'package:app/app.API/API_loisir.dart';
import 'package:app/screens/list_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:intl/intl.dart'; // Pour le formatage de la date
import 'package:intl/date_symbol_data_local.dart'; // Pour initialiser la date locale
import 'package:app/app.classname/header.dart';
import 'package:app/app.classname/footer.dart';

class LoisirDetailScreen extends StatefulWidget {
  final Map<String, dynamic> loisir;

  LoisirDetailScreen({required this.loisir});

  @override
  _LoisirDetailScreenState createState() => _LoisirDetailScreenState();
}

class _LoisirDetailScreenState extends State<LoisirDetailScreen> {
  late Future<void> _initializeDateFuture;
  final _formKey = GlobalKey<FormState>();
  double _note = 0.0;

  @override
  void initState() {
    super.initState();
    _initializeDateFuture = initializeDateFormatting('fr_FR', null);
  }

  Future<void> _submitRating() async {
    try {
      if (_formKey.currentState!.validate()) {
        _formKey.currentState!.save();
        final newRating = {
          'note': _note,
          'loisir_id': widget.loisir['id'],
          'date_notation': DateTime.now().toString(),
        };
        await LoisirApi.createRating(newRating);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Note soumise avec succès')),
        );
        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => const ListPage()),
          (Route<dynamic> route) => false,
        );
      }
    } catch (e) {
      print('Erreur lors de la soumission de la note: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const HeaderWidget(
          title: 'Culture Vibe',
          imagePath: 'images/logo.png',
        ),
        backgroundColor: const Color(0xFF2F70AF),
      ),
      bottomNavigationBar: const FooterWidget(currentPage: 'Loisirs'),
      body: FutureBuilder<void>(
        future: _initializeDateFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return const Center(
                child:
                    Text('Erreur de chargement des données de localisation'));
          } else {
            return SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Card(
                elevation: 8,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Center(
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(16),
                          child: Image.network(
                            widget.loisir['image'] ??
                                'https://via.placeholder.com/150',
                            height: 200,
                            width: double.infinity,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        widget.loisir['titre'] ?? 'Titre non disponible',
                        style: const TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF2F70AF),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        widget.loisir['description'] ??
                            'Description non disponible',
                        style: const TextStyle(
                          fontSize: 16,
                          color: Colors.black87,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Catégorie: ${widget.loisir['categorie'] ?? 'Non disponible'}',
                        style: const TextStyle(
                          fontSize: 16,
                          fontStyle: FontStyle.italic,
                          color: Colors.grey,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Notation: ${widget.loisir['note']?.toString() ?? 'Non noté'}',
                        style: const TextStyle(
                          fontSize: 16,
                          color: Colors.amber,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Date: ${widget.loisir['date_publication']?.toString() ?? 'Aucune date'}',
                        style: const TextStyle(
                          fontSize: 16,
                          color: Colors.grey,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Center(
                        child: RatingBar.builder(
                          initialRating:
                              widget.loisir['note']?.toDouble() ?? 0.0,
                          minRating: 1,
                          direction: Axis.horizontal,
                          allowHalfRating: true,
                          itemCount: 5,
                          itemPadding:
                              const EdgeInsets.symmetric(horizontal: 4.0),
                          itemBuilder: (context, _) => const Icon(
                            Icons.star,
                            color: Colors.amber,
                          ),
                          onRatingUpdate: (rating) {
                            setState(() {
                              _note = rating;
                            });
                          },
                        ),
                      ),
                      const SizedBox(height: 16),
                      Center(
                        child: Form(
                          key: _formKey,
                          child: Column(
                            children: [
                              TextFormField(
                                decoration: InputDecoration(
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                  labelText: 'Saisir une note (0 à 5)',
                                ),
                                keyboardType: TextInputType.number,
                                maxLength: 1,
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Veuillez entrer une note';
                                  }
                                  final parsedValue = double.tryParse(value);
                                  if (parsedValue == null ||
                                      parsedValue < 0 ||
                                      parsedValue > 5) {
                                    return 'Veuillez entrer une note valide entre 0 et 5';
                                  }
                                  return null;
                                },
                                onSaved: (value) {
                                  _note = double.parse(value!);
                                },
                              ),
                              const SizedBox(height: 8),
                              ElevatedButton(
                                onPressed: _submitRating,
                                child: const Text(
                                  'Ajouter une note',
                                  style: TextStyle(color: Colors.white),
                                ),
                                style: ElevatedButton.styleFrom(
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                  backgroundColor: const Color(0xFF806491),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          }
        },
      ),
    );
  }
}
