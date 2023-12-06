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
  AsyncStorage
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
import ImageLoad from 'react-native-image-placeholder';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class Articles_Profile extends React.Component {

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
 
 
  render() {
  

    return (
      <View style={{ flex: 1,backgroundColor:'white'}}>
 
           <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, width: width }}>
              <Icon onPress={() => { Actions.pop() }} name="arrowleft" type="AntDesign" style={{ color: "black", fontSize: 23}} />
              <Text style={{color:'#24C6D2',fontWeight:'bold',fontSize:20}}>Blog Detail</Text>
                         <Text style={{color:'#24C6D2',fontWeight:'bold',fontSize:20}}>    </Text>
                   {/* <Icon name="bookmark-minus-outline" type="MaterialCommunityIcons" style={{ color: "gray", fontSize: 23}} />
                   <Icon name="send-o" type="FontAwesome" style={{ color: "gray", fontSize: 20,marginLeft:15  }} /> */}
                  
           </View>
           <ScrollView>
           <View style={{width: width/1-50,alignSelf:'center',marginTop:10, }}>
                    
           <ImageLoad
style={{ width: '100%', height: 180, borderRadius: 15}} 
                  loadingStyle={{ size: 'large', color: 'blue' }}
                  source={{ uri: this.props.profile }}
                  borderRadius={15}

                  placeholderStyle={{ width: '100%', height: 180, borderRadius: 15}}

                />
                 {/* <Image style={{ width: '100%', height: 180, borderRadius: 15}} source={require('../assets/covid.jpg')} /> */}
                 <Text numberOfLines={2} style={{color:'black',fontWeight:'bold',fontSize:15,marginTop:7}}>COVID-19 Was a Top Cause of Death in 2020 and 2021, Even For Younger People</Text>
                 <View style={{flexDirection:'row',alignItems:'center',marginTop:7}}>
                     <Text style={{color:'gray',fontSize:12}}>{this.props.date}</Text>
                     <View style={{paddingHorizontal:5,paddingVertical:2,backgroundColor:'#c2ecfc',alignSelf:'flex-start',borderRadius:5,marginLeft:10}}>
                         <Text style={{color:'#007fff',fontSize:12}}>{this.props.category}</Text>
                     </View>
                 </View>
           </View>

          <View style={{borderBottomWidth:2,borderColor:'#f8f8f9',width:width/1-50,alignSelf:'center',marginVertical:15}}></View>

          <Text style={{color:'gray',paddingHorizontal:22}}>{this.props.description}</Text>

           
    <View style={{paddingBottom:20}}></View>
    </ScrollView>
    
      </View>

    )
  }}

 
  
  const mapStateToProps = (state) => {
    return {
        Choose_an_action: state.Choose_an_action,
  
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
      spanish_lang: (Choose_an_action) => { dispatch({ type: "spanish_lang", payload: Choose_an_action }) },
      english_lang: (Choose_an_action) => { dispatch({ type: "english_lang", payload: Choose_an_action }) },
      add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
      // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
      // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
      // addservice:(service)=>{dispatch({type:"addservice",payload:service})},
 
  
    }
  }
  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Articles_Profile);