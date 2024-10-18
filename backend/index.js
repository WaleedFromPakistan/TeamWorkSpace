const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

const MONGO_URI = "mongodb+srv://mw8867861:P%40kistan11@cluster0.gdd8q.mongodb.net/teamWorkSpace?tls=true";
mongoose.connect(MONGO_URI)
    .then(() => console.log("Connection Successful ✅"))
    .catch(err => console.error("Database connection error ❌", err));

const JWT_SECRET = "your_jwt_secret_key"; 

// User Schema
const userSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Task Schema
const taskSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String },
    member1: { type: String, required: true },
    member2: { type: String, required: true },
    member3: { type: String, required: true }
});

const Task = mongoose.model('Task', taskSchema);

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Endpoint to register a user
app.post('/addUser', async (req, res) => {
    try {
        const lastUser = await User.findOne({}).sort({ id: -1 });
        let id = lastUser ? lastUser.id + 1 : 1;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            id: id,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        });
        await newUser.save();
        console.log('User Added successfully', newUser);
        res.json({ success: true, message: "New user added", user: newUser });
    } catch (error) {
        console.log("Error occurred in saving user:", error);
        res.status(500).json({ success: false, message: "Error in saving user", error: error });
    }
});

// API for fetching all users
app.get('/allUsers', authenticateJWT, async (req, res) => {
    try {
        let users = await User.find({});
        res.json(users);
        console.log("AllUsers Fetched");
    } catch (error) {
        console.log("Error in fetching User Data", error);
        res.status(500).json({
            success: false,
            message: "Error in fetching User Data",
        });
    }
});

// Endpoint to add a task
app.post('/addTask', authenticateJWT, async (req, res) => {
    try {
        const lastTask = await Task.findOne({}).sort({ id: -1 });
        const id = lastTask ? lastTask.id + 1 : 1;

        const newTask = new Task({
            id: id,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            member1: req.body.member1,
            member2: req.body.member2,
            member3: req.body.member3
        });
        await newTask.save();
        console.log(newTask);
        res.json({ success: true, message: "Task added successfully!", task: newTask });
    } catch (error) {
        console.log("Error saving task:", error);
        res.status(500).json({ success: false, message: "Failed to add task.", error: error });
    }
});

// Endpoint for login
app.post('/login', async (req, res) => {
    const userone = await User.findOne({ username: req.body.username });
    if (userone && await bcrypt.compare(req.body.password, userone.password)) {
        const token = jwt.sign({ id: userone.id, role: userone.role }, JWT_SECRET);
        console.log("User Logged in");
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});


app.get('/dashboard', authenticateJWT, (req, res) => {
    res.json({ message: `Welcome to the dashboard, ${req.user.role}` });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
