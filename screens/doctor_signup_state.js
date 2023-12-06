
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
    ToastAndroid,
    AsyncStorage
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
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
import Connection from "../connection";

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


    Sign_Up = (val) => {

        const newImage = {
            uri: this.props.image1,
            name: "my_photo.jpg",
            type: "image/jpg",
        };


        const newImage1 = {
            uri: this.props.image2,
            name: "my_photo.jpg",
            type: "image/jpg",
        };
        let uploaddata = new FormData();

        console.log('image2222222222222222222222222', newImage1)


        // if (this.state.imagecheck == false) {
        //     console.log("image not");
        //     uploaddata.append("photo", "false");
        // } else {
        //     console.log("image");

        //     uploaddata.append("photo", "true");

        //     uploaddata.append("image", newImage);
        // }



        // let name = this.state.name;
        // let password = this.state.password;
        // let email = this.state.email;
        // let address = this.state.address;
        // let city = this.state.city;
        // let gender = this.state.gender;

        // let license_number = this.state.license_number;
        // let degree = this.state.degree;
        // let category = this.state.category;
        // let experience = this.state.experience;
        // let mobile_number = this.props.mobile_number;
        // let role = this.props.role;

        // let fee = this.state.fee;
        // let fcm_token = this.state.token;




 
       


          


            this.setState({ spinner: true });

            uploaddata.append("name", this.props.name1);
            uploaddata.append("email",this.props.email);
            uploaddata.append("mobile_number", this.props.mobile_number);

            uploaddata.append("city", val);
            uploaddata.append("address", this.props.address);
            uploaddata.append("gender", this.props.gender);

            uploaddata.append("license_number", this.props.license_number);
            uploaddata.append("degree", this.props.degree);
            uploaddata.append("category", this.props.category);
            uploaddata.append("experience", this.props.experience);
            uploaddata.append("role", this.props.role);
            uploaddata.append("password", this.props.password);


            uploaddata.append("fee", this.props.fee);
            uploaddata.append("fcm_token", this.props.fcm_token);
            uploaddata.append("image1", newImage1);
            uploaddata.append("image", newImage);
            uploaddata.append("lat", this.props.lat);
            uploaddata.append("lng", this.props.lng);
            uploaddata.append("clinic", this.props.clinic);








            //  uploaddata.append('newImage', newImage);

            let api = Connection + "rest_apis.php?action=Add_doctor";
            console.log("pass => ", api);
            fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    otherHeader: "foo",
                },
                body: uploaddata,
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log("response", response.response);

                    if (response.response == "repeat") {
                        this.setState({
                            spinner: false,
                        });
                        alert(this.props.This_number_is_already_exists);
                    } else {

                        this.setState({
                            spinner: false,
                        });
                        AsyncStorage.setItem('customer', JSON.stringify(response.response));

                        ToastAndroid.show(this.props.You_successfully_registered_as_doctor, ToastAndroid.SHORT);
                        Actions.add_schedulling({ role: this.props.role });
                        // Actions.add_scheduling({role:this.props.role,profile:this.state.image1,name1:this.state.name,category:this.state.category,});

                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        
    };

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
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>     </Text>
                  
                    {/* <Icon name="wallet-outline" type="Ionicons" style={{ color: "black", fontSize: 19 }} /> */}
                </View>

                {/* <Text style={{color:'black',fontWeight:'bold',paddingHorizontal:18,marginTop:7,fontSize:25}}>Categories</Text> */}

                <TouchableOpacity onPress={() => { this.Sign_Up('Colombia') }} activeOpacity={0.8}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 30, height: 30, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Colombia.png')} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Colombia</Text>
                            {/* <Text style={{ color: 'gray', fontSize: 13, marginTop: 1 }}>{this.props.doctors}</Text> */}
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>


                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.Sign_Up('Peru') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 30, height: 30, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Peru.png')} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Peru</Text>
                            {/* <Text style={{ color: 'gray', fontSize: 13, marginTop: 1 }}>{this.props.doctors}</Text> */}
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>


                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.Sign_Up('Maxico') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 30, height: 30, borderRadius: 100, tintColor: 'white' }} source={require('../assets/icons1_11.png')} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Maxico</Text>
                            {/* <Text style={{ color: 'gray', fontSize: 13, marginTop: 1 }}>{this.props.doctors}</Text> */}
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>

 
                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.Sign_Up('Spain') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 30, height: 30, borderRadius: 100, tintColor: 'white' }} source={require('../assets/Spain.png')} />
                        </View> 

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Spain</Text>
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>


              {/*  <TouchableOpacity activeOpacity={0.8} onPress={() => { this.Sign_Up('New Mexico') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 40, height: 40, borderRadius: 100, tintColor: 'white' }} source={require('../assets/058_09.png')} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>New Mexico</Text>
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View>


                <TouchableOpacity activeOpacity={0.8} onPress={() => { this.Sign_Up('Florida') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#38b6ff' }}>
                            <Image style={{ width: 35, height: 35, borderRadius: 100, tintColor: 'white', resizeMode: 'contain' }} source={require('../assets/058_03.png')} />
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Florida</Text>
                        </View>
                    </View>

                    <Icon name="chevron-right" type="Entypo" style={{ color: "gray", fontSize: 20 }} />
                </TouchableOpacity>

                <View style={{ width: width / 1.3, alignSelf: 'flex-end', borderBottomWidth: 0.7, borderColor: 'lightgray', marginVertical: 10 }}></View> */}
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
                            <UIActivityIndicator color='#38b6ff' />
                            <Text style={{ fontSize: 16, color: '#38b6ff', fontWeight: 'bold' }}>{this.props.Progressing_your_request}</Text>
                        </View>
                    </View>
                }

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
        This_number_is_already_exists: state.This_number_is_already_exists,
        You_successfully_registered_as_doctor: state.You_successfully_registered_as_doctor,
        Progressing_your_request:state.Progressing_your_request
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (Categories,Progressing_your_request,This_number_is_already_exists,You_successfully_registered_as_doctor, Dentist, doctors, Cardiology, Physician, Pediatric, Dermatology, Orthopedician, Neurologists) => { dispatch({ type: "spanish_lang", payload: Categories, Dentist,Progressing_your_request, doctors,This_number_is_already_exists, Cardiology,You_successfully_registered_as_doctor, Physician, Pediatric, Dermatology, Orthopedician, Neurologists }) },
        english_lang: (Categories,Progressing_your_request,This_number_is_already_exists,You_successfully_registered_as_doctor, Dentist, doctors, Cardiology, Physician, Pediatric, Dermatology, Orthopedician, Neurologists) => { dispatch({ type: "english_lang", payload: Categories, Dentist,Progressing_your_request, doctors,This_number_is_already_exists, Cardiology,You_successfully_registered_as_doctor, Physician, Pediatric, Dermatology, Orthopedician, Neurologists }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Patient_Site_DoctorCategory);