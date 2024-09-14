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

suivez ces étapes pour configurer le projet sur machine locale :

- Clonez le repository

bash

```
https://github.com/Mbaye01/Abc-Corporation-V2.git
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

### Configuration de la base de données :

Le fichier ./src/db.js configure la connexion à la base de données. Avant d'exécuter l'application, remplacez "root" par votre nom d'utilisateur et "password" par votre mot de passe pour la connexion locale.

### Fonctionnalités

#### Customers

- get() : Permets de lister touts les clients;

- addCustomer(name : string, address : string, email : string, phone : string) : Permets d'ajouter un nouveau client;

- updateCustomer(id: int, name: string, address: string, email: string, phone: string) : Permets de modifier les données d'un client;

- destroyCustomer(id : int) : Permets de supprimer un client;

#### Products

- get() : Permets de lister tous les produits;

- addProduct(name: string, description: string, price: float, stock: string, category: string, barcode: string, status: string) : Permets d'ajouter un nouveau produit;

- updateProduct(id : int, name: string, description: string, price: float, stock: string, category: string, barcode: string, status: string) : Permets de modifier les données d'un produit;

- destroyProduct(id : int) : Permets de supprimer un produit;

#### Orders

- getOrderById(id : int) : Permets de lister une commande et ses details part id

- addOrder(date:date, delivery_address:string, customer_id:int, track_number:string, status:string) : Permets d'ajouter une nouvelle commande et ses details;

- updateOrder(id: int, title : string, type : string, survey_id : int) : Permets de modifier les données d'une commande

- destroyOrder(id:int) : Permets de supprimer une commande et ses details;

#### Payments

- get() : Permets de lister tous les paiements;

- addPayment(id: int, order_id : int, date : string, amount : string, payment_method : string) : Permets d'ajouter un nouveau paiement;

- updatePayment(id: int, order_id : int, date : string, amount : string, payment_method : string) : Permets de modifier les données d'un paiement;

- destroyPayment(id: int) : Permets de supprimer une paiement;

## Author

[Mbaye Abdellahi Kalidou](https://github.com/Mbaye01/Abc-Corporation-V2.git)
