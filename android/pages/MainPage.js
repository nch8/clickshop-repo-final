import React, { useRef,useState, useEffect,Component } from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,TextInput, SearchBar,ActivityIndicator, Icon, Alert, LogBox
} from 'react-native';
import {
  Dimensions,
  Pressable,
  
} from 'react-native';

import ajax from '../service/FetchData';
import Carousel from 'react-native-anchor-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BannCarousel from '../service/BannerCarousel';
import { listarActivos } from '../service/serviceUser';
import {agregarCarrito} from '../service/serviceUser';
import {buscarProductoNombre} from '../service/serviceUser';
import {buscarProductoCategoria} from '../service/serviceUser';

const {width: windowWidth} = Dimensions.get('window');

const FirstPage = ({ navigation }) => {

  var  respServ = useState();
  var  respAddCarito = useState(); 
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  var idPro;
  var idUsuario;
  var categorias = ['VIVERES','INDUMENTARIA','ELECTRODOMESTICOS','INSTRUMENTOS','LIBROS','ACCESORIOS','CALZADOS'];
  const [datos, setDatos] = useState({
    cantidad : '1',//cantidad de productos a cargar en carrito
    busqueda : '',// busqueda de productos por nombre
  });
  

  ////////////////////////////////////////////////////////////////////////
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      //datosRecibidos()
      LogBox.ignoreAllLogs();//esto espara sacar el cartel amarillo
    });
    return unsubscribe;
  }, []);
  ////////////////////////////////////////////////////////////////////////

  const getStorage = async () => {
    try {
      const valorGet = await AsyncStorage.getItem('IdUsuario')
      console.log('valorGet.', valorGet)
      idUsuario=valorGet 
    } catch(e) {
      // read error
      console.log('errorGetStorage:',e)
    }
    console.log('Done.')
  }

  const getTokenStorage = async () => {
    try {
      const valorToken = await AsyncStorage.getItem('tokenUsuario')
      tokenUsuario= valorToken
    } catch(e) {
      // read error
      console.log('errorGetStorage:',e)
    }
    console.log('Done.')
  }
  /////////////////////////////////////////////////////
  useEffect(() => {
    datosRecibidos();
    getTokenStorage();
  }, []);

  
  const datosRecibidos = async () => {
    try{
    respServ = await listarActivos();  
    console.log('RESPUESTA IMAG',respServ)
    setData(respServ);
    }catch(error){
      console.log(error)
    }
    finally {
      setLoading(false);
    }
  }

///////// CAROUSEL ////////
const ITEM_WIDTH = 0.9 * windowWidth;
const SEPARATOR_WIDTH = ((windowWidth * 0.5));

  const carouselRef = useRef(null);
  function renderItems({item, index}) {
    const {image,imagenesUrl, title, url} = item;
    return (
      <Pressable
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <Image key={item.id} source={{uri: item}} style={styles.image}/>
      </Pressable>
    );
  }

  //////HANDLER//////////
function handleChange(evt, name) {
  const { text } = evt.nativeEvent;
  setDatos({
  ...datos,
    [name] : text
  })
}

const handleregister = async () => {
  try{
    respAddCarito = await agregarCarrito(datos.cantidad, idUsuario,idPro,tokenUsuario);      
    setDatos({
      ...datos,
      cantidad : '1',
    })
  }catch(error){
    console.log(error)
  }
}
async function agregarProducto(idp, stock){
  await getStorage();
  if(idUsuario == null){
    Alert.alert('Debe iniciar sesión para agregar productos al carrito')
  }else{
    if(datos.cantidad <= 0){
      Alert.alert('La cantidad seleccionada debe ser mayor a cero')
    }else{
      if(datos.cantidad > stock){
        Alert.alert('La cantidad seleccionada debe ser menor al stock disponible ('+stock+')')
      }else{
        idPro =idp   
        await handleregister()
        if(respAddCarito == "Exito"){
          Alert.alert('El producto fue agregado con exito')
        }else{
          Alert.alert('Error' +respAddCarito)
        }
      }
    }
  }
}

async function buscarProd(prod){
  //setBusqueda(prod)
  try{
    respServ = await buscarProductoNombre(prod);
    //console.log(respServ)
    setData(respServ);
    }catch(error){
      console.log(error)
    }
}
async function buscarProdCategoria(cat){
  try{
  respServ = await buscarProductoCategoria(cat);
  //console.log(respServ)
  setData(respServ);
  }catch(error){
    console.log(error)
  }
}


