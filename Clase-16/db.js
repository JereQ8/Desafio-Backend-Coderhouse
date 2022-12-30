const { knex }= require("knex")

class Contenedor{
    constructor(config, table){
        this.config= knex(config),
        this.table= table
    }

    async getByID(nroId){
        await this.config.select("*").from(this.table).where({id:nroId})
        .then((response)=> res.json(response))
        .catch((err)=> res.json(err))
    }

    async deleteById(nroId){
        // Borro el producto
        await this.config.delete("*").from(this.table).where({id:nroId})
        .then((el)=> console.log(`Elemento con ID ${nroId} eliminado`))
        .catch((err)=> res.send(err))
        // Consigo la lista de productos para chequear si se borro
        await this.config.select("*").from(this.table)
        .then((respuesta)=> res.json(respuesta))
        .catch((err)=> res.send(err))
    }

    async getAll(){
         await this.config.select("*").from(this.table)
        .then((respuesta)=>res.json(respuesta))
        .catch((err)=> res.send(err))
        
    }

    async returnProducts(){
        await this.config.select("*").from(this.table)
        .then((respuesta)=> respuesta)
        .catch((err)=> console.log(err))
    }

    async lastProduct(){
        await this.config.select("*").from(this.table)
        .then((respuesta)=> res.json(respuesta[respuesta.length-1]))
        .catch((err)=> res.send(err))
    }

    async insertProduct(producto){
        await this.config.insert(producto).into(this.table)
        .then((respuesta)=> console.log(`Elemento ${respuesta[0]} agregado`))
        .catch((err)=> console.log(err))
        await this.lastProduct()
    }

    async modifyProduct(nroId, newProduct){
        await this.config.where({id:nroId}).update(newProduct).into(this.table)
        .then((respuesta)=> console.log(respuesta))
        .catch((err)=> console.log(err))
        await this.getAll()
    }
}

module.exports= {Contenedor}


// const heroes= new Contenedor({
//     client:'mysql',
//     connection:{
//         host:'localhost',
//         database:'productos',
//         password:'',
//         user:'root'
//     },
//     pool:{min:0, max:10}
// }, "products")

// heroes.modifyProduct(12, {
//     name: "Ventilador",
//     price: 100,
//     thumbnail:'https://http2.mlstatic.com/D_NQ_NP_626105-MLA32384814346_102019-O.webp'
// })
// heroes.getAll()

// let producto={
//     name: "Ventilador",
//     price: 100,
//     thumbnail:'https://http2.mlstatic.com/D_NQ_NP_626105-MLA32384814346_102019-O.webp'
// }


// heroes.insertProduct(producto)

// heroes.getByID(2)
// heroes.deleteById(14)

