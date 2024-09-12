const pool = require("./db");

// Fonction pour récupérer toutes les commandes
async function get() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute("SELECT * FROM orders");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Fonction pour ajouter une commande
async function add(id, date, delivery_address, track_number, status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO orders (id, date, delivery_address, track_number, status) VALUES (?, ?, ?, ?, ?)",
      [id, date, delivery_address, track_number, status]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Fonction pour mettre à jour une commande
async function update(id, date, delivery_address, track_number, status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "UPDATE orders SET date = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?",
      [date, delivery_address, track_number, status, id]
    );
    return result.affectedRows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Fonction pour supprimer une commande
async function destroy(id) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "DELETE FROM orders WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
      throw new Error(
        `Impossible de supprimer la commande avec l'ID ${id} car elle est référencée ailleurs.`
      );
    }
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { get, add, update, destroy };
