// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState }  from 'react';
import {Button, Modal, Alert, View, Text,TextInput, SafeAreaView, Image,TouchableHighlight,ScrollView, StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {datosUser, eliminarCuentaPropia, eliminarDireccion, modificarDireccion} from '../service/serviceUser';
import {agregarDireccion, consultarPromedioCliente, editarPerfil} from '../service/serviceUser';
import DatePicker from 'react-native-modern-datepicker';


const ThirdPage = ({ navigation }) => {

  const [fechaSplit,setFechaSplit] = useState('');
  var idUsuario;
  const [data, setData] = useState([]);
  var  respServ = useState();
  var  respServDireccion = useState();
  var respuestaEditarDir = useState();
  const [shouldShowDirecciones, setShouldShowDireccion] = useState(true);
  const [direccion, setDireccion] = useState({
    calle: '',
    numero : Number,
    apto : '',
    barrio : '',
    ciudad : '',
    departamento : '',
    principal: false
  });
  const [showModalEditarPerfil, setShowModalEditarPerfil] = useState(false);
  const [showModalEditarDir,setShowModalEditarDir] = useState(false);
  const [idDir, setIdDir] = useState();
  const [datosEditar, setDatosEditar] = useState({
    nombreregistro: '',
    apellidoregistro : '',
    documentoregistro : '',
    contraseniaregistro : '',
    contraseniaregistroNueva : '',
    registrofechanac: ''
  });

  const setStorage = async (value) => {
    try {
      await AsyncStorage.setItem('IdUsuario', value.toString()) ///////////// VER ESTO ToSTRING
    } catch(e) {
      // save error
      console.log('errorSetStorage:',e)
    }
    console.log('Done.')
  }
  const getStorage = async () => {
    try {
      const valorGet = await AsyncStorage.getItem('IdUsuario')
      console.log('valorGet.', valorGet)
      idUsuario=valorGet
      //setIdUsuario(valorGet) 
    } catch(e) {
      // read error
      console.log('errorGetStorage:',e)
    }
    console.log('Done.')
  }
//////////////////////////////TOKEN////////////////////////////

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

const setTokenStorage = async (value) => {
  try {
    await AsyncStorage.setItem('tokenUsuario', value) 
  } catch(e) {
    // save error
    console.log('errorSetStorage:',e)
  }
  console.log('Done.')
}
  
 //////////////////////////////////////////////////////////

//////////////////////////////////
 function cerrarSesion(){
    setStorage('') // seteo el valor del storage en null
    setTokenStorage('') // seteo el valor del token en null
    RNRestart.Restart();
 }

 /*
 React.useEffect(() => {
  var  unsubscribed = navigation.addListener('focus', () => {
    califPromCliente()
  });
  return unsubscribed;
}, []);
 */


 useEffect(() => {
  datosDeUsuario();
  getTokenStorage()
  califPromCliente()
}, []);

function copiarDatosUsuario(respServ){
  setDatosEditar({
    ...datosEditar,
    nombreregistro: respServ.nombre,
    apellidoregistro : respServ.apellido,
    documentoregistro : respServ.documento,
    contraseniaregistro : null,
    contraseniaregistroNueva : null,
    registrofechanac: respServ.fechaNacimiento
    })
}

const datosDeUsuario = async () => {
  try{
  await getStorage()
  await getTokenStorage()
  respServ = await datosUser(idUsuario, tokenUsuario);  
  setData(respServ);
  setFechaSplit(respServ.fechaNacimiento.split('T')[0])
  copiarDatosUsuario(respServ)
  califPromCliente()
  }catch(error){ 
    console.log(error)
  } 
}

function setShowld(){
  console.log('ESTADO SHOWSHOW', shouldShowDirecciones)
  if(shouldShowDirecciones){
    setShouldShowDireccion(false)
  }else{
    setShouldShowDireccion(true)
    datosDeUsuario()
  }
}

function handleChange(evt, name) {
  const { text } = evt.nativeEvent;
  setDireccion({
  ...direccion,
    [name] : text
  })
}

function handleChangeEditar(evt, name) {
  const { text } = evt.nativeEvent;
  setDatosEditar({
  ...datosEditar,
    [name] : text 
  })
}
function camposVacios(datos){//CONTROLAR QUE ATRIBUTOS PUEDEN PASAR VACIOS AL BACK-END
  if(direccion.calle && direccion.numero && direccion.apto && direccion.barrio && direccion.ciudad && direccion.departamento){  
    handleregister()
  } else{
      Alert.alert('Existen campos vacios.')
  }
}
const handleregister = async () => {
  try{
  await getStorage()
  respServDireccion = await agregarDireccion(direccion,idUsuario,tokenUsuario); 
  //console.log('RESPUESTA DIRECCION', respServDireccion)     
  setDireccion({
    ...direccion,
    calle : '',
    numero : '',
    apto : '',
    barrio : '',
    ciudad : '',
    departamento : '',
  })
  if(respServDireccion == 'Se ha registrado la/s direccion/es'){
    Alert.alert('Dirección registrada con exito')
    setShowld()
  }else{
    Alert.alert(respServDireccion)
  }
  }catch(error){
    console.log(error)
  }
}
///////////////////////////
const [calificacion,setCalificion]= useState('0')
var  respCalif = useState();
var  respuestaEditar = useState();
var respEliminarDir = useState();
var respEliminacion = useState();
var resCalificacion = useState();

const califPromCliente = async () => {
  try{
  await getStorage()
  await getTokenStorage()
  resCalificacion = await consultarPromedioCliente(idUsuario, tokenUsuario); 
  setCalificion(resCalificacion)
  }catch(error){ 
    console.log(error)
  } 
}

function eliminarCuenta(){
  Alert.alert(
    "Eliminar Cuenta",
    "Está seguro que desea eliminar su cuenta? ",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => elimUser()}
    ]
  );
}

