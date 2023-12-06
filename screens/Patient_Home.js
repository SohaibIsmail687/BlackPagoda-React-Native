import {Row} from 'native-base';
import React, {Component} from 'react';

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
  AppState,
  Platform,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Form,
  Container,
  Header,
  Drawer,
} from 'native-base';
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
import {Actions} from 'react-native-router-flux';
import messaging from '@react-native-firebase/messaging';
import Connection from '../connection';
import ImageLoad from 'react-native-image-placeholder';
import {connect} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CheckBox from '@react-native-community/checkbox';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data1: [],
      data5: [],
      name: '',
      skalton: false,
      my_like: false,
      liked: false,
      doctor_name: '',
      doctor_category: '',
      doctor_reviews: '',
      doctor_address: '',
      doctor_profile: '',
      doctor_id: '',
      search: this.props.search,
      appState: AppState.currentState,
    };
  }

  componentDidMount = async () => {
    // this.backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.backAction,
    // );

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Message handled in the background!', remoteMessage);
    });

    const settings = await messaging().requestPermission();

    if (settings) {
      await messaging().registerDeviceForRemoteMessages();

      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        console.log('Tapped');
      });
      messaging().onMessage(payload => {
        // console.log('payload', JSON.stringify(payload))
        // alert(JSON.stringify(payload))
        this.setState({noti: JSON.stringify(payload)});
      });
      //  console.log(this.state.noti)

      messaging()
        .getToken()
        .then(currentToken => {
          if (currentToken) {
            this.setState({token: currentToken});
            this.update_fcm_token(id, currentToken);
            console.log('current tokens', currentToken);
            //   console.log('notificaiton data:',this.state.noti)
          } else {
            // alert(this.props.No_Instance_ID_token);
          }
        })
        .catch(err => {
          // alert(this.props.An_error_occurred_while_retrieving_token + err);
          console.log(err);
        });
      console.log('Permission settings:', settings);
    } else {
      console.log('Permission settings:', settings);
    }

    var today = new Date();
    var nextweek_T = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    let date0 = nextweek_T.toString();
    let ddd = date0.split(' ');
    console.log('check ddd whole date:::::', ddd);
    let day_1 = ddd[0];
    let dd_2 = ddd[1];
    let dd_3 = ddd[2];
    let dd_4 = ddd[3];
    let final_date_1 = dd_2 + ' ' + dd_3 + ', ' + dd_4;
    this.setState({
      day_1: day_1,
      final_date_1: final_date_1,
    });

    let user = await AsyncStorage.getItem('customer');
    let parsed = JSON.parse(user);
    console.log('user Asyncstorage data/user Asyncstorage data', user);
    let id = parsed[0].id;
    let name = parsed[0].name;

    this.setState({
      id: id,
      name: name,
    });
    console.log('usernameusernameusernameusername', this.state.name);
    this.doctors_all_fav();
    this.get_appointments_user();
  };

  update_fcm_token = (val1, val2) => {
    let uploaddata = new FormData();

    // console.log("nameeeeeeee =>", val1);
    // console.log("nameeeeeeee =>", val2);

    uploaddata.append('id', val1);
    uploaddata.append('fcm_token', val2);

    let api = Connection + 'rest_apis.php?action=update_fcm_token';
    console.log('pass => ', api);
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
        console.log('response', response.response);

        if (response.response == 'fail') {
          this.setState({
            spinner: false,
          });
          alert(this.props.Please_try_agin_later);
        } else {
          this.setState({
            spinner: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_appointments_user = () => {
    let uploaddata = new FormData();

    this.setState({
      skalton: true,
    });

    uploaddata.append('user_id', this.state.id);
    uploaddata.append('status', 'pending');

    let api = Connection + 'rest_apis.php?action=display_upcoming_appointments';
    console.log('pass => ', api);

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
        let record4 = response.response;
        // console.log('responseeeresponseeereeeeeeeeespons', record4);
        if (record4 != 'fail') {
          this.setState({
            data1: record4,
            skalton: false,
          });
        } else {
          this.setState({
            data1: '',
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  doctors_all_fav = () => {
    let uploaddata = new FormData();

    uploaddata.append('user_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=all_doctors';
    console.log('pass => ', api);
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
        let table = [];
        let record = response.response;
        let len = record.length;

        console.log('recordrecordrecordrecordrecordrecordrecord', record);

        if (record != 'fail') {
          for (let i = 0; i < len; i++) {
            let my_like = record[i].my_like;

            console.log('mylikemylikemylikemylikemylike', my_like);

            let boxes = 'box' + my_like;
            if (my_like == null) {
              this.setState({[boxes]: false});
              console.log('!!!!!!!!!!!!!!!!!!!!', this.state[boxes]);
            } else {
              this.setState({[boxes]: true});
            }
          }

          this.setState({
            data5: record,
            skalton: false,
          });
        }
      })

      .catch(error => {
        console.error(error);
      });
  };

  Like_Station = () => {
    this.RBSheet.close();

    let boxes = 'box' + this.state.doctor_id;

    this.setState({[boxes]: true});

    this.setState({
      my_like: true,
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.doctor_id);
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
          this.get_liked_doctor();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Unlike_Station = () => {
    this.RBSheet.close();

    let boxes = 'box' + this.state.doctor_id;

    this.setState({[boxes]: false});

    this.setState({
      my_like: false,
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.doctor_id);
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
          this.get_liked_doctor();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_liked_doctor = () => {
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.doctor_id);
    uploaddata.append('user_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=get_liked_doctor';

    console.log('pass => ', api);
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
          this.setState({
            my_like: true,
            spinner: false,
          });
        } else {
          this.setState({
            my_like: false,
            spinner: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  like_doctor_RBSheet = (val1, val2, val3, val4, val5, val6, val7) => {
    this.RBSheet.open();
    this.setState({
      doctor_name: val1,
      doctor_category: val2,
      doctor_address: val3,
      doctor_reviews: val5,
      doctor_profile: val6,
      doctor_id: val4,
      liked: val7,
    });
    console.log('Helllllllllllllloooooo', val1);
  };

  createtable1 = () => {
    let table = [];
    let record1 = this.state.data5;
    let len = record1.length;

    console.log('lengthoftable1lengthoftable1lengthoftable1', len);

    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record1[i].name;
        let category = record1[i].category;
        let fee = record1[i].fee;
        let address = record1[i].address;
        let fcm_token = record1[i].fcm_token;
        let doctor_id = record1[i].id;
        let lat1 = record1[i].lat;
        let lng1 = record1[i].lng;
        let lat = parseFloat(lat1);
        let lng = parseFloat(lng1);
        let experience = record1[i].experience;
        let avg_rating = record1[i].avg_rating;
        let total_review = record1[i].total_review;
        let a_r = Number(avg_rating).toFixed(2);
        let degree = record1[i].degree;
        let license_number = record1[i].license_number;
        let c_name = record1[i].c_name;
        let appointment = record1[i].appointment;
        let s_key = record1[i].s_key;
        let paypal = record1[i].paypal;
        let access = record1[i].access;
        let online = record1[i].online;
        let email = record1[i].email;
        let my_like = record1[i].my_like;
        let app = record1[i].app;
        let profile1 = record1[i].profile;
        let profile = Connection + 'images/' + profile1;
        let boxes = 'box' + doctor_id;

        // console.log('boxesboxesboxesboxesboxes', boxes);
        console.log('mylikemylikemylikemylike', my_like);

        table.push(
          <View>
            {
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop: 15,
                }}>
                <View style={{width: 70, height: 120}}>
                  <ImageLoad
                    style={{
                      width: 70,
                      height: 120,
                      borderRadius: 4,
                    }}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: profile}}
                    borderRadius={4}
                    placeholderStyle={{
                      width: 70,
                      height: 120,
                      borderRadius: 4,
                    }}
                  />
                </View>
                <View style={{marginLeft: 10, width: '77%'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {name}
                  </Text>
                  <Text
                    style={{
                      color: '#9d0c0f',
                      fontSize: 13,
                      fontWeight: '600',
                    }}>
                    {category}
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 13,
                      fontWeight: '400',
                    }}>
                    {address}
                  </Text>

                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginTop: 6,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        Actions.Doctor_Appointment_Profile({
                          day_1: this.state.day_1,
                          final_date_1: this.state.final_date_1,
                          name1: name,
                          category: category,
                          fee: fee,
                          address: address,
                          fcm_token: fcm_token,
                          doctor_id: doctor_id,
                          lat: lat,
                          lng: lng,
                          experience: experience,
                          avg_rating: avg_rating,
                          total_review: total_review,
                          a_r: a_r,
                          degree: degree,
                          license_number: license_number,
                          c_name: c_name,
                          appointment: appointment,
                          s_key: s_key,
                          paypal: paypal,
                          access: access,
                          online: online,
                          email: email,
                          app: app,
                          profile: profile,
                          my_like: my_like,
                        })
                      }
                      activeOpacity={0.8}
                      style={{
                        width: '75%',
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 4,
                        backgroundColor: '#9d0c0f',
                      }}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        Book Appointment
                      </Text>
                    </TouchableOpacity>

                    {this.state[boxes] == true ? (
                      <TouchableOpacity
                        // onPress={() =>
                        //   this.like_doctor_RBSheet(
                        //     name,
                        //     category,
                        //     address,
                        //     doctor_id,
                        //     a_r,
                        //     profile,
                        //     true,
                        //   )
                        // }
                        activeOpacity={0.8}
                        style={{
                          marginHorizontal: 8,
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#c1e5f5',
                          borderRadius: 4,
                        }}>
                        <Icon
                          name="heart"
                          type="AntDesign"
                          style={{color: '#9d0c0f', fontSize: 20}}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        // onPress={() =>
                        //   this.like_doctor_RBSheet(
                        //     name,
                        //     category,
                        //     address,
                        //     doctor_id,
                        //     a_r,
                        //     profile,
                        //     true,
                        //   )
                        // }
                        activeOpacity={0.8}
                        style={{
                          marginHorizontal: 8,
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#c1e5f5',
                          borderRadius: 4,
                        }}>
                        <Icon
                          name="hearto"
                          type="AntDesign"
                          style={{color: '#9d0c0f', fontSize: 20}}
                        />
                      </TouchableOpacity>
                    )}

                    {/* <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        marginHorizontal: 8,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#c1e5f5',
                        borderRadius: 4,
                      }}>
                      <Icon
                        name="heart"
                        type="FontAwesome"
                        style={{color: '#9d0c0f', fontSize: 20}}
                      />
                    </TouchableOpacity> */}
                  </View>
                </View>
              </TouchableOpacity>
            }
          </View>,
        );
      }
      return table;
    } else {
      let img = [];
      img.push(
        <View style={{flex: 1, justifyContent: 'center'}}>
          {<View></View>}
        </View>,
      );
      return img;
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              paddingVertical: 7,
            }}>
            <View>
              <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>
                Welcome Back
              </Text>
              <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                Find your best doctor
              </Text>
            </View>
            <Icon
              name="bell"
              type="FontAwesome"
              style={{color: 'black', fontSize: 25, borderRadius: 10}}
            />
          </View>

          <TouchableOpacity
            onPress={() => Actions.All_sponsored_clinics()}
            activeOpacity={0.8}
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
              marginTop: 15,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                height: 50,
                width: '85%',
                elevation: 5,
              }}>
              <Text style={{color: 'gray', paddingLeft: 30, marginTop: 13}}>
                {' '}
                Search Doctor
              </Text>
              <Icon
                name="search1"
                type="AntDesign"
                style={{
                  color: 'gray',
                  fontSize: 15,
                  position: 'absolute',
                  top: 17,
                  left: 8,
                }}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                height: 50,
                marginRight: -10,
                width: '15%',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#9d0c0f',
              }}>
              <Icon
                name="filter"
                type="MaterialCommunityIcons"
                style={{color: 'white', fontSize: 24}}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* <View
            style={{
              paddingHorizontal: 15,
              marginTop: 25,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#9d0c0f', fontWeight: 'bold', fontSize: 18}}>
              Categories
            </Text>
            <TouchableOpacity
              onPress={() => Actions.All_Categories()}
              activeOpacity={0.8}>
              <Text
                style={{color: '#9d0c0f', fontWeight: 'bold', fontSize: 14}}>
                See All
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              width: width / 1.1,
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() =>
                Actions.Doctor_By_Category({category: 'Dermatology'})
              }
              activeOpacity={0.8}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '31%',
                height: 95,
                marginVertical: 5,
                borderRadius: 5,
                backgroundColor: 'white',
                paddingVertical: 5,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Image
                style={{
                  width: 45,
                  height: 45,
                  alignSelf: 'center',
                  tintColor: '#9d0c0f',
                }}
                resizeMode="contain"
                source={require('../assets/neutrition.png')}
              />
              <Text
                style={{
                  color: '#9d0c0f',
                  fontWeight: '500',
                  fontSize: 14,
                  marginTop: 5,
                  textAlign: 'center',
                }}>
                Dermatology
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Actions.Doctor_By_Category({category: 'Neurology'})
              }
              activeOpacity={0.8}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '31%',
                height: 95,
                marginVertical: 5,
                borderRadius: 5,
                backgroundColor: 'white',
                paddingVertical: 5,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Image
                style={{
                  width: 45,
                  height: 45,
                  alignSelf: 'center',
                  tintColor: 'gray',
                }}
                resizeMode="contain"
                source={require('../assets/Eye.png')}
              />
              <Text
                style={{
                  color: 'gray',
                  fontWeight: '500',
                  fontSize: 14,
                  marginTop: 5,
                  width: '50%',
                  textAlign: 'center',
                }}
                numberOfLines={2}>
                Eye Exams{' '}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Actions.Doctor_By_Category({category: 'Psychiatric'})
              }
              activeOpacity={0.8}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '31%',
                height: 95,
                marginVertical: 5,
                borderRadius: 5,
                backgroundColor: 'white',
                paddingVertical: 5,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Image
                style={{
                  width: 45,
                  height: 45,
                  alignSelf: 'center',
                  tintColor: 'gray',
                }}
                resizeMode="contain"
                source={require('../assets/Paediatric-Neurology.png')}
              />
              <Text
                style={{
                  color: 'gray',
                  fontWeight: '500',
                  fontSize: 14,
                  marginTop: 5,
                  textAlign: 'center',
                }}>
                Mental health counseling
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: width/1.1, justifyContent: 'space-between', marginTop: 10, }}>


              <TouchableOpacity activeOpacity={0.8}
                style={{ alignItems: 'center', justifyContent: 'center', width: '45%',   marginVertical: 5, borderRadius: 5, backgroundColor: 'white', paddingVertical: 5, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
                <Image style={{ width: 45, height: 45, alignSelf: 'center', tintColor: '#9d0c0f' }} resizeMode='contain' source={require('../assets/download-removebg-preview.png')} />
                <Text style={{ color: '#9d0c0f', fontWeight: '500', fontSize: 14, marginTop: 5 }}>DIETISTA</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8}
                style={{ alignItems: 'center', justifyContent: 'center', width: '45%',  marginVertical: 5, borderRadius: 5, backgroundColor: 'white', paddingVertical: 5, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
                <Image style={{ width: 45, height: 45, alignSelf: 'center', tintColor: 'gray' }} resizeMode='contain' source={require('../assets/brain.png')} />
                <Text style={{ color: 'gray', fontWeight: '500', fontSize: 14, marginTop: 5 }}>NUTRIZIONISTA</Text>
              </TouchableOpacity>

               

          </View> */}

          <View
            style={{
              paddingHorizontal: 15,
              marginTop: 25,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#9d0c0f', fontWeight: 'bold', fontSize: 18}}>
              Top Doctors
            </Text>
            <TouchableOpacity onPress={() => Actions.All_sponsored_clinics()}>
              <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 14}}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingBottom: 20,
              height: height / 1.4,
            }}>
            <View style={{marginTop: 10}}>
              {this.state.skalton == true ? (
                <View style={{marginHorizontal: 8}}>
                  <SkeletonPlaceholder>
                    <View
                      style={{
                        width: width / 1.1,
                        paddingBottom: 10,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 3,
                        marginLeft: 7,
                        marginRight: 7,
                        marginTop: 15,
                        height: 110,
                      }}></View>
                  </SkeletonPlaceholder>
                  <SkeletonPlaceholder>
                    <View
                      style={{
                        width: width / 1.1,
                        paddingBottom: 10,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 3,
                        marginLeft: 7,
                        marginRight: 7,
                        marginTop: 15,
                        height: 110,
                      }}></View>
                  </SkeletonPlaceholder>
                </View>
              ) : (
                <View>
                  {this.state.data5 == '' ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: height / 7,
                        alignSelf: 'center',
                        width: width,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          color: 'black',
                        }}>
                        No Doctors Found
                      </Text>
                    </View>
                  ) : (
                    <View style={{paddingBottom: 100}}>
                      {this.createtable1()}
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        {this.state.spinner == true && (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(2, 2, 2, 0.8)',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: width / 1.2,
                height: height / 9 - 20,
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 20,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                borderRadius: 6,
              }}>
              <UIActivityIndicator color="#9d0c0f" />
              <Text
                style={{fontSize: 16, color: '#9d0c0f', fontWeight: 'bold'}}>
                Stiamo processando la sua richiesta
              </Text>
            </View>
          </View>
        )}

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
              backgroundColor: 'lightgray',
            },
          }}>
          <View>
            {this.state.my_like == false ? (
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginTop: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Mark as Favourites?
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginTop: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Remove from Favourites?
              </Text>
            )}
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                marginVertical: 15,
              }}></View>

            <View
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                backgroundColor: 'white',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0,
                shadowRadius: 1,
                elevation: 1,
              }}>
              <ImageLoad
                style={{width: 90, height: 90, borderRadius: 15}}
                loadingStyle={{size: 'large', color: 'blue'}}
                source={{uri: this.state.doctor_profile}}
                borderRadius={15}
                placeholderStyle={{width: 90, height: 90, borderRadius: 15}}
              />

              <View style={{marginLeft: 13, width: '65%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {this.state.doctor_name}
                  </Text>

                  {this.state.my_like == false ? (
                    <Icon
                      name="hearto"
                      type="AntDesign"
                      style={{color: '#9d0c0f', fontSize: 20}}
                    />
                  ) : (
                    <Icon
                      name="heart"
                      type="AntDesign"
                      style={{color: '#9d0c0f', fontSize: 20}}
                    />
                  )}
                </View>

                <View
                  style={{
                    borderBottomWidth: 2,
                    borderColor: '#f8f8f9',
                    marginVertical: 13,
                  }}></View>

                <Text numberOfLines={1} style={{color: 'gray', fontSize: 13}}>
                  {this.state.doctor_category} | {this.state.doctor_address}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 7,
                  }}>
                  <Icon
                    name="star-half-empty"
                    type="FontAwesome"
                    style={{color: '#9d0c0f', fontSize: 18}}
                  />
                  <Text style={{color: 'gray', fontSize: 13, marginLeft: 5}}>
                    {this.state.doctor_reviews} (Total Reviews{' '}
                    {this.state.doctor_reviews})
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => this.RBSheet.close()}
                activeOpacity={0.8}
                style={{
                  width: width / 2.3,
                  paddingVertical: 13,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  backgroundColor: '#eef3ff',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <Text style={{color: '#9d0c0f', fontWeight: 'bold'}}>
                  Cancel
                </Text>
              </TouchableOpacity>
              {this.state.liked == false ? (
                <TouchableOpacity
                  onPress={() => this.Like_Station()}
                  activeOpacity={0.8}
                  style={{
                    width: width / 2.3,
                    paddingVertical: 13,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: '#9d0c0f',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Yes, Mark
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.Unlike_Station()}
                  activeOpacity={0.8}
                  style={{
                    width: width / 2.3,
                    paddingVertical: 13,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    backgroundColor: '#9d0c0f',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Yes, Unmark
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </RBSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  active_button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    width: width / 2.2,
    borderBottomWidth: 2,
    borderColor: '#9d0c0f',
  },
  in_active_button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    width: width / 2.2,
  },

  active_text: {
    color: '#9d0c0f',
    fontWeight: '500',
    fontSize: 14,
  },
  in_active_text: {
    color: 'gray',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default Patient_Home;
