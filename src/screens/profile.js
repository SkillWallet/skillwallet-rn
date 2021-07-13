import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Polyline } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper';


export default function Profile() {
    const navigation = useNavigation();
    const [token,setToken] = useState(null);
    const [profileflag, setPFlag] = useState(false);
    const [profileinfo, setProfileinfo] = useState({
      "pastCommunities": [
          {
              "name": "DiTo Test",
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
          "name": "DiTo Test",
          "description": "description description description",
          "scarcityScore": 0
      },
      "imageUrl": "https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-avatar-icon-png-image_4017288.jpg",
      "nickname": "testuser",
      "diToCredits": 1000
  });
    
    const _getProfileInfo = () => {
      console.log(token,"ProfileToken");
      let t = JSON.parse(JSON.parse(token));
      console.log(t.tokenId,"t.tokenid");
      fetch(`https://api.skillwallet.id/api/skillwallet?tokenId=${t.tokenId}`)
  .then(response => response.json())
  .then(data => {
    console.log(data,"Data");
    setProfileinfo(data);
    storeData(JSON.stringify(profileinfo));
    setPFlag(true);
    
  });
    }
    
      const storeData = async (value) => {
        try {
          const jsonValue = value;
          await AsyncStorage.setItem('@profileInfo', jsonValue)
          console.log(jsonValue,"Stored");
        } catch (e) {
          // saving error
        }
      }
  
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@token')
          console.log(JSON.parse(jsonValue),"TOKEN");
          setToken(jsonValue);
          
          
        } catch(e) {
          // error reading value
        }
      }

      useEffect(() => {
        getData();
        console.log(token);
        if(token!=null && !profileflag){
          _getProfileInfo();
        }
      }, [profileinfo,token, profileflag]);

      const pastList = profileinfo.pastCommunities.map((data) => {
        return (
          <View key="address" style={styles.past}>
                  <View style={{flexDirection:'row', display:'flex'}}>
                    <Text style={styles.currentText}>{data.name}</Text>
                    <View style={styles.pastRight}>
                      <Text style={styles.currentTextRight}>PAST</Text>
                    </View>
                    
                  </View>
                </View>
        )});

        const skillList = profileinfo.skills.map((data) => {
          return (
            <View key="name">
                    <View style={{flexDirection:'row', display:'flex'}}>
                      <Text style={styles.currentText}>{data.name}</Text>
                      <View style={styles.skillsRight}>
                      <Text style={styles.skillTextRight}>{data.value}</Text>
                      <Svg height="20" width="120" style={{marginTop:0, marginRight:10}}>
                      <Polyline points={`${data.value*10},10 100,10`} stroke="grey" strokeWidth="10" strokeLinecap="round" />
                      <Polyline points={`10,10 ${data.value*10},10`} stroke="white" strokeWidth="10" strokeLinecap="round" />
                      
                      </Svg>
                        
                      </View>
                      
                    </View>
                  </View>
          )});
    if(token!=null && profileflag && profileinfo){
    return (
        <View style={styles.container}>
            <Icon name="menu" type="ionicons" color="#FFF" style={styles.menu}></Icon>
            <View style={{height:'100%'}}>
                <Text style={styles.title}>SkillWallet</Text>
                <ScrollView>
                <View style={styles.basic}>
                    <View style={styles.col}>
                        <Image source={{uri:profileinfo.imageUrl}} style={styles.avatar}></Image>
                        <Text style={styles.text}>{profileinfo.nickname}</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('Qr')}><Text style={styles.link}>Scan QR Code</Text></TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', alignSelf:'flex-end', position:'absolute', right:0}}>
                    <View style={styles.colright}>
                        <View style={{flexDirection:'row', display:'flex', alignSelf:'flex-end', justifyContent:'flex-end'}}>
                            <Image source={require('../assets/coins.png')}></Image>
                            <Text style={styles.text}> {profileinfo.diToCredits}</Text>
                        </View>
                        <Text style={styles.text}>DiTo Credits</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('Tokens')}><Text style={styles.link}>All your Tokens</Text></TouchableOpacity>
                    </View>
                    </View>
                </View>
                <Svg height="10" width="300" style={styles.line}>
                <Line x1="0" y1="0" x2="300" y2="0" stroke="white" strokeWidth="2" />
                </Svg>
                <Text style={styles.sectitle}>Your Communities</Text>
                <ScrollView>
                <View style={styles.current}>
                  <View style={{flexDirection:'row', display:'flex'}}>
                    <Text style={styles.currentText}>{profileinfo.currentCommunity.name}</Text>
                    <View style={styles.currentRight}>
                      <Text style={styles.currentTextRight}>ACTIVE</Text>
                      <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}><Text style={styles.currentTextRightLink}>Open</Text></TouchableOpacity>
                    </View>                    
                  </View>
                </View>

                <View>{pastList}</View>
                </ScrollView>

                <Text style={styles.sectitle}>Your Skills</Text>
                <View style={styles.skillsbg}>
                  <ScrollView>
                  <View>{skillList}</View>
                  </ScrollView>

                </View>
                </ScrollView>
            </View>
          
        </View>
    );

}
else return( <View style={{backgroundColor:`linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(65,90,114,1) 0%, rgba(33,45,57,1) 100%)`, height:'100%', alignContent:'center'}}><ActivityIndicator style={{marginTop:'40%'}} animating={true} color={Colors.blue800} /></View>);
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
        marginTop:'10%',
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
    },
    avatar: {
        borderRadius:100,
        height:75,
        width:75,
        alignSelf:'center'
    },
    current: {
        borderRadius:15,
        backgroundColor:"#063352",
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
    currentTextRightLink:{
      fontFamily:'AR',
      fontSize:17,
      color:"#FFF",
      justifyContent:'flex-end',
      textAlign:'right',
      alignSelf:'flex-end',
      margin:'auto',
      textDecorationLine:'underline'
    },
    skillsbg: {
      backgroundColor:"#232e36",
      borderRadius:15,
      paddingVertical:'5%',
      paddingHorizontal:'2.5%',
      marginTop:'1.5%'
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