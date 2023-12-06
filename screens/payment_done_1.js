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
  Pressable,
  Dimensions,
  BackHandler,
  AsyncStorage,
  ToastAndroid,
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
import moment from 'moment';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class payment_done_1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // spinner:true
    };
  }

  Add_appointment = () => {
    let uploaddata = new FormData();

    console.log('arrrrrrrrrrrrrrrr', this.props.doctor_id);
    console.log('arrrrrrrrrrrrr111111111111rrr', this.props.time);
    console.log('arrrrrrrrr2222222222rrrrrrr', this.props.day);

    this.setState({spinner: true});
    uploaddata.append('user_id', this.state.id);
    uploaddata.append('time', this.props.time);
    uploaddata.append('category', this.props.category);
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('date', this.props.date);
    uploaddata.append('day', this.props.day);
    uploaddata.append('fee', this.props.fee);
    uploaddata.append('payment_method', this.props.payment_method);

    let api = Connection + 'rest_apis.php?action=Add_Appointment';
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
        } else {
          let app_id = record[0];
          console.log('OOOOOOOOOOOOOOO', app_id);
          this.setState({
            spinner: false,
          });
          // ToastAndroid.show(this.props.Your_appointment_successfully_booked, ToastAndroid.SHORT);
          this.Add_App_Wallet(app_id);
          this.add_notification(app_id);
          this.notification();
        }
      })
      .catch(error => {
        console.error(error);
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

  componentDidMount = async () => {
    let aa = moment(new Date()).format('YYYY-MM-DD hh:mm a');
    console.log('QQQQQQQQQQQQ,AA', this.props.fcm_token);
    let split = aa.split(' ');
    let date = split[0];
    let time = split[1];
    let am_pm = split[2];
    let final_time = time + ' ' + am_pm;
    // let user = await AsyncStorage.getItem("customer");
    // let parsed = JSON.parse(user);
    // let id = parsed[0].id;
    // let name = parsed[0].name;
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww', this.props.category);

    // console.log("wwwwwwwwwwwwwwwwwwwwwwwwwww", name);
    // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww',payment_ride_price);

    this.setState({
      // name: name,
      // id: id,
      date: date,
      time: final_time,
    });
    // this.get_percentage()
    // this.Add_appointment()

    // setTimeout(() => {
    //   this.Add_Membership();
    // }, 500);
  };

  Add_App_Wallet = val => {
    let uploaddata = new FormData();

    this.setState({spinner: true});
    uploaddata.append('user_id', this.state.id);

    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('appointment_id', val);
    // uploaddata.append("day", this.props.day);
    uploaddata.append('d_earning', this.state.d_earning);

    uploaddata.append('price', this.props.fee);
    uploaddata.append('tax', '3');

    uploaddata.append('method', 'Card');

    let api = Connection + 'rest_apis.php?action=Add_App_Wallet';
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
          // alert(this.props.Something_went_wrong_try_agin_later);
        } else {
          this.setState({
            spinner: false,
          });
          // ToastAndroid.show(`Your appointment successfully booked!`, ToastAndroid.SHORT);
          // this.notification()
          // Actions.Patient_Tab_Screen({ app_id: app_id });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  add_notification = val => {
    let uploaddata = new FormData();
    uploaddata.append('user_id', this.state.id);
    uploaddata.append('time', this.state.time);
    uploaddata.append('type', 'success');
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('date', this.state.date);
    uploaddata.append('appointment_id', val);

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
    let to = this.props.fcm_token;
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
          body: this.state.name + ' has booked an appointment with you.',
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
      <View style={{flex: 1}}>
        <View
          style={{
            width: width,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2597CB',
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
            Payment Success
          </Text>
        </View>

        <Image
          style={{
            width: 180,
            height: 150,
            alignSelf: 'center',
            marginVertical: 50,
          }}
          source={require('../assets/116-1162232_credit-card-atm-card-vector-png-transparent-png-removebg-preview.png')}
        />

        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 20,
          }}>
          Payment Success!
        </Text>
        <Text
          style={{
            color: 'gray',
            fontSize: 13,
            textAlign: 'center',
            marginTop: 10,
          }}>
          You have been successfully payed{' '}
        </Text>
        <Text style={{color: 'gray', fontSize: 13, textAlign: 'center'}}>
          for appointment.
        </Text>

        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginLeft: 7,
            marginRight: 7,
            marginBottom: 5,
            width: width / 1.1,
            backgroundColor: 'white',
            borderRadius: 8,
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
            Transaction Details
          </Text>

          <View
            style={{
              justifyContent: 'space-between',
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Text style={{color: 'gray', fontSize: 12}}>Total fee</Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
              {this.props.fee}30$
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Text style={{color: 'gray', fontSize: 12}}>Date</Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
              {this.state.date}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Actions.Patient_Tab_Screen()}
          style={{
            width: width / 1.1,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            alignSelf: 'center',
            backgroundColor: '#2597CB',
            position: 'absolute',
            bottom: 15,
          }}>
          <Text style={{color: 'white'}}>Go Home</Text>
        </TouchableOpacity>

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
              <UIActivityIndicator color="#2597CB" />
              <Text
                style={{fontSize: 16, color: '#2597CB', fontWeight: 'bold'}}>
                Progressing your request
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default payment_done_1;
