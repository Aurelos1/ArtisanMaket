import 'package:flutter/material.dart';

class HeaderWidget extends StatelessWidget {
  final String title;
  final String imagePath;

  const HeaderWidget({
    Key? key,
    required this.title,
    required this.imagePath,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Image.asset(
            imagePath,
            height: 40.0,
            width: 40.0,
          ),
        ),
        Text(
          title,
          style: TextStyle(
            fontSize: 24.0,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ],
    );
  }
}
