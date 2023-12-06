
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
    Modal,
    AsyncStorage,
    ImageBackground,
    Dimensions,
    BackHandler
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

var hobbies = [
    { label: "English", value: 0 },
    { label: "Spanish", value: 1 },
];


 

class Roll_Screen extends React.Component {




    constructor(props) {

        super(props)

        this.state = {

            text1: 1,
            text2: 1,
            text3: 1,
            check_design: 'User',
            lang:0,
            role:''
        }
    }

    backAction = () => {
        BackHandler.exitApp()
        return true;
    };


    componentWillUnmount() {
        this.backHandler.remove();
    }



    componentDidMount = async () => {
        let lang = await AsyncStorage.getItem('lang');
    let parsed1 = JSON.parse(lang);
    console.log('llllllllllllll',lang)
    if(parsed1!=null){
let lang1=parsed1[0].default
console.log('llllllllllllllressssssssss',lang1)
if(lang1=='English'){
    this.setState({
        lang:0
    })
} else {
    this.setState({
        lang:1
    })
}
    } else {
        this.setState({
            lang:0
        }) 
    }
    console.log('LLLLLLLLLLLLLLAAAAAAAA',this.state.lang)
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

    }


    changebtn(value, val) {


        if (this.state[value] == 2) {



            this.setState({
                text1: 1,
                text2: 1,


                [value]: 2,


            })
        }
        else {
            this.setState({
                text1: 1,
                text2: 1,

                [value]: 2,


            })

        }
        this.setState({
            check_design: val
        })
    }


    Role_change(value) {
        console.log(value)
        if (value == 0) {
            this.setState({ sell: 'Female' })
        
            this.english_lang()

        }
        else if (value == 1) {
            this.setState({ sell: 'Male' })
           
            this.spanish_lang()

        }
        else { }
    }

    spanish_lang = async () => {

        this.props.spanish_lang();
        if (this.state.role == 'user') {
            // Actions.HomeSreen();
        }
        else {
            // Actions.HomeSreen1();
        }


        AsyncStorage.setItem('lang', JSON.stringify([{ default: 'Spanish' }]));

        // AsyncStorage.removeItem("lanuage")

        // AsyncStorage.removeItem( 'lanuage' )
        // .then( data => {
        //   data = JSON.parse( data );



        //   AsyncStorage.setItem( 'lanuage', JSON.stringify( this.props.lanuage1 ) );
        // }).done();
        //   console.log('dddddddddddddddddddddddddddddddddddddd=>',this.props.lanuage);


        //  AsyncStorage.setItem( 'lanuage', JSON.stringify( this.props.lanuage1 ) );

        //     let lanuage = await AsyncStorage.getItem("lanuage");

        //     let parsed1 = JSON.parse(lanuage); 
        // console.log('dddddddddddddddddddddddddddddddddddddd=>',parsed1);

        //     let city_lang = parsed1[0].city_lang;

        // this.setState({
        //   city_lang:city_lang
        // })

    };


    english_lang = async () => {

        this.props.english_lang();
        if (this.state.role == 'user') {
            // Actions.HomeSreen();
        }
        else {
            // Actions.HomeSreen1();
        }
        //  Actions.HomeSreen();


        AsyncStorage.setItem('lang', JSON.stringify([{ default: 'English' }]));
        // let lanuage = await AsyncStorage.getItem("lanuage");

        // let parsed1 = JSON.parse(lanuage); 
        // console.log('dddddddddddddddddddddddddddddddddddddd=>',parsed1);

        //   console.log('dddddddddddddddddddddddddddddddddddddd=>',this.props.lanuage1);


        // AsyncStorage.removeItem( 'lanuage' )
        // .then( data => {
        //   data = JSON.parse( data );



        //  AsyncStorage.setItem( 'lanuage', JSON.stringify( this.props.lanuage ) );
        // }).done();

        //    AsyncStorage.removeItem("lanuage")

        //      AsyncStorage.setItem( 'lanuage', JSON.stringify( this.props.lanuage ) );


        //     let lanuage = await AsyncStorage.getItem("lanuage");



        //     let parsed1 = JSON.parse(lanuage); 
        // //     let city_lang = parsed1[0].city_lang;

        // // this.setState({
        // //   city_lang:city_lang
        // // })
        // console.log('dddddddddddddddddddddddddddddddddddddd=>',parsed1);






        // AsyncStorage.setItem("lanuage", JSON.stringify(arr1));

        //   console.log("////////////////////////////////",this.props.lanuage)

    };




    
  
changebtn(value, val) {
  
    this.setState({
        role:val
    })
    
      if (this.state[value] == 2) {
    
    
    
          this.setState({
              text1: 1,
              text2: 1,
              text3: 1,
              text4: 1,
              text5: 1,
              text6: 1,
              text7: 1,
              text8: 1,
              [value]: 2,
    
    
          })
      }
      else {
          this.setState({
              text1: 1,
              text2: 1,
              text3: 1,
              text4: 1,
              text5: 1,
              text6: 1,
              text7: 1,
              text8: 1,
              [value]: 2,
    
    
          })
    
      }
     
    }


