import {Row} from 'native-base';
import React, {Component} from 'react';
import ImageLoad from 'react-native-image-placeholder';

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
  Pressable,
  ToastAndroid,
  BackHandler,
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
import {connect} from 'react-redux';
import Connection from '../connection';
import moment from 'moment';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class book_appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      date1: new Date(),
      mode1: 'time',
      dateshow1: '',
      timeshow1: '',
      timeshow2: '',
      dateshow2: '',

      date_1: '',
      date_2: '',
      date_3: '',
      date_4: '',
      date_5: '',
      date_6: '',
      date_7: '',
      day_1: 'aa',
      day_2: '',
      day_3: '',
      day_4: '',
      day_5: '',
      day_6: '',
      day_7: '',
      appointment_date: this.props.final_date_1,

      arr: [],
      arr1: [],
      arr2: [],
      arr3: [],
      arr4: [],
      arr5: [],

      record1: [],
      record2: [],
      data4: [],
      monday1: [],
      tuesday1: [],
      wednesday1: [],
      thursday1: [],
      saturday1: [],
      friday1: [],
      sunday1: [],

      main_array: [],

      category: this.props.day_1,
      text1: 2,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      text7: 1,

      timeSelected: false,
      timeSelected1: false,
      add_new: false,

      show1: false,
      updated_time: '',
      value_for_updating_index: '',
      changes_time_for_specific_day: this.props.day_1,
      appointment_time: '',

      final_date: '',
      spinner: false,
      payment_method: '',
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

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    let aa = moment(new Date()).format('YYYY-MM-DD hh:mm A');
    console.log('QQQQQQQQQQQQ,AA', aa);
    console.log(
      'Doctor_idDoctor_idDoctor_idDoctor_idDoctor_id',
      this.props.doctor_id,
    );
    let split = aa.split(' ');
    let date = split[0];

    let time = split[1];
    let am_pm = split[2];
    let final_time = time + '' + am_pm;

    this.setState({
      time: final_time,
      date: date,
    });

    let user = await AsyncStorage.getItem('customer');

    let parsed = JSON.parse(user);
    let aaa = new Date();
    let id = parsed[0].id;

    console.log(
      'fcm_token,fcm_token,fcm_token,fcm_token',
      this.props.fcm_token,
    );
    this.setState({
      id: id,
    });

    // this.get_shedule();
    // this.get_total_patient();
    // this.get_liked_doctor();
  };

  changebtn(value, val) {
    this.setState({
      payment_method: val,
    });

    if (this.state[value] == 2) {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,
        text4: 1,
        text5: 1,
        text6: 1,
        text7: 1,
        text8: 1,
        [value]: 2,
      });
    } else {
      this.setState({
        text1: 1,
        text2: 1,
        text3: 1,
        text4: 1,
        text5: 1,
        text6: 1,
        text7: 1,
        text8: 1,
        [value]: 2,
      });
    }
  }

  Payment = () => {
    if (this.state.payment_method == '') {
      alert('Please select your payment method for appointment.');
    } else if (this.state.payment_method == 'Paypal') {
      alert('Paypal is coming soon please select other payment method.');
      // Actions.Paypal({
      //   payment_method: this.state.payment_method,
      //   experience: this.props.experience,
      //   a_r: this.props.a_r,
      //   address: this.props.address,
      //   fcm_token: this.props.fcm_token,
      //   s_key: this.props.s_key,
      //   paypal: this.props.paypal,
      //   access: this.props.access,
      //   category: this.props.category,
      //   doctor_id: this.props.doctor_id,
      //   time: this.props.time,
      //   date: this.props.date,
      //   day: this.props.day,
      //   appointment_price: this.state.total_fee,
      //   fcm_token: this.props.fcm_token,
      //   doctor_name: this.props.doctor_name,
      //   city: this.props.city,
      //   doctor_profile: this.props.doctor_profile,
      //   p_name: this.props.p_name,
      //   p_mobile_number: this.props.p_mobile_number,
      //   p_age: this.props.p_age,
      //   p_gender: this.props.p_gender,
      // });
    } else {
      Actions.Payment({
        payment_method: this.state.payment_method,
        experience: this.props.experience,
        a_r: this.props.a_r,
        address: this.props.address,
        fcm_token: this.props.fcm_token,
        s_key: this.props.s_key,
        paypal: this.props.paypal,
        access: this.props.access,
        category: this.props.category,
        doctor_id: this.props.doctor_id,
        time: this.props.time,
        date: this.props.date,
        day: this.props.day,
        // fee: this.state.total_fee,
        fee: this.props.fee,
        fcm_token: this.props.fcm_token,
        doctor_name: this.props.doctor_name,
        city: this.props.city,
        doctor_profile: this.props.doctor_profile,
        p_name: this.props.p_name,
        p_mobile_number: this.props.p_mobile_number,
        p_age: this.props.p_age,
        p_gender: this.props.p_gender,
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 15,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Icon
            onPress={() => {
              Actions.pop();
            }}
            name="keyboard-backspace"
            type="MaterialCommunityIcons"
            style={{color: 'black', fontSize: 28}}
          />
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            Select Method For Payment
          </Text>
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            {' '}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: width,
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: '#c1e5f5',
            borderRadius: 4,
          }}>
          <Text style={{color: '#9d0c0f', fontSize: 18, fontWeight: 'bold'}}>
            Payment:${this.props.fee}
          </Text>
        </TouchableOpacity>
        <ScrollView>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: width / 1.1,
              marginTop: 20,
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 8,
              paddingVertical: 15,
              paddingHorizontal: 20,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 2,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 30, height: 30, borderRadius: 12}}
                  resizeMode="contain"
                  source={require('../assets/paypal.png')}
                />
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginLeft: 10,
                  }}>
                  Paypal
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.changebtn('text2', 'Paypal')}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 100,
                    borderColor: '#9d0c0f',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                  }}>
                  <View
                    style={
                      this.state.text2 == 1 ? styles.uncheked : styles.checked
                    }></View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: width / 1.1,
              marginTop: 20,
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 8,
              paddingVertical: 15,
              paddingHorizontal: 20,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 2,
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 30, height: 30, borderRadius: 12}}
                  resizeMode="contain"
                  source={require('../assets/master.png')}
                />
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginLeft: 10,
                  }}>
                  Card
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => this.changebtn('text3', 'Card')}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 100,
                    borderColor: '#9d0c0f',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                  }}>
                  <View
                    style={
                      this.state.text3 == 1 ? styles.uncheked : styles.checked
                    }></View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <View style={{marginBottom: 100}}></View>
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.Payment()}
          style={{
            width: width / 1.1,
            backgroundColor: '#9d0c0f',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            paddingVertical: 10,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginVertical: 15,
            position: 'absolute',
            bottom: 0,
          }}>
          <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
            Pay
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text1: {
    color: 'gray',
  },
  text: {
    color: 'white',
  },
  view1: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
  },
  view: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#9d0c0f',
  },
  unselect: {
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#9d0c0f',
    borderWidth: 1,
    marginLeft: 10,
    paddingVertical: 10,
  },
  select: {
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9d0c0f',
    backgroundColor: '#9d0c0f',
    marginLeft: 10,
    paddingVertical: 10,
  },
  unselect_text: {
    color: '#9d0c0f',
    fontWeight: 'bold',
  },
  select_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  select_text_red: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  unselect_text_red: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  select_red: {
    width: 130,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFD242',
    marginLeft: 10,
    paddingVertical: 10,
  },
  unselect_red: {
    width: 130,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFD242',
    marginLeft: 10,
    paddingVertical: 10,
  },
  checked: {
    width: 17,
    height: 17,
    backgroundColor: '#9d0c0f',
    borderRadius: 30,
  },

  uncheked: {
    width: 17,
    height: 17,
    borderRadius: 100,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 500,
  },
});

export default book_appointment;
