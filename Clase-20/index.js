import express from 'express';
import routes from './DAOs/indexDB.js'
import mongoose from 'mongoose';


const conexion= mongoose.connect('mongodb+srv://JereUser:sesquin2863@jere-back.paqom6v.mongodb.net/productos?retryWrites=true&w=majority', (err)=>{
    if(err) console.log(err)
    else console.log('Base conectada :)')
})

const server= express()

server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use(routes[0])
server.use(routes[1])


server.listen(3000, ()=>{
    console.log('Server on port 3000')
})