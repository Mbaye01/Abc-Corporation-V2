const pool = require("./db");

async function get() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute(
      "SELECT * FROM purchase_orders"
    );
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function add(id, date, delivery_address, track_number, status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO purchase_orders (id, date, delivery_address, track_number, status) VALUES (?, ?, ?, ?, ?)",
      [id, date, delivery_address, track_number, status]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function update(id, date, delivery_address, track_number, status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "UPDATE purchase_orders SET date = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?",
      [date, delivery_address, track_number, status, id]
    );
    return result.affectedRows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function destroy(id) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "DELETE FROM purchase_orders WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
      throw new Error(
        `Cannot delete purchase order with ID ${id} as it is referenced elsewhere.`
      );
    }
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { get, add, update, destroy };
