Feature : Sélection de la banque et vérification de la redirection

Scenario : Sélectionner une banque et vérifier la redirection
    Given l'utilisateur est sur la page de sélection de la banque
    When l'utilisateur sélectionne "BNP Paribas"
    Then l'utilisateur est redirigé vers la page d'authentification de la banque