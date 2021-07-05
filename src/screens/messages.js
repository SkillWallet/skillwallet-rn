import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Polyline } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Messages() {
    const navigation = useNavigation();
    const [token,setToken] = useState(null);
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@token');
        console.log(jsonValue);
        setToken(jsonValue);
        _getMessages(jsonValue);
        
      } catch(e) {
        // error reading value
      }
    }

    const [msgInfo , setMsgInfo] = useState({
      "messages": [
          {
              "_id": "01f4ega4zmjqbdc24p0vrxe2xk",
              "_mod": 1619689542646689800,
              "contactSkillWalletId": 2,
              "message": "Start working on your Gig - and earn DITO Credits!",
              "skillWalletId": 1,
              "title": "Your Gig has started!",
              "type": 0
          },
          {
              "_id": "01f4ega4zpdr9eqjg81n3r1zb1",
              "_mod": 1619689542648208600,
              "contactSkillWalletId": 2,
              "message": "Start working on your Gig - and earn DITO Credits!",
              "skillWalletId": 1,
              "title": "Your Gig has started!",
              "type": 0
          }
      ]
  });

  const _getMessages = (data) => {
    let t = JSON.parse(data);
    fetch(`https://api.skillwallet.id/api/skillwallet/${t.tokenId}/messages`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    setMsgInfo(data);
  });
  }

  
  useEffect(() => {
    getData();
  }, [msgInfo]);
   
  

      const msgList = msgInfo.messages.map((data) => {
        return (
          <TouchableOpacity onPress={()=>navigation.navigate('Chat',{sid:data.skillWalletId,rid:data.contactSkillWalletId})}><View style={styles.current}>
                  <View style={{flexDirection:'row', display:'flex'}}>
                    <Text style={styles.currentText}>• {data.title}</Text>
                
                    
                  </View>
                  <Text style={styles.description}>{data.message}</Text>
                 
                </View></TouchableOpacity>
        )});

        
    if(token!=null){
    return (
        <View style={styles.container}>
          <View style={{height:'100%'}}>
            <ScrollView>
            <TouchableOpacity onPress={()=>navigation.navigate('Gigs')}><Icon name="arrow-back" type="ionicons" color="#FFF" style={styles.menu}></Icon></TouchableOpacity>
            <View>
            <Text style={styles.title}>Messages</Text>
                <View>{msgList}</View>
           

            </View>
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
        fontSize:25,
        textAlign:'left',
        marginTop:'2.5%',
        textDecorationLine:'underline',
        marginBottom:'2.5%',
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
        borderRadius:20,
        backgroundColor:`linear-gradient(90deg, rgba(6,51,82,1) 0%, rgba(35,46,54,0) 71%);`,
        paddingHorizontal:'5%',
        paddingVertical:'5%',
        elevation:3,
        marginVertical:'1%',
    },
    past: {
      borderRadius:15,
      backgroundColor:"#546169",
      paddingHorizontal:'5%',
      paddingVertical:'7.5%',
      elevation:3,
      marginVertical:'2.5%',
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
      fontFamily:'AB',
      fontSize:17,
      color:"#FFF",
      justifyContent:'flex-start',
    },
    currentTextRight:{
      fontFamily:'AR',
      fontSize:17,
      color:"#000",
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
  description: {
      fontSize:16,
      fontFamily:'AR',
      color:'#FFF'
  }
    

});