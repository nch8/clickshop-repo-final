// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import 'react-native-gesture-handler';

import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
  Alert,
} from 'react-native';
import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FirstPage from './pages/MainPage';
import CarritoPage from './pages/CarritoPage';
import ThirdPage from './pages/LogedPage';
import LoginPage from './pages/LoginPage';
import FourPage from './pages/SignINPage';
import ErrorNoLogedPage from './pages/ErrorNoLogedPage';
import HistorialPage from './pages/HistorialPage';
import AgregarDireccion from './pages/AgregarDireccion';
import ContinuarCompra from './pages/ContinuarCompra';
import EnviosPage from './pages/PendientesEntrega';
import messaging from '@react-native-firebase/messaging'


// Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';
import RegistrarUsuario from './pages/RegistrarUsuario';
import { render } from 'react-dom';
import PendientesEntrega from './pages/PendientesEntrega';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row', width: 100 }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*boton hamburguesa */}
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 40, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

function FirstScreenStack({ navigation }) {
  /*FIREBASE C Messaging
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

/////////////////////////////////////////////////*/

  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="FPage"
        component={FirstPage}
        options={{
          title: 'Productos', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('SecondPage')}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/glyph-neue/64/FFFFFF/shopping-cart.png',
                }}
                style={{ width: 40, height: 25, marginRight: 5 }}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#007f61', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function SecondScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#007f61', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
        <Stack.Screen
        name="Second"
        component={CarritoPage}
        options={{
          title: 'Carrito de Compras', //Set Header Title
        }}
      />
        <Stack.Screen
        name="ErrorNoLogedPage"
        component={ErrorNoLogedPage}
        options={{
          title: 'Error', //Set Header Title
        }}
      />
      <Stack.Screen
        name="ContinuarCompra"
        component={ContinuarCompra}
        options={{
          title: 'Resumen de compra', //Set Header Title
        }}
      />
      {/*<Stack.Screen
        name="Pendientes"
        component={PendientesEntrega}
        options={{
          title: 'Pendientes de Entrega', //Set Header Title
        }}
      />*/}
      
      
    </Stack.Navigator>
  );
}

function LoginScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="LoginPage"
      screenOptions={{
        headerShown: false,// para eliminar la barra superior
        

        headerStyle: {
          backgroundColor: '#007f61', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          title: 'Login' //Set Header Title
        }}
      />
      <Stack.Screen
        name="RegistrarUsuario"
        component={RegistrarUsuario}
        options={{
          title: 'Registrar', //Set Header Title
        }}
      />
      <Stack.Screen
        name="Four"
        component={FourPage}
        options={{
          title: 'Four', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}
function HistorialScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="HistorialPage"
      screenOptions={{
        headerShown: true,// para eliminar la barra superior
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#007f61', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
    <Stack.Screen
        name="Historial"
        component={HistorialPage}
        options={{
          title: 'Historial de compras', //Set Header Title
        }}
      />
        </Stack.Navigator>
        );
      }

      function PendientesScreenStack({ navigation }) {
        return (
          <Stack.Navigator
            initialRouteName="EnviosPage"
            screenOptions={{
              headerShown: true,// para eliminar la barra superior
              headerLeft: () => (
                <NavigationDrawerStructure navigationProps={navigation} />
              ),
              headerStyle: {
                backgroundColor: '#007f61', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}>
          <Stack.Screen
              name="Pendientes"
              component={PendientesEntrega}
              options={{
                title: 'Pendientes de Entrega', //Set Header Title
              }}
            />
             
              </Stack.Navigator>
              );
            }
     
///////////////////////// 
//function App(){

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="LoginPage" ///////ver esto acá
          ContentOptions={{
            activeTintColor: '#007f61',
            itemStyle: { marginVertical: 5 },
          }}
          drawerContent={(props) => <CustomSidebarMenu {...props} />}>
          <Drawer.Screen
            name="LoginPage"
            options={{ drawerLabel: 'Mi Cuenta', headerShown: false, }} //nombre en la opción del menú desplegable
            component={LoginScreenStack}
          />
          <Drawer.Screen
            name="FirstPage"
            options={{ drawerLabel: 'Productos', headerShown: false  }} //nombre en la opción del menú desplegable
            component={FirstScreenStack}
          />
          <Drawer.Screen
            name="SecondPage"
            options={{ drawerLabel: 'Carrito', headerShown: false }} //nombre en la opción del menú desplegable
            component={SecondScreenStack}
          />
          <Drawer.Screen
            name="PendientesPage"
            options={{ drawerLabel: 'Pendientes de entrega', headerShown: false }} //nombre en la opción del menú desplegable
            component={PendientesScreenStack}
          />
          <Drawer.Screen
            name="HistorialPage"
            options={{ drawerLabel: 'Historial de compras', headerShown: false }} //nombre en la opción del menú desplegable
            component={HistorialScreenStack}
          />
          
          
        </Drawer.Navigator>
      </NavigationContainer>
    )//finaliza return
    
  }
}

//export default App;
