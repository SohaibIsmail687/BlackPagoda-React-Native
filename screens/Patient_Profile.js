import React, {Component} from 'react';
import * as ImagePicker from 'react-native-image-picker';
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
  PermissionsAndroid,
  Linking,
  AsyncStorage,
  Platform,
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
import Connection from '../connection';
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
import Toast from 'react-native-simple-toast';
import {NavigationEvents} from 'react-navigation';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image1: null,
    };
  }

  backAction = () => {
    Actions.Patient_Tab_Screen();
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
    let user = await AsyncStorage.getItem('customer');

    console.log('aaaaaaaaaaaaa', user);
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;

    let address = parsed[0].address;
    let city = parsed[0].city;
    let email = parsed[0].email;
    let mobile_number = parsed[0].mobile_number;
    let profile1 = parsed[0].profile;
    let gender = parsed[0].gender;
    let age = parsed[0].age;

    if (profile1 == null) {
      console.log('profile1111111', profile1);

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
      city: city,
      mobile_number: mobile_number,

      email: email,
      address: address,
      gender: gender,
      age: age,
    });
  };

  update_photo = val => {
    const newImage = {
      uri: val,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    };

    let uploaddata = new FormData();
    // this.setState({spinner: true});
    uploaddata.append('image', newImage);
    uploaddata.append('user_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=update_photo';
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
          AsyncStorage.setItem('customer', JSON.stringify(response.response));

          Toast.show('You successfully updated your Profile');

          Actions.Patient_Tab_Screen();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

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

          this.update_photo(text);
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
          this.update_photo(text);
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

  dd = () => {
    this.componentDidMount();
  };

  offline = () => {
    let uploaddata = new FormData();
    uploaddata.append('id', this.state.id);
    let api = Connection + 'rest_apis.php?action=update_offline';
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
      .then(response => {})
      .catch(error => {
        console.error(error);
      });
  };

  logout = () => {
    this.RBSheet2.close();
    AsyncStorage.removeItem('customer');
    this.setState({
      check_login: false,
    });
    // this.offline()
    Actions.Patient_Login_Screen({role: 'user'});
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationEvents onDidFocus={payload => this.dd()} />

        <View
          style={{
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 13,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: 'white',
          }}>
          <Text style={{color: '#9d0c0f', fontSize: 20, fontWeight: 'bold'}}>
            Profile
          </Text>
          <Text style={{color: 'black', fontSize: 15, fontWeight: '700'}}>
            {' '}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: width / 1,
              backgroundColor: 'white',
              marginTop: 10,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              paddingHorizontal: 15,
              paddingVertical: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: 'center',
                  borderRadius: 100,
                }}>
                <ImageLoad
                  style={{width: 80, height: 80, borderRadius: 100}}
                  loadingStyle={{size: 'large', color: 'blue'}}
                  source={{uri: this.state.image1}}
                  borderRadius={100}
                  placeholderStyle={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                  }}
                />
              </View>
              <View style={{width: '73%', marginLeft: 10}}>
                <Text
                  style={{color: '#9d0c0f', fontWeight: 'bold', fontSize: 18}}>
                  {this.state.name}
                </Text>

                <Text style={{color: 'gray'}}>{this.state.email}</Text>
                <Text style={{color: 'gray'}}>{this.state.mobile_number}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <TouchableOpacity onPress={() => this.RBSheet1.open()}>
                <Text
                  style={{color: '#9d0c0f', fontWeight: 'bold', fontSize: 15}}>
                  Change
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Actions.update_patient_profile()}
                activeOpacity={0.8}
                style={{
                  width: 120,
                  paddingVertical: 5,
                  backgroundColor: '#9d0c0f',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 5,
                  marginLeft: 25,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => Actions.favourite_doctors()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Favourite Doctors
            </Text>
            <Icon
              name="chevron-right"
              type="Entypo"
              style={{color: 'gray', fontSize: 22}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Actions.Notifications()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Notifications
            </Text>
            <Icon
              name="chevron-right"
              type="Entypo"
              style={{color: 'gray', fontSize: 22}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Actions.Patient_Wallet()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Transactions
            </Text>
            <Icon
              name="chevron-right"
              type="Entypo"
              style={{color: 'gray', fontSize: 22}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Terms & Conditions
            </Text>
            <Icon
              name="chevron-right"
              type="Entypo"
              style={{color: 'gray', fontSize: 22}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              About US
            </Text>
            <Icon
              name="chevron-right"
              type="Entypo"
              style={{color: 'gray', fontSize: 22}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Help & Support
            </Text>
            <Icon
              name="chevron-right"
              type="Entypo"
              style={{color: 'gray', fontSize: 22}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Actions.Delete_Account()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Delete Account
            </Text>
            <Icon
              name="chevron-right"
              type="Entypo"
              style={{color: 'gray', fontSize: 22}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.RBSheet2.open()}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: width / 1.1,
              alignSelf: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
              Logout
            </Text>
            <Icon
              name="chevron-right"
              type="Entypo"
              style={{color: 'gray', fontSize: 22}}
            />
          </TouchableOpacity>
        </ScrollView>

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
              Cosa vuoi fare?
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
                    style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                    Galleria
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
                    style={{fontSize: 30, color: '#9d0c0f'}}
                  />
                  <Text
                    style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                    Camera
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        <RBSheet
          ref={ref => {
            this.RBSheet2 = ref;
          }}
          height={220}
          closeOnDragDown={true}
          openDuration={220}
          customStyles={{
            container: {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
            draggableIcon: {
              backgroundColor: 'lightgray',
            },
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: 'red',
                marginTop: 5,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Logout
            </Text>
            <View
              style={{
                width: width / 1 - 50,
                borderBottomWidth: 1,
                borderColor: '#d2d5da',
                marginVertical: 20,
                alignSelf: 'center',
              }}></View>

            <Text style={{color: 'black', fontSize: 15, alignSelf: 'center'}}>
              Are you sure you want to logout?
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 25,
                marginBottom: 10,
                paddingHorizontal: 17,
              }}>
              <TouchableOpacity
                onPress={() => this.RBSheet2.close()}
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

              <TouchableOpacity
                onPress={() => this.logout()}
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
                  Yes, Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

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
      </View>
    );
  }
}

export default Patient_Profile;
