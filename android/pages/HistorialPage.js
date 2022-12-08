// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useEffect, useState }  from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,Alert, TextInput, TouchableOpacity, Image, Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import statusLogin from '../service/SesionLogin';
import ErrorNoLogedPage from './ErrorNoLogedPage';
import {eliminarCalificacion, iniciarReclamo, listarComprasClienteHistorial} from '../service/serviceUser';
import {buscarComprasDelCliente, listarComprasEntregaPendiente, confirmarCompraRecibida, modificarCalificacion, ingresarCalificacion } from '../service/serviceUser';

import { Rating } from 'react-native-ratings';

const HistorialPage = ({ navigation }) => {
////////////////////////////////////////////////////////////////////////
React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    //recargaScreen()
    getStorage()
    confirmarEntrega()
  });
  return unsubscribe;
}, []);

useEffect(() => {
  getTokenStorage()
  confirmarEntrega()
}, []);
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
  var idUsuario = '';
  
  const getStorage = async () => {
    try {
      const valorGet = await AsyncStorage.getItem('IdUsuario')
      console.log('valorGet:', valorGet)
      idUsuario= valorGet
      if(idUsuario != null){
        setShouldShowHistorial(true)
      }else{
        setShouldShowHistorial(false)
      }
    } catch(e) {
      // read error
      console.log('errorGetStorage:',e)
    }
    console.log('Done.')
  }

//////////////////////////TOKEN ////////////////////////////////
const getTokenStorage = async () => {
  try {
    const valorToken = await AsyncStorage.getItem('tokenUsuario')
    console.log('valorToken:', valorToken)
    tokenUsuario= valorToken
  } catch(e) {
    // read error
    console.log('errorGetStorage:',e)
  }
  console.log('Done.')
}

////////////////////////////////////////////////////////////////////////
var  respServ = useState();
var  respServConfirma = useState();
var  respServHisto = useState();
var  respServReclamo = useState();

const [shouldShowHistorial, setShouldShowHistorial] = useState(true);
const [isLoading, setLoading] = useState(true);
const [BtnDeshabilitado,setBtnDeshabilitado] = useState(true);
const [data, setData] = useState([]);
const [datos, setDatos] = useState({busqueda : ''});// busqueda de productos por nombre
const [showModalCalif, setShowModalCalif] = useState(false);
const [showModalReclamo, setShowModalReclamo] = useState(false);
const [showActivityGuardarReclamo, setShowActivityGuardarReclamo] = useState(false);
////////////////////////////////CONFIRMAR ENTREGA
async function confirmarEntrega(){
  try{
    setBtnDeshabilitado(false)
    setLoading(true);
    await getStorage() 
    respServ = await listarComprasEntregaPendiente (idUsuario,tokenUsuario); 
    setData(respServ);
  }catch(error){
    console.log(error)
  }finally {
    setLoading(false);
  } 
 
}

async function ConfirmarRecibirProducto(idCompra){
  try{
    respServConfirma = await confirmarCompraRecibida (idCompra,tokenUsuario); 
    if (respServConfirma=='Exito'){
      Alert.alert('Confirmación de Compra Recibida')
      confirmarEntrega()
    }else{
      Alert.alert('Ocurrió un error al confirmar la Compra Recibida')
    }
  }catch(error){
    console.log(error)
  } 
}
///////////////////////////////MIS COMPRAS
async function misCompras(){
  try{
    setBtnDeshabilitado(true)
    setLoading(true);
    await getStorage()
    await getTokenStorage() 
    respServHisto = await listarComprasClienteHistorial (idUsuario,tokenUsuario); 
    setData(respServHisto);
  }catch(error){
    console.log(error)
  }finally {
    setLoading(false);
  }
}

function handleChange(evt, name) {
  const { text } = evt.nativeEvent;
  setDatos({
  ...datos,
    [name] : text
  })
}

const handleregister = async () => {
  await getStorage() 
  await getTokenStorage()
  try{
    respServ = await buscarComprasDelCliente(idUsuario, datos.busqueda, tokenUsuario);  
    setData(respServ)    
    
  }catch(error){
    console.log(error)
  }
}

function califVendedor(idC,idV,califVen){
  setIdCompra(idC)
  setIdVendedor(idV)
  if (califVen!='Sin calificar'){
    setCalifVen(califVen)
  }else{
    setCalifVen(' ')
  }
  console.log('idC',idC)
  setShowModalCalif(!showModalCalif);
}

