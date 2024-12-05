<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Entity\Details;
use App\Form\DetailsType;
use App\Repository\ProduitRepository;
use App\Repository\CommandeRepository;
use App\Repository\DetailsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/details')]
class DetailsController extends AbstractController
{
    #[Route('/', name: 'app_details_index', methods: ['GET'])]
    public function index(DetailsRepository $detailsRepository, ProduitRepository $produitRepository, CommandeRepository $commandeRepository): Response
    {
        $produits = $produitRepository->findAll();

        /** @var \App\Entity\User $user */
        $user = $this->getUser();
        return $this->render('details/index.html.twig', [
            'details' => $detailsRepository->findBy(['user' => $user->getId()]),
            'detailsAdmin' => $detailsRepository->findAll(),
            'produits' => $produits,
            'user'=>$user->getId(),
        ]);
    }

    #[Route('/new/{id}', name: 'app_details_new', methods: ['GET', 'POST'])]
    public function new(
        Request $request,
        EntityManagerInterface $entityManager,
        
        ProduitRepository $produitRepository,
        CommandeRepository $commandeRepository,int $id = null
    ): Response {
       
        /** @var \App\Entity\User $user */
        $details = new Details();
        $user = $this->getUser();
        $roleUser= $user->getRoles();
        $produits = $produitRepository->findAll();
        
        if($roleUser[0]== 'ROLE_ADMIN'){
            $form = $this->createForm(DetailsType::class, $details);
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($details);  
            $entityManager->flush();    
            $this->addFlash('success','Nouvelle détails crée');                      
            return $this->redirectToRoute('app_details_index', [], Response::HTTP_SEE_OTHER);

            }
            return $this->render('details/new.html.twig', [
                'details' => $details,
                'form' => $form,
                'produits' => $produits,
            ]);
            
        }else{
        /** @var \App\Entity\User $user */
        // Assurez-vous que l'entité Commande existe dans votre application
        $produit = $produitRepository->findOneBy(['id' => $id]);
        $commande = $commandeRepository->findOneBy(['user' => $user->getId()]);        
        $details = new Details();
        $details->setQuantite(0);
        $details->setTotal(0);
        $details->setUser($user);
        $details->setCommande($commande);
        $details->setProduit($produit);
        $entityManager->persist($details);
        $entityManager->flush();
        
        $this->addFlash('success','Nouvelle categorie crée');
       return $this->redirectToRoute('app_categorie_index', [], Response::HTTP_SEE_OTHER);
    }
    
    
        
       
    }

    #[Route('/{id}', name: 'app_details_show', methods: ['GET'])]
    public function show(Details $detail): Response
    {
        return $this->render('details/show.html.twig', [
            'detail' => $detail,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_details_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Details $detail, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(DetailsType::class, $detail);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();
            $this->addFlash('warning','Details modifié');
            return $this->redirectToRoute('app_details_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('details/edit.html.twig', [
            'detail' => $detail,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_details_delete', methods: ['POST'])]
    public function delete(Request $request, Details $detail, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $detail->getId(), $request->request->get('_token'))) {
            $entityManager->remove($detail);
            $entityManager->flush();
        }
        $this->addFlash('danger','Details');         
        return $this->redirectToRoute('app_details_index', [], Response::HTTP_SEE_OTHER);
    }
}
