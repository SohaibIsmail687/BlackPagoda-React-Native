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
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Connection from "../connection";
import ImageLoad from 'react-native-image-placeholder';
import StarRating from 'react-native-star-rating';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
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
import getDistance from "geolib/es/getDistance";

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

  
 class Top_All_Doctor extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
        isOn: false,
        data5:[],
        data6:[],

        skalton:true,
 
        location: '',
        lat: 32.1014,
        lng: 74.8800,
    }
  }



  backAction = () => {
    // BackHandler.exitApp()
    // Actions.Roll_Screen()
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

    // let user = await AsyncStorage.getItem('customer');


    // let parsed = JSON.parse(user);

    // let id = parsed[0].id;
    // let latitude = parsed[0].lat;
    // let longitude = parsed[0].lng;
    // let lat = parseFloat(latitude);
    // let lng = parseFloat(longitude);

    var today = new Date();
    var nextweek_T = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let date0 = nextweek_T.toString()
    let ddd = date0.split(' ')
    let day_1 = ddd[0]
    let dd_2 = ddd[1]
    let dd_3 = ddd[2]
    let dd_4 = ddd[3]
    let final_date_1 = dd_2 + ' ' + dd_3 + ', ' + dd_4
    console.log('sssssssssss', final_date_1)

    this.setState({

        id: '9',
        // lat: lat,
        // lng: lng,
        day_1: day_1,
        final_date_1: final_date_1,
        // userlat: lat,
        // userlng: lng
 


    })

    console.log("category", this.props.category);
   




    
        this.doctors_all_fav()

     
}

 
doctors_all_fav = () => {
    

    let api = Connection + "rest_apis.php?action=all_doctors";
    //   console.log("pass => ", api);
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        otherHeader: "foo",
      },
      // body: uploaddata,
    })
      .then((response) => response.json())
      .then((response) => {

        let record = response.response


        console.log('mondddddddddddayyyyyyyyyy', record)


        if (record != 'fail') {



          this.setState({
            data5: record,
            data6: record,

            skalton:false
          })

          // console.log('mondddddddddddayyyyyyyyyy',this.state.tuesday1)



        }else {
            this.setState({
             
                skalton:false
              })
        }

      })
      .catch((error) => {
        console.error(error);
      });

  };


  Serach_doctor = (val) => {
    this.setState({ skalton: true })


    let uploaddata = new FormData();




    this.setState({ spinner: true });
    console.log('name', val);
    let name1 = val['name']
    console.log('name1name1name1name1', name1);
    console.log('name1name1name1name1', this.props.sub_category);


    // console.log('s_id',this.props.s_id);
    // console.log('rating',this.state.user_rating);
    // console.log('comment',this.state.comment);

    //  console.log("eamilllllllllll =>",newImage)
    uploaddata.append('name', name1);
    // uploaddata.append('category', this.props.category);

    //  uploaddata.append('s_id',this.props.s_id);
    //  uploaddata.append('rating',this.state.user_rating);
    //  uploaddata.append('comment',this.state.comment);


    let api = Connection + 'rest_apis.php?action=search_doctor';
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
            console.log("responsesearch", response.response)

            let record = response.response;

            if (record != 'fail') {
                this.setState({
                    data5: record,
                    skalton: false
                })

            }

            else {
                
                // setTimeout(()=>{
                //   this.setState({
                //     spinner:false
                //   })
                // //  Actions.LoginScreen()
                // },100)

                this.setState({
                    data5: [],
                    skalton: false


                })
            }

        })
        .catch((error) => {
            console.error(error);
        });

}




