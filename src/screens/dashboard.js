import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Polyline } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Dashboard() {
    const navigation = useNavigation();
    const [token,setToken] = useState(null);
    const [communityInfo, setComm] = useState({"pastCommunities":[{"name":"DiTo #1","address":"0x15a783406848Eb80b558A6A56E46b8e63151De8b"}],
    "skills":[{"name":"Architecture","value":9},{"name":"Smart Contracts","value":8},{"name":"Backend","value":10}],
    "currentCommunity":{"address":"0x15a783406848Eb80b558A6A56E46b8e63151De8b","members":2,"name":"DiTo #1","description":"For researchers & web3, open-source teams, that innovate in a liberal fashion - for a more sustainable, meritocratic world.","scarcityScore":0},"imageUrl":"https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-avatar-icon-png-image_4017288.jpg","nickname":"migrenaa","diToCredits":2060});
    const [healthText, setHealthText] = useState('');
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
      const getProfile = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@profileInfo')
          console.log(jsonValue, "Retrieved");
          setComm(JSON.parse(jsonValue));
          return jsonValue != null ? JSON.parse(jsonValue) : null;
          
        } catch(e) {
          // error reading value
        }
      }

      const _getHealthText = () =>{
          if(communityInfo.currentCommunity.scarcityScore>70){
              setHealthText('Looking Healthy!');
          }
      }

      useEffect(() => {
        getData();
        getProfile();
        _getHealthText();
      }, []);

      
    if(token!=null){
    return (
        <View style={styles.container}>
            <Icon name="menu" type="ionicons" color="#FFF" style={styles.menu}></Icon>
            <View style={{height:'100%'}}>
                <Text style={styles.title}>Dashboard</Text>
            
             <ScrollView>  
                <Text style={styles.sectitle}>{communityInfo.currentCommunity.name}</Text>
                <Text style={styles.text}>{communityInfo.currentCommunity.description}</Text>
                <Svg height="10" width="330" style={styles.line}>
                <Line x1="0" y1="0" x2="330" y2="0" stroke="white" strokeWidth="2" />
                </Svg>
              <View style={{marginTop:'15%'}}>
                  <TouchableOpacity onPress={()=>navigation.navigate('Wallet')}><View style={styles.box}>
                      <Text style={styles.boxText}>SkillWallet</Text>
                  </View></TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigation.navigate('Gigs')}><View style={styles.box}>
                      <Text style={styles.boxText}>Your Gigs</Text>
                  </View></TouchableOpacity>
                  <TouchableOpacity onPress={()=>navigation.navigate('Messages')}><View style={styles.box}>
                      <Text style={styles.boxText}>Messages</Text>
                  </View></TouchableOpacity>
              </View>
              </ScrollView> 
            </View>
            <View style={{marginTop:'15%'}}>
            <Text style={styles.subtext}>Community Score</Text>
            <Text style={styles.round}>{communityInfo.currentCommunity.scarcityScore}</Text>
            <Text style={styles.subtext}>{healthText}</Text>
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
        marginTop:'2.5%',
        textDecorationLine:'underline'
    },
    sectitle: {
      fontFamily:'AB',
      color:"#FFF",
      fontSize:25,
      textAlign:'left',
      marginTop:'10%',
  },
    text: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:22,
        textAlign:'left',
        
    },
    subtext: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:18,
        textAlign:'center',
        
        
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
        fontWeight:'bold'
    }
    
    

});