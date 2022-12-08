import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';


/////////////////////////////////
export const registerUser = async (datos) =>{  //va sin token
    console.log('SERVICE - Registrar Usuario')
    const fecha1 = datos.registrofechanac.replace('/','-');
    const fecha = fecha1.replace('/','-');
    var mensaje = '';
    const usuario = {
        "documento": datos.documentoregistro,
        "nombre": datos.nombreregistro,
        "apellido": datos.apellidoregistro,
        "fechaNacimiento": fecha,
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
      //console.log('JSONuser:  ',JSONuser)
    try {
        //const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/registrar",JSONuser, {headers: {'Content-Type': 'application/json'}});
        const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/auth/registrar",JSONuser, {headers: {'Content-Type': 'application/json'}});
        mensaje = res.data.mensaje;
       } catch (error) {
         console.log(error)
       }
       return mensaje;
}

export const loginUser = async (datos,tokenMobile) =>{ //va sin token, lo obtiene
  console.log('SERVICE - Login')
  var mensaje = '';
  const usuario = {
      "correo": datos.mailregistro,
      "contrasena": datos.contraseniaregistro,
      "mobileToken": tokenMobile
    }
    const JSONuser = JSON.stringify(usuario);
    console.log('/////////////////JSONuser:  ',JSONuser)
  try {
      //const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/login",JSONuser, {headers: {'Content-Type': 'application/json'}});
      const res = await axios.post("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/auth/login",JSONuser, {headers: {'Content-Type': 'application/json'}});
      mensaje = res.data;
      //console.log('mensaje Recibido:',res.data)
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const listarActivos = async () =>{ //va sin token
  console.log('SERVICE - Listar Activos')
  var mensaje = '';
  try {
    const res = await axios.get("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/listarActivos", {headers: {'Content-Type': 'application/json'}});
    mensaje = res.data.objeto;
         /////////////////////// IMAGENES CON FIREBASE
         var contFor=0;
         var contForImg=0;
   
         for(contFor=0; contFor < mensaje.length; contFor++){ // menor o menor Igual 
           if(mensaje[contFor].imagenesUrl[0] != null){
               for(contForImg=0; contForImg < mensaje[contFor].imagenesUrl.length; contForImg++){ // menor o menor Igual 
                 const uri = "/images/"
                 const aux = await storage().ref(uri + mensaje[contFor].imagenesUrl[contForImg]).getDownloadURL();
                 mensaje[contFor].imagenesUrl[contForImg]=aux
                 console.log('SALIDAAAAAAAA',aux) 
               }
           }else{
             mensaje[contFor].imagenesUrl[0] = 'https://broxtechnology.com/images/iconos/box.png'
           }
         } 
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const agregarCarrito = async (cantidad, idUsuario,idPro, tokenUsuario) =>{ //OK Token
  console.log('SERVICE - Agregar carrito')
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  const params = new URLSearchParams({idProducto:idPro, idCliente:idUsuario, cantidad:cantidad}).toString();
  try {
    ///caso con doble corchetes {} van para sustituir el body
      const res = await axios.post('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/ingresar?idProducto='+idPro+'&idCliente='+idUsuario+'&cantidad='+cantidad,{}, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.mensaje;
      //console.log('mensaje Recibido:',res.data.mensaje)
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const datosUser = async (idUser, tokenUsuario) =>{ //OK Token
  console.log('SERVICE - Datos Usuario ', idUser)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const res = await axios.get('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/get/'+idUser,{headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data;
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const productosCarrito = async (idUsuario,tokenUsuario) =>{ //OK Token
  console.log('SERVICE - Producto carrito', idUsuario)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const res = await axios.get('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/consultar?idCliente='+idUsuario, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data;
     /////////////////////// IMAGENES CON FIREBASE
     var contFor=0;

     for(contFor=0; contFor < mensaje.objeto.length; contFor++){ // menor o menor Igual 
       if(mensaje.objeto[contFor].dtProducto.imagenesUrl[0] != null){
          const uri = "/images/"
          
          const aux = await storage().ref(uri + mensaje.objeto[contFor].dtProducto.imagenesUrl[0]).getDownloadURL();
          mensaje.objeto[contFor].dtProducto.imagenesUrl[0]=aux
          
       }else{
         mensaje.objeto[contFor].dtProducto.imagenesUrl[0] = 'https://broxtechnology.com/images/iconos/box.png'
       }
     }    
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}
 
export const totalCarrito = async (idUsuario) =>{  //OK Token
  console.log('SERVICE - Total carrito', idUsuario,tokenUsuario)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const res = await axios.get('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/totalizar?idCliente='+idUsuario, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data;
      
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const eliminarProducto = async (idPro, idUser,tokenUsuario) =>{ //OK Token
  console.log('SERVICE - Eliminar Prod ')
  const params = new URLSearchParams({idProducto:idPro, idCliente:idUser}).toString();
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const res = await axios.put('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/carrito/eliminar?idProducto='+idPro+'&idCliente='+idUser,{}, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.mensaje;
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const agregarDireccion = async (direccion, idUsuario,tokenUsuario) =>{  ///OK Token
  console.log('SERVICE - Agregar Direccion')
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  var arrayDir = [direccion];
  //arrayDir.push(direccion)
  const dir = {
    "idUsuario": idUsuario,
    "direcciones": arrayDir,
  }
  const JSONuser = JSON.stringify(dir);
  //const params = new URLSearchParams({idProducto:idPro, idCliente:idUsuario, cantidad:cantidad}).toString();
  try {
      const res = await axios.post('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/altadireccion',JSONuser, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.mensaje;
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const buscarProductoNombre = async (prod) =>{ //va sin token
  console.log('SERVICE - Buscar Producto Nombre', prod)
  var mensaje = '';
  try {
      const res = await axios.get('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/buscarPorNombre?nombre='+prod, {headers: {'Content-Type': 'application/json'}});
      mensaje = res.data.objeto;
      
   /////////////////////// IMAGENES CON FIREBASE
      var contFor=0;
      var contForImg=0;

      for(contFor=0; contFor < mensaje.length; contFor++){ // menor o menor Igual 
        if(mensaje[contFor].imagenesUrl[0] != null){
            for(contForImg=0; contForImg < mensaje[contFor].imagenesUrl.length; contForImg++){ // menor o menor Igual 
              const uri = "/images/"
              const aux = await storage().ref(uri + mensaje[contFor].imagenesUrl[contForImg]).getDownloadURL();
              mensaje[contFor].imagenesUrl[contForImg]=aux
              
            }
        }else{
          mensaje[contFor].imagenesUrl[0] = 'https://broxtechnology.com/images/iconos/box.png'
        }
      }    
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const buscarProductoCategoria = async (cat) =>{ //va sin token
  console.log('SERVICE - Buscar Producto Categ', cat)
  var mensaje = '';
  try {
      const res = await axios.get('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/producto/listarPorCategoria?categoria='+cat, {headers: {'Content-Type': 'application/json'}});
      mensaje = res.data.objeto;
       /////////////////////// IMAGENES CON FIREBASE
       var contFor=0;
       var contForImg=0;
 
       for(contFor=0; contFor < mensaje.length; contFor++){ // menor o menor Igual 
         if(mensaje[contFor].imagenesUrl[0] != null){
             for(contForImg=0; contForImg < mensaje[contFor].imagenesUrl.length; contForImg++){ // menor o menor Igual 
               const uri = "/images/"
               const aux = await storage().ref(uri + mensaje[contFor].imagenesUrl[contForImg]).getDownloadURL();
               mensaje[contFor].imagenesUrl[contForImg]=aux
               
             }
         }else{
           mensaje[contFor].imagenesUrl[0] = 'https://broxtechnology.com/images/iconos/box.png'
         }
       }    
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const confirmarLaCompra = async (idCliente,fecha,referenciaExterna, tokenUsuario) =>{ //OK Token 
  console.log('SERVICE - Confirmar La Compra')
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  const compra = {
    "idCliente" : Number(idCliente),
    "fecha" : fecha,
    "metodo" : "PAYPAL",
    "referenciaExterna" : referenciaExterna
    }
    //console.log('previo a enviar:',compra)
const JSONcompra = JSON.stringify(compra);
console.log('stringuify:',JSONcompra)
  try {
      const res = await axios.post('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/confirmarCompra',JSONcompra, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.mensaje;
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const listarComprasPendientesDeAsignarEntrega = async (idCliente,tokenUsuario) =>{ /// Ok token
  console.log('SERVICE - listarComprasPendientesDeAsignarEntrega', idCliente)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const res = await axios.get('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/pendientesDeElegirEntrega?idC='+idCliente, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.objeto;
      if(res.data.metodosEntrega){

      }
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const consultaDirecciones = async (idUser,tokenUsuario) =>{ // OK Token
  console.log('SERVICE - consultaDirecciones ', idUser)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const res = await axios.get('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/consultarDirecciones?idCliente='+idUser, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.objeto;
     } catch (error) {
       console.log(error)
     } 
     return mensaje;
     
}

export const asignarMetodoEntrega = async (idCompra,tipoEntrega,idDireccion, tokenUsuario) =>{ //REvisar
  console.log('SERVICE - asignarMetodoEntrega ', idCompra,tipoEntrega,idDireccion)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const res = await axios.post('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/asignarMetodoEntrega?idCompra='+idCompra+'&tipoEntrega='+tipoEntrega+'&idDireccion='+idDireccion,{}, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.mensaje;
     } catch (error) {
       console.log(error)
     }
     return mensaje;
     
}


export const buscarComprasDelCliente = async (idCliente, nomProd, tokenUsuario) =>{ 
  console.log('SERVICE - HISTORIAL ', idCliente, nomProd)
  var mensaje = '';
  var contFor=0;
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const res = await axios.get('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/buscarComprasCliente?idCliente='+idCliente+'&nombreProducto='+nomProd, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.objeto;

      for (contFor=0;contFor < mensaje.length; contFor++){
        if (mensaje[contFor].calificacionVen==null){
          const estr={"estrellas":'Sin calificar'}
          mensaje[contFor].calificacionVen = estr
        }
      }
     } catch (error) {
       console.log(error)
     }
     return mensaje;  
}

export const listarComprasClienteHistorial = async (idCliente, tokenUsuario) =>{ 
  console.log('SERVICE - HISTORIAL LISTA ', idCliente)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  var contFor=0;
  try {
      const res = await axios.get('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/listarComprasCliente?idCliente='+idCliente, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.objeto;
      
      for (contFor=0;contFor < mensaje.length; contFor++){
        if (mensaje[contFor].calificacionVen==null){
          const estr={"estrellas":'Sin calificar'}
          mensaje[contFor].calificacionVen = estr
        }
      }
     } catch (error) {
       console.log(error)
     }
     return mensaje;  
}
//////////////////

export const listarComprasEntregaPendiente = async (idCliente, tokenUsuario) =>{ 
  console.log('SERVICE - ENT PENDIENTE ', idCliente)
  var mensaje = '';
  var contFor=0;
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  
  try {
      const res = await axios.get('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/listarComprasEntregaPendiente?idCliente='+idCliente, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.objeto;
      for (contFor=0;contFor < mensaje.length; contFor++){
        if (mensaje[contFor].metodosEntrega[0]=='ENVIO'){
          mensaje[contFor].metodosEntrega[0] = mensaje[contFor].metodosEntrega[1]
          mensaje[contFor].metodosEntrega[1] = 'ENVIO'
        }
      }
     
      } catch (error) {
       console.log(error)
     }
     return mensaje;  
}

/////////////////////////////////////////////////////////////
export const confirmarCompraRecibida = async (idCompra, tokenUsuario) =>{ 
  console.log('SERVICE - ENT PENDIENTE ', idCompra)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const res = await axios.post('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/compra/confirmarCompraRecibida?idCompra='+idCompra,{}, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.mensaje;
     } catch (error) {
       console.log(error)
     }
     return mensaje;  
}

export const recuperarPass = async (correo) =>{ 
  console.log('SERVICE - Recuperar Contraseña ', correo)
  var mensaje = '';
  try {
      const res = await axios.post('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/invitado/recuperarPass?correo='+correo, {headers: {'Content-Type': 'application/json'}});
      mensaje = res.data.mensaje;
     } catch (error) {
       console.log(error)
     }
     return mensaje;  
}

export const consultarPromedioCliente = async (idCliente, tokenUsuario) =>{ 
  console.log('SERVICE - Calificacion Cliente ', idCliente)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const res = await axios.get('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/consultarPromedio?idCliente='+idCliente, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.objeto;
      //console.log('la calificaciooooooooooooooooon',mensaje )
     } catch (error) {
       console.log(error)
     }
     return mensaje;  
}

export const ingresarCalificacion = async (idCompra,comentario,idVendedor,calif,tokenUsuario) =>{ //OK Token
  console.log('SERVICE - Modif Calif ')
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  const calific = {
    "idCompra" : idCompra,
    "idVendedor": idVendedor,
    "estrellas" : calif,
    "comentario" : comentario
    }
const JSONcalif = JSON.stringify(calific);
  try {
      const res = await axios.post('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/calificar', JSONcalif,{headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.mensaje;
     } catch (error) {
      
       console.log(error)
     }
     return mensaje;
}

export const modificarCalificacion = async (idCompra,comentario,idVendedor,calif,tokenUsuario) =>{ //OK Token
  console.log('SERVICE - Modif Calif ')
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  const calific = {
    "idCompra" : idCompra,
    "idVendedor": idVendedor,
    "estrellas" : calif,
    "comentario" : comentario
    }
    
const JSONcalif = JSON.stringify(calific);
  try {
      const res = await axios.put('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/calificar', JSONcalif,{headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.mensaje;
     } catch (error) {
       console.log(error)
     }
     return mensaje;
} 

export const iniciarReclamo = async (idCompra,reclamoDesripcion,tokenUsuario) =>{ 
  console.log('SERVICE - Reclamo ', idCompra, reclamoDesripcion)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  const reclamo = {
    "idCompra" : idCompra,
    "descripcion" : reclamoDesripcion
    }
const JSONreclamo = JSON.stringify(reclamo);
  try {
      const res = await axios.post('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/reclamo/iniciarReclamo',JSONreclamo, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data;
     } catch (error) {
       console.log(error)
     }
     
     return mensaje;  
}

export const eliminarCalificacion = async (idCompra,idVendedor,tokenUsuario) =>{ //OK Token
  console.log('SERVICE - ELIM Calif ')
  
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  const calific = {
    "idCompra" : idCompra,
    "idVendedor": idVendedor
    }
    const JSONdatosend = JSON.stringify(calific);
    try {
      //const res =  await axios.delete("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/eliminar",{headers: {'Content-Type': 'application/json' , 'Authorization': stringToken },data:{JSONdatosend}})
      const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/calificacion/eliminar", JSONdatosend, {headers: {'Content-Type': 'application/json' , 'Authorization': stringToken }}) 
      mensaje = res.data.mensaje;
      } catch (error) {
        console.log(error)
      }
      return mensaje;
} 

export const editarPerfil = async (idUsuario,datosEditar, tokenUsuario) =>{ //OK Token
  console.log('SERVICE - EDITAR Perfil ')
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];

  const fecha1 = datosEditar.registrofechanac.replace('/','-');
  const fecha = fecha1.replace('/','-');
  const datosEdit = {
    "id" : idUsuario,  
    "documento": datosEditar.documentoregistro,
    "nombre": datosEditar.nombreregistro,
    "apellido": datosEditar.apellidoregistro,
    "fechaNacimiento": fecha,
    "contrasena": datosEditar.contraseniaregistro,
    "contrasenaNueva" : datosEditar.contraseniaregistroNueva
    }

  const JSONedicion = JSON.stringify(datosEdit);
  try {
      const res = await axios.put('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/modificarDatos', JSONedicion,{headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.mensaje;
     } catch (error) {
       console.log(error)
     }
     return mensaje;
} 

export const eliminarDireccion = async (idDir, tokenUsuario) =>{ //OK Token
  console.log('SERVICE - Eliminar Direccions ', idDir)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const res = await axios.put('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/eliminarDireccion?idDireccion='+idDir,{}, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = res.data.mensaje;
     } catch (error) {
       console.log(error)
     }
     return mensaje;
}

export const eliminarCuentaPropia = async (idUser,tokenUsuario) =>{ 
  console.log('SERVICE - Eliminar cuenta propia', idUser)
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  try {
      const resElim = await axios.post('https://tecnoinf-proyecto-grupo1.herokuapp.com/api/priv/eliminarCuenta?idUsuario='+idUser,{}, {headers: {'Content-Type': 'application/json', 'Authorization': stringToken}});
      mensaje = resElim.data.mensaje;
     } catch (error) {
       console.log(error)
     }
     return mensaje;  
}

export const modificarDireccion = async (idDir,direccion, tokenUsuario) =>{ //OK Token
  console.log('SERVICE - Modificar Direccion ')
  var mensaje = '';
  var string2token= tokenUsuario.split('"');
  var stringToken= "Bearer "+ string2token[1];
  const dir = {
    "id" : idDir,
    "calle": direccion.calle,
    "numero": direccion.numero,
    "apto": direccion.apto,
    "barrio" : direccion.barrio,
    "ciudad": direccion.ciudad,
    "departamento": direccion.departamento,
    "principal": direccion.principal
    }
    const JSONdatosend = JSON.stringify(dir);
    try {
      const res =  await axios.put("https://tecnoinf-proyecto-grupo1.herokuapp.com/api/cliente/modificarDireccion", JSONdatosend, {headers: {'Content-Type': 'application/json' , 'Authorization': stringToken }}) 
      mensaje = res.data.mensaje;
      } catch (error) {
        console.log(error)
      }
      return mensaje;
} 