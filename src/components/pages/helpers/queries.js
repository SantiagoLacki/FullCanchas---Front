const urlUsuario = import.meta.env.VITE_API_USUARIOS

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
        const formData = new formData();
        formData.append('nombreUsuario', usuarioNuevo.nombreUsuario)
        const respuesta = await fetch(urlUsuario, {
            method: 'POST',
            headers: {
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
                'Content-Type': 'application/json'
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