///////////////////////////////////////////////////////

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <View 
            style={{
              flex: 2,
            }}>
            <View style ={{justifyContent:'center'}}>
             <View style ={{flexDirection: 'row'}}>
              <TextInput
                    style={styles.input} 
                    placeholder='  Buscar por nombre de Producto'
                    value={datos.busqueda}
                    name= 'busqueda'
                    onChange={(evt) => handleChange(evt, "busqueda")}
                />
                  <TouchableOpacity
                        style={styles.cart_button}
                        onPress={() => buscarProd(datos.busqueda)}>
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
              
              <View style={{flexDirection:'row', marginTop:2.5, marginBottom:2.5}}>
                <FlatList 
                  data={categorias} 
                  horizontal={true}
                  keyExtractor={(item, index) => index}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View>
                     <TouchableOpacity style={{backgroundColor: '#ffffff', borderRadius:8, padding:3 , margin:5, borderColor: '#000000', borderWidth: 1.5,}}
                        onPress={() => buscarProdCategoria(item)}>
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>

            </View>
            <View style={styles.container_cards} >
            {isLoading ? <ActivityIndicator size="large" color="#007f61" /> : (
              <FlatList
                removeClippedSubviews={true} 
                data={data} 
                keyExtractor={item => item.id}///////// esto soluciona el error de indice
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  
                  <View style={styles.flatview} >
                    <View style={{flexDirection:'column',justifyContent:'center'}}>
                     <Text style={styles.subtitulo}>{item.nombre}  </Text>                 
                    </View>
                    

                    <Carousel
                      keyExtractor={item => item?.id}
                      contentContainerStylestyle={[styles.containerCarousel]}
                      ref={carouselRef}
                      data={item.imagenesUrl}
                      renderItem={renderItems}
                      itemWidth={ITEM_WIDTH}
                      separatorWidth={SEPARATOR_WIDTH}
                      inActiveScale={1}
                      inActiveOpacity={1}
                      containerWidth={windowWidth}
                    />


                    <View style={{marginBottom:4,marginTop:4,marginLeft:3}}>
                        <Text style={styles.email}>CAT: {item.categoria}</Text> 
                        <Text style={styles.email}>Descripción:{item.descripcion}</Text>
                    </View>

                    <View style={styles.cart_button}>
                      <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={styles.text_Precio}> $</Text>
                        <Text style={styles.text_Precio}> {item.precio}</Text>
                      </View>
                      <Text style={styles.text_Precio}>Uds </Text>

                      <View >
                      <TextInput
                          keyboardType="numeric"
                          keyExtractor={item.idProducto} //Probar con una funcion que genere numeros random
                          style={styles.inputNum}
                          value={datos.cantidad}
                          //defaultValue= '1' No es tomado en cuenta si hay un atributo value 
                          name= 'cantidad'
                          onChange={(evt) => handleChange(evt, "cantidad")}
                      />
                      </View>
                      
                        <Text style={styles.text_Precio}> Stock:</Text>
                        <Text style={styles.text_Precio}> {item.stock}</Text>
                        
                      <TouchableOpacity
                        style={styles.cart_button}
                        onPress={() => agregarProducto(item.id, item.stock)}>
                        <Image
                          source={{
                            uri: 'https://img.icons8.com/material/24/FFFFFF/add-basket.png',
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
          </View>
          
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container_cards: {
    flex: 1,
    marginTop: 2,
    backgroundColor: '#F5FDFF', //color del fondo de los elementos del scroll
    margin: 5,
    
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 3,
    borderRadius: 10,
    borderWidth: 2,
    flex: 0.3,
    marginBottom: 6,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18,
  },
  email: {
    color: 'black',
    fontSize: 17
  },
  cart_button: {
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderWidth: 0,
    backgroundColor: '#007f61',
  },
  text_White:{ 
    fontSize: 18, 
    textAlign: 'auto', 
    color: 'white',
    margin: 5,
  },
  text_Precio:{ 
    fontSize: 18, 
    textAlign: 'left', 
    color: 'white', 
    marginTop: 5,
    marginBottom: 5, 
  },
  input: {
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderColor: 'black',
    margin: 3,
    borderRadius: 5,
    flexGrow:1,//crecer lo maximo 
    paddingLeft:5,
    backgroundColor:'#ffffff'
},
containerCarousel: {
  backgroundColor: 'white',
  alignItems: 'flex-start',
  height: 200,  //200 altura del contenedor de imagen
  width: 300, //300
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#DADEE1',
  marginLeft: windowWidth * 0.02,
  marginRight: windowWidth * 0.02,
},
carousel: {
  width: windowWidth -60,
  //height: ITEM_WIDTH + 100,
  flexGrow: 0,
  backgroundColor: 'gray',
},
item: {
  backgroundColor: 'yellow',
  height: 250,
  width: 250,
  borderRadius: 5,
  borderColor: '#EAECEE',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.18,
  shadowRadius: 1.0,
  elevation: 1,
  },
image: {
  //height:200,
  aspectRatio: 1,
  backgroundColor: '#EBEBEB',
},
inputNum:{
  height: 30,
  fontSize:19,
  backgroundColor:'#ffffff',
  borderWidth: 1.5,
  borderColor: 'black',
  marginBottom: 5,
  marginTop:5,
  marginRight:10,
  paddingLeft: 9,
  paddingRight:4,
  borderRadius: 5,
  //flexGrow:1
},
subtitulo:{

  fontSize: 20,
  alignSelf: 'center',
  marginTop: 4,
  marginBottom: 4,
  marginLeft:2,
  fontWeight: "bold",
}

});

export default FirstPage;