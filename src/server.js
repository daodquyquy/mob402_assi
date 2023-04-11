const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const collection = require('./mongodb')
const newpro = require('./product')
const bodyp = require('body-parser')
const exphbs = require('express-handlebars')
const multer = require('multer')
const fs = require('fs')
const mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const alert = require('alert')

mongoose.connect("mongodb://127.0.0.1/assignment", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("mongodb connected")
    })
    .catch(() => {
        console.log("fail to connect")
    })


const tempelatePath = path.join(__dirname, '../tempelates')

app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(bodyp.urlencoded({ extended: false }));
app.use(cookieParser());
mongoose.set('useFindAndModify', false);

// SET STORAGE
let storage = multer.diskStorage({
    destination: 'image/',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage
})

app.get('/', (req, res) => {
    res.render("login")
})

app.get('/signup', (req, res) => {
    res.render("signup")
})
app.get('/shop', (req, res) => {
    try {
        var token = req.cookies.token
        var idUser = jwt.verify(token, 'quy123');
        collection.findOne({
            _id: idUser
        }).then(data => {
            if (data) {
                newpro.find({})
                    .then(pros => {
                        res.render("shop"
                            , { pros: pros.map(pro => pro.toJSON()) }
                        )
                    })
            } else {
                console.log('Loi')
            }
        })

    } catch (error) {
        console.log(error)
        alert("Bạn chưa login");
    }

})
app.get('/home', (req, res) => {
    try {
        var token = req.cookies.token
        var idUser = jwt.verify(token, 'quy123');
        collection.findOne({
            _id: idUser
        }).then(data => {
            if (data) {
                newpro.find({})
                    .then(pros => {
                        res.render("home"
                            , { pros: pros.map(pro => pro.toJSON()) }
                        )
                    })
            } else {
                console.log('Loi')
            }
        })

    } catch (error) {
        console.log(error);
        alert("Bạn chưa login");
    }

})
app.get('/nguoidung', (req, res) => {
    try {
        var token = req.cookies.token
        var idUser = jwt.verify(token, 'quy123');
        collection.findOne({
            _id: idUser
        }).then(data => {
            if (data) {
                newpro.find({})
                    .then(pros => {
                        res.render("nguoidung"
                            , { pros: pros.map(pro => pro.toJSON()) }
                        )
                    })
            } else {
                console.log('Loi')
            }
        })

    } catch (error) {
        console.log(error);
        alert("Bạn chưa login");
    }

})
app.get('/newproduct', (req, res) => {
    res.render("newproduct")
})

app.get('/taikhoan', (req, res) => {
    try {
        var token = req.cookies.token
        var idUser = jwt.verify(token, 'quy123');
        collection.findOne({
            _id: idUser
        }).then(data => {
            if (data) {
                collection.find({ _id: idUser })
                    .then(users => {
                        res.render("taikhoan"
                            , { users: users.map(user => user.toJSON()) }
                        )
                    })
            } else {
                console.log('Loi')
            }
        })

    } catch (error) {
        console.log(error);
        alert("Bạn chưa login");
    }
})
app.get('/taikhoanadmin', (req, res) => {
    try {
        var token = req.cookies.token
        var idUser = jwt.verify(token, 'quy123');
        collection.findOne({
            _id: idUser
        }).then(data => {
            if (data) {
                collection.find({ _id: idUser })
                    .then(users => {
                        res.render("taikhoanadmin"
                            , { users: users.map(user => user.toJSON()) }
                        )
                    })
            } else {
                console.log('Loi')
            }
        })

    } catch (error) {
        console.log(error);
        alert("Bạn chưa login");
    }
})
app.get('/danhsachtaikhoan', (req, res) => {
    try {
        var token = req.cookies.token
        var idUser = jwt.verify(token, 'quy123');
        collection.findOne({
            _id: idUser
        }).then(data => {
            if (data) {
                collection.find({})
                    .then(users => {
                        res.render("danhsachtaikhoan", { users: users.map(user => user.toJSON()) });
                    })
            } else {
                console.log('Loi')
            }
        })

    } catch (error) {
        console.log(error);
        alert("Bạn chưa login");
    }

})
app.get('/updateproduct/:id', async (req, res) => {
    await newpro.findById(req.params.id, (err, pro) => {
        if (!err) {
            res.render('updateproduct', { pro: pro.toJSON() })
        }
    })
})
app.get('/updateuser/:id', async (req, res) => {
    await collection.findById(req.params.id, (err, user) => {
        if (!err) {
            res.render('updateuser', { user: user.toJSON() })
        }
    })
})
app.get('/editnguoidung/:id', (req, res) => {
    try {
        var token = req.cookies.token
        var idUser = jwt.verify(token, 'quy123');
        collection.findOne({
            _id: idUser
        }).then(data => {
            if (data) {
                collection.find({ _id: idUser })
                    .then(users => {
                        res.render("editnguoidung"
                            , { users: users.map(user => user.toJSON()) }
                        )
                    })
            } else {
                console.log('Loi')
            }
        })

    } catch (error) {
        console.log(error)
    }
})
app.get('/editadmin/:id', (req, res) => {
    try {
        var token = req.cookies.token
        var idUser = jwt.verify(token, 'quy123');
        collection.findOne({
            _id: idUser
        }).then(data => {
            if (data) {
                collection.find({ _id: idUser })
                    .then(users => {
                        res.render("editadmin"
                            , { users: users.map(user => user.toJSON()) }
                        )
                    })
            } else {
                console.log('Loi')
            }
        })

    } catch (error) {
        console.log(error)
    }
})

