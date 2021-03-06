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
  const [ack, setAck] = useState(false);
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
      console.log(jsonValue,"Token");
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
    
    //console.log(hex, "PUBLICHEX");
    const pubKeyHashed = eccryptoJS.bufferToHex(hashed);
    console.log(pubKeyHashed, "PUBLICHASHED");
    const pubKeyString = pubKeyHashed.toString();
    console.log(pubKeyString);
    const qrValue = JSON.parse(qr);
    const tokenValue = qrValue.tokenId
    console.log(tokenValue);
    const signed = await eccryptoJS.sign(eccryptoJS.utf8ToBuffer(key.privateKey), eccryptoJS.utf8ToBuffer(qrValue.nonce.toString()),true);
    const signedHex = eccryptoJS.bufferToHex(signed);
    const signedString = signedHex.toString();
    const body = JSON.stringify({"pubKey": pubKeyString})
    const body2 = JSON.stringify({"signature": signedString});
  
    
    fetch(`https://api.skillwallet.id/api/skillwallet/${tokenValue}/pubKey`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    })
  .then(response => {
    console.log(response.status);
    console.log(response.status==200);
    console.log(body2,"PubKeyEndpointRes");
    if(response.status==200){
      setAck(true);
    }
  })
  .then(data => {
    console.log(ack);
    if(ack==false){
    fetch(`https://api.skillwallet.id/api/skillwallet/${tokenValue}/activate`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body2
    })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.message=='Skill Wallet activated successfully.'){
      alert(`Congratulations! You have successfully logged in!`);
      storeData(JSON.stringify(qr));
      navigation.navigate('Profile');
    }
  });
    
  }});
    
  }
  const _authenticate = async (qr) => {
    const Action = {
      Activate: 0,
      Login: 1,
      CreateGig: 2,
      TakeGig: 3,
      SubmitGig: 4,
      CompleteGig: 5
    }
    if(JSON.parse(qr).tokenId){
    const qrData = JSON.parse(qr);
    console.log(JSON.parse(token),"TOKEN");
    console.log(qrData.nonce.toString());
    const signed = await eccryptoJS.sign(eccryptoJS.utf8ToBuffer(key.privateKey), eccryptoJS.utf8ToBuffer(qrData.nonce.toString()),true);
    const signedHex = eccryptoJS.bufferToHex(signed);
    const signedString = signedHex.toString();
    const body = JSON.stringify({"signature" : signedString ,"action":1});
    const tokenjson = JSON.parse(JSON.parse(token));
    console.log(body,"body");
    fetch(`https://api.skillwallet.id/api/skillwallet/${tokenjson.tokenId}/validate`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ,
    })
.then(response => {
  console.log(response.status);
  if(response.status==200){
    alert('Authenticated');
    navigation.navigate('Profile');
    }
    else{
      alert(`Something went wrong! Error code:${response.status} `);
    }
    
})
    }


    //Login Action
    else if(JSON.parse(qr).action==1){
      const qrData = JSON.parse(qr);
      console.log(qrData.nonce.toString());
      const signed = await eccryptoJS.sign(eccryptoJS.utf8ToBuffer(key.privateKey), eccryptoJS.utf8ToBuffer(qrData.nonce.toString()),true);
      const signedHex = eccryptoJS.bufferToHex(signed);
      const signedString = signedHex.toString();
      const body = JSON.stringify({"signature" : signedString ,"action":JSON.parse(qr).action});
      const tokenjson = JSON.parse(JSON.parse(token));
      console.log(body,"Action=Login");
      fetch(`https://api.skillwallet.id/api/skillwallet/${tokenjson.tokenId}/validate`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ,
    })
.then(response => {
  console.log(response.status);
  if(response.status==200){
    alert('You have successfully logged in, welcome back!');
    navigation.navigate('Profile');
    }
    else{
      alert('Something went wrong');
    }
    
})

    }



    //Accepting a gig
    else if(JSON.parse(qr).action>2){
      const qrData = JSON.parse(qr);
      console.log(qrData.nonce.toString());
      const signed = await eccryptoJS.sign(eccryptoJS.utf8ToBuffer(key.privateKey), eccryptoJS.utf8ToBuffer(qrData.nonce.toString()),true);
      const signedHex = eccryptoJS.bufferToHex(signed);
      const signedString = signedHex.toString();
      const body = JSON.stringify({"signature" : signedString ,"action":JSON.parse(qr).action,"intParams":JSON.parse(qr).intParams});
      const tokenjson = JSON.parse(JSON.parse(token));
      console.log(body,"Action=Accept Gig/Submit Gig");
      fetch(`https://api.skillwallet.id/api/skillwallet/${tokenjson.tokenId}/validate`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ,
    })
.then(response => {
  console.log(response.status);
  if(response.status==200){
    alert('Congratulations! You have taken on a new gig!');
    navigation.navigate('Profile');
    }
    else{
      alert('Something went wrong');
    }
    
})

    }
        //Creating a gig
        else if(JSON.parse(qr).action==2){
          const qrData = JSON.parse(qr);
          console.log(qrData.nonce.toString());
          const signed = await eccryptoJS.sign(eccryptoJS.utf8ToBuffer(key.privateKey), eccryptoJS.utf8ToBuffer(qrData.nonce.toString()),true);
          const signedHex = eccryptoJS.bufferToHex(signed);
          const signedString = signedHex.toString();
          const body = JSON.stringify({"signature" : signedString ,"action":2,"intParams":JSON.parse(qr).intParams, "stringParams":JSON.parse(qr).stringParams});
          const tokenjson = JSON.parse(JSON.parse(token));
          console.log(body,"Action=Create Gig");
          fetch(`https://api.skillwallet.id/api/skillwallet/${tokenjson.tokenId}/validate`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body ,
        })
    .then(response => {
      console.log(response.status);
      if(response.status==200){
        alert('Congratulations! You have created a new gig!');
        navigation.navigate('Profile');
        }
        else{
          alert('Something went wrong');
        }
        
    })
    
        }


  }

  const handleBarCodeScanned = e => {
    console.log(e.data,"Scanned Data");
    if(token==null){
      console.log(e.data);
      _activate(e.data);
      
    }
    else{
      _authenticate(e.data);
      
    }
    
    
    setScanned(false);
    
  };

  

  return (
    <View style={styles.container}>

      <QRCodeScanner
        onRead={scanned ? handleBarCodeScanned : undefined }
        showMarker={true}
        
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