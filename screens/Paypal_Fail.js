import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  Keyboard, TextInput,
  Dimensions
} from 'react-native';
import { Container, Header, Content, Icon, Footer, FooterTab, Button, Drawer, Text, Badge, Right, Picker, Left } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Connection from '../connection';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



class Paypal_Fail extends React.Component {

  constructor(props) {

    super(props)


    this.state = {
      selectedbtn: "1", name: "", id: '', plusbutton: true, filter: true, policy: "",
      url1: Connection + "/paypal-payment.php?cart_id=" + this.props.cartid
    }
    // default screen index

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  }
  handleBackButtonClick() {
    // BackHandler.exitApp();
    //  Actions.user_home()
    Actions.Patient_Tab_Screen()

    return true;
  }




  componentDidMount = async () => {

  }

  render() {




    return (
      <>

        <View style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        }}>

          <View style={[  { flexDirection: 'row', elevation:5, backgroundColor: 'white', height: 70, paddingTop: 20, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: "#dee3de", }]}>
            <Icon name="keyboard-arrow-left" type="MaterialIcons" style={{ color: '#24C6D2', fontSize: 28, marginLeft: 10, marginTop: 5 }} onPress={() =>  
            
            Actions.Patient_Tab_Screen()}
     />
            <Text style={{ color: 'black', fontSize: 18, fontWeight:'bold', marginTop: 5, marginLeft: -30 }}>Paypal</Text>
            <View></View>




          </View>


          <Icon type="AntDesign" name="closecircle" style={{ fontSize: 150, alignSelf: 'center', marginTop: '40%', color: '#24C6D2' }} />
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20,paddingHorizontal:20 }}> Due to some reason your payment is not succeed for this appointment</Text>
          <TouchableOpacity activeOpacity={0.8} style={{ width: '70%', alignSelf: 'center', height: 40, justifyContent: 'center', backgroundColor: '#24C6D2', marginBottom: 5, marginTop: 20 }} onPress={() =>
            
            // Actions.Paypal({ time: this.props.time, category: this.props.category, date: this.props.date, day: this.props.day, doctor_id: this.props.doctor_id, appointment_price: this.props.appointment_price, doctor_name: this.props.doctor_name, subject: this.props.subject, r_number: this.props.r_number, symptoms: this.props.symptoms, multi_Images: this.props.multi_Images, multi_image_check: this.props.multi_image_check, doctor_name: this.props.doctor_name, city: this.props.city })
          
          
            Actions.Patient_Tab_Screen()}
            
            
            
            >
            <Text style={{ color: 'white', textAlign: 'center' }}>Try Again</Text>
          </TouchableOpacity>


          {/* <Image source={require('./images/men2.jpg')}  style={{width:'47%',height:180}} resizeMode={'cover'}/>
                               <Image source={require('./images/men2.jpg')}  style={{width:'47%',height:180}} resizeMode={'cover'}/> */}


        </View>
      </>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    Paypal: state.Paypal,
    Due_to_some_reason: state.Due_to_some_reason,
    Please_try_again: state.Please_try_again,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
    spanish_lang: (Paypal, Due_to_some_reason, Please_try_again) => { dispatch({ type: "spanish_lang", payload: Paypal, Due_to_some_reason, Please_try_again }) },
    english_lang: (Paypal, Due_to_some_reason, Please_try_again) => { dispatch({ type: "english_lang", payload: Paypal, Due_to_some_reason, Please_try_again }) },
    add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
    // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
    // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
    // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Paypal_Fail);