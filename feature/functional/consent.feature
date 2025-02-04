Feature : Gestion et Validation du Consentement

Scenario : Donner le consentement et vérifier la redirection
    Given l'utilisateur est sur la page de consentement
    When l'utilisateur accepte le consentement
    Then l'utilisateur est redirigé vers la page de sélection de la banque



Scenario : Refuser le consentement et vérifier le blocage
    Given l'utilisateur est sur la page de consentement
    When l'utilisateur refuse le consentement
    Then l'accès à la page suivante est bloqué