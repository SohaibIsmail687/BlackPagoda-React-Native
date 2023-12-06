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
  Modal,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  BackHandler,
  ToastAndroid,
  Linking,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Connection from '../connection';
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
import RBSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'react-native-image-picker';
import ImageLoad from 'react-native-image-placeholder';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
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
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class doctor_site_appointment_detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      images: [
        'https://media.istockphoto.com/photos/accessible-information-is-crucial-for-current-medical-research-picture-id1287845968?b=1&k=20&m=1287845968&s=170667a&w=0&h=B3ucd3Y_G2SqLgz1wjKtEUY6brC0gRAx1bQUypz8nmc=',
        'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWVkaWNhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60r',
        'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvdmlkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://media.istockphoto.com/photos/mass-testing-for-covid19-sarscov2-infection-concept-several-rapid-picture-id1304108977?b=1&k=20&m=1304108977&s=170667a&w=0&h=lfBQM5amAwL3vfirxKGfZL6C6UvS1xYa-pQmKwXtkQg=', // Network image
      ],
      multi_images: [],
      spinner: false,
      filepath: this.props.perscription1,
      fileuri: this.props.perscription1,
      profile1: null,
      p_image: null,
      sender_email: 'masclinicas121@gmail.com',
      subject: 'Perscription Form',

      fileName: this.props.perscription,
      visible2: false,
      visible: false,
    };
  }

  backAction = () => {
    Actions.pop();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  onClickImage = async item => {
    this.selectedImage = [
      {
        url: item,
        props: {
          source: item,
        },
      },
    ];
    this.setState({
      visible2: true,
    });
  };

  onSwipeDown = () => {
    this.setState({
      visible2: false,
    });
  };

  get_percentage = () => {
    // console.log('((((((((((((((((((((((((((((((((',this.state.tax_percentage)

    let tax = Number((20 / 100) * this.props.fee).toFixed(2);
    // console.log('((((((((((((((((((((((((((((((((',tax)

    let d_earning = Number(this.props.fee - tax).toFixed(2);
    // console.log('((((((((((((((((((((((((((((((((',d_earning)

    this.setState({
      tax: tax,
      d_earning: d_earning,
    });
  };

  Update_payment = () => {
    let uploaddata = new FormData();

    // this.setState({ spinner: true });

    uploaddata.append('doctor_id', this.state.id);

    uploaddata.append('amount', this.state.d_earning);
    // uploaddata.append("day", this.props.day);

    //   uploaddata.append("day",this.props.day);

    console.log('kkkkkkk', this.state.id);

    let api = Connection + 'rest_apis.php?action=update_balance_doctor';
    console.log('pass =>pass =>pass =>pass => ', api);
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
        console.log(
          'KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK',
          response.response,
        );
        let record = response.response;
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });
          alert('Something went wrong try agin later');
        } else {
          this.setState({
            spinner: false,
          });
          Toast.show('You have successfully completed this appointment');
          // this.add_notification();
          this.notification();
          // ToastAndroid.show(`Your have successfully payed for session!`, ToastAndroid.SHORT);
          Actions.pop();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  complete_appointment = () => {
    this.setState({spinner: true, visible: false});

    let uploaddata = new FormData();

    uploaddata.append('doctor_id', this.state.id);
    uploaddata.append('appointment_id', this.props.appointment_id);

    let api = Connection + 'rest_apis.php?action=complete_appointment';
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
          this.setState({
            spinner: false,
          });
          alert('Please try again later.');
        } else {
          // this.opendialogue()
          this.add_notification();
          this.Update_payment();
          Actions.Doctor_Tab_Screen();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleDelete = () => {
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

  upload_perscription = () => {
    if (this.state.p_image == null) {
      alert('Select any Image as Prescription');
    } else {
      const newImage = {
        uri: this.state.p_image,
        name: 'my_file.jpg',
        type: 'image/jpg',
      };

      console.log('perscriptionImageperscriptionImagepers', newImage);

      this.setState({spinner: true});
      let uploaddata = new FormData();
      uploaddata.append('doctor_id', this.state.id);
      uploaddata.append('appointment_id', this.props.appointment_id);
      uploaddata.append('image', newImage);

      let api = Connection + 'rest_apis.php?action=upload_perscription';

      console.log('APIAPIAPIAPAIIAPAPIAPI', api);
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
          console.log('responseofperscriptionresponseofperscription', record);
          if (response.response == 'fail') {
            this.setState({
              spinner: false,
            });
            alert(this.props.Please_try_agin_later);
          } else {
            setTimeout(() => {
              this.setState({
                spinner: false,
              });
              Toast.show('You have successfully uploaded Perscription.');

              Actions.Doctor_Tab_Screen();
            }, 1000);
          }
        })
        .catch(error => {
          console.error(error);
        });
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

          this.setState({p_image: text, imagecheck: true});
        }
        this.RBSheet2.close();
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

          // this.state.multi_Images.push(text)
          // Actions.form({ multi_Images: this.state.multi_Images })
          this.setState({p_image: text, imagecheck: true});
        }
        this.RBSheet2.close();
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
    this.get_percentage();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    let user = await AsyncStorage.getItem('customer');

    console.log('aaaaaaaaaaaaa', user);
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;
    let profile = parsed[0].profile;
    let email = parsed[0].email;
    let category = parsed[0].category;
    let mobile_number = parsed[0].mobile_number;

    this.setState({
      id: id,
      name: name,
      profile1: profile,
      email: email,
      category: category,
      mobile_number: mobile_number,
    });

    var today = new Date();

    var nextweek_T = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    let date0 = nextweek_T.toString();
    let ddd = date0.split(' ');
    let day_1 = ddd[0];
    let dd_2 = ddd[1];
    let dd_3 = ddd[2];
    let dd_4 = ddd[3];
    let final_date_1 = dd_2 + ' ' + dd_3 + ', ' + dd_4;
    console.log('sssssssssss', final_date_1);
    this.setState({
      day_1: day_1,
      final_date_1: final_date_1,
    });

    if (this.props.perscription == null) {
      this.setState({
        p_image: null,
      });
    } else {
      let perscription1 =
        Connection + 'perscription/' + this.props.perscription;
      this.setState({
        p_image: perscription1,
      });
    }
  };

  open = (val, val1, val3) => {
    setTimeout(() => {
      this.RBSheet1.open();
    }, 100);
  };

  next = () => {
    this.RBSheet1.close();
    this.complete_appointment();
  };

  add_notification = () => {
    let aa = moment(new Date()).format('YYYY-MM-DD hh:mm A');
    let split = aa.split(' ');
    let date = split[0];
    let time = split[1];
    let am_pm = split[2];
    let final_time = time + '' + am_pm;

    let uploaddata = new FormData();
    uploaddata.append('user_id', this.props.user_id);
    uploaddata.append('time', final_time);
    uploaddata.append('type', 'complete');
    uploaddata.append('doctor_id', this.state.id);
    uploaddata.append('date', date);
    uploaddata.append('appointment_id', this.props.appointment_id);
    let api = Connection + 'rest_apis.php?action=add_notification';
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
        console.log(
          'KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK',
          response.response,
        );
        let record = response.response;
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });
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

  notification = async () => {
    let to = this.props.user_fcm_token;
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'key= AAAAggY2OZ8:APA91bH6Ph12nshAWeIuJ4viYbX-MDLb-EQrrUaCkn5MeJDD501Qpzzs8pwRQmC5qD5QJvzDDivB4vHNGN4qH9s-N2m1wMZc5QrDgptWZJ5syqmi-AQan2-KKeJ2HLQl33eO43AIRreo', //cloud server key
      },
      body: JSON.stringify({
        to: to,
        priority: 'high',
        notification: {
          title: 'Black Pagoda',
          body: this.state.name + ' is complete appointment with you.',
          sound: 'default',
          icon: 'myicon',
        },
      }),
    })
      .then(res => res.json())
      .then(resjson => console.log('test', resjson))
      .catch(err => console.log('error =>', err));
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fafafa'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingVertical: 15,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Icon
              name="arrowleft"
              type="AntDesign"
              style={{color: 'black', fontSize: 25}}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Appointment Details
          </Text>
          <Text></Text>
        </View>

        <View style={{borderWidth: 0.5, borderColor: 'lightgray'}}></View>

        <ScrollView>
          <Text
            style={{
              paddingHorizontal: 15,
              marginTop: 15,
              color: 'black',
              fontSize: 16,
            }}>
            Appointment With
          </Text>
          <View
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              backgroundColor: 'white',
              paddingHorizontal: 10,
              paddingVertical: 8,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ImageLoad
                style={styles.image}
                loadingStyle={{size: 'large', color: 'blue'}}
                source={{uri: this.props.profile}}
                borderRadius={12}
                placeholderStyle={styles.image}
              />
              <View style={{marginLeft: 10}}>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
                  {this.props.user_name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{color: '#bebebe', fontSize: 13, maxWidth: '100%'}}>
                  {this.props.user_address}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 15,
                marginTop: 5,
              }}>
              More about Patient
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Icon
                name="email"
                type="MaterialCommunityIcons"
                style={{color: '#9d0c0f', fontSize: 18}}
              />
              <Text style={{color: 'black', fontSize: 14, marginLeft: 5}}>
                {this.props.user_email}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Icon
                name="call"
                type="Ionicons"
                style={{color: '#9d0c0f', fontSize: 18}}
              />
              <Text style={{color: 'black', fontSize: 14, marginLeft: 5}}>
                {this.props.user_mobile}
              </Text>
            </View>

            {/* onPress={() => Actions.video_call({ receiver_id: this.props.user_id, receiver_name: this.props.user_name, sender_id: this.state.id, sender_name: this.state.name, receiver_image: this.props.profile, sender_image: this.state.profile1, fcm_token: this.props.user_fcm_token,role:'doctor' })} */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                width: '100%',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                // onPress={() =>
                //   Actions.video_call({
                //     receiver_id: this.props.user_id,
                //     receiver_name: this.props.user_name,
                //     sender_id: this.state.id,
                //     sender_name: this.state.name,
                //     receiver_image: this.props.profile,
                //     sender_image: this.state.profile1,
                //     fcm_token: this.props.user_fcm_token,
                //     role: 'doctor',
                //   })
                // }
                activeOpacity={0.8}
                style={{
                  height: 45,
                  borderRadius: 6,
                  backgroundColor: '#9d0c0f',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '45%',
                }}>
                <Icon
                  name="videocam"
                  type="Ionicons"
                  style={{color: 'white', fontSize: 18}}
                />
                <Text style={{color: 'white', marginLeft: 5, fontSize: 16}}>
                  Video Call
                </Text>
              </TouchableOpacity>
              {/* onPress={() => Actions.Chatroom({ disable: 'false', path: this.props.profile, chat_name: this.props.user_name, receiver_id: this.props.user_id, fcm_token: this.props.user_fcm_token })} */}
              <TouchableOpacity
                onPress={() =>
                  Actions.Chatroom({
                    disable: 'false',
                    path: this.props.profile,
                    chat_name: this.props.user_name,
                    receiver_id: this.props.user_id,
                    fcm_token: this.props.user_fcm_token,
                  })
                }
                activeOpacity={0.8}
                style={{
                  height: 45,
                  borderRadius: 6,
                  backgroundColor: '#9d0c0f',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '45%',
                }}>
                <Icon
                  name="chat"
                  type="Entypo"
                  style={{color: 'white', fontSize: 18}}
                />
                <Text style={{color: 'white', marginLeft: 5, fontSize: 16}}>
                  Chat
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              marginTop: 20,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
              paddingHorizontal: 20,
              paddingVertical: 15,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <Text
              //   numberOfLines={1}
              style={{
                color: '#9d0c0f',
                fontSize: 14,
                // maxWidth: "90%",

                fontWeight: 'bold',
              }}>
              Appointment Details
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',

                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
                marginVertical: 5,
                paddingTop: 5,
              }}></View>

            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 12,
                marginTop: 5,
              }}>
              Time{' '}
            </Text>
            <Text
              style={{color: 'black', fontSize: 12, maxWidth: '90%'}}
              numberOfLines={1}>
              {this.props.time}
            </Text>

            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 12,
                marginTop: 5,
              }}>
              Date & Day{' '}
            </Text>
            <Text
              style={{color: 'black', fontSize: 12, maxWidth: '90%'}}
              numberOfLines={1}>
              {this.props.date} {this.props.day}
            </Text>

            <Text
              style={{
                color: '#9d0c0f',
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 5,
              }}>
              Payment Details
            </Text>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',

                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
                marginVertical: 10,
              }}></View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                //   marginTop:5,
                alignItems: 'center',
              }}>
              <Text
                //   numberOfLines={1}
                style={{
                  color: 'black',
                  fontSize: 14,
                  // maxWidth: "90%",
                  fontWeight: 'bold',
                }}>
                Payment Method
              </Text>

              <Text
                //   numberOfLines={1}
                style={{
                  color: 'black',
                  fontSize: 14,
                  // maxWidth: "90%",
                }}>
                Card
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text
                //   numberOfLines={1}
                style={{
                  color: 'black',
                  fontSize: 14,
                  // maxWidth: "90%",
                  fontWeight: 'bold',
                  // marginTop:10
                }}>
                Total Fee
              </Text>

              <Text
                //   numberOfLines={1}
                style={{
                  color: 'black',
                  fontSize: 14,
                  // maxWidth: "90%",
                }}>
                ${this.props.fee}
              </Text>
            </View>
          </View>

          <View style={{borderWidth: 0.5, borderColor: 'lightgray'}}></View>

          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: 'bold',
              marginVertical: 10,
              paddingLeft: 20,
            }}>
            {this.props.Upload_Perscription}
          </Text>

          {this.state.p_image == null ? (
            <View>
              <View
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: height / 4,
                  borderWidth: 1,
                  borderColor: 'gray',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 20,
                }}>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => this.RBSheet2.open()}
                    activeOpacity={1}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#9d0c0f',
                    }}>
                    <Icon
                      name="camera-outline"
                      type="Ionicons"
                      style={{color: 'white', fontSize: 22}}
                    />
                  </TouchableOpacity>

                  <Text style={{color: 'black', marginTop: 10}}>
                    Upload picture prescription
                  </Text>
                </View>
              </View>

              {/*         
           
           <Text style={{color:'black',textAlign:'center',marginTop:20}}>Upload a clear version or your</Text>
           <Text style={{color:'black',textAlign:'center'}}>Prescription for getting better result.</Text> */}

              {/* <TouchableOpacity activeOpacity={0.8}
                 style={{width:width/1.2,alignSelf:'center',borderRadius:8,justifyContent:'center',alignItems:'center',paddingVertical:10,marginVertical:20,backgroundColor:'#2D7E8C'}}>
                 <Text style={{color:'white',marginLeft:10}}>Upload</Text>
           </TouchableOpacity> */}
            </View>
          ) : (
            <View>
              {this.props.status == 'complete' ||
              this.props.status == 'cancel' ? (
                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'center',
                    borderStyle: 'dashed',
                    borderRadius: 10,
                    height: height / 4,
                    borderWidth: 1,
                    borderColor: 'gray',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <ImageLoad
                    style={{
                      width: width / 1.1,
                      height: height / 4,
                      alignSelf: 'center',
                    }}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: this.state.p_image}}
                    borderRadius={10}
                  />
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      width: width / 1.1,
                      alignSelf: 'center',
                      borderStyle: 'dashed',
                      borderRadius: 10,
                      height: height / 4,
                      borderWidth: 1,
                      borderColor: 'gray',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <ImageLoad
                      style={{
                        width: width / 1.1,
                        height: height / 4,
                        alignSelf: 'center',
                      }}
                      loadingStyle={{size: 'large', color: 'blue'}}
                      source={{uri: this.state.p_image}}
                      borderRadius={10}
                    />
                  </View>

                  {/* 
           <Text style={{color:'black',textAlign:'center',marginTop:20}}>Upload a clear version or your</Text>
           <Text style={{color:'black',textAlign:'center'}}>Prescription for getting better result.</Text> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginVertical: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => this.RBSheet2.open()}
                      activeOpacity={1}
                      style={{
                        width: width / 2.4,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                        backgroundColor: '#9d0c0f',
                      }}>
                      <Text style={{color: 'white', marginLeft: 10}}>
                        ReTake
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.upload_perscription()}
                      activeOpacity={0.8}
                      style={{
                        width: width / 2.4,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                        marginLeft: 15,
                        backgroundColor: '#9d0c0f',
                      }}>
                      <Text style={{color: 'white', marginLeft: 10}}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}

          <View style={{borderWidth: 0.5, borderColor: 'lightgray'}}></View>

          {this.props.status == 'complete' && (
            <TouchableOpacity
              onPress={() => Actions.pop()}
              activeOpacity={0.8}
              style={{
                width: width / 1.1,
                backgroundColor: '#9d0c0f',
                marginBottom: 20,
                borderRadius: 8,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 15,
                marginVertical: 15,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Home</Text>
            </TouchableOpacity>
          )}
          {this.props.status == 'pending' && (
            <TouchableOpacity
              onPress={() => this.complete_appointment()}
              activeOpacity={0.8}
              style={{
                width: width / 1.1,
                backgroundColor: '#9d0c0f',
                borderRadius: 8,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 15,
                marginVertical: 15,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Complete Appointment
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <RBSheet
          ref={ref => {
            this.RBSheet1 = ref;
          }}
          closeOnDragDown={true}
          height={300}
          openDuration={270}
          customStyles={{
            container: {
              paddingHorizontal: 20,
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
                color: '#9d0c0f',
                marginTop: 5,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Complete Appointment
            </Text>

            <View
              style={{
                width: '100%',
                backgroundColor: 'lightgray',
                height: 1,
                marginVertical: 15,
              }}></View>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',
                textAlign: 'center',
                fontWeight: 'bold',
                paddingHorizontal: 30,
              }}>
              Are you sure to want complete this Appointment?
            </Text>

            <View
              style={{
                width: '100%',
                backgroundColor: 'lightgray',
                height: 1,
                marginVertical: 15,
              }}></View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.RBSheet1.close()}
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
                onPress={() => this.next()}
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
                  Yes Complete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>

        <RBSheet
          ref={ref => {
            this.RBSheet2 = ref;
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
                    style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
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

        <Modal visible={this.state.visible2} transparent={true}>
          <ImageViewer
            enableSwipeDown
            onSwipeDown={this.onSwipeDown}
            imageUrls={this.selectedImage}
          />
        </Modal>

        <Dialog
          style={{backgroundColor: 'black', padding: 0}}
          width={'85%'}
          visible={this.state.visible}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          onTouchOutside={() => this.handleDelete()}>
          <DialogContent
            style={{paddingLeft: 0, paddingRight: 0, borderRadius: 12}}>
            <View style={{alignItems: 'center'}}>
              {/* <View style={{ width: 100, height: 100, marginTop: 40, borderRadius: 100, backgroundColor: '#9d0c0f', alignItems: 'center', justifyContent: 'center' }}> */}
              {/* <Image source={require("../assets/autism.png")} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 40, }} /> */}
              <Image
                source={require('../assets/autism.png')}
                resizeMode="contain"
                style={{
                  width: 150,
                  height: 80,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
              />

              {/* </View> */}
              <Text
                style={{
                  fontSize: 22,
                  color: '#9d0c0f',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  paddingHorizontal: 40,
                }}
                numberOfLines={2}>
                Complete Appointment Success!
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: 'gray',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  paddingHorizontal: 30,
                  marginTop: 20,
                }}>
                You have succesfully completed this appointment.
              </Text>

              <TouchableOpacity
                onPress={() => this.handleDelete()}
                activeOpacity={0.8}
                style={{
                  width: '80%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 13,
                  marginTop: 30,
                  marginBottom: 10,
                  borderRadius: 100,
                  backgroundColor: '#9d0c0f',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
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
    );
  }
}

