import axios from "axios";
import { storage } from "../component/firebase";

export const registerUser = async (datos) =>{
    debugger
    var mensaje = '';
    const usuario = {
        "documento": datos.documentoregistro,
        "nombre": datos.nombreregistro,
        "apellido": datos.apellidoregistro,
        "fechaNacimiento": datos.registrofechanac,
        "correo": datos.mailregistro,
        "contrasena": datos.contraseniaregistro,
        "direcciones": [{
            "calle": datos.calleregistro,
            "numero": datos.numeroregistro,
            "apto": datos.aptoregistro,
            "barrio": datos.barrioregistro,
            "ciudad": datos.ciudadregistro,
            "departamento": datos.departamentoegistro,
            "principal": true
        }]
      }
      const JSONuser = JSON.stringify(usuario);
      try {
        const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/auth/registrar",JSONuser, {headers: {'Content-Type': 'application/json'}});
        console.log(res)
        mensaje = res.data.mensaje;
       } catch (error) {
         console.log(error)
       }
       return mensaje;
}

export const loginUser = async (datos) =>{
  debugger
  var mensaje = [];
  const login = {
        "correo": datos.maillogin,
        "contrasena": datos.contrasenialogin,
  }
  const JSONlogin = JSON.stringify(login);
  try{
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/auth/login",JSONlogin, {headers: {'Content-Type': 'application/json'}});
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.idUser;
    mensaje[2] = res.data.objeto;
    mensaje[3] = res.data.rol;
  }catch(error){
      console.log(error)
  }
  return mensaje;
}

export const createProduct = async (datos,imagenes,regvend) =>{
  debugger
  var arrimg = []
  console.log(datos)
  imagenes.forEach(i => arrimg.push(i.ruta.name));
  var mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
   // const datosheader = await getHeader();
    //const idClient = datosheader[0];
    const idClient = sessionStorage.getItem('user')
    const datosend = {
      "nombre": datos.nombreproducto,
      "descripcion": datos.descripcionproducto,
      "precio" :  datos.precioproducto,
      "stock" :  datos.stockproducto,
      "categoria" :  datos.categoriaproducto,
      "activo" :  regvend,
      //"imagenesUrl" :  arrimg,
      "imagenesUrl" :  arrimg,
      "idVendedor" : idClient,
}
const JSONdatosend = JSON.stringify(datosend);
var res=''
    
      res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/alta",JSONdatosend, {headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}});
    
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
    //subir imagenes a firebase
    imagenes.forEach(element => {
      debugger
      var image = element.ruta
      const uploadTask = storage.ref(`images/${res.data.objeto}_${image.name}`).put(image);
      uploadTask.on(
      "state_changed",
      snapshot => {
          const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          //setProgress(progress);
      },
      error => {
          console.log(error);
      },
      () => {
          storage
          .ref("images")
          .child('prueba')
          .getDownloadURL()
          .then(url => {
          });
      }
      );
  });
  

  }catch(error){
      console.log(error)
  }
  return mensaje;
}

export const updateProduct = async (id,datos,imagenes,regvend) =>{
  debugger
  var arrimg = []
  console.log(datos)
  if(imagenes[0].ruta !='' && imagenes[0].ruta != undefined){
    imagenes.forEach(i => arrimg.push(i.ruta.name));
  }
  var mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
   // const datosheader = await getHeader();
    //const idClient = datosheader[0];
    const idClient = sessionStorage.getItem('user')
    const datosend = {
      "id":id,
      "nombre": datos.nombreproducto,
      "descripcion": datos.descripcionproducto,
      "precio" :  datos.precioproducto,
      "stock" :  datos.stockproducto,
      "categoria" :  datos.categoriaproducto,
      "activo" :  regvend,
      //"imagenesUrl" :  arrimg,
      "imagenesUrl" :  arrimg,
      "idVendedor" : idClient,
}
const JSONdatosend = JSON.stringify(datosend);
var res=''
    
      res = await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/modificar",JSONdatosend, {headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}});
    
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
    //subir imagenes a firebase
    if(imagenes[0].ruta !='' && imagenes[0].ruta != undefined){
      imagenes.forEach(element => {
        debugger
        var image = element.ruta
        const uploadTask = storage.ref(`images/${id}_${image.name}`).put(image);
        uploadTask.on(
        "state_changed",
        snapshot => {
            const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            //setProgress(progress);
        },
        error => {
            console.log(error);
        },
        () => {
            storage
            .ref("images")
            .child('prueba')
            .getDownloadURL()
            .then(url => {
            });
        }
        );
    });
    }
    
  

  }catch(error){
      console.log(error)
  }
  return mensaje;
}