async function elimUser(){
  await getStorage()
  await getTokenStorage()
  try{
  respEliminacion = await eliminarCuentaPropia(idUsuario,tokenUsuario)
  if (respEliminacion=="Exito, se ha eliminado la cuenta de usuario"){
    Alert.alert("Exito, se ha eliminado la cuenta de usuario")
    cerrarSesion()
  }else{
    Alert.alert("Se produjo un error, vuelva a intentarlo")
  }
  }catch(error){ 
    console.log(error)
  } 
}

async function eliminarDir(idDir){
  try{
    await getTokenStorage()
    respEliminarDir = await eliminarDireccion(idDir, tokenUsuario); 
    if(respEliminarDir == 'Exito'){
      datosDeUsuario()
      Alert.alert('Direcicon eliminada')
    }else{
      Alert.alert('Se produjo un error, vuelva a intentarlo.')
    }
    }catch(error){ 
      console.log(error)
    } 
}

async function guardarEdicion(){
  await getStorage()
  await getTokenStorage()
  if(datosEditar.nombreregistro && datosEditar.apellidoregistro && datosEditar.documentoregistro){
    try{
      respuestaEditar = await editarPerfil(idUsuario,datosEditar, tokenUsuario); 
      if(respuestaEditar=='Exito'){
        datosDeUsuario()
        Alert.alert('Los cambios fueron guardados exitosamente')
        setShowModalEditarPerfil(false)
      }else{
        datosDeUsuario()
        Alert.alert('Algo salió mal, intente nuevamente')
        setShowModalEditarPerfil(false)
      }
    }catch(error){ 
        console.log(error)
    }     
  }else{
      Alert.alert('Existen campos vacios.')
  }
}
function modificarDir(idD,calleM,numeroM,apartamentoM,barrioM,ciudadM,departamentoM,principalM){
  setDireccion({
    ...direccion,
    calle : calleM,
    numero : numeroM,
    apto : apartamentoM,
    barrio : barrioM,
    ciudad : ciudadM,
    departamento : departamentoM,
    principal : principalM,
  })
  setIdDir(idD)
  setShowModalEditarDir(true)
}

