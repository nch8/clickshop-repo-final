// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Button, View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity} from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';


const ErrorNoLogedPage = ({ navigation }) => {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <View style={{ flex: 1, padding: 0, backgroundColor: '#007f61' }}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Debe iniciar Sesión para acceder a esta Funcionalidad</Text>
        
            {/*    <TouchableOpacity
                    style={styles.boton}
                    onPress={() => navigation.goBack()} // ir para atrás en el stack
                >
                    <Text style={styles.BotonText}>Iniciar Sesión</Text>
          </TouchableOpacity> */}
        </View>
        
      </View>
      
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
    margin: 50,
  },
  textStyle:{
    fontSize: 22,
    padding: 6,
    
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

export default ErrorNoLogedPage;
