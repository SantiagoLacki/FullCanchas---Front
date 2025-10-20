const urlUsuario = import.meta.env.VITE_API_USUARIOS;
const urlProductos = import.meta.env.VITE_API_PRODUCTOS;
const urlCanchas = import.meta.env.VITE_API_CANCHAS;
const urlReservas = import.meta.env.VITE_API_RESERVAS;

export const login = async (datosUsuarios) => {
  try {
    const respuesta = await fetch(urlUsuario + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuarios),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const leerUsuarios = async () => {
  try {
    const respuesta = await fetch(urlUsuario);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const obtenerUsuarioPorId = async (id) => {
  try {
    const respuesta = await fetch(urlUsuario + `/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearUsuario = async (usuarioNuevo) => {
  try {
    const respuesta = await fetch(urlUsuario, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
      body: JSON.stringify(usuarioNuevo),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editarUsuario = async (usuarioEditado, id) => {
  try {
    const respuesta = await fetch(urlUsuario + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
      body: JSON.stringify(usuarioEditado),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const borrarUsuarioPorId = async (id) => {
  try {
    const respuesta = await fetch(urlUsuario + `/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const leerUsuariosPaginados = async (page, limit) => {
  try {
    const respuesta = await fetch(`${urlUsuario}/paginado?page=${page}&limit=${limit}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const leerProductos = async () => {
  try {
    const respuesta = await fetch(urlProductos);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    const respuesta = await fetch(urlProductos + `/${id}`);
    if (!respuesta.ok) throw new Error("Producto no encontrado");
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearProducto = async (productoNuevo) => {
  try {
    const formData = new FormData();
    formData.append("nombre", productoNuevo.nombre);
    formData.append("precio", productoNuevo.precio);
    formData.append("categoria", productoNuevo.categoria);
    formData.append("descripcion", productoNuevo.descripcion);
    formData.append("imagen", productoNuevo.imagen);
    const respuesta = await fetch(urlProductos, {
      method: "POST",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
      body: formData,
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editarProducto = async (productoEditado, id) => {
  try {
    const respuesta = await fetch(urlProductos + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
      body: JSON.stringify(productoEditado),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const borrarProductoPorId = async (id) => {
  try {
    const respuesta = await fetch(urlProductos + `/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const leerProductosPaginados = async (page, limit) => {
  try {
    const respuesta = await fetch(`${urlProductos}/paginacion?page=${page}&limit=${limit}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const leerCanchas = async () => {
  try {
    const respuesta = await fetch(urlCanchas);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const obtenerCanchaPorId = async (id) => {
  try {
    const respuesta = await fetch(urlCanchas + `/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearCancha = async (canchaNueva) => {
  try {
    const respuesta = await fetch(urlCanchas, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
      body: JSON.stringify(canchaNueva),
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editarCancha = async (canchaEditada, id) => {
  try {
    const respuesta = await fetch(urlCanchas + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
      body: JSON.stringify(canchaEditada),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const borrarCanchaPorId = async (id) => {
  try {
    const respuesta = await fetch(urlCanchas + `/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const leerReservas = async () => {
  try {
    const respuesta = await fetch(urlReservas);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const obtenerReservaPorId = async (id) => {
  try {
    const respuesta = await fetch(urlReservas + `/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearReserva = async (reservaNueva) => {
  try {
    const respuesta = await fetch(urlReservas, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
      body: JSON.stringify(reservaNueva),
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editarReserva = async (reservaEditada, id) => {
  try {
    const respuesta = await fetch(urlReservas + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
      body: JSON.stringify(reservaEditada),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const borrarReservaPorId = async (id) => {
  try {
    const respuesta = await fetch(urlReservas + `/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const leerReservasPaginadas = async (page, limit) => {
  try {
    const respuesta = await fetch(`${urlReservas}/paginacion?page=${page}&limit=${limit}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
