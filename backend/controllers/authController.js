const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const supabase = require('../models/supabase');

// Signup function for new users

const signup = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        // Hash the password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert into the database
        const { data, error } = await supabase
            .from('users')
            .insert([{ username, password_hash: passwordHash }])
            .select('id');

        if (error) {
            console.error('Supabase Error:', error);
            return res.status(500).json({ error: 'Failed to create user.' });
        }

        if (!data || data.length === 0) {
            return res.status(400).json({ error: 'User could not be created.' });
        }

        // Create JWT
        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User created successfully', token });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};



// Login function for existing users
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        // Fetch user by username
        const { data, error } = await supabase
            .from('users')
            .select('id, password_hash')
            .eq('username', username);

        if (error) {
            console.error('Supabase Error:', error);
            return res.status(500).json({ error: 'Failed to fetch user.' });
        }

        if (!data || data.length === 0) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        const user = data[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        // Create JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


module.exports = { signup, login };