export const addProductCart = async (product) =>{
  debugger
  var mensaje =[];
  const id = product.id;
  const cantidad = product.countproduct
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const url = "https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/ingresar?idProducto="+id+"&idCliente="+idClient+"&cantidad="+cantidad
    const res = await axios.post(url,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}});
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){
      console.log(error)
  }
  return mensaje;
}

export const getProductCart = async () =>{
  debugger
  const mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res = await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/consultar?idCliente="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}});
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){
      console.log(error)
  }
  return mensaje  ;
}


export const deleteProductCart = async (idProducto) =>{
  debugger
  const mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res = await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/eliminar?idProducto="+idProducto+"&idCliente="+idClient,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}});
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){
    console.log(error)
  }
  return mensaje
}


export const AllListProductActive = async () =>{
  const mensaje = [];
  debugger
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/listarActivos",{},{headers: {'Content-Type': 'application/json'}})
   return res.data
  }catch(error){
    console.log(error)
  }
}

export const AllListProductVendedor = async () =>{
  const mensaje = [];
  debugger
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/listarPorVendedor?idVendedor="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
   return res.data
  }catch(error){
    console.log(error)
  }
}


export const AllListProduct = async () =>{
  const mensaje = [];
  debugger
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/listarTodos",{},{headers: {'Content-Type': 'application/json'}})
   return res.data
  }catch(error){
    console.log(error)
  }
}


export const VendedorRegistro = async (datos,formValues) =>{
  debugger
  var mensaje = [];
  const token = sessionStorage.getItem('token')
 /* try{
    const datosheader = await getHeader();
    const idClient = datosheader[0];
    const datosend = {
      "idUsr": idClient,
      "nombreComercial": datos.nombreComercial,
      "habilitaEnvio" :  datos.envios,
      "direcciones" :  formValues
    } 
  const JSONdatosend = JSON.stringify(datosend);
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/vendedor/registrarVendedor",JSONdatosend, {headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}}
    );
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
  }catch(error){
      console.log(error)
  }*/
  mensaje[0] = 'Vendedor registrado';
  mensaje[1] = 'reee';
  return mensaje;
}


export const agregarDireccion = async (datos) =>{
  debugger
  var mensaje = [];
  var arraydir = [];
  arraydir.push(datos)

  const token = sessionStorage.getItem('token')
  try{
    const datosheader = await getHeader();
    const idClient = datosheader[0];
    const datosend = {
      "idUsuario": idClient,
      "direcciones": arraydir,
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/altadireccion", JSONdatosend,  {headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
    return mensaje
  }catch(error){
    console.log(error)
  }
}

export const deleteProductVendedor = async (idProducto) =>{
  debugger
  var mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res = await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/baja?idProducto="+idProducto+"&idVendedor="+idClient,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}});
    return mensaje[0]=res.data.mensaje;
  }catch(error){
    console.log(error)
  }
}

export const totalizarcompra = async () =>{
  debugger
  const mensaje = '';
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/totalizar?idCliente="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
   return res.data.mensaje
  }catch(error){
    console.log(error)
  }
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

