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
  AsyncStorage,
  BackHandler,
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
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
import {connect} from 'react-redux';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import LinearGradient from 'react-native-linear-gradient';

class Patient_Forgot_Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      spinner: false,
      sender_email: 'admin@neurolifetherapy.com',
      subject: 'Forgot Password',
      visible: false,
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
    Actions.pop();
    return true;
  }

  exit() {
    BackHandler.exitApp();
  }

  Forget_password_email = () => {
    let uploaddata = new FormData();
    let email = this.state.email;

    if (email == '') {
      // alert(this.props.Email_feild_is_empty);
      alert('Email_feild_is_empty');
    } else {
      this.setState({spinner: true});

      uploaddata.append('email', email);
      uploaddata.append('role', this.props.role);
      // uploaddata.append('role', 'user');

      console.log('emailemailemailemailemail', email);
      console.log('rolerolerolerolerolerole', this.props.role);

      let api = Connection + 'rest_apis.php?action=email_user';

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
          console.log('response', response);
          let record = response.response;

          if (response.response == 'fail') {
            this.setState({
              spinner: false,
            });
            setTimeout(() => {
              // alert(this.props.Email_is_incorrect);
              alert('Email_is_incorrect');
            }, 100);
          } else {
            // this.opt_generate(email);
            let id = record[0].id;
            Actions.Patient_ChangePassword_Screen({Email: email, id: id});
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  opt_generate = val => {
    var length = 6,
      charset = '0123456789',
      retVal = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    setTimeout(() => {
      this.send_email(retVal);
      this.update_patient(retVal);
    }, 100);
  };

  send_email = code => {
    let uploaddata = new FormData();

    let sender_email = this.state.sender_email;
    let receiver_email = this.state.email;
    let subject = this.state.subject;

    let Text_email = 'Your  verification code for changing password is ' + code;
    let message = Text_email;

    console.log('embbbbbbbbbbbbbbbbbbbbbbbail =>', receiver_email);
    console.log('embbbbbbbbbbbbbbbbbbbbbbbail =>', sender_email);
    console.log('embbbbbbbbbbbbbbbbbbbbbbbail =>', subject);
    console.log('embbbbbbbbbbbbbbbbbbbbbbbail =>', message);

    uploaddata.append('sender_email', sender_email);
    uploaddata.append('receiver_email', receiver_email);
    uploaddata.append('subject', subject);
    uploaddata.append('message', message);

    let api =
      'https://neurolifetherapy.com/Neurolife/send_email.php?action=send_any_email';

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
        console.log('response1111', response.response);
      })
      .catch(error => {
        console.error('222', error);
      });
  };

  update_patient = code => {
    let uploaddata = new FormData();

    this.setState({spinner: true});

    uploaddata.append('email', this.state.email);
    uploaddata.append('otp', code);

    let api = Connection + 'rest_apis.php?action=update_otp';
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
        } else {
          let record = response.response;
          let id = record[0].id;
          this.setState({
            spinner: false,

            user_otp: code,
            user_id: id,
          });
          setTimeout(() => {
            this.opendialogue();
          }, 1000);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  done = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      Actions.password_verify_screen({
        id: this.state.user_id,
        otp: this.state.user_otp,
        Email: this.state.email,
      });
    }, 1000);
  };

  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Icon
            onPress={() => Actions.pop()}
            name="chevron-left"
            type="Entypo"
            style={{
              color: '#1B2E59',
              fontSize: 20,
              paddingLeft: 15,
              marginTop: 20,
            }}
          />

          <ScrollView>
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                backgroundColor: '#f7d4d5',
                alignSelf: 'center',
                marginTop: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="email"
                type="MaterialCommunityIcons"
                style={{color: '#9d0c0f', fontSize: 100}}
              />
            </View>

            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 30,
              }}>
              Forgot Password
            </Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 13,
                textAlign: 'center',
                paddingHorizontal: 15,
              }}>
              Enter your registered email and then you can reset your password.
            </Text>
            <View
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                backgroundColor: 'white',
                paddingVertical: 15,
                borderRadius: 8,
                color: 'black',
                paddingHorizontal: 10,
                marginTop: 30,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
                marginBottom: 30,
              }}>
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
                  style={styles.textipu}
                  placeholder="Email"
                  placeholderTextColor="gray"
                  onChangeText={email => this.setState({email})}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.Forget_password_email();
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
                  Continue
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              source={require('../assets/logo_Black_Pagoda.png')}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </ScrollView>

          <Dialog
            style={{backgroundColor: 'black', padding: 0}}
            width={'90%'}
            visible={this.state.visible}
            dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
            <DialogContent
              style={{paddingLeft: 0, paddingRight: 0, paddingBottom: 0}}>
              <Image
                source={require('../assets/autism.png')}
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Forgot Password
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'gray',
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                The code has been sent to your email
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  textAlign: 'center',
                  color: 'gray',
                  fontWeight: 'bold',
                  marginTop: 3,
                }}>
                After verifying otp you can reset your password
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
  phoneinput2: {
    width: width / 1.1,
    alignSelf: 'center',
    backgroundColor: '#e6e6ed',
    height: 40,
    borderRadius: 8,
    paddingLeft: 15,
    color: 'black',
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textipu: {
    width: '100%',
    alignSelf: 'center',
    height: 48,
    borderRadius: 6,
    paddingLeft: 10,
    color: 'black',
  },
  phoneinput: {
    paddingHorizontal: 10,
  },
  textage: {
    width: '55%',
    height: '55%',
  },
});

export default Patient_Forgot_Screen;
