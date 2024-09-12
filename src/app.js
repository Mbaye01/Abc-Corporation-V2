const readlineSync = require("readline-sync");
const customerModule = require("./customerModule");
const productModule = require("./productModule");
const orderModule = require("./orderModule");
const paymentModule = require("./paymentModule");

// Menu principal
function mainMenu() {
  console.log("1 Ajouter un customer");
  console.log("2 Lister tous les customers");
  console.log("3 Mettre à jour les infos d'un customer");
  console.log("4 Supprimer un customer");
  console.log("5 Ajouter un produit");
  console.log("6 Lister tous les produits");
  console.log("7 Mettre à jour un produit");
  console.log("8 Supprimer un produit");
  console.log("9 Ajouter une commande");
  console.log("10 Lister toutes les commandes");
  console.log("11 Mettre à jour une commande");
  console.log("12 Supprimer une commande");
  console.log("13 Ajouter un paiement");
  console.log("14 Lister tous les paiements");
  console.log("0 Quitter");
  const choix = readlineSync.question("Votre choix : ");
  return choix;
}

// Sous-menus
function customerMenu() {
  console.log("1. Ajouter un customer");
  console.log("2. Lister tous les customers");
  console.log("3. Mettre à jour un customer");
  console.log("4. Supprimer un customer");
  console.log("0. Retour");
  const choix = readlineSync.question("Votre choix : ");
  return choix;
}

function productMenu() {
  console.log("1. Ajouter un produit");
  console.log("2. Lister tous les produits");
  console.log("3. Mettre à jour un produit");
  console.log("4. Supprimer un produit");
  console.log("0. Retour");
  const choix = readlineSync.question("Votre choix : ");
  return choix;
}

function orderMenu() {
  console.log("1. Ajouter une commande");
  console.log("2. Lister toutes les commandes");
  console.log("3. Mettre à jour une commande");
  console.log("4. Supprimer une commande");
  console.log("0. Retour");
  const choix = readlineSync.question("Votre choix : ");
  return choix;
}

function paymentMenu() {
  console.log("1. Ajouter un paiement");
  console.log("2. Lister tous les paiements");
  console.log("0. Retour");
  const choix = readlineSync.question("Votre choix : ");
  return choix;
}

// Fonction principale pour gérer le menu
async function main() {
  let choix = mainMenu();
  while (choix !== "0") {
    switch (choix) {
      case "1": // Customer Menu
        let customerChoice = customerMenu();
        while (customerChoice !== "0") {
          switch (customerChoice) {
            case "1":
              customerModule.addCustomer();
              break;
            case "2":
              customerModule.listCustomers();
              break;
            case "3":
              customerModule.updateCustomer();
              break;
            case "4":
              customerModule.deleteCustomer();
              break;
          }
          customerChoice = customerMenu();
        }
        break;
      case "5": // Product Menu
        let productChoice = productMenu();
        while (productChoice !== "0") {
          switch (productChoice) {
            case "1":
              productModule.addProduct();
              break;
            case "2":
              productModule.listProducts();
              break;
            case "3":
              productModule.updateProduct();
              break;
            case "4":
              productModule.deleteProduct();
              break;
          }
          productChoice = productMenu();
        }
        break;
      case "9": // Order Menu
        let orderChoice = orderMenu();
        while (orderChoice !== "0") {
          switch (orderChoice) {
            case "1":
              orderModule.addOrder();
              break;
            case "2":
              orderModule.listOrders();
              break;
            case "3":
              orderModule.updateOrder();
              break;
            case "4":
              orderModule.deleteOrder();
              break;
          }
          orderChoice = orderMenu();
        }
        break;
      case "13": // Payment Menu
        let paymentChoice = paymentMenu();
        while (paymentChoice !== "0") {
          switch (paymentChoice) {
            case "1":
              paymentModule.addPayment();
              break;
            case "2":
              paymentModule.listPayments();
              break;
          }
          paymentChoice = paymentMenu();
        }
        break;
    }
    choix = mainMenu();
  }
}

main();
