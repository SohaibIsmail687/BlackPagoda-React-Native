import React, {Component} from 'react';
import moment from 'moment';

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
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
import {connect} from 'react-redux';
import Connection from '../connection';
import ImageLoad from 'react-native-image-placeholder';

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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class book_appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      main_array: [],
      appointment_time: '',
      appointment_date: '',
      visible: false,
      user_rating: 0,
      comment: '',
      data1: [],
      skalton: true,
      total_patient: '',
      my_like: '',
      visible2: false,
      skalton: true,
      text1: 2,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      text7: 1,
      monday1: [],
      tuesday1: [],
      wednesday1: [],
      thursday1: [],
      saturday1: [],
      friday1: [],
      sunday1: [],
    };
  }

  backAction = () => {
    Actions.pop();
    return true;
  };

  changebtn2(value, value2, value3) {
    this.setState({
      changes_time_for_specific_day: value2,
      appointment_date: value3,
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

        [value]: 2,

        category: '',
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

        [value]: 2,
        category: value2,
      });
    }

    if (value2 == 'Mon') {
      this.setState({
        main_array: this.state.monday1,
      });
    } else if (value2 == 'Tue') {
      this.setState({
        main_array: this.state.tuesday1,
      });
    } else if (value2 == 'Wed') {
      this.setState({
        main_array: this.state.wednesday1,
      });
    } else if (value2 == 'Thu') {
      this.setState({
        main_array: this.state.thursday1,
      });
    } else if (value2 == 'Fri') {
      this.setState({
        main_array: this.state.friday1,
      });
    } else if (value2 == 'Sat') {
      this.setState({
        main_array: this.state.saturday1,
      });
    } else if (value2 == 'Sun') {
      this.setState({
        main_array: this.state.sunday1,
      });
    }

    // this.Get_appointments_with_doctor_id(value2, value3);
  }

  selected_time = (val, val1) => {
    let record1 = this.state.main_array;
    let len = record1.length;
    let boxes = 'box' + val;

    if (this.state[boxes] == false) {
      for (let i = 0; i < len; i++) {
        let doctor_time = record1[i];
        let boxes = 'box' + doctor_time;
        this.setState({[boxes]: false});
      }
    } else {
    }

    setTimeout(() => {
      if (this.state[boxes] == false) {
        this.setState({[boxes]: true});
        this.setState({
          appointment_time: val,
          daybox: this.state.changes_time_for_specific_day,
        });
      } else {
        this.setState({[boxes]: false});

        this.setState({
          appointment_time: '',
          daybox: '',
        });
      }
    }, 100);
  };

  book_appointment = () => {
    if (this.state.appointment_time == '') {
      alert('Please Select Appointment Time.');
    } else {
      Actions.appointment_checkout({
        email: this.props.email,
        stripe_key: this.props.stripe_key,
        experience: this.props.experience,
        a_r: this.props.a_r,
        address: this.props.address,
        s_key: this.props.s_key,
        paypal: this.props.paypal,
        access: this.props.access,
        category: this.props.category,
        doctor_id: this.props.doctor_id,
        time: this.state.appointment_time,
        date: this.state.appointment_date,
        // appointment_date: this.props.appointment_date,
        // appointment_day: this.props.appointment_day,
        day: this.state.changes_time_for_specific_day,
        fee: this.props.fee,
        fcm_token: this.props.fcm_token,
        doctor_name: this.props.doctor_name,
        city: this.props.city,
        doctor_profile: this.props.doctor_profile,
      });
    }
  };

  createtable1 = () => {
    let table = [];

    let record1 = this.state.main_array;
    let len = record1.length;

    console.log('Record1Record1Record1Record1Record1', record1);

    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let doctor_time = record1[i];
        let boxes = 'box' + doctor_time;
        let boxred = 'boxred' + doctor_time;

        table.push(
          <View>
            {
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Pressable
                  onPress={() => this.selected_time(doctor_time, 'selected')}
                  style={
                    this.state[boxes] == true ? styles.select : styles.unselect
                  }>
                  <Text
                    style={
                      this.state[boxes] == true
                        ? styles.select_text
                        : styles.unselect_text
                    }>
                    {doctor_time}
                  </Text>
                </Pressable>
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

  // componentWillUnmount() {
  //     this.backHandler.remove();
  // }
  componentDidMount = async () => {
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

    var today = new Date();

    var nextweek_T = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    // console.log('TODAYTODAYTODAYTODAYTODAYTODAYTODAYTODAY', today)
    // console.log('TODAYTODAYTODAYTODAYTODAYTODAYTODAYTODAY', nextweek_T)

    let date0 = nextweek_T.toString();
    let ddd = date0.split(' ');
    let day_1 = ddd[0];
    let dd_2 = ddd[1];
    let dd_3 = ddd[2];
    let dd_4 = ddd[3];

    let final_date_1 = dd_2 + ' ' + dd_3 + ', ' + dd_4;

    this.setState({
      appointment_date: final_date_1,
      changes_time_for_specific_day: day_1,
    });
    console.log(
      'FinalDateFinalDateFinalDateFinalDateFinalDateFinalDate',
      final_date_1,
    );

    var nextweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );
    let date1 = nextweek.toString();
    let ccc = date1.split(' ');
    let day_2 = ccc[0];
    let cc_2 = ccc[1];
    let cc_3 = ccc[2];
    let cc_4 = ccc[3];

    let final_date_2 = cc_2 + ' ' + cc_3 + ', ' + cc_4;

    var nextweek1 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 2,
    );
    let date2 = nextweek1.toString();
    let eee = date2.split(' ');
    let day_3 = eee[0];
    let ee_2 = eee[1];
    let ee_3 = eee[2];
    let ee_4 = eee[3];

    let final_date_3 = ee_2 + ' ' + ee_3 + ', ' + ee_4;

    var nextweek2 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 3,
    );
    let date3 = nextweek2.toString();
    let fff = date3.split(' ');
    let day_4 = fff[0];
    let ff_2 = fff[1];
    let ff_3 = fff[2];
    let ff_4 = fff[3];

    let final_date_4 = ff_2 + ' ' + ff_3 + ', ' + ff_4;

    var nextweek3 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 4,
    );
    let date4 = nextweek3.toString();
    let ggg = date4.split(' ');
    let day_5 = ggg[0];
    let gg_2 = ggg[1];
    let gg_3 = ggg[2];
    let gg_4 = ggg[3];

    let final_date_5 = gg_2 + ' ' + gg_3 + ', ' + gg_4;

    var nextweek4 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 5,
    );
    let date5 = nextweek4.toString();
    let hhh = date5.split(' ');
    let day_6 = hhh[0];
    let hh_2 = hhh[1];
    let hh_3 = hhh[2];
    let hh_4 = hhh[3];

    let final_date_6 = hh_2 + ' ' + hh_3 + ', ' + hh_4;

    var nextweek5 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 6,
    );
    let date6 = nextweek5.toString();
    let iii = date6.split(' ');
    let day_7 = iii[0];
    let ii_2 = iii[1];
    let ii_3 = iii[2];
    let ii_4 = iii[3];

    let final_date_7 = ii_2 + ' ' + ii_3 + ', ' + ii_4;

    this.setState({
      day_1: day_1,
      day_2: day_2,
      day_3: day_3,
      day_4: day_4,
      day_5: day_5,
      day_6: day_6,
      day_7: day_7,

      date_1: final_date_1,
      date_2: final_date_2,
      date_3: final_date_3,
      date_4: final_date_4,
      date_5: final_date_5,
      date_6: final_date_6,
      date_7: final_date_7,

      date_1_1: dd_3,
      date_2_2: cc_3,
      date_3_3: ee_3,
      date_4_4: ff_3,
      date_5_5: gg_3,
      date_6_6: hh_3,
      date_7_7: ii_3,

      m1: cc_2,
      m2: dd_2,
      m3: ee_2,
      m4: ff_2,
      m5: gg_2,
      m6: hh_2,
      m7: ii_2,
    });

    this.get_shedule();
    this.get_total_patient();
    this.get_liked_doctor();
  };

  get_shedule = () => {
    let uploaddata = new FormData();

    uploaddata.append('doctor_id', this.props.doctor_id);

    console.log('Record4Record4Record4Record4Record4', this.props.doctor_id);

    let api = Connection + 'rest_apis.php?action=Get_shedule';
    //   console.log("pass => ", api);
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

        console.log('Record4Record4Record4Record4Record4', record4);

        if (record4 != 'fail') {
          let monday = record4[0].monday;
          let tuesday = record4[0].tuesday;
          let wednesday = record4[0].wednesday;
          let thursday = record4[0].thursday;
          let friday = record4[0].friday;
          let saturday = record4[0].saturday;
          let sunday = record4[0].sunday;

          let array_mon = JSON.parse(monday);
          let array_tue = JSON.parse(tuesday);
          let array_wed = JSON.parse(wednesday);
          let array_thu = JSON.parse(thursday);
          let array_fri = JSON.parse(friday);
          let array_sat = JSON.parse(saturday);
          let array_sun = JSON.parse(sunday);

          console.log('monnnnnnnnnn', array_mon);
          let len_mon = array_mon.length;
          for (let i = 0; i < len_mon; i++) {
            let doctor_time = array_mon[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_tue = array_tue.length;
          for (let i = 0; i < len_tue; i++) {
            let doctor_time = array_tue[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_wed = array_wed.length;
          for (let i = 0; i < len_wed; i++) {
            let doctor_time = array_wed[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_thu = array_thu.length;
          for (let i = 0; i < len_thu; i++) {
            let doctor_time = array_thu[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_fri = array_fri.length;
          for (let i = 0; i < len_fri; i++) {
            let doctor_time = array_fri[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_sat = array_sat.length;
          for (let i = 0; i < len_sat; i++) {
            let doctor_time = array_sat[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          let len_sun = array_sun.length;
          for (let i = 0; i < len_sun; i++) {
            let doctor_time = array_sun[i];
            let boxes = 'box' + doctor_time;
            this.setState({[boxes]: false});
          }

          if (this.props.day_1 == 'Fri') {
            this.setState({
              main_array: array_fri,
            });
          } else if (this.props.day_1 == 'Sat') {
            this.setState({
              main_array: array_sat,
            });
          } else if (this.props.day_1 == 'Sun') {
            this.setState({
              main_array: array_sun,
            });
          } else if (this.props.day_1 == 'Mon') {
            this.setState({
              main_array: array_mon,
            });
          } else if (this.props.day_1 == 'Tue') {
            this.setState({
              main_array: array_tue,
            });
          } else if (this.props.day_1 == 'Wed') {
            this.setState({
              main_array: array_wed,
            });
          } else if (this.props.day_1 == 'Thu') {
            this.setState({
              main_array: array_thu,
            });
          }

          this.setState({
            monday1: array_mon,
            tuesday1: array_tue,
            wednesday1: array_wed,
            thursday1: array_thu,
            friday1: array_fri,
            saturday1: array_sat,
            sunday1: array_sun,
            skalton: false,
          });

          //   this.Get_appointments_with_doctor_id(
          //     this.props.day_1,
          //     this.props.final_date_1,
          //   );
        } else {
          this.setState({
            main_array: [],
            skalton: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Get_appointments_with_doctor_id = (val1, val2) => {
    let uploaddata = new FormData();

    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('date', val2);
    uploaddata.append('day', val1);

    let api =
      Connection + 'rest_apis.php?action=Get_appointments_with_doctor_id';
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

        if (record != 'fail') {
          let record1 = this.state.main_array;

          let len1 = record1.length;
          if (record1 != 'fail') {
            for (let i = 0; i < len1; i++) {
              let s_rec_1 = record1[i];
              let len = record.length;
              for (let i = 0; i < len; i++) {
                let app_rec_1 = record[i];

                if (s_rec_1 == app_rec_1) {
                  this.setState({
                    booked_time: s_rec_1,
                  });

                  let boxred = 'boxred' + app_rec_1;
                  this.setState({[boxred]: true, skalton: false});
                }
              }
            }
          }

          this.setState({
            data: record,
            spinner12: true,
          });
        } else {
          let boxred = 'boxred' + this.state.booked_time;
          this.setState({[boxred]: false});
          this.setState({
            spinner12: true,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  check_doctor_sheduling = () => {
    this.setState({
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.props.doctor_id);
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
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });

          alert('Doctor has not signed up for Telemedicine');
        } else {
          this.setState({
            spinner: false,
          });
          this.book_appointment();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Get_Data_1 = () => {
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.props.doctor_id);
    let api = Connection + 'rest_apis.php?action=Get_Reviews_with_user';
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
          let total_review = record[0].total_review;
          let avg_rating = record[0].avg_rating;
          let a_r = Number(avg_rating).toFixed(2);
          this.setState({
            data1: record,
            total_review: total_review,
            avg_rating: a_r,
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

  Like_Station = () => {
    this.RBSheet.close();

    this.setState({
      my_like: true,
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('user_id', this.state.id);
    let api = Connection + 'rest_apis.php?action=doctor_like';

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
          this.get_liked_doctor();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Unlike_Station = () => {
    this.RBSheet.close();

    this.setState({
      my_like: false,
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('user_id', this.state.id);
    let api = Connection + 'rest_apis.php?action=doctor_unlike';

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
          this.get_liked_doctor();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_liked_doctor = () => {
    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('user_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=get_liked_doctor';

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
        if (record != 'fail') {
          this.setState({
            my_like: true,
            spinner: false,
          });
        } else {
          this.setState({
            my_like: false,
            spinner: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_total_patient = () => {
    let uploaddata = new FormData();
    console.log('doctor_id', this.props.doctor_id);
    uploaddata.append('doctor_id', this.props.doctor_id);
    let api = Connection + 'rest_apis.php?action=get_total_patient';

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

        if (record != 'fail') {
          let t_p = record[0];
          this.setState({
            total_patient: t_p,
          });
        } else {
          this.setState({
            total_patient: 0,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
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
            onPress={() => Actions.pop()}
            name="arrow-back"
            type="MaterialIcons"
            style={{color: 'black', fontSize: 24}}
          />
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Select Slot
          </Text>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
            {' '}
          </Text>
        </View>

        <ScrollView>
          <TouchableOpacity
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              paddingHorizontal: 10,
              marginTop: 15,
            }}>
            <View style={{width: 70, height: 120}}>
              <ImageLoad
                style={{width: 70, height: 70, borderRadius: 70}}
                loadingStyle={{size: 'large', color: 'blue'}}
                source={{uri: this.props.doctor_profile}}
                borderRadius={70}
                placeholderStyle={{width: 70, height: 70, borderRadius: 70}}
              />
            </View>
            <View style={{marginLeft: 10, width: '77%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontWeight: 'bold',
                    maxWidth: '50%',
                  }}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {this.props.doctor_name}
                </Text>
                <Text
                  style={{color: '#9d0c0f', fontSize: 15, fontWeight: 'bold'}}>
                  {' '}
                </Text>
              </View>

              <Text style={{color: '#9d0c0f', fontSize: 13, fontWeight: '600'}}>
                {this.props.category}
              </Text>
              <Text style={{color: 'gray', fontSize: 13, fontWeight: '400'}}>
                {this.props.experience} years experience
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                ${this.props.fee}
              </Text>
            </View>
          </TouchableOpacity>

          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontWeight: '500',
              paddingHorizontal: 15,
              marginTop: 5,
              textAlign: 'center',
            }}>
            {/* Dec 27, 2022 */}
            {this.props.appointment_date}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginVertical: 15,
              width: width,
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Pressable
                onPress={() =>
                  this.changebtn2('text1', this.state.day_1, this.state.date_1)
                }
                style={this.state.text1 == 1 ? styles.view1 : styles.view}>
                {/* <Text style={this.state.text1 == 1 ? styles.text1 : styles.text}>{this.state.m1}</Text> */}
                <Text
                  style={this.state.text1 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_1}
                </Text>

                <Text
                  style={this.state.text1 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_1_1}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text2', this.state.day_2, this.state.date_2)
                }
                style={this.state.text2 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text2 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_2}
                </Text>

                <Text
                  style={this.state.text2 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_2_2}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text3', this.state.day_3, this.state.date_3)
                }
                style={this.state.text3 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text3 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_3}
                </Text>

                <Text
                  style={this.state.text3 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_3_3}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text4', this.state.day_4, this.state.date_4)
                }
                style={this.state.text4 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text4 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_4}
                </Text>

                <Text
                  style={this.state.text4 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_4_4}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text5', this.state.day_5, this.state.date_5)
                }
                style={this.state.text5 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text5 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_5}
                </Text>

                <Text
                  style={this.state.text5 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_5_5}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text6', this.state.day_6, this.state.date_6)
                }
                style={this.state.text6 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text6 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_6}
                </Text>

                <Text
                  style={this.state.text6 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_6_6}
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  this.changebtn2('text7', this.state.day_7, this.state.date_7)
                }
                style={this.state.text7 == 1 ? styles.view1 : styles.view}>
                <Text
                  style={this.state.text7 == 1 ? styles.text1 : styles.text}>
                  {this.state.day_7}
                </Text>
                <Text
                  style={this.state.text7 == 1 ? styles.text1 : styles.text}>
                  {this.state.date_7_7}
                </Text>
              </Pressable>
            </ScrollView>
          </View>

          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 14,
              marginLeft: 20,
            }}>
            Book Slot for appointment
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            {this.state.skalton == true ? (
              <SkeletonPlaceholder>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                  <View
                    style={{
                      width: width / 3.8,
                      borderWidth: 1,
                      borderColor: '#235fa9',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                      borderRadius: 12,
                      marginTop: 10,
                      height: 50,
                      marginHorizontal: 5,
                    }}></View>
                </View>
              </SkeletonPlaceholder>
            ) : (
              <View>
                {this.state.main_array == '' ? (
                  <View>
                    <Text
                      style={{
                        marginTop: 30,
                        marginLeft: 20,
                        color: 'black',
                        alignSelf: 'center',
                      }}>
                      No slot available
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      paddingHorizontal: 10,
                      marginTop: 10,
                    }}>
                    {this.createtable1()}
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.book_appointment();
          }}
          style={{
            width: width / 1.1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 13,
            borderRadius: 100,
            backgroundColor: '#9d0c0f',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
            position: 'absolute',
            bottom: 20,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            Next
          </Text>
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
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
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

const styles = StyleSheet.create({
  unselect: {
    width: 90,
    marginHorizontal: 6,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#9d0c0f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 5,
  },
  select: {
    width: 90,
    marginHorizontal: 6,
    marginVertical: 5,
    borderWidth: 1,
    backgroundColor: '#9d0c0f',
    borderColor: '#9d0c0f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 5,
  },
  unselect_text: {
    color: '#9d0c0f',
    fontWeight: 'bold',
  },
  select_text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
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
    width: width / 2.4,
    marginHorizontal: 4,
    borderWidth: 1,
    backgroundColor: '#FFD242',
    borderColor: '#FFD242',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  unselect_red: {
    width: width / 2.4,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#FFD242',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  text1: {
    color: 'gray',
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    color: '#9d0c0f',
    fontSize: 15,
    fontWeight: 'bold',
  },
  view1: {
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  view: {
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
});

export default book_appointment;
