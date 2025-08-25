const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        pool.query('SELECT * FROM users WHERE email = $1 AND pw = $2', [email, password], (error, results) => {
            if (error) {
                console.error('Database query error:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.rows.length > 0) {
                const user = results.rows[0];
                return res.status(200).json({ message: 'Login successful', user, token: 'dbToken' });
            } else {
                const hardcodedEmail = 'jlim@jlabs.team';
                const hardcodedPassword = 'Password001!';

                if (email === hardcodedEmail && password === hardcodedPassword) {
                    const user = { id: 0, email: hardcodedEmail, name: 'Test User' };
                    return res.status(200).json({ message: 'Login successful (hardcoded)', user, token: 'hardcodedToken' });
                } else {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app;