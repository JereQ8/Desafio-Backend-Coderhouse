import express from 'express';
// Imports de routers por fileSystem

// import routeProductsjson from './routes/fileSystem/routeProducts.js';
// import routeCarritosjson from './routes/fileSystem/routeCarrito.js'

// Imports de routers por Mongo
import routeProductosDB from './routes/mongo-routes/routeProductos.js'
import routeCarritosDB from './routes/mongo-routes/routeCarrito.js'

import mongoose from 'mongoose';
import ContenedorProductosDB from './DAOs/Mongo/ContenedorProductos.js';

const productos= new ContenedorProductosDB()

const conexion= mongoose.connect('mongodb+srv://JereUser:sesquin2863@jere-back.paqom6v.mongodb.net/productos?retryWrites=true&w=majority', (err)=>{
    if(err) console.log(err)
    else console.log('Base conectada :)')
})


const server= express()


server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use(routeProductosDB)
server.use(routeCarritosDB)
// server.use(routeProductsjson)
// server.use(routeCarritosjson)



server.listen(3000, ()=>{
    console.log('Server on port 3000')
})