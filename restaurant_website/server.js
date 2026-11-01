const fs = require('fs');
const path = require('path');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'file://'], // Allow local file access too
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.'));

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurant_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        // Create database if it doesn't exist
        const createDbConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });
        
        createDbConnection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
                return;
            }
            
            createDbConnection.query('CREATE DATABASE IF NOT EXISTS restaurant_db', (err) => {
                if (err) {
                    console.error('Error creating database:', err);
                    return;
                }
                console.log('Database created or already exists');
                createDbConnection.end();
                
                // Reconnect with database
                db.changeUser({database: 'restaurant_db'}, (err) => {
                    if (err) {
                        console.error('Error switching to database:', err);
                    } else {
                        console.log('Connected to restaurant_db database');
                        initializeTables();
                    }
                });
            });
        });
        return;
    }
    console.log('Connected to MySQL database');
    initializeTables();
});

function initializeTables() {
    // Create menu_items table if it doesn't exist
    const createMenuTableQuery = `
        CREATE TABLE IF NOT EXISTS menu_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            original_price DECIMAL(10, 2) NOT NULL,
            rating DECIMAL(3, 1) NOT NULL,
            image VARCHAR(500) NOT NULL,
            category VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;

    db.query(createMenuTableQuery, (err) => {
        if (err) {
            console.error('Error creating menu_items table:', err);
        } else {
            console.log('Menu items table ready');
            // Import initial data if table is empty
            checkAndImportInitialData();
        }
    });

    // Create bookings table if it doesn't exist
    const createBookingsTableQuery = `
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            partySize VARCHAR(10) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            requests TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.query(createBookingsTableQuery, (err) => {
        if (err) {
            console.error('Error creating bookings table:', err);
        } else {
            console.log('Bookings table ready');
        }
    });

    // Create users table
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(20),
            address TEXT,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.query(createUsersTableQuery, (err) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table ready');
        }
    });

    // Create orders table
    const createOrdersTableQuery = `
        CREATE TABLE IF NOT EXISTS orders (
            id VARCHAR(50) PRIMARY KEY,
            order_date VARCHAR(100) NOT NULL,
            customer_name VARCHAR(255) NOT NULL,
            customer_email VARCHAR(255) NOT NULL,
            customer_phone VARCHAR(20) NOT NULL,
            customer_address TEXT NOT NULL,
            payment_method VARCHAR(50) NOT NULL,
            subtotal DECIMAL(10, 2) NOT NULL,
            tax DECIMAL(10, 2) NOT NULL,
            delivery_fee DECIMAL(10, 2) NOT NULL,
            discount DECIMAL(10, 2) NOT NULL,
            total DECIMAL(10, 2) NOT NULL,
            status VARCHAR(20) DEFAULT 'completed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.query(createOrdersTableQuery, (err) => {
        if (err) {
            console.error('Error creating orders table:', err);
        } else {
            console.log('Orders table ready');
        }
    });

    // Create order_items table
    const createOrderItemsTableQuery = `
        CREATE TABLE IF NOT EXISTS order_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id VARCHAR(50) NOT NULL,
            item_name VARCHAR(255) NOT NULL,
            item_price DECIMAL(10, 2) NOT NULL,
            quantity INT NOT NULL,
            item_image VARCHAR(500),
            item_description TEXT,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        )
    `;

    db.query(createOrderItemsTableQuery, (err) => {
        if (err) {
            console.error('Error creating order_items table:', err);
        } else {
            console.log('Order items table ready');
        }
    });
}

// Function to check if menu_items table is empty and import initial data
function checkAndImportInitialData() {
    db.query('SELECT COUNT(*) as count FROM menu_items', (err, results) => {
        if (err) {
            console.error('Error checking menu_items table:', err);
            return;
        }

        if (results[0].count === 0) {
            console.log('Importing initial menu data...');
            importInitialData();
        }
    });
}

// Function to import initial data from JSON files
function importInitialData() {
    const categories = [
        'american', 'bbq', 'beverages', 'breakfast', 'chinese',
        'desserts', 'indian', 'italian', 'japanese', 'mediterranean',
        'mexican', 'seafood', 'thai', 'vegan', 'vegetarian'
    ];

    let importedItems = 0;

    categories.forEach(category => {
        try {
            const filePath = path.join(__dirname, 'data', `${category}.json`);
            if (fs.existsSync(filePath)) {
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

                data.items.forEach(item => {
                    const query = `
                        INSERT INTO menu_items (name, description, price, original_price, rating, image, category)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    `;

                    db.query(query, [
                        item.name,
                        item.description,
                        item.price,
                        item.originalPrice,
                        item.rating,
                        item.image,
                        category
                    ], (err) => {
                        if (err) {
                            console.error(`Error inserting ${item.name}:`, err);
                        } else {
                            importedItems++;
                            if (importedItems % 10 === 0) {
                                console.log(`Imported ${importedItems} items so far...`);
                            }
                        }
                    });
                });
            } else {
                console.log(`File not found: ${filePath}`);
            }
        } catch (error) {
            console.error(`Error processing ${category}.json:`, error);
        }
    });

    setTimeout(() => {
        console.log(`Initial data import completed. Total items: ${importedItems}`);
    }, 3000);
}

// API endpoint to get all menu items
app.get('/api/menu', (req, res) => {
    const query = 'SELECT * FROM menu_items ORDER BY category, name';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching menu items:', err);
            return res.status(500).json({ error: 'Failed to fetch menu items' });
        }
        res.json(results);
    });
});

// API endpoint to get menu items by category
app.get('/api/menu/:category', (req, res) => {
    const category = req.params.category;

    if (category === 'all') {
        const query = 'SELECT * FROM menu_items ORDER BY category, name';

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching menu items:', err);
                return res.status(500).json({ error: 'Failed to fetch menu items' });
            }
            res.json(results);
        });
    } else {
        const query = 'SELECT * FROM menu_items WHERE category = ? ORDER BY name';

        db.query(query, [category], (err, results) => {
            if (err) {
                console.error('Error fetching menu items by category:', err);
                return res.status(500).json({ error: 'Failed to fetch menu items' });
            }
            res.json(results);
        });
    }
});

// API endpoint to add a new menu item
app.post('/api/menu', (req, res) => {
    const { name, description, price, originalPrice, rating, image, category } = req.body;

    if (!name || !description || !price || !originalPrice || !rating || !image || !category) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        INSERT INTO menu_items (name, description, price, original_price, rating, image, category)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [name, description, price, originalPrice, rating, image, category], (err, results) => {
        if (err) {
            console.error('Error adding menu item:', err);
            return res.status(500).json({ error: 'Failed to add menu item' });
        }

        // Fetch the newly created item
        const selectQuery = 'SELECT * FROM menu_items WHERE id = ?';
        db.query(selectQuery, [results.insertId], (err, itemResults) => {
            if (err) {
                console.error('Error fetching new menu item:', err);
                return res.status(500).json({ error: 'Item added but could not retrieve details' });
            }

            res.status(201).json({
                message: 'Menu item added successfully',
                item: itemResults[0]
            });
        });
    });
});

// API endpoint to update a menu item
app.put('/api/menu/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, originalPrice, rating, image, category } = req.body;

    const query = `
        UPDATE menu_items 
        SET name = ?, description = ?, price = ?, original_price = ?, rating = ?, image = ?, category = ?
        WHERE id = ?
    `;

    db.query(query, [name, description, price, originalPrice, rating, image, category, id], (err, results) => {
        if (err) {
            console.error('Error updating menu item:', err);
            return res.status(500).json({ error: 'Failed to update menu item' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        // Fetch the updated item
        const selectQuery = 'SELECT * FROM menu_items WHERE id = ?';
        db.query(selectQuery, [id], (err, itemResults) => {
            if (err) {
                console.error('Error fetching updated menu item:', err);
                return res.status(500).json({ error: 'Item updated but could not retrieve details' });
            }

            res.json({
                message: 'Menu item updated successfully',
                item: itemResults[0]
            });
        });
    });
});

// API endpoint to delete a menu item
app.delete('/api/menu/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM menu_items WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting menu item:', err);
            return res.status(500).json({ error: 'Failed to delete menu item' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.json({ message: 'Menu item deleted successfully' });
    });
});

// API endpoint to get all bookings
app.get('/api/bookings', (req, res) => {
    const query = 'SELECT * FROM bookings ORDER BY createdAt DESC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ error: 'Failed to fetch bookings' });
        }
        res.json(results);
    });
});

// API endpoint to create a new booking
app.post('/api/bookings', (req, res) => {
    const { name, email, phone, partySize, date, time, requests } = req.body;

    if (!name || !email || !phone || !partySize || !date || !time) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
        INSERT INTO bookings (name, email, phone, partySize, date, time, requests)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [name, email, phone, partySize, date, time, requests || ''], (err, results) => {
        if (err) {
            console.error('Error creating booking:', err);
            return res.status(500).json({ error: 'Failed to create booking' });
        }

        // Fetch the newly created booking
        const selectQuery = 'SELECT * FROM bookings WHERE id = ?';
        db.query(selectQuery, [results.insertId], (err, bookingResults) => {
            if (err) {
                console.error('Error fetching new booking:', err);
                return res.status(500).json({ error: 'Booking created but could not retrieve details' });
            }

            res.status(201).json({
                message: 'Booking created successfully',
                booking: bookingResults[0]
            });
        });
    });
});

// API endpoint to update a booking
app.put('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, partySize, date, time, requests } = req.body;

    const query = `
        UPDATE bookings 
        SET name = ?, email = ?, phone = ?, partySize = ?, date = ?, time = ?, requests = ?
        WHERE id = ?
    `;

    db.query(query, [name, email, phone, partySize, date, time, requests || '', id], (err, results) => {
        if (err) {
            console.error('Error updating booking:', err);
            return res.status(500).json({ error: 'Failed to update booking' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Fetch the updated booking
        const selectQuery = 'SELECT * FROM bookings WHERE id = ?';
        db.query(selectQuery, [id], (err, bookingResults) => {
            if (err) {
                console.error('Error fetching updated booking:', err);
                return res.status(500).json({ error: 'Booking updated but could not retrieve details' });
            }

            res.json({
                message: 'Booking updated successfully',
                booking: bookingResults[0]
            });
        });
    });
});

// API endpoint to delete a booking
app.delete('/api/bookings/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM bookings WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting booking:', err);
            return res.status(500).json({ error: 'Failed to delete booking' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json({ message: 'Booking deleted successfully' });
    });
});

// API endpoint to create a new order
app.post('/api/orders', (req, res) => {
    const order = req.body;

    // Validate required fields
    if (!order.id || !order.date || !order.customer || !order.items || !order.summary) {
        return res.status(400).json({ error: 'Missing required order fields' });
    }

    // Insert order
    const orderQuery = `
        INSERT INTO orders (id, order_date, customer_name, customer_email, customer_phone, customer_address, 
                          payment_method, subtotal, tax, delivery_fee, discount, total, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(orderQuery, [
        order.id,
        order.date,
        order.customer.name,
        order.customer.email,
        order.customer.phone,
        order.customer.address,
        order.paymentMethod,
        order.summary.subtotal,
        order.summary.tax,
        order.summary.deliveryFee,
        order.summary.discount,
        order.summary.total,
        order.status || 'completed'
    ], (err, orderResults) => {
        if (err) {
            console.error('Error creating order:', err);
            return res.status(500).json({ error: 'Failed to create order' });
        }

        // Insert order items
        const orderItemsQuery = `
            INSERT INTO order_items (order_id, item_name, item_price, quantity, item_image, item_description)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        let itemsProcessed = 0;
        order.items.forEach(item => {
            db.query(orderItemsQuery, [
                order.id,
                item.name,
                item.price,
                item.quantity,
                item.image,
                item.description
            ], (err) => {
                if (err) {
                    console.error('Error inserting order item:', err);
                }

                itemsProcessed++;

                // When all items are processed, send response
                if (itemsProcessed === order.items.length) {
                    res.status(201).json({
                        message: 'Order created successfully',
                        orderId: order.id
                    });
                }
            });
        });
    });
});

// API endpoint to get order history for a user (FIXED VERSION)
app.get('/api/orders/:email', (req, res) => {
    const email = req.params.email;

    // First get all orders for the user
    const ordersQuery = `
        SELECT * FROM orders 
        WHERE customer_email = ? 
        ORDER BY created_at DESC
    `;

    db.query(ordersQuery, [email], (err, orders) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ error: 'Failed to fetch orders' });
        }

        if (orders.length === 0) {
            return res.json([]);
        }

        // Get order items for all orders
        const orderIds = orders.map(order => order.id);
        const placeholders = orderIds.map(() => '?').join(',');

        const itemsQuery = `
            SELECT * FROM order_items 
            WHERE order_id IN (${placeholders})
        `;

        db.query(itemsQuery, orderIds, (err, orderItems) => {
            if (err) {
                console.error('Error fetching order items:', err);
                return res.status(500).json({ error: 'Failed to fetch order items' });
            }

            // Combine orders with their items
            const ordersWithItems = orders.map(order => {
                const items = orderItems.filter(item => item.order_id === order.id).map(item => ({
                    name: item.item_name,
                    price: item.item_price,
                    quantity: item.quantity,
                    image: item.item_image,
                    description: item.item_description
                }));

                return {
                    ...order,
                    items: items
                };
            });

            res.json(ordersWithItems);
        });
    });
});

// Helper function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// API endpoint for user registration
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email and password are required' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        // Check if user already exists
        const checkQuery = 'SELECT * FROM users WHERE email = ?';

        db.query(checkQuery, [email], async (err, results) => {
            if (err) {
                console.error('Error checking user existence:', err);
                return res.status(500).json({ error: 'Server error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'User already exists with this email' });
            }

            // Hash password and create user
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = 'INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)';

            db.query(insertQuery, [name, email, hashedPassword, phone || null, address || null], (err, results) => {
                if (err) {
                    console.error('Error creating user:', err);
                    return res.status(500).json({ error: 'Failed to create user' });
                }

                // Get the newly created user without password
                const selectQuery = 'SELECT id, name, email, phone, address, created_at FROM users WHERE id = ?';
                db.query(selectQuery, [results.insertId], (err, userResults) => {
                    if (err) {
                        console.error('Error fetching new user:', err);
                        return res.status(500).json({ error: 'User created but could not retrieve details' });
                    }

                    res.status(201).json({
                        message: 'User created successfully',
                        user: userResults[0]
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error in registration:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// API endpoint for user login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if username is email or username
    const isEmail = validateEmail(username);
    const query = isEmail ? 'SELECT * FROM users WHERE email = ?' : 'SELECT * FROM users WHERE name = ?';

    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];

        // Compare passwords using bcrypt
        try {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Return user data without password
            const { password: _, ...userWithoutPassword } = user;

            res.json({
                message: 'Login successful',
                user: userWithoutPassword
            });
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    });
});

// API endpoint to get user details
app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;

    const query = 'SELECT id, name, email, phone, address, created_at FROM users WHERE id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Failed to fetch user data' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(results[0]);
    });
});

// API endpoint to update user details
app.put('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    const { name, phone, address } = req.body;

    const query = 'UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?';

    db.query(query, [name, phone, address, userId], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Failed to update user data' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Menu API available at http://localhost:${PORT}/api/menu`);
    console.log(`Bookings API available at http://localhost:${PORT}/api/bookings`);
    console.log(`Orders API available at http://localhost:${PORT}/api/orders`);
    console.log(`Auth API available at http://localhost:${PORT}/api/auth`);
});