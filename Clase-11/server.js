
import express from "express"
import {Server} from "socket.io"
import handlebars from "express-handlebars"
import routeProductos from "./routes/productos.js" 
import routeCarritos from "./routes/carrito.js"


let administrador= false
const app= express()
app.use(routeProductos)
app.use(routeCarritos)
const productos= [
    {
        name:"Sillon",
        price:400,
        thumbnail:"https://silloneseuropa.com.ar/wp-content/uploads/2020/06/sam-1.jpg",
        id: 1
    }
]

const mensajes=[]

const fecha= new Date()

// middlewares

app.use((req, res)=>{
    if(res.status(404)){
        res.json({error: -2, description: "Ruta '"+ req.path + "' no implementada"})
    }
});
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine("handlebars", handlebars.engine())
app.set("views", "./views")
app.set("view engine", "handlebars")



app.get("/FormularioYProductos", (req, res)=>{
    res.render("productos", {productos, mensajes, fecha})
})

const server= app.listen(8080, ()=> console.log("Server on http://localhost:8080"))

const io= new Server(server)

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



// export default {productos: productos, administrador: administrador}
export default {productos: productos, administrador: administrador}
 