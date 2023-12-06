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
    AsyncStorage
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import { Open,Web } from 'react-native-openanything';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height



class Terms_And_Conditions extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

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

    open_web = () => {
        Web('https://masclinicas.com/')
      }

    render() {

        const text ='www.MASCLINICAS.com.';
        const brokenText = text.split('').map(word => (
            <TouchableOpacity onPress={() => this.open_web()}> 
          <Text style={{ color: '#00acfc', fontSize: 15,marginBottom:-5,fontWeight:'bold'}}>{word}</Text>
          </TouchableOpacity>
        ));

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ flex: 1 }}>
                    <View style={{ width: width / 1, flexDirection: 'row', alignItems: 'center', elevation: 3, backgroundColor: "#24C6D2", paddingVertical: 18, paddingHorizontal: 15 }}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" type="AntDesign" style={{color:'white',fontSize:25}}/>
                        {/* <Image style={{ width: 50, height: 50, tintColor: 'white' }} source={require('../assets/Terms.png')} /> */}
                        <Text style={{ color: 'white', fontSize: 20, marginLeft: 15, fontWeight: 'bold' }}>Terms & Condition</Text>
                    </View>
                    <ScrollView>
                        
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Terms & Condition</Text>
                        <Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 15 }}>Your use of AutismCare is subject to these Terms of Use.</Text>

                                          
 

<Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 4 }}>⦁ User is given a non-transferable, non-exclusive, non-sublicensable license to install and use the Application on any Apple-branded Products as permitted by the Usage Rules and the App Store Terms of Service, except if the Application can be accessed by other accounts associated with the user via Family Sharing or volume purchasing.{"\n"}</Text><Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 4 }}>⦁ This license will govern any updates of the Application by the Company that replace, repair, and/or supplement the first Application, unless a separate license is provided for such update.{"\n"}
</Text>
<Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 4 }}>⦁ User may not share or make the Application available to third parties (unless allowed by the Apple Terms and Conditions, and with the Company's prior written consent), sell, rent, lend, lease, or redistribute the Application.{"\n"}
</Text>
<Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 4 }}>⦁ User may not reverse engineer, translate, disassemble, integrate, decompile, integrate, remove, modify, combine, create derivative works or updates of, adapt, or attempt to derive the source code of the Application, or any part thereof (except with the Company's prior written consent).{"\n"}
</Text>
<Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 4 }}>⦁ User may not copy (unless allowed by this license and the Usage Rules) or alter the Application. User may create and store copies only on devices that they own or control for backup keeping under the terms of this license, the App Store Terms of Service, and any other terms and conditions that apply to the device or software used. User may not remove any intellectual property notices. User acknowledges that no unauthorized third parties may gain access to these copies at any time.{"\n"}</Text>
<Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 4 }}>⦁ The Company reserves the right to modify the terms and conditions of licensing.{"\n"}</Text>
<Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 4 }}>⦁ It is the user's responsibility to confirm that the device on which they intend to use the Application satisfies any technical specifications mentioned above.{"\n"}</Text>
<Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 4 }}>⦁ The Company reserves the right to modify the technical specifications as it sees appropriate at any time.{"\n"}
</Text>
<Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 4 }}>⦁ The Company's responsibility in the case of violation of obligations and tort is limited to intent and gross negligence. Only in case of a breach of essential contractual duties (cardinal obligations), will the Company also be liable in case of slight negligence. In any case, liability will be limited to the foreseeable, contractually typical damages. The limitation mentioned above does not apply to injuries to life, limb, or health.{"\n"}
</Text>
<Text style={{ color: 'gray', fontSize: 15, textAlign: 'justify', paddingHorizontal: 18, paddingTop: 4 }}>⦁ The Company takes no accountability or responsibility for any damage caused by a breach of duties according to the Scope of License of this Agreement. To avoid data loss, the user is required to make use of backup functions of the Application to the extent allowed by applicable third-party terms and conditions of use. The user is aware that in case of alterations or manipulations of the Application, the user will not have access to the Application.{"\n"}
</Text>
 


 

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



export default connect(mapStateToProps, mapDispatchToProps)(Terms_And_Conditions);