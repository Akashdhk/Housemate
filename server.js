/**
 * HOUSEMATE BACKEND (Node.js + Oracle 11g)
 * To run: node server.js
 * Required: npm install express oracledb cors body-parser
 */
const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Oracle 11g Connection Configuration
const dbConfig = {
  user: "SYSTEM",
  password: "your_password",
  connectString: "localhost:1521/xe" // Update with your SID or Service Name
};

// Authentication: Login
app.post('/api/auth/login', async (req, res) => {
  let connection;
  try {
    const { email, password } = req.body;
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT id, name, email, role, flat_id FROM HM_USERS 
       WHERE email = :email AND password = :password`,
      [email, password],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// Authentication: Register
app.post('/api/auth/register', async (req, res) => {
  let connection;
  try {
    const { name, email, password, role } = req.body;
    connection = await oracledb.getConnection(dbConfig);
    const id = Math.random().toString(36).substr(2, 9);
    
    await connection.execute(
      `INSERT INTO HM_USERS (id, name, email, password, role) 
       VALUES (:id, :name, :email, :password, :role)`,
      [id, name, email, password, role],
      { autoCommit: true }
    );

    res.json({ id, name, email, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// Get Flats
app.get('/api/flats', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM HM_FLATS`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// Get Bills
app.get('/api/bills', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM HM_BILLS`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// Get Maintenance Requests
app.get('/api/maintenance', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM HM_MAINTENANCE ORDER BY created_at DESC`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.listen(port, () => {
  console.log(`Housemate server running at http://localhost:${port}`);
});