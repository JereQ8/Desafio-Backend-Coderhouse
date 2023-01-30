import fs from "fs"

class ContenedorProductos{
    constructor(ruta){
        this.ruta= ruta
    }

    async getProducts(){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            return JSON.parse(productos) 
        }
        catch(err){
            throw new Error(err)
        }

        
    }

    async getProductById(id){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            const jsonProductos= JSON.parse(productos)
            const producto= jsonProductos.find(element=> element.id==id)
            return producto
        }
        catch(err){
            throw new Error(err)
        }
    }

    async deleteById(id){
        try{
            const productos=await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            const productosJson= JSON.parse(productos)
            const indiceAEliminar= productosJson.findIndex(element=> element.id== id)
            productosJson.splice(indiceAEliminar, 1)
            await fs.promises.writeFile(this.ruta, "", "utf-8")
            await fs.promises.writeFile(this.ruta, JSON.stringify(productosJson) , "utf-8")
            await this.giveId()
            return 'Producto Eliminado  Exitosamente'
        }
        catch(err){
            throw new Error(err)
        }
    }

    async update(id, newObject){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            const jsonProductos= JSON.parse(productos)
            const producto= jsonProductos.find(element=> element.id==id)
            const productoNuevo= {...producto, ...newObject};
            console.log(productoNuevo)
            const indiceAEliminar= jsonProductos.findIndex(element=> element.id== id)
            jsonProductos.splice(indiceAEliminar, 1)
            jsonProductos.push(productoNuevo)
            await fs.promises.writeFile(this.ruta, "", "utf-8")
            await fs.promises.writeFile(this.ruta, JSON.stringify(jsonProductos) , "utf-8")
            await this.giveId()
        }
        catch(err){
            throw new Error(err)
        }
    }


    async giveId(){
        const file= await fs.promises.readFile(this.ruta, "utf-8", (err, data)=>{});

        const json= await JSON.parse(file);

        const newArray= json.map((product, index)=>{
            return {...product, id:index + 1}
        })
        await fs.promises.writeFile(this.ruta,"")
        await fs.promises.writeFile(this.ruta,JSON.stringify(newArray) )
    }


}

export default ContenedorProductos