const express=require('express')
const app=express()
const cors = require('cors')
const { initModels, User, Order, Review, Cart, Product, Orderdetail, OrderDetail } = require('./models')
const jwt = require('jsonwebtoken');
const authenticate = require("./authUser")
const {Op} = require('sequelize')


const secret="elo_morelo"
const regEmail = /\S+@\S+\.\S+/;

app.use(cors())

app.use(express.json())

initModels()

app.get('/api/test', async (req, res) => {
    try {
        res.status(200).json({msg: "dzialam"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//obecny uytkownika

app.get('/api/user',authenticate, async (req, res)=>{
    try{
        console.log(req.headers['authorization']);
        
        res.status(200).json(req.user)
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})


//wybierz wszystkie produkty
app.get('/api/products', async (req, res) =>{
    try {
        fetch('https://fakestoreapi.com/products')
        .then((resp)=>resp.json())
        .then((data)=>{
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//wybierz produkt o danym id
app.get('/api/products/:id', async (req, res) =>{
    try {
        fetch('https://fakestoreapi.com/products')
        .then((resp)=>resp.json())
        .then((data)=>{
            const product = data.find((e)=>e.id==req.params.id)   
            res.status(200).json(product)         
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//wszyscy uzytkownicy
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//dany uzytkownik

app.get('/api/users/:id', async (req, res)=>{
    try{
        userID=req.params.id
        const user = await User.findOne({where:{id:userID}})
        res.status(200).json({id:user.id,email:user.email})
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})

//rejestracja
app.post('/api/register', async (req, res)=>{
    try {
        const { email, password } = req.body;
        if(!regEmail.test(email) || password.length == 0){
            return res.status(400).json({message: "niepoprawny login lub hasło"})
        }
        const user = await User.create({ email, password });
        const token = jwt.sign({user:user.id,email:user.email},secret)
        res.status(201).json({id: user.id, token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


//logowanie
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


//dodaj do koszyka
app.post('/api/cart',authenticate, async (req, res)=>{
    try{
        console.log("helo")
        const {productid,amount} = req.body
        const userID = req.user.user
        const placement = await Cart.create({productid,amount, userID})
        res.status(200).json(placement)
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})

//pobierz koszyk
app.get('/api/cart',authenticate, async (req, res)=>{
    try{
        const userID = req.user.user
        if(!userID){
            res.status(400).json({msg:"nie jestes zalogowany"})
        }
        const cart = await Cart.findAll({where:{userID:userID}})

        const newcart = cart.map(async (product)=>{
            return fetch(`https://fakestoreapi.com/products/${product.productid}`)
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                
                return {
                    productid:product.productid,
                    amount:product.amount,
                    price:data.price,
                    title:data.title,
                    category:data.category,
                    total:(data.price*product.amount)
                };
            });
        })
        const results = await Promise.all(newcart);

        console.log(cart)
        res.status(200).json({
            sum:results.reduce((a,b)=>a+b.total,0),
            cart:results
        })
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})

//usun z koszyka
app.delete('/api/cart/:id',authenticate, async (req, res)=>{
    try{
        const userID = req.user.user
        if(!userID){
            res.status(400).json({msg:"nie jestes zalogowany"})
        }
        await Cart.destroy({where: {[Op.and]: [{userID:userID},{productid:req.params.id}]}})
        const cart = await Cart.findAll({where:{userID:userID}})
        res.status(200).json()
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})


//wyczysc caly koszyk
app.delete('/api/cart',authenticate, async (req, res)=>{
    try{
        const userID = req.user.user
        if(!userID){
            res.status(400).json({msg:"nie jestes zalogowany"})
        }
        await Cart.destroy({where: {userID:userID}})
        const cart = await Cart.findAll({where:{userID:userID}})
        res.status(200).json(cart)
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})

//zloz zamowienie
app.post('/api/order',authenticate, async (req, res)=>{
    try{
        const userID = req.user.user
        const cart = await Cart.findAll({where:{userID:userID}})
        const order = await Order.create({userID:userID})
        
        const newcart = cart.map(async (product)=>{
            return fetch(`https://fakestoreapi.com/products/${product.productid}`)
            .then((resp)=>resp.json())
            .then((data)=>{
                console.log(data);
                
                const orderdetail = OrderDetail.create({orderid:order.orderid,productid:product.productid,amount:product.amount})
                
                return {
                    productid:product.productid,
                    amount:product.amount,
                    price:data.price,
                    total:(data.price*product.amount)
                };
            });
        })
        await Cart.destroy({where: {userID:userID}})
        const results = await Promise.all(newcart);

        res.status(200).json({
            sum:results.reduce((a,b)=>a+b.total,0),
            cart:results
        })

    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})

//wszystkie zamowienia uzytkownika
app.get('/api/order',authenticate, async (req, res)=>{
    try{
        const userID=req.user.user
        const orders = await Order.findAll({where:{userID:userID}})
        console.log(orders)
        const orderdetails = orders.map(async (order)=>{
            const details = await OrderDetail.findAll({where:{orderid:order.orderid}})
            console.log(order.createdAt)
            const newdetails=details.map(async (detail)=>{
                return fetch(`https://fakestoreapi.com/products/${detail.productid}`)
                .then((resp)=>resp.json())
                .then((data)=>{
                    //console.log(data)
                    return{
                        id:detail.id,
                        productid:detail.productid,
                        amount:detail.amount,
                        title:data.title,
                        price:data.price,
                        category:data.category,
                        total:(data.price*detail.amount)                        
                    }
                })
            })

            const newresults = await Promise.all(newdetails)
            //console.log("order: "+order.orderid)

            return({
                sum:newresults.reduce((a,b)=>a+b.total,0),
                order:order.orderid,
                date:order.createdAt,
                details:newresults
            })
        })
    //    console.log(orders)

        
        const results = await Promise.all(orderdetails)
        res.status(200).json(results)
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})


//usuniecie zamowienia
app.delete('/api/order/:id',authenticate, async (req, res)=>{
    try{
        const userID = req.user.user
        const order = await Order.findByPk(req.params.id)

        if(!order){
            return res.status(400).json({message: "zamowienie nie istnieje"})
        }

        if(!(userID==order.userID || req.user.email=="admin@admin.com")){
            return res.status(403).json({message:"brak uprawnien"})
        }

        await OrderDetail.destroy({where:{orderid:req.params.id}})
        await Order.destroy({where:{orderid:req.params.id}})
        const cart = await Order.findAll({where:{userID:userID}})

        res.status(200).json(cart)
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})

//pobieranie opinii produktu
app.get('/api/review/:id', async (req, res)=>{
    try{
        const productid = req.params.id

        const reviews = await Review.findAll({where:{productid:productid}})

        res.status(200).json(reviews)

    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})

//dodawanie opini o produkcie
app.post('/api/review/:id',authenticate, async (req, res)=>{
    try{
        const userID=req.user.user
        if(!userID){
            res.status(400).json({msg:"nie jestes zalogowany"})
        }
        const productid = req.params.id
        const {content,rating} = req.body

        const existingReview = await Review.findOne({where: {[Op.and]: [{userID:userID},{productid:req.params.id}]}})

        if(existingReview){
            res.status(403).json({error: "opinia juz istnieje"})
        }


        const review = await Review.create({content:content,userID:userID,productid:productid,rating:rating})


        res.status(200).json(review)
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ error: 'Something went wrong' });
        }

    res.status(400).json({ error: error.message });
    }
})

//usuniecie opinii
app.delete('/api/review/:id/user/:uid',authenticate, async (req, res)=>{
    try{
        const userID = req.user.user
        const uid = req.params.uid
        const productID = req.params.id
        const review = await Review.findOne({where:{[Op.and]: [{userID:uid},{productid:productID}]}})

        if(!review){
            return res.status(400).json({message: "opinia nie istnieje"})
        }

        if(!(userID==review.userID || req.user.email=="admin@admin.com")){
            return res.status(403).json({message:"brak uprawnien"})
        }

        await Review.destroy({where:{[Op.and]: [{userID:uid},{productid:productID}]}})

        res.status(200).json(review)
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})

app.put('/api/review/:id',authenticate, async (req, res)=>{
    try{
        const userID=req.user.user
        if(!userID){
            res.status(400).json({msg:"nie jestes zalogowany"})
        }
        const productID = req.params.id
        const {content,rating} = req.body

        const review = await Review.findOne({where:{[Op.and]: [{userID:userID},{productid:productID}]}})

        if(!review){
            return res.status(400).json({message: "opinia nie istnieje"})
        }

        if(!(userID==review.userID || req.user.email=="admin@admin.com")){
            return res.status(403).json({message:"brak uprawnien"})
        }

        await Review.update({content:content,rating:rating},{where:{[Op.and]: [{userID:userID},{productid:productID}]}})

        review.content=content
        review.rating = rating
        
        res.status(200).json(review)

    } catch (error) {
    res.status(400).json({ error: error.message });
    }
})

// TODO: zmiana opini

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Serwer włączony!");
});