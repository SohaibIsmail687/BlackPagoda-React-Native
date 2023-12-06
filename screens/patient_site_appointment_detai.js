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
  Linking,
  PermissionsAndroid,
  Platform,
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
import ImageViewer from 'react-native-image-zoom-viewer';
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
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Call} from 'react-native-openanything';

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  MarkerAnimated,
  Animated,
  Polyline,
} from 'react-native-maps';
import openMap from 'react-native-open-maps';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class patient_site_appointment_detai extends React.Component {
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

  GoTo_Map(val) {
    openMap({
      // start:'Jail Chok',
      end: val,
    });
  }

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );

    let user = await AsyncStorage.getItem('customer');
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let mobile_number = parsed[0].mobile_number;
    let id = parsed[0].id;
    let profile = parsed[0].profile;
    let email = parsed[0].email;
    let age = parsed[0].age;
    let gender = parsed[0].gender;

    console.log('relatttttionnnnnn', this.props.lat);
    console.log('relatttttionnnnnn', this.props.lng);

    this.setState({
      id: id,
      name: name,
      image2: profile,
      email: email,
      mobile_number: mobile_number,
      age: age,
      gender: gender,
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

  next = () => {
    this.RBSheet1.close();
    Actions.cancel_appointment({
      fee: this.props.fee,
      time: this.props.time,
      date: this.props.date,
      appointment_id: this.props.appointment_id,
      doctor_id: this.props.doctor_id,
      fcm_token: this.props.fcm_token,
    });
  };

  call = () => {
    Call('this.props.mobile_number').catch(err => console.error(err));
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="white" barStyle="light-content" />
        <View style={{flex: 1, backgroundColor: 'white'}}>
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
              Appointment
            </Text>
            <Text></Text>
          </View>

          <View style={{borderWidth: 0.5, borderColor: 'lightgray'}}></View>

          <ScrollView>
            {/* {this.props.status=='pending'&&

        <View
            style={{ width: width / 1.1, alignSelf: 'center', backgroundColor: '#FFF4E8', borderRadius: 8, paddingVertical: 15, paddingHorizontal: 15,       marginTop: 20,   }}

          >


<View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
             <Icon name="questioncircle" type="AntDesign" style={{ color: "#E3660B", fontSize: 16}} />                                 
             

             <Text style={{color:'#E3660B', fontSize:18,fontWeight:'bold'}}>  Confirmation pending</Text>
            
                 
     </View>
            <Text style={{ color: '#E3660B', fontWeight: '400' ,textAlign:'justify'}}>Waiting for Doctor to confirm your appointment. In case your preferred slot is not available you will receive a callback within 16 hours.</Text>
 

            </View>

          }




{this.props.status=='active'&&

<View
    style={{ width: width / 1.1, alignSelf: 'center', backgroundColor: '#E2FFF3', borderRadius: 8, paddingVertical: 15, paddingHorizontal: 15,       marginTop: 20,   }}

  >


<View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
     <Icon name="questioncircle" type="AntDesign" style={{ color: "#0A9E45", fontSize: 16}} />                                 
     

     <Text style={{color:'#0A9E45', fontSize:18,fontWeight:'bold'}}>  Appointment confirmed</Text>
    
         
</View>
    <Text style={{ color: '#0A9E45', fontWeight: '400' ,textAlign:'justify'}}> Doctor has confirmed your appointment. In case a doctor is not available you will receive a refund and an option to reschedule your appointment.</Text>


    </View>

  }





  
{this.props.status=='cancel'&&

<View
    style={{ width: width / 1.1, alignSelf: 'center', backgroundColor: '#FFF2F2', borderRadius: 8, paddingVertical: 15, paddingHorizontal: 15,       marginTop: 20,   }}

  >


<View style={{flexDirection:'row',alignItems:'center',marginTop:5}}>
     <Icon name="questioncircle" type="AntDesign" style={{ color: "#E30B0B", fontSize: 16}} />                                 
     

     <Text style={{color:'#E30B0B', fontSize:18,fontWeight:'bold'}}>  Appointment cancelled</Text>
    
         
</View>
    <Text style={{ color: '#E30B0B', fontWeight: '400' ,textAlign:'justify'}}> Doctor has confirmed your appointment. In case a doctor is not available you will receive a refund and an option to reschedule your appointment.</Text>


    </View>

  }
 */}

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: width / 1.1,
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 8,
                flexDirection: 'row',
                paddingVertical: 15,
                paddingHorizontal: 10,
                marginTop: 15,
                marginBottom: 10,
                borderBottomColor: 'lightgray',
                borderBottomWidth: 0.5,
              }}>
              <View>
                {/* <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    alignSelf: 'center',
                  }}
                  source={require('../assets/doctor-11.jpg')}
                /> */}

                <ImageLoad
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    alignSelf: 'center',
                  }}
                  loadingStyle={{size: 'large', color: 'blue'}}
                  source={{uri: this.props.doctor_profile}}
                  borderRadius={80}
                  placeholderStyle={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View style={{marginLeft: 10, width: '77%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingRight: 10,
                  }}>
                  <View>
                    <Text
                      style={{color: 'black', fontSize: 14, fontWeight: '400'}}>
                      Pending In-Clinic Appointment
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                      }}>
                      {/* <Icon name="calendar-clock" type="MaterialCommunityIcons" style={{ color: "#0EAFF6", fontSize: 16}} />                                  */}

                      <Text
                        style={{
                          color: '#0EAFF6',
                          fontSize: 14,
                          fontWeight: 'bold',
                        }}>
                        {/* Feb 5, 2022, 7:30 PM */}
                        {this.props.date}
                      </Text>
                    </View>
                    <Text
                      style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {this.props.doctor_name}
                    </Text>
                    <Text
                      style={{color: 'black', fontSize: 14, fontWeight: '400'}}>
                      {this.props.category}
                    </Text>
                    {/* <Text style={{ color: 'black', fontSize: 14, fontWeight: '400' }}>Booked for Mother</Text> */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                paddingHorizontal: 15,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              Location
            </Text>

            <Text
              style={{
                color: 'black',
                fontWeight: '400',
                paddingHorizontal: 15,
              }}>
              {this.props.doctor_address}
            </Text>

            {/* <Image
              style={{
                width: width / 1.1,
                height: 150,
                marginTop: 10,
                borderRadius: 12,
                alignSelf: 'center',
              }}
              source={require('../assets/mapp.jpeg')}
            /> */}

            <MapView
              provider={PROVIDER_GOOGLE}
              zoomEnabled={true}
              mapType={'standard'}
              userInterfaceStyle={'dark'}
              style={styles.map}
              // showsUserLocation={true}
              // showsMyLocationButton={true}
              showsBuildings={true}
              //  minZoomLevel={15}
              // maxZoomLevel={90}
              region={{
                latitude: this.props.lat,
                longitude: this.props.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: this.props.lat,
                  longitude: this.props.lng,
                }}>
                <Image
                  source={require('../assets/dm.png')}
                  resizeMode="contain"
                  style={{width: 50, height: 50, tintColor: '#032644'}}
                />
                {/* <Icon name="map-marker-alt" type="FontAwesome5" style={{ color: '#38b6ff', fontSize: 30 }} /> */}
              </Marker>
              {/* <Marker
                coordinate={{
                  latitude: this.state.lat,
                  longitude: this.state.lng,
                }}>
                <Icon
                  name="map-marker-alt"
                  type="FontAwesome5"
                  style={{color: 'red', fontSize: 30}}
                />
              </Marker> */}
            </MapView>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
                width: width / 1.1,
              }}>
              <TouchableOpacity
                onPress={() => this.call()}
                activeOpacity={0.8}
                style={{
                  width: '47%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  backgroundColor: '#F7F2FC',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <Icon
                  name="call"
                  type="Ionicons"
                  style={{color: '#0EAFF6', fontSize: 24}}
                />

                <Text
                  style={{color: '#0EAFF6', fontWeight: 'bold', fontSize: 16}}>
                  {' '}
                  Call
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.GoTo_Map(this.props.doctor_address)}
                activeOpacity={0.8}
                style={{
                  width: '47%',
                  flexDirection: 'row',
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  backgroundColor: '#0EAFF6',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                }}>
                <Icon
                  name="send"
                  type="FontAwesome"
                  style={{color: 'white', fontSize: 24}}
                />

                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  {' '}
                  Direction
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: width,
                height: 1,
                backgroundColor: 'lightgray',
                marginVertical: 25,
              }}></View>

            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                paddingHorizontal: 15,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              Booking Details
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Text style={{color: 'gray', fontWeight: '500', fontSize: 15}}>
                Booked for:
              </Text>

              <Text style={{color: 'black', fontWeight: '600', fontSize: 15}}>
                {' '}
                {this.props.patient_name}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Text style={{color: 'gray', fontWeight: '500', fontSize: 15}}>
                Appointment ID:
              </Text>

              <Text style={{color: 'black', fontWeight: '600', fontSize: 15}}>
                {' '}
                {this.props.appointment_id}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Text style={{color: 'gray', fontWeight: '500', fontSize: 15}}>
                Appointment fees:
              </Text>

              <Text style={{color: 'black', fontWeight: '600', fontSize: 15}}>
                {' '}
                $ {this.props.fee}
              </Text>
            </View>
            {this.props.status == 'active' && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    borderRadius: 8,
                    marginTop: 20,
                    paddingHorizontal: 15,
                    width: width / 1.1,
                    alignSelf: 'center',
                    backgroundColor: '#EAF3FE',
                    paddingVertical: 10,
                  }}>
                  <Icon
                    name="calendar"
                    type="Entypo"
                    style={{color: '#186ADE', fontSize: 24}}
                  />

                  <Text
                    style={{
                      color: '#186ADE',
                      width: '80%',
                      fontWeight: '600',
                      fontSize: 15,
                    }}>
                    {' '}
                    Reschedule
                  </Text>
                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: '#186ADE', fontSize: 24}}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    borderRadius: 8,
                    marginTop: 20,
                    paddingHorizontal: 15,
                    width: width / 1.1,
                    alignSelf: 'center',
                    backgroundColor: '#FCF0F0',
                    paddingVertical: 10,
                  }}>
                  <Icon
                    name="squared-cross"
                    type="Entypo"
                    style={{color: '#D91F11', fontSize: 24}}
                  />

                  <Text
                    style={{
                      color: '#D91F11',
                      width: '80%',
                      fontWeight: '600',
                      fontSize: 15,
                    }}>
                    {' '}
                    Cancel
                  </Text>
                  <Icon
                    name="chevron-right"
                    type="Entypo"
                    style={{color: '#D91F11', fontSize: 24}}
                  />
                </View>
              </View>
            )}

            <View
              style={{
                width: width,
                height: 1,
                backgroundColor: 'lightgray',
                marginVertical: 25,
              }}></View>

            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                paddingHorizontal: 15,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              Note
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Icon
                name="circle"
                type="FontAwesome"
                style={{color: 'gray', fontSize: 15, marginTop: 3}}
              />

              <Text
                style={{
                  color: 'gray',
                  fontWeight: '600',
                  fontSize: 15,
                  marginLeft: 10,
                }}>
                Cancellation fees apply. You can cancel or reschedule your
                appointment up to 24 hours before the scheduled time.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                paddingHorizontal: 15,
                marginBottom: 30,
              }}>
              <Icon
                name="circle"
                type="FontAwesome"
                style={{color: 'gray', fontSize: 15, marginTop: 3}}
              />

              <Text
                style={{
                  color: 'gray',
                  fontWeight: '600',
                  fontSize: 15,
                  marginLeft: 10,
                }}>
                If you cancel or reschedule your appointment before 24 hours of
                the scheduled time, you will be charged $1.
              </Text>
            </View>
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
                <UIActivityIndicator color="#FE0000" />
                <Text
                  style={{fontSize: 16, color: '#FE0000', fontWeight: 'bold'}}>
                  Progressing your request
                </Text>
              </View>
            </View>
          )}
        </View>
      </>
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
    width: 60,
    height: 60,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FE0000',
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
  map: {
    width: width / 1.1,
    alignSelf: 'center',
    height: height / 3.5,
    marginVertical: 10,
  },
});

export default patient_site_appointment_detai;
