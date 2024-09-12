const pool = require("./db");

// Fonction pour récupérer toutes les commandes
async function getOrders() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute("SELECT * FROM orders");
    return rows;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commandes:",
      error.message
    );
    throw new Error(
      "Une erreur est survenue lors de la récupération des commandes."
    );
  } finally {
    connection.release();
  }
}

// Fonction pour ajouter une commande
async function addOrder(id, date, delivery_address, track_number, status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO orders (id, date, delivery_address, track_number, status) VALUES (?, ?, ?, ?, ?)",
      [id, date, delivery_address, track_number, status]
    );
    return result.insertId;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la commande:", error.message);
    throw new Error("Une erreur est survenue lors de l'ajout de la commande.");
  } finally {
    connection.release();
  }
}

// Fonction pour mettre à jour une commande
async function updateOrder(id, date, delivery_address, track_number, status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "UPDATE orders SET date = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?",
      [date, delivery_address, track_number, status, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de la commande:",
      error.message
    );
    throw new Error(
      "Une erreur est survenue lors de la mise à jour de la commande."
    );
  } finally {
    connection.release();
  }
}

// Fonction pour supprimer une commande
async function deleteOrder(id) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "DELETE FROM orders WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
      console.error(
        `Erreur: la commande avec l'ID ${id} est référencée ailleurs.`
      );
      throw new Error(
        `Impossible de supprimer la commande avec l'ID ${id} car elle est référencée ailleurs.`
      );
    } else {
      console.error(
        "Erreur lors de la suppression de la commande:",
        error.message
      );
      throw new Error(
        "Une erreur est survenue lors de la suppression de la commande."
      );
    }
  } finally {
    connection.release();
  }
}

// Fonction pour afficher les quantités des détails
function displayDetailQuantities() {
  if (detail.length > 0) {
    detail.forEach((d, i) => {
      console.log(`Quantité du détail ${i + 1}: ${d.quantity}`);
    });
  } else {
    console.log("Aucun détail disponible.");
  }
}

const detail = [
  { id: 1, product_id: 101, quantity: 2 },
  { id: 2, product_id: 102, quantity: 5 },
  { id: 3, product_id: 103, quantity: 3 },
];

// Exemple d'utilisation des fonctions
async function main() {
  try {
    // Ajout d'une commande
    const newOrderId = await addOrder(
      1,
      "2024-09-11",
      "123 Main St",
      "TRACK123",
      "pending"
    );
    console.log(`Nouvelle commande ajoutée avec l'ID: ${newOrderId}`);

    // Récupération de toutes les commandes
    const orders = await getOrders();
    console.log("Commandes récupérées:", orders);

    // Mise à jour d'une commande
    const updatedRows = await updateOrder(
      1,
      "2024-09-12",
      "456 Elm St",
      "TRACK456",
      "shipped"
    );
    console.log(`${updatedRows} commande(s) mise(s) à jour.`);

    // Suppression d'une commande
    const deletedRows = await deleteOrder(1);
    console.log(`${deletedRows} commande(s) supprimée(s).`);

    // Affichage des quantités de détails
    displayDetailQuantities();
  } catch (error) {
    console.error("Erreur dans la fonction principale:", error.message);
  }
}

// Lancer la fonction principale
main();
