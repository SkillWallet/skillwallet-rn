import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Polyline } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Tokens() {
    const navigation = useNavigation();
    const [token,setToken] = useState(null);
    const [profileInfo, setProfile] = useState({"pastCommunities":[{"name":"DiTo #1","address":"0x15a783406848Eb80b558A6A56E46b8e63151De8b"}],
    "skills":[{"name":"Architecture","value":9},{"name":"Smart Contracts","value":8},{"name":"Backend","value":10}],
    "currentCommunity":{"address":"0x15a783406848Eb80b558A6A56E46b8e63151De8b","members":2,"name":"DiTo #1","description":"For researchers & web3, open-source teams, that innovate in a liberal fashion - for a more sustainable, meritocratic world.","scarcityScore":0},
    "imageUrl":"https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-avatar-icon-png-image_4017288.jpg","nickname":"migrenaa","diToCredits":2060});
    const tokens = {
        "tokens": [
            {
                "name": "HSPACE",
                "balance": 3.2
            },
            {
                "name": "EXP",
                "balance": 4.2
            }
        ]
    }
    const getProfile = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@profileInfo')
          console.log(jsonValue,"JSON");
          setProfile(JSON.parse(jsonValue));
          return jsonValue != null ? JSON.parse(jsonValue) : null;
          
        } catch(e) {
          // error reading value
        }
      }
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@token')
          console.log(jsonValue);
          setToken(jsonValue);
          return jsonValue != null ? JSON.parse(jsonValue) : null;
          
        } catch(e) {
          // error reading value
        }
      }

      useEffect(() => {
        getData();
        getProfile();
      }, [profileInfo]);

      const tokensList = tokens.tokens.map((data) => {
        return (
          <View style={styles.past}>
                  <View style={{flexDirection:'row', display:'flex'}}>
                      <Image source={require('../assets/ethereum.png')} style={{height:20, width:20}}></Image>
                    <Text style={styles.currentText}>   {data.name}</Text>
                    <View style={styles.pastRight}>
                      <Text style={styles.currentTextRight}>{data.balance}</Text>
                    </View>
                    
                  </View>
                </View>
        )});

        
    if(token!=null){
    return (
        <View style={styles.container}>
            <Icon name="menu" type="ionicons" color="#FFF" style={styles.menu}></Icon>
            <View style={{height:'100%'}}>
              <ScrollView>
                <View style={styles.col}>
                        <Image source={{uri:profileInfo.imageUrl}} style={styles.avatar}></Image>
                        <Text style={styles.text}>{profileInfo.nickname}</Text>
                        <View style={{flexDirection:'row', display:'flex', alignSelf:'center', marginVertical:'5%'}}>
                            <Image source={require('../assets/dito.png')} style={{height:30, width:30}}></Image>
                            <Text style={styles.text}> {profileInfo.diToCredits}</Text>
                        </View>
                
               
                        <Text style={styles.text}>DiTo Credits</Text>
                      
                </View>
                <Svg height="10" width="300" style={styles.line}>
                <Line x1="0" y1="0" x2="300" y2="0" stroke="white" strokeWidth="2" />
                </Svg>
                

                <View>{tokensList}</View>
           
           </ScrollView>

            </View>
          
        </View>
    );

}
else return( <View style={{backgroundColor:`linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(65,90,114,1) 0%, rgba(33,45,57,1) 100%)`}}><Text>Unauthorized</Text></View>);
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
        marginTop:'2.5%'
    },
    sectitle: {
      fontFamily:'AR',
      color:"#FFF",
      fontSize:22,
      textAlign:'left',
      marginTop:'2.5%',
      textDecorationLine:'underline'
  },
    text: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:25,
        textAlign:'center',
        alignSelf:'center',
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
    current: {
        borderRadius:15,
        backgroundColor:"#146EAA",
        paddingHorizontal:'5%',
        paddingVertical:'7.5%',
        elevation:3,
        marginVertical:'1%',
    },
    past: {
      borderRadius:15,
      backgroundColor:"#232e36",
      paddingHorizontal:'5%',
      paddingVertical:'7.5%',
      elevation:3,
      marginVertical:'1%',
  },
    currentRight: {
      alignContent:'flex-end',
      alignItems:'flex-end',
      alignSelf:'baseline',
      position:'absolute',
      right:10,
      top:-10
  },
  pastRight: {
    alignContent:'flex-end',
    alignItems:'flex-end',
    alignSelf:'baseline',
    position:'absolute',
    right:10,
},
    currentText:{
      fontFamily:'AR',
      fontSize:17,
      color:"#FFF",
      justifyContent:'flex-start'
    },
    currentTextRight:{
      fontFamily:'AR',
      fontSize:17,
      color:"#FFF",
      justifyContent:'flex-end',
      textAlign:'right',
      alignSelf:'flex-end',
      margin:'auto',
    },
    skillsbg: {
      backgroundColor:"#58778B",
      borderColor:"#707070",
      borderWidth:1,
      borderRadius:15,
      paddingVertical:'5%',
      paddingHorizontal:'2.5%',
    },
    skillsRight: {
      alignContent:'flex-end',
      alignItems:'flex-end',
      alignSelf:'baseline',
      position:'absolute',
      right:10,
  },
  skillTextRight:{
    fontFamily:'AR',
    fontSize:17,
    color:"#FFF",
    justifyContent:'flex-end',
    textAlign:'right',
    alignSelf:'flex-end',
    margin:'auto',
    position:'absolute',
    zIndex:2,
  },
    

});