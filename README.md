# Test Algoan

### Test Technique QA : Sélection Bancaire Algoan

#### Contexte
L'application Algoan permet aux utilisateurs de sélectionner une banque pour se connecter à leur compte bancaire via une interface de sélection bancaire. Après la sélection de la banque, l'utilisateur est redirigé vers un flux d'authentification sécurisé pour récupérer les données bancaires.

#### Objectif
L'objectif de ce projet est de :
- Analyser les spécifications de la fonctionnalité de sélection bancaire.
- Rédiger des cas de tests fonctionnels et non fonctionnels en utilisant Cucumber.
- Automatiser certains cas de tests critiques avec Playwright.
- Identifier et rapporter des bugs potentiels.

#### Prérequis
- Node.js
- Playwright
- Cucumber

#### Installation 
Pour installer les dépendances requises, exécutez :
via bash  
npm install

#### Structure du Projet  
- /tests : Contient les scripts de tests pour Playwright.  
- /features : Dossiers contenant les fichiers .feature pour Cucumber.  
- /step_definitions : Contient les fichiers de définitions de step pour Cucumber.  
- playwright.config.js : Configuration de Playwright.  
- package.json : Contient les dépendances et scripts de projet.

#### Dépendances  
- playwright : Permet l'automatisation des navigateurs pour les tests.  
- cucumber : Utilisé pour écrire des tests acceptables pour le comportement.  
#### Exécution des Tests

Pour exécuter tous les tests avec Playwright
npx playwright test

Pour exécuter les tests Cucumber
npm run test
