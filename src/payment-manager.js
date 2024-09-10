const pool = require("./db");

async function get() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute("SELECT * FROM payments");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function add(id, date, amount, payment_method, order_id) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO payments (id, date, amount, payment_method, order_id) values (?, ?, ?, ?, ?)",
      [id, date, amount, payment_method, order_id]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function update(id, date, amount, payment_method, order_id) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "UPDATE payments SET date = ?, amount = ?, payment_method = ?, order_id = ? WHERE id = ?",
      [date, amount, payment_method, order_id, id]
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
      "DELETE FROM payments WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
      throw new Error(`Deletion error for payment ID ${id}`);
    }
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { get, add, update, destroy };
