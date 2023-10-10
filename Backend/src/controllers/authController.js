const pool = require('../db/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'secret';

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Checking if the username already exists in the database
    const [existingUser] = await pool.execute('SELECT username FROM users WHERE username = ?', [
      username,
    ]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already registered' });
    }

    // Hash the password before saving it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generating a JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    // Storing the user information in the database
    await pool.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', [
      username,
      hashedPassword,
    ]);

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Checking if username and password are defined
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Retrieving user information from the database
    const [results] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (results.length === 0) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const user = results[0];

    // Ensuring that the hashed password from the database is defined
    if (!user.password_hash) {
      return res.status(500).json({ error: 'User password is missing' });
    }

    // Comparing the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Generating a JWT token for authentication
    const token = jwt.sign({ username : user.username, userId: user.id }, secretKey, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.protectedRoute = (req, res) => {
  res.json({ message: 'Protected data' });
};


