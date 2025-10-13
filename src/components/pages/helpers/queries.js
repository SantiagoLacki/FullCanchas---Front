const urlUsuario = import.meta.env.VITE_API_USUARIOS
const urlProductos = import.meta.env.VITE_API_PRODUCTOS

export const login = async(datosUsuarios)=>{
    try{
        const respuesta = await fetch(urlUsuario+'/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuarios)
        })
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}

export const leerUsuarios = async()=>{
    try{
        const respuesta = await fetch(urlUsuario)
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}

export const obtenerUsuarioPorId = async(id)=>{
    try{
        const respuesta = await fetch(urlUsuario+`/${id}`)
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}

export const crearUsuario = async(usuarioNuevo)=>{
    try{
        const respuesta = await fetch(urlUsuario, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': JSON.parse(sessionStorage.getItem('userKey')).token
            },
            body: JSON.stringify(usuarioNuevo)
        })
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}


export const editarUsuario = async(usuarioEditado, id)=>{
    try{
        const respuesta = await fetch(urlUsuario+`/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': JSON.parse(sessionStorage.getItem('userKey')).token
            },
            body: JSON.stringify(usuarioEditado)
        })
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}

export const borrarUsuarioPorId = async(id)=>{
    try{
        const respuesta = await fetch(urlUsuario+`/${id}`, {
            method: 'DELETE',
            headers: {
                'x-token': JSON.parse(sessionStorage.getItem('userKey')).token
            },
        })
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}

export const leerUsuariosPaginados = async(page, limit)=>{
    try{
        const respuesta = await fetch(`${urlUsuario}/paginacion?page=${page}&limit=${limit}`)
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}


export const leerProductos = async()=>{
    try{
        const respuesta = await fetch(urlProductos)
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}

export const obtenerProductoPorId = async(id)=>{
    try{
        const respuesta = await fetch(urlProductos+`/${id}`)
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}

export const crearProducto = async(productoNuevo)=>{
    try{
        const respuesta = await fetch(urlProductos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': JSON.parse(sessionStorage.getItem('userKey')).token
            },
            body: JSON.stringify(productoNuevo)
        })
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}


export const editarProducto = async(productoEditado, id)=>{
    try{
        const respuesta = await fetch(urlProductos+`/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': JSON.parse(sessionStorage.getItem('userKey')).token
            },
            body: JSON.stringify(productoEditado)
        })
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}

export const borrarProductoPorId = async(id)=>{
    try{
        const respuesta = await fetch(urlProductos+`/${id}`, {
            method: 'DELETE',
            headers: {
                'x-token': JSON.parse(sessionStorage.getItem('userKey')).token
            },
        })
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}

export const leerProductosPaginados = async(page, limit)=>{
    try{
        const respuesta = await fetch(`${urlProductos}/paginacion?page=${page}&limit=${limit}`)
        return respuesta
    }catch(error){
        console.error(error);
        return null
    }
}

