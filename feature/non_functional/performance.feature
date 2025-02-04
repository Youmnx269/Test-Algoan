Feature: Test de charge de la fonctionnalité de sélection de la banque

  Scenario: Simuler 1000 utilisateurs accédant simultanément à la sélection de la banque
    Given que l'outil de test de charge est configuré avec 1000 utilisateurs virtuels
    And chaque utilisateur est prêt à sélectionner une banque de manière aléatoire
    When les 1000 utilisateurs commencent à sélectionner des banques simultanément pendant 10 minutes
    Then le temps de réponse pour chaque sélection de banque ne doit pas dépasser 3 secondes
    And aucune erreur serveur (500, 502, 504) ne doit survenir
