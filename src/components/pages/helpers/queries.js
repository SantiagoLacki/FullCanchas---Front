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