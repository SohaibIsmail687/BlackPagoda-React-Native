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
  Dimensions,
  BackHandler,
  Pressable,
  AsyncStorage,
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base'; 
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


class Blog extends React.Component {

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
              <View style={{ flex: 1 }}>
                    
                    <View style={{width:width,flexDirection:'row',alignItems:'center',paddingHorizontal:13,paddingVertical:10,justifyContent:'space-between',backgroundColor:'#38b6ff'}}>
                         <Icon onPress={() => { Actions.pop() }} name="keyboard-arrow-left" type="MaterialIcons" style={{ color: "white", fontSize: 33 }} />
                         <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>Dr. Alesa</Text>
                         <Image style={{ width:40, borderRadius: 100, height:40 }} source={require('../assets/doc4.jpg')} />
                    </View>

                    <ScrollView>

                    {/* <View style={{marginHorizontal:15,marginTop:20}}>
                        <Text style={{color:'#38b6ff',fontSize:14}}>Health</Text>
                        <Text style={{color:'black',fontSize:14,fontWeight:'bold',marginTop:10}}>What Eating Only Raw Diet For A Week Can Do</Text>
                    </View> */}

                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Blog_Detail() }}
                        style={{width:width/1.1,paddingTop:5,paddingBottom:20,borderRadius:7,backgroundColor:'white',borderWidth:0.6,borderColor:'lightgray',marginLeft:15, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3,marginBottom:5,marginTop:15}}>
                        <Text style={{color:'#17c1eb',fontSize:13,marginLeft:8,marginVertical:5}}>Health</Text>
                        <Text style={{color:'black',fontWeight:'bold',marginHorizontal:8}}>What Eating Only Raw Diet For A Week Can Do</Text>
                        <Image style={{width:'96%',height:150,borderRadius:7,alignSelf:'center',marginTop:5}} source={require('../assets/Bloog1.png')} />
                   </TouchableOpacity>

                   <Text style={{color:'black',fontWeight:'bold',fontSize:16,paddingHorizontal:15,marginTop:10}}>Recommendation</Text>
                   <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                     <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                       <View style={{marginLeft:18, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3}}>
                             <Image style={{width:width/2.5,height:200,borderRadius:7,alignSelf:'center',marginTop:5}} source={require('../assets/Blogg.jpg')} />
                             <View style={{position:'absolute',bottom:20,left:3}}>
                                 <Text style={{color:'white',fontWeight:'bold',fontSize:14}}>Inspiration for new</Text>
                                 <Text style={{color:'white',fontWeight:'bold',fontSize:14}}>Project can be found</Text>
                             </View>
                       </View>

                       <View style={{marginLeft:18, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3}}>
                             <Image style={{width:width/2.5,height:200,borderRadius:7,alignSelf:'center',marginTop:5}} source={require('../assets/Bloog2.png')} />
                             <View style={{position:'absolute',bottom:20,left:3}}>
                                 <Text style={{color:'white',fontWeight:'bold',fontSize:14}}>Inspiration for new</Text>
                                 <Text style={{color:'white',fontWeight:'bold',fontSize:14}}>Project can be found</Text>
                             </View>
                       </View>

                       <View style={{marginHorizontal:18, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3}}>
                             <Image style={{width:width/2.5,height:200,borderRadius:7,alignSelf:'center',marginTop:5}} source={require('../assets/Blogg.jpg')} />
                             <View style={{position:'absolute',bottom:20,left:3}}>
                                 <Text style={{color:'white',fontWeight:'bold',fontSize:14}}>Inspiration for new</Text>
                                 <Text style={{color:'white',fontWeight:'bold',fontSize:14}}>Project can be found</Text>
                             </View>
                       </View>
                      </ScrollView>
                   </View>

                   <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                       <View style={{paddingHorizontal:15,paddingVertical:10,justifyContent:'center',alignItems:'center',marginLeft:10}}>
                           <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>Top</Text>
                       </View>

                       <View style={{paddingHorizontal:15,paddingVertical:10,justifyContent:'center',alignItems:'center',marginLeft:10}}>
                           <Text style={{color:'#b3b3b3' ,fontSize:15}}>Popular</Text>
                       </View>

                       <View style={{paddingHorizontal:15,paddingVertical:10,justifyContent:'center',alignItems:'center',marginLeft:10}}>
                           <Text style={{color:'#b3b3b3',fontSize:15}}>Trending</Text>
                       </View>

                       <View style={{paddingHorizontal:15,paddingVertical:10,justifyContent:'center',alignItems:'center',marginLeft:10}}>
                           <Text style={{color:'#b3b3b3',fontSize:15}}>Editor</Text>
                       </View>
                   </View>

                   <View style={{flexDirection:'row',alignItems:'center',width:width/1.1,alignSelf:'center',borderRadius:10,backgroundColor:'white',marginTop:10,paddingVertical:13,paddingHorizontal:10, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3}}>
                         <Image style={{width:65,height:65,borderRadius:7}} source={require('../assets/Blogg.jpg')} />
                         <View style={{marginLeft:15}}>
                              <Text style={{color:'black',fontWeight:'bold',fontSize:14}}>Inspiration for new</Text>
                              <Text style={{color:'black',fontWeight:'bold',fontSize:14}}>Project can be found</Text>
                              <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                                   <Image style={{ width:20, borderRadius: 100, height:20 }} source={require('../assets/doc4.jpg')} />
                                   <Text style={{color:'#b3b3b3',fontSize:12,marginLeft:5}}>Dr. Alesa</Text>
                              </View>
                         </View>
                   </View>

                   <View style={{flexDirection:'row',alignItems:'center',width:width/1.1,alignSelf:'center',borderRadius:10,backgroundColor:'white',marginTop:15,paddingVertical:13,paddingHorizontal:10, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3,marginBottom:20}}>
                         <Image style={{width:65,height:65,borderRadius:7}} source={require('../assets/Bloog2.png')} />
                         <View style={{marginLeft:15}}>
                              <Text style={{color:'black',fontWeight:'bold',fontSize:14}}>Inspiration for new</Text>
                              <Text style={{color:'black',fontWeight:'bold',fontSize:14}}>Project can be found</Text>
                              <View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
                                   <Image style={{ width:20, borderRadius: 100, height:20 }} source={require('../assets/doc4.jpg')} />
                                   <Text style={{color:'#b3b3b3',fontSize:12,marginLeft:5}}>Dr. Alesa</Text>
                              </View>
                         </View>
                   </View>

                   </ScrollView>

              </View>
)
}}


