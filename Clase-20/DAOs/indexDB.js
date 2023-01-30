import ContenedorCarritosDB from "./Mongo/ContenedorCarritos.js";
import ContenedorProductosDB from "./Mongo/ContenedorProductos.js";
import ContenedorCarritosFS from './FileSystem/ContenedorCarrito.js'
import ContenedorProductosFS from './FileSystem/ContenedorProductos.js'

const persistencia= 'FileSystem'
let contenedor

if(persistencia=='FileSystem'){
    contenedor= new ContenedorCarrito('./DbsFileSystem/carritos.json')
} 



// USAR FS O MONGO SEGUN LA PERSISTENCIA

// 1) en index.js debo importar 2 routes con los nombres 'routeCarrito' y 'routeProducts' y ponerlos en server.use()... Ambas importaciones vienen de indexDB.js

// 2) en indexDB.js debo exportar 2 routes, ambas deben ser de una misma persistencia (db o fs)

