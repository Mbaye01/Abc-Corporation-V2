## Evolution Base donnée Abc_Corporation

## Description

Cette application permet de gérer les clients, produits, commandes, paiements, et achats via une interface en ligne de commande. Le projet est développé en JavaScript (Node.js) avec des modules séparés pour chaque entité. Il permet d'effectuer des opérations CRUD (Create, Get, Update, Delete) sur chacune de ces entités, et les données sont stockées dans une base de données MySQL.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

Node.js (version 12 ou supérieure)
MySQL (ou MariaDB)

- [ [Node.js](https://nodejs.org/fr)] (version 12 ou supérieure)
- [ MySQL](https://www.mysql.com/)
  (version 4.0 ou supérieure)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

- Clonez le repository

bash

```
https://github.com/Mbaye01/BRIEF-BD_CRUD.git
```

- Accédez au dossier du projet :

```
cd BRIEF_BD_CRUD
```

## Installez les dépendances

```bash
npm install
```

```bash
mysql2 install
```

Pour démarrer l'application, exécutez la commande suivante :

```bash
npm start
```

### Règles de gestion

- Un produit peut etre fournie à un ou plusieurs details;
- Un client peut faire plusieurs commandes;
- Une commande n'est fait que par client;
- Un detail commande est concerné par une commande;
- Une commande doit avoir un ou plusieurs details.
- Un payment n'est concerné que par une commande

## Les Fonctions

`getCustomers()` : Permets de lister touts les clients;

`addCustomer(name : string, address : string, email : string, phone : string)` : Permets d'ajouter un nouveau client;

`editCustomer(id: int, name: string, address: string, email: string, phone: string)` : Permets de modifier les données d'un client;

`destryCustomer(id : int)` : Permets de supprimer un client;

#### productModule

`getProducts()` : Permets de lister tous les produits;

`addProduct(name: string, description: string, price: string, stock: string, category: string, barcode: string, status: string)` : Permets d'ajouter un nouveau produit;

`editProduct(id : int, name: string, description: string, price: string, stock: string, category: string, barcode: string, status: string)` : Permets de modifier les données d'un produit;

`destroyProduct(id : int)` : Permets de supprimer un produit;

#### orderModule

`getOrder()` : Permets de lister toutes les commandes;

`getOrder()` : Permets de lister une commande et ses details

`addOrder(commande: object, tableauDetails: array[object])` : Permets d'ajouter une nouvelle commande et ses details;

`editOrder(id: int, title : string, type : string, survey_id : int)` : Permets de modifier les données d'une commande et ses details;

`destryOrder(id:int)` : Permets de supprimer une commande et ses details;

#### paymentModule

`getPayments()` : Permets de lister tous les paiements;

`addPayment(id: int, order_id : int, date : string, amount : string, payment_method : string)` : Permets d'ajouter un nouveau paiement;

`editPayment(id: int, order_id : int, date : string, amount : string, payment_method : string)` : Permets de modifier les données d'un paiement;

`destroyPayment(id: int)` : Permets de supprimer une paiement;

## Author

[Mbaye Abdellahi Kalidou](https://github.com/Mbaye01/Abc-Corporation-V2.git)
