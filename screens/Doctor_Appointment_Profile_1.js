
 
import React, { Component } from 'react';
import ImageLoad from 'react-native-image-placeholder';
import ImageViewer from 'react-native-image-zoom-viewer';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import StarRating from 'react-native-star-rating';

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
    AsyncStorage,
    ToastAndroid,
    Modal
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
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
  import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    AnimatedRegion,
    MarkerAnimated,
    Animated,
    Polyline,
} from "react-native-maps";
import RBSheet from "react-native-raw-bottom-sheet";
import { TouchableHighlight } from 'react-native-gesture-handler';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height



class Doctor_Appointment_Profile_1 extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            show: false,
            date1: new Date(),
            mode1: 'time',
            dateshow1: '',
            timeshow1: '',
            timeshow2: '',
            dateshow2: '',
      
            date_1: '',
            date_2: '',
            date_3: '',
            date_4: '',
            date_5: '',
            date_6: '',
            date_7: '',
            day_1: 'aa',
            day_2: '',
            day_3: '',
            day_4: '',
            day_5: '',
            day_6: '',
            day_7: '',
            appointment_date: this.props.final_date_1,
            data9:[],
      
      
      
            arr: [],
            arr1: [],
            arr2: [],
            arr3: [],
            arr4: [],
            arr5: [],
      
      
            record1: [],
            record2: [],
            data4: [],
            monday1: [],
            tuesday1: [],
            wednesday1: [],
            thursday1: [],
            saturday1: [],
            friday1: [],
            sunday1: [],
      
            main_array: [],
      
            category: this.props.day_1,
            text1: 2,
            text2: 1,
            text3: 1,
            text4: 1,
            text5: 1,
            text6: 1,
            text7: 1,
      
            timeSelected: false,
            timeSelected1: false,
            add_new: false,
      
      
            show1: false,
            updated_time: '',
            value_for_updating_index: '',
            changes_time_for_specific_day: this.props.day_1,
            appointment_time: '',
      
            final_date: '',
            spinner: false
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
    //   let user = await AsyncStorage.getItem('customer');
    //   let parsed = JSON.parse(user);
    //   let id = parsed[0].id;
   
      this.setState({

          id: '9',
         


      })

      var today = new Date();
      var nextweek_T = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      let date0 = nextweek_T.toString()
      let ddd = date0.split(' ')
      let day_1 = ddd[0]
      let dd_2 = ddd[1]
      let dd_3 = ddd[2]
      let dd_4 = ddd[3]
      let final_date_1 = dd_2 + ' ' + dd_3 + ', ' + dd_4
      this.setState({
          day_1: day_1,
          final_date_1: final_date_1
      })
      this.backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          this.backAction
      );
      this.get_total_patient()
      this.Get_Data_1()
      this.get_liked_doctor()
  }

     

 
  book_appointment = () => {

    Actions.book_appointment({stripe_key:this.props.stripe_key,experience:this.props.experience,a_r:this.props.a_r, email: this.props.email, fcm_token: this.props.fcm_token, s_key: this.props.s_key, paypal: this.props.paypal, access: this.props.access, doctor_name: this.props.name1, doctor_profile: this.props.profile, category: this.props.category, appointment_type: this.state.appointment_type, fee: this.props.fee, appointment_time: this.state.appointment_time, day_1: this.state.day_1, final_date_1: this.state.final_date_1, doctor_id: this.props.doctor_id, city: this.props.city })


}
    
      createtable1 = () => {
        let table = []
    
    
    
    
    
        let record1 = this.state.main_array
        // console.log(';;;;;;;;;;;;;;;;;;;;',record1)
    
        let len = record1.length
        //  console.log(';;;;;;;;;;;;;;;;;;;;',len)
        if (record1 != 'fail') {
          for (let i = 0; i < len; i++) {
    
    
    
            let doctor_time = record1[i]
            //  console.log('AAAAAAAAAAAAAAAAAAAAAAA',doctor_time)
    
            //       let profile1 = record1[i].user_profile
    
            //       let profile =Connection+'CarFinder/'+profile1
            //   console.log("aaaaaaaaaaaaa",profile);
    
            //       let comment = record1[i].comment
            //       let rating = record1[i].rating
    
    
    
    
    
    
            let boxes = "box" + doctor_time;
            let boxred = "boxred" + doctor_time;
    
            table.push(<View>
              {
    
                <View style={{ flexDirection:'row',alignItems:'center',marginTop:10,marginLeft:3,marginRight:3}}>
                  {this.state[boxred] == true ?
                    <Pressable onPress={() => this.toast()} style={(this.state[boxred] == true ? styles.select_red : styles.unselect_red)} >
                      <Text style={this.state[boxred] == true ? styles.select_text_red : styles.unselect_text_red}>{doctor_time}</Text>
                    </Pressable>
                    :
                    <Pressable onPress={() => this.selected_time(doctor_time, 'selected')} style={(this.state[boxes] == true ? styles.select : styles.unselect)} >
                      <Text style={this.state[boxes] == true ? styles.select_text : styles.unselect_text}>{doctor_time}</Text>
                    </Pressable>
                  }    
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



      toast = () => {
        ToastAndroid.show(this.props.Slot_already_booked, ToastAndroid.SHORT);
      }
    
      traetment = () => {
        if (this.state.appointment_time == '') {
          alert(this.props.Please_select_appointment_time_for_moving_next)
          console.log('aaaa')
        } else {
          this.setState({ spinner: true })
          console.log('categorycategory', this.props.category)
          console.log('doctor_iddoctor_id', this.props.doctor_id)
          console.log('appointment_timeappointment_time', this.state.appointment_time)
          console.log('appointment_dateappointment_date', this.state.appointment_date)
          console.log('changes_time_for_specific_day', this.state.changes_time_for_specific_day)
          setTimeout(() => {
            this.setState({ spinner: false })
            // Actions.treatment_request({ category: this.props.category, doctor_id: this.props.doctor_id, time: this.state.appointment_time, date: this.state.appointment_date, day: this.state.changes_time_for_specific_day, fee: this.props.fee, fcm_token: this.props.fcm_token, doctor_name: this.props.doctor_name, city: this.props.city })
            Actions.Paypal_Options({ category: this.props.category, doctor_id: this.props.doctor_id, time: this.state.appointment_time, date: this.state.appointment_date, day: this.state.changes_time_for_specific_day, appointment_price: this.props.fee, fcm_token: this.props.fcm_token, doctor_name: this.props.doctor_name, city: this.props.city })
            // Actions.Paypal_Options({ time: this.props.time, category: this.props.category, date: this.props.date, day: this.props.day, doctor_id: this.props.doctor_id, appointment_price: this.props.fee, doctor_name: this.props.doctor_name, subject: this.state.subject, r_number: this.state.number, symptoms: this.state.symptoms, multi_Images: this.state.multi_Images, multi_image_check: this.state.multi_image_check, doctor_name: this.props.doctor_name, city: this.props.city })

    
          }, 100);
    
        }
    
      }
    


      onClickImage = async (item) => {
        this.selectedImage = [
            {
                url: item,
                props: {
                    source: item
                },
            },
        ];
        this.setState({
            visible2: true
        })
    }


    onSwipeDown = () => {
        this.setState({
            visible2: false
        })
    }


     

 

  Like_Station = () => {

      this.RBSheet.close()

      this.setState({
          my_like: true,
          spinner: true
      })


      let uploaddata = new FormData();
      uploaddata.append('doctor_id', this.props.doctor_id);
      uploaddata.append('user_id', this.state.id);
      let api = Connection + 'rest_apis.php?action=doctor_like';

      fetch(api, {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
              otherHeader: 'foo',
          },
          body: uploaddata,
      })
          .then(response => response.json())
          .then(response => {
              let record = response.response;
              if (record != 'fail') {
                  this.get_liked_doctor()

              }

          })
          .catch((error) => {
              console.error(error);

          });


  }



  Unlike_Station = () => {
      this.RBSheet.close()

      this.setState({
          my_like: false,
          spinner: true
      })

      let uploaddata = new FormData();
      uploaddata.append('doctor_id', this.props.doctor_id);
      uploaddata.append('user_id', this.state.id);
      let api = Connection + 'rest_apis.php?action=doctor_unlike';

      fetch(api, {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
              otherHeader: 'foo',
          },
          body: uploaddata,
      })
          .then(response => response.json())
          .then(response => {
              let record = response.response;
              if (record != 'fail') {
                  this.get_liked_doctor()

              }

          })
          .catch((error) => {
              console.error(error);

          });


  }


  get_liked_doctor = () => {

      let uploaddata = new FormData();
      uploaddata.append('doctor_id', this.props.doctor_id);
      uploaddata.append('user_id', this.state.id);


      let api = Connection + 'rest_apis.php?action=get_liked_doctor';

      console.log('pass => ', api)
      fetch(api, {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
              otherHeader: 'foo',
          },
          body: uploaddata,
      })
          .then(response => response.json())
          .then(response => {
              let record = response.response;
              console.log('ddddddddddd',response)
              if (record != 'fail') {

                  this.setState({
                      my_like: true,
                      spinner: false
                  })
              } else {
                  this.setState({
                      my_like: false,
                      spinner: false
                  })
              }

          })
          .catch((error) => {
              console.error(error);

          });


  }




    
    get_total_patient = () => {

      let uploaddata = new FormData();
      console.log('doctor_id', this.props.doctor_id);
      uploaddata.append('doctor_id', this.props.doctor_id);
      let api = Connection + 'rest_apis.php?action=get_total_patient';

      console.log('pass => ', api)
      fetch(api, {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
              otherHeader: 'foo',
          },
          body: uploaddata,
      })
          .then(response => response.json())
          .then(response => {

              let record = response.response;

              if (record != 'fail') {

                  let t_p = record[0]
                  this.setState({
                      total_patient: t_p
                  })

              } else {

                  this.setState({
                      total_patient: 0

                  })
              }
          })
          .catch((error) => {
              console.error(error);

          });


  }


 
  Get_Data_1 = () => {
this.setState({
    skalton:true
})
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.props.doctor_id);
    let api = Connection + 'rest_apis.php?action=Get_Reviews_with_user';
    console.log('apiiiii',api)
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            otherHeader: 'foo',
        },
        body: uploaddata,
    })
        .then(response => response.json())
        .then(response => {
            let record = response.response;
            console.log(record)
            if (record != 'fail') {
                let total_review = record[0].total_review
                let avg_rating = record[0].avg_rating
                let a_r = Number(avg_rating).toFixed(2);
                this.setState({
                    data9: record,
                    total_review: total_review,
                    avg_rating: a_r,
                    skalton: false
                })
            } else {
                this.setState({
                    data9: [],
                    skalton: false
                })
            }
        })
        .catch((error) => {
            console.error(error);

        });
}

