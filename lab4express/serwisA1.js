const express = require('express');
const app = express();
const { initModels, User, Book, Order } = require('./models');
const jwt = require('jsonwebtoken');

const secret="elo_morelo"

app.use(express.json());

initModels();


app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/register', async (req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        const token = jwt.sign({user:user.id,email:user.email},secret)
        res.status(201).json({id: user.id, token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.post('/api/login', async (req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({where:{email:email}});
        if(!user){
            return res.status(400).json({error:"zly login i hasło"})
        }
        if(user.password!=password){
            return res.status(400).json({error:"zle haslo"})
        }
        const token = jwt.sign({user:user.id,email:user.email},secret)
        res.status(201).json({id: user.id, token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log("Serwer włączony!");
});