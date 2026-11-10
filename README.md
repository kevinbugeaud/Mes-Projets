# Site Tesla — version complète

Ouvrez le dossier dans VS Code, puis index.html avec Live Server. Le serveur local permet aux différentes pages de partager le panier. Aucune compilation requise.

Fonctionnalités : accueil et navigation corrigés, quatre véhicules et couleurs, énergie, trois bornes illustrées, panier avec quantités/suppression/total, formulaires de support et connexion simulés, traduction français/anglais, mentions légales, contacts et actualités sourcées.

Les formulaires ne transmettent ni ne stockent les données saisies. Aucun paiement ou compte réel. Ne pas utiliser un vrai mot de passe. Prix, caractéristiques et disponibilités fictifs. Les images des véhicules ne changent pas selon la couleur sélectionnée.

Modifiez les textes français dans les HTML et leurs traductions dans translations.js. Le style est réparti entre style.css, header-footer.css, informations.css et complete.css. Les interactions sont dans complete.js ; le panier partagé dans store.js. L’ancien vehicle.js est conservé mais n’est plus chargé. Les données des produits sont dans vehicles-data.js et chargers-data.js : garder les fiches HTML cohérentes avec ces données.

Le panier utilise tesla-demo-cart-v1 dans localStorage. La préférence linguistique utilise tesla-demo-language. Le paramètre ?lang=en permet de partager une page en anglais. Utiliser la même adresse et le même navigateur pour retrouver le panier. Le double-clic sur les fichiers HTML peut isoler leur stockage selon le navigateur ; Live Server est recommandé.

Les photos et illustrations sont incluses dans assets. Photos véhicules : ressources officielles Tesla Mega-Menu-Vehicles-Model-3.png, Model-Y, Model-S et Model-X sur digitalassets.tesla.com. Fond fourni par l’utilisateur. Maison et bornes : illustrations SVG originales. Licence Heroicons MIT incluse dans assets.

Les sources officielles des contacts et actualités, consultées le 4 novembre 2026, sont liées dans les pages. Actualités à mettre à jour manuellement. Identité de l’éditeur et hébergeur à renseigner dans les mentions légales avant publication. Maquette indépendante de Tesla.

Vérifications : 16 pages, références locales, syntaxe JavaScript, stockage, totaux, quantités, suppression, rechargement, erreurs de stockage, couleurs, indisponibilité, précommande, changement de langue et messages. Traductions vérifiées sur le contenu et les libellés.
Le rendu visuel et les interactions dans un véritable navigateur restent à vérifier avec Live Server.