export const confirmarCompra = async (method) =>{
  debugger
  const hoy = formatDate(new Date())
  
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const datosend = {
      "idCliente": idClient,
      "fecha": hoy,
      "metodo": method,
      "referenciaExterna" : "99999"
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/confirmarCompra", JSONdatosend, {headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    /*mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;*/
  }catch(error){
    console.log(error)
  }
}

export const listproductpending = async ()  =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/pendientesDeElegirEntrega?idC="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch{
    console.log(console.error())
  }
}

export const methodsend = async (datos,idDir) =>{
  var mensaje=[];
  const token = sessionStorage.getItem('token')
  try{
    debugger
    for (const element of datos) {
      const url="https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/asignarMetodoEntrega?idCompra="+element.idCompra+"&tipoEntrega="+element.tipoEntrega+"&idDireccion="+idDir;
      const res =  await axios.post(url,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
    }
    return mensaje
  }catch{
    console.log(console.error())
  }
}

export const getDireccion = async () =>{
  var mensaje=[];
  debugger
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/consultarDirecciones?idCliente="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    //mensaje[0] = res.data.mensaje;
    return res.data.objeto;
  }catch{
    console.log(console.error())
  }
}

export const searchproduct = async (search) =>{
  try{
    debugger
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/buscarPorNombre?nombre="+search,{},{
      params: {
        nombre : search,
      }
    },{headers: {'Content-Type': 'application/json'}})
    //mensaje[0] = res.data.mensaje;
    return res.data.objeto;
  }catch(error){
    console.log(error)
  }
}


export const filterCategory = async(category) =>{
  try{
    debugger
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/listarPorCategoria?categoria="+category,{},{
      params: {
        categoria : category,
      }
    },{headers: {'Content-Type': 'application/json'}})
    //mensaje[0] = res.data.mensaje;
    return res.data.objeto;
  }catch(error){
    console.log(error)
  }
}

export const listproductpendingSeller = async () =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/venta/listarVentasSinHorarioEntrega?idVendedor="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}


export const getHeader = async () =>{
  var mensaje = [];
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/priv/getHeader",{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.idUser;
    mensaje[1] = res.data.rol;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const getImageProduct = (image) =>{
  debugger
  let imagenret =''
  storage
  .ref("images")
  .child(image)
  .getDownloadURL()
  .then(url => {
    debugger
     console.log(url)
  });
    return imagenret
}

export const setFechaentrega = async(fecdes,fechas,id) =>{
  let mensaje = ''
  debugger
  const token = sessionStorage.getItem('token')
  const fecdesG = fecdes.split('T')
  fecdes = fecdesG[0]+' '+fecdesG[1]+':00';

  const fechasG = fechas.split('T')
  fechas = fechasG[0]+' '+fechasG[1]+':00';
  const datosend = {
    "idCompra": id,
    "fechaHoraDesde": fecdes,
    "fechaHoraHasta": fechas,
  }
  const JSONdatosend = JSON.stringify(datosend);
  try{
    const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/venta/setearEntrega",JSONdatosend,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
   debugger
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }

}

export const listSellerRquest = async () =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/administrador/getPendientes",{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const sellerEnable = async(idVendedor,aprobado) =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/administrador/cambiarEstadoPendientes?idVendedor="+idVendedor+"&aprobado="+aprobado,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const getListpendingshopping = async() =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/listarComprasEntregaPendiente?idCliente="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const confirmpendingshopping = async (idCompra) =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/confirmarCompraRecibida?idCompra="+idCompra,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}


export const listshoppinghistory = async () =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/listarComprasCliente?idCliente="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const searchproducthistory = async(search) =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/buscarComprasCliente?idCliente="+idClient+"&nombreProducto="+search,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const searchproductseller = async(search) =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/buscarPorNombreYVendedor?nombre="+search+"&idVendedor="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
} 

