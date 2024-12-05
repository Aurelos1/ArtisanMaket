<?php

namespace App\Controller;

use App\Repository\ArtisanRepository;
use App\Repository\CategorieRepository;
use App\Repository\ProduitRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class AccueilController extends AbstractController
{
    #[Route('/', name: 'app_accueil')]
    public function index(CategorieRepository $categorieRepository, ProduitRepository $produitRepository, ArtisanRepository $artisanRepository): Response
    {
        return $this->render('accueil/index.html.twig', [
            'categories' => $categorieRepository->findAll(),
            'produits' => $produitRepository->findAll(),
            'artisans' => $artisanRepository->findAll(),
        ]);
    }
}
