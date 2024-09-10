const customerModule = require("./customer-manager");
const orderModule = require("./order-manager");
const paymentModule = require("./payment-manager");
const productModule = require("./product-manager");
const purchaseModule = require("./purchase-manager");

const readlineSync = require("readline-sync");

function menu() {
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
  console.log("15 Ajouter un achat");
  console.log("16 Lister tous les achats");
  console.log("0 Quitter");
  const choix = readlineSync.question("Votre choix : ");
  return choix;
}

// Fonctions pour collecter les informations sur chaque entité
function promptAddCustomer() {
  const id = readlineSync.question("Entrez l'identifiant du customer : ");
  const name = readlineSync.question("Entrez le nom : ");
  const email = readlineSync.question("Entrez l'email : ");
  const address = readlineSync.question("Entrez l'adresse : ");
  const phone = readlineSync.question("Entrez le téléphone : ");
  return { id, name, email, address, phone };
}

function promptAddProduct() {
  const id = readlineSync.question("Entrez l'identifiant du produit : ");
  const name = readlineSync.question("Entrez le nom du produit : ");
  const price = readlineSync.questionFloat("Entrez le prix : ");
  return { id, name, price };
}

function promptAddOrder() {
  const id = readlineSync.question("Entrez l'identifiant de la commande : ");
  const customerId = readlineSync.question(
    "Entrez l'identifiant du customer : "
  );
  const productId = readlineSync.question("Entrez l'identifiant du produit : ");
  const quantity = readlineSync.questionInt("Entrez la quantité : ");
  return { id, customerId, productId, quantity };
}

function promptAddPayment() {
  const id = readlineSync.question("Entrez l'identifiant du paiement : ");
  const orderId = readlineSync.question(
    "Entrez l'identifiant de la commande : "
  );
  const amount = readlineSync.questionFloat("Entrez le montant : ");
  return { id, orderId, amount };
}

function promptAddPurchase() {
  const id = readlineSync.question("Entrez l'identifiant de l'achat : ");
  const productId = readlineSync.question("Entrez l'identifiant du produit : ");
  const quantity = readlineSync.questionInt("Entrez la quantité : ");
  return { id, productId, quantity };
}

// Fonction principale pour gérer le menu
async function main() {
  try {
    let choix = menu();
    while (choix !== "0") {
      switch (choix) {
        case "1":
          const customer = promptAddCustomer();
          await customerModule.create(customer);
          console.log("Customer ajouté avec succès !");
          break;
        case "2":
          const customers = await customerModule.getAll();
          console.log(customers);
          break;
        case "3":
          const updatedCustomer = promptAddCustomer();
          await customerModule.update(updatedCustomer.id, updatedCustomer);
          console.log("Customer mis à jour avec succès !");
          break;
        case "4":
          const customerId = readlineSync.question(
            "Entrez l'identifiant du customer à supprimer : "
          );
          await customerModule.destroy(customerId);
          console.log("Customer supprimé avec succès !");
          break;
        case "5":
          const product = promptAddProduct();
          await productModule.create(product);
          console.log("Produit ajouté avec succès !");
          break;
        case "6":
          const products = await productModule.getAll();
          console.log(products);
          break;
        case "7":
          const updatedProduct = promptAddProduct();
          await productModule.update(updatedProduct.id, updatedProduct);
          console.log("Produit mis à jour avec succès !");
          break;
        case "8":
          const productId = readlineSync.question(
            "Entrez l'identifiant du produit à supprimer : "
          );
          await productModule.destroy(productId);
          console.log("Produit supprimé avec succès !");
          break;
        case "9":
          const order = promptAddOrder();
          await orderModule.create(order);
          console.log("Commande ajoutée avec succès !");
          break;
        case "10":
          const orders = await orderModule.getAll();
          console.log(orders);
          break;
        case "11":
          const updatedOrder = promptAddOrder();
          await orderModule.update(updatedOrder.id, updatedOrder);
          console.log("Commande mise à jour avec succès !");
          break;
        case "12":
          const orderId = readlineSync.question(
            "Entrez l'identifiant de la commande à supprimer : "
          );
          await orderModule.destroy(orderId);
          console.log("Commande supprimée avec succès !");
          break;
        case "13":
          const payment = promptAddPayment();
          await paymentModule.create(payment);
          console.log("Paiement ajouté avec succès !");
          break;
        case "14":
          const payments = await paymentModule.getAll();
          console.log(payments);
          break;
        case "15":
          const purchase = promptAddPurchase();
          await purchaseModule.create(purchase);
          console.log("Achat ajouté avec succès !");
          break;
        case "16":
          const purchases = await purchaseModule.getAll();
          console.log(purchases);
          break;
        default:
          console.log("Option invalide");
          break;
      }
      choix = menu();
    }
  } catch (e) {
    console.log("Erreur :", e.message);
  }
}

main();