    check_role=()=>{
        if(this.state.role==""){
            alert("Please select your role.")
        } else {
            Actions.Login_Screen({role:this.state.role})
        }
    }
    


    render() {


        return (

            <View style={{ flex: 1, backgroundColor:'white' }}>
               
               <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 22, marginTop:40, marginLeft:20 }}>Select Role</Text>
              
              
                <Text style={{ color: 'black',   fontSize: 15, paddingHorizontal:20, marginTop:10}}>To book appointment, simply click on Login as a patient. Else, click on Login as a Doctor to consult your patients.</Text>
               
<TouchableOpacity  onPress={() => this.changebtn("text1", 'user')}  activeOpacity={1}
    style={{ width: width / 1.1, marginTop: 20, alignSelf: 'center', backgroundColor: 'white', borderRadius: 8, paddingVertical: 15, paddingHorizontal: 20, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 2, backgroundColor: 'white' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Image style={{ width: 30, height: 30, borderRadius: 12 }} resizeMode="contain" source={require('../assets/paypal.png')} /> */}
    <Icon   name="user-injured" type="FontAwesome5" style={{ color: "#2597CB", fontSize: 24 }} />
         
         
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14, marginLeft: 10 }}>Login as Patient</Text>
        </View>


        <View style={{flexDirection:'row',alignItems:'center',paddingVertical:5}}>

<TouchableOpacity onPress={() => this.changebtn("text1", 'user')} activeOpacity={0.8}  style={{width:25,height:25,borderRadius:100,borderColor:'#2597CB',alignItems:'center',justifyContent:'center',borderWidth:2}}>
<View style={(this.state.text1 == 1 ? styles.uncheked : styles.checked)}>

</View>
</TouchableOpacity>
</View>
    </View>
</TouchableOpacity>




<TouchableOpacity onPress={() => this.changebtn("text2", 'doctor')} activeOpacity={1}
    style={{ width: width / 1.1, marginTop: 20, alignSelf: 'center', backgroundColor: 'white', borderRadius: 8, paddingVertical: 15, paddingHorizontal: 20, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 2, backgroundColor: 'white' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Image style={{ width: 30, height: 30, borderRadius: 12 }} resizeMode="cover" source={require('../assets/lovepik-doctor-png-image_400179598_wh860-removebg-preview.png')} /> */}
          
    <Icon   name="user-md" type="FontAwesome5" style={{ color: "#2597CB", fontSize: 24 }} />
          
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14, marginLeft: 10 }}>Login as Doctor</Text>
        </View>


        <View style={{flexDirection:'row',alignItems:'center',paddingVertical:5}}>

<TouchableOpacity onPress={() => this.changebtn("text2", 'doctor')} activeOpacity={0.8}    style={{width:25,height:25,borderRadius:100,borderColor:'#2597CB',alignItems:'center',justifyContent:'center',borderWidth:2}}>
<View style={(this.state.text2 == 1 ? styles.uncheked : styles.checked)}>

</View>
</TouchableOpacity>
</View>
    </View>
</TouchableOpacity>








<TouchableOpacity activeOpacity={0.8} onPress={() => { this.check_role() }}
                 style={{width:width/1.1,justifyContent:'center',alignItems:'center',borderRadius:8,backgroundColor:'#2597CB',height:50,alignSelf:'center',marginTop:30}}>
                 <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Continue</Text>
             </TouchableOpacity>
               