const mapStateToProps = (state) => {
    return {
      No_Instance_ID_token: state.No_Instance_ID_token,
      An_error_occurred_while_retrieving_token: state.An_error_occurred_while_retrieving_token,
      Please_try_agin_later: state.Please_try_agin_later,
      Home: state.Home,
      Receive_the_care_you_need: state.Receive_the_care_you_need,
      When_you_need_it: state.When_you_need_it,
      Schedule_an_Online: state.Schedule_an_Online,
      Doctor_Appointment: state.Doctor_Appointment,
      View_all: state.View_all,
      Book_and_Appointment: state.Book_and_Appointment,
      Search_by_Specialty: state.Search_by_Specialty,
      Top_Rated_Doctors: state.Top_Rated_Doctors,
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
      spanish_lang: (No_Instance_ID_token, An_error_occurred_while_retrieving_token, Please_try_agin_later, Home, Receive_the_care_you_need, When_you_need_it, Schedule_an_Online, Doctor_Appointment, View_all, Book_and_Appointment, Search_by_Specialty, Top_Rated_Doctors) => { dispatch({ type: "spanish_lang", payload: No_Instance_ID_token, An_error_occurred_while_retrieving_token, Please_try_agin_later, Home, Receive_the_care_you_need, When_you_need_it, Schedule_an_Online, Doctor_Appointment, View_all, Book_and_Appointment, Search_by_Specialty, Top_Rated_Doctors }) },
      english_lang: (No_Instance_ID_token, An_error_occurred_while_retrieving_token, Please_try_agin_later, Home, Receive_the_care_you_need, When_you_need_it, Schedule_an_Online, Doctor_Appointment, View_all, Book_and_Appointment, Search_by_Specialty, Top_Rated_Doctors) => { dispatch({ type: "english_lang", payload: No_Instance_ID_token, An_error_occurred_while_retrieving_token, Please_try_agin_later, Home, Receive_the_care_you_need, When_you_need_it, Schedule_an_Online, Doctor_Appointment, View_all, Book_and_Appointment, Search_by_Specialty, Top_Rated_Doctors }) },
      add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
      // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
      // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
      // addservice:(service)=>{dispatch({type:"addservice",payload:service})},
  
  
  
  
  
  
    }
  }
  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Blog);