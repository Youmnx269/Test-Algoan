Feature: Test de stabilité de l'application sous charge modérée

  Scenario: Vérifier la stabilité de l'application avec 500 utilisateurs simultanés pendant 24 heures
    Given que l'outil de test de charge est configuré pour simuler 500 utilisateurs simultanés
    And l'outil est programmé pour exécuter des actions de sélection de banque de manière continue
    When l'outil démarre le test de charge et l'exécute pendant 24 heures
    Then aucune dégradation des performances ne doit être observée pendant la durée du test
    And aucune erreur serveur (500, 502, 504) ou autre ne doit survenir pendant le test
