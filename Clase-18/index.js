import { MongoClient } from "mongodb";

const client= await new MongoClient(
    'mongodb://localhost:27017',
    // { useNewUrlParser: true, useUnifiedTopology: true }
)

const collMensajes= client.db('ecommerce').collection('mensajes')

const collProductos= client.db('ecommerce').collection('productos')

// const showMensajes= await collMensajes.find({}).toArray()


//                                  1)

const products=[
    {
        "name": "Lavavajillas",
        "price": 5000,
        "thumbnail": "https://d2r9epyceweg5n.cloudfront.net/stores/128/502/products/dw60-silver1-b924f19dcf4e702e0015676109509960-1024-1024.png"
      },
      {
       
        "name": "Aire Acondicionado",
        "price": 4500,
        "thumbnail": "https://www.casadelaudio.com/Image/0/400_400-252-TCL-227_01.png"
      },
      {
        "name": "Heladera",
        "price": 4600,
        "thumbnail": "https://images.samsung.com/is/image/samsung/ar-rt29k577js8b3-rt29k577js8-b3-frontsilver-312234036?$650_519_PNG$",
      },
      {
        "name": "Ventilador",
        "price": 2500,
        "thumbnail": "https://www.centrogar.com.ar/663-large_default/ventdpie-crivel-20-v15-07141bxra-hogar.jpg"
      },
      {
        "name": "Cocina",
        "price": 3800,
        "thumbnail": "https://www.mobihogar.com.ar/3097-thickbox_default/cocina-la-magica-bianca-acero-gtia6meses.jpg",
      },
      {       
        "name": "Pileta",
        "price": 2000,
        "thumbnail": "http://www.casasilcar.com.ar/spree/products/1209/product/440f5689849e794bad568cb55bd8022d82da0004_3af5ace1859c0dc37e7270558f375100a5265fb5.png?1484170706"
      },
      {
        "name": "Iphone 13",
        "price": 5000,
        "thumbnail": "https://itechstore.com.ar/wp-content/uploads/2022/06/iphone-13-pro-max-green-select.png",
      },
      {
        "name": "Mate",
        "price": 1500,
        "thumbnail": "https://lasvinas.com.ar/wp-content/uploads/2021/04/20210211_103413_clipped_rev_1-1-600x600.jpeg",
      },
      {
        "name": "Vaso",
        "price": 250,
        "thumbnail": "https://www.mobihogar.com.ar/3097-thickbox_default/cocina-la-magica-bianca-acero-gtia6meses.jpg",
      },
    {
      "name": "Espejo",
      "price": 500,
      "thumbnail": "https://www.mobihogar.com.ar/3097-thickbox_default/cocina-la-magica-bianca-acero-gtia6meses.jpg",
    }]

collProductos.insertMany(products)

//                                   3)

const showMensajes=await collMensajes.find({}).toArray()
const showProductos=await collProductos.find({}).toArray()

console.log(showMensajes)
console.log(showProductos)

//                                   4)

console.log(showMensajes.length)
console.log(showProductos.length)

// const product= {
//     name: 'Taza Starbucks',
//     price: 40,
//     thumbnail:'https://static.wixstatic.com/media/e16892_0642770d95774493bd3ac8519814800c~mv2.png/v1/fill/w_600,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/starbucks_cup.png'
// }


//                                           5A
const insert= await collProductos.insertOne(product)

// 5B: i)

const menorA1000= showProductos.filter(prod=> prod.price < 1000)
console.log(menorA1000)

// 5B ii)
const entre1000y3000= showProductos.filter(prod=> prod.price > 1000 && prod.price < 3000)
console.log(entre1000y3000)

// 5B iii)

const mayorA3000= showProductos.filter(prod=>prod.price > 3000)
console.log(mayorA3000)

// 5C)

collProductos.updateMany({}, {$set: {'stock': 100}})

// const showProductos= await collProductos.find({}).toArray()

// 5D)

await collProductos.updateMany({price:{$gt: 4000}}, {$set: {'stock': 0}})
const showProductos= await collProductos.find({}).toArray()


// 5E)
 await collProductos.deleteMany({price: {$lt: 1000}})
 const showProductos= await collProductos.find({}).toArray()

// 6) Esto lo ejecute en la consola de mongosh

use ecommerce
db.createUser({user:'pepe', pwd:'simon', roles:[{role:'read', db:'productos'},{role:'read', db:'mensajes'} ]})
db.auth({'pepe', 'simon'})



// console.log(userRead)


// console.log(showProductos)