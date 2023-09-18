# REDIS Ecommerce

## Projet

-   Serveur Node Express
-   Un client VueJS
-   Un admin VueJS

## Installation

### Pré-requis

-   Avoir installé `redis-stack` sur la machine

### Les commandes

-   Faire ces commandes : `npm i && npm run install && npm run watch`
-   Ces commandes installent `concurrently`, les dépendances du serveur et du client, et enfin démarrent les deux services.

### Les commandes avec docker cli v2

Faire ces commandes : `npm i && npm run install`
`npm run docker:up:build` la première fois, la commande installe concurrently, les dépendances du serveur et du client, et enfin démarrent les services docker.
`npm run docker:up` les fois suivantes
