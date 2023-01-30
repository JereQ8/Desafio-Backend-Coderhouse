import fs from 'fs'

class ContenedorCarrito{
    constructor(ruta){
        this.ruta= ruta
    }

    async getCarritos(){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            return JSON.parse(productos) 
        }
        catch(err){
            throw new Error(err)
        }
    }

    async getCarritoById(id){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            const json= JSON.parse(productos);
            const carrito= json.find(elem=> elem.id== id)
            return carrito
        }
        catch(err){
            throw new Error(err)
        }
    }

    async getProductsFromCarrito(id){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            const json= JSON.parse(productos);
            const carrito= json.find(elem=> elem.id== id)
            const products= carrito.productos
            return products
        }
        catch(err){
            throw new Error(err)
        }
    }

    async addNewCarrito(carrito){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            const json= JSON.parse(productos);
            json.push(carrito)
            await fs.promises.writeFile(this.ruta, '', 'utf-8')
            await fs.promises.writeFile(this.ruta, JSON.stringify(json), 'utf-8')
            await this.giveId()
            return carrito
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

    async giveIdToProducts(id){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            const json= JSON.parse(productos);
            const indexCarrito= json.findIndex(elem=> elem.id==id);
            const newArray= json[indexCarrito].productos.map((product, index)=>{
                return {...product, id:index + 1}
            })
             
            json[indexCarrito].productos= [];
            json[indexCarrito].productos= newArray;
            await fs.promises.writeFile(this.ruta, '', 'utf-8')
            await fs.promises.writeFile(this.ruta, JSON.stringify(json), 'utf-8')
            return 'Productos con nuevos IDs'
        }
        catch(err){
            throw new Error(err)
        }
    }

    async addProductToCarrito(id, product){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            const json= JSON.parse(productos);
            const indexCarrito= json.findIndex(elem=> elem.id==id);
            json[indexCarrito].productos.push(product);
            await fs.promises.writeFile(this.ruta, '', 'utf-8')
            await fs.promises.writeFile(this.ruta, JSON.stringify(json), 'utf-8')
        }
        catch(err){
            throw new Error(err)
        }

    }

    // QUEDA:
    // - Eliminar carrito
    async deleteCarrito(id){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            const json= JSON.parse(productos);
            const indexAEliminar= json.findIndex(elem=> elem.id==id);
            json.splice(indexAEliminar, 1);
            await fs.promises.writeFile(this.ruta, '', 'utf-8');
            await fs.promises.writeFile(this.ruta, JSON.stringify(json), 'utf-8');
            this.giveId()
        }
        catch(err){
            throw new Error(err)
        }
    }
    // - Vaciar Carrito
    async vaciarCarrito(id){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            const json= JSON.parse(productos);
            const indexAVaciar= json.findIndex(elem=> elem.id==id);
            json[indexAVaciar].productos=[];
            await fs.promises.writeFile(this.ruta, '', 'utf-8');
            await fs.promises.writeFile(this.ruta, JSON.stringify(json), 'utf-8');
        }
        catch(err){
            throw new Error(err)
        }
    }
    // - Eliminar producto de carrito
    async deleteProductFromCarrito(idCarrito, idProducto){
        try{
            const productos= await fs.promises.readFile(this.ruta, 'utf-8', (err, data)=>{});
            const json= JSON.parse(productos);
            const indexCarrito= json.findIndex(elem=> elem.id==idCarrito)
            const indexProducto= json[indexCarrito].productos.findIndex(elem=> elem.id== idProducto)
            json[indexCarrito].productos.splice(indexProducto, 1)
            await fs.promises.writeFile(this.ruta, '', 'utf-8');
            await fs.promises.writeFile(this.ruta, JSON.stringify(json), 'utf-8');
            this.giveIdToProducts()
        } 
        catch (err){
            throw new Error(err)
        }
    }

}

export default ContenedorCarrito