async function actualizarDir(){
  await getTokenStorage()
  try{
    respuestaEditarDir = await modificarDireccion(idDir,direccion, tokenUsuario); 
    if(respuestaEditarDir =='Exito'){
      datosDeUsuario()
      Alert.alert('Direccion modificada con exito')
      setShowModalEditarDir(false)
    }else{
      datosDeUsuario()
      Alert.alert('Algo salió mal, intente nuevamente')
      setShowModalEditarDir(false)
    }
  }catch(error){ 
      console.log(error)
  } 
}
///////////////////////////

  return ( 
    <SafeAreaView style={{flex:1, backgroundColor:'#007f61'}}>
    {shouldShowDirecciones ? (
    <ScrollView>
    <View>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={showModalEditarDir}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
          {/*All views of Modal*/}
          {/*Animation can be slide, slide, none*/}
          <View style={styles.modal}>
          <ScrollView> 
            <View style={{}}>
              <Text style={styles.titulo}>Modificar Dirección</Text>
              <TextInput
                style={styles.input}
                placeholder=' Calle'
                value={direccion.calle}
                name= 'calle'
                onChange={(evt) => handleChange(evt, "calle")}
              />
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.inputNum}
                  placeholder=' Numero de puerta'
                  value={direccion.numero}
                  name= 'numero'
                  onChange={(evt) => handleChange(evt, "numero")}
                />
                <TextInput
                  keyboardType="numeric"
                  style={styles.inputNum}
                  placeholder=' Apartamento'
                  value={direccion.apto}
                  name= 'apto'
                  onChange={(evt) => handleChange(evt, "apto")}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder=' Barrio'
                value={direccion.barrio}
                name= 'barrio'
                onChange={(evt) => handleChange(evt, "barrio")}
              />
              <TextInput
                style={styles.input}
                placeholder=' Ciudad'
                value={direccion.ciudad}
                name= 'ciudad'
                onChange={(evt) => handleChange(evt, "ciudad")}
              />
              <TextInput
                style={styles.input}
                placeholder=' Departamento'
                value={direccion.departamento}
                name= 'departamento'
                onChange={(evt) => handleChange(evt, "departamento")}
              />
              
              <TouchableHighlight 
                style={styles.boton}
                onPress={() => actualizarDir()}
              >
                <Text style={styles.BotonText}>Modificar</Text>
              </TouchableHighlight>

              <TouchableHighlight 
                style={styles.boton}
                onPress={() => setShowModalEditarDir(false)} // ir para atrás en el stack
              >
                <Text style={styles.BotonText}>Cancelar</Text>
              </TouchableHighlight>

            </View>
          </ScrollView> 
           </View>
      </Modal>

    <Modal
          animationType={'slide'}
          transparent={true}
          visible={showModalEditarPerfil}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          {/*All views of Modal*/}
          {/*Animation can be slide, slide, none*/}
          <View style={styles.modal}>
            <Text style={{fontSize:20, marginTop: 20,marginBottom:5}}>Editar los Datos del Usuario </Text>
      
            <ScrollView>
             <View style={{marginBottom: 20}}>
             <TextInput
                    style={styles.input} 
                    placeholder=' Nombre'
                    value={datosEditar.nombreregistro}
                    name= 'nombreregistro'
                    onChange={(evt) => handleChangeEditar(evt, "nombreregistro")}
                />
                <TextInput
                    style={styles.input} 
                    placeholder=' Apellido'
                    value={datosEditar.apellidoregistro}
                    name= 'apellidoregistro'
                    onChange={(evt) => handleChangeEditar(evt, "apellidoregistro")}
                />
                <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder=' Documento'
                    value={datosEditar.documentoregistro}
                    name= 'documentoregistro'
                    onChange={(evt) => handleChangeEditar(evt, "documentoregistro")}
                />
                <TextInput
                    style={styles.input}
                    placeholder=' Contraseña'
                    secureTextEntry={true}
                    value={datosEditar.contraseniaregistro}
                    name= 'contraseniaregistro'
                    onChange={(evt) => handleChangeEditar(evt, "contraseniaregistro")}
                />
                <TextInput
                    style={styles.input}
                    placeholder=' Repita la Contraseña'
                    secureTextEntry={true}
                    value={datosEditar.contraseniaregistroNueva}
                    name= 'contraseniaregistroNueva'
                    onChange={(evt) => handleChangeEditar(evt, "contraseniaregistroNueva")}
                />
                <Text style={{fontSize:20, marginBottom:5}}>Seleccione Fecha de Nacimiento:</Text>
                
                <DatePicker 
                    options={{
                        backgroundColor: '#3b3b3a',
                        textHeaderColor: '#007f61',
                        textDefaultColor: '#F6E7C1',
                        selectedTextColor: '#fff',
                        mainColor: '#007f61',
                        textSecondaryColor: '#D6C7A1',
                        borderColor: 'rgba(122, 146, 165, 0.1)',
                    }}
                    current={datosEditar.registrofechanac}
                    selected={datosEditar.registrofechanac}
                    mode="calendar"
                    minuteInterval={30}
                    style={{ borderRadius: 10 }}  
                    onDateChange={(registrofechanac) => {setDatosEditar({...datosEditar, registrofechanac})}}
                />
             </View>
            </ScrollView>
             <View style={{flexDirection: 'row',justifyContent:'space-between'}}> 
              <TouchableHighlight 
                style={styles.boton}
                onPress={() => {guardarEdicion()}}
              >
                <Text style={styles.BotonText}>Guardar</Text>
              </TouchableHighlight>

              <TouchableHighlight 
                style={styles.boton}
                onPress={() => {setShowModalEditarPerfil(false)}}
              >
                <Text style={styles.BotonText}>Cancelar</Text>
              </TouchableHighlight>
            </View>
           </View>
        </Modal>

        <View>
          <Text style={styles.titulo}>Perfil de Usuario</Text>
        </View>

        <View >
          <View style={{flexDirection: "row",justifyContent:'center'}}>
            <Image
            source={ require('../assets/avatar.png') }
            style={styles.profileIcon}
            />
            <View>
              <Text style={styles.nombreUser}>{data.nombre} {data.apellido}</Text>
              <View style={{alignSelf: "center", flexDirection:"row"}}>
                <Text style={styles.califUser}>{calificacion}</Text>
                <Image
                  source={ require('../assets/star.png')}
                  style={styles.starIcon}
                />
                </View>
            </View>
          </View> 
         
          <View style={{flexDirection: "column", margin:5}}>
            <Text style={styles.subtitulo}>Datos de cuenta</Text>
            <View style={{paddingBottom:20 ,margin:10, borderWidth: 1, padding:6, borderRadius:10,backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between'}}>
              <View>
                <Text style={styles.texto}>Correo </Text>
                <Text style={{fontSize: 19,paddingBottom:6}}>{data.correo}</Text>
              </View>
              <View style={{alignSelf:'center'}}>
                        <TouchableOpacity
                              style={styles.cart_button}
                              onPress={() => eliminarCuenta()}>
                              <Image
                                source={{
                                  uri: 'https://img.icons8.com/material/24/000000/unfriend-male.png',
                                }}
                                style={{
                                  width: 30,
                                  height: 30,
                                  margin: 1,
                                }}
                              />
                        </TouchableOpacity>
                    </View>
            </View>
            <Text style={styles.subtitulo}>Datos personales</Text>
            <View style={{paddingBottom:20,margin:10, borderWidth: 1, padding:6, borderRadius:10, backgroundColor:'#ffffff',flexDirection:'row',justifyContent:'space-between'}}>
              <View>
              <Text style={styles.texto}>Nombre y Apellido:  {data.nombre} {data.apellido}</Text>
              <Text style={styles.texto}>Documento:  {data.documento}</Text>
              <Text style={styles.texto}>Fecha de nacimiento:  {fechaSplit}</Text>
              </View>
              <View style={{alignSelf:'center'}}>
                        <TouchableOpacity
                              style={styles.cart_button}
                              onPress={() => setShowModalEditarPerfil(true)}>
                              <Image
                                source={{
                                  uri: 'https://img.icons8.com/material/24/000000/writer-male.png',
                                }}
                                style={{
                                  width: 30,
                                  height: 30,
                                  margin: 1,
                                }}
                              />
                        </TouchableOpacity>
                    </View>
            </View> 
            <View style={{flexDirection:'row'}}>
              <Text style={styles.subtitulo}>Direcciones</Text>
              <TouchableHighlight 
                  style={styles.boton}
                  onPress={() => setShowld()}
              >
                  <Text style={styles.BotonText}>Agregar</Text>
              </TouchableHighlight>
              
            </View>
            <View>
              <FlatList 
                data={data.direcciones} 
                horizontal={true}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (

                  <View style={{margin:10, borderWidth: 1, padding:6, borderRadius:10,backgroundColor:'#ffffff',flexDirection:'row'}}>
                    
                    <View>
                        <Text style={styles.texto}>Direccion: {item.calle} {item.numero}, apto.{item.apto}</Text>
                        <Text style={styles.texto}>Barrio: {item.barrio}, {item.ciudad}, {item.departamento}</Text>
                    </View>
                    <View style={{alignSelf:'center'}}>
                        
                        <TouchableOpacity
                              style={styles.cart_button}
                              onPress={() => modificarDir(item.id,item.calle,item.numero,item.apto,item.barrio,item.ciudad,item.departamento, item.principal)}>
                              <Image
                                source={{
                                  uri: 'https://img.icons8.com/material/24/000000/edit--v1.png',
                                }}
                                style={{
                                  width: 25,
                                  height: 25,
                                  margin: 1,
                                }}
                              />
                        </TouchableOpacity>
                        <TouchableOpacity
                              style={styles.cart_button}
                              onPress={() => eliminarDir(item.id)}>
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
                )}
              />
            </View>
          </View>
          <View style={{ margin: 7}}>
            <TouchableHighlight 
                style={styles.boton}
                onPress={() => cerrarSesion()}  
            >
                <Text style={styles.BotonText}>Cerrar Sesión</Text>
            </TouchableHighlight>
          </View>
        </View>
        </View>
    </ScrollView>  ) : null}

      {!shouldShowDirecciones ? (
        <ScrollView> 
        <View style={styles.container}>
          <Text style={styles.titulo}>Agregar Dirección</Text>
          <TextInput
            style={styles.input}
            placeholder=' Calle'
            value={direccion.calle}
            name= 'calle'
            onChange={(evt) => handleChange(evt, "calle")}
          />
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TextInput
              keyboardType="numeric"
              style={styles.inputNum}
              placeholder=' Numero de puerta'
              value={direccion.numero}
              name= 'numero'
              onChange={(evt) => handleChange(evt, "numero")}
            />
            <TextInput
              keyboardType="numeric"
              style={styles.inputNum}
              placeholder=' Apartamento'
              value={direccion.apto}
              name= 'apto'
              onChange={(evt) => handleChange(evt, "apto")}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder=' Barrio'
            value={direccion.barrio}
            name= 'barrio'
            onChange={(evt) => handleChange(evt, "barrio")}
          />
          <TextInput
            style={styles.input}
            placeholder=' Ciudad'
            value={direccion.ciudad}
            name= 'ciudad'
            onChange={(evt) => handleChange(evt, "ciudad")}
          />
          <TextInput
            style={styles.input}
            placeholder=' Departamento'
            value={direccion.departamento}
            name= 'departamento'
            onChange={(evt) => handleChange(evt, "departamento")}
          />
          
          <TouchableHighlight 
            style={styles.boton}
            onPress={() => camposVacios(direccion)}
          >
            <Text style={styles.BotonText}>Agregar</Text>
          </TouchableHighlight>

          <TouchableHighlight 
            style={styles.boton}
            onPress={() => setShowld()} // ir para atrás en el stack
          >
            <Text style={styles.BotonText}>Cancelar</Text>
          </TouchableHighlight>

        </View>
        </ScrollView> 
        ) : null}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2, //para hacer la imagen circular
    alignSelf: 'auto',
    margin: 2
  },container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15
},
  starIcon: {
    resizeMode: 'center',
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  nombreUser:{
    fontSize: 22,
    padding: 6,
    alignSelf: 'center',
    margin: 2
  },
  califUser:{
    fontSize: 22,
    padding: 6,
    alignSelf: 'center',
    margin: 1,
  },
  titulo:{
    textAlign: 'center',
    fontSize:25,
    marginBottom: 10,
    color: '#007f61'
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
subtitulo:{
  fontSize: 20,
  padding: 4,
  alignSelf: 'flex-start',
  marginLeft: 8,
  color: '#FFFFFF',
},
texto:{
    fontSize: 17,
    margin: 1,
},
inputNum:{
  height: 40,
  fontSize:19,
  borderColor: '#ccc',
  borderWidth: 1,
  borderColor: 'black',
  marginBottom: 20,
  borderRadius: 5,
  flexGrow:1,
  marginRight:6,
},
input: {
  height: 40,
  fontSize:19,
  borderColor: '#ccc',
  borderWidth: 1,
  borderColor: 'black',
  marginBottom: 20,
  borderRadius: 5,
  paddingLeft: 5
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
});

export default ThirdPage;
