import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, SafeAreaView, BackHandler, TextInput, Dimensions, AsyncStorage, View, TouchableOpacity, Text } from 'react-native';
import { Container, Header, Content, Icon, Footer, FooterTab, Drawer, Badge, Right, Picker, Left, Button, Body, Title, Segment } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class Langyage extends React.Component {




  constructor(props) {
    super(props);
    this.state = {
      data: [],

      spinner: false,
      pickup1: '',
      pickup2: '',
      des_1: '',
      des_2: '',
      price: '',
      name_2: '',


      user_location: '',
      user_des: '',
      spinner: false



    };
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
    Actions.pop()
    return true;
  }




  spanish_lang = async () => {


    if (this.props.user == true) {

      this.props.spanish_lang();
      Actions.Patient_Tab_Screen();

      AsyncStorage.setItem('lang', JSON.stringify([{ default: 'Spanish' }]));
    }

    else {

      this.props.spanish_lang();
      Actions.Doctor_Tab_Screen();

      AsyncStorage.setItem('lang', JSON.stringify([{ default: 'Spanish' }]));
    }



  };


  english_lang = async () => {

    if (this.props.user == true) {

      this.props.english_lang();
      Actions.Patient_Tab_Screen();

      AsyncStorage.setItem('lang', JSON.stringify([{ default: 'English' }]));
    }

    else {

      this.props.english_lang();
      Actions.Doctor_Tab_Screen();

      AsyncStorage.setItem('lang', JSON.stringify([{ default: 'English' }]));
    }




  };


  render() {
    return (

      <View>



        <View style={{ height: 70, flexDirection: 'row', paddingHorizontal: 20, backgroundColor: '#38b6ff', width: "100%", alignItems: 'center' }}>
          <Icon onPress={() => Actions.pop()} name="chevron-back" type="Ionicons" style={{ color: "white", fontSize: 30 }} />
          <Text style={{ fontSize: 22, color: 'white', marginLeft: 20 }}>Language</Text>
        </View>

        <TouchableOpacity onPress={() => this.english_lang()} >
          <View style={{ flexDirection: 'row', paddingHorizontal: 25, justifyContent: 'space-between', marginTop: 25, alignItems: 'center' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: "black" }}>English</Text>
              <Text style={{ fontSize: 14, marginTop: 2, color: 'green' }}>English</Text>
            </View>



          </View> 
        </TouchableOpacity>



        <View style={{ borderBottomWidth: 0.5, borderColor: 'lightgray', marginTop: 15 }}></View>



        <TouchableOpacity onPress={() => this.spanish_lang()} >
          <View style={{ flexDirection: 'row', paddingHorizontal: 25, justifyContent: 'space-between', marginTop: 25, alignItems: 'center' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Somali</Text>
              <Text style={{ fontSize: 14, marginTop: 2, color: 'green' }}>Soomaali</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ borderBottomWidth: 0.5, borderColor: 'lightgray', marginTop: 15 }}></View>










        {/* <View style={{backgroundColor:'white', width:'90%', alignSelf:'center',  borderRadius:12, position:'absolute', bottom:10, height:230}}>
    

 <Text style={{fontSize:22, textAlign:'center', padding: 20}}>Are you sure to cancel your ride?</Text>

<TouchableOpacity    onPress={()=>this.english_lang()}    style={{ width:width/1.3, height:height/17, alignSelf: 'center',  borderRadius: 38, backgroundColor: '#24AE34', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, flexDirection: 'row'}}   >

<Text style={{color: 'white',  fontSize: 16, }}>No</Text>

</TouchableOpacity>

<TouchableOpacity  onPress={()=>this.spanish_lang()}     style={{ width:width/1.3, height:height/17, alignSelf: 'center', marginTop: 20, borderRadius: 38, borderColor: '#24AE34',  borderWidth:1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, flexDirection: 'row'}}   >

<Text style={{color: 'black',  fontSize: 16, }}>Yes</Text>

</TouchableOpacity>





    </View> */}
      </View>
    )
  }
}









const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05094D'

  },
  ImageAvater1: {
    width: 60,
    height: 60,
    borderRadius: 55,





  },
  tinyImage: {
    width: 45,
    height: 45,
    borderRadius: 24,
  },
  storyImage: {
    width: 100,
    height: 100,
    borderRadius: 54,
  },
  concert: {
    height: 300,
    width: '100%',
    alignSelf: 'center',
  },
  notiImage: {
    width: 35,
    height: 35,
    borderRadius: 54,
  },
  input3: {
    borderRadius: 12,
    height: 45,
    width: '85%',
    paddingHorizontal: 45,
    backgroundColor: '#D1D1D1',
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  icon2: {
    position: 'absolute',
    right: 45,
  },
  icon3: {
    position: 'absolute',
    right: 80,
  },
  logo1: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  logo3: {

    width: 90,
    height: 90,
    borderRadius: 12,
    marginLeft: 8,
    marginTop: 8
  },

  ImageAvater2: {
    width: 40,
    height: 50,
    borderRadius: 25,





  },

  image: {

    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    height: '100%',

  },

  map: {
    width: '100%',
    height: '100%'
  },
  phoneinput: {
    fontSize: 16,



    textAlign: 'center',





  },
  phoneinput1: {
    fontSize: 16,
    width: '90%',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,



    borderBottomColor: 'lightgray',

    marginLeft: 6,
  },

  textInput: {
    // padding: 10,

    // marginVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',


    // textAlign:'center',
    width: '95%',
    alignSelf: 'center',
    color: 'black'
  },

  separator: {
    height: 6,
    // backgroundColor: '#c8c7cc',
  },
  listView: {
    position: 'absolute',
    top: 100,



  },
  autocompleteContainer: {
    position: 'absolute',
    top: 0,
    left: 15,
    right: 10,

  },

});
const mapStateToProps = (state) => {
  return {
    Language: state.Language,
    lanuage: state.lanuage,
    lanuage1: state.lanuage1,
    city: state.city,
    setting: state.setting,
    // counter: state.counter,

    // service: state.service,

    // counterNO: state.counterNO,







  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    spanish_lang: (city, setting, Language) => { dispatch({ type: "spanish_lang", payload: city, setting, Language }) },
    english_lang: (city, setting, Language) => { dispatch({ type: "english_lang", payload: city, setting, Language }) },


    // english_lang:(lanuage)=>{dispatch({type:"english_lang",payload:lanuage})},

    // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
    // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
    // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Langyage);

