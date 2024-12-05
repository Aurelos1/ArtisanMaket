<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TelType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('email', EmailType::class, [
            'attr' => ['class' => 'form-control'], // Bootstrap class
            'label' => 'Email', // Custom label
        ])
        ->add('nom', TextType::class, [
            'attr' => ['class' => 'form-control'],
            'label' => 'Nom',
        ])
        ->add('prenom', TextType::class, [
            'attr' => ['class' => 'form-control'],
            'label' => 'Prenom',
        ])
        ->add('numero', TelType::class, [
            'attr' => ['class' => 'form-control'],
            'label' => 'Numero',
        ])
        ->add('agreeTerms', CheckboxType::class, [
            'mapped' => false,
            'label' => 'Agree to terms',
            'constraints' => [
                new IsTrue(['message' => 'You should agree to our terms.']),
            ],
            'attr' => ['class' => 'form-check-input'], // Bootstrap class for checkboxes
        ])
        ->add('plainPassword', PasswordType::class, [
            'mapped' => false,
            'label' => 'Password',
            'attr' => [
                'autocomplete' => 'new-password',
                'class' => 'form-control'
            ],
            'constraints' => [
                new NotBlank(['message' => 'Please enter a password']),
                new Length([
                    'min' => 6,
                    'minMessage' => 'Your password should be at least {{ limit }} characters',
                    'max' => 4096,
                ]),
            ],
        ])
    ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
