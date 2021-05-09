import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line } from 'react-native-svg';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';


export default function Welcome() {
    const navigation = useNavigation();

    
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo}></Image>
            <View>
                <Text style={styles.title}>Welcome to your SkillWallet 🙌🏻</Text>
                <Svg height="50" width="275" style={styles.line}>
                <Line x1="0" y1="0" x2="275" y2="0" stroke="white" strokeWidth="2" />
                </Svg>
                <Text style={styles.text}>Scan your Community QR-Code to verify your Membership</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Qr')}><View style={styles.btn}>
                    <Text style={styles.btntext}>Scan QR-Code</Text>
                    <Icon name="scan" type="ionicon" style={styles.btnicon} color='#FFF'></Icon>
                </View></TouchableOpacity>
                <View style={{flexDirection:'row', alignSelf:'center',width:'60%', flexWrap:'wrap', alignItems:'center', marginTop:'5%'}}>
                <Text style={styles.subtitle}>Don’t have a Community yet? 
                Visit</Text><TouchableOpacity onPress={()=>Linking.openURL('https://app.distributed.town')}><Text style={styles.sublink}>app.distributed.town</Text></TouchableOpacity>
                <Text style={styles.subtitle}> to Join one!</Text></View>
            </View>
          
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        height: '100%',
        position: 'relative',
        backgroundColor: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(65,90,114,1) 0%, rgba(33,45,57,1) 100%)`
    },
    logo: {
        marginTop:'5%',
        width:'20%',
        height:'20%',
        resizeMode:'contain',
        alignSelf:'center'
    },
    title: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:35,
        textAlign:'center',
        width:'70%',
        alignSelf:'center',
    },
    text: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:25,
        textAlign:'center',
        width:'80%',
        alignSelf:'center',
    },
    subtitle: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:17,
        textAlign:'center',
        alignSelf:'center'
    },
    sublink: {
        fontFamily:'AR',
        color:"#FFF",
        fontSize:17,
        textAlign:'center',
        alignSelf:'center',
        textDecorationLine:'underline'
    },
    line:{
        alignSelf:'center',
        marginTop:'10%'
    },
    btn: {
        borderRadius:20,
        backgroundColor:`linear-gradient(90deg, rgba(20,110,170,1) 0%, rgba(20,110,170,0) 100%);`,
        width:'70%',
        alignSelf:'center',
        display:'flex',
        flexDirection:'row',
        marginTop:'5%',
        paddingVertical:'5%',
        paddingHorizontal:'15%',
        alignContent:'center',
        elevation:2
    },
    btntext: {
        color:"#FFF",
        fontFamily:'AR',
        fontSize:20,
        alignSelf:'center',
        textAlign:'center',
    },
    btnicon: {
        color:"#FFF",
        fontSize:20,
        marginLeft:'10%'
    }

});