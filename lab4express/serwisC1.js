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

app.post('/api/orders',authenticate, async (req, res)=>{
    try {
        const { count, bookId} = req.body;
        const userID = req.user.user
        const book = await Book.findByPk(bookId)
        if(!book){
            return res.status(400).json({ message: "ksiazka nie istnieje" });
        }
        const order = await Order.create({count,bookId,userID})
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.get('/api/orders/:id', async (req, res)=>{
    try {
        const orders = await User.findByPk(req.params.id,{include:[{model:Order, as: 'orders'}]}); 
        res.status(200).json(orders.orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


app.delete('/api/orders/:id',authenticate,async (req,res)=>{

    try {
        //czy order istnieje
        const order = await Order.findByPk(req.params.id)

        if(!order){
            return res.status(400).json({message: "zamowienie nie istnieje"})
        }

        //czy user z tokena zgadza sie z tym z orderu lub czy admin

        if(!(req.user.user==order.userID || req.user.email=="admin@admin.admin")){
            return res.status(403).json({message:"brak uprawnien"})
        }

        //usun order

        await Order.destroy({where:{id:req.params.id}})

        res.status(200).json({message:"zamowienie usunieto"})

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

app.patch('/api/orders/:id',authenticate, async (req,res)=>{
    try {
        //czy order istnieje
        const order = await Order.findByPk(req.params.id)
        const {count, bookId} = req.body
        
        const book = await Book.findByPk(bookId)
        if(!book){
            return res.status(400).json({ message: "ksiazka nie istnieje" });
        }

        if(!order){
            return res.status(400).json({message: "zamowienie nie istnieje"})
        }

        //czy user z tokena zgadza sie z tym z orderu lub czy admin

        if(!(req.user.user==order.userID || req.user.email=="admin@admin.admin")){
            return res.status(403).json({message:"brak uprawnien"})
        }

        //zmien order

        await Order.update({count,bookId},{where:{id:req.params.id}})

        res.status(200).json({message:"zamowienie zaktualizowano"})

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
const PORT = 3001;
app.listen(PORT, () => {
  console.log("Serwer włączony!");
});