createtable2 = () => {
    let table = []

    let record1 = this.state.data9
    let len = record1.length
    console.log('lengthhhhhhhhh',len)
    if (record1 != 'fail') {
        for (let i = 0; i < len; i++) {
            let name = record1[i].name
            let profile1 = record1[i].profile
            let profile = Connection + 'images/' + profile1
            let comment = record1[i].comment
            let rating = record1[i].rating
            let date = record1[i].date
            let ss = date.split(' ');
            let date_1 = ss[0]
            let time_1 = ss[1]

            table.push(<View>
                {
  <View activeOpacity={0.8}  
  style={{paddingVertical:10,paddingHorizontal:10, flexDirection:'row',marginBottom:10, width:width/1.2,backgroundColor:'white',borderRadius:8, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3,marginLeft:7,justifyContent:'space-between',}}>

{/* <Image style={{ width: 60, height: 60,borderRadius:12  }} source={require('../assets/doctorr.jpg')} />  */}
<ImageLoad
                              style={{ width: 60, height: 60,borderRadius:12  }}
                                loadingStyle={{ size: 'large', color: 'blue' }}
                                source={{ uri: profile }}
                                borderRadius={150}
                                placeholderStyle={{ width: 60, height: 60,borderRadius:12  }}
                            />
<View style={{width:'85%'}}>


<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'85%',alignSelf:'center'}}>
<Text style={{color:'black',fontSize:12,fontWeight:'bold',marginLeft:-5}}>{name}</Text>
   <View style={{ flexDirection: 'row', alignItems: 'center',   }}>
        {/* <Icon  name="star" type="AntDesign" style={{ color: "#F5C60D", fontSize: 15}}/>
        <Text style={{ color: 'black', fontSize: 12, fontWeight: '400' }}> {a_r}</Text> */}


<StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={rating}
                                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    containerStyle={{ width: width / 4.8 }}
                                    starSize={14}
                                    fullStarColor={'gold'}
                                />
   </View>
</View>
<Text style={{fontSize:12, color:'black',paddingHorizontal:15,maxWidth:'88%' }} numberOfLines={2} >{comment}</Text>

</View>

</View>













                    // <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    //         <ImageLoad
                    //             style={{ width: 44, borderRadius: 44, height: 44 }}
                    //             loadingStyle={{ size: 'large', color: 'blue' }}
                    //             source={{ uri: profile }}
                    //             borderRadius={150}
                    //             placeholderStyle={{ width: 44, borderRadius: 44, height: 44 }}
                    //         />
                    //         <View style={{ marginLeft: 10, width: '60%' }}>
                    //             <Text numberOfLines={1} style={{ color: 'black', fontWeight: 'bold', fontSize: 15, maxWidth: '100%' }}>{name}</Text>
                    //             <Text numberOfLines={2} style={{ color: 'gray', fontSize: 14, maxWidth: '100%' }}>{comment}</Text>
                    //         </View>
                    //     </View>

                    //     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    //         <Text style={{ color: '#565759' }}>{date_1}</Text>
                    //         <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                    //             <StarRating
                    //                 disabled={false}
                    //                 maxStars={5}
                    //                 rating={rating}
                    //                 // selectedStar={(rating) => this.onStarRatingPress(rating)}
                    //                 containerStyle={{ width: width / 4.8 }}
                    //                 starSize={14}
                    //                 fullStarColor={'gold'}
                    //             />

                    //         </View>
                    //     </View>
                    // </View>
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


    render() {


        return (
            <View style={{ flex: 1}}>
            <View>
            {/* <Image style={{width:width, alignSelf:'center', height:height/4,  }} source={require('../assets/doc1.png')} resizeMode="stretch" /> */}

            <ImageLoad
                            style={{width:width, alignSelf:'center', height:height/4,  }}
                            loadingStyle={{ size: 'large', color: 'blue' }}
                            source={{ uri: this.props.profile }}
                            // borderRadius={100}
                            placeholderStyle={{width:width, alignSelf:'center', height:height/4,  }}
                        />

            <View style={{ borderRadius:8, position:'absolute',top:10,left:10, width:45,height:45,backgroundColor:'#2597CB',alignItems:'center',justifyContent:'center'}}>
            <Icon onPress={() => { Actions.pop() }} name="keyboard-backspace" type="MaterialCommunityIcons" style={{ color: "white", fontSize: 28 }} />

                              
                             </View>
            </View>
                            <View style={{paddingHorizontal:15,marginTop:15, flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                              <View>
                                <Text style={{color:'black',fontWeight:'bold',fontSize:18}}>Dr. {this.props.name1}</Text>
                                <View style={{flexDirection:'row', alignItems:'center',}}>
       <Image style={{ width: 22, height: 22, borderRadius: 70,tintColor:'#2597CB' }} source={require('../assets/brain.png')} /> 
                               
                                <Text style={{ color: 'gray', fontSize: 13, fontWeight: '400',marginLeft:5 }}>{this.props.category}</Text>

                                </View>
                                </View>
                                <View style={{  alignItems: 'center',  justifyContent:'center',paddingHorizontal:10,width:70, height:35,borderRadius:24,backgroundColor:'#2597CB' }}>

                                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold',  }}>$ {this.props.fee}</Text>
                                    
                                </View>
                            </View>


                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:width/1.1,alignSelf:'center',  marginTop:10}}>
                         <View style={{flexDirection:'row',alignItems:'center',}}>
                                 <Icon name="user-alt" type="FontAwesome5" style={{ color: "gray", fontSize: 20}} />                                 
 

                             <View style={{marginLeft:8}}>
                                 <Text style={{color:'gray',fontWeight:'bold',fontSize:14}}>{this.state.total_patient}+</Text>
                              
                             </View>
                         </View>

                         <View style={{flexDirection:'row',alignItems:'center',}}>
                                 <Icon name="shopping-bag" type="Foundation" style={{ color: "gray", fontSize: 20}} />                                 
 

                             <View style={{marginLeft:8}}>
                                 <Text style={{color:'gray',fontWeight:'bold',fontSize:14}}>{this.props.experience} years</Text>
                              
                             </View>
                         </View>

                         <View style={{flexDirection:'row',alignItems:'center',}}>
                                 <Icon name="star" type="Entypo" style={{ color: "#ed9700", fontSize: 20}} />                                 
 

                             <View style={{marginLeft:8}}>
                                 <Text style={{color:'gray',fontWeight:'bold',fontSize:14}}>{this.props.a_r}</Text>
                              
                             </View>
                         </View>

                     </View>
              
               <ScrollView>

{/* 
               <Text style={{color:'black',fontWeight:'bold',paddingHorizontal:15,marginTop:20}}>{this.props.Biography}</Text>
               <Text style={{paddingHorizontal:16,marginTop:5,color:'gray'}}>Please agree to answer phone call on the time of appointments. Please select appointment time for moving next. If you don't want pay online then click on OK and then you willgo to Home Screen Something went wrong try again later.</Text> */}
 
                 <Text style={{color:'black',fontWeight:'bold',paddingHorizontal:15,marginTop:10}}>Location</Text>

                  <View>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            zoomEnabled={true}
                            mapType={"standard"}
                            userInterfaceStyle={"dark"}
                            style={styles.map}
                            // showsUserLocation={true}
                            // showsMyLocationButton={true}
                            showsBuildings={true}
                            //  minZoomLevel={14}
                            // maxZoomLevel={90}
                            region={{
                                latitude: this.props.lat,
                                longitude: this.props.lng,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: this.props.lat,
                                    longitude: this.props.lng,
                                }}
                            >
                                <Image
                                    source={require("../assets/dm.png")}
                                    resizeMode="contain"
                                    style={{ width: 50, height: 50, tintColor: '#2597CB' }}
                                />

                            </Marker>
                        </MapView>

                        
                    </View>

                    <Text style={{color:'black',fontWeight:'bold',paddingHorizontal:15,marginTop:10}}>About</Text>

<Text style={{fontSize:14, color:'black',paddingHorizontal:15, }} >{this.props.c_name}</Text>
<View style={{   marginTop: 10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:width/1.1,alignSelf:'center' }}>


       

<Text style={{color: 'black', fontWeight: 'bold',   }}>Reviews</Text>

<Text style={{ color: '#2597CB', fontWeight: 'bold',   }}>   </Text>




</View>


<View style={{flexDirection:'row',alignItems:'center',marginTop:10,marginBottom:5,paddingHorizontal:7}}>
{this.state.skalton == true ?
           
           <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}  >
           
           <SkeletonPlaceholder>
                                   <View
                                       style={{ width: width / 1.1,alignSelf:'center', paddingBottom: 10, marginTop:10,alignSelf:'center', backgroundColor: 'white', borderRadius: 8, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, marginLeft: 7, marginRight: 7, marginBottom: 15, height: 100 }}
                                   ></View>
                               </SkeletonPlaceholder>
                               <SkeletonPlaceholder>
                                   <View
                                       style={{ width: width / 1.1,alignSelf:'center', paddingBottom: 10, backgroundColor: 'white', borderRadius: 8, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3, marginLeft: 7, marginRight: 7, marginBottom: 15, height: 100 }}
                                   ></View>
                               </SkeletonPlaceholder>
                               </ScrollView>
                               :
                               <View>
                               {this.state.data9 == "" ?
                                   <View style={{ alignItems: 'center', justifyContent: 'center', height: height / 4, alignSelf: 'center', width: width }}>
                                       <Text style={{ textAlign: 'center', textAlignVertical: 'center', }}>
                                           No review found.
                                       </Text>
                                   </View>
                                   :
                                    
                                       <ScrollView  showsHorizontalScrollIndicator={false} horizontal={true} >
                                           {this.createtable2()}
                                       </ScrollView>
                                   
                               }
                               </View>
   }

           
           
           
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              {/* {this.createtable5()} */}
              
             





            </ScrollView>
          </View>
 

            <View style={{height:80}}></View>

            </ScrollView>

            <View style={{paddingHorizontal:10, width:  width, flexDirection: 'row', alignItems: 'center', alignSelf:'center', paddingHorizontal:1,paddingVertical:5,borderTopWidth:0.5,position:'absolute',bottom:0, borderColor:'#9697a2',backgroundColor:'white'}}>
              
              
              
              
                {this.state.my_like==true?
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.RBSheet.open()}  style={{marginHorizontal:5, width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'lightgray', borderRadius: 6 }}>
                         <Icon name="heart" type="FontAwesome" style={{ color: "red", fontSize: 20 }} />
                    </TouchableOpacity>

                    :

                    <TouchableOpacity  activeOpacity={0.8} onPress={() => this.RBSheet.open()}  style={{marginHorizontal:10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'lightgray', borderRadius: 6 }}>
                         <Icon name="heart" type="FontAwesome" style={{ color: "lightgray", fontSize: 20 }} />
                    </TouchableOpacity>
                 }

                 <TouchableOpacity onPress={()=>this.book_appointment()}  activeOpacity={0.8}
                     style={{   width:'83%',  paddingVertical: 13, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#2597CB' }}>
                     <Text style={{ color: 'white',fontWeight:'bold' }}>Book Appointment</Text>
                 </TouchableOpacity>
            </View>


            <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={320}
                    openDuration={250}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            paddingHorizontal: 20,
                            backgroundColor: '#f9f9fa',
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                        },
                        draggableIcon: {
                            backgroundColor: "lightgray",
                        },
                    }}
                >
                    <View>
                        {this.state.my_like == false ?
                            <Text style={{ fontSize: 18, color: 'black', marginTop: 30, fontWeight: 'bold', textAlign: 'center' }}>Mark as Favourites?</Text>
                            :
                            <Text style={{ fontSize: 18, color: 'black', marginTop: 30, fontWeight: 'bold', textAlign: 'center' }}>Remove from Favourites?</Text>
                        }
                        <View style={{ borderBottomWidth: 1, borderColor: 'lightgray', marginVertical: 15 }}></View>

                        <View style={{ width: width / 1.1, alignSelf: 'center', backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', shadowOffset: { width: 1, height: 1, }, shadowOpacity: 0, shadowRadius: 1, elevation: 1 }}>
                            <ImageLoad

                                style={{ width: 90, height: 90, borderRadius: 15 }}
                                loadingStyle={{ size: 'large', color: 'blue' }}
                                source={{ uri: this.props.profile }}
                                borderRadius={15}

                                placeholderStyle={{ width: 90, height: 90, borderRadius: 15 }}

                            />

                            <View style={{ marginLeft: 13, width: '65%' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text numberOfLines={1} style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{this.props.name1}</Text>

                                    {this.state.my_like == false ?
                                        <Icon name="hearto" type="AntDesign" style={{ color: "#2597CB", fontSize: 20 }} />
                                        :
                                        <Icon name="heart" type="AntDesign" style={{ color: "#2597CB", fontSize: 20 }} />
                                    }

                                </View>

                                <View style={{ borderBottomWidth: 2, borderColor: '#f8f8f9', marginVertical: 13 }}></View>

                                <Text numberOfLines={1} style={{ color: 'gray', fontSize: 13 }}>{this.props.category} | {this.props.address}</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                                    <Icon name="star-half-empty" type="FontAwesome" style={{ color: "#2597CB", fontSize: 18 }} />
                                    <Text style={{ color: 'gray', fontSize: 13, marginLeft: 5 }}>{this.props.a_r} (Total Reviews {this.props.reviews})</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <TouchableOpacity onPress={() => this.RBSheet.close()} activeOpacity={0.8}
                                style={{ width: width / 2.3, paddingVertical: 13, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#eef3ff', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3 }}>
                                <Text style={{ color: '#2597CB', fontWeight: 'bold' }}>Cancel</Text>
                            </TouchableOpacity>
                            {this.state.my_like == false ?
                                <TouchableOpacity onPress={() => this.Like_Station()} activeOpacity={0.8}
                                    style={{ width: width / 2.3, paddingVertical: 13, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#2597CB', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes, Mark</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.Unlike_Station()} activeOpacity={0.8}
                                    style={{ width: width / 2.3, paddingVertical: 13, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#2597CB', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes, Unmark</Text>
                                </TouchableOpacity>
                            }
                        </View>

                    </View>
                </RBSheet>



                {/* <Modal visible={this.state.visible2} transparent={true}>
                    <ImageViewer enableSwipeDown onSwipeDown={this.onSwipeDown} imageUrls={this.selectedImage} />
                </Modal> */}



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

)
}}

const styles = StyleSheet.create({
    text1: {
        color:'#9697a2',fontSize:14
    },
    text: {
      color: 'white',fontSize:14
    },
    text2DOWN: {
        color:'black',fontSize:17,marginTop:10,fontWeight:'bold'
    },
    textDOWN: {
        color:'white',fontSize:17,marginTop:10,fontWeight:'bold'
    },
    view1: {
        width:width/5.8,justifyContent:'center',alignItems:'center',paddingVertical:8,borderRadius:10,marginLeft:7,marginRight:7,borderWidth:1,borderColor:'#9697a2'
    },
    view: {
        width:width/5.8,justifyContent:'center',alignItems:'center',paddingVertical:8,borderRadius:10,backgroundColor:'#2597CB',marginLeft:7,marginRight:7,borderWidth:1,borderColor:'#2597CB'
    },
    unselect: {
        width:width/3.5,justifyContent:'center',alignItems:'center',paddingVertical:8,borderRadius:10,borderWidth:1,borderColor:'#9697a2'
    },
    select: {
        width:width/3.5,justifyContent:'center',alignItems:'center',paddingVertical:8,backgroundColor:'#2597CB',borderRadius:10,borderWidth:1,borderColor:'#2597CB'
    },
    unselect_text: {
        color:'black'
  
    },
    select_text: {
        color:'white',fontWeight:'bold'
  
    },
    select_text_red: {
      color: 'white', fontWeight: 'bold' 
  
    },
    unselect_text_red: {
      color: 'white', fontWeight: 'bold'
  
    },
    select_red: {
    //   width: 130, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#FFD242', marginLeft: 10, paddingVertical: 10,
      width:width/3.5,justifyContent:'center',alignItems:'center',paddingVertical:8,backgroundColor:'#FFD242',borderRadius:10,borderWidth:1,borderColor:'#FFD242'
    },
    unselect_red: {
    //   width: 130, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#FFD242', marginLeft: 10, paddingVertical: 10,
      width:width/3.5,justifyContent:'center',alignItems:'center',paddingVertical:8,borderRadius:10,borderWidth:1,borderColor:'#9697a2', backgroundColor: '#FFD242'
    },
    map: {
        width: width,
        height: height / 5.5,
        alignSelf:'center',
        marginTop:10
    },
    phoneinput: {
        fontSize: 16,
        paddingLeft: 15,
        // textAlign: 'center',
        width: '100%',
        marginTop: 15
    },
  
  })


const mapStateToProps = (state) => {
    return {
        Profile: state.Profile,
        Reviews: state.Reviews,
        Progressing_your_request: state.Progressing_your_request,
        Please_give_your_rating: state.Please_give_your_rating,
        Please_give_your_feedback: state.Please_give_your_feedback,
        Hourly_Rate: state.Hourly_Rate,
        Patients: state.Patients,
        Book_Appointment: state.Book_Appointment,
        Biography: state.Biography,
        Medical_School: state.Medical_School,
        Degree: state.Degree,
        Experience: state.Experience,
        License_Number: state.License_Number,
        Give_Feedback: state.Give_Feedback,
        Your_Feedback: state.Your_Feedback,
        About_Clinic: state.About_Clinic,
        Speciality: state.Speciality,

        Specializations: state.Specializations,
        Select_Time: state.Select_Time,
        Schedule: state.Schedule,
        Please_select_appointment_time_for_moving_next: state.Please_select_appointment_time_for_moving_next,
        Slot_already_booked: state.Slot_already_booked,

        

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (Profile, Reviews, Progressing_your_request, Please_give_your_rating, Please_give_your_feedback, Hourly_Rate, Patients, Book_Appointment, Biography, Medical_School, Degree, Experience, License_Number, Give_Feedback, Your_Feedback,About_Clinic,Speciality,Specializations,Select_Time,Schedule,Please_select_appointment_time_for_moving_next,Slot_already_booked) => { dispatch({ type: "spanish_lang", payload: Profile, Reviews, Progressing_your_request, Please_give_your_rating, Please_give_your_feedback, Hourly_Rate, Patients, Book_Appointment, Biography, Medical_School, Degree, Experience, License_Number, Give_Feedback, Your_Feedback,About_Clinic,Speciality,Specializations,Select_Time,Schedule,Please_select_appointment_time_for_moving_next,Slot_already_booked }) },
        english_lang: (Profile, Reviews, Progressing_your_request, Please_give_your_rating, Please_give_your_feedback, Hourly_Rate, Patients, Book_Appointment, Biography, Medical_School, Degree, Experience, License_Number, Give_Feedback, Your_Feedback,About_Clinic,Speciality,Specializations,Select_Time,Schedule,Please_select_appointment_time_for_moving_next,Slot_already_booked) => { dispatch({ type: "english_lang", payload: Profile, Reviews, Progressing_your_request, Please_give_your_rating, Please_give_your_feedback, Hourly_Rate, Patients, Book_Appointment, Biography, Medical_School, Degree, Experience, License_Number, Give_Feedback, Your_Feedback,About_Clinic,Speciality,Specializations,Select_Time,Schedule,Please_select_appointment_time_for_moving_next,Slot_already_booked }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Doctor_Appointment_Profile_1);