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
  ActivityIndicator,Alert, TextInput, TouchableOpacity, Image, 
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import statusLogin from '../service/SesionLogin';
import ErrorNoLogedPage from './ErrorNoLogedPage';
import { asignarMetodoEntrega, consultaDirecciones, listarComprasPendientesDeAsignarEntrega } from '../service/serviceUser';



const PendientesEntrega = ({ navigation }) => {
////////////////////////////////////////////////////////////////////////

useEffect(() => {
  getTokenStorage()
  getStorage()
 }, []);
////////////////////////////////////////////////////////////////////////
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


  //const [idUsuario, setIdUsuario] = React.useState('');
  var idUsuario = '';
  
  const getStorage = async () => {
    try {
      const valorGet = await AsyncStorage.getItem('IdUsuario')
      console.log('valorGet:', valorGet)
      //setIdUsuario(valorGet) 
      idUsuario= valorGet
      if(idUsuario != null){
        setShouldShowPendientes(true)
      }else{
        setShouldShowPendientes(false)
      }
      console.log('idUsuario dentro del get(prueba):', idUsuario)
    } catch(e) {
      // read error
      console.log('errorGetStorage:',e)
    }
    console.log('Done.')
  }
  ////////////////////////////////////////////////////////////////////////
  

const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataDir, setDataDir] = useState([]);
  const [busqueda, setBusqueda] = React.useState('');
  const [BtnDeshabilitado,setBtnDeshabilitado] = useState(false);
  var  respServDir = useState();
  const [shouldShowVacio,setshouldShowVacio] = useState(false);
  const [dir, setDir] = useState('');
  const [tipoEnt, settipoEnt] = useState('RETIRO');
//////////////////////////////////////////
const [shouldShowPendientes, setShouldShowPendientes] = useState(true);
const  checked = 'first'
const first = false
const second = false
const third = false
///////////////////////////////////////////
React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    datosPendientes()
  });
  return unsubscribe;
}, []);

useEffect(() => {
  datosPendientes()
  setDireccionRetiro()
 }, []);

 const datosPendientes = async () => {
   try{
     await getStorage() 
     respServ = await listarComprasPendientesDeAsignarEntrega(idUsuario,tokenUsuario); //obtiene productos del carrito
     console.log('la respuesta del back es:', respServ)
     setData(respServ);
     datosDeUsuarioDir()
     if (respServ.length > 0){
      setshouldShowVacio(true)
     }else{
      setshouldShowVacio(false)
     }
   }catch(error){
     console.log(error)
   } 
   
 }

 const datosDeUsuarioDir = async () => {
  try{
  await getStorage()
  respServDir = await consultaDirecciones(idUsuario,tokenUsuario);  
  //console.log(respServ)
  setDataDir(respServDir);
  }catch(error){ 
    console.log(error)
  } 
}


function setDireccionEnvio(){
  setBtnDeshabilitado(true)
  setDir(dataDir[0])//seteamos la primer direccion del arreglo por defecto
  settipoEnt('ENVIO')
  console.log(tipoEnt)
}
function setDireccionRetiro(){
  setBtnDeshabilitado(false)
  //setDir(dir.calle='Retiro en el local') // acá vamos a setear la dir del comercio
  setDir({
   ...dir,
      ['calle'] : 'Retiro en el local',
      ['numero'] : '',
      ['apto'] : ''
    })
  settipoEnt('RETIRO')
  console.log(tipoEnt)
}

