const pool = require("./db");

async function get() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute("SELECT * FROM cutomers");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}
async function add(id, name, adress, email, phone) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO customers (id, name, adress, email, phone) values (?, ?, ?, ?, ?)",
      [id, name, adress, email, phone]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}
async function update(id, name, adress, email, phone) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "UPDATE customers SET id = ?, name = ?, email = ?, adress = ?, phone = ?, WHERE id = ?",
      [id, name, adress, email, phone]
    );
    return result.affectedRows;
  } catch (error) {
    throw error;
  }
  // finally {
  //   connection.release();
  // }
}
async function destroy(id) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "DELETE FROM customers WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
      throw new Error(`Deletion error ${id}`);
    }
    throw error;
  } finally {
    connection.release();
  }
}
module.exports = { get, add, update, destroy };
