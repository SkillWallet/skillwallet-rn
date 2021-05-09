import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Polyline } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';


export default function Wallet() {
    const navigation = useNavigation();
    const [token,setToken] = useState(null);
    const [profileinfo, setPersonal] = useState({
        "pastCommunities": [
            {
                "name": "DiTo #1",
                "address": "0x37fEa0266c59d935Bb375Ad094F988b1A7d6cac5"
            }
        ],
        "skills": [
            {
                "name": "Smart Contracts",
                "value": 10
            },
            {
                "name": "Backend",
                "value": 8
            },
            {
                "name": "Frontend",
                "value": 10
            }
        ],
        "currentCommunity": {
            "address": "0x37fEa0266c59d935Bb375Ad094F988b1A7d6cac5",
            "members": 1,
            "name": "DiTo #1",
            "description": "description description description",
            "scarcityScore": 0
        },
        "imageUrl": "https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-avatar-icon-png-image_4017288.jpg",
        "nickname": "migrenaa",
        "diToCredits": 2060
    });

    
      const [tokenId, setTokenID] = useState(JSON.stringify({"tokenId":10000}));

      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@token')
          console.log(jsonValue);
          setToken(jsonValue);
          setTokenID(jsonValue);
          console.log(tokenId,"TOKENID");
          getPersonal();
          
    
          
        } catch(e) {
          // error reading value
        }
      }
      const getPersonal = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('@profileInfo')
          console.log(jsonValue);
          setPersonal(JSON.parse(jsonValue));
         
          
        } catch(e) {
          // error reading value
        }
      }

   
       

  useEffect(() => {
    getData();
    
    
  }, [profileinfo])
      
    if(token!=null){
    return (
        <View style={styles.container}>
            <Icon name="menu" type="ionicons" color="#FFF" style={styles.menu}></Icon>
            <View style={{height:'100%'}}>
              <ScrollView>
                <Text style={styles.title}>SkillWallet</Text>
            
                <Image source={{uri:profileinfo.imageUrl}} style={{height:75, width:75, borderRadius:75, alignSelf:'flex-end'}}></Image>
                <Text style={styles.sectitle}>{profileinfo.nickname}</Text>
                <View style={{alignSelf:'center', marginVertical:'10%', backgroundColor:"#eff6fb", padding:'5%'}}>
                <QRCode
                    size={250}
                    value={tokenId}
                    color="#000"
                    backgroundColor="#eff6fb"
                    /></View>
                <Text style={styles.text}>{profileinfo.diToCredits} DiTo</Text>
                <Text style={styles.subtext}>Scan QR Code to verify ID</Text>
               
          </ScrollView>
            </View>
        
        </View>
    );

}
else return( <View><Text>Unauthorized</Text></View>);
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop:'10%',
        paddingHorizontal:'10%',
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
        width:'50%',
        height:'30%',
        resizeMode:'contain',
        alignSelf:'center'
    },
    title: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:30,
        textAlign:'left',
        marginTop:'2.5%',
        textDecorationLine:'underline'
    },
    sectitle: {
      fontFamily:'AB',
      color:"#FFF",
      fontSize:25,
      textAlign:'right',
      marginTop:'1.5%',
      marginRight:'5%'
  },
    text: {
        fontFamily:'AB',
        color:"#FFF",
        fontSize:22,
        textAlign:'right',
        marginRight:'5%',
        
    },
    subtext: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:18,
        textAlign:'center',
        marginTop:'15%'
        
        
    },
    line:{
        alignSelf:'center',
        marginTop:'5%',
    },
    link: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:18,
        textAlign:'center',
        alignSelf:'center',
        textDecorationStyle:'solid',
        textDecorationLine:'underline',
    },
    subtitle: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:17,
        textAlign:'center',
        marginTop:'50%',
        width:'40%',
        alignSelf:'center'
    },
    menu: {
        alignSelf:'flex-start',
    },
    basic: {
        flexDirection:'row',
        display:'flex',
        width:'90%',
        alignSelf:'center',
        marginTop:'10%',
    },
    col: {
        flexDirection:'column'
    },
    colright: {
        flexDirection:'column',
        justifyContent:'flex-end',
        alignContent:'flex-end',
        alignSelf:'flex-end',
        marginLeft:'20%'
    },
    avatar: {
        borderRadius:100,
        height:75,
        width:75,
        alignSelf:'center'
    },
    box: {
        backgroundColor:'#FFF',
        paddingVertical:'2.5%',
        alignSelf:'center',
        width:'70%',
        borderWidth:2,
        borderColor:'#000',
        marginBottom:'5%',
    },
    boxText: {
        textAlign:'center',
        fontFamily:'AB'
    },
    round: {
        backgroundColor:'#53847B',
        fontSize:30,
        color:"#FFF",
        alignSelf:'center',
        textAlign:'center',
        textAlignVertical:'center',
        width:75,
        height:75,
        borderRadius:100,
        marginTop:'5%',
        marginBottom:'5%',
        fontFamily:'AB'
    }
    
    

});