const asignarMetodo = async (idCompra,metodoEnt)=>{
  var respMetodo=''
  if (tipoEnt==metodoEnt){
    respMetodo = await asignarMetodoEntrega(idCompra,tipoEnt,dir.id,tokenUsuario)
  }

  if (tipoEnt=='RETIRO'){
    respMetodo = await asignarMetodoEntrega(idCompra,tipoEnt,dir.id,tokenUsuario)
  }
  if(respMetodo != 'Exito'){
    Alert.alert('El vendedor no cuenta con envío, o se produjo un error')
  }else{
    Alert.alert('Metodo de entrega confirmado')
    datosPendientes()
  }
}
///////////////////////////////////////////

    
  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 30}}>
      {shouldShowPendientes ? (
      <View style={{ flex: 1, padding: 16, marginBottom: 30}}>
      <Text style={{fontSize: 15, textAlign: 'center', marginBottom: 5,}}>Seleccionar el metodo de Entrega deseado</Text>
      <View style={{justifyContent:'space-between',flexDirection: 'row' }}>
          <TouchableOpacity 
                  
                  style={[styles.cart_button,{ backgroundColor: BtnDeshabilitado ? '#007F61' : 'gray' }]}
                  accessibilityState={{disabled: BtnDeshabilitado }}
                  onPress={() => setDireccionEnvio()}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/material/24/ffffff/truck.png',
                    }}
                    style={{
                      width: 25,
                      height: 25,
                      margin: 7,
                    }}
                  />
                  <Text style={styles.text_Barra}>Envío</Text>
                </TouchableOpacity>
 
                <TouchableOpacity
                  style={[styles.cart_button,{ backgroundColor: !BtnDeshabilitado ? '#007F61' : 'gray'  }]}
                  accessibilityState={{disabled: !BtnDeshabilitado }}
                  onPress={() => setDireccionRetiro()}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/material/24/ffffff/shop.png',
                    }}
                    style={{
                      width: 25,
                      height: 25,
                      margin: 7,
                    }}
                  />
                  <Text style={styles.text_Barra}>Retiro </Text>
                </TouchableOpacity>

      </View>
          {BtnDeshabilitado ? (  
            <View>
              <FlatList 
                data={dataDir} 
                horizontal={true}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (

                  <View >
                    <TouchableOpacity style={{backgroundColor: '#ffffff', borderRadius:8, padding:3 , margin:5, borderColor: '#000000', borderWidth: 1.5,}}
                    onPress={() => setDir(item)}>
                    <Text style={styles.texto}>Direccion:  {item.calle} {item.numero}, apto.{item.apto}</Text>
                    </TouchableOpacity>
                  </View>

                )}
              />
              </View>
             ) : null} 

          {!BtnDeshabilitado ? (
         <View> 
          <Text > </Text>
          </View>
          ) : null}
      <View >
      {shouldShowVacio ? (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View style={{felxDirection: 'row', marginTop:10, borderTopWidth: 2, padding:6, borderRadius:10}}>
                  
                  <View style={{alignSelf:'flex-start',flexDirection: 'row'}}>
                    <Image key={item.id} source={{uri: 'https://i.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg'}} style={styles.image}/>
                    <View style={{paddingLeft: 10}}>
                      <Text style={{fontSize:20, paddingBottom:3, fontWeight: 'bold'}}>Articulo: {item.nombreProducto}</Text>
                      <Text style={{fontSize:17, paddingBottom:3}}>Cantidad: {item.cantidad}</Text>
                      <Text style={{fontSize:17, paddingBottom:3}}>Total: ${item.total}</Text>
                      <Text style={{fontSize:17,paddingBottom:8}}>Vendedor: faltan los datos </Text>
                      <Text style={{fontSize:17,paddingBottom:8}}>Direccion Vendedor: faltan los datos </Text>
                      <Text style={{fontSize:17, paddingBottom:3}}>Metodos disponibles de entrega: </Text>
                      <Text style={{fontSize:17, paddingBottom:3}}>{item.metodosEntrega[0].split(' ')[0]}</Text>
                      <Text style={{fontSize:17, paddingBottom:3}}>{item.metodosEntrega[1]}</Text>
                      <Text style={{fontSize:19}}>{item.descripcion}</Text>
                      <Text style={{fontSize:19}}>{}</Text>
                    </View>
                  </View>

                  <View >
                        <TouchableOpacity
                          style={styles.boton}
                          onPress={() => asignarMetodo(item.id,item.metodosEntrega[1])}>
                            <View>
                          <Text style={styles.BotonText}>Confirmar Metodo de Entrega: </Text>
                          <Text style={styles.BotonText}> {dir.calle} {dir.numero} {dir.apto} </Text>
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
            
    ) : null} 

    {!shouldShowVacio ? (
      <Text> No hay productos pendientes de Entrega</Text>
    ) : null} 

    </View>

</View>
 ) : null} 

 {!shouldShowPendientes ? (
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
boton: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 2,
    //alignSelf: 'center',
    //alignContent:'center',
    alignItems:'space-between',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  BotonText:{
    fontSize: 17,
    color: "#fff",
    alignSelf: "center",
  },
  cart_button: {
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 0,
    backgroundColor: '#000000',
    flexGrow: 1,
  },
  text_Barra:{ 
    fontSize: 15, 
    textAlign: 'left', 
    color: 'white', 
    marginTop: 5,
    marginBottom: 5, 
    paddingRight: 8
  },
  
});

export default PendientesEntrega;
