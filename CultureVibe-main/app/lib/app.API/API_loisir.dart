import "dart:convert";
import 'dart:math';
import 'package:http/http.dart' as http;

class LoisirApi {
  static const String baseUrl = "http://10.0.2.2:8000/";
  // static const String baseUrl = "http://localhost:8000/";

  // Rechercher les loisirs
  static Future<List<dynamic>> getAllLoisirs() async {
    try {
      var response = await http.get(Uri.parse(baseUrl + "loisirs"));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return Future.error("Server error");
      }
    } catch (e) {
      return Future.error("Error: ${e.toString()}");
    }
  }

  // Créer un nouveau loisir
  static Future<void> createLoisir(Map<String, dynamic> loisirData) async {
    try {
      var response = await http.post(
        Uri.parse(baseUrl + "loisir"),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(loisirData),
      );
      if (response.statusCode != 201) {
        throw Exception('Failed to create loisir ${response.body}');
      }
    } catch (e) {
      throw Exception('Error: ${e.toString()}');
    }
  }

  // Récupérer un loisir par ID
  static Future<dynamic> getLoisirById(int id) async {
    try {
      var response = await http.get(Uri.parse(baseUrl + "loisir/$id"));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return Future.error('Loisir non trouvé');
      }
    } catch (e) {
      return Future.error('Error: ${e.toString()}');
    }
  }

  // Rechercher le top 5 des loisirs
  static Future<List<dynamic>> getTopLoisir() async {
    try {
      var response = await http.get(Uri.parse(baseUrl + "topLoisir"));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return Future.error("Server error");
      }
    } catch (e) {
      return Future.error("Error: ${e.toString()}");
    }
  }

  // Rechercher le top 5 des loisirs par categorie
  static Future<List<dynamic>> getTopLoisirByCategory(String categorie) async {
    try {
      var response =
          await http.get(Uri.parse(baseUrl + "topLoisirByCategory/$categorie"));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return Future.error("Server error");
      }
    } catch (e) {
      return Future.error("Error: ${e.toString()}");
    }
  }

  // Récupérer les categories
  static Future<List<dynamic>> getAllCategories() async {
    try {
      var response = await http.get(Uri.parse(baseUrl + "category"));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        return Future.error("Server error");
      }
    } catch (e) {
      return Future.error("Error: ${e.toString()}");
    }
  }

  // Creer une note
  static Future<void> createRating(Map<String, dynamic> ratingData) async {
    try {
      var response = await http.post(
        Uri.parse(baseUrl + "notation"),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(ratingData),
      );
      if (response.statusCode != 201) {
        throw Exception('Failed to create rating ${response.body}');
      }
    } catch (e) {
      throw Exception('Error: ${e.toString()}');
    }
  }
}
