import { Row } from 'native-base';
import React, { Component } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ImageBackground,
    Pressable,
    Dimensions,
    BackHandler,
    AsyncStorage,
    highlightText
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


    
class About_Us_Screen extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            link:"info@masclinicas.com"
        }
    }

    backAction = () => {
        Actions.pop()
        return true;
    };



    componentWillUnmount() {
        this.backHandler.remove();
    }

    componentDidMount = async () => {


        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }


    render() {
        const text ='info@masclinicas.com';

        const brokenText = text.split('').map(word => (
            <TouchableOpacity
            //  onPress={() => OpenAnything.Email('info@masclinicas.com')}
             > 
          <Text style={{ color: '#24C6D2', fontSize: 15,marginBottom:-5}}>{word}</Text>
          </TouchableOpacity>
        ));
  
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ flex: 1 }}>
                    <View style={{ width: width / 1, flexDirection: 'row', alignItems: 'center', elevation: 3, backgroundColor: "#24C6D2", paddingVertical: 18, paddingHorizontal: 15 }}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" type="AntDesign" style={{color:'white',fontSize:25}}/>
                        {/* <Image style={{ width: 50, height: 50, tintColor: 'white' }} source={require('../assets/Terms.png')} /> */}
                        <Text style={{ color: 'white', fontSize: 20, marginLeft: 15, fontWeight: 'bold' }}>About Us</Text>
                    </View>
                    <ScrollView>

                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>About Us:</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 15 }}>The Autism Care app is powered by AutismCare.AI it is an application for people who live with autism and spectrum disorder, clinicians, medical providers, the autism community, caretakers, and parents. The purpose of the Autism Care app is to provide a focal point where resources, TeleMed, autism management can take place.</Text>
                       
                    </ScrollView>


                </View>


            </View>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        Categories: state.Categories,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (Categories,) => { dispatch({ type: "spanish_lang", payload: Categories, }) },
        english_lang: (Categories,) => { dispatch({ type: "english_lang", payload: Categories, }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(About_Us_Screen);