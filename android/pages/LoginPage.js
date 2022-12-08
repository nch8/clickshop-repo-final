import React, { useState, useEffect}  from 'react';
import { Button, View, Text, SafeAreaView, Image, TextInput, StyleSheet, Touchable, Linking, ActivityIndicator, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import messaging from '@react-native-firebase/messaging'

//import { TextInput } from 'react-native-web';
import statusLogin from '../service/SesionLogin';
import ThirdPage from './LogedPage'
import FourPage from './SignINPage';
import RNRestart from 'react-native-restart';

///////////////////////////////////////
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';
import { loginUser, recuperarPass } from '../service/serviceUser';
////////////////////////////////////////////////////
////////////////////////////////



const LoginPage = ({ navigation }) => {
  /////////////////////FIREBASE Cloud Messaging
  const [tokenMobile,setTokenMobile]=useState('')

  const requestUserPermission = async() =>{
    const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  }

  useEffect(() => {
    if(requestUserPermission()){
      //devuelve FCM token 
      messaging().getToken().then(token =>{
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',token)
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        setTokenMobile(token)
        console.log('Guardadooo',tokenMobile)
        ////llamar al service user y mandar el token del dispositivo
      });
    }else{
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!falló el status del token', authStatus);
    }

     // Check whether an initial notification is available
     messaging()
     .getInitialNotification()
     .then( async (remoteMessage) => {
       if (remoteMessage) {
         console.log(
           'Notification caused app to open from quit state:',
           remoteMessage.notification,
         );
       }
     });

     // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );  
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      Alert.alert('Notificación Recibida: ', remoteMessage.notification.body);
      console.log('EEEEEEEEEEEEEEEEEEEEEEEEEE',remoteMessage)
      console.log('ASASASASSASASASASASAS',remoteMessage.notification.body)
      
    });
  

    return unsubscribe;
  }, []);

//////////////////////////////////////////////////
 //////////////////////////////////////////////////////////
  const setStorage = async (value) => {
    try {
      await AsyncStorage.setItem('IdUsuario', value) 
    } catch(e) {
      // save error
      console.log('errorSetStorage:',e)
    }
    console.log('Done.')
  }
 
  const getStorage = async () => {
    try {
      const valorGet = await AsyncStorage.getItem('IdUsuario')
      console.log('valorGet:', valorGet)
      idUsuario= valorGet
      if(idUsuario != null){
        setShouldShow(false)
      }else{
        setShouldShow(true)
      }
    } catch(e) {
      // read error
      console.log('errorGetStorage:',e)
    }
    console.log('Done.')
  }
//////////////////////////////////////////////////////////
///////////////  Implementacion del TOKEN
const setTokenStorage = async (value) => {
  try {
    await AsyncStorage.setItem('tokenUsuario', value) 
  } catch(e) {
    // save error
    console.log('errorSetStorage:',e)
  }
  console.log('Done.')
}

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
//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////// 
  useEffect(() => { 
    getStorage()
    getTokenStorage()

   }, []);


  
 //////////////////////////////////////////////////////////
  const [shouldShow, setShouldShow] = useState(true);
  const [shouldShowLoad, setShouldShowLoad] = useState(true);
  var  respRest = useState();
  var idUsuario = '';
  const [datos, setDatos] = useState({
    mailregistro : '',
    contraseniaregistro : '',
  });


  function handleChange(evt, name) {
      const { text } = evt.nativeEvent;
      setDatos({
      ...datos,
        [name] : text
      })
    }

    const handleregister = async () => {
      try{
        console.log('TOKEN LOGIN:',tokenMobile)
        respRest = await loginUser(datos,tokenMobile); 
        setDatos({
          ...datos,
          mailregistro : '',
          contraseniaregistro : '',
        })
      }catch(error){
        console.log(error)
      }
    }

    async function camposVacios(datos){//CONTROLAR QUE ATRIBUTOS PUEDEN PASAR VACIOS AL BACK-END
      if(datos.mailregistro && datos.contraseniaregistro){
          setShouldShowLoad(false) 
          await handleregister()
          customSetTimeout()
      } else{
          Alert.alert('Existen campos vacios.')
      }
  }

  function recuperarContra(correo){
    if (correo == ''){
      Alert.alert('Debe ingresar un correo para recuperar su contraseña')
    }else{
    Alert.alert(
      "Olvidó su contraseña?",
      "Se enviará una contraseña al correo: "+correo,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => recuperarService(correo)}
      ]
    );
    }
  }
async function recuperarService(correo){
  try{
    respRest = await recuperarPass(correo); 
    Alert.alert(respRest)
  }catch(error){
    console.log(error)
  }

}
  //////////////////tiempo de espera a respuesta REST

  function  customSetTimeout()  {
    //setTimeout(() => {
        console.log('Set timeout terminado')
        console.log('respRest =', respRest.mensaje)
        setShouldShowLoad(true)
        if(respRest.mensaje == "Exito"){
          var idUser = JSON.stringify(respRest.idUser)
          var tokenUser = JSON.stringify(respRest.objeto)
          setStorage(idUser)
          setTokenStorage(tokenUser)
          setShouldShow(!shouldShow)
        }else{
            Alert.alert(respRest.mensaje)
        }
  //  }, 1000); //1 segundo
}
////////////////////////

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {shouldShow ? (
      <View style={{ flex: 1, padding: 16, backgroundColor: '#007f61' }}>
        <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', }}>
         
          <View style={styles.container}>
          <View style={{paddingLeft: 50, padding: 50}}>
          <Image
          source={ require('../assets/CSFinal-4.png') }
          style={{resizeMode: 'stretch', height: 100, width: 200}}
          />
          </View>
          {shouldShowLoad ? (
          <View style={{justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={styles.input}
              placeholder=' Correo'
              value={datos.mailregistro}
              name= 'mailregistro'
              onChange={(evt) => handleChange(evt, "mailregistro")}
            />
            <TextInput
                style={styles.input}
                placeholder=' Contraseña'
                value={datos.contraseniaregistro}
                name= 'contraseniaregistro'
                secureTextEntry={true}
                onChange={(evt) => handleChange(evt, "contraseniaregistro")}
                selectTextOnFocus={false}
            />
          
          <TouchableOpacity 
          style={styles.appButtonContainer}
          disabled={false}
          onPress={() => camposVacios(datos)}>
          <Text style={styles.appButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
            
            
          <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => navigation.navigate('FirstPage')}>
          <Text style={styles.appButtonText}>Entrar como Invitado</Text>
          </TouchableOpacity>
          
          <Text style={{color: 'blue'}} onPress={() => recuperarContra(datos.mailregistro)}> Se te olvidó la contraseña ? </Text>
          <View style={{
              flexDirection: "row",}}>
                <Text> No tienes una cuenta? </Text>
                <Text style={{color: 'blue'}} onPress={() => navigation.navigate('RegistrarUsuario')}>  Registrate aquí </Text>
 
          </View>

              {/* <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={null}>
              <Text style={styles.appButtonText}>Entrar con google</Text>
          </TouchableOpacity> */}

          </View>
          ) : null} 
          {!shouldShowLoad ? (
            <ActivityIndicator size="large" color="#007f61" />
            ) : null}
          
        </View>
            
      </View>
        
   </View>
  ) : null} 

    {!shouldShow ? (
      <ThirdPage /> 
      ) : null}
        </SafeAreaView>
        
    ); 
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  buttonBlack: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'grey',
  }, 
  appButtonContainer: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin:5,
  },
  appButtonText: {
    fontSize: 15,
    color: "#fff",
    alignSelf: "center",
  }
});



export default LoginPage;
