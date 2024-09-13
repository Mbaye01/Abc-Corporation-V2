// const cnx = require("./db");

// const customerModule = {
//   async getAll() {
//     try {
//       const [rows] = await cnx.query("SELECT * FROM customers");
//       return rows;
//     } catch (error) {
//       console.error("Error while retrieving customers:", error);
//       throw new Error("Unable to retrieve customers. Please try again later.");
//     }
//   },

//   async getById(id) {
//     try {
//       const [rows] = await cnx.query("SELECT * FROM customers WHERE id = ?", [
//         id,
//       ]);
//       if (rows.length > 0) {
//         return rows[0];
//       } else {
//         throw new Error(
//           `Customer with ID ${id} not found. Please add the customer first.`
//         );
//       }
//     } catch (error) {
//       console.error(`Error when retrieving the customer with ID ${id}:`, error);
//       throw new Error(`Unable to retrieve the customer with ID ${id}.`);
//     }
//   },

//   async create(data) {
//     try {
//       const [result] = await cnx.query(
//         "INSERT INTO customers (name, address, email, phone) VALUES (?, ?, ?, ?)",
//         [data.name, data.address, data.email, data.phone]
//       );
//       return result.insertId; // Returns the ID of the newly created customer
//     } catch (error) {
//       console.error("Error while creating the customer:", error);
//       throw new Error(
//         "Unable to create customer. Please check your input and try again."
//       );
//     }
//   },

//   async update(id, data) {
//     try {
//       const [result] = await cnx.query(
//         "UPDATE customers SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?",
//         [data.name, data.address, data.email, data.phone, id]
//       );
//       if (result.affectedRows === 0) {
//         throw new Error(`Customer with ID ${id} not found. Update failed.`);
//       }
//       return result.affectedRows; // Returns the number of affected rows
//     } catch (error) {
//       console.error(`Error while updating the customer with ID ${id}:`, error);
//       throw new Error(
//         `Unable to update customer with ID ${id}. Please check your input.`
//       );
//     }
//   },

//   async delete(id) {
//     try {
//       const [result] = await cnx.query("DELETE FROM customers WHERE id = ?", [
//         id,
//       ]);
//       if (result.affectedRows === 0) {
//         throw new Error(`Customer with ID ${id} not found. Deletion failed.`);
//       }
//       return result.affectedRows; // Returns the number of deleted rows
//     } catch (error) {
//       console.error(`Error when deleting the customer with ID ${id}:`, error);
//       throw new Error(`Unable to delete customer with ID ${id}.`);
//     }
//   },
// };

// module.exports = customersModule;

const cnx = require("./db");

const customerModule = {
  async create(customer) {
    try {
      const { name, address, email, phone } = customer;

      // Validate input
      if (!name || !address || !email || !phone) {
        throw new Error(
          "All fields (name, address, email, phone) are required."
        );
      }

      // SQL query to insert a new customer
      const [result] = await cnx.query(
        "INSERT INTO customers (name, address, email, phone) VALUES (?, ?, ?, ?)",
        [name, address, email, phone]
      );

      // Return the created customer with its ID
      const createdCustomer = {
        id: result.insertId,
        name,
        address,
        email,
        phone,
      };

      return createdCustomer;
    } catch (error) {
      console.error("Error while creating the customer:", error);
      throw new Error(
        "Unable to create customer. Please check your input and try again."
      );
    }
  },

  async getAll() {
    try {
      const [rows] = await cnx.query("SELECT * FROM customers");
      return rows;
    } catch (error) {
      console.error("Error retrieving customers:", error);
      throw new Error("Unable to retrieve customers. Please try again later.");
    }
  },

  async getById(id) {
    try {
      const [rows] = await cnx.query("SELECT * FROM customers WHERE id = ?", [
        id,
      ]);
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error(`Customer with ID ${id} not found`);
      }
    } catch (error) {
      console.error(`Error retrieving customer with ID ${id}:`, error);
      throw new Error(`Unable to retrieve customer with ID ${id}.`);
    }
  },

  async update(id, customer) {
    try {
      const { name, address, email, phone } = customer;

      // Validate input
      if (!name || !address || !email || !phone) {
        throw new Error(
          "All fields (name, address, email, phone) are required."
        );
      }

      const [result] = await cnx.query(
        "UPDATE customers SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?",
        [name, address, email, phone, id]
      );

      if (result.affectedRows === 0) {
        throw new Error(`Customer with ID ${id} not found.`);
      }

      return result.affectedRows; // Returns the number of affected rows
    } catch (error) {
      console.error(`Error updating customer with ID ${id}:`, error);
      throw new Error(
        `Unable to update customer with ID ${id}. Please check the input.`
      );
    }
  },

  async delete(id) {
    try {
      const [result] = await cnx.query("DELETE FROM customers WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        throw new Error(`Customer with ID ${id} not found.`);
      }

      return result.affectedRows; // Returns the number of deleted rows
    } catch (error) {
      console.error(`Error deleting customer with ID ${id}:`, error);
      throw new Error(`Unable to delete customer with ID ${id}.`);
    }
  },
};

module.exports = customerModule;
