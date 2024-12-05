import 'package:app/app.API/API_loisir.dart';
import 'package:app/screens/home_page.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';

class CreateLoisirForm extends StatefulWidget {
  @override
  _CreateLoisirFormState createState() => _CreateLoisirFormState();
}

class _CreateLoisirFormState extends State<CreateLoisirForm> {
  final _formKey = GlobalKey<FormState>();
  String? _title;
  String? _description;
  DateTime? _publicationDate;
  String? _image;
  Category? _selectedCategory;
  List<Category> _categories = [];

  @override
  void initState() {
    super.initState();
    _fetchCategories();
  }

  Future<void> _fetchCategories() async {
    try {
      final categories = await LoisirApi.getAllCategories();
      setState(() {
        _categories =
            categories.map<Category>((json) => parseCategory(json)).toList();
        print("Catégories récupérées : $_categories");
      });
    } catch (e) {
      print('Failed to load categories: $e');
    }
  }

  Future<void> _submitForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      final newLoisir = {
        'titre': _title,
        'description': _description,
        'date_publication': DateFormat('yyyy-MM-dd').format(_publicationDate!),
        'image': _image,
        'category_id': _selectedCategory!.id,
      };
      try {
        await LoisirApi.createLoisir(newLoisir);
        ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Loisir créé avec succès')));
        // Ramener l'utilisateur à la page d'accueil et supprimer toutes les routes précédentes
        Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => const HomePage()),
          (Route<dynamic> route) => false,
        );
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
            content: Text('Erreur lors de la création du loisir: $e')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Créer un loisir'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: <Widget>[
              TextFormField(
                decoration: const InputDecoration(labelText: 'Titre'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Veuillez entrer un titre';
                  }
                  return null;
                },
                onSaved: (value) {
                  _title = value;
                },
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Description'),
                maxLines: 3,
                onSaved: (value) {
                  _description = value;
                },
              ),
              TextFormField(
                decoration:
                    const InputDecoration(labelText: 'Date de publication'),
                onTap: () async {
                  FocusScope.of(context).requestFocus(FocusNode());
                  DateTime? date = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(2000),
                    lastDate: DateTime(2100),
                  );
                  if (date != null) {
                    setState(() {
                      _publicationDate = date;
                    });
                  }
                },
                validator: (value) {
                  if (_publicationDate == null) {
                    return 'Veuillez sélectionner une date';
                  }
                  return null;
                },
                onSaved: (value) {
                  // Date is already set
                },
                readOnly: true,
                controller: TextEditingController(
                  text: _publicationDate == null
                      ? ''
                      : DateFormat('yyyy-MM-dd').format(_publicationDate!),
                ),
              ),
              TextFormField(
                decoration: const InputDecoration(labelText: 'Image URL'),
                onSaved: (value) {
                  _image = value;
                },
              ),
              DropdownButtonFormField<Category>(
                decoration: const InputDecoration(labelText: 'Catégorie'),
                items: _categories.map((Category category) {
                  return DropdownMenuItem<Category>(
                    value: category,
                    child: Text(category.name),
                  );
                }).toList(),
                onChanged: (Category? newValue) {
                  setState(() {
                    _selectedCategory = newValue;
                  });
                },
                validator: (value) => value == null
                    ? 'Veuillez sélectionner une catégorie'
                    : null,
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _submitForm,
                child:
                    const Text('Créer', style: TextStyle(color: Colors.white)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF806491),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

Category parseCategory(Map<String, dynamic> json) {
  return Category(
    id: json['id'],
    name: json['nom'],
  );
}

class Category {
  final int id;
  final String name;

  Category({required this.id, required this.name});

  @override
  String toString() {
    return 'Category{id: $id, name: $name}';
  }
}
