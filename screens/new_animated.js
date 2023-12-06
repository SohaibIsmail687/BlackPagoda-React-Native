import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Image,
    Animated,
    Platform
  } from "react-native";
import ImageLoad from 'react-native-image-placeholder';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  MarkerAnimated,
  Callout,
} from "react-native-maps";
import {connect} from 'react-redux';
import Connection from "../connection";
import {
    Container,
    Header,
    Content,
    Icon,
    Footer,
    FooterTab,
    Badge,
    Right,
    Picker,
    Left,
    Button,
  } from "native-base";
  import { Actions } from "react-native-router-flux";
  // import AsyncStorage from '@react-native-async-storage/async-storage';

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 15;
// const CARD_WIDTH = CARD_HEIGHT - 50;
class new_animated extends React.Component {
  state = {
    kkk:this.props.map_arr,
    
    kakk:[{"coordinate": {"latitude": 32.0306, "longitude": 74.2106}, "name": "James"}, {"coordinate": {"latitude": 32.2071, "longitude": 74.1842}, "name": "Posted "}, {"coordinate": {"latitude": 32.1876919, "longitude": 74.1944529}, "name": "Ol"}, {"coordinate": {"latitude": 32.1026, "longitude": 74.1894}, "name": "Doctor shaikha"}, {"coordinate": {"latitude": 32.1620, "longitude": 74.1989}, "name": "Doc New"}, {"coordinate": {"latitude": 32.0938865, "longitude": 74.2006206}, "name": "Doc name"}],
 ss: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: "Best Place",
        description: "This is the best place in Portland",
        image: Images[0],
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507,
        },
        title: "Second Best Place",
        description: "This is the second best place in Portland",
        image: Images[1],
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034,
        },
        title: "Third Best Place",
        description: "This is the third best place in Portland",
        image: Images[2],
      },
      {
        coordinate: {
          latitude: 45.521016,
          longitude: -122.6561917,
        },
        title: "Fourth Best Place",
        description: "This is the fourth best place in Portland",
        image: Images[3],
      },
    ],
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount = async () => {

    console.log("ssssssssss",this.props.map_arr)
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.kkk.length) {
        index = this.state.kkk.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const  coordinate  = this.state.kkk[index];
          const  coordinate1  = this.state.kkk[index].coordinate;

          console.log("mmmmmmmmmmmnnnnnnnnnnnnnnnnaaaaaaaaaaaaaa",coordinate1)
          this.map.animateToRegion(
            {
              ...coordinate1,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }



  createtable1 = () => {
    let table = []

    let record1 = this.state.kkk
    // console.log(';;;;;;;;;;;;;;;;;;;;',record1)

    let len = record1.length
    //  console.log(';;;;;;;;;;;;;;;;;;;;',len)
    if (record1 != 'fail') {
        for (let i = 0; i < len; i++) {

            let profile = record1[i].profile

            let name = record1[i].name
            let email = record1[i].email

            let category = record1[i].category
            let fee = record1[i].fee
            let address = record1[i].address

            //   let doctor_address = record1[i].doctor_address
            let doctor_id = record1[i].doctor_id
            let lat1 = record1[i].doc_lat
            let lng1 = record1[i].doc_lng
            let lat = parseFloat(lat1);
            let lng = parseFloat(lng1);
            let experience = record1[i].experience
            let a_r = record1[i].a_r
            let total_review = record1[i].total_review
            let city = record1[i].city;

            let degree = record1[i].degree
            let license_number = record1[i].license_number
            let c_name = record1[i].c_name
            let appointment = record1[i].appointment

            let s_key = record1[i].s_key
            let paypal = record1[i].paypal
            let access = record1[i].access
            let fcm_token = record1[i].fcm_token
            let stripe_key = record1[i].stripe_key

            let online = record1[i].online
            let app = record1[i].app


   console.log(';;;;;;;;;;;;;;;;;;;;1111',lat)
      console.log(';;;;;;;;;;;;;;;;;;;;22222',lng)

            table.push(<View>
                {
                    <View>
                        {this.props.consult==true?


<TouchableOpacity onPress={() => Actions.Consult_Doctor_Details({stripe_key:stripe_key,app:app,email:email,fcm_token:fcm_token,paypal:paypal,access:access, s_key:s_key,name1: name, profile: profile, category: category, doctor_id: doctor_id, experience: experience, fee: fee, address: address, lat: lat, lng: lng, total_review: total_review, a_r: a_r, license_number: license_number, degree: degree, city: city,c_name:c_name,appointment:appointment })}
activeOpacity={0.8} style={styles.card}>
    <ImageLoad
          style={styles.cardImage}
          loadingStyle={{ size: 'large', color: 'blue' }}
          source={{ uri: profile}}
          borderRadius={0}
          placeholderStyle={styles.cardImage}
       />
    <View style={styles.textContent}>
        <Text numberOfLines={1} style={styles.cardtitle}>{name}</Text>
        <Text numberOfLines={1} style={styles.cardDescription}>{category}</Text>
        <Text numberOfLines={1} style={styles.cardDescription}>{address}</Text>
    </View>
</TouchableOpacity>

:



<TouchableOpacity onPress={() => Actions.Doctor_Appointment_Profile_1({stripe_key:stripe_key,app:app,email:email,fcm_token:fcm_token,paypal:paypal,access:access, s_key:s_key,name1: name, profile: profile, category: category, doctor_id: doctor_id, experience: experience, fee: fee, address: address, lat: lat, lng: lng, total_review: total_review, a_r: a_r, license_number: license_number, degree: degree, city: city,c_name:c_name,appointment:appointment })}
activeOpacity={0.8} style={styles.card}>
    <ImageLoad
          style={styles.cardImage}
          loadingStyle={{ size: 'large', color: 'blue' }}
          source={{ uri: profile}}
          borderRadius={0}
          placeholderStyle={styles.cardImage}
       />
    <View style={styles.textContent}>
        <Text numberOfLines={1} style={styles.cardtitle}>{name}</Text>
        <Text numberOfLines={1} style={styles.cardDescription}>{category}</Text>
        <Text numberOfLines={1} style={styles.cardDescription}>{address}</Text>
    </View>
</TouchableOpacity>

        }
        </View>

                }
            </View>
            )
        }
        return table
    }
    else {
        let img = []
        img.push(<View style={{ flex: 1, justifyContent: 'center' }} >
            {
                <View>

                </View>
            }</View>)
        return img
    }
}






  render() {
    const interpolations = this.state.kkk.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

 

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={{
            latitude: this.props.userlat,
            longitude: this.props.userlng,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
          }}
          style={styles.container}
        >
          {this.state.kkk.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
               
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    
                        <Animated.View style={[styles.markerhead]}>
                            <ImageLoad
                                style={{ width: 30, height: 30}}
                                loadingStyle={{ size: 'small', color: 'blue' }}
                                source={{ uri: marker.profile }}
                                borderRadius={100}
                                placeholderStyle={{ width: 25, height: 25}}
                            />
                            <View style={{marginLeft:6,maxWidth:'70%'}}>
                                 <Text numberOfLines={1} style={{color:'white',fontWeight:'bold',alignSelf:'center'}}>{marker.address}</Text>
                            </View>
                        </Animated.View>
                        <Animated.Image source={require("../assets/dm.png")} resizeMode="contain" style={[styles.marker, scaleStyle]}/>
                  
                  </Animated.View>

              </MapView.Marker>
            );
          })}


                    <Marker
                        coordinate={{
                            latitude: this.props.userlat,
                            longitude: this.props.userlng,
                        }}
                    >
                   
                        <Icon name="google-maps" type="MaterialCommunityIcons" style={{ color: 'red', fontSize: 50 }} />
                    </Marker>
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >

          {this.createtable1()}
            {/* {this.state.kkk.map((marker, index) => (
            <TouchableOpacity onPress={() => Actions.Doctor_Appointment_Profile({app:marker.app,email:marker.email,fcm_token:marker.fcm_token,paypal:marker.paypal,access:marker.access, s_key:marker.s_key,name1: marker.name, profile: marker.profile, category: marker.category, doctor_id: marker.doctor_id, experience: marker.experience, fee: marker.fee, address: marker.address, lat: marker.doc_lat, lng: marker.doc_lng, total_review: marker.total_review, a_r: marker.a_r, license_number: marker.license_number, degree: marker.degree, city: marker.city,c_name:marker.c_name,appointment:marker.appointment,mobile_number:marker.mobile_number,currency:marker.currency })}
             activeOpacity={0.8} style={styles.card} key={index}>
                 <ImageLoad
                       style={styles.cardImage}
                       loadingStyle={{ size: 'large', color: 'blue' }}
                       source={{ uri: marker.profile }}
                       borderRadius={0}
                       placeholderStyle={styles.cardImage}
                    />
                 <View style={styles.textContent}>
                     <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                     <Text numberOfLines={1} style={styles.cardDescription}>{marker.category}</Text>
                     <Text numberOfLines={1} style={styles.cardDescription}>{marker.address}</Text>
                 </View>
            </TouchableOpacity>
          ))} */}
        </Animated.ScrollView>
         <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: 'white', position: 'absolute', width: width }}>
            <Icon onPress={() => { Actions.pop() }} name="keyboard-arrow-left" type="MaterialIcons" style={{ color: "black", fontSize: 33 }} />
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Nearby Doctors</Text>
            <Icon name="wallet-outline" type="Ionicons" style={{ color: "white", fontSize: 19 }} />
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    // width:width/2.2,paddingBottom:10,backgroundColor:'white',borderRadius:8, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3,marginLeft:7,marginRight:7,marginBottom:5,marginTop:15
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
//   textContent: {
//     flex: 1,
//   },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    color:'black'
  },
  cardDescription: {
    fontSize: 11,
    color: "#444",
  },
 
  marker: {
    width: 20, height: 20, tintColor: '#0192fc'
    },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    height:122,
    },

    markerhead:{
        backgroundColor:'#0192fc',justifyContent:'center',alignItems:'center',paddingHorizontal:5,borderRadius:5,paddingVertical:2,flexDirection:'row',marginBottom:10
    }
});

const mapStateToProps = (state) => {
  return {
      Nearby: state.Nearby,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
      spanish_lang: (Nearby) => { dispatch({ type: "spanish_lang", payload: Nearby }) },
      english_lang: (Nearby) => { dispatch({ type: "english_lang", payload: Nearby }) },
      add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(new_animated);