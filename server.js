const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

// Serve the main dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API routes for future implementation
app.get('/api/connections', (req, res) => {
    // This will be implemented later to fetch real connections
    const connections = [
        { id: 1, name: "Google OAuth", type: "Social", status: "Active" },
        { id: 2, name: "Microsoft AD", type: "Enterprise", status: "Active" },
        { id: 3, name: "GitHub", type: "Social", status: "Inactive" },
        { id: 4, name: "LDAP Connection", type: "Enterprise", status: "Active" },
        { id: 5, name: "Facebook", type: "Social", status: "Active" }
    ];
    res.json(connections);
});

app.post('/api/connections', (req, res) => {
    // Create new connection endpoint
    res.json({ message: 'Connection created successfully', connection: req.body });
});

app.put('/api/connections/:id/certificate', (req, res) => {
    // Update certificate endpoint
    const { id } = req.params;
    res.json({ message: `Certificate updated for connection ${id}` });
});

app.get('/api/users', (req, res) => {
    // Users endpoint - returns same data for now
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Inactive" }
    ];
    res.json(users);
});

app.post('/api/users', (req, res) => {
    // Create new user endpoint
    res.json({ message: 'User created successfully', user: req.body });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
    console.log(`Auth0 Management Dashboard server running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});
