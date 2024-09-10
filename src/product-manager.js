const pool = require("./db");

async function get() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute("SELECT * FROM products");
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function add(
  id,
  name,
  price,
  stock,
  description,
  category,
  barcode,
  status
) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO products (id, name, price, stock, description, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, name, price, stock, description, category, barcode, status]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function update(
  id,
  name,
  price,
  stock,
  description,
  category,
  barcode,
  status
) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "UPDATE products SET name = ?, price = ?, stock = ?, description = ?, category = ?, barcode = ?, status = ? WHERE id = ?",
      [name, price, stock, description, category, barcode, status, id]
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
      "DELETE FROM products WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    if (error.code && error.code === "ER_ROW_IS_REFERENCED_2") {
      throw new Error(
        `Cannot delete product with ID ${id} as it is referenced elsewhere.`
      );
    }
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { get, add, update, destroy };
