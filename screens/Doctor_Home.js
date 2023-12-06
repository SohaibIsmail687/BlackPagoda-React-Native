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
  AppState,
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
import Connection from '../connection';
import ImageLoad from 'react-native-image-placeholder';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {Web} from 'react-native-openanything';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import StarRating from 'react-native-star-rating';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
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
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {NavigationEvents} from 'react-navigation';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Doctor_Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      spinner: false,
      date: '2021-2-22',

      profile: null,
      image1: null,

      profile_check: false,
      imagecheck: false,
      id: '',
      name: '',
      email: '',
      password: '',
      data1: [],
      data9: [],

      token: '',

      appState: AppState.currentState,
      skalton: false,
      skalton1: true,
      balance: 0,

      day_1: '',
      final_date_1: '',
      appointment: '',
      final_time: '',
      date: '',
    };
  }

  online = () => {
    let uploaddata = new FormData();

    console.log('ttttttttttttttttttttttt', this.state.id);

    uploaddata.append('id', this.state.id);

    let api = Connection + 'rest_apis.php?action=update_online';
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
        console.log(
          'KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK',
          response.response,
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  offline = () => {
    let uploaddata = new FormData();

    console.log('ttttttttttttttttttttttt', this.state.id);

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
      .then(response => {
        console.log(
          'KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK',
          response.response,
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  check_call = async () => {
    let user = await AsyncStorage.getItem('customer');

    if (user != null) {
      let parsed = JSON.parse(user);
      let id = parsed[0].id;
      let role = parsed[0].role;
      let uploaddata = new FormData();
      uploaddata.append('receiver_id', id);
      let api = Connection + 'rest_apis.php?action=check_call';
      console.log(api);
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
          console.log(response.response);
          let hasRecord = response.response;
          if (hasRecord == 'fail') {
          } else {
            let api = Connection + 'rest_apis.php?action=call_status_change';
            console.log(api);
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
                console.log('Calling status  ', response.response);
              });
            // console.log("calllllllll22222222222222")
            let receiver = hasRecord[0].sender_name;
            let receiver_image = hasRecord[0].sender_image;
            let receiver_id = hasRecord[0].sender_id;
            let sender_id = hasRecord[0].receiver;
            let type = hasRecord[0].type;
            if (receiver_image != null) {
              receiver_image = Connection + 'images/' + receiver_image;
            }
            let room = hasRecord[0].room;
            // console.log("calllllllll", room)
            if (type == 'audio') {
              Actions.pick_audio_call({
                receiver: receiver,
                receiver_image: receiver_image,
                room: room,
                sender_id: sender_id,
                receiver_id: receiver_id,
                role: role,
              });
            } else {
              Actions.pick_video_call({
                receiver: receiver,
                receiver_image: receiver_image,
                room: room,
                sender_id: sender_id,
                receiver_id: receiver_id,
                role: role,
              });
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!', nextAppState);
      // this.check_call()
    }
    this.setState({appState: nextAppState});

    if (nextAppState === 'active') {
      console.log('ggg', nextAppState);
      this.check_call();
      this.online();
    } else {
      console.log('hhh', nextAppState);
      this.offline();
    }

    console.log('22', nextAppState);
  };

  backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {
    let aaa = moment(new Date()).format('YYYY-MM-DD hh:mm a');
    console.log('QQQQQQQQQQQQ,AA', this.props.fcm_token);
    let split = aaa.split(' ');
    let date = split[0];
    let time = split[1];
    let am_pm = split[2];
    let final_time = time + ' ' + am_pm;
    console.log('redux', this.props.Status1);
    let aa = 'aas';
    this.props.Status(aa);
    if (this.props.Status1 == 'sta') {
      AppState.addEventListener('change', this._handleAppStateChange);
    } else {
    }

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    let user = await AsyncStorage.getItem('customer');
    console.log('aaaaaaaaaaaaa', user);
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;
    let email = parsed[0].email;
    let appointment = parsed[0].appointment;
    let password = parsed[0].password;
    let profile1 = parsed[0].profile;
    let profile = Connection + 'images/' + profile1;
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
    this.setState({
      name: name,
      email: email,
      password: password,
      id: id,
      image1: profile,
      day_1: day_1,
      final_date_1: final_date_1,
      appointment: appointment,
      time: final_time,
      date: date,
      // profile: profile,
    });

    // this.check_doctor_sheduling(appointment);
    this.check_doctor_sheduling();
    this.display_appointments_doctor();
    this.get_total_balance();
    this.get_total_patient();
    // this.Get_Data_1()

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
            this.update_fcm_token(id, currentToken);
            console.log('current tokens', currentToken);
            //   console.log('notificaiton data:',this.state.noti)
          } else {
            alert('No Instance ID token');
          }
        })
        .catch(err => {
          console.log(err);
        });
      console.log('Permission settings:', settings);
    } else {
      console.log('Permission settings:', settings);
    }
    // firebase.InitializeApp(this);
  };

  dd = () => {
    this.display_appointments_doctor();
  };

  update_fcm_token = (val1, val2) => {
    let uploaddata = new FormData();
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
          // this.setState({
          //     spinner: false,
          // });
          alert(this.props.Please_try_agin_later);
        } else {
          // this.setState({
          //     spinner: false,
          // });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  check_doctor_sheduling = val => {
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.id);
    let api = Connection + 'rest_apis.php?action=check_doctor_sheduling';
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
        console.log('sssssssssssssssssssssssssssssssss', record);
        if (record == 'fail') {
          Actions.add_schedulling();
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_total_patient = () => {
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.id);
    let api = Connection + 'rest_apis.php?action=get_total_patient';

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
          let t_p = record[0];
          this.setState({
            total_patient_complete: t_p,
          });
        } else {
          this.setState({
            total_patient_complete: 0,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_total_balance = () => {
    let uploaddata = new FormData();
    uploaddata.append('id', this.state.id);
    let api = Connection + 'rest_apis.php?action=get_balance';

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
        console.log('recccccccccco', record);

        if (record != 'fail') {
          let balance_1 = record[0];
          console.log('recccccccccco', balance_1);
          let balance_2 = balance_1['balance'];
          console.log('recccccccccco', balance_2);
          if (balance_2 == null) {
            this.setState({
              balance: 0,
            });
          } else {
            this.setState({
              balance: balance_2,
            });
          }
        } else {
          this.setState({
            balance: 0,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  open = (val, val1, va3, val4, val5, val6) => {
    this.get_percentage(val5);
    console.log('CCCCCCCCCCCCCCCCCC', val5);
    this.setState({
      appointment_id_cancel: val,
      user_id: val1,
      fcm_token: va3,

      fee: val5,
    });
    setTimeout(() => {
      this.RBSheet1.open();
    }, 100);
  };

  complete_appointment = () => {
    this.RBSheet1.close();
    this.setState({spinner: true, visible: false});
    let uploaddata = new FormData();
    uploaddata.append('user_id', this.state.user_id);
    uploaddata.append('appointment_id', this.state.appointment_id_cancel);
    uploaddata.append('doctor_id', this.state.id);
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
          alert(this.props.Something_went_wrong);
        } else {
          this.Update_payment();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_percentage = val => {
    // console.log('((((((((((((((((((((((((((((((((',this.state.tax_percentage)

    let tax = Number((20 / 100) * val).toFixed(2);
    // console.log('((((((((((((((((((((((((((((((((',tax)

    let d_earning = Number(val - tax).toFixed(2);
    // console.log('((((((((((((((((((((((((((((((((',d_earning)

    this.setState({
      tax: tax,
      d_earning: d_earning,
    });
  };

  Update_payment = () => {
    let uploaddata = new FormData();
    console.log('kkkkkkk', this.state.id);

    uploaddata.append('doctor_id', this.state.id);
    uploaddata.append('amount', this.state.d_earning);

    let api = Connection + 'rest_apis.php?action=update_balance_doctor';
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
        console.log(
          'KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK',
          response.response,
        );
        let record = response.response;
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });
          // alert("Something went wrong try agin later");
        } else {
          // this.setState({
          //   spinner: false,
          // });
          this.add_notification();
          this.get_total_balance();
          //   this.opendialogue()
          //   this.notification()
          // ToastAndroid.show(`Your have successfully payed for session!`, ToastAndroid.SHORT);
          // Actions.pop()

          //   this.Add_App_Wallet()
          this.notification();
          // Actions.Patient_Tab_Screen({ app_id: app_id });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  notification = async () => {
    let to = this.state.fcm_token;
    console.log('TOTOTOTOOTOOTOTTO', to);
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
          body: this.state.name + ' is completed your appointment.',
          sound: 'default',
          icon: 'myicon',
        },
      }),
    })
      .then(res => res.json())
      .then(resjson => console.log('test', resjson))
      .catch(err => console.log('error =>', err));
  };

  add_notification = () => {
    let uploaddata = new FormData();

    uploaddata.append('user_id', this.state.user_id);
    uploaddata.append('time', this.state.time);
    uploaddata.append('type', 'complete');
    uploaddata.append('doctor_id', this.state.id);
    uploaddata.append('date', this.state.date);
    uploaddata.append('appointment_id', this.state.appointment_id_cancel);

    let api = Connection + 'rest_apis.php?action=add_notification';
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
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });
        } else {
          Toast.show('You have successfully completed this appointment');

          this.setState({
            spinner: false,
          });
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
      this.display_appointments_doctor();
    }, 100);
  };

  opendialogue = () => {
    this.setState({
      visible: true,
    });
  };

  display_appointments_doctor = () => {
    this.setState({
      skalton: true,
    });
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.id);
    let api = Connection + 'rest_apis.php?action=display_appointments_doctor_1';
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
        if (record4 != 'fail') {
          this.setState({
            data1: record4,
            skalton: false,
          });
        } else {
          this.setState({
            data1: [],
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  createtable1 = () => {
    let table = [];
    let record1 = this.state.data1;

    let len = record1.length;
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let date = record1[i].date;
        let doctor_name = record1[i].doctor_name;
        let user_name = record1[i].user_name;
        let user_address = record1[i].user_address;
        let symtoms_images = record1[i].symtoms_images;
        let user_id = record1[i].user_id;
        let day = record1[i].day;
        let registration_number = record1[i].registration_number;
        let symptoms = record1[i].symptoms;
        let fee = record1[i].fee;
        let subject = record1[i].subject;
        let time = record1[i].time;
        let user_email = record1[i].user_email;
        let user_mobile = record1[i].user_mobile;
        let status = record1[i].status;
        let appointment_id = record1[i].id;

        let payment_method = record1[i].payment_method;
        let app_rating = record1[i].app_rating;
        let comment = record1[i].comment;

        let user_age = record1[i].user_age;
        let user_gender = record1[i].user_gender;
        let m_record = record1[i].m_record;
        console.log(m_record, 'dssssssssddddd');

        if ((m_record != null) & (m_record != 'null')) {
          var m_images = record1[i].m_images;
          var m_documents = record1[i].m_documents;
          var m_doc_name = record1[i].m_doc_name;
          var m_doc_name_1 = JSON.parse(m_doc_name);

          var m_images_1 = m_images.split(',');

          var m_documents_1 = m_documents.split(',');

          console.log(m_images_1);
        }

        let perscription = record1[i].perscription;
        let type = record1[i].type;
        let user_fcm_token = record1[i].user_fcm_token;
        let doctor_profile = record1[i].doctor_profile;
        let perscription1 = Connection + 'perscription/' + perscription;
        let profile1 = record1[i].user_profile;
        let profile = Connection + 'images/' + profile1;
        table.push(
          <View>
            {
              <View
                style={{
                  backgroundColor: 'white',
                  width: width / 1.1,
                  marginVertical: 5,
                  marginHorizontal: 5,
                  alignSelf: 'center',
                  borderRadius: 8,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop: 15,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ImageLoad
                    style={{width: 70, height: 70, borderRadius: 40}}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: profile}}
                    borderRadius={40}
                    placeholderStyle={{width: 70, height: 70, borderRadius: 40}}
                  />
                  {/* <Image
                    style={{width: 70, height: 70, borderRadius: 40}}
                    source={require('../assets/carlo.jpg')}
                  /> */}

                  <View style={{marginLeft: 10, width: '75%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: '#9d0c0f',
                          fontWeight: 'bold',
                          fontSize: 16,
                          maxWidth: '70%',
                        }}
                        numberOfLines={1}>
                        {user_name}
                      </Text>
                      <View
                        style={{
                          width: 80,
                          height: 24,
                          borderRadius: 8,
                          backgroundColor: 'orange',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 10,
                          }}>
                          Upcoming
                        </Text>
                      </View>
                    </View>
                    <Text
                      allowFontScaling={false}
                      style={{color: 'black', fontWeight: 'bold', fontSize: 14}}
                      numberOfLines={2}>
                      {user_address}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '36%',
                        }}>
                        <Icon
                          name="calendar"
                          type="Entypo"
                          style={{color: 'gray', fontSize: 16}}
                        />

                        <Text
                          allowFontScaling={false}
                          style={{
                            color: 'gray',
                            fontSize: 12,
                            fontWeight: 'bold',
                            width: '85%',
                          }}
                          numberOfLines={1}>
                          {' '}
                          {date}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '30%',
                          marginLeft: 10,
                        }}>
                        <Icon
                          name="clockcircle"
                          type="AntDesign"
                          style={{color: 'gray', fontSize: 16}}
                        />

                        <Text
                          allowFontScaling={false}
                          style={{
                            color: 'gray',
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}
                          numberOfLines={1}>
                          {' '}
                          {time}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '30%',
                          marginLeft: 10,
                        }}>
                        <Icon
                          name="coins"
                          type="FontAwesome5"
                          style={{color: 'gray', fontSize: 16}}
                        />

                        <Text
                          allowFontScaling={false}
                          style={{
                            color: 'gray',
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}
                          numberOfLines={1}>
                          {' '}
                          ${fee}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingHorizontal: 15,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.open(
                        appointment_id,
                        user_id,
                        user_fcm_token,
                        user_id,
                        fee,
                      )
                    }
                    activeOpacity={0.8}
                    style={{
                      width: '47%',
                      marginBottom: 10,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                      borderRadius: 8,
                      backgroundColor: '#9d0c0f',
                      borderWidth: 1,
                      borderColor: '#9d0c0f',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      Complete
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      Actions.doctor_site_appointment_detail({
                        m_record: m_record,
                        comment: comment,
                        app_rating: app_rating,
                        payment_method: payment_method,
                        user_gender: user_gender,
                        user_age: user_age,
                        user_name: user_name,
                        date: date,
                        day: day,
                        time: time,
                        registration_number: registration_number,
                        profile: profile,
                        subject: subject,
                        symptoms: symptoms,
                        symtoms_images: symtoms_images,
                        user_address: user_address,
                        user_email: user_email,
                        user_mobile: user_mobile,
                        user_id: user_id,
                        appointment_id: appointment_id,
                        fee: fee,
                        perscription1: perscription1,
                        perscription: perscription,
                        user_fcm_token: user_fcm_token,
                        status: status,
                      })
                    }
                    activeOpacity={0.8}
                    style={{
                      width: '47%',
                      marginBottom: 10,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: '#9d0c0f',
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: '#9d0c0f',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      View Details
                    </Text>
                  </TouchableOpacity>
                </View>
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

  dd = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationEvents onDidFocus={payload => this.dd()} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
          }}>
          <ImageLoad
            style={{width: 45, height: 45, borderRadius: 200}}
            loadingStyle={{size: 'large', color: 'blue'}}
            source={{uri: this.state.image1}}
            borderRadius={200}
            placeholderStyle={{width: 45, height: 45, borderRadius: 200}}
          />
          {/* <Image
            style={{width: 45, height: 45, borderRadius: 200}}
            source={require('../assets/doctor-11.jpg')}
          /> */}

          <Text
            allowFontScaling={false}
            style={{color: '#9d0c0f', fontSize: 20, fontWeight: 'bold'}}>
            Home
          </Text>
          {/* <Image style={{width:70,height:70,   }} resizeMode="contain" source={require('../assets/PELLISO.jpg')}/> */}

          <Icon
            name="bell-o"
            type="FontAwesome"
            style={{color: '#9d0c0f', fontSize: 25, borderRadius: 10}}
          />
        </View>

        <Text
          allowFontScaling={false}
          style={{
            color: '#9d0c0f',
            fontWeight: 'bold',
            fontSize: 18,
            paddingHorizontal: 15,
            marginTop: 10,
          }}>
          Hello, {this.state.name}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: 'gray',
            fontSize: 15,
            paddingHorizontal: 15,
            marginBottom: 10,
          }}>
          {this.state.date}
        </Text>

        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            paddingHorizontal: 10,
            width: width / 1.1,
            height: 80,
            borderRadius: 5,
            flexDirection: 'row',
            backgroundColor: 'white',
            borderColor: '#9d0c0f',
            borderWidth: 2,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f7d4d5',
            }}>
            <Icon
              name="calendar"
              type="Entypo"
              style={{color: '#9d0c0f', fontSize: 20}}
            />
          </View>

          <View>
            <Text
              allowFontScaling={false}
              style={{
                color: '#9d0c0f',
                fontWeight: 'bold',
                fontSize: 18,
                marginLeft: 14,
              }}>
              {' '}
              {this.state.total_patient_complete}
            </Text>
            <Text
              allowFontScaling={false}
              style={{color: '#9d0c0f', fontSize: 14, marginLeft: 14}}>
              Complete Appointments
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 10,
            width: width / 1.1,
            height: 80,
            borderRadius: 5,
            flexDirection: 'row',
            backgroundColor: 'white',
            paddingHorizontal: 12,
            borderColor: '#9d0c0f',
            borderWidth: 2,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f7d4d5',
            }}>
            <Icon
              name="dollar"
              type="FontAwesome"
              style={{color: '#9d0c0f', fontSize: 20}}
            />
          </View>

          <View>
            <Text
              allowFontScaling={false}
              style={{
                color: '#9d0c0f',
                fontWeight: 'bold',
                fontSize: 18,
                marginLeft: 14,
              }}>
              ${this.state.balance}
            </Text>
            <Text
              allowFontScaling={false}
              style={{color: '#9d0c0f', fontSize: 14, marginLeft: 14}}>
              Total Balance
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            allowFontScaling={false}
            style={{color: '#9d0c0f', fontWeight: 'bold', fontSize: 18}}>
            Upcoming Appointments
          </Text>
          <Text
            allowFontScaling={false}
            style={{color: '#9d0c0f', fontFamily: 'DMSans-Bold', fontSize: 16}}>
            {' '}
          </Text>
        </View>
        <ScrollView>
          {this.state.skalton == true ? (
            <ScrollView style={{marginHorizontal: 8}}>
              <SkeletonPlaceholder>
                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 15,
                    paddingBottom: 10,
                    backgroundColor: 'white',
                    borderRadius: 8,
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                    marginLeft: 7,
                    marginRight: 7,
                    marginBottom: 5,
                    height: height / 5,
                  }}></View>
              </SkeletonPlaceholder>
              <SkeletonPlaceholder>
                <View
                  style={{
                    width: width / 1.1,
                    alignSelf: 'center',
                    marginTop: 15,
                    paddingBottom: 10,
                    backgroundColor: 'white',
                    borderRadius: 8,
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 3,
                    marginLeft: 7,
                    marginRight: 7,
                    marginBottom: 5,
                    height: height / 5,
                  }}></View>
              </SkeletonPlaceholder>
            </ScrollView>
          ) : (
            <View>
              {this.state.data1 == '' ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: height / 4,
                    alignSelf: 'center',
                    width: width,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontFamily: 'DMSans-Regular',
                      color: 'black',
                    }}>
                    No appointment found.
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 30,
                    marginHorizontal: 7,
                  }}>
                  <ScrollView>{this.createtable1()}</ScrollView>
                </View>
              )}
            </View>
          )}

          <View style={{marginBottom: 30}}></View>
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
                allowFontScaling={false}
                style={{
                  fontSize: 16,
                  color: '#9d0c0f',
                  fontFamily: 'DMSans-Bold',
                }}>
                Progressing your request
              </Text>
            </View>
          </View>
        )}

        <RBSheet
          ref={ref => {
            this.RBSheet1 = ref;
          }}
          closeOnDragDown={true}
          height={220}
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
              allowFontScaling={false}
              style={{
                fontSize: 18,
                color: 'red',
                marginTop: 5,
                textAlign: 'center',
                fontFamily: 'DMSans-Bold',
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
              allowFontScaling={false}
              style={{
                fontSize: 14,
                color: 'gray',
                textAlign: 'center',
                fontFamily: 'DMSans-Bold',
                paddingHorizontal: 30,
              }}>
              Are you sure you want to complete this appointment?
            </Text>
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
                <Text
                  allowFontScaling={false}
                  style={{color: '#9d0c0f', fontFamily: 'DMSans-Bold'}}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.complete_appointment()}
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
                <Text
                  allowFontScaling={false}
                  style={{color: 'white', fontFamily: 'DMSans-Bold'}}>
                  Yes, Complete
                </Text>
              </TouchableOpacity>
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
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
  },
  in_active_text: {
    color: 'gray',
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
  },
});

const mapStateToProps = state => {
  return {
    Status1: state.Status1,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    Status: Status1 => {
      dispatch({type: 'Status', payload: Status1});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor_Home);
