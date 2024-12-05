import 'package:flutter/material.dart';

class SortFilterButtons extends StatelessWidget {
  final String? selectedCategory;
  final List<String> categories;
  final VoidCallback onSortByTitle;
  final VoidCallback onSortByDate;
  final ValueChanged<String?> onCategorySelected;

  const SortFilterButtons({
    Key? key,
    required this.selectedCategory,
    required this.categories,
    required this.onSortByTitle,
    required this.onSortByDate,
    required this.onCategorySelected,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          ElevatedButton(
            onPressed: onSortByTitle,
            child: const Text('a-z'),
            style: ElevatedButton.styleFrom(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          ElevatedButton(
            onPressed: onSortByDate,
            child: const Text('Date'),
            style: ElevatedButton.styleFrom(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          DropdownButton<String>(
            value: selectedCategory,
            hint: const Text('Catégories'),
            items: categories.map((String category) {
              return DropdownMenuItem<String>(
                value: category,
                child: Text(category),
              );
            }).toList(),
            onChanged: onCategorySelected,
            underline: Container(
              height: 2,
              color: const Color(0xFF2F70AF),
            ),
          ),
        ],
      ),
    );
  }
}
