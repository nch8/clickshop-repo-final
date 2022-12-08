import React, { useState, useEffect, Component } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { registerUser } from '../service/serviceUser';

import {AppRegistry,Text, StyleSheet, View, TextInput,TouchableHighlight,Alert,
    ScrollView, ActivityIndicator } from 'react-native'

const RegistrarUsuario = ({ navigation }) => {

    const [datos, setDatos] = useState({
        nombreregistro:'',
        apellidoregistro : '',
        documentoregistro : '',
        mailregistro : '',
        contraseniaregistro : '',
        registrofechanac: '',
        calleregistro : '',
        numeroregistro : Number,
        aptoregistro : '',
        barrioregistro : '',
        ciudadregistro : '',
        departamentoegistro : ''
      });
  /////////////////////////////////////////////
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
            nombreregistro : '',
            apellidoregistro : '',
            documentoregistro : '',
            mailregistro : '',
            contraseniaregistro : '',
            registrofechanac: '',
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


      async function camposVacios(datos){//CONTROLAR QUE ATRIBUTOS PUEDEN PASAR VACIOS AL BACK-END
        if(datos.nombreregistro && datos.apellidoregistro && datos.documentoregistro && datos.mailregistro && datos.contraseniaregistro){
            setShouldShowReg(false)
            await handleregister()
            customSetTimeout()
        } else{
            Alert.alert('Existen campos vacios.')
        }
    }

//////////////////tiempo de espera a respuesta REST
  function  customSetTimeout()  {
   /* setTimeout(() => { */
        console.log('Set timeout terminado')
        console.log('respServ =', respServ)
        setShouldShowReg(true)
        if(respServ == "Exito"){
          Alert.alert('El usuario fue registrado exitosamente')
          navigation.goBack()
        }else{
            Alert.alert(respServ)
        }
   // }, 5000); //1 segundo
}
////////////////////////
    return(
        <ScrollView>
        <View style={styles.container}>
        {shouldShowReg ? (
            <View>
                <Text style={styles.titulo}>Registrar Usuario</Text>
                <TextInput
                    style={styles.input} 
                    placeholder=' Nombre'
                    value={datos.nombreregistro}
                    name= 'nombreregistro'
                    onChange={(evt) => handleChange(evt, "nombreregistro")}
                />
                <TextInput
                    style={styles.input} 
                    placeholder=' Apellido'
                    value={datos.apellidoregistro}
                    name= 'apellidoregistro'
                    onChange={(evt) => handleChange(evt, "apellidoregistro")}
                />
                <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder=' Documento'
                    value={datos.documentoregistro}
                    name= 'documentoregistro'
                    onChange={(evt) => handleChange(evt, "documentoregistro")}
                />
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
                <TextInput
                    style={styles.input}
                    placeholder=' Correo Electrónico'
                    value={datos.mailregistro}
                    name= 'mailregistro'
                    onChange={(evt) => handleChange(evt, "mailregistro")}
                />
                <TextInput
                    style={styles.input}
                    placeholder=' Contraseña'
                    secureTextEntry={true}
                    value={datos.contraseniaregistro}
                    name= 'contraseniaregistro'
                    onChange={(evt) => handleChange(evt, "contraseniaregistro")}
                />
                <Text style={styles.textFecha}>Seleccione Fecha de Nacimiento:</Text>
                
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
                    current="2020-07-13"
                    selected="2020-07-22"
                    mode="calendar"
                    minuteInterval={30}
                    style={{ borderRadius: 10 }}  
                    onDateChange={(registrofechanac) => {setDatos({...datos, registrofechanac})}}
                />

                
                <TouchableHighlight 
                    style={styles.boton}
                    onPress={() => camposVacios(datos)}
                >
                    <Text style={styles.BotonText}>Registrar</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                    style={styles.boton}
                    onPress={() => navigation.goBack()} // ir para atrás en el stack
                >
                    <Text style={styles.BotonText}>Cancelar Registro</Text>
                </TouchableHighlight>

            </View>
            ) : null} 

            {!shouldShowReg ? (
              <View>
              <Text style={styles.titulo}>Registrar Usuario</Text>
              <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', }}>
                 <Text style={styles.textFecha}>Registrando Usuario</Text>
                 <ActivityIndicator size="large" color="#007f61" />
              </View>
              </View>
              ) : null}
        </View>
        </ScrollView>
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
    textFecha:{
        textAlign: 'left',
        fontSize:20,
        marginBottom: 15,
        color: '#5E5D5D'
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
    inputNum2:{
        height: 40,
        fontSize:19,
        borderColor: '#ccc',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 20,
        borderRadius: 5,
        flexGrow:1
    }
});

export default RegistrarUsuario;