function ratingCompleted(valorR) {
  setRating(valorR)
  //console.log('el valor del rating es:',rating)
}
const [idCompra,setIdCompra]= useState('')
const [idVendedor,setIdVendedor]= useState('')
const [rating,setRating]=  useState('3')
const [califVen,setCalifVen]=  useState('')
const [comentario, setComentario] = useState({
  comentario : '',
  reclamo : '',
});
var  respCalif = useState();
var respServElim= useState();



async function guardarCalificacion(){
  console.log('id compra:',idCompra)
  console.log('id vendedor:',idVendedor)
  console.log('rating',rating)
  console.log('comentario',comentario.comentario)
  try{
    await getStorage() 
    if (califVen!= ' '){
      Alert.alert('Esta Compra ya fue calificada, se sobrescribirá con la nueva caificación')
      console.log('El vendedor tiene calificiacion')
      respCalif = await modificarCalificacion (idCompra,comentario.comentario,idVendedor,rating,tokenUsuario); 
      misCompras()
    }else{
      Alert.alert( 'se agregó la calificación')
      console.log('El vendedor no tiene calificiacion')
      respCalif = await ingresarCalificacion (idCompra,comentario.comentario,idVendedor,rating,tokenUsuario);
      misCompras()
    }
    if(respCalif!='Exito'){
      Alert.alert('Error al calificar al vendedor, intentelo nuevamente')
    }

    
  }catch(error){
    
    console.log(error)
  } 
  setShowModalCalif(!showModalCalif);
}

function handleChangeComentario(evt, name) {
  const { text } = evt.nativeEvent;
  setComentario({
  ...comentario,
    [name] : text
  })
}
//
function iniciarReclamoVendedor(idCompra){
  setIdCompra(idCompra)
  setShowModalReclamo(!showModalReclamo);
}

async function guardarReclamo(){
  try{
    setShowActivityGuardarReclamo(true) 
    respServReclamo = await iniciarReclamo(idCompra, comentario.reclamo, tokenUsuario);
    if  (respServReclamo.mensaje=='Exito'){
      Alert.alert('Reclamo para el producto: '+respServReclamo.objeto.infoCompra.nombreProducto,'Iniciado correctamente, el vendedor se comunicará a la brevedad')
      setShowModalReclamo(false)
    }else{
      Alert.alert(respServReclamo.mensaje)
      setShowModalReclamo(false)
    }
  }catch(error){
    console.log(error)
  }finally{
    setShowActivityGuardarReclamo(false) 
  }
}


