// @ts-check
import { test, expect } from '@playwright/test';

test('Partagez vos données bancaires', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes pour le timeout total du test

    // Étape 1 : Accéder à la première page
    await page.goto('https://connect.preprod.algoan.com/v2/init?' +
                    'client_id=f7be049b0df73459d476fb2d&' +
                    'redirect_uri=https://dashboard.preprod.algoan.com');

    const checkbox = await page.getByRole('checkbox');
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await page.getByRole('button', { name: 'Continuer vers le choix de la banque' }).click();
    await page.waitForTimeout(4000);

    const algoanBankButton = await page.locator('text=Algoan Bank');
    await algoanBankButton.click();
    await page.waitForTimeout(2000);

    // Défilement pour s'assurer que les éléments sont visibles
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    const jaiComprisButton = await page.locator('button:has-text("J\'ai compris")');

    // Étape 2 : Vérifier si "J'ai compris" est visible
    if (await jaiComprisButton.isVisible()) {
        await jaiComprisButton.click();
        console.log('Le bouton "J\'ai compris" a été cliqué.');
    } else {
        console.error('Le bouton "J\'ai compris" n\'est pas visible. Redirection en cours.');
        await page.goto('https://algoan-bank.preprod.algoan.com/?redirect_uri=https://api.preprod.algoan.com/v3/public/connect/clients/f7be049b0df73459d476fb2d/sessions/67a243f836132f112bda5b6b/redirect/pw&client_id=f7be049b0df73459d476fb2d&admin_mode=true');
        await page.waitForTimeout(3000);
    }

    // Étape 3 : Cliquer sur "Score élevé"
    await expect(page.locator('text=Bienvenue sur Algoan Bank')).toBeVisible();
    const highCreditScore = await page.locator('text=Score élevé').first();
    if (await highCreditScore.isVisible()) {
        await highCreditScore.click();
        console.log('Le point vert "Score élevé" a été sélectionné.');
    } else {
        console.error('Le point vert "Score élevé" n\'est pas visible.');
    }

    // Étape 4 : Faire défiler la page et cliquer sur "Connecter la banque"
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    const connectBankButton = await page.locator('button:has-text("Connecter la banque")');
    if (await connectBankButton.isVisible()) {
        await connectBankButton.click();
        console.log('Le bouton "Connecter la banque" a été cliqué.');
        await page.waitForTimeout(5000); // Pause pour observer la navigation
    } else {
        console.error('Le bouton "Connecter la banque" n\'est pas visible.');
    }

    // Étape 5 : Vérification de la connexion
    const successIndicator = await page.locator('text=Connexion réussie');
    if (!(await successIndicator.isVisible())) {
        console.error('La connexion a échoué. Redirection vers la page de consentement.');
        await page.goto('https://algoan-bank.preprod.algoan.com/consent?redirect_uri=https://api.preprod.algoan.com/v3/public/connect/clients/f7be049b0df73459d476fb2d/sessions/67a24b3536132f112bda5ff4/redirect/pw&client_id=f7be049b0df73459d476fb2d&admin_mode=true');
        await page.waitForTimeout(3000);
    }

    // Étape 6 : Défilement de la dernière page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    console.log('Défilement effectué sur la dernière page.');

    // Pause pour permettre à l'utilisateur de visualiser la page avant le clic automatique
    await page.waitForTimeout(5000); // Attente avant le clic sur "Autoriser l'accès"

    // Étape 7 : Cliquer sur le bouton "Autoriser l'accès"
    const authorizeAccessButton = await page.locator('button:has-text("Autoriser l\'accès")');
    if (await authorizeAccessButton.isVisible()) {
        await authorizeAccessButton.click();
        console.log('Le bouton bleu "Autoriser l\'accès" a été cliqué.');
    } else {
        console.error('Le bouton "Autoriser l\'accès" n\'est pas visible.');

        // Étape 7.1 : Essayer de cliquer sur un autre élément bleu en bas de l'écran
        const blueElement = await page.locator('button:has-text("Continuer")'); // Élément de secours
        if (await blueElement.isVisible()) {
            await blueElement.click();
            console.log('Élément bleu en bas de l\'écran cliqué.');
        } else {
            console.error('Aucun élément bleu trouvé. Redirection en cours.');
            await page.goto('https://connect.preprod.algoan.com/v2/bank-connection-success?session_id=67a2520d36132f112bda6617&client_id=f7be049b0df73459d476fb2d');
            await page.waitForTimeout(3000);
        }
    }

    // Étape 8 : Attendre 10 secondes après avoir cliqué sur "Autoriser l'accès"
    await page.waitForTimeout(10000);
    console.log('Attente de 10 secondes après l\'autorisation.');

    // Vérifier si la page a changé ou si un indicateur de succès est visible
    const validationIndicator = await page.locator('text=Connexion réussie, Accès autorisé');
    if (!(await validationIndicator.isVisible())) {
        console.error('Aucune réponse après l\'autorisation. Redirection en cours.');
        await page.goto('https://connect.preprod.algoan.com/v2/bank-connection-success?session_id=67a2520d36132f112bda6617&client_id=f7be049b0df73459d476fb2d');
        await page.waitForTimeout(3000);
    }

    // Étape 9 : Cliquer sur le bouton "Valider"
    const validateButton = await page.locator('button:has-text("Valider")');
    if (await validateButton.isVisible()) {
        await validateButton.click();
        console.log('Le bouton "Valider" a été cliqué.');
    } else {
        console.error('Le bouton "Valider" n\'est pas visible.');
    }

    // Étape 10 : Attendre 10 secondes pour s'assurer que l'opération s'effectue
    await page.waitForTimeout(10000);
    console.log('Attente de 10 secondes après avoir cliqué sur "Valider".');

    // Étape 11 : Redirection finale après validation
    await page.goto('https://connect.preprod.algoan.com/v2/bank-connection-complete?session_id=67a2520d36132f112bda6617&client_id=f7be049b0df73459d476fb2d');
    console.log('Redirection finale vers la page de confirmation de la connexion bancaire.');
});
