const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const collection = require('./mongodb')
const newpro = require('./product')


const tempelatePath = path.join(__dirname, '../tempelates')

app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.render("login")
})

app.get('/signup', (req, res) => {
    res.render("signup")
})
app.get('/shop', (req, res) => {
    newpro.find({})
    .then(pros =>{
        res.render("shop"
        ,{pros:pros.map(pro=>pro.toJSON())}
        )
    })
    
})
app.get('/home', (req, res) => {
    res.render("home")
})
app.get('/newproduct', (req, res) => {
    res.render("newproduct")
})

app.post('/signup', async (req, res) => {

    const data = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        avata: req.body.avata
    }

    await collection.insertMany([data])

    res.render("home")

})
app.post('/login', async (req, res) => {

    try {
        const check = await collection.findOne({ email: req.body.email })

        if (check.password == req.body.password) {
            res.render("home")
        }
        else {
            res.send("Mật khẩu sai")
        }

    }
    catch {
        res.send("Tài khoản hoặc mật khẩu sai")
    }

})
app.post('/newproduct',async (req,res)=>{
    const datapro = {
        imgpro: req.body.imgpro,
        namepro: req.body.namepro,
        pricepro: req.body.pricepro
    }
    await newpro.insertMany([datapro])
    newpro.find({})
    .then(pros =>{
        res.render("shop"
        ,{pros:pros.map(pro=>pro.toJSON())}
        )
    })
    
    
})




app.listen(3000, () => {
    console.log("port connected");
})
