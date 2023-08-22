const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltRounds = 10;
const { generateToken, verifyToken } = require('../utils/jwtUtils');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('session', req.session)
  try {
    // Find the user by email
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = generateToken({ id: user.id }, '1h');

    const profile = User.findByPk(user.id, {
      attributes: ['id', 'username', 'email', 'role'],
    });
    profile.then((response) => {
      res.status(200).json({ message: 'Login successful', token: token, profile: response.dataValues });
    }).catch((err) => {
      res.status(404).send({ error: 'An error occurred' });
      return;
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get("/logout", async (req, res) => {
  // Get the JWT token from the request headers or cookies

  console.log(req.session);
  console.log(req.cookies)
  const token = req.header('Authorization').replace('Bearer ', '');

  // Add the token to the blacklist or revoked token list
  // Here, we're using a simple in-memory array as an example
  //revokedTokens.push(token);

  // Clear the token from the client-side (e.g., remove from localStorage, clear cookies)
  res.clearCookie('token'); // If using cookie

  // Send a response indicating successful logout
  res.status(200).json({ message: 'Logged out successfully' });
})

router.get('/profile', (req, res) => {
  // Extract JWT token from headers or query params
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }
  // Verify and decode JWT token
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    res.status(401).send('Invalid token');
    return;
  }

  const userId = decodedToken.id;

  // Fetch user data based on the decoded token
  const user = User.findByPk(userId);
  user.then((response) => {
    res.status(200).json({ data: response.dataValues });
  }).catch((err) => {
    res.status(404).send('User not found');
    return;
  });

  if (!user) {
    res.status(404).send('User not found');
    return;
  }
});

module.exports = router;