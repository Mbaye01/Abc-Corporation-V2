const { destroy } = require("./db");
const customertModule = require("./customer-manager");

const readlineSync = require("readline-sync");

function menu() {
  console.log("1 Ajouter un customer");
  console.log("2 Lister tout les customers");
  console.log("3 Mettre à jour les infos d'un customer");
  console.log("4 Supprimer un customer");
  console.log("5 Ajouter un produit");
  console.log("6 Lister toute les produits");
  console.log("7 Mettre à jour un produit");
  console.log("8 Supprimer un produit");
  console.log("0 Quitter");
  choix = readlineSync.question("votre choix : ");
  return choix;
}
function promptAddCustomer() {
  const id = readlineSync.question("Entrez l'identifiant du costomer : ");
  const name = readlineSync.question("Entrez le nom : ");
  const email = readlineSync.questionInt("Entrez l'email : ");
  const adress = readlineSync.question("Précisez l'adress : ");
  const phone = readlineSync.question("Précisez phone : ");
  return { id, name, email, adress, phone };
}
function promptUpdate() {
  const id = readlineSync.question("Entrez l'identifiant du costomer : ");
  const name = readlineSync.question("Entrez le nom : ");
  const email = readlineSync.questionInt("Entrez l'email : ");
  const adress = readlineSync.question("Précisez l'adress : ");
  const phone = readlineSync.question("Précisez phone : ");
  return { id, name, email, adress, phone };
}
// let choix = "";
// menue();

async function main() {
  try {
    let choix = menu();
    while (choix !== "0") {
      switch (choix) {
        case "1":
          const customer = promptAddCustomer();

          await customerModule.create(
            customer.name,
            customer.email,
            customer.adress,
            customer.phone
          );

          break;
        case "2":
          const get = await customerModule.get();
          console.log(get);
          break;

        case "3":
          const customerUpdate = promptUpdateCustomer();
          const update = await customerModule.update(
            customerUpdate.id,
            customerUpdate.name,
            customerUpdate.email,
            customerUpdate.adress,
            customerUpdate.phone
          );
          console.log("\n le Cutomer est ajouté avec succès. \n");
          break;
        case "4":
          const del = promptUpdateCustomer();
          await customerModule.destroy(del.id);
        default:
          console.log("Cette option est invalide");
          break;
      }
      choix = menu();
    }
  } catch (e) {
    console.log(e.message);
  }
}
main();
