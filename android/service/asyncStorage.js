import AsyncStorage from '@react-native-async-storage/async-storage';
//////////////////////////////////////////////////////////
const [estadoLogin, setEstadoLogin] = React.useState('');

const setStorage = async (value) => {
  try {
    await AsyncStorage.setItem('LoginStatus', value)
  } catch(e) {
    // save error
  }
  console.log('Done.')
}
const getStorage = async () => {
  try {
    const valorGet = await AsyncStorage.getItem('IdUsuario')
    console.log('valorGet.', valorGet)
  } catch(e) {
    // read error
    console.log('errorGetStorage:',e)
  }
  console.log('Done.')
}
//////////////////////////////////////////////////////////



/*
const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,
  storageBackend: AsyncStorage,   // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,  // cache data in the memory. default is true.
  enableCache: true,  // if data was not found in storage or expired data was found, // the corresponding sync method will be invoked returning // the latest data.
  sync: {
    // we'll talk about the details later.
  }
});

//////////////////////// estado Logueado /no-logueado
var state = false;

module.Store = {
  
  
  getData() {
    storage.getAllDataForKey('loginState').then(ids => {
      console.log('ids:',ids);
    });
  },


  GetStatus() {
    state = this.DevolverStorage()
    console.log('getstatus:',state)
    return state;
  },

  ChangeStatus() {
    var state1 = this.getData()
    console.log('state1:', state1)
    if (state1==true){
      state1= false
    }else{
      state1=true
    }
    console.log('Change:',state1)
    storage.save({
      key: 'loginState', 
      data: {
        data: state1
      },
      expires: 1000 * 3600
    });
    
  },

 DevolverStorage (){
    storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true,
    })
    .then(ret => {
      console.log(ret.data)
    })
    .catch(err => {
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          break;
        case 'ExpiredError':
          break;
      }
     });
  }

};

if (global) {
  global.Store = module.Store;
}
*/