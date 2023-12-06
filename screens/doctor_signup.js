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
  Modal,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  Picker,
  BackHandler,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import {CountryPicker} from "react-native-country-codes-picker";

import CountryPicker from 'react-native-country-picker-modal';

import {Actions} from 'react-native-router-flux';
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
import {connect} from 'react-redux';
import ImageLoad from 'react-native-image-placeholder';
import RBSheet from 'react-native-raw-bottom-sheet';
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
import Connection from '../connection';
import messaging from '@react-native-firebase/messaging';
import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class doctor_Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      data9: [],
      password: '',
      name: '',
      image1: null,
      spinner: false,
      imagecheck: false,
      // gender: "",
      currency: '',
      city: '',
      address: '',
      p_name: '',
      license_number: '',
      degree: '',
      category: 'Select Category',
      experience: '',
      mobile_number: '',
      multi_image_check: 'false',
      multi_Images: [],
      clinic_name: '',
      fee: '',
      toekn: '',
      image2: null,
      token: '',
      clinic: '',
      r_code: '',
      age: 'Age',
      gender: 'Select Gender',
      visible: false,
      dob: 'Date of Birth',
      passhide: true,
      placeholder: '+1',
      country: 'Select Country',
      data5: [],
      symptom: 'Select Syptom',
      l_name: '',
      f_name: '',
      p_code: '',
      z_code: '',
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  };
  handleBackButtonClick() {
    // BackHandler.exitApp();
    Actions.pop();
    return true;
  }

  selectcountry_1(value) {
    // let n = value["callingCode"]
    let n1 = value['name'];
    console.log('value => ', n1[0]);
    this.setState({
      // placeholder: "+" + n[0],
      country: n1,
    });
  }

  show_country = () => {
    this.setState({
      show_country: true,
    });
  };

  setCountryCode = val => {
    console.log(val);
    this.setState({
      show_country: false,
      placeholder: val,
    });
  };

  componentDidMount = async () => {
    this.all_categories();
    this.all_syptoms();
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
    let user = this.props.social_user;
    console.log(user, 'userrrrrrrrr');
    if (user != 'null' && user != '') {
      let email = user['email'];
      let name = user['name'];
      let photo = user['photo'];
      let name1 = name.split(' ');
      let f_name = name1[0];
      let l_name = name1[1];

      this.setState({
        email: email,
        name,
        name,
        gallrey_di_image: photo,
        f_name: f_name,
        l_name: l_name,
      });
      console.log(email);
    }

    let aaa = this.props.address;

    console.log(aaa, 'aaaaaaaaaaaaa');

    if (this.props.address != 'null') {
      console.log(this.props.current_location_lat);
      console.log(this.props.current_location_lng);
      let lat = this.props.current_location_lat;
      let lng = this.props.current_location_lng;

      console.log(this.props.address);
      let aa = this.props.address.split(',');
      let address = aa[1];
      let country = aa[4];
      let city = aa[2];

      this.setState({
        address: address,
        country: country,
        lat: lat,
        lng: lng,
        city: city,
        email: this.props.email,
        password: this.props.password,
      });

      console.log('aaaaaaaa', address);
      console.log('aaaaaaaa', country);
    }
  };

  createtable5 = () => {
    let table = [];
    let record1 = this.state.data5;
    let len = record1.length;
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record1[i].name;

        table.push(
          <View>
            {
              <View>
                <TouchableOpacity
                  onPress={() => this.select_category(name)}
                  activeOpacity={0.8}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      marginTop: 20,
                      textAlign: 'center',
                    }}>
                    {name}
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: 'lightgray',
                    marginTop: 10,
                  }}></View>
              </View>
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

  createtable9 = () => {
    let table = [];
    let record1 = this.state.data9;
    let len = record1.length;
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record1[i].name;

        table.push(
          <View>
            {
              <View>
                <TouchableOpacity
                  onPress={() => this.select_symptoms(name)}
                  activeOpacity={0.8}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      marginTop: 20,
                      textAlign: 'center',
                    }}>
                    {name}
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: 'lightgray',
                    marginTop: 10,
                  }}></View>
              </View>
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

  uploadimage1 = async () => {
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
        this.RBSheet1.close();
      },
    );
  };

  uploadimage_Camera_1 = async () => {
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

          this.setState({gallrey_di_image: text, imagecheck: true});
        }
        this.RBSheet1.close();
      },
    );
  };

  uploadimage2 = async () => {
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

          this.setState({image2: text, imagecheck: true});
        }
        this.RBSheet6.close();
      },
    );
  };

  uploadimage_Camera_2 = async () => {
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

          this.setState({image2: text, imagecheck: true});
        }
        this.RBSheet6.close();
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

  Check_PlatForm_1 = () => {
    if (Platform.OS === 'ios') {
      this.uploadimage_Camera_1();
      console.log('Platform Ios');
    } else {
      this.requestCameraPermission_1();
      console.log('Platform Android');
    }
  };

  requestCameraPermission_2 = async () => {
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
        this.uploadimage_Camera_2();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  Check_PlatForm_2 = () => {
    if (Platform.OS === 'ios') {
      this.uploadimage_Camera_2();
      console.log('Platform Ios');
    } else {
      this.requestCameraPermission_2();
      console.log('Platform Android');
    }
  };

  select_gender = val_3 => {
    console.log('valvalvalvalvalvalvalvalvalvalvalval ', val_3);
    this.setState({
      gender: val_3,
    });
    this.RBSheet5.close();
  };

  Get_address() {
    let name = this.state.name;
    let password = this.state.password;
    let email = this.state.email;
    let address = this.state.address;
    let gender = this.state.gender;
    let license_number = this.state.license_number;
    let degree = this.state.degree;
    let experience = this.state.experience;
    let mobile_number = this.state.number;
    let role = this.props.role;
    let fee = this.state.fee;
    let fcm_token = this.state.token;
    let category = this.state.category;
    let dob = this.state.dob;
    let age = this.state.age;

    if (this.state.gallrey_di_image == null) {
      alert('Please upload your profile image.');
    } else if (name == '') {
      alert('Please enter your name');
    } else if (email == '') {
      alert('Please enter your email');
    } else if (password == '') {
      alert('Please_enter_your_password');
    } else if (mobile_number == '') {
      alert('Please enter your mobile number.');
    } else if (gender == 'Select Gender') {
      alert('Please select your gender.');
    } else if (address == '') {
      alert('Please enter your address');
    } else if (this.state.z_code == '') {
      alert('Please enter your postal code');
    } else if (category == 'Select Category') {
      alert('Please select your category.');
    }
    // else if (this.state.symptom == "Select Symptom") {
    //   alert("Please select symptom.");
    // }
    else if (experience == '') {
      alert('Please enter your experience');
    } else if (fee == '') {
      alert('Please enter your fee.');
    } else if (degree == '') {
      alert('Please enter your education.');
    } else if (this.state.language == '') {
      alert('Please enter your language.');
    } else if (license_number == '') {
      alert('Please enter your license number.');
    } else if (this.state.image2 == null) {
      alert('Please select your license image.');
    }
    // else if (gender == "Select Gender") {
    //   alert("Please select your gender.");
    // }
    else if (this.state.clinic == '') {
      alert('Please write about your self.');
    } else {
      this.setState({spinner: true});
      let address = this.state.address;
      let api =
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        address +
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

            this.setState({
              lat: lat,
              lng: lng,
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

  select_Date = date => {
    let dd = date.toISOString().split('T');
    let d1 = dd[0];
    let getAge = Math.floor((new Date() - new Date(d1).getTime()) / 3.15576e10);

    console.log('getAgegetAgegetAgegetAgegetAge', getAge);
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

  showtimepicker1() {
    this.setState({
      show: true,
    });
  }

  select_category = val_3 => {
    console.log('valvalvalvalvalvalvalvalvalvalvalval ', val_3);
    this.setState({
      category: val_3,
    });
    this.RBSheet2.close();
  };

  select_symptoms = val_3 => {
    console.log('valvalvalvalvalvalvalvalvalvalvalval ', val_3);
    this.setState({
      symptom: val_3,
    });
    this.RBSheet9.close();
  };

  select_state = val_3 => {
    console.log('valvalvalvalvalvalvalvalvalvalvalval ', val_3);
    this.setState({
      city: val_3,
    });
    this.RBSheet3.close();
  };

  all_categories = () => {
    let api = Connection + 'rest_apis.php?action=all_categories';
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        otherHeader: 'foo',
      },
    })
      .then(response => response.json())
      .then(response => {
        let table = [];
        let record = response.response;
        // console.log('mondddddddddddayyyyyyyyyy', record)

        let len = record.length;

        if (record != 'fail') {
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

  all_syptoms = () => {
    let api = Connection + 'rest_apis.php?action=all_symptoms_1';
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        otherHeader: 'foo',
      },
    })
      .then(response => response.json())
      .then(response => {
        let table = [];
        let record = response.response;
        // console.log('mondddddddddddayyyyyyyyyy', record)

        let len = record.length;

        if (record != 'fail') {
          this.setState({
            data9: record,
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Sign_Up = (val, val1) => {
    if (this.state.gender == 'Select Gender') {
      alert('Please select your gender.');
    } else if (this.state.address == '') {
      alert('Please enter your address');
    } else if (this.state.category == 'Select Category') {
      alert('Please select your category.');
    } else if (this.state.symptom == 'Select Symptom') {
      alert('Please select symptom.');
    } else if (this.state.symptom == '') {
      alert('Please enter your experience');
    } else if (this.state.degree == '') {
      alert('Please enter your education.');
    } else if (this.state.license_number == '') {
      alert('Please enter your license number.');
    } else if (this.state.image2 == null) {
      alert('Please select your license image.');
    }
    // else if (gender == "Select Gender") {
    //   alert("Please select your gender.");
    // }
    else if (this.state.fee == '') {
      alert('Please enter your fee.');
    } else if (this.state.clinic == '') {
      alert('Please write about your self.');
    } else {
      const newImage = {
        uri: this.state.gallrey_di_image,
        name: 'my_photo.jpg',
        type: 'image/jpg',
      };
      const newImage1 = {
        uri: this.state.image2,
        name: 'my_photo.jpg',
        type: 'image/jpg',
      };
      let uploaddata = new FormData();
      var number1 = this.state.mobile_number;
      let mobile_number = this.state.placeholder + number1;
      this.setState({spinner: true});
      uploaddata.append('name', this.state.name);
      uploaddata.append('email', this.state.email);
      uploaddata.append('mobile_number', mobile_number);

      uploaddata.append('address', this.state.address);
      uploaddata.append('license_number', this.state.license_number);
      uploaddata.append('degree', this.state.degree);
      uploaddata.append('category', this.state.category);
      uploaddata.append('experience', this.state.experience);
      uploaddata.append('role', 'doctor');
      uploaddata.append('password', this.state.password);
      uploaddata.append('fcm_token', this.state.token);
      uploaddata.append('image', newImage);
      uploaddata.append('image1', newImage1);

      uploaddata.append('lat', this.state.lat);
      uploaddata.append('lng', this.state.lng);
      uploaddata.append('clinic', this.state.clinic);
      // uploaddata.append("age", age);
      // uploaddata.append("dob", dob);
      uploaddata.append('fee', this.state.fee);

      uploaddata.append('gender', this.state.gender);
      // uploaddata.append("country", this.state.country);
      uploaddata.append('language', this.state.language);
      uploaddata.append('z_code', this.state.z_code);
      uploaddata.append('disable', 'false');

      let api = Connection + 'rest_apis.php?action=Add_doctor';
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
          } else {
            this.setState({
              spinner: false,
            });

            Toast.show('You successfully registered as Doctor!');
            this.opendialogue();
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  selectcountry(value) {
    let n = value['callingCode'];
    console.log('value => ', value);
    this.setState({
      placeholder: '+' + n[0],
    });
  }

  done = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      Actions.Patient_Login_Screen({role: this.props.role});
    }, 100);
  };

  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };

  seePassword = () => {
    console.log('eeeeeeeeeeeee');
    this.setState({
      passhide: !this.state.passhide,
    });
  };

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
              onPress={() => Actions.Patient_Login_Screen({role: 'doctor'})}
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
              Enter all Informations
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
                keyboardType="phone-pad"
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
                value={this.state.address}
                onChangeText={address => this.setState({address})}
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
              onPress={() => this.RBSheet2.open()}
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
                name="category"
                type="MaterialIcons"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <Text
                style={
                  this.state.category == 'Select Category'
                    ? {color: 'gray', marginLeft: 10}
                    : {color: 'black', marginLeft: 10}
                }>
                {this.state.category}
              </Text>
            </TouchableOpacity>

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
                name="suitcase"
                type="FontAwesome"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <TextInput
                keyboardType="numeric"
                onChangeText={experience => this.setState({experience})}
                value={this.state.experience}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="Experience (Only Digits)"
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
                name="dollar"
                type="FontAwesome"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <TextInput
                keyboardType="numeric"
                value={this.state.fee}
                onChangeText={fee => this.setState({fee})}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="Fee (Only Digits)"
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
                name="graduation-cap"
                type="FontAwesome"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <TextInput
                onChangeText={degree => this.setState({degree})}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="Qualification"
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
                name="language"
                type="MaterialIcons"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <TextInput
                onChangeText={language => this.setState({language})}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="Languages"
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
                name="drivers-license-o"
                type="FontAwesome"
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <TextInput
                onChangeText={license_number => this.setState({license_number})}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="License No"
                placeholderTextColor="gray"
              />
            </View>

            <Text
              style={{
                color: 'black',
                fontSize: 15,
                paddingHorizontal: 15,
                fontWeight: '700',
                marginTop: 20,
                marginLeft: 10,
              }}>
              License Image
            </Text>

            {this.state.image2 == null ? (
              <TouchableOpacity
                onPress={() => this.RBSheet6.open()}
                style={{
                  width: width / 1.1,
                  height: 180,
                  borderRadius: 12,
                  marginTop: 15,
                  alignSelf: 'center',
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
                onPress={() => this.RBSheet6.open()}
                activeOpacity={0.8}>
                <ImageLoad
                  style={{
                    width: width / 1.1,
                    height: 180,
                    borderRadius: 12,
                    marginTop: 15,
                    alignSelf: 'center',
                  }}
                  loadingStyle={{size: 'large', color: 'blue'}}
                  source={{uri: this.state.image2}}
                  borderRadius={12}
                  placeholderStyle={{
                    width: width / 1.1,
                    height: 180,
                    borderRadius: 12,
                    marginTop: 15,
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            )}

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
                style={{color: '#9d0c0f', fontSize: 24}}
              />

              <TextInput
                value={this.state.clinic}
                onChangeText={clinic => this.setState({clinic})}
                style={{
                  width: '90%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="Write about yourself"
                placeholderTextColor="gray"
              />
            </View>

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
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Sign Up</Text>
            </TouchableOpacity>

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
                    onPress={() => this.Check_PlatForm_1()}
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

            <RBSheet
              ref={ref => {
                this.RBSheet6 = ref;
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
                    onPress={() => this.uploadimage2()}
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
                    onPress={() => this.Check_PlatForm_2()}
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
          </ScrollView>
          <RBSheet
            ref={ref => {
              this.RBSheet2 = ref;
            }}
            closeOnDragDown={true}
            height={130}
            openDuration={120}
            customStyles={{
              container: {
                paddingHorizontal: 20,
              },
              draggableIcon: {
                backgroundColor: 'lightgray',
              },
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => this.select_category('Mental Health')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Mental Health
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              {/* <TouchableOpacity
                onPress={() => this.select_category('General practitioner')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  General practitioner
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Neurology')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Neurology
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Pediatrics')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Pediatrics
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() =>
                  this.select_category('Orthopedic surgery and sports medicine')
                }
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Orthopedic surgery and sports medicine
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Cardiology')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Cardiology
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Dermatology')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Dermatology
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Psychiatric')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Psychiatric
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View>

              <TouchableOpacity
                onPress={() => this.select_category('Family medicine')}
                activeOpacity={0.8}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Family medicine
                </Text>
              </TouchableOpacity> 
               <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  marginTop: 10,
                }}></View> */}
            </ScrollView>
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
                Now you can give consultations to your patients
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
                  Progressing your request
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
  textipu: {
    borderWidth: 1,
    color: 'black',
    borderColor: 'lightgray',
    height: 40,
    marginTop: 10,
    borderRadius: 6,
    padding: 10,
  },
  textipu1: {
    borderWidth: 1,
    color: 'black',
    borderColor: 'lightgray',
    height: 80,
    textAlignVertical: 'top',
    marginTop: 10,
    borderRadius: 6,
    padding: 10,
  },
  picker: {
    borderWidth: 1,
    color: 'black',
    borderColor: 'lightgray',
    height: 40,
  },
  ImageAvater3: {
    width: '100%',
    height: 150,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 12,
  },
  ImageAvater4: {
    width: '100%',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: 'lightgray',
    paddingVertical: 5,
  },
});

export default doctor_Signup;
