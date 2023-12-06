
import { Row } from 'native-base';
import React, { Component } from 'react';
import { connect } from "react-redux";

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
  Dimensions,
  BackHandler,
  AsyncStorage,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Connection from "../connection";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
import CheckBox from '@react-native-community/checkbox';


import RadioForm from 'react-native-simple-radio-button';


class Login_Screen extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      mobile_number: '',
      Butun_Hide:true,
      checked:true,
      email:'',
      password:'',
      passhide:true
    }
  }



  backAction = () => {
    // BackHandler.exitApp()
    Actions.Roll_Screen()
    // Actions.pop()
    return true;
  };


  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {


    // console.log("aaaaaaaaaaaaa", remember);
 
  
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }



  login = () => {

    let uploaddata = new FormData();
    let email = this.state.email
    let password = this.state.password

    if (email == "") {
      alert("Please enter email.")
    } else if (password == "") {
      alert("Please enter password.")
    }

    else {
      this.setState({ spinner: true });
      uploaddata.append('email', email);
      uploaddata.append('password', password);
      uploaddata.append('role', this.props.role);
      let api = Connection + 'rest_apis.php?action=login';

      console.log("pass => ", api)
      fetch(api, {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data",
          "otherHeader": "foo",
        },
        body: uploaddata,
      })
        .then((response) => response.json())
        .then((response) => {

          if (response.response == "fail") {

            this.setState({ spinner: false });
            alert("Invalid email or password.")

          }


          else {

            let record = response.response
            let role = record[0].role
            if (role == 'user') {
              // if (this.state.checked == true) {
              //   let table = []
              //   table.push(email, password, 'user')
              //   AsyncStorage.setItem('remember', JSON.stringify(table));

              // } else {
              //   AsyncStorage.removeItem("remember")
              // }
              this.setState({ spinner: false });
              AsyncStorage.setItem('customer', JSON.stringify(response.response));

              Actions.Patient_Tab_Screen({ update: true })

            }
            else {
              let record = response.response
              let status = record[0].status

              if (status == 'approved') {
                // if (this.state.checked == true) {
                //   let table = []
                //   table.push(email, password, 'doctor')
                //   AsyncStorage.setItem('remember_1', JSON.stringify(table));

                // } else {
                //   AsyncStorage.removeItem("remember_1")
                // }
                this.setState({ spinner: false });
                AsyncStorage.setItem('customer', JSON.stringify(response.response));

                Actions.Doctor_Tab_Screen({ update: true })

              } else {
                this.setState({ spinner: false });
                alert("You have successfully registered but your account is under review.")
              }



            }
          }


        })
        .catch((error) => {
          console.error(error);

        });
    }

  }




  keyboardShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
        // alert('Keyboard is open')
        this.setState({Butun_Hide: false,})
    }
  );
   keyboardHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
        // alert('Keyboard is closed')
        this.setState({Butun_Hide: true,})

    }
  );

  seePassword = () => {
    console.log("eeeeeeeeeeeee");
    this.setState({
       passhide: !this.state.passhide,
    });
  };


  render() {







    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={{flex:1}}>

      <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Icon onPress={() => Actions.Roll_Screen()} name="chevron-left" type="Entypo" style={{ color: "#1B2E59", fontSize: 20, paddingLeft: 15, marginTop: 20 }} />

        <ScrollView showsVerticalScrollIndicator={false}>

          
        <Image source={require("../assets/canna1.png")} style={{width:width/2,height:140, alignSelf:'center',marginVertical:30}} resizeMode='contain' />


<Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold',textAlign:'center' }}>Welcome Back</Text>
<Text style={{ color: 'gray', fontSize: 14, textAlign:'center' }}>Sign In To Continue</Text>



 



<View style={{width:'95%', height: 45, marginTop: 30,alignSelf:'center'}}>
                 <TextInput onChangeText={email => this.setState({ email })} style={{ width:'95%', alignSelf: 'center', backgroundColor: '#d7f5f7', height: 48, borderRadius: 6, paddingLeft: 35, color: 'black', borderColor:'#2597CB', borderWidth:1  }} placeholder="Email" placeholderTextColor='gray' />
                 <Icon name="email" type="Zocial" style={{ color: '#2597CB', fontSize: 16,position:'absolute',top:13,left:17}} />
             </View>

             <View style={{width:width/1.1,paddingHorizontal:10, height: 48, marginTop: 20,alignSelf:'center',alignItems:'center',flexDirection:'row', borderRadius: 6,backgroundColor: '#d7f5f7',borderColor:'#2597CB', borderWidth:1 }}>
             <Icon name="lock" type="MaterialIcons" style={{ color: '#2597CB', fontSize: 16,  }} />

                 <TextInput secureTextEntry={this.state.passhide} onChangeText={password => this.setState({ password })} style={{ width:'88%',  height: 48,  paddingLeft: 10, color: 'black',}} placeholder="Password" placeholderTextColor='gray' />
           
           
{this.state.passhide == true ? (
              <Icon name="eye" type="Ionicons" color="white" onPress={() => this.seePassword()} style={{  fontSize: 25,color: "#2597CB"}}/>
             ) 
           : 
             (
              <Icon name="eye-off" type="Ionicons" color="white" onPress={() => this.seePassword()} style={{  fontSize: 25,color: "#2597CB"}}/>
           )}
           
             </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, marginVertical: 20 }}>
          <Text>   </Text>
           

            <TouchableOpacity  onPress={() => { Actions.Patient_Forgot_Screen({ role: this.props.role }) }} activeOpacity={0.8}  >
              <Text style={{ color: '#2597CB', fontSize: 13, fontWeight: 'bold' }}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
 
 


 <TouchableOpacity activeOpacity={0.8} onPress={()=>this.login()}
 style={{ width: width / 1.1, alignSelf: 'center', height: 48, backgroundColor: '#2597CB', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
 <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
</TouchableOpacity>

 

 

        </ScrollView>
        {this.state.Butun_Hide == true?
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', position: 'absolute', bottom: 15 }}>
          <Text style={{ color: 'gray' }}>Don't have account?</Text>
          {this.props.role=='user'?
          <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Patient_SignUp_Screen({ role: this.props.role }) }}>
            <Text style={{ color: '#2597CB', fontWeight: 'bold' }}> Creat a new account</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.doctor_signup({ role: this.props.role }) }}>
          <Text style={{ color: '#2597CB', fontWeight: 'bold' }}> Creat a new account</Text>
        </TouchableOpacity>
  }
        </View>
:
<View>
  </View>
  }

        {this.state.spinner == true &&
          <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(2, 2, 2, 0.8)', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              width: width / 1.2, height: height / 9 - 20, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
              borderRadius: 6
            }}>
              <UIActivityIndicator color='#2597CB' />
              <Text style={{ fontSize: 16, color: '#2597CB', fontWeight: 'bold' }}>Progressing your request</Text>
            </View>
          </View>
        }
      </View>
      </KeyboardAvoidingView>
      
    )
  }
}

 


export default  Login_Screen;