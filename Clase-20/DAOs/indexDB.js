import routeCarritoDB from '../routes/mongo-routes/routeCarrito.js'
import routeProductosDB from '../routes/mongo-routes/routeProductos.js'
import routeCarritoFS from '../routes/fileSystem-routes/routeCarrito.js'
import routeProductosFS from '../routes/fileSystem-routes/routeProducts.js'



const persistencia= 'Mongo'
let routes

if(persistencia=='FileSystem'){
    routes=[routeCarritoFS,routeProductosFS]
}
else if(persistencia=='Mongo'){
    routes= [routeCarritoDB, routeProductosDB]
}

export default routes