export const startclaim = async (id,reclamo) =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datosend = {
      "idCompra": id,
      "descripcion": reclamo
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/reclamo/iniciarReclamo",JSONdatosend,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}


export const recuperarContraseña = async (mail) =>{
  let mensaje = ''
  try{
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/recuperarPass?correo="+mail,{},{headers: {'Content-Type': 'application/json'}})
    mensaje = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}


export const listclaim = async () =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/reclamo/obtenerReclamos?idVendedor="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const sendClaim = async (id,metodo,mensajerec='',monto='') =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    if(metodo==1){
      const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/reclamo/gestionReclamo?idCompra="+id+"&opcion=1&mensaje="+mensajerec,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
      mensaje[0] = res.data.mensaje;
      mensaje[1] = res.data.objeto
    }
    else if(metodo == 2){
      const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/reclamo/gestionReclamo?idCompra="+id+"&opcion=2",{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
      mensaje[0] = res.data.mensaje;
      mensaje[1] = res.data.objeto
    }
    else if(metodo == 3){
      const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/reclamo/gestionReclamo?idCompra="+id+"&opcion=3",{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
      mensaje[0] = res.data.mensaje;
      mensaje[1] = res.data.objeto
    }
    else{
      const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/reclamo/gestionReclamo?idCompra="+id+"&opcion=3&monto="+monto,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
      mensaje[0] = res.data.mensaje;
      mensaje[1] = res.data.objeto
    }
    return mensaje
  }catch(error){
    console.log(error)
  }
}


