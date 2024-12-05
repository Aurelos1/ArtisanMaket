import 'package:flutter/material.dart';
import 'package:app/screens/home_page.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Time tracker',
      theme: ThemeData(
        primaryColor: Colors.red,
      ),
      home: const HomePage(),
    );
  }
}
