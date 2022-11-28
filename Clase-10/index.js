const express= require("express")
const {engine}= require("express-handlebars")
const app= express()

app.engine("handlebars", engine())
app.set("views", "./views")
// app.set("view engine", "handlebars")
// app.set("view engine", "pug")
app.set("view engine", "ejs")

const productos= []

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    // res.render("formulario")
    // res.render("formulario.pug")
    res.render("formulario.ejs", {titulo:"Formulario"})
})

app.post("/productos",(req, res)=>{
    console.log(req.body)
    productos.push(req.body)
    // res.render("productos", {productos}) 
    // res.render("productos.pug", {productos})
    res.render("productos.ejs", {productos})
})

app.get("/productos",(req, res)=>{    
    // res.render("productos.handlebars", {productos})    
    // res.render("productos.pug", {productos})
    res.render("productos.ejs", {productos})
})

app.listen(3000, ()=> console.log("server on http://localhost:3000"))