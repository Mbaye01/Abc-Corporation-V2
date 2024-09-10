const pool = require("./db");

async function get() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute(
      "SELECT * FROM order_details"
    );
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function add(id, quantity, price) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO order_details (id, quantity, price) VALUES (?, ?, ?)",
      [id, quantity, price]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function update(id, quantity, price) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "UPDATE order_details SET quantity = ?, price = ? WHERE id = ?",
      [quantity, price, id]
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
      "DELETE FROM order_details WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
      throw new Error(
        `Cannot delete order detail with ID ${id} as it is referenced elsewhere.`
      );
    }
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { get, add, update, destroy };
