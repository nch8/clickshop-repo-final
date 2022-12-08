import React, { useState, useEffect,Component } from 'react';
import { registerUser } from '../service/serviceUser';

import {Text, StyleSheet, View, TextInput,TouchableHighlight,Alert,
    ScrollView, ActivityIndicator } from 'react-native'



const AgregarDireccion = ({ navigation }) => {
//////////////TOKEN/////////////////////
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

    useEffect(() => {
        getTokenStorage()
       }, []);
//////////////////////////////////////

    const [datos, setDatos] = useState({
        idUsuario:'',
        calleregistro : '',
        numeroregistro : Number,
        aptoregistro : '',
        barrioregistro : '',
        ciudadregistro : '',
        departamentoegistro : ''
      });
  
    var  respServ = useState(); 
    const [shouldShowReg, setShouldShowReg] = useState(true); 
    const [mensaje,setMensaje] = useState('')

    function handleChange(evt, name) {
        const { text } = evt.nativeEvent;
        setDatos({
        ...datos,
          [name] : text
        })
      }

      const handleregister = async () => {
        try{
        respServ = await registerUser(datos);      
          setDatos({
            ...datos,
            idUsuario : '',
            calleregistro : '',
            numeroregistro : Number,
            aptoregistro : '',
            barrioregistro : '',
            ciudadregistro : '',
            departamentoegistro : ''
          })
        }catch(error){
          console.log(error)
        }
      }


      function camposVacios(datos){//CONTROLAR QUE ATRIBUTOS PUEDEN PASAR VACIOS AL BACK-END
        if(datos.calleregistro && datos.numeroregistro && datos.aptoregistro && datos.barrioregistro && datos.ciudadregistro && datos.departamentoegistro){
            handleregister()
            setShouldShowReg(false)
            customSetTimeout()
        } else{
            Alert.alert('Existen campos vacios.')
        }
    }

//////////////////tiempo de espera a respuesta REST
  function customSetTimeout()  {
    setTimeout(() => { //Esta tambien es un callback
        console.log('Set timeout terminado')
        console.log('respServ =', respServ)
        setShouldShowReg(true)
        if(respServ == "Exito"){
          Alert.alert('El usuario fue registrado exitosamente')//mensaje que se desvanece
        }else{
            Alert.alert(respServ)
        }
    }, 5000); //1 segundo
}
////////////////////////
    return(
    
        <View style={styles.container}>
        {shouldShowReg ? (
            <ScrollView>
            <View>
                <Text style={styles.titulo}>Agregar Dirección</Text>
                <TextInput
                    style={styles.input}
                    placeholder=' Calle'
                    value={datos.calleregistro}
                    name= 'calleregistro'
                    onChange={(evt) => handleChange(evt, "calleregistro")}
                />
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput
                    keyboardType="numeric"
                    style={styles.inputNum}
                    placeholder=' Numero de puerta'
                    value={datos.numeroregistro}
                    name= 'numeroregistro'
                    onChange={(evt) => handleChange(evt, "numeroregistro")}
                />
                <TextInput
                    keyboardType="numeric"
                    style={styles.inputNum2}
                    placeholder=' Apartamento'
                    value={datos.aptoregistro}
                    name= 'aptoregistro'
                    onChange={(evt) => handleChange(evt, "aptoregistro")}
                />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder=' Barrio'
                    value={datos.barrioregistro}
                    name= 'barrioregistro'
                    onChange={(evt) => handleChange(evt, "barrioregistro")}
                />
                <TextInput
                    style={styles.input}
                    placeholder=' Ciudad'
                    value={datos.ciudadregistro}
                    name= 'ciudadregistro'
                    onChange={(evt) => handleChange(evt, "ciudadregistro")}
                />
                <TextInput
                    style={styles.input}
                    placeholder=' Departamento'
                    value={datos.departamentoegistro}
                    name= 'departamentoegistro'
                    onChange={(evt) => handleChange(evt, "departamentoegistro")}
                />
                
                <TouchableHighlight 
                    style={styles.boton}
                    onPress={() => camposVacios(datos)}
                >
                    <Text style={styles.BotonText}>Agregar</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                    style={styles.boton}
                    onPress={() => navigation.goBack()} // ir para atrás en el stack
                >
                    <Text style={styles.BotonText}>Cancelar</Text>
                </TouchableHighlight>

            </View>
            </ScrollView>  
            ) : null} 

            {!shouldShowReg ? (
              <View>
              <Text style={styles.titulo}>Agregar Dirección</Text>
              <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', }}>
                 <Text style={styles.textFecha}>Agregndo Dirección</Text>
                 <ActivityIndicator size="large" color="#007f61" />
              </View>
              </View>
         ) : null}
        </View>
        
    );

  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 30,
        paddingLeft: 15,
        paddingRight: 15
    },
    input: {
        height: 40,
        fontSize:19,
        borderColor: '#ccc',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 20,
        borderRadius: 5
    },
    titulo:{
        textAlign: 'center',
        fontSize:25,
        marginBottom: 5,
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
});

export default AgregarDireccion;