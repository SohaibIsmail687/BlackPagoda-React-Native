import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
  Picker,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
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
import * as ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect} from 'react-redux';
import Connection from '../connection';
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
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class update_Patient_profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image1: null,
      spinner: false,
      imagecheck: false,
      visible: false,
      passhide: true,
      dob: 'Date of Birth',
      show_date: false,
      mobile_number: '',
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

          this.setState({image1: text, imagecheck: true});
        }
      },
    );
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
          this.setState({image1: text, imagecheck: true});
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

  Check_PlatForm = () => {
    if (Platform.OS === 'ios') {
      this.uploadimage_Camera_1();
      console.log('Platform Ios');
    } else {
      this.requestCameraPermission_1();
      console.log('Platform Android');
    }
  };

  componentDidMount = async () => {
    let user = await AsyncStorage.getItem('customer');

    console.log('aaaaaaaaaaaaa', user);
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;
    let address = parsed[0].address;
    let password = parsed[0].password;
    let email = parsed[0].email;
    let age = parsed[0].age;
    let mobile_number = parsed[0].mobile_number;
    let dob = parsed[0].dob;

    let gender = parsed[0].gender;
    let profile1 = parsed[0].profile;
    if (profile1 == null) {
      this.setState({
        image1: null,
      });
    } else {
      let profile = Connection + 'images/' + profile1;
      console.log('hdbbh =>', profile);

      this.setState({
        image1: profile,
      });
    }

    this.setState({
      name: name,
      id: id,
      address: address,
      email: email,
      password: password,
      gender: gender,
      mobile_number: mobile_number,
      age: age,
      dob: dob,
    });
  };

  handleDelete = () => {
    this.setState({
      visible: false,
    });
  };

  done = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      Actions.pop();
    }, 100);
  };

  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };

  selectcountry(value) {
    let n = value['currency'];
    let n1 = value['name'];
    console.log('llllllllllllllllllll', n1);

    console.log('value => ', n[0]);
    this.setState({
      placeholder: n1,
      currency: n[0],
      country: n1,
    });
  }

  Get_address() {
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
          alert('Invalid_address');
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

          this.update_patient(lat, lng);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  showtimepicker1() {
    this.setState({
      show: true,
    });
  }

  select_gender = val_3 => {
    this.setState({
      gender: val_3,
    });
    this.RBSheet5.close();
  };

  select_Date = date => {
    let dd = date.toISOString().split('T');
    let d1 = dd[0];

    let getAge = Math.floor((new Date() - new Date(d1).getTime()) / 3.15576e10);

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
      // age: getAge
    });
  };

  update_patient = (lat, lng) => {
    let uploaddata = new FormData();

    let name = this.state.name;
    let email = this.state.email;
    let address = this.state.address;
    let password = this.state.password;

    this.setState({spinner: true});

    uploaddata.append('name', name);
    uploaddata.append('email', email);
    uploaddata.append('password', password);
    uploaddata.append('lat', lat);
    uploaddata.append('lng', lng);
    uploaddata.append('address', address);
    uploaddata.append('user_id', this.state.id);
    uploaddata.append('mobile_number', this.state.mobile_number);
    uploaddata.append('dob', this.state.dob);
    uploaddata.append('age', this.state.age);

    console.log('Checking_Values_of_Inputs =>', this.state.mobile_number);
    console.log('Checking_Values_of_Inputs =>', this.state.id);

    let api = Connection + 'rest_apis.php?action=update_patient';
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
          // alert(this.props.Please_try_agin_later);
        } else {
          this.setState({
            spinner: false,
          });
          AsyncStorage.setItem('customer', JSON.stringify(response.response));

          Toast.show('You successfully updated your profile');

          // this.opendialogue();
          Actions.Patient_Tab_Screen();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  cancel = () => {
    this.setState({
      show: false,
    });
  };

  select_category = val_3 => {
    console.log('valvalvalvalvalvalvalvalvalvalvalval ', val_3);
    this.setState({
      insurance_name: val_3,
    });
    this.RBSheet2.close();
  };

  render() {
    // let AppComponent1 = Drawer_Screen;

    return (
      // <Drawer
      // ref={(ref) => { this.drawer = ref; }}
      //   content={<AppComponent1 />}
      //   openDrawerOffset={120}
      //   tapToClose={true}
      //   >

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <StatusBar backgroundColor="#9d0c0f" barStyle="light-content" />

          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: '#9d0c0f',
            }}>
            <Icon
              onPress={() => Actions.pop()}
              name="chevron-left"
              type="Entypo"
              style={{color: 'white', fontSize: 20}}
            />
            <Text style={{color: 'white', fontSize: 15, fontWeight: '700'}}>
              Edit Profile
            </Text>
            <Text> </Text>
          </View>

          <ScrollView>
            <View
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                borderRadius: 15,
                paddingVertical: 13,
                paddingHorizontal: 13,
                marginBottom: 55,
              }}>
              <Text style={{color: 'gray', marginTop: 10, fontWeight: '600'}}>
                You can edit your personal data.
              </Text>
              <Text style={{color: 'gray', marginTop: 5}}>Name</Text>

              <View
                style={{
                  width: '100%',
                  height: 45,
                  marginTop: 10,
                  borderColor: '#9d0c0f',
                  borderWidth: 1,
                  backgroundColor: '#f7d4d5',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Icon
                  name="person"
                  type="Ionicons"
                  style={{color: '#9d0c0f', fontSize: 16}}
                />

                <TextInput
                  value={this.state.name}
                  style={styles.textipu}
                  placeholder="Name"
                  placeholderTextColor="gray"
                  onChangeText={name => this.setState({name})}
                />
              </View>
              <Text style={{color: 'gray', marginTop: 5}}>Email</Text>
              <View
                style={{
                  width: '100%',
                  height: 45,
                  marginTop: 10,
                  borderColor: '#9d0c0f',
                  borderWidth: 1,
                  backgroundColor: '#f7d4d5',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Icon
                  name="email"
                  type="Zocial"
                  style={{color: '#9d0c0f', fontSize: 16}}
                />

                <TextInput
                  value={this.state.email}
                  style={styles.textipu}
                  placeholder={this.props.Email}
                  placeholderTextColor="gray"
                  onChangeText={email => this.setState({email})}
                />
              </View>
              <Text style={{color: 'gray', marginTop: 5}}>Password</Text>

              <View
                style={{
                  width: '100%',
                  height: 45,
                  marginTop: 10,
                  borderColor: '#9d0c0f',
                  borderWidth: 1,
                  backgroundColor: '#f7d4d5',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Icon
                  name="lock"
                  type="MaterialIcons"
                  style={{color: '#9d0c0f', fontSize: 16}}
                />

                <TextInput
                  value={this.state.password}
                  style={styles.textipu}
                  placeholder={this.props.Password}
                  placeholderTextColor="gray"
                  onChangeText={password => this.setState({password})}
                />
              </View>
              <Text style={{color: 'gray', marginTop: 5}}>Mobile Number</Text>

              <View
                style={{
                  width: '100%',
                  height: 45,
                  marginTop: 10,
                  borderColor: '#9d0c0f',
                  borderWidth: 1,
                  backgroundColor: '#f7d4d5',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Icon
                  name="mobile1"
                  type="AntDesign"
                  style={{color: '#9d0c0f', fontSize: 16}}
                />

                <TextInput
                  value={this.state.mobile_number}
                  style={styles.textipu}
                  placeholderTextColor="gray"
                  onChangeText={mobile_number => this.setState({mobile_number})}
                  placeholder="Mobile number"
                />
              </View>
              <Text style={{color: 'gray', marginTop: 5}}>Address</Text>

              <View
                style={{
                  width: '100%',
                  height: 45,
                  marginTop: 10,
                  borderColor: '#9d0c0f',
                  borderWidth: 1,
                  backgroundColor: '#f7d4d5',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Icon
                  name="address"
                  type="Entypo"
                  style={{color: '#9d0c0f', fontSize: 16}}
                />

                <TextInput
                  value={this.state.address}
                  style={styles.textipu}
                  placeholder="Address"
                  placeholderTextColor="gray"
                  onChangeText={address => this.setState({address})}
                />
              </View>

              <DateTimePickerModal
                isVisible={this.state.show}
                // date={new Date('1985-01-17',)}

                mode="date"
                onConfirm={date => this.select_Date(date)}
                onCancel={() => this.cancel()}
                timeZoneOffsetInMinutes={0}
                display="spinner"
              />

              <Text style={{color: 'gray', marginTop: 5}}>Date of Birth</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.showtimepicker1()}
                style={{
                  width: '100%',
                  height: 45,
                  marginTop: 10,
                  borderColor: '#9d0c0f',
                  borderWidth: 1,
                  backgroundColor: '#f7d4d5',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Icon
                  name="calendar"
                  type="FontAwesome"
                  style={{color: '#9d0c0f', fontSize: 16}}
                />

                <Text
                  style={
                    this.state.dob == 'Date of Birth'
                      ? {marginLeft: 10, color: 'gray'}
                      : {marginLeft: 10, color: 'black'}
                  }>
                  {this.state.dob}
                </Text>
              </TouchableOpacity>

              <Text style={{color: 'gray', marginTop: 5}}>Age</Text>

              <View
                style={{
                  width: '100%',
                  height: 45,
                  marginTop: 10,
                  borderColor: '#9d0c0f',
                  borderWidth: 1,
                  backgroundColor: '#f7d4d5',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Icon
                  name="airbag"
                  type="MaterialCommunityIcons"
                  style={{color: '#9d0c0f', fontSize: 16}}
                />

                <TextInput
                  value={this.state.age}
                  style={styles.textipu}
                  placeholderTextColor="gray"
                  onChangeText={age => this.setState({age})}
                  placeholder="Age"
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.Get_address();
                }}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  backgroundColor: '#9d0c0f',
                  height: 45,
                  alignSelf: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>

            <RBSheet
              ref={ref => {
                this.RBSheet1 = ref;
              }}
              height={300}
              openDuration={250}
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
                        style={{fontSize: 30, color: '#1878f3'}}
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
                        style={{fontSize: 30, color: '#1878f3'}}
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
          </ScrollView>

          <Dialog
            style={{backgroundColor: 'black', padding: 0}}
            width={'90%'}
            visible={this.state.visible}
            dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
            <DialogContent
              style={{paddingLeft: 0, paddingRight: 0, paddingBottom: 0}}>
              <Image
                source={require('../assets/logo_Black_Pagoda.png')}
                resizeMode="contain"
                style={{
                  width: 150,
                  height: 80,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
              />

              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                Congratulaions!
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'gray',
                  fontWeight: 'bold',
                  marginTop: 20,
                  paddingHorizontal: 50,
                }}>
                Your profile has been updated successfully, Next time updated
                data will be display in App
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
  phoneinput: {
    fontSize: 14,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.7,
    alignSelf: 'center',
    height: 38,
    width: '94%',
    alignSelf: 'center',
  },
  phoneinput_date: {
    fontSize: 16,
    width: '95%',
    // backgroundColor: 'white',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,

    alignSelf: 'center',
    paddingVertical: 5,

    borderBottomColor: 'gray',

    marginLeft: 6,
    marginTop: 5,
  },
  picker: {
    borderWidth: 1,
    color: 'black',
    borderColor: 'lightgray',
    height: 40,
  },
  textipu: {
    width: '100%',
    alignSelf: 'center',
    height: 48,
    borderRadius: 6,
    paddingLeft: 10,
    color: 'black',
  },
});

export default update_Patient_profile;
