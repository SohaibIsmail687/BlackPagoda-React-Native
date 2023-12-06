
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

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height



class Patient_Site_DoctorCategory extends React.Component {

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
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                {/* <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:5,paddingRight:10,marginTop:10}}>
                     <Icon onPress={() => {Actions.pop()}}  name="keyboard-arrow-left" type="MaterialIcons" style={{ color: "black", fontSize: 33}}/>
                     <Icon  name="dots-three-horizontal" type="Entypo" style={{ color: "black", fontSize: 22}}/>
                </View> */}

                <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: 'white' }}>
                    <Icon onPress={() => { Actions.pop() }} name="keyboard-arrow-left" type="MaterialIcons" style={{ color: "black", fontSize: 33 }} />
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{this.props.Categories}</Text>
                    <Text>      </Text>
                </View>

                {/* <Text style={{color:'black',fontWeight:'bold',paddingHorizontal:18,marginTop:7,fontSize:25}}>Categories</Text> */}

 
                <View style={{width:width,flexDirection:'row',alignItems:'center',flexWrap:'wrap', marginTop: 20 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category: 'Cancer Clinic' }) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                             <Image style={{ width: 45, height: 45, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Cancer_Clinics.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Cancer Clinic</Text>
                   </TouchableOpacity>


                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category:'Acupuncturist'}) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                             <Image style={{width:45,height:45, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Category_1.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Acupuncturist</Text>
                   </TouchableOpacity>


                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category:'Allergist'}) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                             <Image style={{width:45,height:45, borderRadius: 100, tintColor: 'white'}} source={require('../assets/Category_2.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Allergist</Text>
                   </TouchableOpacity>


                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category:'Audiologist'}) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff',marginTop:20}}>
                             <Image style={{width:45,height:45, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Category_3.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Audiologist</Text>
                   </TouchableOpacity>


                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category:'Cardiologist'}) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff',marginTop:20 }}>
                             <Image style={{width:45,height:45, borderRadius: 100, tintColor: 'white'}} source={require('../assets/Category_4.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Cardiologist</Text>
                   </TouchableOpacity>


                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category:'Cardiothoracic Surgeon'}) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff',marginTop:20 }}>
                             <Image style={{width:45,height:45, borderRadius: 100, tintColor: 'white'}} source={require('../assets/Category_5.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Cardiothoracic</Text>
                   </TouchableOpacity>

                   
                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category:'Chiropractor'}) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff',marginTop:20 }}>
                             <Image style={{width:45,height:45, borderRadius: 100, tintColor: 'white'}} source={require('../assets/Category_6.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Chiropractor</Text>
                   </TouchableOpacity>


                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category:'Colorectal Surgeon'}) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff',marginTop:20 }}>
                             <Image style={{width:45,height:45, borderRadius: 100, tintColor: 'white'}} source={require('../assets/Category_7.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Colorectal Surgeon</Text>
                   </TouchableOpacity>

                   
                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category:'Hearing Specialist'}) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff',marginTop:20 }}>
                             <Image style={{width:45,height:45, borderRadius: 100, tintColor: 'white'}} source={require('../assets/Category_14.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Hearing Specialist</Text>
                   </TouchableOpacity>

                   
                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category:'Dermatologist'}) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff',marginTop:20 }}>
                             <Image style={{width:45,height:45, borderRadius: 100, tintColor: 'white'}} source={require('../assets/Category_8.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Dermatologist</Text>
                   </TouchableOpacity>

                   
                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category:'Dietitian / Nutritionist'}) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff',marginTop:20 }}>
                             <Image style={{width:45,height:45, borderRadius: 100, tintColor: 'white'}} source={require('../assets/Category_9.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Dietitian / Nutritionist</Text>
                   </TouchableOpacity>

                    {/* <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category: 'Cancer Clinic' }) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                             <Image style={{ width: 45, height: 45, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Cancer_Clinics.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>Cancer Clinic</Text>
                   </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category: 'General Clinic' }) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                             <Image style={{ width: 45, height: 45, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Physician1.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>{this.props.General_Clinic}</Text>
                   </TouchableOpacity>


                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category: 'Dentist' }) }}  
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                             <Image style={{ width: 45, height: 45, borderRadius: 100, tintColor: 'white' }} source={require('../assets/oral.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>{this.props.Dentist}</Text>
                   </TouchableOpacity>


                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category: 'Cardiology' }) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                             <Image style={{ width: 45, height: 45, borderRadius: 100, tintColor: 'white' }} source={require('../assets/heart.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>{this.props.Cardiology}</Text>
                   </TouchableOpacity>


                   
                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category: 'Pediatric' }) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%',marginTop:30}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                             <Image style={{ width: 45, height: 45, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Pediatric1.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>{this.props.Pediatric}</Text>
                   </TouchableOpacity>


                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category: 'Dermatology' }) }}
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                             <Image style={{ width: 50, height: 50, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Dermotoglist1.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>{this.props.Dermatology}</Text>
                   </TouchableOpacity>


                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category: 'Orthopedician' }) }}
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                             <Image style={{ width: 45, height: 45, borderRadius: 100, tintColor: 'white', resizeMode: 'contain' }} source={require('../assets/ortho.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>{this.props.Orthopedician}</Text>
                   </TouchableOpacity>


                   <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Doctor_By_Category({ category: 'Neurologists' }) }} 
                        style={{alignItems: 'center', justifyContent:'center',width:'33%'}}>
                        <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                             <Image style={{ width: 45, height: 45, borderRadius: 100, tintColor: 'white' }} source={require('../assets/brain.png')} />
                        </View>
 
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 13 }}>{this.props.Neurologists}</Text>
                   </TouchableOpacity> */}
                </View>

            </View>

        )
    }
}



const mapStateToProps = (state) => {
    return {
        Categories: state.Categories,
        Dentist: state.Dentist,
        doctors: state.doctors,
        Cardiology: state.Cardiology,
        General_Clinic: state.General_Clinic,
        Pediatric: state.Pediatric,
        Dermatology: state.Dermatology,
        Orthopedician: state.Orthopedician,
        Neurologists: state.Neurologists,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (Categories, Dentist, doctors, Cardiology, General_Clinic, Pediatric, Dermatology, Orthopedician, Neurologists) => { dispatch({ type: "spanish_lang", payload: Categories, Dentist, doctors, Cardiology, General_Clinic, Pediatric, Dermatology, Orthopedician, Neurologists }) },
        english_lang: (Categories, Dentist, doctors, Cardiology, General_Clinic, Pediatric, Dermatology, Orthopedician, Neurologists) => { dispatch({ type: "english_lang", payload: Categories, Dentist, doctors, Cardiology, General_Clinic, Pediatric, Dermatology, Orthopedician, Neurologists }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Patient_Site_DoctorCategory);