{/*                
                <TouchableOpacity activeOpacity={0.8} onPress={()=>Actions.Patient_Login_Screen({role:'user'})} style={{width:width/1.1, alignSelf:'center', borderWidth:1, borderColor:'black', borderRadius:100, flexDirection:'row', alignItems:'center',justifyContent:'space-between',paddingHorizontal:10,paddingVertical:7, marginTop:50}} >
                <View style={{width:50, height:50, borderRadius:100, alignItems:'center', justifyContent:'center', backgroundColor:'#5fa746'}}>
    <Icon   name="user-injured" type="FontAwesome5" style={{ color: "white", fontSize: 24 }} />

    </View>


<Text style={{fontSize:16, fontWeight:'bold', width:'65%'}}>Login as a Patient</Text>


<View style={{width:50, height:50, borderRadius:100, alignItems:'center', justifyContent:'center', backgroundColor:'#5fa746'}}>
    <Icon   name="chevron-circle-right" type="FontAwesome5" style={{ color: "white", fontSize: 24 }} />

    </View>

                    </TouchableOpacity> */}




                    
                {/* <TouchableOpacity activeOpacity={0.8} onPress={()=>Actions.Patient_Login_Screen({role:'doctor'})} style={{width:width/1.1, alignSelf:'center', borderWidth:1, borderColor:'black', borderRadius:100, flexDirection:'row', alignItems:'center',justifyContent:'space-between',paddingHorizontal:10,paddingVertical:7, marginTop:20}}  >
                <View style={{width:50, height:50, borderRadius:100, alignItems:'center', justifyContent:'center', backgroundColor:'#5fa746'}}>
    <Icon   name="user-md" type="FontAwesome5" style={{ color: "white", fontSize: 24 }} />

    </View>


<Text style={{fontSize:16, fontWeight:'bold', width:'65%'}}>Login as a Doctor</Text>


<View style={{width:50, height:50, borderRadius:100, alignItems:'center', justifyContent:'center', backgroundColor:'#5fa746'}}>
    <Icon   name="chevron-circle-right" type="FontAwesome5" style={{ color: "white", fontSize: 24 }} />

    </View>

                    </TouchableOpacity> */}
               
               
                {/* <View style={{ width: width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 35, marginTop: 50 }}>
                    <TouchableOpacity style={(this.state.text1 == 1 ? styles.in_active_button : styles.active_button)} onPress={() => this.changebtn("text1", 'User')}>
                        <Image style={{ borderRadius: 10, width: 100, height: 100 }} source={require('../assets/Patient_1.png')} />
                        <Text style={(this.state.text1 == 1 ? styles.in_active_text : styles.active_text)}>{this.props.Patient}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={(this.state.text2 == 1 ? styles.in_active_button : styles.active_button)} onPress={() => this.changebtn("text2", 'Doctor')}>
                        <Image resizeMode='contain' style={{ borderRadius: 10, width: 110, height: 120 }} source={require('../assets/Doctor_2.png')} />
                        <Text style={(this.state.text2 == 1 ? styles.in_active_text : styles.active_text)}>{this.props.Doctor}</Text>
                    </TouchableOpacity>
                </View> */}

                <Text style={{ color: 'gray', textAlign: 'center', maxWidth: '70%', alignSelf: 'center', marginTop: 50 }}>@ All Rights Reversed. Cannatherapia</Text>

              
           
     
             
                <View style={{ width: width, height: height / 10 }}></View>

                <Image source={require("../assets/canna1.png")} style={{width:width/1.2,height:height/4,alignSelf:'center'}} resizeMode='contain' />

{/* 
                {this.state.check_design == 'User' ?
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Patient_Login_Screen({ role: 'user' }) }}>
                        <View style={{ width: width / 1.5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', paddingVertical: 17, marginTop: 10, backgroundColor: '#5fa746', alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.props.Continue}</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Patient_Login_Screen({ role: 'doctor' }) }}>
                        <View style={{ width: width / 1.5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', paddingVertical: 17, marginTop: 10, backgroundColor: '#5fa746', alignSelf: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.props.Continue}</Text>
                        </View>
                    </TouchableOpacity>
                } */}

                {/* <Text style={{ color: '#5fa746', fontWeight: 'bold', fontSize: 14, textAlign: 'center', marginTop: 20 }}>{this.props.Prefer_not_to_choose}</Text> */}
            </View>

        )
    }
}

const styles = StyleSheet.create({

    active_button: {
        justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: '#5fa746', width: '47%', height: height / 4, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3
    },
    in_active_button: {
        justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: 'white', width: '47%', height: height / 4
    },


    active_text: {
        color: 'white', fontWeight: 'bold', marginTop: 10, fontSize: 16
    },
    in_active_text: {
        color: 'gray', fontWeight: 'bold', marginTop: 10, fontSize: 16
    },

    checked: {
        width:17,height:17, backgroundColor:'#2597CB',borderRadius:30
      },
    
      uncheked: {
        width:17,height:17,borderRadius:100,
      },
})


const mapStateToProps = (state) => {
    return {
        Which_one_are_you: state.Which_one_are_you,
        Patient: state.Patient,
        Doctor: state.Doctor,
        To_give_you_a_customize_experience: state.To_give_you_a_customize_experience,
        Continue: state.Continue,
        Prefer_not_to_choose: state.Prefer_not_to_choose,
        Choose_a_language: state.Choose_a_language,
        English: state.English,
        Spanish: state.Spanish,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (Which_one_are_you, Patient, Doctor, To_give_you_a_customize_experience, Continue, Prefer_not_to_choose, Choose_a_language, English, Spanish) => { dispatch({ type: "spanish_lang", payload: Which_one_are_you, Patient, Doctor, To_give_you_a_customize_experience, Continue, Prefer_not_to_choose, Choose_a_language, English, Spanish }) },
        english_lang: (Which_one_are_you, Patient, Doctor, To_give_you_a_customize_experience, Continue, Prefer_not_to_choose, Choose_a_language, English, Spanish) => { dispatch({ type: "english_lang", payload: Which_one_are_you, Patient, Doctor, To_give_you_a_customize_experience, Continue, Prefer_not_to_choose, Choose_a_language, English, Spanish }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Roll_Screen);