const styles = StyleSheet.create({
  four: {
    width: width / 1.1,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 15,
  },

  image: {
    width: 55,
    height: 55,
    borderRadius: 12,
  },
  unselect_date: {
    width: 100,
    height: 50,
    paddingVertical: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'white',
    marginHorizontal: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  select_date: {
    width: 100,
    height: 50,
    paddingVertical: 5,
    backgroundColor: '#04B08D',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  unselect_time: {
    height: 40,
    paddingVertical: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  select_time: {
    height: 40,
    paddingVertical: 5,
    backgroundColor: '#04B08D',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patient: {
    height: 50,
    paddingVertical: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'white',
    marginHorizontal: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileview: {
    paddingHorizontal: 20,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    Please_try_again_later: state.Please_try_again_later,
    Appointment_Details: state.Appointment_Details,
    Video_Call: state.Video_Call,
    Chat: state.Chat,
    Payment_Method: state.Payment_Method,
    Paypal: state.Paypal,

    Please_upload_perscription: state.Please_upload_perscription,
    You_have_successfully_completed_this_appointment:
      state.You_have_successfully_completed_this_appointment,
    You_have_successfully_upload_perscription:
      state.You_have_successfully_upload_perscription,
    Appointment_Date_Time: state.Appointment_Date_Time,
    Upload_Perscription: state.Upload_Perscription,
    Upload_picture_prescription: state.Upload_picture_prescription,
    ReTake: state.ReTake,
    Confirm: state.Confirm,
    Complete: state.Complete,
    Are_you_sure_want_complete_this_appointment:
      state.Are_you_sure_want_complete_this_appointment,

    Choose_an_action: state.Choose_an_action,
    Gallery: state.Gallery,
    Camera: state.Camera,
    Progressing_your_request: state.Progressing_your_request,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add_Vehicle: vehicle => {
      dispatch({type: 'add_Vehicle', payload: vehicle});
    },
    spanish_lang: (
      Please_try_again_later,
      Appointment_Details,
      Video_Call,
      Chat,
      Payment_Method,
      Paypal,
      Please_upload_perscription,
      You_have_successfully_completed_this_appointment,
      You_have_successfully_upload_perscription,
      Appointment_Date_Time,
      Upload_Perscription,
      Upload_picture_prescription,
      ReTake,
      Confirm,
      Complete,
      Are_you_sure_want_complete_this_appointment,
      Choose_an_action,
      Gallery,
      Camera,
      Progressing_your_request,
    ) => {
      dispatch({
        type: 'spanish_lang',
        payload: Please_try_again_later,
        Appointment_Details,
        Video_Call,
        Chat,
        Payment_Method,
        Paypal,
        Please_upload_perscription,
        You_have_successfully_completed_this_appointment,
        You_have_successfully_upload_perscription,
        Appointment_Date_Time,
        Upload_Perscription,
        Upload_picture_prescription,
        ReTake,
        Confirm,
        Complete,
        Are_you_sure_want_complete_this_appointment,
        Choose_an_action,
        Gallery,
        Camera,
        Progressing_your_request,
      });
    },
    english_lang: (
      Please_try_again_later,
      Appointment_Details,
      Video_Call,
      Chat,
      Payment_Method,
      Paypal,
      Please_upload_perscription,
      You_have_successfully_completed_this_appointment,
      You_have_successfully_upload_perscription,
      Appointment_Date_Time,
      Upload_Perscription,
      Upload_picture_prescription,
      ReTake,
      Confirm,
      Complete,
      Are_you_sure_want_complete_this_appointment,
      Choose_an_action,
      Gallery,
      Camera,
      Progressing_your_request,
    ) => {
      dispatch({
        type: 'english_lang',
        payload: Please_try_again_later,
        Appointment_Details,
        Video_Call,
        Chat,
        Payment_Method,
        Paypal,
        Please_upload_perscription,
        You_have_successfully_completed_this_appointment,
        You_have_successfully_upload_perscription,
        Appointment_Date_Time,
        Upload_Perscription,
        Upload_picture_prescription,
        ReTake,
        Confirm,
        Complete,
        Are_you_sure_want_complete_this_appointment,
        Choose_an_action,
        Gallery,
        Camera,
        Progressing_your_request,
      });
    },
    add_Social_User: social_user => {
      dispatch({type: 'add_Social_User', payload: social_user});
    },
    // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
    // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
    // addservice:(service)=>{dispatch({type:"addservice",payload:service})},
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(doctor_site_appointment_detail);
