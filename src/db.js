const mysql = require("mysql2/promise");

// Create the connection pool. The pool-specific settings are the defaults
const connPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "commercial_manager",
  // waitForConnections: true,
  connectionLimit: 4,
});

module.exports = connPool;