async function eliminarCalifRegistrada(idCompra,idVendedor){
  try{
    respServElim = await eliminarCalificacion(idCompra, idVendedor,tokenUsuario);  
    if  (respServElim=='Exito'){
      Alert.alert('La calificación fue eliminada')
      misCompras()
    }else{
      Alert.alert('Se produjo un error, vuelva a intentarlo')
      misCompras()
    }
  }catch(error){
    console.log(error)
  }
}
////////////////////////////////////////////////
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {shouldShowHistorial ? (
      <View style={{ flex: 1, padding: 16, paddingBottom: 180}}>
        
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={showModalCalif}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          {/*All views of Modal*/}
          {/*Animation can be slide, slide, none*/}
          <View style={styles.modal}>
            <Text style={{fontSize:20, marginTop: 20}}>Calificar al Vendedor</Text>
              
              <View style={{flexDirection: 'row',margin:30}}>
               
                <Rating
                  type='custom'
                  ratingColor='#EEF151'
                  ratingBackgroundColor='#c8c7c8'
                  ratingCount={5}
                  imageSize={30}
                  onFinishRating={ratingCompleted}
                  style={{ paddingVertical: 10 }}
                />
             </View>
             
             <View style={{marginBottom: 20}}>
              <TextInput
                style={{borderWidth:1, width:200}}
                placeholder=' Ingrese aquí su comentario'
                value={comentario}
                name= 'comentario'
                onChange={(evt) => handleChangeComentario(evt,"comentario")}
                multiline= {true}
                />
             </View>
             
             <View> 
              <TouchableOpacity 
                  style={styles.botonModal}
                  onPress={() => {guardarCalificacion()}}
              >
                  <Text style={styles.BotonTextModal}>"Calificar"</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                  style={styles.botonModal}
                  onPress={() => {setShowModalCalif(false)}}
              >
                  <Text style={styles.BotonTextModal}>"Cancelar"</Text>
              </TouchableOpacity>
            </View>
           </View>
        </Modal>
        
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={showModalReclamo}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          {/*All views of Modal*/}
          {/*Animation can be slide, slide, none*/}
          <View style={styles.modal}>
            <Text style={{fontSize:20, marginTop: 20}}>Iniciar Reclamo</Text>
             
             <View style={{marginBottom: 20}}>
              <TextInput
                style={{borderWidth:1, width:200}}
                placeholder=' Ingrese aquí su reclamo'
                value={comentario}
                name= 'reclamo'
                onChange={(evt) => handleChangeComentario(evt,"reclamo")}
                multiline= {true}
                />
             </View>
             <View> 
             {showActivityGuardarReclamo ? <ActivityIndicator size="large" color="#007f61" /> : ( 
                <View> 
                <TouchableOpacity 
                style={styles.botonModal}
                onPress={() => {guardarReclamo()}}
            >
                <Text style={styles.BotonTextModal}>Guardar Reclamo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.botonModal}
                onPress={() => {setShowModalReclamo(false)}}
            >
                <Text style={styles.BotonTextModal}>"Cancelar"</Text>
            </TouchableOpacity>
            </View>
             )}

            </View>
           </View>
          
        </Modal>

      <View style={{justifyContent:'space-between',flexDirection: 'row'}}>
          <TouchableOpacity  
                  style={[styles.cart_button,{ backgroundColor: BtnDeshabilitado ? '#007F61' : 'gray' }]}
                  accessibilityState={{disabled: BtnDeshabilitado }}
                  onPress={() => misCompras()}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/material/24/ffffff/shopping-bag--v1.png',
                    }}
                    style={{
                      width: 25,
                      height: 25,
                      margin: 7,
                    }}
                  />
                  <Text style={styles.text_Barra}>Mis compras      </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.cart_button,{ backgroundColor: !BtnDeshabilitado ? '#007F61' : 'gray'  }]}
                  accessibilityState={{disabled: !BtnDeshabilitado }}
                  onPress={() => confirmarEntrega()}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/material/24/ffffff/verified-account--v1.png',
                    }}
                    style={{
                      width: 25,
                      height: 25,
                      margin: 7,
                    }}
                  />
                  <Text style={styles.text_Barra}>Confirmar entrega</Text>
                </TouchableOpacity>
      </View>
        <View>
            {BtnDeshabilitado ? (  
             <View> 
              <View style ={{flexDirection: 'row'}}>
              <TextInput
                    style={styles.input} 
                    placeholder='  Buscar Compras por nombre de Producto'
                    value={datos.busqueda}
                    name= 'busqueda'
                    onChange={(evt) => handleChange(evt, "busqueda")}
                />
                  <TouchableOpacity
                        style={styles.cart_button}
                        onPress={() => handleregister()}>
                        <Image
                          source={{
                            uri: 'https://img.icons8.com/material/24/FFFFFF/search.png',
                          }}
                          style={{
                            width: 25,
                            height: 25,
                            margin: 7,
                          }}
                        />
                      </TouchableOpacity>
                </View>
               <View>
               {isLoading ? <ActivityIndicator size="large" color="#007f61" /> : (
                    <FlatList         //////////////////// MIS COMPRAS HISTORIAL 
                      data={data}
                      keyExtractor={({ id }, index) => id}
                      renderItem={({ item }) => (
                        <View style={{felxDirection: 'row', marginTop:10, borderTopWidth: 2, padding:6, borderRadius:10}}>
                  
                        <View style={{alignSelf:'flex-start',flexDirection: 'row'}}>
                          <Image key={item.id} source={{uri: 'https://i.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg'}} style={styles.image}/>
                          <View style={{paddingLeft: 10}}>
                              <Text style={{fontSize:20, paddingBottom:3}}>Articulo: {item.nombreProducto}</Text>
                              <Text style={{fontSize:19,paddingBottom:8}}>Cantidad: {item.cantidad} </Text>
                              <Text style={{fontSize:19,paddingBottom:8}}>Fecha: {item.fecha.split('T')[0]} </Text>
                              <View style={{flexDirection:'row', alignContent:'space-between'}}>
                                  <View style={{alignSelf:'flex-start',flexDirection: 'row'}}>
                                    <Text style={{fontSize:19,paddingBottom:8}}>Calificación: {item.calificacionVen.estrellas} </Text>
                                    </View>
                                  <View>
                                    <TouchableOpacity
                                          style={{}}
                                          onPress={() => eliminarCalifRegistrada(item.id,item.producto.idVendedor)}>
                                          <Image
                                            source={{
                                              uri: 'https://img.icons8.com/material/24/000000/waste--v1.png',
                                            }}
                                            style={{
                                              width: 25,
                                              height: 25,
                                              margin: 1,
                                            }}
                                          />
                                    </TouchableOpacity>
                                    </View>
                              </View>
                                </View>
                              </View>
                          
                          <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                  style={styles.botonMisC}
                                  onPress={() => califVendedor(item.id,item.producto.idVendedor,item.calificacionVen.estrellas)}>
                                    <View>
                                  <Text style={styles.BotonText}>Calificar Vendedor</Text>
                                  </View>
                                  
                          
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.botonMisC}
                          onPress={() => iniciarReclamoVendedor(item.id)}>
                            <View>
                          <Text style={styles.BotonText}>Iniciar un Reclamo</Text>
                          </View>
                        </TouchableOpacity>
                  </View>
                    </View>
                  )}
                  
                />
               )}
            </View>
           </View>
                  ) : null} 

                {!BtnDeshabilitado ? (  //////////////////// CONFIRMAR ENREGA Pendientes recibir
              <View>
              <View>
                <Text style={styles.text}>Sus compras se listarán una vez sean confirmados por el vendedor</Text>       
              </View>
              {isLoading ? <ActivityIndicator size="large" color="#007f61" /> : (
              <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View style={{felxDirection: 'row', marginTop:10, borderTopWidth: 2, padding:6, borderRadius:10}}>
                  
                        <View style={{alignSelf:'flex-start',flexDirection: 'row'}}>
                          <Image key={item.id} source={{uri: 'https://i.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg'}} style={styles.image}/>
                          <View style={{paddingLeft: 10}}>
                            <Text style={{fontSize:20, paddingBottom:3}}>Articulo: {item.nombreProducto}</Text>
                            <Text style={{fontSize:19,paddingBottom:8}}>Cantidad: {item.cantidad} </Text>
                            <Text style={{fontSize:19,paddingBottom:8}}>Fecha: {item.fecha.split('T')[0]} </Text>
                            
                          </View>
                        </View>

                  <View >
                        <TouchableOpacity
                          style={styles.boton}
                          onPress={() => ConfirmarRecibirProducto(item.id)}>
                            <View>
                          <Text style={styles.BotonText}>Recibí el producto</Text>
                          </View>
                          <Image
                            source={{
                              uri: 'https://img.icons8.com/material/24/ffffff/ok.png',
                            }}
                            style={{
                              width: 25,
                              height: 25,
                              margin: 7,
                            }}
                          />
                          
                        </TouchableOpacity>
                  </View>
                </View>
              )}
              
            />
            )}
              </View>
                ) : null}
          </View>



      </View>
     ) : null} 

     {!shouldShowHistorial ? (
       <ErrorNoLogedPage />
       ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  input: {
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    borderColor: 'black',
    margin: 3,
    borderRadius: 5,
    flexGrow:1,//crecer lo maximo 
},
cart_button: {
  margin: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  borderWidth: 0,
  backgroundColor: '#007f61',
  flexGrow: 1,
},
text_Barra:{ 
  fontSize: 15, 
  //textAlign: 'left', 
  color: 'white', 
  marginTop: 5,
  marginBottom: 5, 
  paddingRight: 8,
  
},
boton: {
  elevation: 8,
  backgroundColor: 'black',
  borderRadius: 10,
  paddingVertical: 8,
  paddingHorizontal: 8,
  //alignSelf: 'center',
  //alignContent:'center',
  alignItems:'center',
  flexDirection: 'row',
  justifyContent: 'center', 
},
BotonText:{
  fontSize: 15,
  color: "#fff",
  alignSelf: "center",
},
modal: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  margin:10,
  marginTop:0,
  //marginBottom:1,
  borderWidth: 20,
  borderRadius:50,
  borderColor:'#007f61',
  paddingBottom: 20
},
botonModal: {
  elevation: 8,
  backgroundColor: 'black',
  borderRadius: 10,
  paddingVertical: 8,
  paddingHorizontal: 80,
  marginBottom: 20,
  //alignSelf: 'center',
  //alignContent:'center',
  //alignItems:'center',
  flexDirection: 'row',
  justifyContent: 'center',
  
},
BotonTextModal:{
  fontSize: 15,
  color: "#fff",
  alignSelf: "center",
},
starIcon: {
  resizeMode: 'center',
  width: 20,
  height: 20,
  alignSelf: 'center',
},
botonMisC: {
  elevation: 8,
  backgroundColor: 'black',
  borderRadius: 10,
  paddingVertical: 8,
  paddingHorizontal: 8,
  marginRight:20,
  //alignSelf: 'center',
  //alignContent:'center',
  alignItems:'center',
  flexDirection: 'row',
  justifyContent: 'center', 
},
});

export default HistorialPage;
