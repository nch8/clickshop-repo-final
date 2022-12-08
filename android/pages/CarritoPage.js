// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useEffect, useState, useRef }  from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,Alert, TextInput, TouchableOpacity, Image, Dimensions, Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import statusLogin from '../service/SesionLogin';
import ErrorNoLogedPage from './ErrorNoLogedPage';
import {productosCarrito} from '../service/serviceUser'
import {totalCarrito} from '../service/serviceUser'
import { eliminarProducto } from '../service/serviceUser';



const CarritoPage = ({ navigation }) => {
////////////////////////////////////////////////////////////////////////
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      datosCarrito()
    });
    return unsubscribe;
  }, []);
  ////////////////////////////////////////////////////////////////////////


  //const [idUsuario, setIdUsuario] = React.useState('');

  
  const getStorage = async () => {
    try {
      const valorGet = await AsyncStorage.getItem('IdUsuario')
      console.log('valorGet:', valorGet)
      idUsuario= valorGet
      if(idUsuario != null){
        setShouldShowCarrito(true)
      }else{
        setShouldShowCarrito(false)
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
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = React.useState('');

//////////////////////////////////////////
const [shouldShowCarrito, setShouldShowCarrito] = useState(true);
var  respServ = useState();
var idUsuario = '';
const [pagar, setPagar] = useState('0');
const [mensajeStock, setMensajeStock] = useState('');
const [BtnDeshabilitado,setBtnDeshabilitado] = useState(false);
const [totalcarrito, setTotalCarrito] = useState('');
var contFor=0;
///////////////////////////////////////////
  useEffect(() => {
   datosCarrito()
   getTokenStorage()
  }, []);

  const datosCarrito = async () => {
    try{
      await getStorage() 
      respServ = await productosCarrito(idUsuario,tokenUsuario); //obtiene productos del carrito
      setData(respServ.objeto);
      var total = 0;
      for(contFor=0; contFor < respServ.objeto.length; contFor++){ //calcula el total del carrito
        total= Number(total)+Number(respServ.objeto[contFor].total)
      } 
      console.log('TOTAL DEL CARRITO', total)
      setTotalCarrito(total)
      //const respTotal = await totalCarrito(idUsuario);
      if (total == 0){//if (respTotal.objeto.length > 10){
        //setPagar('0')
        setBtnDeshabilitado(true)
        setTotalCarrito('0')
      }else{
        //setPagar(respTotal.objeto)
        setBtnDeshabilitado(false) 
      }
      /*if(respTotal.mensaje != 'Exito'){
        setMensajeStock(respTotal.objeto)
      }else{
        setMensajeStock(' ')
        
      }*/
      //console.log(respServ) 
    }catch(error){
      console.log(error)
    } 
    finally {
      setLoading(false);
    }
  }

  const eliminarProd = async (idPro)=>{
    await getStorage()
    const respElim = await eliminarProducto(idPro, idUsuario, tokenUsuario)
    if(respElim != 'Exito'){
      Alert.alert('El producto no se pudo eliminar')
    }else{
      Alert.alert('Producto eliminado')
      datosCarrito()
    }
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {shouldShowCarrito ? (
      <View style={{ flex: 1, padding: 8 }}>
        <View style={{ flex: 1, padding: 12 }}>
          {isLoading ? <ActivityIndicator/> : (
          <View >
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View style={{felxDirection: 'row', marginTop:10, borderTopWidth: 2, padding:6, borderRadius:10}}>
                  
                  <View style={{alignSelf:'flex-start',flexDirection: 'row'}}>
                  <Image key={item.id} source={{ uri: item.dtProducto.imagenesUrl[0] }} style={styles.image}/>
                  
                    <View style={{paddingLeft: 10, paddingRight:145}}>
                      <Text style={{fontSize:20,fontWeight: 'bold'}}>Articulo:</Text>
                      <Text style={{fontSize:20, paddingBottom:8}}>{item.nombreProducto}</Text>
                      <Text style={{fontSize:19,fontWeight: 'bold'}}>Descripción:</Text>
                      <Text style={{fontSize:19}}>{item.descripcion}</Text>
                      
                    </View>
                  </View>

                  <View style={styles.cart_button}>
                    
                    <TouchableOpacity
                          style={styles.cart_button}
                          onPress={() => eliminarProd(item.idProducto)}>
                          <Image
                            source={{
                              uri: 'https://img.icons8.com/material/24/ffffff/shopping-basket-remove.png',
                            }}
                            style={{
                              width: 25,
                              height: 25,
                              margin: 7,
                            }}
                          />
                        </TouchableOpacity>
                        <Text style={styles.text_Precio}>{item.cantidad} uds.</Text>
                        <Text style={styles.text_Precio}>Sub-Total:   $ {item.total}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View >
      <View style={{height: 100,backgroundColor:'#C7C7C5', borderTopWidth:1}}>
        
        <View style={{paddingBottom:0,paddingTop:6,flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:23, paddingLeft:45}}>Total a pagar:  </Text>
          <Text style={{paddingRight:45,fontSize:25}}>$ {totalcarrito}</Text>
        </View>
        
        <Text style={{fontSize:13, paddingLeft:30,color:'red'}}>{mensajeStock}</Text>
        
        <View style={{flexDirection:'row', alignSelf:'center'}}>
          <TouchableOpacity 
                style={styles.boton}
                onPress={() => navigation.navigate('FirstPage')}
            >
                <Text style={styles.BotonText}>Seguir Comprando</Text>
          </TouchableOpacity>

          <TouchableOpacity 
                style={[styles.boton,{ backgroundColor: BtnDeshabilitado ? 'gray' : 'black' }]}
                onPress={() => navigation.navigate('ContinuarCompra')}
                accessibilityState={{disabled: BtnDeshabilitado }}
                
            >
                <Text style={styles.BotonText}>Continuar Compra</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      ) : null} 

      {!shouldShowCarrito ? (
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
    justifyContent: 'space-between',
    borderWidth: 0,
    backgroundColor: '#007f61',
  },
  /////
  container2: {
    flex: 1,
    marginTop:20,
    borderWidth: 1,
    borderColor: 'black'
  },   
  item: {     
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    height:150,
    width: 150,
    aspectRatio: 1,
    backgroundColor: '#EBEBEB', 
    marginBottom: 6 
  },
  text_Precio:{ 
    fontSize: 20, 
    textAlign: 'left', 
    color: 'white', 
    marginTop: 5,
    marginBottom: 5, 
    paddingRight: 8
    
  },
  boton: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin:5,
  },
  BotonText:{
    fontSize: 15,
    color: "#fff",
    alignSelf: "center",
  },
});

export default CarritoPage;
