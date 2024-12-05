import 'package:app/screens/loisirDetail_screen.dart';
import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

class TopLoisirsCarousel extends StatelessWidget {
  final List<dynamic> topLoisirs;

  const TopLoisirsCarousel({required this.topLoisirs, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.grey[200], // Couleur de fond de rect1
      height: MediaQuery.of(context).size.height / 4, // Hauteur de 1/4 de l'espace disponible
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'Découvrez les meilleurs loisirs',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 5),
          CarouselSlider(
            options: CarouselOptions(
              height: MediaQuery.of(context).size.height / 4 - 40,
              enlargeCenterPage: true,
              enableInfiniteScroll: false,
              viewportFraction: 0.8,
            ),
            items: topLoisirs.map((loisir) {
              return Builder(
                builder: (BuildContext context) {
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
                        Stack(
                          children: [
                            Container(
                              width: double.infinity,
                              height: 110,
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(10),
                                child: Image.network(
                                  loisir['image'] ??
                                      'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg',
                                  fit: BoxFit.cover,
                                ),
                              ),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(10),
                              ),
                            ),
                            Positioned(
                              bottom: 0,
                              left: 0,
                              right: 0,
                              child: Container(
                                color: Colors.black.withOpacity(0.5), // Fond noir semi-transparent
                                padding: const EdgeInsets.all(8.0),
                                child: Text(
                                  loisir['titre'] ?? 'Titre inconnu',
                                  style: const TextStyle(color: Colors.white), // Pour que le texte soit visible sur le fond noir
                                ),
                              ),
                            ),
                            Positioned(
                              top: 8,
                              left: 8,
                              child: Row(
                                children: [
                                  const Icon(Icons.grade_rounded, size: 15, color: Colors.yellow),
                                  Text(
                                    '${loisir['note'] ?? 0} avis',
                                    style: const TextStyle(fontSize: 12, color: Colors.white),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        RatingBarIndicator(
                          rating: (loisir['average_note'] ?? 0).toDouble(),
                          itemBuilder: (context, index) => const Icon(
                            Icons.star,
                            color: Colors.amber,
                          ),
                          itemCount: 5,
                          itemSize: 20.0,
                          direction: Axis.horizontal,
                        ),
                      ],
                    ),
                  );
                },
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}
