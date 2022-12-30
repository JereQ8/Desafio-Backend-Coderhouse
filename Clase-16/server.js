const express= require("express")
const path= require("path")
const SocketIO= require("socket.io")
const handlebars= require("express-handlebars")
const routeProductos= require("./routes/productos")
const routeCarrito= require("./routes/carrito")
const { Contenedor }= require("./db")
const {knex}= require("knex")

const app= express()

const db= knex({ 
    client:'mysql',
    connection:{
        host:'localhost',
        database:'productos',
        password:'',
        user:'root'
    },
    pool:{min:0, max:10}
})

console.log(db)


const mensajes=[]
const fecha= new Date()

// middlewares

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routeCarrito)
app.use(routeProductos)
app.engine("handlebars", handlebars.engine())
app.set("views", "./views")
app.set("view engine", "handlebars")

// Esta funcion la hice para ver si aca me tomaba la base de datos y 
// si podia hacer las querys, pero es de forma provisoria

const returnProducts=async (req, res)=>{
     await db.config.select("*").from('products')
        .then((respuesta)=> res.json(respuesta))
        .catch((err)=> console.log(err));
}

app.get("/FormularioYProductos", (req, res)=>{
    console.log(productos)
    res.render("productos", {productos , mensajes, fecha})
})
    

const server= app.listen(3000, ()=> console.log("Server on http://localhost:3000"))

const io= SocketIO(server)

io.on("connection",(socket)=>{
    console.log("New connection")
    socket.on("create:data",(data)=>{
        productos.push(data)
        io.sockets.emit("create:data", productos)
    })
    
    socket.on("chat:message", (data)=>{
        let data2= {...data, date:fecha.getHours()+ ":" + fecha.getMinutes()}
        mensajes.push(data2)
        io.sockets.emit("chat:message", data)
        console.log(mensajes)
    })
    
})

module.exports={db}
















// const productos= [
//     {
//         name:"Sillon",
//         price:400,
//         thumbnail:"https://silloneseuropa.com.ar/wp-content/uploads/2020/06/sam-1.jpg"
//     }
// ]