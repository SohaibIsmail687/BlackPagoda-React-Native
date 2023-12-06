import {Row} from 'native-base';
import React, {Component} from 'react';
import {connect} from 'react-redux';

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
  Keyboard,
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
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_Login_Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile_number: '',
      Butun_Hide: true,
      checked: true,
      email: '',
      password: '',
      passhide: true,
      text1: 2,
      text2: 1,
      role: 'user',
    };
  }

  backAction = () => {
    // BackHandler.exitApp()
    Actions.Roll_Screen();
    // Actions.pop()
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {
    // console.log("aaaaaaaaaaaaa", remember);

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  };

  login = () => {
    let uploaddata = new FormData();
    let email = this.state.email;
    let password = this.state.password;

    if (email == '') {
      alert('Please enter email.');
    } else if (password == '') {
      alert('Please enter password.');
    } else {
      this.setState({spinner: true});
      uploaddata.append('email', email);
      uploaddata.append('password', password);
      uploaddata.append('role', this.state.role);

      console.log('RoleroleRoleroleRole', this.state.role);
      let api = Connection + 'rest_apis.php?action=login';

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
          if (response.response == 'fail') {
            this.setState({spinner: false});
            alert('Invalid email or password');
          } else {
            let record = response.response;
            let role = record[0].role;
            if (role == 'user') {
              this.setState({spinner: false});
              AsyncStorage.setItem(
                'customer',
                JSON.stringify(response.response),
              );

              Actions.Patient_Tab_Screen({update: true});
            } else {
              let record = response.response;
              let status = record[0].status;

              if (status == 'approved') {
                if (this.state.checked == true) {
                  let table = [];
                  table.push(email, password, 'doctor');
                  AsyncStorage.setItem('remember_1', JSON.stringify(table));
                } else {
                  AsyncStorage.removeItem('remember_1');
                }
                this.setState({spinner: false});
                AsyncStorage.setItem(
                  'customer',
                  JSON.stringify(response.response),
                );

                Actions.Doctor_Tab_Screen({update: true});
              } else {
                this.setState({spinner: false});
                alert(
                  'You have successfully registered but your account is under review.',
                );
              }
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
    // alert('Keyboard is open')
    this.setState({Butun_Hide: false});
  });
  keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
    // alert('Keyboard is closed')
    this.setState({Butun_Hide: true});
  });

  seePassword = () => {
    console.log('eeeeeeeeeeeee');
    this.setState({
      passhide: !this.state.passhide,
    });
  };

  changebtn(value, val) {
    this.setState({
      role: val,
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
        <StatusBar backgroundColor="white" barStyle="light-content" />

        <View style={{flex: 1, backgroundColor: '#f7d4d5'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: width,
                height: height / 3,
                backgroundColor: 'white',
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/logo_Black_Pagoda.png')}
                style={{
                  width: width / 1.2,
                  height: 200,
                  alignSelf: 'center',
                  borderRadius: 1000,
                }}
                resizeMode="contain"
              />
              <View
                style={{
                  width: width,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  bottom: 0,
                }}>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.changebtn('text1', 'user')}>
                  <View
                    style={
                      this.state.text1 == 1
                        ? styles.in_active_button
                        : styles.active_button
                    }>
                    <Text
                      style={
                        this.state.text1 == 1
                          ? styles.in_active_text
                          : styles.active_text
                      }>
                      Patient
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.changebtn('text2', 'doctor')}>
                  <View
                    style={
                      this.state.text2 == 1
                        ? styles.in_active_button
                        : styles.active_button
                    }>
                    <Text
                      style={
                        this.state.text2 == 1
                          ? styles.in_active_text
                          : styles.active_text
                      }>
                      Doctor
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                color: '#9d0c0f',
                fontSize: 22,
                fontWeight: 'bold',
                paddingHorizontal: 20,
                marginTop: 20,
              }}>
              Welcome
            </Text>
            <Text style={{color: 'gray', fontSize: 14, paddingHorizontal: 20}}>
              SignIn to Continue
            </Text>

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
                placeholder="Example@yahoo.com"
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
                secureTextEntry={this.state.passhide}
                onChangeText={password => this.setState({password})}
                style={{
                  width: '85%',
                  height: 50,
                  paddingLeft: 10,
                  alignSelf: 'center',
                  color: 'black',
                }}
                placeholder="*************"
                placeholderTextColor="gray"
              />
              {this.state.passhide == true ? (
                <Icon
                  name="eye"
                  type="Ionicons"
                  color="white"
                  onPress={() => this.seePassword()}
                  style={{fontSize: 25, color: '#9d0c0f'}}
                />
              ) : (
                <Icon
                  name="eye-off"
                  type="Ionicons"
                  color="white"
                  onPress={() => this.seePassword()}
                  style={{fontSize: 25, color: '#9d0c0f'}}
                />
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 18,
                marginVertical: 20,
              }}>
              <Text> </Text>
              <TouchableOpacity
                // onPress={() => Actions.Patient_Forgot_Screen()}
                onPress={() =>
                  Actions.Patient_Forgot_Screen({role: this.state.role})
                }
                activeOpacity={0.8}>
                <Text
                  style={{color: '#9d0c0f', fontSize: 13, fontWeight: 'bold'}}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.login()}
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                height: 50,
                backgroundColor: '#9d0c0f',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
            </TouchableOpacity>
          </ScrollView>
          {this.state.Butun_Hide == true ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                position: 'absolute',
                bottom: 15,
              }}>
              <Text style={{color: 'gray'}}>Don't have an account?</Text>

              {this.state.role == 'user' ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Actions.Patient_SignUp_Screen({role: this.props.role});
                  }}>
                  <Text style={{color: '#9d0c0f', fontWeight: 'bold'}}>
                    {' '}
                    Create an account
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Actions.doctor_signup({role: this.props.role});
                  }}>
                  <Text style={{color: '#9d0c0f', fontWeight: 'bold'}}>
                    {' '}
                    Create an account
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View></View>
          )}

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
  active_button: {
    width: '80%',
    height: 45,
    borderBottomColor: '#9d0c0f',
    borderBottomWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  in_active_button: {
    width: '80%',

    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 3,
  },

  active_text: {
    color: '#9d0c0f',
    fontSize: 16,
    fontWeight: 'bold',
  },

  in_active_text: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Patient_Login_Screen;
