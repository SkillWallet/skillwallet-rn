import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Polyline } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat } from 'react-native-gifted-chat'

export default function Chat({route}) {
const navigation = useNavigation();
const [messages, setMessages] = useState([]);
const { rid, sid } = route.params;
const [token,setToken] = useState(null);
const [personal, setPersonal] = useState(null);

    const getToken = async () => {
      try {
        const tokenValue = await AsyncStorage.getItem('@token')
        console.log(tokenValue);
        setToken(tokenValue);
        getPersonal();
        
      } catch(e) {
        // error reading value
      }
    }
    const getPersonal = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('@profileInfo')
          console.log(JSON.stringify(JSON.parse(jsonValue)));
          setPersonal(JSON.parse(jsonValue));
          setMessages([
              {
                _id: rid,
                text: 'Hello!',
                createdAt: new Date(),
                user: {
                  _id: rid,
                  name: personal.nickname,
                  avatar: personal.imageUrl,
                },
              },
            ])
          
        } catch(e) {
          // error reading value
        }
      }

   
       

  useEffect(() => {
    getToken();
    
    
    
  }, [personal])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
      <View style={{flex:1}}>
          
          {personal &&<View style={{paddingVertical:'7.5%', backgroundColor:"#FFF", elevation:1, flexDirection:'row', paddingHorizontal:'5%'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Messages')}><Icon name="arrow-back" type="ionicons" color="#000" size={30} style={{marginTop:'25%'}}></Icon></TouchableOpacity>
          <Image source={{uri:personal.imageUrl}} style={{height:50, width:50, borderRadius:50, alignSelf:'center', marginLeft:'5%'}}></Image>
              <Text style={{fontWeight:'bold', textAlign:'center', fontSize:20, textAlignVertical:'center'}}>  {personal.nickname}</Text>
              
          </View>}
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: sid,
      }}
    /></View>
  )
}