import 'package:flutter/material.dart';
import 'package:app/screens/loisirDetail_screen.dart';

class LoisirItem extends StatelessWidget {
  final Map<String, dynamic> loisir;

  const LoisirItem({Key? key, required this.loisir}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => LoisirDetailScreen(loisir: loisir),
        ));
      },
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          children: [
            Hero(
              tag: loisir['id'],
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.network(
                  loisir['image'],
                  width: 100,
                  height: 100,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    loisir['titre'],
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text('Date: ${loisir['date_publication']}'),
                  const SizedBox(height: 5),
                  Text('Catégorie: ${loisir['categorie']}'),
                  const SizedBox(height: 5),
                  Row(
                    children: [
                      const Icon(
                        Icons.star,
                        color: Colors.amber,
                        size: 20,
                      ),
                      const SizedBox(width: 5),
                      Text(
                        '${loisir['moyen_note']}/5',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 5),
                  Row(
                    children: [
                      const Icon(
                        Icons.people,
                        color: Colors.grey,
                        size: 20,
                      ),
                      const SizedBox(width: 5),
                      Text(
                        '${loisir['note']} avis',
                        style: const TextStyle(
                          fontSize: 16,
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
