<?php

namespace App\Form;

use App\Entity\Commande;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CommandeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('date', DateType::class, [
            'widget' => 'single_text', // Utilisez le widget de sélection de date HTML5
            'attr' => ['class' => 'form-control', 'placeholder' => 'JJ/MM/AAAA'],
            // Ajoutez d'autres options comme 'format' si nécessaire
        ])
        ->add('total', TextType::class, [
            'attr' => ['class' => 'form-control', 'placeholder' => 'Total'],
        ])
        ->add('statut', ChoiceType::class, [
            'choices' => [
                'En attente' => 'En attente',
                'Valider' => 'Valider',
                'Annulé' => 'Annuler'
            ],
            'placeholder' => 'Choisissez un statut', // Placeholder pour un menu déroulant
            'attr' => ['class' => 'form-control'],
        ])
        ->add('user', EntityType::class, [
            'class' => User::class,
            'choice_label' => 'nom',
            'placeholder' => 'Sélectionnez un utilisateur', // Placeholder pour un menu déroulant
            'attr' => ['class' => 'form-control'],
        ])
    ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Commande::class,
        ]);
    }
}
