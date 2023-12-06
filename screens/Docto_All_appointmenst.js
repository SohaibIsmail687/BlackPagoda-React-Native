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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import RBSheet from 'react-native-raw-bottom-sheet';
import {NavigationEvents} from 'react-navigation';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Patient_All_Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text1: 2,
      text2: 1,
      text3: 1,
      //   text4:1,
      check_design: 'pending',
      visible: false,
      data1: [],
      skalton: false,
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
    if (this.props.user == true) {
      Actions.pop();
    } else {
      BackHandler.exitApp();
    }
    return true;
  }

  changebtn(value, val) {
    this.setState({
      check_design: val,
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
    setTimeout(() => {
      this.get_appointments_user();
    }, 100);
  }

  backAction = () => {
    // BackHandler.exitApp()
    Actions.Doctor_Tab_Screen();
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
    let parsed = JSON.parse(user);
    let id = parsed[0].id;
    this.setState({
      id: id,
    });
    console.log('kkkkkkkkkkkk', this.state.id);
    this.get_appointments_user();
  };

  get_appointments_user = () => {
    let uploaddata = new FormData();

    this.setState({
      skalton: true,
    });

    uploaddata.append('user_id', this.state.id);
    uploaddata.append('status', this.state.check_design);

    let api = Connection + 'rest_apis.php?action=display_appointments_doctor';
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
        console.log('reeeeeeeeesponse', record4);
        if (record4 != 'fail') {
          this.setState({
            data1: record4,
            skalton: false,
          });
        } else {
          this.setState({
            data1: '',
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
        console.log(user_gender, 'dssssssssddddd');

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
              <View>
                {this.state.check_design == status ? (
                  <View>
                    {this.state.check_design == 'pending' && (
                      <View>
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
                            backgroundColor: 'orange',
                            width: width / 1.1,
                            marginBottom: 10,
                            alignSelf: 'center',
                            borderRadius: 4,
                            paddingLeft: 10,
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            marginTop: 15,
                          }}>
                          <View
                            style={{
                              width: '100%',
                              backgroundColor: 'white',
                              paddingHorizontal: 10,
                              paddingVertical: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}>
                              <View>
                                <Text
                                  style={{
                                    color: 'gray',
                                    fontWeight: '400',
                                    fontSize: 12,
                                    marginTop: 5,
                                  }}>
                                  Appointment Date
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 5,
                                  }}>
                                  <Icon
                                    name="clockcircleo"
                                    type="AntDesign"
                                    style={{color: '#9d0c0f', fontSize: 16}}
                                  />

                                  <View style={{marginLeft: 8}}>
                                    <Text
                                      style={{
                                        color: '#9d0c0f',
                                        fontSize: 12,
                                        fontWeight: '600',
                                      }}>
                                      {/* Wed Dec 20 - 09:00 AM */}
                                      {date} - {time}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <Icon
                                name="arrow-right-alt"
                                type="MaterialIcons"
                                style={{color: '#9d0c0f', fontSize: 28}}
                              />
                            </View>

                            <View
                              style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: 'lightgray',
                                marginVertical: 10,
                              }}></View>

                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <ImageLoad
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 50,
                                }}
                                loadingStyle={{size: 'large', color: 'blue'}}
                                source={{uri: profile}}
                                borderRadius={50}
                                placeholderStyle={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 50,
                                }}
                              />

                              <View style={{marginLeft: 10}}>
                                <Text
                                  style={{
                                    color: '#9d0c0f',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                  }}>
                                  {user_name}
                                </Text>
                                <Text style={{color: 'gray', fontSize: 12}}>
                                  {user_address}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}

                    {this.state.check_design == 'complete' && (
                      <View
                        style={{
                          backgroundColor: 'green',
                          width: width / 1.1,
                          marginBottom: 10,
                          alignSelf: 'center',
                          borderRadius: 4,
                          paddingLeft: 10,
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                          marginTop: 15,
                        }}>
                        <View
                          style={{
                            width: '100%',
                            backgroundColor: 'white',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <View>
                              <Text
                                style={{
                                  color: 'gray',
                                  fontWeight: '400',
                                  fontSize: 12,
                                  marginTop: 5,
                                }}>
                                Appointment Date
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginTop: 5,
                                }}>
                                <Icon
                                  name="clockcircleo"
                                  type="AntDesign"
                                  style={{color: '#9d0c0f', fontSize: 16}}
                                />

                                <View style={{marginLeft: 8}}>
                                  <Text
                                    style={{
                                      color: '#9d0c0f',
                                      fontSize: 12,
                                      fontWeight: '600',
                                    }}>
                                    {/* Wed Dec 20 - 09:00 AM */}
                                    {date} - {time}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <Icon
                              name="arrow-right-alt"
                              type="MaterialIcons"
                              style={{color: '#9d0c0f', fontSize: 28}}
                            />
                          </View>

                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: 'lightgray',
                              marginVertical: 10,
                            }}></View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <ImageLoad
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                              }}
                              loadingStyle={{size: 'large', color: 'blue'}}
                              source={{uri: profile}}
                              borderRadius={50}
                              placeholderStyle={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                              }}
                            />

                            <View style={{marginLeft: 10}}>
                              <Text
                                style={{
                                  color: '#9d0c0f',
                                  fontWeight: 'bold',
                                  fontSize: 16,
                                }}>
                                {user_name}
                              </Text>
                              <Text style={{color: 'gray', fontSize: 12}}>
                                {user_address}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}

                    {this.state.check_design == 'cancel' && (
                      <View
                        style={{
                          backgroundColor: 'red',
                          width: width / 1.1,
                          marginBottom: 10,
                          alignSelf: 'center',
                          borderRadius: 4,
                          paddingLeft: 10,
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                          marginTop: 15,
                        }}>
                        <View
                          style={{
                            width: '100%',
                            backgroundColor: 'white',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <View>
                              <Text
                                style={{
                                  color: 'gray',
                                  fontWeight: '400',
                                  fontSize: 12,
                                  marginTop: 5,
                                }}>
                                Appointment Date
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  marginTop: 5,
                                }}>
                                <Icon
                                  name="clockcircleo"
                                  type="AntDesign"
                                  style={{color: '#9d0c0f', fontSize: 16}}
                                />

                                <View style={{marginLeft: 8}}>
                                  <Text
                                    style={{
                                      color: '#9d0c0f',
                                      fontSize: 12,
                                      fontWeight: '600',
                                    }}>
                                    {/* Wed Dec 20 - 09:00 AM */}
                                    {date} - {time}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <Icon
                              name="arrow-right-alt"
                              type="MaterialIcons"
                              style={{color: '#9d0c0f', fontSize: 28}}
                            />
                          </View>

                          <View
                            style={{
                              width: '100%',
                              height: 1,
                              backgroundColor: 'lightgray',
                              marginVertical: 10,
                            }}></View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <ImageLoad
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                              }}
                              loadingStyle={{size: 'large', color: 'blue'}}
                              source={{uri: profile}}
                              borderRadius={50}
                              placeholderStyle={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                              }}
                            />

                            <View style={{marginLeft: 10}}>
                              <Text
                                style={{
                                  color: '#9d0c0f',
                                  fontWeight: 'bold',
                                  fontSize: 16,
                                }}>
                                {user_name}
                              </Text>
                              <Text style={{color: 'gray', fontSize: 12}}>
                                {user_address}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                ) : (
                  <View></View>
                )}
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

  open = (val, val1, va3, val4, val5, val6) => {
    this.setState({
      appointment_id_cancel: val,
      doc_id_cancel: val1,
      fcm_token: va3,
      date: val4,
      time: val5,
      fee: val6,
    });
    setTimeout(() => {
      this.RBSheet1.open();
    }, 100);
  };

  next = () => {
    this.RBSheet1.close();
    Actions.cancel_appointment({
      fee: this.state.fee,
      time: this.state.time,
      date: this.state.date,
      appointment_id: this.state.appointment_id_cancel,
      doctor_id: this.state.doc_id_cancel,
      fcm_token: this.state.fcm_token,
    });
  };

  dd = () => {
    this.get_appointments_user();
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
            Appointments
          </Text>
          <Text style={{color: 'black', fontSize: 15, fontWeight: '700'}}>
            {' '}
          </Text>
          <Text style={{color: 'black', fontSize: 15, fontWeight: '700'}}>
            {' '}
          </Text>
        </View>

        <View
          style={{
            width: width,
            paddingHorizontal: 10,
            borderRadius: 10,
            alignSelf: 'center',
            height: 50,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5,
          }}>
          <TouchableOpacity
            style={{
              width: '33%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.changebtn('text1', 'pending')}>
            <View
              style={
                this.state.text1 == 1
                  ? styles.in_active_button
                  : styles.active_button
              }>
              <Text
                allowFontScaling={false}
                style={
                  this.state.text1 == 1
                    ? styles.in_active_text
                    : styles.active_text
                }>
                Active
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '33%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.changebtn('text2', 'complete')}>
            <View
              style={
                this.state.text2 == 1
                  ? styles.in_active_button
                  : styles.active_button
              }>
              <Text
                allowFontScaling={false}
                style={
                  this.state.text2 == 1
                    ? styles.in_active_text
                    : styles.active_text
                }>
                Completed
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '33%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.changebtn('text3', 'cancel')}>
            <View
              style={
                this.state.text3 == 1
                  ? styles.in_active_button
                  : styles.active_button
              }>
              <Text
                allowFontScaling={false}
                style={
                  this.state.text3 == 1
                    ? styles.in_active_text
                    : styles.active_text
                }>
                Cancelled
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {this.state.skalton == true ? (
          <SkeletonPlaceholder>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 5,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
              }}></View>

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                height: 160,
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 15,
                backgroundColor: 'white',
                marginBottom: 15,
              }}></View>
          </SkeletonPlaceholder>
        ) : (
          <ScrollView>
            {/* {this.state.check_design == 'pending' && (
              <View>
                <View
                  style={{
                    backgroundColor: 'orange',
                    width: width / 1.1,
                    marginBottom: 10,
                    alignSelf: 'center',
                    borderRadius: 4,
                    paddingLeft: 10,
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginTop: 15,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: 'white',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text
                          style={{
                            color: 'gray',
                            fontWeight: '400',
                            fontSize: 12,
                            marginTop: 5,
                          }}>
                          Appointment Date
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <Icon
                            name="clockcircleo"
                            type="AntDesign"
                            style={{color: '#9d0c0f', fontSize: 16}}
                          />

                          <View style={{marginLeft: 8}}>
                            <Text
                              style={{
                                color: '#9d0c0f',
                                fontSize: 12,
                                fontWeight: '600',
                              }}>
                              Wed Dec 20 - 09:00 AM
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Icon
                        name="arrow-right-alt"
                        type="MaterialIcons"
                        style={{color: '#9d0c0f', fontSize: 28}}
                      />
                    </View>

                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: 'lightgray',
                        marginVertical: 10,
                      }}></View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        style={{width: 50, height: 50, borderRadius: 50}}
                        source={require('../assets/doc1.png')}
                      />

                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            color: '#9d0c0f',
                            fontWeight: 'bold',
                            fontSize: 16,
                          }}>
                          Dr. Mario Bianchi
                        </Text>
                        <Text style={{color: 'gray', fontSize: 12}}>
                          Urgent Care
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )} */}

            {/* {this.state.check_design == 'complete' && (
              <View
                style={{
                  backgroundColor: 'green',
                  width: width / 1.1,
                  marginBottom: 10,
                  alignSelf: 'center',
                  borderRadius: 4,
                  paddingLeft: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop: 15,
                }}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: 'gray',
                          fontWeight: '400',
                          fontSize: 12,
                          marginTop: 5,
                        }}>
                        Appointment Date
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                        }}>
                        <Icon
                          name="clockcircleo"
                          type="AntDesign"
                          style={{color: '#9d0c0f', fontSize: 16}}
                        />

                        <View style={{marginLeft: 8}}>
                          <Text
                            style={{
                              color: '#9d0c0f',
                              fontSize: 12,
                              fontWeight: '600',
                            }}>
                            Wed Dec 20 - 09:00 AM
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Icon
                      name="arrow-right-alt"
                      type="MaterialIcons"
                      style={{color: '#9d0c0f', fontSize: 28}}
                    />
                  </View>

                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: 'lightgray',
                      marginVertical: 10,
                    }}></View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{width: 50, height: 50, borderRadius: 50}}
                      source={require('../assets/doctor-thumb-01.jpg')}
                    />

                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          color: '#9d0c0f',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        Dr.ssa Alda Attinà
                      </Text>
                      <Text style={{color: 'gray', fontSize: 12}}>
                        Urgent Care
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )} */}

            {/* {this.state.check_design == 'cancel' && (
              <View
                style={{
                  backgroundColor: 'red',
                  width: width / 1.1,
                  marginBottom: 10,
                  alignSelf: 'center',
                  borderRadius: 4,
                  paddingLeft: 10,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop: 15,
                }}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: 'gray',
                          fontWeight: '400',
                          fontSize: 12,
                          marginTop: 5,
                        }}>
                        Appointment Date
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                        }}>
                        <Icon
                          name="clockcircleo"
                          type="AntDesign"
                          style={{color: '#9d0c0f', fontSize: 16}}
                        />

                        <View style={{marginLeft: 8}}>
                          <Text
                            style={{
                              color: '#9d0c0f',
                              fontSize: 12,
                              fontWeight: '600',
                            }}>
                            Wed Dec 20 - 09:00 AM
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Icon
                      name="arrow-right-alt"
                      type="MaterialIcons"
                      style={{color: '#9d0c0f', fontSize: 28}}
                    />
                  </View>

                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: 'lightgray',
                      marginVertical: 10,
                    }}></View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{width: 50, height: 50, borderRadius: 50}}
                      source={require('../assets/doctor-thumb-01.jpg')}
                    />

                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          color: '#9d0c0f',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        Dr.ssa Alda Attinà
                      </Text>
                      <Text style={{color: 'gray', fontSize: 12}}>
                        Nutrizionista
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )} */}

            {this.state.data1 == '' ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: height / 1.5,
                }}>
                <Text style={{color: 'black'}}>
                  You don't have any appointment here.
                </Text>
              </View>
            ) : (
              <View style={{paddingBottom: 10}}>{this.createtable1()}</View>
            )}
          </ScrollView>
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
              Cancel Appointment!
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
              Are you sure you want to cancel your appointment?
            </Text>
            {/* <Text allowFontScaling={false} style={{ fontSize: 14, color: 'gray', marginTop: 10, textAlign: 'center',  fontFamily:'DMSans-Bold', paddingHorizontal: 30 }}>{this.props.Only_funds_will_return_your_accouont}</Text> */}

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
                <Text
                  allowFontScaling={false}
                  style={{color: 'white', fontFamily: 'DMSans-Bold'}}>
                  Yes Cancel
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
    width: '98%',
    height: 45,
    borderBottomColor: '#9d0c0f',
    borderBottomWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  in_active_button: {
    width: '98%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  active_text: {
    color: '#9d0c0f',
    fontSize: 14,
    fontWeight: 'bold',
  },

  in_active_text: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Patient_All_Appointment;
