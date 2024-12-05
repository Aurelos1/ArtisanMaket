import 'package:app/app.API/API_loisir.dart';
import 'package:app/screens/loisirDetail_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

class AllLoisirsGrid extends StatelessWidget {
  final List<dynamic> allLoisirs;

  const AllLoisirsGrid({required this.allLoisirs, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.grey[200], 
      child: Column(
        children: [
          const Padding(
            padding: EdgeInsets.all(8.0),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Toutes les activités',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ),
          Expanded(
            child: GridView.count(
              crossAxisCount: 2,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
              padding: const EdgeInsets.all(8.0),
              children: allLoisirs.map((loisir) {
                return InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => LoisirDetailScreen(loisir: loisir),
                      ),
                    );
                  },
                  child: Column(
                    children: [
                      Container(
                        width: double.infinity,
                        height: 90,
                        decoration: BoxDecoration(
                          color: const Color.fromARGB(255, 93, 83, 85),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Image.network(
                            loisir['image'] ??
                                'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg',
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        loisir['titre'] != null && loisir['titre'].length > 15
                            ? '${loisir['titre'].substring(0, 15)}...'
                            : loisir['titre'] ?? 'Titre inconnu',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      Text(
                        loisir['description'] != null && loisir['description'].length > 13
                            ? '${loisir['description'].substring(0, 13)}...'
                            : loisir['description'] ?? 'Aucune description',
                      ),
                      RatingBarIndicator(
                        rating: ((loisir['moyen_note']) ?? 0.0).toDouble(),
                        itemBuilder: (context, index) => const Icon(
                          Icons.star,
                          color: Colors.amber,
                        ),
                        itemCount: 5,
                        itemSize: 20.0,
                        direction: Axis.horizontal,
                      ),
                      Row(
                        children: [
                          const Icon(Icons.grade_rounded, size: 15, color: Colors.yellow),
                          Text(
                            '${loisir['note'] ?? 0} avis',
                            style: const TextStyle(fontSize: 12, color: Colors.grey),
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}
