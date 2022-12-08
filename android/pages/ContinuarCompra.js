// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useEffect, useState, useRef }  from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,Alert, TextInput, TouchableOpacity, Modal, Image
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorNoLogedPage from './ErrorNoLogedPage';
import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import {confirmarLaCompra, totalCarrito} from '../service/serviceUser'



const ContinuarCompra = ({ navigation }) => {
////////////////////////////////////////////////////////////////////////
React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
   //recargaScreen()
   TotalizarCompra()  
   //conversor()
  });
  return unsubscribe;
}, []);

useEffect(() => {
  //TotalizarCompra() 
  getTokenStorage() 
 }, []);
/////////////////////////////////TOKEN///////////////////////////////////////
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
  const TotalizarCompra = async () => {
    try{
      await getStorage() 
      const respTotal = await totalCarrito(idUsuario,tokenUsuario);
      console.log('entre a totalizar')
      if (respTotal.objeto.length > 10){
        setPagar(0)
        //pagar=0;
        setBtnDeshabilitado(true)
       
      }else{
         setPagar(respTotal.objeto)
        //pagar= respTotal.objeto
        console.log('objeto es:',respTotal.objeto)
        console.log('pagar es:',pagar)
        setPagarDolar(conversor(respTotal.objeto))
        setBtnDeshabilitado(false) 
      }
      if(respTotal.mensaje != 'Exito'){
        setMensajeStock(respTotal.objeto)
      }else{
        setMensajeStock(' ')
        
      }
      //console.log(respServ) 
    }catch(error){
      console.log(error)
    } 
    
  }

  //const [idUsuario, setIdUsuario] = React.useState('');
  var idUsuario = '';
  
  const getStorage = async () => {
    try {
      const valorGet = await AsyncStorage.getItem('IdUsuario')
      console.log('valorGet:', valorGet)
      idUsuario= valorGet
    } catch(e) {
      // read error
      console.log('errorGetStorage:',e)
    }
    console.log('Done.')
  }
  ////////////////////////////////////////////////////////////////////////
const [showGateway, setShowGateway] = useState(false);
const [prog, setProg] = useState(false);
const [progClr, setProgClr] = useState('#000');
const webviewRef = useRef();
const  [pagar,setPagar] =useState('');
const [pagarDolar, setPagarDolar]=useState('');
const [mensajeStock, setMensajeStock] = useState('');
const [BtnDeshabilitado,setBtnDeshabilitado] = useState(false);

///////////////////////////////////////////
async function onMessage2(e) {
  console.log('e  valor onmessage:',e);
  let data = e.nativeEvent.data;
  setShowGateway(false);
  console.log('data valor:',data);
  //let payment = JSON.parse(data);
  await getStorage()
  if (data=== 'COMPLETED') {
    alert('Pago completado con Exito!');
    var fecha = CurrentDate()
    const mensaje= await confirmarLaCompra(idUsuario,fecha,e.nativeEvent.target.toString(),tokenUsuario)
    if (mensaje == 'Exito al procesar el pago'){
      navigation.goBack()
      Alert.alert('Revise las compras pendientes de entrega')
      //navigation.navigate('Pendientes')
    }else{
      navigation.navigate('Second')
      Alert.alert('Algo Salió mal, comuniquese con el administrador del sistema')
    }


  } else {
    alert('El Pago fué Cancelado o finalizó con Error.');
  }
}

/////////////////////////////////////////////////////////////////
function conversor (valor){
   return (valor / 41.45).toFixed(2)
}

function CurrentDate(){
  var date = ('0'+new Date().getDate()).slice(-2);
  var month = ('0'+new Date().getMonth() + 1).slice(-2);
  var year = new Date().getFullYear();
  var hora = ('0'+ new Date().getHours()).slice(-2);
  var min = ('0'+ new Date().getMinutes()).slice(-2);
  var sec = ('0'+ new Date().getSeconds()).slice(-2);

  var fecha = year + '-' + month + '-' + date+' '+ hora + ':'  + min + ':' + sec
  return fecha
}
//////////////////////////////////////////////////////////////////


  return (
    <SafeAreaView style={{flex: 1}}>
      <View >
        <View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize:17, paddingBottom:3, paddingLeft:5,paddingTop: 10}}> Importe Total $: </Text>
            <Text style={{fontSize:17, paddingBottom:3, paddingTop: 10}}>{pagar}   </Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize:17, paddingBottom:3, paddingLeft:5}}> Cotización del dolar:  </Text>
            <Text style={{fontSize:17, paddingBottom:3}}>41.45   </Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize:17, paddingBottom:3, paddingLeft:5 }}> Importe Total uSd: </Text>
            <Text style={{fontSize:17, paddingBottom:3}}>{pagarDolar}   </Text>
          </View>
          <Text style={{}}>{mensajeStock} </Text>
        </View>
          <View >
          <TouchableOpacity
            style={[styles.boton,{ backgroundColor: BtnDeshabilitado ? 'gray' : 'black' }]}
            accessibilityState={{disabled: BtnDeshabilitado }}
            onPress={() => setShowGateway(true)}>
            <Text style={styles.BotonText}>Pagar Usando PayPal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.BotonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showGateway ? (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'fade'}
          transparent>
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{padding: 13}}
                onPress={() => setShowGateway(false)}>
                <Image
                    source={{
                      uri: 'https://img.icons8.com/material/24/000000/left.png',
                    }}
                    style={{width: 25, height: 25,margin: 7,}}
                    />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}>
                PayPal
              </Text>
              <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              ref={webviewRef}
              source={{uri: 'http://192.168.1.2:3000/?id='+pagarDolar}}
              style={{flex: 1}}
              onLoadStart={() => {
                setProg(true);
                setProgClr('#000');
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr('#00457C');
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
              onMessage={onMessage2}
            />
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin:5,
  },
  BotonText:{
    fontSize: 15,
    color: "#fff",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnCon: {
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});

export default ContinuarCompra;
