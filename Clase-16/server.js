const express= require("express")
const path= require("path")
const SocketIO= require("socket.io")
const handlebars= require("express-handlebars")
const routeProductos= require("./routes/productos")
const routeCarrito= require("./routes/carrito")
const { Contenedor }= require("./db")
const config= require("./config")

const dbProducts= new Contenedor(config.mariaDB, "products") 
const dbMessages= new Contenedor(config.sqlite3, "messages")

const app= express()

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


app.get("/FormularioYProductos",async (req, res)=>{
    const productos= await dbProducts.getAll()
    const mensajes= await dbMessages.getAll()
    res.render("productos", {productos, mensajes, fecha})
})

app.get("/table", async (req, res)=>{
    let exist= await dbMessages.getMessages("messages")
    res.send(exist)
})
    

const server= app.listen(3000, ()=> console.log("Server on http://localhost:3000"))

const io= SocketIO(server)

io.on("connection",async (socket)=>{
    console.log("New connection")

    socket.on("create:data", async(data)=>{
        await dbProducts.insert(data) 
        io.sockets.emit("create:data", await dbProducts.getAll())
    })
    
    socket.on("chat:message", async (data)=>{
        // dbMessages.getMessages()
        if(dbMessages.config.schema.hasTable("messages")){
            let data2= {...data, date:`${fecha.getHours()}:${fecha.getMinutes()}`}
            await dbMessages.insert(data2)
            io.sockets.emit("chat:message", await dbMessages.getAll())
        }
        else{
            console.log("No existe una tabla de mensajes")
            await dbMessages.config.schema.createTable(tableName, (table)=>{
                table.string("message", 250);
                table.string("gmail", 50);
                table.string("date", 50)
                console.log("Tabla Creada")
            })
            let data2= {...data, date:`${fecha.getHours()}:${fecha.getMinutes()}`}
            await dbMessages.insert(data2)
            io.sockets.emit("chat:message", await dbMessages.getAll())
        }
    })
    
})