createtable1 = () => {
    let table = []
    let record1 = this.state.data5
    let len = record1.length
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record1[i].name
        let category = record1[i].category
        let fee = record1[i].fee
        let address = record1[i].address
        let fcm_token = record1[i].fcm_token
        let doctor_id = record1[i].id
        let lat1 = record1[i].lat
        let lng1 = record1[i].lng
        let lat = parseFloat(lat1);
        let lng = parseFloat(lng1);
        let experience = record1[i].experience
        let avg_rating = record1[i].avg_rating
        let total_review = record1[i].total_review
        let a_r = Number(avg_rating).toFixed(2);
        let degree = record1[i].degree
        let license_number = record1[i].license_number
        let c_name = record1[i].c_name
        let appointment = record1[i].appointment
        let s_key = record1[i].s_key
        let paypal = record1[i].paypal
        let access = record1[i].access
        let online = record1[i].online
        let email = record1[i].email
        let app = record1[i].app
        let stripe_key = record1[i].stripe_key

        let profile1 = record1[i].profile
        let profile = Connection + 'images/' + profile1
        table.push(<View>
          {


<View  style={{paddingVertical:10,paddingHorizontal:10,shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3,marginLeft:7,marginRight:7,marginBottom:5,  width:width/1.1, backgroundColor:'white',borderRadius:8,alignSelf:'center',marginTop:10 }}>
<View 
style={{ flexDirection:'row', alignItems:'center',justifyContent:'space-between', }}>
<ImageLoad
style={{ width: 70, height: 70, borderRadius: 70,}}
loadingStyle={{ size: 'large', color: 'blue' }}
source={{ uri: profile }}
borderRadius={100}
placeholderStyle={{ width: 70, height: 70, borderRadius: 70,}}
/>

<View style={{width:'80%', marginLeft:10}}>
<Text style={{color:'black',fontWeight:'bold',fontSize:15}}>Dr. {name}</Text>
<Text style={{color:'#bebebe',fontSize:12}}>{category}</Text>

<View style={{flexDirection:'row',alignItems:'center',}}>

<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
 <Icon  name="shopping-bag" type="Foundation" style={{ color: "#2597CB", fontSize: 15}}/>
 <Text style={{ color: 'black', fontSize: 12, fontWeight: '400' }}> {experience} years</Text>
</View> 
<View style={{ flexDirection: 'row', marginLeft:20, alignItems: 'center', marginTop: 3 }}>
 <Icon  name="star" type="AntDesign" style={{ color: "#F5C60D", fontSize: 15}}/>
 <Text style={{ color: 'black', fontSize: 12, fontWeight: '400' }}> {a_r}</Text>
</View>
  </View> 

</View>

</View>


<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:10}}>
<View style={{   marginLeft:10, alignItems: 'center', marginTop: 3 }}>
<Text style={{ color: 'gray', fontSize: 12, fontWeight: 'bold' }}>Total Fee</Text>

 <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>${fee}</Text>
</View>


<TouchableOpacity  onPress={() => Actions.Doctor_Appointment_Profile_1({stripe_key:stripe_key, app: app, fcm_token: fcm_token, s_key: s_key, paypal: paypal, access: access, name1: name, profile: profile, category: category, doctor_id: doctor_id, experience: experience, fee: fee, address: address, lat: lat, lng: lng, total_review: total_review, a_r: a_r, license_number: license_number, degree: degree, c_name: c_name, appointment: appointment })} activeOpacity={0.8}
   style={{ width:  '76%',   paddingVertical: 13, justifyContent: 'center', alignItems: 'center', borderRadius: 24, backgroundColor: '#2597CB' }}>
   <Text style={{ color: 'white',fontWeight:'bold' }}>Book Appointment</Text>
</TouchableOpacity>

</View>

</View>




          }
        </View>
        )
      }
      return table
    }
    else {
      let img = []
      img.push(<View style={{ flex: 1, justifyContent: 'center' }} >
        {
          <View>

          </View>
        }</View>)
      return img
    }
  }



  doctors_by_categy_map = () => {

    this.setState({ spinner_1: true });

    let api = Connection + "rest_apis.php?action=all_doctors_1";
      console.log("pass => ", api);
    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            otherHeader: "foo",
        },
        // body: uploaddata,
    })
        .then((response) => response.json())
        .then((response) => {
            let table = [];
            let map_arr = [];
          let  first_lat_1="";
          let first_lng_1="";

            let record = response.response
            let len = record.length;

            if (record != 'fail') {
                for (let i = 0; i < len; i++) {
                    let lat = record[i].lat;
                    let lng = record[i].lng;
                    let first_lat = record[0].lat;
                    let first_lng = record[0].lng;
                   
                    let name = record[i].name;
                    let add = record[i].add;

                    let profile1 = record[i].profile
                    let profile = Connection + 'images/' + profile1 

                    let email = record[i].email
                    let mobile_number = record[i].mobile_number
                    let category = record[i].category
                    let fee = record[i].fee
                    let address = record[i].address
                    let doctor_id = record[i].id
                    let experience = record[i].experience
                    let avg_rating = record[i].avg_rating
                    let total_review = record[i].total_review
                    let city = record[i].city
    
                    let a_r = Number(avg_rating).toFixed(2);
    
                    let degree = record[i].degree
                    let license_number = record[i].license_number
                    let c_name = record[i].c_name
                    let appointment = record[i].appointment
                    let s_key = record[i].s_key
                    let paypal = record[i].paypal
                    let access = record[i].access
                    let fcm_token = record[i].fcm_token
                    let online = record[i].online
                    let app = record[i].app


                    let d_lat = parseFloat(lat);
                    let d_lng = parseFloat(lng);
                        first_lat_1 = parseFloat(first_lat);
                      first_lng_1 = parseFloat(first_lng);
                    let coordinate = {
                        latitude: d_lat,
                        longitude: d_lng,
                    };
                    // 5000000
                    let test ={
                        coordinate,
                        name:name,
                        add:add,
                        email:email,
                        mobile_number:mobile_number,
                        category:category,
                        fee:fee,
                        address:address,
                        doctor_id:doctor_id,
                        experience:experience,
                        total_review:total_review,
                        city:city,
                        a_r:a_r,
                        degree:degree,
                        license_number:license_number,
                        c_name:c_name,
                        appointment:appointment,
                        s_key:s_key,
                        paypal:paypal,
                        access:access,
                        fcm_token:fcm_token,
                        online:online,
                        app:app,
                        profile:profile,
                        doc_lat:d_lat,
                        doc_lng:d_lng,

                    }
                  
    
        console.log('mondddddddddddayyyyyyyyyy', coordinate)
        console.log('mondddddddddddayyyyyyyyyycoordinate              ', test)

              
        

                    if (
                        getDistance(
                            {
                                latitude: this.state.userlat,
                                longitude: this.state.userlng,
                            },
                            coordinate
                        ) <= 15000
                    ) {
                        table.push(record[i]);
                        map_arr.push(test)

                    }
          
                }

                console.log('map_arrmap_arrmap_arrmap_arrmap_arrmap_arr', map_arr)

            }

            else {
                this.setState({
                    data2: [],
                    spinner_1: false
                })
            }
            this.setState({
                data2: table,
                skalton: false,
                map_arr:map_arr,
                spinner_1: false
            }) 

            Actions.new_animated({map_arr:this.state.map_arr,lat:first_lat_1,lng:first_lng_1,userlat:this.state.userlat,userlng:this.state.userlng})

        })
        .catch((error) => {
            console.error(error);
        });

};






  render() {

 
    return (

        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={{flex:1}}>

        <View style={{flex:1,backgroundColor:'#f6f6f6'}}>

                <View style={{ paddingHorizontal: 5,   shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, backgroundColor: '#2597CB' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                         
                    </View>

                    {this.props.Search==true?    
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 15,width:width/1-15,alignSelf:'center'}}>
                       
                       
                       <TouchableOpacity activeOpacity={0.8}  
                             style={{ height: 38, width: 38, borderRadius: 5, justifyContent: 'center', alignItems: 'center', }}>
                                      <Icon onPress={() => { Actions.pop() }} name="keyboard-backspace" type="MaterialCommunityIcons" style={{ color: "white", fontSize: 28 }} />

                         </TouchableOpacity>
                       
                        <View style={{width:'75%'}}>
                             <TextInput style={{ width:'100%', color: 'black',backgroundColor:'white', borderRadius: 30, height: 40, paddingLeft: 35 }} placeholder="Search for Doctor" placeholderTextColor='gray'   />
                             <Icon name="search1" type="AntDesign" style={{ color: "gray", fontSize: 15, position: 'absolute', top: 12, left: 12 }} />
                        </View>
                        {/* onPress={() => Actions.Map_Screen({ user_c_lat: this.state.lat, user_c_lng: this.state.lng, category: this.props.category, })} */}
                         <TouchableOpacity   activeOpacity={0.8} 
                             style={{ height: 38, width: 38, borderRadius: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 0.7, borderColor: 'white' }}>
                             <Icon name="google-maps" type="MaterialCommunityIcons" style={{ color: "white", fontSize: 25 }} />
                         </TouchableOpacity>
                    </View>

                   :

                   <View></View>
                   }                   
                </View>

                  
            <ScrollView>

                {/* onPress={() => Actions.Map_Screen({ user_c_lat: this.state.lat, user_c_lng: this.state.lng, category: this.props.category,all:true   })}  */}

    
            {this.state.skalton == true ?


<SkeletonPlaceholder>
    <View
        style={{
            width: "90%",
            alignSelf: "center",
            height: 130,
            borderRadius: 12,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 30,
            backgroundColor: 'white'
        }}
    ></View>

    <View
        style={{
            width: "90%",
            alignSelf: "center",
            height: 130,
            borderRadius: 12,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 30,
            backgroundColor: "white",
        }}
    ></View>


    <View
        style={{
            width: "90%",
            alignSelf: "center",
            height: 130,
            borderRadius: 12,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 30,
            backgroundColor: "white",
        }}
    ></View>



    <View
        style={{
            width: "90%",
            alignSelf: "center",
            height: 130,
            borderRadius: 12,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 30,
            backgroundColor: "white",
        }}
    ></View>


    <View
        style={{
            width: "90%",
            alignSelf: "center",
            height: 130,
            borderRadius: 12,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 30,
            backgroundColor: "white",
        }}
    ></View>

</SkeletonPlaceholder>
:
<View>

    {this.state.data5 == "" ?
        <View style={{ alignItems: 'center', justifyContent: 'center', height: height / 2 }}>
            <Text style={{}}>
            No doctor found
            </Text>
        </View>
        :
        <View style={{ paddingBottom: 20,marginTop:20 }}>
            {this.createtable1()}
        </View>
    }

</View>
}


 




 




 








               

            </ScrollView>

            {this.state.spinner_1 == true &&
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
}}

const mapStateToProps = (state) => {
    return {
        Reviews: state.Reviews,
        Search_for: state.Search_for,
        No_doctor_found_of_this_category: state.No_doctor_found_of_this_category,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (Reviews, Search_for, No_doctor_found_of_this_category) => { dispatch({ type: "spanish_lang", payload: Reviews, Search_for, No_doctor_found_of_this_category }) },
        english_lang: (Reviews, Search_for, No_doctor_found_of_this_category) => { dispatch({ type: "english_lang", payload: Reviews, Search_for, No_doctor_found_of_this_category }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Top_All_Doctor);