
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
  BackHandler,
  ToastAndroid

} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import { connect } from "react-redux";
import * as ImagePicker from "react-native-image-picker";

import ImageLoad from 'react-native-image-placeholder';
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
import RBSheet from "react-native-raw-bottom-sheet";

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class treatment_request extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkbox_state: false,
      multi_image_check: 'false',
      multi_Images: [],
      subject: "",
      number: "",
      symptoms: "",
      spinner: false,
      checked: false,
      checked1: false,
      profile: null




    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  onButtonPress = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    // then navigate
    navigate("NewScreen");
  };
  handleBackButtonClick() {
    // BackHandler.exitApp();
    Actions.pop()
    return true;
  }












  Add_appointment = () => {
    console.log('11111111111111', this.state.checked)
    console.log('33333333333333', this.state.checked1)

    let uploaddata = new FormData();



    if (this.state.subject == "") {
      alert(this.props.Please_enter_traetment_subject)
    }
    else if (this.state.symptoms == "") {
      alert(this.props.Please_describr_some_sypmtoms)
    }

    // else if (this.state.number == "") {
    //   alert(this.props.Please_enter_your_registration_number)
    // }

    // else if (this.state.multi_image_check == "false") {
    //   alert(this.props.Please_upload_at_least_one_image)
    // }
    else if (this.state.checked == false) {
      alert(this.props.Please_agree_to_our_terms_and_conditions)
    }
    else if (this.state.checked1 == false) {
      alert(this.props.Please_select_answer_on_medical_phone_agreement)
    }



    else {

      console.log('arrrrrrrrrrrrrrrr', this.props.doctor_id)
      console.log('arrrrrrrrrrrrr111111111111rrr', this.props.time)
      console.log('arrrrrrrrr2222222222rrrrrrr', this.props.day)

      let record1 = this.state.multi_Images
      let len = record1.length

      if (this.state.multi_image_check == "true") {
        for (let i = 0; i < len; i++) {
          let path = record1[i]

          let newImage = {
            uri: path,
            name: "my_photo.jpg",
            type: "image/jpg",
          };
          let image = 'new_image' + i

          uploaddata.append('multi_image_check', "true");

          uploaddata.append(image, newImage);
          uploaddata.append('len', len);

        }
      }

      else {
        // alert(this.props.Please_fill_all_fields)
        uploaddata.append('multi_image_check', "false");

      }

      this.setState({ spinner: true });
      uploaddata.append("user_id", this.state.id);
      uploaddata.append("time", this.props.time);
      uploaddata.append("category", this.props.category);
      uploaddata.append("doctor_id", this.props.doctor_id);
      uploaddata.append("date", this.props.date);
      uploaddata.append("day", this.props.day);
      uploaddata.append("subject", this.state.subject);
      uploaddata.append("number", this.state.number);
      uploaddata.append("symptoms", this.state.symptoms);
      //   uploaddata.append("day",this.props.day);






      let api = Connection + "rest_apis.php?action=Add_Appointment";
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
          console.log("KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK", response.response);
          let record = response.response
          if (record == "fail") {
            this.setState({
              spinner: false,
            });
            alert(this.props.Something_went_wrong_try_agin_later);
          } else {

            let app_id = record[0]
            console.log('OOOOOOOOOOOOOOO', app_id)
            this.setState({
              spinner: false,
            });
            ToastAndroid.show(`Your appointment successfully booked!`, ToastAndroid.SHORT);
            // this.notification()
            Actions.appointment_detail_after_booking({ app_id: app_id });

          }
        })
        .catch((error) => {
          console.error(error);
        });

    };


  }


  componentDidMount = async () => {

    let user = await AsyncStorage.getItem('customer');


    let parsed = JSON.parse(user);

    let id = parsed[0].id;
    let name = parsed[0].name;
    let profile1 = parsed[0].profile;
    console.log('llllllllllllllll', profile1)
    let profile = Connection + 'images/' + profile1
    this.setState({

      id: id,
      name: name,
      profile: profile


    })
  }





  array_index_for_delete = (val) => {
    console.log('CCCCCCCCCCCCCCCCCCC', val)

    let index1 = this.state.multi_Images.indexOf(val);
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFF', index1)

    this.state.multi_Images.splice(index1, 1),
      console.log('SSSSSSSSSSSSSSSSSSSSSSSSS', this.state.multi_Images)

    this.setState({

      // main_array:this.state.main_array.splice(index1,1),
    });


  }








  notification = async () => {
    console.log("To is =>####################################################################################################################")
    console.log("qqqqqqqqqqqqqqq", this.props.fcm_token)

    let to = this.props.fcm_token;



    console.log("To is => ", to)
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAA7pZOA2Q:APA91bFF4O2m4ACwP49OeTxt1RXLzQu2pHbHqdYaJ1A0L573XyT-vlyi0LU95KexCLpEytp0n3phCCan0sVae_HiCpEND7b_c-OUeIQSjH8RFV-LS7EcUgv0JcQt0iXsfP5G9667W2OQ'//cloud server key
      },
      body: JSON.stringify({
        "to": to,
        "priority": "high",
        "notification": {
          "title": "macoyohealth",
          "body": "You have new appointment",
          "sound": 'default',
          "icon": "myicon",

        }
      }
      )
    }).then(res => res.json())
      .then(resjson => console.log("test", resjson))
      .catch(err => console.log("error =>", err))
  }



  uploadimage1 = async () => {
    ImagePicker.launchImageLibrary({ noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7 }, (response) => {
      // console.log('response =', response);
      if (response.didCancel) {
        console.log('user cancelled  image picker');
      } else if (response.error) {
        console.log('imagepicker error : ', response.error);
      } else if (response.customButton) {
        console.log('user tapped  custom button : ', response.customButton);
      } else {
        console.log("outdoor image ", response.assets[0].uri)

        let text = response.assets[0].uri
        console.log("outdoor image1111111111 ", text)


        this.state.multi_Images.push(text)
        this.setState({   imagecheck: true })




      }
    this.RBSheet1.close()

    });
  }



  uploadimage_Camera_1 = async () => {
    ImagePicker.launchCamera({ noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7 }, (response) => {
      // console.log('response =', response);
      if (response.didCancel) {
        console.log('user cancelled  image picker');
      } else if (response.error) {
        console.log('imagepicker error : ', response.error);
      } else if (response.customButton) {
        console.log('user tapped  custom button : ', response.customButton);
      } else {
        console.log("outdoor image ", response.assets[0].uri)

        let text = response.assets[0].uri
        console.log("outdoor image1111111111 ", text)

        // this.state.multi_Images.push(text)
        // Actions.form({ multi_Images: this.state.multi_Images })
        this.state.multi_Images.push(text)

        this.setState({   imagecheck: true })

      }
    this.RBSheet1.close()

    });
  }



 
  show = () => {
    console.log("path>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk>>>>>", this.state.multi_Images)

  }

  createtable1 = () => {
    let table = []
    // console.log(hasRecord)
    // let len = this.state.campaignlist.length;
    // let hasRecord = this.state.campaignlist;
    let record = this.state.multi_Images
    // console.log('qqqqqqqqqqqqqqqqqqqqqq',record)

    let len = record.length
    //console.log(hasRecord[0])
    if (record != 'fail') {
      for (let i = 0; i < len; i++) {



        let feature_image = record[i]






        table.push(<View>
          {



            <View>

              <ImageLoad
                style={{ width: width / 4, height: 100, ustifyContent: 'center', alignItems: 'center', marginLeft: 15, }}
                loadingStyle={{ size: 'large', color: '#f9b248' }}
                source={{ uri: feature_image }}
                borderRadius={4}
                placeholderSource={require('../assets/empty.png')}

                placeholderStyle={{ width: width / 4, height: 100, justifyContent: 'center', alignItems: 'center', marginLeft: 15, }}
              />
              <Icon name="delete" type="MaterialCommunityIcons" onPress={() => this.array_index_for_delete(feature_image)} style={{ position: 'absolute', right: 0, top: 0, color: 'red', fontSize: 26 }} />

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




  next = () => {
    if (this.state.subject == "") {
      alert(this.props.Please_enter_traetment_subject)
    }
    else if (this.state.symptoms == "") {
      alert(this.props.Please_enter_your_symptoms)
    }

    // else if (this.state.number == "") {
    //   alert(this.props.Please_enter_registration_number)
    // }

    // else if (this.state.multi_image_check == "false") {
    //   alert(this.props.Please_upload_at_least_one_image)
    // }
    else if (this.state.checked == false) {
      alert(this.props.Please_agree_to_all_terms_and_conditions)
    }
    else if (this.state.checked1 == false) {
      alert(this.props.Please_agree_to_answer_phone_call)
    }

    else {
      Actions.Paypal_Options({ time: this.props.time, category: this.props.category, date: this.props.date, day: this.props.day, doctor_id: this.props.doctor_id, appointment_price: this.props.fee, doctor_name: this.props.doctor_name, subject: this.state.subject, r_number: this.state.number, symptoms: this.state.symptoms, multi_Images: this.state.multi_Images, multi_image_check: this.state.multi_image_check, doctor_name: this.props.doctor_name, city: this.props.city })
    }


  }


  Add_appointment = () => {
    console.log('11111111111111', this.state.checked)
    console.log('33333333333333', this.state.checked1)

    let uploaddata = new FormData();



    if (this.state.subject == "") {
      alert("Please enter traetment subject.")
    }
    else if (this.state.symptoms == "") {
      alert("Please enter your symptoms.")
    }

    else if (this.state.number == "") {
      alert("Please enter registration number.")
    }

    // else if (this.state.multi_image_check == "false") {
    //   alert(this.props.Please_upload_at_least_one_image)
    // }
    else if (this.state.checked == false) {
      alert("Please agree to all terms and conditions")
    }
    else if (this.state.checked1 == false) {
      alert("Please agree to answer phone call on the time of appointments.")
    }



    else {

      console.log('arrrrrrrrrrrrrrrr', this.props.doctor_id)
      console.log('arrrrrrrrrrrrr111111111111rrr', this.props.time)
      console.log('arrrrrrrrr2222222222rrrrrrr', this.props.day)

      let record1 = this.state.multi_Images
      let len = record1.length

      if (this.state.multi_image_check == "true") {
        for (let i = 0; i < len; i++) {
          let path = record1[i]

          let newImage = {
            uri: path,
            name: "my_photo.jpg",
            type: "image/jpg",
          };
          let image = 'new_image' + i

          uploaddata.append('multi_image_check', "true");

          uploaddata.append(image, newImage);
          uploaddata.append('len', len);

        }
      }

      else {
        // alert(this.props.Please_fill_all_fields)
        uploaddata.append('multi_image_check', "false");

      }

      this.setState({ spinner: true });
      uploaddata.append("user_id", this.state.id);
      uploaddata.append("time", this.props.time);
      uploaddata.append("category", this.props.category);
      uploaddata.append("doctor_id", this.props.doctor_id);
      uploaddata.append("date", this.props.date);
      uploaddata.append("day", this.props.day);
      uploaddata.append("subject", this.state.subject);
      uploaddata.append("number", this.state.number);
      uploaddata.append("symptoms", this.state.symptoms);
      uploaddata.append("fee", this.props.fee);

      //   uploaddata.append("day",this.props.day);






      let api = Connection + "rest_apis.php?action=Add_Appointment";
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
          console.log("KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK", response.response);
          let record = response.response
          if (record == "fail") {
            this.setState({
              spinner: false,
            });
            alert(this.props.Something_went_wrong_try_agin_later);
          } else {

            let app_id = record[0]
            console.log('OOOOOOOOOOOOOOO', app_id)
            this.setState({
              spinner: false,
            });
            ToastAndroid.show(`Your appointment successfully booked!`, ToastAndroid.SHORT);
            this.notification()
            Actions.appointment_detail_after_booking({ app_id: app_id });

          }
        })
        .catch((error) => {
          console.error(error);
        });

    };


  }





  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={{ width: width / 1, paddingVertical: 15, borderBottomWidth: 1.5, borderColor: 'lightgray' }}>
          <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Icon name="arrowleft" type="AntDesign" style={{ color: 'black', fontSize: 20 }} />
            </TouchableOpacity>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>{this.props.Treatment_Request}</Text>
            <Text></Text>
          </View>
        </View>

        <ScrollView>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'black', margin: 15 }}>{this.props.Treatment}</Text>

          <View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
            <View style={{ alignItems: 'center' }}>
              <ImageLoad
                style={{ width: 55, borderRadius: 80, height: 55 }}
                loadingStyle={{ size: 'large', color: '#f9b248' }}
                source={{ uri: this.state.profile }}
                borderRadius={100}
                placeholderSource={require('../assets/empty.png')}

                placeholderStyle={{ width: 55, borderRadius: 80, height: 55 }}
              />
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12, marginTop: 5 }}>{this.state.name}</Text>
            </View>
            {/*  
                 <View style={{width:55,height:55,borderRadius:80,backgroundColor:'gray',justifyContent:'center',alignItems:'center',marginLeft:10}}>
                     <Icon name="plus" type="AntDesign"  style={{color:'black',fontSize:14}}/>
                     <Text style={{color:'black',fontSize:12}}>Add</Text>
                 </View> */}
          </View>

          {/* <View style={{borderWidth:0.5,borderColor:'lightgray',marginTop:15}}></View> */}



          <Text style={{ color: 'black', marginTop: 20, marginHorizontal: 15 }}>{this.props.Treatment_Subject}</Text>
          <TextInput style={styles.textipu} placeholder={this.props.Enter_Address} placeholderTextColor='gray'
            onChangeText={(subject) => this.setState({ subject })}
          />

          <Text style={{ color: 'black', marginTop: 10, marginHorizontal: 15 }}> {this.props.Insurance_ID}</Text>
          <TextInput style={styles.textipu} placeholder={this.props.Enter_Address} placeholderTextColor='gray'
            onChangeText={(number) => this.setState({ number })}
          />


          {/* <View style={{borderWidth:0.5,borderColor:'lightgray',marginTop:15}}></View> */}

          <Text style={{ color: 'black', marginTop: 10, marginHorizontal: 15 }}>{this.props.Symptoms}</Text>

          <View >

            <TextInput style={styles.textipu1} placeholder={this.props.Enter_Address} placeholderTextColor='gray'
              onChangeText={(symptoms) => this.setState({ symptoms })}
            />

            <Text style={{ color: 'gray', position: 'absolute', right: 30, bottom: 10 }}>0/250</Text>
          </View>

          <Text style={{ color: 'black', marginTop: 10, marginHorizontal: 15 }}>{this.props.Images_of_Symptoms}</Text>


          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>

            <TouchableOpacity onPress={() => this.RBSheet1.open()} style={{ width: width / 4, height: 100, backgroundColor: '#38b6ff', justifyContent: 'center', alignItems: 'center', marginLeft: 15, marginTop: 15 }}>
              <Icon name="plus" type="AntDesign" style={{ color: 'white', fontSize: 24 }} />
            </TouchableOpacity>

            {this.createtable1()}

          </View>


          <View style={{ borderWidth: 0.5, borderColor: 'lightgray', marginTop: 15, width: width / 1.1, alignSelf: 'center' }}></View>



          <View style={{ width: width / 1.1, alignSelf: 'center', marginTop: 20, }}>


            <Text
              //   numberOfLines={1}
              style={{
                color: "#38b6ff",
                fontSize: 14,
                // maxWidth: "90%",

                fontWeight: 'bold',

              }}
            >
              {this.props.Total_Charges}
            </Text>











            <View
              style={{

                flexDirection: "row",
                justifyContent: 'space-between',

                //   marginTop:5,
                alignItems: 'center',
                marginTop: 20
              }}
            >
              <Text
                //   numberOfLines={1}
                style={{
                  color: "black",
                  fontSize: 14,
                  // maxWidth: "90%",
                  fontWeight: 'bold',

                }}
              >
                {this.props.Total_Fee}
              </Text>


              <Text
                //   numberOfLines={1}
                style={{
                  color: "black",
                  fontSize: 14,
                  // maxWidth: "90%",
                  fontWeight: 'bold'
                }}
              >
                ${this.props.fee}
              </Text>




            </View>
            <View
              style={{

                width: '100%',
                alignItems: "center",
                flexDirection: "row",

                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
                marginVertical: 15


              }}
            >
            </View>
          </View>






          <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 15, marginTop: 15 }}>{this.props.Payment_Method}</Text>



          {/* 

          <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.payment_option()}

            style={{ width: width / 1.1, alignSelf: 'center', paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 8, paddingVertical: 20, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginVertical: 15, backgroundColor: '#E21A70' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>${this.props.fee}</Text>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Review Payment Method</Text>
            <Icon name="chevron-right" type="FontAwesome" style={{ color: 'white', fontSize: 15 }} />
          </TouchableOpacity> */}




          <View style={{ borderWidth: 0.5, borderColor: 'lightgray', marginTop: 5, width: width / 1.1, alignSelf: 'center' }}></View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10, paddingTop: 15 }}>
            <CheckBox
              disabled={false}
              value={this.state.checked}
              onValueChange={() => this.setState({ checked: !this.state.checked })}
              tintColors={{ true: 'black', false: 'gray' }}
            />
            <Text style={{ color: 'black', maxWidth: '90%' }}>{this.props.I_confirm_and_agree_to_all_terms_and_conditions}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, paddingBottom: 10 }}>
            <CheckBox
              disabled={false}
              value={this.state.checked1}
              onValueChange={() => this.setState({ checked1: !this.state.checked1 })}
              tintColors={{ true: 'black', false: 'gray' }}
            />
            <Text style={{ color: 'black', maxWidth: '90%' }}>{this.props.Please_answer_phone_call_at_the_time_of_appointment}
            </Text>
          </View>




          <TouchableOpacity activeOpacity={0.8} onPress={() => this.next()}
            style={{ width: width / 1.1, backgroundColor: '#38b6ff', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 30, paddingVertical: 10, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginVertical: 15 }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>{this.props.Confirm_Pay}</Text>
          </TouchableOpacity>
        </ScrollView>

        <RBSheet
                        ref={ref => {
                            this.RBSheet1 = ref;
                        }}
                        height={300}
                        openDuration={250}
                        customStyles={{
                            container: {
                                paddingHorizontal: 20
                            }
                        }}
                    >
                        <View>
                            <Text style={{ fontSize: 18, color: 'black', marginTop: 20 }}>{this.props.Choose_an_action}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 30 }}>


                                <TouchableOpacity onPress={() => this.uploadimage1()} activeOpacity={0.6}>
                                    <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name="images" type="Entypo" color="white" style={{ fontSize: 30, color: '#1878f3', }} />
                                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', }}>{this.props.Gallery}</Text>
                                    </View>
                                </TouchableOpacity>



                                <TouchableOpacity onPress={() => this.uploadimage_Camera_1()} activeOpacity={0.6}>
                                    <View style={{ flexDirection: 'column', marginLeft: 40, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name="camera" type="Entypo" color="white" style={{ fontSize: 30, color: '#1878f3', }} />
                                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', }}>{this.props.Camera}</Text>
                                    </View>
                                </TouchableOpacity>


                            </View>

                        </View>
                    </RBSheet>


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
      </View>

    )
  }
}



