import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default function Qr() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState(false);
  const [token, setToken] = useState(null);
  const [key, setKey] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getData();

  }, []);

  const storeData = async (value) => {
    try {
      const jsonValue = value;
      await AsyncStorage.setItem('@token', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@token')
      console.log(jsonValue);
      setToken(jsonValue);
      getKey();
      return jsonValue != null ? JSON.parse(jsonValue) : null;
      
    } catch(e) {
      // error reading value
    }
  }

  const getKey = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@keyPair')
      console.log(JSON.parse(jsonValue));
      setKey(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
      
    } catch(e) {
      // error reading value
    }
  }

  const _activate = async (qr) => {
    const signed = await eccryptoJS.sign(key.privateKey, qr.hash);
    console.log(signed);
    fetch('https://api.distributed.town/api/skillwallet/activate',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: signed,
    })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.message=='Skill Wallet activated successfully.'){
      alert(`Congratulations! You have successfully logged in!`);
      navigation.navigate('Profile');
    }
  });
  }
  const _authenticate = (qr) => {
    fetch('https://api.distributed.town/api/skillwallet/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: qr,
    })
.then(response => response.json())
.then(data => {
  console.log(data);
  if(data.message!=null){
  alert('Authenticated');
  }
  else{
    alert(data.error);
  }
  navigation.navigate('Profile');
});
  }

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data);
    if(token==null){
      _activate(data);
      storeData(data);
    }
    else{
      _authenticate(data);
    }
    
    
    setScanned(true);
    
  };

  

  return (
    <View style={styles.container}>

      <QRCodeScanner
        onRead={scanned ? undefined : handleBarCodeScanned}
        
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(65,90,114,1) 0%, rgba(33,45,57,1) 100%)`
    }
});