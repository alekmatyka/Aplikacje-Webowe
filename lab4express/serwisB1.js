const express = require('express');
const app = express();
const { initModels, User, Book, Order } = require('./models');
const { where } = require('sequelize');
const jwt = require('jsonwebtoken');
const authenticate = require("./authUser")

const secret="elo_morelo"

const admintoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJlbWFpbCI6ImFkbWluQGFkbWluLmFkbWluIiwiaWF0IjoxNzMzMzQ3MDI0fQ.LFmJgw6TEUD0-BvqVdTsboMi1y-7j3Ba_kRCeH9LSn4"

app.use(express.json());

initModels();


app.post('/api/books',authenticate, async (req, res) => {
    try {
        const { title, author, year} = req.body;
        if(req.user.email!="admin@admin.admin"){
            return res.status(403).json({ message: "brak uprawnien" });
        }
        const book = await Book.create({ title, author, year });
        res.status(201).json({book: book.id/*,user: req.user*/});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.findAll(); 
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/books/:id', async (req, res) => {
    try {
        const books = await Book.findOne( {where:{ id: req.params.id}}); 
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/books/:id',authenticate, async (req, res) => {
    try {
        if(req.user.email!="admin@admin.admin"){
            return res.status(403).json({ message: "brak uprawnien" });
        }
        await Book.destroy( {where:{ id: req.params.id}}); 
        res.status(200).json({message: "ksiazka usunieta",
                                id: req.params.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log("Serwer włączony!");
});