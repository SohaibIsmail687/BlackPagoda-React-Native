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
  ToastAndroid,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
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
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import ImageLoad from 'react-native-image-placeholder';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CountryPicker from 'react-native-country-picker-modal';

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
import messaging from '@react-native-firebase/messaging';
import Connection from '../connection';
import * as ImagePicker from 'react-native-image-picker';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_SignUp_Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gallrey_di_image: null,
      email: '',
      password: '',
      name: '',
      image1: null,
      spinner: false,
      imagecheck: false,
      region: '',
      currency: '',
      city: '',
      address: '',
      mobile_number: '',
      lat: 0,
      lng: 0,
      token: '',
      dob: 'Date of Birth',
      currency: '',
      country: '',
      isDatePickerVisible: false,
      data1: [],
      gender: 'Select Gender',
      age: 'Your Age',
      passhide: true,
      placeholder: '+1',
      text1: 2,
      text2: 1,
      visible: false,
      f_name: '',
      l_name: '',
      e_state: '',
      z_code: '',
      city: '',
    };
  }

  select_gender = val_3 => {
    this.setState({
      gender: val_3,
    });
    this.RBSheet5.close();
  };
  seePassword = () => {
    console.log('eeeeeeeeeeeee');
    this.setState({
      passhide: !this.state.passhide,
    });
  };

  select_Date = date => {
    let dd = date.toISOString().split('T');
    let d1 = dd[0];

    let getAge = Math.floor((new Date() - new Date(d1).getTime()) / 3.15576e10);

    console.log('ageeeeeeeeeee', getAge);
    console.log(d1);
    let d2 = d1.split('-');
    let mm = d2[1];
    let dd_dd = d2[2];
    let yy = d2[0];
    let final_date = mm + '-' + dd_dd + '-' + yy;

    console.log(date.toISOString().split('.')[0] + 'Z');

    this.setState({
      show: false,
      dob: final_date,
      age: getAge,
    });
  };

  cancel = () => {
    this.setState({
      show: false,
    });
  };

  done = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      Actions.Patient_Login_Screen({role: 'user'});
    }, 100);
  };

  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };

  showtimepicker1() {
    this.setState({
      show: true,
    });
  }

  backAction = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
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
        console.log('payload', JSON.stringify(payload));
        // alert(JSON.stringify(payload))
        this.setState({noti: JSON.stringify(payload)});
      });
      //  console.log(this.state.noti)

      messaging()
        .getToken()
        .then(currentToken => {
          if (currentToken) {
            this.setState({token: currentToken});

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
    // this.doctors_all_fav()
  };

  selectcountry(value) {
    let n = value['callingCode'];
    console.log('value => ', value);
    this.setState({
      placeholder: '+' + n[0],
    });
  }

  uploadimage1 = async () => {
    this.RBSheet1.close();
    ImagePicker.launchImageLibrary(
      {noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7},
      response => {
        // console.log('response =', response);
        if (response.didCancel) {
          console.log('user cancelled  image picker');
        } else if (response.error) {
          console.log('imagepicker error : ', response.error);
        } else if (response.customButton) {
          console.log('user tapped  custom button : ', response.customButton);
        } else {
          console.log('outdoor image ', response.assets[0].uri);

          let text = response.assets[0].uri;
          console.log('outdoor image1111111111 ', text);

          this.setState({gallrey_di_image: text, imagecheck: true});
        }
      },
    );
  };

  requestCameraPermission_1 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        this.uploadimage_Camera_1();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  uploadimage_Camera_1 = async () => {
    this.RBSheet1.close();
    ImagePicker.launchCamera(
      {noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7},
      response => {
        // console.log('response =', response);
        if (response.didCancel) {
          console.log('user cancelled  image picker');
        } else if (response.error) {
          console.log('imagepicker error : ', response.error);
        } else if (response.customButton) {
          console.log('user tapped  custom button : ', response.customButton);
        } else {
          console.log('outdoor image ', response.assets[0].uri);

          let text = response.assets[0].uri;
          console.log('outdoor image1111111111 ', text);

          // this.state.multi_Images.push(text)
          // Actions.form({ multi_Images: this.state.multi_Images })
          this.setState({gallrey_di_image: text, imagecheck: true});
        }
      },
    );
  };

  Get_address() {
    let name = this.state.name;
    let email = this.state.email;
    let address = this.state.address;

    let password = this.state.password;
    let mobile_number = this.state.mobile_number;
    let role = this.props.role;
    let fcm_token = this.state.token;
    let dob = this.state.dob;

    let gender = this.state.gender;
    let age = this.state.age;
    let len = password.length;
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let aa = re.test(password);
    console.log(aa, 'aaaaaa');

    if (this.state.name == '') {
      alert('Please enter your name.');
    } else if (email == '') {
      alert('Please enter your email');
    } else if (password == '') {
      alert('Please enter your password');
    } else if (aa != true) {
      alert(
        'Password must be 8-16 chracters and contain both numbers and Uppercase & Lowercase letters/speacial chracters.',
      );
    }
    // else  if (this.state.l_name == "") {
    //   alert("Please enter your last name.");
    // }
    else if (mobile_number == '') {
      alert('Please enter your mobile number.');
    } else if (dob == 'Date of Birth') {
      alert('Please enter your date of birth.');
    } else if (this.state.address == '') {
      alert('Please enter your address.');
    }
    // else if (this.state.city == "") {
    //   alert("Please enter your city.");
    // }
    else if (this.state.z_code == '') {
      alert('Please enter your zip code.');
    } else if (this.state.gender == 'Select Gender') {
      alert('Please select your gender.');
    } else {
      this.setState({spinner: true});

      let api =
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        this.state.address +
        '&key=AIzaSyAr6YRTjfl2eKXIJZd97_uw9KpStXFRiCE';

      console.log('pass => ', api);
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          otherHeader: 'foo',
        },
      })
        .then(response => response.json())
        .then(response => {
          console.log('pass => ', response);
          let result = response['results'];
          if (result == '') {
            this.setState({
              spinner: false,
            });
            alert('Invalid address');
          } else {
            let all = result[0].geometry;
            let location = all.location;
            let lat = location['lat'];
            let lng = location['lng'];
            let abs = result[0].formatted_address;

            this.setState({
              lat: lat,
              lng: lng,
              // address:abs
            });
            this.setState({spinner: false});

            this.Sign_Up(lat, lng);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  Sign_Up = (val1, val2) => {
    const newImage = {
      uri: this.state.gallrey_di_image,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    };
    let uploaddata = new FormData();

    if (this.state.imagecheck == false) {
      console.log('image not');
      uploaddata.append('photo', 'false');
    } else {
      console.log('image');

      uploaddata.append('photo', 'true');

      uploaddata.append('image', newImage);
    }

    var number1 = this.state.mobile_number;
    let mobile_number = this.state.placeholder + number1;

    let email = this.state.email;
    let address = this.state.address;

    let password = this.state.password;
    // let mobile_number = this.state.mobile_number;
    let role = this.props.role;
    let fcm_token = this.state.token;
    let dob = this.state.dob;

    let gender = this.state.gender;
    let age = this.state.age;

    // let name = this.state.f_name+' '+this.state.l_name

    this.setState({spinner: true});

    // uploaddata.append('f_name', this.state.f_name);
    // uploaddata.append('l_name', this.state.l_name);
    // uploaddata.append('e_state', this.state.e_state);
    // uploaddata.append('city', this.state.city);

    uploaddata.append('name', this.state.name);
    uploaddata.append('email', email);
    uploaddata.append('address', address);
    uploaddata.append('mobile_number', mobile_number);
    uploaddata.append('role', 'user');
    uploaddata.append('fcm_token', fcm_token);
    uploaddata.append('lat', val1);
    uploaddata.append('lng', val2);
    uploaddata.append('password', password);
    uploaddata.append('age', age);
    uploaddata.append('dob', dob);
    uploaddata.append('gender', gender);
    uploaddata.append('z_code', this.state.z_code);

    let api = Connection + 'rest_apis.php?action=Add_user';
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

        if (response.response == 'repeat') {
          this.setState({
            spinner: false,
          });
          alert('This email already exist');
        } else if (response.response == 'fail') {
          this.setState({
            spinner: false,
          });
          // alert(this.props.Something_went_wrong);
        } else {
          this.setState({
            spinner: false,
          });

          // Toast.show("You successfully registered as patient.");

          this.opendialogue();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Check_PlatForm_1 = () => {
    if (Platform.OS === 'ios') {
      this.uploadimage_Camera_1();
      console.log('Platform Ios');
    } else {
      this.requestCameraPermission_1();
      console.log('Platform Android');
    }
  };

  selectcountry(value) {
    let n = value['callingCode'];
    console.log('value => ', n[0]);
    this.setState({
      placeholder: '+' + n[0],
    });
  }

  changebtn(value, val) {
    this.setState({
      gender: val,
    });

    if (this.state[value] == 2) {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,

        [value]: 2,
      });
    } else {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,

        [value]: 2,
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 15,
              backgroundColor: 'white',
              paddingHorizontal: 15,
            }}>
            <Icon
              onPress={() => Actions.Patient_Login_Screen({role: 'user'})}
              name="arrow-back"
              type="MaterialIcons"
              style={{color: '#9d0c0f', fontSize: 24}}
            />
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#9d0c0f'}}>
              Registration
            </Text>
            <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
              {' '}
            </Text>
          </View>
          <ScrollView>
            <Text
              style={{
                color: '#9d0c0f',
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 20,
              }}>
              Create Account
            </Text>
            <Text style={{color: '#9d0c0f', fontSize: 15, textAlign: 'center'}}>
              Enter all informations
            </Text>

            <View
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                marginTop: 20,
                borderRadius: 100,
              }}>
              {this.state.gallrey_di_image == null ? (
                <TouchableOpacity
                  onPress={() => this.RBSheet1.open()}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f7d4d5',
                  }}
                  activeOpacity={0.8}>
                  <Icon
                    name="camera"
                    type="AntDesign"
                    style={{color: '#9d0c0f', fontSize: 40}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.RBSheet1.open()}
                  activeOpacity={0.8}>
                  <ImageLoad
                    style={{
                      width: 100,
                      height: 100,
                      borderWidth: 2,
                      borderRadius: 150,
                      alignSelf: 'center',
                      borderColor: '#9d0c0f',
                    }}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: this.state.gallrey_di_image}}
                    borderRadius={150}
                    placeholderStyle={{
                      width: 100,
                      height: 100,
                      borderWidth: 2,
                      borderRadius: 150,
                      borderColor: '#9d0c0f',
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View
              style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                width: width / 1.1,
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Icon
                name="user-alt"
                type="FontAwesome5"
                style={{color: '#9d0c0f', fontSize: 20}}
              />

              <TextInput
                onChangeText={name => this.setState({name})}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="Full Name"
                placeholderTextColor="gray"
              />
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                width: width / 1.1,
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Icon
                name="email"
                type="MaterialCommunityIcons"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <TextInput
                onChangeText={email => this.setState({email})}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="Email"
                placeholderTextColor="gray"
              />
            </View>

            <View
              style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                width: width / 1.1,
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Icon
                name="lock-outline"
                type="MaterialCommunityIcons"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <TextInput
                onChangeText={password => this.setState({password})}
                value={this.state.password}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="Password"
                placeholderTextColor="gray"
              />
            </View>

            <View
              style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                width: width / 1.1,
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <CountryPicker
                withFlagButton={true}
                withFlag
                onSelect={value => this.selectcountry(value)}
                translation="eng"
                placeholder={this.state.placeholder}
              />

              <TextInput
                onChangeText={mobile_number => this.setState({mobile_number})}
                value={this.state.mobile_number}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="Phone No"
                placeholderTextColor="gray"
              />
              <Icon
                name="phone"
                type="FontAwesome"
                style={{color: '#9d0c0f', fontSize: 24}}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.showtimepicker1()}
              style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                width: width / 1.1,
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Icon
                name="calendar"
                type="Entypo"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <Text
                allowFontScaling={false}
                style={
                  this.state.dob == 'Date of Birth'
                    ? {
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 10,
                        color: 'gray',
                      }
                    : {
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 10,
                        color: 'black',
                      }
                }>
                {this.state.dob}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={this.state.show}
              // date={new Date('1985-01-17',)}

              mode="date"
              // format='YYYY'
              onConfirm={date => this.select_Date(date)}
              onCancel={() => this.cancel()}
              timeZoneOffsetInMinutes={0}
              display="spinner"
            />
            <View
              style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                width: width / 1.1,
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Icon
                name="pager"
                type="FontAwesome5"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <Text
                allowFontScaling={false}
                style={
                  this.state.age == 'Your Age'
                    ? {
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 10,
                        color: 'gray',
                      }
                    : {
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 10,
                        color: 'black',
                      }
                }>
                {this.state.age}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                width: width / 1.1,
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Icon
                name="address"
                type="Entypo"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <TextInput
                onChangeText={address => this.setState({address})}
                value={this.state.address}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="Address"
                placeholderTextColor="gray"
              />
            </View>

            <View
              style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                width: width / 1.1,
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Icon
                name="post-outline"
                type="MaterialCommunityIcons"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <TextInput
                onChangeText={z_code => this.setState({z_code})}
                value={this.state.z_code}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="Zip Code"
                placeholderTextColor="gray"
              />
            </View>

            {/* <View style={{ paddingHorizontal: 15, flexDirection: 'row', width: width / 1.1, marginTop: 20, backgroundColor: 'white', borderRadius: 8, height: 50, alignItems: 'center', alignSelf: 'center', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }} >

<Icon name="address" type="Entypo" style={{ color: "#9d0c0f", fontSize: 24, }} />

<TextInput value={this.state.name} style={{ width: '90%', height: 50, paddingLeft: 10, alignSelf: 'center', color: 'black', }} placeholder="state" placeholderTextColor='gray' />

</View>



<View style={{ paddingHorizontal: 15, flexDirection: 'row', width: width / 1.1, marginTop: 20, backgroundColor: 'white', borderRadius: 8, height: 50, alignItems: 'center', alignSelf: 'center', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }} >

<Icon name="address" type="Entypo" style={{ color: "#9d0c0f", fontSize: 24, }} />

<TextInput value={this.state.name} style={{ width: '90%', height: 50, paddingLeft: 10, alignSelf: 'center', color: 'black', }} placeholder="city" placeholderTextColor='gray' />

</View> */}
            <TouchableOpacity
              onPress={() => this.RBSheet5.open()}
              style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                width: width / 1.1,
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 8,
                height: 50,
                alignItems: 'center',
                alignSelf: 'center',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Icon
                name="transgender"
                type="FontAwesome5"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <Text
                style={
                  this.state.gender == 'Select Gender'
                    ? {color: 'gray', marginLeft: 10}
                    : {color: 'black', marginLeft: 10}
                }>
                {this.state.gender}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.Get_address();
              }}
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                height: 48,
                backgroundColor: '#9d0c0f',
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 20,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Register</Text>
            </TouchableOpacity>
            {this.state.Butun_Hide == true ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginBottom: 20,
                }}>
                <Text style={{color: 'gray'}}>Already have an account?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => Actions.Patient_Login_Screen({role: 'user'})}>
                  <Text style={{color: '#9d0c0f', fontWeight: 'bold'}}>
                    {' '}
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}
          </ScrollView>

          <RBSheet
            ref={ref => {
              this.RBSheet5 = ref;
            }}
            height={120}
            openDuration={120}
            customStyles={{
              container: {
                paddingHorizontal: 20,
              },
            }}>
            <View>
              <TouchableOpacity
                onPress={() => this.select_gender('Male')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 20,
                    textAlign: 'center',
                  }}>
                  Male
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_gender('Female')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </RBSheet>

          <RBSheet
            ref={ref => {
              this.RBSheet1 = ref;
            }}
            height={230}
            openDuration={200}
            customStyles={{
              container: {
                paddingHorizontal: 20,
              },
            }}>
            <View>
              <Text style={{fontSize: 18, color: 'black', marginTop: 20}}>
                Choose an action
              </Text>

              <View style={{flexDirection: 'row', marginTop: 30}}>
                <TouchableOpacity
                  onPress={() => this.uploadimage1()}
                  activeOpacity={0.6}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="images"
                      type="Entypo"
                      color="white"
                      style={{fontSize: 30, color: '#9d0c0f'}}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      Gallery
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.Check_PlatForm()}
                  activeOpacity={0.6}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="camera"
                      type="Entypo"
                      color="white"
                      style={{fontSize: 30, color: '#9d0c0f'}}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      Camera
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </RBSheet>

          <Dialog
            style={{backgroundColor: 'black', padding: 0}}
            width={'90%'}
            visible={this.state.visible}
            dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
            <DialogContent
              style={{paddingLeft: 0, paddingRight: 0, paddingBottom: 0}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 20,
                  alignItems: 'center',
                  backgroundColor: '#9d0c0f',
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                }}>
                <Icon
                  name="done"
                  type="MaterialIcons"
                  style={{color: 'white', fontSize: 50}}
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Congratulations!
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'gray',
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Your account has been successfully created
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'gray',
                  fontWeight: 'bold',
                  marginTop: 3,
                }}>
                Now you can book appointment with doctors
              </Text>

              <TouchableOpacity
                onPress={() => {
                  this.done();
                }}
                style={{
                  width: '85%',
                  marginBottom: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  backgroundColor: '#9d0c0f',
                  paddingVertical: 15,
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Done</Text>
              </TouchableOpacity>
            </DialogContent>
          </Dialog>

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
                  width: width / 2.5,
                  height: height / 9 - 20,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,
                  borderRadius: 6,
                }}>
                <UIActivityIndicator style={{}} color="#9d0c0f" />
                <Text
                  style={{
                    fontSize: 16,
                    color: '#9d0c0f',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    marginRight: 10,
                  }}>
                  Laoding...
                </Text>
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  phoneinput2: {
    width: width / 1.1,
    alignSelf: 'center',
    backgroundColor: '#e6e6ed',
    height: 40,
    borderRadius: 8,
    color: 'black',
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },

  phoneinput: {
    paddingHorizontal: 15,
  },
});

export default Patient_SignUp_Screen;
