import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Polyline } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { ActivityIndicator, Colors } from 'react-native-paper';


export default function Chat({route}) {
const navigation = useNavigation();
const [messages, setMessages] = useState([]);
const { rid } = route.params;
const [token,setToken] = useState(null);
const [personal, setPersonal] = useState(null);
const [chat, setChat] = useState(null);
const [flag, setFlag] = useState(false);
const [proFlag, setProFlag] = useState(false);
    const getToken = async () => {
      try {
        const tokenValue = await AsyncStorage.getItem('@token')
        console.log(JSON.parse(tokenValue));
        setToken(JSON.parse(tokenValue));
        if(!proFlag){
        getPersonal(JSON.parse(tokenValue));
        }
        console.log(JSON.parse(token).tokenId,"Get Token Function")
        if(flag){
          console.log("Conditional called")
          _getMessages(JSON.parse(token).tokenId);
        }
      } catch(e) {
        // error reading value
      }
    }
    
    const _getMessages = async (tokenid) => {
      console.log(tokenid,"Get Messages Called")
      var requestOptions = {
        method: 'GET'
      };
      console.log(tokenid);
     await fetch(`https://api.skillwallet.id/api/skillwallet/${tokenid}/message?recipient=${rid}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(JSON.stringify(result) == '{}'){
      console.log(JSON.stringify(result) == '{}')
      setChat('{}');
      setMessages({
        _id: 0,
        text: 'Start a new conversation',
        createdAt: Date.now(),
        user: {
          _id: 0,
          name: 'SkillWallet Bot',
          avatar: personal.imageUrl,
        },
      })
    }
    else{
    var i = 0;
    var temp = [];
    for(i=0;i<result.chat.messages.length;i++){
        temp.push(result.chat.messages[i]);
    }
    var temp2 = {"chat": {
      "_id": result.chat._id,
      "_mod": result.chat._mod,
      "messages":temp,
      "participant1": result.chat.participant1,
          "participant1Name": result.chat.participant1Name,
          "participant1PhotoUrl": result.chat.participant1PhotoUrl,
          "participant2": result.chat.participant2,
          "participant2Name": result.chat.participant2Name,
          "participant2PhotoUrl": result.chat.participant2PhotoUrl
    }}
    var temp3 = [];
    for(i=result.chat.messages.length-1;i>=0;i--){
      
        temp3.push({
          _id: i,
          text: temp2.chat.messages[i].text,
          createdAt: temp2.chat.messages[i].createdAt,
          user: {
            _id: temp2.chat.messages[i].sender == temp2.chat.participant2 ? temp2.chat.participant2:temp2.chat.participant1,
            name: temp2.chat.messages[i].sender == temp2.chat.participant2 ? temp2.chat.participant2Name:temp2.chat.participant1Name,
            avatar: temp2.chat.messages[i].sender == temp2.chat.participant2 ? temp2.chat.participant2PhotoUrl:personal.imageUrl,
          },
        })
      
    }
    setChat(temp2);
    setMessages(temp3);
    console.log(temp3);
    setFlag(true);
  }
  })
    
  .catch(error => console.log('error', error));

    
  }
    
  
    const getPersonal = async (t) => {
      console.log("Get Personal Called")
        try {
        const jsonValue = await AsyncStorage.getItem('@profileInfo')
          console.log(JSON.stringify(JSON.parse(jsonValue)));
          console.log("Get Personal Done")
          setPersonal(JSON.parse(jsonValue));
          setProFlag(true);
          console.log(personal, "Personal Set");
          _getMessages(JSON.parse(t).tokenId);
          
        } catch(e) {
          // error reading value
          console.log(e);
        }
 
        
      }

   
       

  useEffect(() => {
    getToken();
    
    
    
  }, [token, personal, chat, messages])

  const onSend = (message) => {
    console.log(message)
    var raw = JSON.stringify({
      "recipient": rid,
      "text": message[0].text
    });
    console.log(raw);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  

    var url = `https://api.skillwallet.id/api/skillwallet/${JSON.parse(token).tokenId}/message?recipient=${rid}`;
    console.log(url);
    
     fetch(url, {
      method: 'POST',
      headers:{ 'Content-Type': 'application/json' },
      body: raw,
    })
      .then(response => response.text())
      .then(result =>{console.log(result);_getMessages()})
      .catch(error => console.log('error', error));
  }

 
  if(chat&&messages&&personal&&token){
  return (
      <View style={{flex:1}}>


        
          
          {personal && token && chat &&<View style={{paddingVertical:'7.5%', backgroundColor:"#FFF", elevation:1, flexDirection:'row', paddingHorizontal:'5%'}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Messages')}><Icon name="arrow-back" type="ionicons" color="#000" size={30} style={{marginTop:'25%'}}></Icon></TouchableOpacity>
          <Image source={{uri:chat.chat.participant2PhotoUrl}} style={{height:50, width:50, borderRadius:50, alignSelf:'center', marginLeft:'5%'}}></Image>
              <Text style={{fontWeight:'bold', textAlign:'center', fontSize:20, textAlignVertical:'center'}}>  {chat.chat.participant2Name}</Text>
              
          </View>}
    {token && personal && messages&&<GiftedChat
      messages={messages}
      showUserAvatar = {true}
      alwaysShowSend = {true}
      onSend={messages => onSend(messages)}
      user={{
        _id: JSON.parse(token).tokenId,
      }}
      renderBubble={props => {
        return (
          <Bubble
            {...props}
            textStyle={{
              right: {
                color: 'white',
              },
              left: {
                color: 'white'
              }
            }}
            wrapperStyle={{
              left: {
                backgroundColor: 'grey',
              },
            }}
          />
        );
      }}
    />}
    </View>
  )}
  else return( <View style={{backgroundColor:'#FFF', height:'100%', alignContent:'center'}}><ActivityIndicator style={{marginTop:'40%'}} animating={true} color={Colors.blue800} size={30} /></View>);

}