app.post('/signup', upload.single('filename'), async (req, res) => {

    const data = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        filename: req.file.filename
    }

    await collection.insertMany([data])

    res.render("login")

})
app.post('/login', async (req, res) => {
    collection.findOne({
        email: req.body.email,
        password: req.body.password
    })
        .then(data => {
            if (data) {
                var token = jwt.sign({ _id: data._id }, 'quy123');
                res.cookie("token", token, { httpOnly: true });
                if ((jwt.verify(token, 'quy123'))) {
                    if (data.role === 'admin') {
                        newpro.find({})
                            .then(pros => {
                                res.render("home"
                                    , { pros: pros.map(pro => pro.toJSON()) }
                                )
                            })
                    } else {
                        newpro.find({})
                            .then(pros => {
                                res.render("nguoidung"
                                    , { pros: pros.map(pro => pro.toJSON()) }
                                )
                            })
                    }
                }
            } else {
                console.log("loi token")
            }
        })

})
app.post('/newproduct', upload.single('filename'), async (req, res) => {

    const datapro = {
        filename: req.file.filename,
        namepro: req.body.namepro,
        pricepro: req.body.pricepro
    }

    await newpro.insertMany([datapro])
    newpro.find({})
        .then(pros => {
            res.render("shop"
                , { pros: pros.map(pro => pro.toJSON()) }
            )
        })

})

app.get('/deleteproduct/:id', async (req, res) => {
    try {
        const user = await newpro.findByIdAndDelete(req.params.id, req.body);
        if (!user) {
            res.status(400).send("No item found");
        } else {

            res.redirect('/shop');
        }
    } catch (error) {

        res.status(500).send(error);
    }
})
app.get('/deleteuser/:id', async (req, res) => {
    try {
        const user = await collection.findByIdAndDelete(req.params.id, req.body);
        if (!user) {
            res.status(400).send("No item found");
        } else {

            res.redirect('/danhsachtaikhoan');
        }
    } catch (error) {

        res.status(500).send(error);
    }
})
app.post('/updatepro', upload.single('filename'), async (req, res) => {
    // console.log(req.body)
    // console.log(req.file)
    await newpro.findOneAndUpdate({ _id: req.body.id }, {
        filename: req.file.filename,
        namepro: req.body.namepro,
        pricepro: req.body.pricepro
    }, { new: true }, (err) => {
        if (!err) {
            newpro.find({})
                .then(pros => {
                    res.render("shop"
                        , { pros: pros.map(pro => pro.toJSON()) }
                    )
                })
        } else {
            console.log(err);
        }

    })
})
app.post('/updateuser', upload.single('filename'), async (req, res) => {
    // console.log(req.body)
    // console.log(req.file)
    await collection.findOneAndUpdate({ _id: req.body.id }, {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
        filename: req.file.filename
    }, { new: true }, (err) => {
        if (!err) {
            collection.find({})
                .then(users => {
                    res.render("danhsachtaikhoan"
                        , { users: users.map(user => user.toJSON()) }
                    )
                })
        } else {
            console.log(err);
        }

    })
})
app.post('/editnd', upload.single('filename'), async (req, res) => {
    // console.log(req.body)
    // console.log(req.file)
    await collection.findOneAndUpdate({ _id: req.body.id }, {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        filename: req.file.filename
    }, { new: true }, (err) => {
        if (!err) {
            collection.find({ _id: req.body.id })
                .then(users => {
                    res.render("taikhoan"
                        , { users: users.map(user => user.toJSON()) }
                    )
                })
        } else {
            console.log(err);
        }

    })
})
app.post('/editadmin', upload.single('filename'), async (req, res) => {
    // console.log(req.body)
    // console.log(req.file)
    await collection.findOneAndUpdate({ _id: req.body.id }, {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        filename: req.file.filename
    }, { new: true }, (err) => {
        if (!err) {
            collection.find({ _id: req.body.id })
                .then(users => {
                    res.render("taikhoanadmin"
                        , { users: users.map(user => user.toJSON()) }
                    )
                })
        } else {
            console.log(err);
        }

    })
})

app.get('/logout', function (req, res) {
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', { expires: new Date(0) });
    }
    res.redirect('/');
});




app.listen(4000, () => {
    console.log("port connected");
})
