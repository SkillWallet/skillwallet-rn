import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import * as eccryptoJS from 'eccrypto-js';



export default function Qr() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
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
     
      
    } catch(e) {
      // error reading value
    }
  }

  const getKey = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@keyPair')
      console.log(JSON.parse(jsonValue));
      setKey(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
      
    } catch(e) {
      // error reading value
    }
  }

  const _activate = async (qr) => {
    console.log(JSON.stringify(key));
    const hex = eccryptoJS.utf8ToHex(key.publicKey);
    const hashed = await eccryptoJS.keccak256(hex);
    //const signed = await eccryptoJS.sign(eccryptoJS.utf8ToBuffer(key.privateKey), eccryptoJS.utf8ToBuffer("123"));
    //console.log(eccryptoJS.bufferToHex(signed),"signed");
    //console.log(hex, "PUBLICHEX");
    const pubKeyHashed = eccryptoJS.bufferToHex(hashed);
    console.log(pubKeyHashed, "PUBLICHASHED");
    console.log(qr);
    const qrValue = JSON.parse(qr);
    fetch(`https://api.distributed.town/api/skillwallet/${qrValue.tokenId}/activate`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        "pubKey": JSON.stringify(pubKeyHashed)
    },
    })
  .then(response => response.text())
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

  const handleBarCodeScanned = e => {
    console.log(e.data,"Scanned Data");
    if(token==null){
      console.log(e.data);
      _activate(e.data);
      storeData(JSON.stringify(e.data));
    }
    else{
      //_authenticate(data);
      _activate(e.data);
      storeData(JSON.stringify(e.data));
    }
    
    
    setScanned(false);
    
  };

  

  return (
    <View style={styles.container}>

      <QRCodeScanner
        onRead={scanned ? handleBarCodeScanned : undefined }
        
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