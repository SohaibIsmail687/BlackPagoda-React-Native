import React, {Component} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
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
  Pressable,
  AsyncStorage,
  Modal,
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
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  MarkerAnimated,
  Animated,
  Polyline,
} from 'react-native-maps';
import ImageLoad from 'react-native-image-placeholder';
import Connection from '../connection';
import {Rating, AirbnbRating} from 'react-native-ratings';
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
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import moment from 'moment';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Doctor_Appointment_Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      main_array: [],
      visible: false,
      user_rating: 0,
      total_patient: '',
      comment: '',
      data1: [],
      skalton: true,
      // my_like:'',
      visible2: false,
      skalton: true,
      text1: 2,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      text7: 1,
    };
  }

  backAction = () => {
    Actions.pop();
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
    this.get_total_patient();
    this.get_liked_doctor();
    this.Get_Data_1();
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

  doctors_all_fav = () => {
    let uploaddata = new FormData();

    uploaddata.append('user_id', this.state.id);

    let api = Connection + 'rest_apis.php?action=all_doctors';
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
        let table = [];
        let record = response.response;
        let len = record.length;

        console.log('recordrecordrecordrecordrecordrecordrecord', record);

        if (record != 'fail') {
          for (let i = 0; i < len; i++) {
            let my_like = record[i].my_like;

            console.log('mylikemylikemylikemylikemylike', my_like);

            let boxes = 'box' + my_like;
            if (my_like == null) {
              this.setState({[boxes]: false});
              console.log('!!!!!!!!!!!!!!!!!!!!', this.state[boxes]);
            } else {
              this.setState({[boxes]: true});
            }
          }

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

  Like_Station = () => {
    this.RBSheet.close();

    let boxes = 'box' + this.state.doctor_id;

    this.setState({[boxes]: true});

    this.setState({
      my_like: true,
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.doctor_id);
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

    let boxes = 'box' + this.state.doctor_id;

    this.setState({[boxes]: false});

    this.setState({
      my_like: false,
      spinner: true,
    });

    let uploaddata = new FormData();
    uploaddata.append('doctor_id', this.state.doctor_id);
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
    uploaddata.append('doctor_id', this.state.doctor_id);
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

  like_doctor_RBSheet = (val1, val2, val3, val4, val5, val6, val7) => {
    this.RBSheet.open();
    this.setState({
      doctor_name: val1,
      doctor_category: val2,
      doctor_address: val3,
      doctor_reviews: val5,
      doctor_profile: val6,
      doctor_id: val4,
      liked: val7,
    });
    console.log('Helllllllllllllloooooo', val1);
  };

  book_appointment = () => {
    if (this.state.appointment_time == '') {
      alert('Please Select Appointment Time.');
    } else {
      //   Actions.appointment_checkout({
      Actions.book_appointment({
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
        day: this.state.changes_time_for_specific_day,
        fee: this.props.fee,
        fcm_token: this.props.fcm_token,
        doctor_name: this.props.name1,
        city: this.props.city,
        doctor_profile: this.props.profile,
        p_age: this.state.p_age,
      });
    }
  };

  createtable2 = () => {
    let table = [];

    let record1 = this.state.data1;
    let len = record1.length;
    if (record1 != 'fail') {
      for (let i = 0; i < len; i++) {
        let name = record1[i].name;
        let profile1 = record1[i].profile;
        let profile = Connection + 'images/' + profile1;
        let comment = record1[i].comment;
        let rating = record1[i].rating;
        let date = record1[i].date;
        let ss = date.split(' ');
        let date_1 = ss[0];
        let time_1 = ss[1];
        table.push(
          <View>
            {
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: width / 1.1,
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '60%',
                  }}>
                  <ImageLoad
                    style={{width: 44, borderRadius: 44, height: 44}}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: profile}}
                    borderRadius={150}
                    placeholderStyle={{width: 44, borderRadius: 44, height: 44}}
                  />
                  <View style={{marginLeft: 10, width: '50%'}}>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={{
                        color: 'black',
                        fontFamily: 'DMSans-Bold',
                        fontSize: 15,
                        maxWidth: '100%',
                      }}>
                      {name}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={2}
                      style={{
                        color: 'gray',
                        fontSize: 14,
                        maxWidth: '100%',
                        fontFamily: 'DMSans-Regular',
                      }}>
                      {comment}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40%',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{color: '#565759', fontFamily: 'DMSans-Regular'}}>
                    {date_1}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 3,
                    }}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={rating}
                      // selectedStar={(rating) => this.onStarRatingPress(rating)}
                      containerStyle={{width: width / 4.8}}
                      starSize={14}
                      fullStarColor={'gold'}
                    />
                  </View>
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
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Profilo Dottore
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginHorizontal: 8,
              width: 45,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#c1e5f5',
              borderRadius: 4,
            }}>
            {this.props.my_like == null ? (
              <Icon
                name="heart"
                type="FontAwesome"
                style={{color: '#9d0c0f', fontSize: 20}}
              />
            ) : (
              <Icon
                name="heart"
                type="FontAwesome"
                style={{color: '#9d0c0f', fontSize: 20}}
              />
            )}
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              paddingVertical: 15,
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            <ImageLoad
              style={{width: 100, height: 120, borderRadius: 8}}
              loadingStyle={{size: 'large', color: 'blue'}}
              source={{uri: this.props.profile}}
              borderRadius={8}
              placeholderStyle={{width: 100, height: 120, borderRadius: 8}}
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{color: '#9d0c0f', fontSize: 15, fontWeight: 'bold'}}
                numberOfLines={1}
                ellipsizeMode="tail">
                {this.props.name1}
              </Text>
              <View
                style={{
                  borderRadius: 8,
                  height: 35,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{color: 'black', fontSize: 13, fontWeight: 'bold'}}>
                  {' '}
                  {this.props.a_r}{' '}
                </Text>
                <Icon
                  name="star"
                  type="AntDesign"
                  style={{color: 'gold', fontSize: 16}}
                />
              </View>
            </View>
            <Text style={{color: 'gray', fontSize: 13, fontWeight: 'bold'}}>
              {this.props.category} | {this.props.degree}
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                width: width,
                justifyContent: 'space-between',
                paddingHorizontal: 18,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  alignItems: 'center',
                  marginHorizontal: 10,
                  marginVertical: 5,
                  width: '42%',
                  height: 80,
                  borderRadius: 5,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  paddingHorizontal: 12,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Icon
                  name="group"
                  type="FontAwesome"
                  style={{color: '#9d0c0f', fontSize: 22}}
                />

                <View>
                  <Text
                    style={{
                      color: '#9d0c0f',
                      fontWeight: 'bold',
                      fontSize: 18,
                      marginLeft: 14,
                    }}>
                    {/* 500 + */}
                    {this.state.total_patient}
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontWeight: '500',
                      fontSize: 12,
                      marginLeft: 14,
                    }}>
                    Patients
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  alignItems: 'center',
                  marginHorizontal: 10,
                  marginVertical: 5,
                  width: '42%',
                  height: 80,
                  borderRadius: 5,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  paddingHorizontal: 12,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Icon
                  name="suitcase"
                  type="FontAwesome"
                  style={{color: '#9d0c0f', fontSize: 22}}
                />

                <View>
                  <Text
                    style={{
                      color: '#9d0c0f',
                      fontWeight: 'bold',
                      fontSize: 18,
                      marginLeft: 14,
                    }}>
                    {this.props.experience} years
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontWeight: '500',
                      fontSize: 12,
                      marginLeft: 14,
                    }}>
                    experience
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 15,
              color: '#9d0c0f',
              fontWeight: 'bold',
              paddingHorizontal: 20,
              marginTop: 15,
              marginBottom: 10,
            }}>
            Biography
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              paddingHorizontal: 20,
              textAlign: 'justify',
            }}>
            A physician, medical practitioner, medical doctor, or simply doctor,
            is a health professional who practices medicine, which is concerned
            with promoting, maintaining or restoring health through the study,
            diagnosis, prognosis and treatment of disease, injury, and other
            physical and mental impairments.
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#9d0c0f',
              fontWeight: 'bold',
              paddingHorizontal: 20,
              marginTop: 15,
              marginBottom: 10,
            }}>
            Reviews
          </Text>

          {/* <View
            activeOpacity={0.8}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              alignSelf: 'center',
              flexDirection: 'row',
              marginBottom: 10,
              width: width / 1.1,
              backgroundColor: 'white',
              borderRadius: 8,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
              marginLeft: 7,
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../assets/carlo.jpg')}
              style={{width: 60, height: 60, borderRadius: 150}}
            />
            <View style={{width: '85%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '85%',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginLeft: -5,
                  }}>
                  Hamza Basra
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={4.0}
                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                    containerStyle={{width: width / 4.8}}
                    starSize={14}
                    fullStarColor={'gold'}
                  />
                </View>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  paddingHorizontal: 15,
                  maxWidth: '88%',
                }}
                numberOfLines={2}>
                This practice is terrific combines expertise and a willingness
                to listen and discuss
              </Text>
            </View>
          </View> */}

          {/* <View
            activeOpacity={0.8}
            style={{
              paddingVertical: 10,
              alignSelf: 'center',
              paddingHorizontal: 10,
              flexDirection: 'row',
              marginBottom: 10,
              width: width / 1.1,
              backgroundColor: 'white',
              borderRadius: 8,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
              marginLeft: 7,
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../assets/carlo.jpg')}
              style={{width: 60, height: 60, borderRadius: 150}}
            />
            <View style={{width: '85%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '85%',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginLeft: -5,
                  }}>
                  Giorgio Verdi
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={4.0}
                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                    containerStyle={{width: width / 4.8}}
                    starSize={14}
                    fullStarColor={'gold'}
                  />
                </View>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  paddingHorizontal: 15,
                  maxWidth: '88%',
                }}
                numberOfLines={2}>
                This practice is terrific combines expertise and a willingness
                to listen and discuss
              </Text>
            </View>
          </View> */}

          <View>
            {this.state.skalton == true ? (
              <ScrollView>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      width: width / 1.1,
                      alignSelf: 'center',
                      paddingBottom: 10,
                      marginTop: 10,
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 15,
                      height: 100,
                    }}></View>
                </SkeletonPlaceholder>
                <SkeletonPlaceholder>
                  <View
                    style={{
                      width: width / 1.1,
                      alignSelf: 'center',
                      paddingBottom: 10,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 15,
                      height: 100,
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
                      }}>
                      No review found.
                    </Text>
                  </View>
                ) : (
                  <ScrollView>
                    {this.createtable2()}
                    <View style={{marginBottom: 50}}></View>
                  </ScrollView>
                )}
              </View>
            )}
          </View>

          <View style={{marginBottom: 100}}></View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            position: 'absolute',
            bottom: 0,
            width: width,
            paddingVertical: 4,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.book_appointment()}
            style={{
              width: width / 1.1,
              borderRadius: 24,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#9d0c0f',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={320}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            container: {
              paddingHorizontal: 20,
              backgroundColor: '#f9f9fa',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            },
            draggableIcon: {
              backgroundColor: 'lightgray',
            },
          }}>
          <View>
            {this.state.my_like == false ? (
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginTop: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Aggiungere ai preferiti?
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginTop: 30,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Rimuovere dai preferiti?
              </Text>
            )}
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                marginVertical: 15,
              }}></View>

            <View
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                backgroundColor: 'white',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0,
                shadowRadius: 1,
                elevation: 1,
              }}>
              <ImageLoad
                style={{width: 90, height: 90, borderRadius: 15}}
                loadingStyle={{size: 'large', color: 'blue'}}
                source={{uri: this.props.profile}}
                borderRadius={15}
                placeholderStyle={{width: 90, height: 90, borderRadius: 15}}
              />

              <View style={{marginLeft: 13, width: '65%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                    {this.props.name1}
                  </Text>

                  {this.state.my_like == false ? (
                    <Icon
                      name="hearto"
                      type="AntDesign"
                      style={{color: '#9d0c0f', fontSize: 20}}
                    />
                  ) : (
                    <Icon
                      name="heart"
                      type="AntDesign"
                      style={{color: '#9d0c0f', fontSize: 20}}
                    />
                  )}
                </View>

                <View
                  style={{
                    borderBottomWidth: 2,
                    borderColor: '#f8f8f9',
                    marginVertical: 13,
                  }}></View>

                <Text numberOfLines={1} style={{color: 'gray', fontSize: 13}}>
                  {this.props.category} | {this.props.address}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 7,
                  }}>
                  <Icon
                    name="star-half-empty"
                    type="FontAwesome"
                    style={{color: '#9d0c0f', fontSize: 18}}
                  />
                  <Text style={{color: 'gray', fontSize: 13, marginLeft: 5}}>
                    {this.props.a_r} (Total Reviews {this.props.reviews})
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => this.RBSheet.close()}
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
                  Cancella
                </Text>
              </TouchableOpacity>
              {this.state.my_like == false ? (
                <TouchableOpacity
                  onPress={() => this.Like_Station()}
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
                    Sì, aggiungi
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.Unlike_Station()}
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
                    Sì, rimuovi
                  </Text>
                </TouchableOpacity>
              )}
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

        {this.state.spinner == true && (
          <View
            style={{
              width: width / 1,
              height: height / 1,
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

const styles = StyleSheet.create({
  map: {
    width: width,
    height: height / 3.5,
  },
  phoneinput: {
    fontSize: 16,
    paddingLeft: 15,
    // textAlign: 'center',
    width: '100%',
    marginTop: 15,
  },
  unselect: {
    width: width / 3.2,
    marginHorizontal: 4,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  select: {
    width: width / 3.2,
    marginHorizontal: 4,
    backgroundColor: '#9d0c0f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
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
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  text1: {
    color: 'gray',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
  },
  view1: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#d9d9d9',
  },
  view: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#9d0c0f',
  },
});

export default Doctor_Appointment_Profile;
