
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
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Countries</Text>
                    <Icon name="wallet-outline" type="Ionicons" style={{ color: "black", fontSize: 19 }} />
                </View>

                {/* <Text style={{color:'black',fontWeight:'bold',paddingHorizontal:18,marginTop:7,fontSize:25}}>Categories</Text> */}

                <TouchableOpacity onPress={() => { Actions.doctor_by_state({ state1: 'Colombia' }) }} activeOpacity={0.8}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 30, height: 30, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Colombia.png')} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Colombia</Text>
                            <Text style={{ color: 'gray', fontSize: 13, marginTop: 1 }}>{this.props.doctors}</Text>
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>


                <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.doctor_by_state({ state1: 'Peru' }) }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 30, height: 30, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Peru.png')} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Peru</Text>
                            <Text style={{ color: 'gray', fontSize: 13, marginTop: 1 }}>{this.props.doctors}</Text>
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>


                <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.doctor_by_state({ state1: 'Maxico' }) }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 30, height: 30, borderRadius: 100, tintColor: 'white' }} source={require('../assets/icons1_11.png')} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Maxico</Text>
                            <Text style={{ color: 'gray', fontSize: 13, marginTop: 1 }}>{this.props.doctors}</Text>
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>


                 <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.doctor_by_state({ state1: 'Spain' }) }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 30, height: 30, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Spain.png')} />
                        </View> 

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Spain</Text>
                            <Text style={{ color: 'gray', fontSize: 13, marginTop: 1 }}>{this.props.doctors}</Text>
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>


               {/* <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.doctor_by_state({ state1: 'New Mexico' }) }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 40, height: 40, borderRadius: 100, tintColor: 'white' }} source={require('../assets/icons1_11.png')} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>New Mexico</Text>
                            <Text style={{ color: 'gray', fontSize: 13, marginTop: 1 }}>{this.props.doctors}</Text>
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>


                <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.doctor_by_state({ state1: 'Florida' }) }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 35, height: 35, borderRadius: 100, tintColor: 'white', resizeMode: 'contain' }} source={require('../assets/058_03.png')} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Florida</Text>
                            <Text style={{ color: 'gray', fontSize: 13, marginTop: 1 }}>{this.props.doctors}</Text>
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View> */}









                {/* <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.doctor_by_state({ state1: 'Mississippi' }) }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 30, height: 30, borderRadius: 100, tintColor: 'white' }} source={require('../assets/058_13.png')} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Mississippi</Text>
                            <Text style={{ color: 'gray', fontSize: 13, marginTop: 1 }}>{this.props.doctors}</Text>
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity> */}

                {/* <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View> */}

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
        Physician: state.Physician,
        Pediatric: state.Pediatric,
        Dermatology: state.Dermatology,
        Orthopedician: state.Orthopedician,
        Neurologists: state.Neurologists,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (Categories, Dentist, doctors, Cardiology, Physician, Pediatric, Dermatology, Orthopedician, Neurologists) => { dispatch({ type: "spanish_lang", payload: Categories, Dentist, doctors, Cardiology, Physician, Pediatric, Dermatology, Orthopedician, Neurologists }) },
        english_lang: (Categories, Dentist, doctors, Cardiology, Physician, Pediatric, Dermatology, Orthopedician, Neurologists) => { dispatch({ type: "english_lang", payload: Categories, Dentist, doctors, Cardiology, Physician, Pediatric, Dermatology, Orthopedician, Neurologists }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Patient_Site_DoctorCategory);