export const qualificationClientlist = async () =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/venta/listarVentasVendedor?idVendedor="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const qualificationClient = async (idCompra,estrellas,comentario,idCliente) =>{
  debugger
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const datosend = {
        "idCompra" : idCompra,
        "idCliente": idCliente,
        "estrellas" : estrellas,
        "comentario" :comentario
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/calificar",JSONdatosend,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const qualificationClientMod = async (idCompra,estrellas,comentario,idCliente) =>{
  debugger
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const datosend = {
        "idCompra" : idCompra,
        "idCliente": idCliente,
        "estrellas" : estrellas,
        "comentario" :comentario
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/calificar",JSONdatosend,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const qualificationClientDelete = async (idCompra,estrellas,comentario,idCliente) =>{
  debugger
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const datosend = {
        "idCompra" : idCompra,
        "idCliente": idCliente
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/eliminar",JSONdatosend,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }
}


export const qualificationSeller = async (idCompra,estrellas,comentario,idVendedor) =>{
  debugger
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const datosend = {
        "idCompra" : idCompra,
        "idVendedor": idVendedor,
        "estrellas" : estrellas,
        "comentario" :comentario
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/calificar",JSONdatosend,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }
}


export const qualificationSellerMod = async (idCompra,estrellas,comentario,idVendedor) =>{
  debugger
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const datosend = {
        "idCompra" : idCompra,
        "idVendedor": idVendedor,
        "estrellas" : estrellas,
        "comentario" :comentario
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/calificar",JSONdatosend,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const qualificationSellerDelete = async (idCompra,estrellas,comentario,idVendedor) =>{
  debugger
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const datosend = {
        "idCompra" : idCompra,
        "idVendedor": idVendedor
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/eliminar",JSONdatosend,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const qualificationAverage = async () =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/consultarPromedio?idCliente="+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}


export const userListAll = async () =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/administrador/listarTodosUsuarios",{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    debugger
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const activeUser = async (correo,rol,bloqueado) =>{
  debugger
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/administrador/habilitarDeshabilitarUsuarios?correo="+correo+"&rol="+rol+"&bloqueado="+bloqueado,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.objeto;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const createnewadmin = async (correo,pass) =>{
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/administrador/registrarAdmin?correo="+correo+"&pass="+pass,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const searchUser = async (correo) =>{
  debugger
  const mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/administrador/buscarUsuarios?correo="+correo,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const getdateUser = async () =>{
  debugger
  var mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const tipouser = datos[1];
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/get/"+idClient,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data;
    mensaje[1] = tipouser;
    return mensaje
  }catch(error){
    console.log(error)
  }
}

export const DireccionMod = async (id,direccion) =>{
  debugger
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const datosend = {
      "id" : id,
      "calle": direccion.calle,
      "numero": direccion.numero,
      "apto": direccion.apto,
      "barrio" : direccion.barrio,
      "ciudad": direccion.ciudad,
      "departamento": direccion.departamento,
      "principal": direccion.principal
  
    }
    const JSONdatosend = JSON.stringify(datosend);
    const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/modificarDireccion",JSONdatosend,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const DireccionDel = async (idDir) =>{
  debugger
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/eliminarDireccion?idDireccion="+idDir,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const editPerfile = async (datos,fechanac) =>{
  debugger
  let mensaje = ''
  let fechaG = fechanac+'T14:45:15';
  const datosend = {
    "id" : datos.id,  
    "documento": datos.documento,
    "nombre": datos.nombre,
    "apellido": datos.apellido,
    "fechaNacimiento": fechaG,

  }
  const JSONdatosend = JSON.stringify(datosend);
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/modificarDatos",JSONdatosend,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const cuentaDelete = async () =>{
  debugger
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/priv/eliminarCuenta?idUsuario="+idClient,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.mensaje;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const habilitarEnviosVendedor = async (habilitado) =>{
  debugger
  let mensaje = ''
  const token = sessionStorage.getItem('token')
  try{
    const datos = await getHeader();
    const idClient = datos[0];
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/vendedor/cambiarEstadoEnvios?idVendedor="+idClient+"&habilitado="+habilitado,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.objeto;
   return mensaje
  }catch(error){
    console.log(error)
  }
}

export const balancelist = async (fecini,fecfin,montoHasta,montoDesde,categoria) =>{
  debugger
  var mensaje = '';
  const token = sessionStorage.getItem('token')
  try{
    const feciniG = fecini != "" ? "&fechaDesde="+fecini : '';
    const fecfinG = fecfin != "" ? "&fechaHasta="+fecfin : '';
    const montoHastaG = montoHasta !="" ? "&montoHasta="+montoHasta : '';
    const montoDesdeG = montoDesde !="" ? "&montoDesde="+montoDesde : '';
    const categoriaG = categoria !="" ? "&categoria="+categoria: '';
    const datos = await getHeader();
    const idClient = datos[0];
    const url="https://tecnoinf-proyecto-grupo1.herokuapp.com/api/venta/balance?idVendedor="+idClient+feciniG+fecfinG+montoHastaG+montoDesdeG+categoriaG
    const res =  await axios.get(url,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje = res.data.objeto;
    return mensaje
  }catch(error){
    console.log(error)
  }
}

export const comprasEstado = async () =>{
  debugger
  var mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/estadistica/productosPorCategoria",{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
    return mensaje
  }catch(error){
    console.log(error)
  }
}

export const tipoUsuario = async () =>{
  debugger
  var mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/estadistica/tipoUsuarios",{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
    return mensaje
  }catch(error){
    console.log(error)
  }
}

export const comprasFecha = async (fecini,fecfin) =>{
  debugger
  var mensaje = []
  const token = sessionStorage.getItem('token')
  const feciniG = fecini != "" ? "&fechaDesde="+fecini : '';
  const fecfinG = fecfin != "" ? "&fechaHasta="+fecfin : '';
  try{
    const res =  await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/estadistica/comprasPorDia?"+feciniG+fecfinG,{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
    return mensaje
  }catch(error){
    console.log(error)
  }
}

export const deleteUser = async (idUser, rol) =>{
  debugger
  var mensaje = []
  const token = sessionStorage.getItem('token')
  try{
    const res =  await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/administrador/eliminarCuentaUsuario?idUsuario="+idUser+"&rol="+rol,{},{headers: {'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`}})
    mensaje[0] = res.data.mensaje;
    mensaje[1] = res.data.objeto;
    return mensaje
  }catch(error){
    console.log(error)
  }

}