const styles = StyleSheet.create({
  textipu: {
    borderWidth: 1, color: 'black', borderColor: 'lightgray', height: 40, marginTop: 10, borderRadius: 6, padding: 10, marginHorizontal: 15
  },
  textipu1: {
    borderWidth: 1, color: 'black', borderColor: 'lightgray', height: 100, marginTop: 10, borderRadius: 6, paddingTop: 10, paddingHorizontal: 10,
    paddingBottom: 0, marginHorizontal: 15, textAlignVertical: "top",
  }
})




const mapStateToProps = (state) => {
  return {
    Progressing_your_request: state.Progressing_your_request,
    Please_enter_traetment_subject: state.Please_enter_traetment_subject,
    Please_enter_your_symptoms: state.Please_enter_your_symptoms,
    Please_enter_registration_number: state.Please_enter_registration_number,
    Please_agree_to_all_terms_and_conditions: state.Please_agree_to_all_terms_and_conditions,
    Please_agree_to_answer_phone_call: state.Please_agree_to_answer_phone_call,
    Treatment_Request: state.Treatment_Request,
    Treatment: state.Treatment,
    Treatment_Subject: state.Treatment_Subject,
    Insurance_ID: state.Insurance_ID,
    Symptoms: state.Symptoms,
    Images_of_Symptoms: state.Images_of_Symptoms,
    Total_Charges: state.Total_Charges,
    Total_Fee: state.Total_Fee,
    Payment_Method: state.Payment_Method,
    I_confirm_and_agree_to_all_terms_and_conditions: state.I_confirm_and_agree_to_all_terms_and_conditions,
    Please_answer_phone_call_at_the_time_of_appointment: state.Please_answer_phone_call_at_the_time_of_appointment,
    Confirm_Pay: state.Confirm_Pay,
    Gallery: state.Gallery,
    Camera: state.Camera,
    Choose_an_action: state.Choose_an_action,

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
    spanish_lang: (Progressing_your_request,Choose_an_action,Gallery,Camera, Please_enter_traetment_subject, Please_enter_your_symptoms, Please_enter_registration_number, Please_agree_to_all_terms_and_conditions, Please_agree_to_answer_phone_call, Treatment_Request, Treatment, Treatment_Subject, Insurance_ID, Symptoms, Images_of_Symptoms, Total_Charges, Total_Fee, Payment_Method, I_confirm_and_agree_to_all_terms_and_conditions, Please_answer_phone_call_at_the_time_of_appointment, Confirm_Pay) => { dispatch({ type: "spanish_lang", payload: Progressing_your_request,Gallery,Camera, Please_enter_traetment_subject,Choose_an_action, Please_enter_your_symptoms, Please_enter_registration_number, Please_agree_to_all_terms_and_conditions, Please_agree_to_answer_phone_call, Treatment_Request, Treatment, Treatment_Subject, Insurance_ID, Symptoms, Images_of_Symptoms, Total_Charges, Total_Fee, Payment_Method, I_confirm_and_agree_to_all_terms_and_conditions, Please_answer_phone_call_at_the_time_of_appointment, Confirm_Pay }) },
    english_lang: (Progressing_your_request,Choose_an_action,Gallery,Camera, Please_enter_traetment_subject, Please_enter_your_symptoms, Please_enter_registration_number, Please_agree_to_all_terms_and_conditions, Please_agree_to_answer_phone_call, Treatment_Request, Treatment, Treatment_Subject, Insurance_ID, Symptoms, Images_of_Symptoms, Total_Charges, Total_Fee, Payment_Method, I_confirm_and_agree_to_all_terms_and_conditions, Please_answer_phone_call_at_the_time_of_appointment, Confirm_Pay) => { dispatch({ type: "english_lang", payload: Progressing_your_request,Gallery,Camera, Please_enter_traetment_subject,Choose_an_action, Please_enter_your_symptoms, Please_enter_registration_number, Please_agree_to_all_terms_and_conditions, Please_agree_to_answer_phone_call, Treatment_Request, Treatment, Treatment_Subject, Insurance_ID, Symptoms, Images_of_Symptoms, Total_Charges, Total_Fee, Payment_Method, I_confirm_and_agree_to_all_terms_and_conditions, Please_answer_phone_call_at_the_time_of_appointment, Confirm_Pay }) },
    add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
    // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
    // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
    // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






  }
}



export default connect(mapStateToProps, mapDispatchToProps)(treatment_request);