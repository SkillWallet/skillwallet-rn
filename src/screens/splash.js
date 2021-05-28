import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as eccryptoJS from 'eccrypto-js';













export default function Splash() {
    const navigation = useNavigation();
    const [token,setToken] = useState(null);
    const [loaded] = useFonts({
        AR: require('../assets/AR.otf'),
        AB: require('../assets/AB.otf'),
      });

    
    
    
    

   
    




    const storeData = async () => {
      const keyPair = eccryptoJS.generateKeyPair();
      try {
        const jsonValue = keyPair;
        await AsyncStorage.setItem('@keyPair',JSON.stringify(jsonValue) )
      } catch (e) {
        // saving error
      }
    }

    

    
       

    
      
  

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@token');
          if(jsonValue==null){
            setTimeout(() => {
                navigation.navigate('Welcome');
            }, 3000);

          }
          else{
            console.log(jsonValue);
            await setToken(jsonValue);
            console.log(token);
            setTimeout(() => {
                navigation.navigate('Profile');
            }, 3000);
          }

          return jsonValue != null ? JSON.parse(jsonValue) : null;
          
        } catch(e) {
          // error reading value
        }
      }

    useEffect(() => {
      storeData(keyPair);
        getData();
      });
    
    if(loaded && keyPair){
      return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo}></Image>
            <View>
                <Text style={styles.title}>SkillWallet</Text>
                <Text style={styles.subtitle}>Your Personal Gateway, 
                to the Open World.</Text>
            </View>
          
        </View>
    );

}
else{
    return(<View style={styles.container}></View>)
}
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        backgroundColor: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(65,90,114,1) 0%, rgba(33,45,57,1) 100%)`
    },
    header: {
        height: '50%',
        width: '50%',
        marginTop: '10%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    logo: {
        marginTop:'20%',
        width:'30%',
        height:'30%',
        resizeMode:'contain',
        alignSelf:'center'
    },
    title: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:35,
        textAlign:'center'
    },
    subtitle: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:17,
        textAlign:'center',
        marginTop:'50%',
        width:'40%',
        alignSelf:'center'
    }

});