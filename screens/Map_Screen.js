import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Text, TouchableOpacity, Image, StatusBar, Dimensions, ImageBackground, AsyncStorage, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header } from 'native-base';
import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    AnimatedRegion,
    MarkerAnimated,
    Animated,
    Polyline,
} from "react-native-maps";
import Connection from "../connection";
import StarRating from 'react-native-star-rating';
import getDistance from "geolib/es/getDistance";
import ImageLoad from 'react-native-image-placeholder';
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


export default class Map_Screen extends Component {


    constructor(props) {
        super(props);

        this.state = {
            l_id: 152,
            text1: 2,
            text2: 1,
            text3: 1,
            text4: 1,

            data2: [],
            table: [],

            league_id: "",
            text5: 2,
            text6: 1,
            child: true,
            data: [],
            heh: false,
            comment: "",
            data1: [],
            table: [],
            isLoading: true,
            d_profilee: null,
            location: "",
            lat: "",
            lng: "",
            id: "",
            manufacture: "",
            year: "",
            model: "",
            problem: "",
            driver_cur_lat: 31.4805,
            driver_cur_lng: 74.3239,
            driver_cur_lat_1: 31.4805,
            driver_cur_lng_1: 74.3239,
            origin_lng: 32.5841895,
            origin_lat: 74.0765673,
            origin_check: false,
            spinner: false,
            check_check: true,

            ride_id_1: "",
            loc_check: false,
            show_latitude_logintude: false,
            spinner1: false,
            token: "",
            sound_play: true,
            category: "Requests",
            tune: false,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.handleBackButtonClick
        );
    }
    onButtonPress = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
        // then navigate
        navigate("NewScreen");
    };
    handleBackButtonClick() {
        Actions.pop()
        return true;
    }


    componentDidMount = async () => {




        console.log("category", this.props.user_c_lat);
        console.log("sub_category", this.props.user_c_lng);
 
    this.doctors_all_fav()
 
    var today = new Date();

    var nextweek_T = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let date0 = nextweek_T.toString()
    let ddd = date0.split(' ')
    let day_1 = ddd[0]
    let dd_2 = ddd[1]
    let dd_3 = ddd[2]
    let dd_4 = ddd[3]
    let final_date_1 = dd_2 + ' ' + dd_3 + ', ' + dd_4
    console.log('sssssssssss', final_date_1)

    this.setState({
    
        day_1: day_1,
        final_date_1: final_date_1


    })



    }


  


    createtable2 = () => {
        let table = []





        let record1 = this.state.data1
        // console.log(';;;;;;;;;;;;;;;;;;;;',record1)

        let len = record1.length
        //  console.log(';;;;;;;;;;;;;;;;;;;;',len)
        if (record1 != 'fail') {
            for (let i = 0; i < len; i++) {



                let lat = record1[i].lat
                let lng = record1[i].lng

                let lng_f1 = parseFloat(lat);
                let lat_f1 = parseFloat(lng);

                table.push(<View>
                    {


                        <Marker
                            coordinate={{
                                latitude: lng_f1,
                                longitude: lat_f1,
                            }}
                        >
                            <Image
                                source={require("../assets/dm.png")}
                                resizeMode="contain"
                                style={{ width: 50, height: 50, tintColor: '#007fff' }}
                            />
                            {/* <Icon name="map-marker-alt" type="FontAwesome5" style={{ color: '#007fff', fontSize: 30 }} /> */}

                        </Marker>
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





 
    doctors_all_fav = () => {
        // let uploaddata = new FormData();
    
    
    
        // uploaddata.append("category", this.props.category);
    
    
    
        let api = Connection + "rest_apis.php?action=all_doctors";
        //   console.log("pass => ", api);
        fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            otherHeader: "foo",
          },
          // body: uploaddata,
        })
          .then((response) => response.json())
          .then((response) => {
    
            let table = [];
                let record = response.response
                let len = record.length;


                // console.log('mondddddddddddayyyyyyyyyy', record)


                if (record != 'fail') {
                    for (let i = 0; i < len; i++) {
                        let d_lat = record[i].lat;
                        let d_lng = record[i].lng;

                        let test = {
                            latitude: d_lat,
                            longitude: d_lng,
                        };
                        console.log('d_latd_lat', d_lat)
                        console.log('d_lngd_lngd_lngd_lngd_lngd_lng', d_lng)


                        if (
                            getDistance(
                                {
                                    latitude: this.props.user_c_lat,
                                    longitude: this.props.user_c_lng,
                                },
                                test
                            ) <= 30000
                        ) {
                            table.push(record[i]);

                        }
                        getDistance(
                            {
                                latitude: this.props.user_c_lat,
                                longitude: this.props.user_c_lng,
                            },
                            test
                        );

                    }






                }

                else {
                    this.setState({
                        data1: []
                    })
                }
                this.setState({
                    data1: table,
                    skalton: false
                })

                console.log('mondddddddddddayyyyyyyyyy', this.state.data1)

            })
          .catch((error) => {
            console.error(error);
          });
    
      };
    





    doctors_by_category = () => {

        let uploaddata = new FormData();



        uploaddata.append("category", this.props.category);
        uploaddata.append("sub_category", this.props.sub_category);




        let api = Connection + "rest_apis.php?action=doctors_by_category";
        //   console.log("pass => ", api);
        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                otherHeader: "foo",
            },
            body: uploaddata,
        })
            .then((response) => response.json())
            .then((response) => {
                let table = [];
                let record = response.response
                let len = record.length;


                // console.log('mondddddddddddayyyyyyyyyy', record)


                if (record != 'fail') {
                    for (let i = 0; i < len; i++) {
                        let d_lat = record[i].lat;
                        let d_lng = record[i].lng;

                        let test = {
                            latitude: d_lat,
                            longitude: d_lng,
                        };
                        console.log('d_latd_lat', d_lat)
                        console.log('d_lngd_lngd_lngd_lngd_lngd_lng', d_lng)


                        if (
                            getDistance(
                                {
                                    latitude: this.props.user_c_lat,
                                    longitude: this.props.user_c_lng,
                                },
                                test
                            ) <= 50000
                        ) {
                            table.push(record[i]);

                        }
                        getDistance(
                            {
                                latitude: this.props.user_c_lat,
                                longitude: this.props.user_c_lng,
                            },
                            test
                        );

                    }






                }

                else {
                    this.setState({
                        data1: []
                    })
                }
                this.setState({
                    data1: table,
                    skalton: false
                })

                console.log('mondddddddddddayyyyyyyyyy', this.state.data1)

            })
            .catch((error) => {
                console.error(error);
            });

    };





    createtable1 = () => {
        let table = []





        let record1 = this.state.data1
        // console.log(';;;;;;;;;;;;;;;;;;;;',record1)

        let len = record1.length
        //  console.log(';;;;;;;;;;;;;;;;;;;;',len)
        if (record1 != 'fail') {
            for (let i = 0; i < len; i++) {



                let name = record1[i].name
                let category = record1[i].category
                let address = record1[i].address

                let lat1 = record1[i].lat
                let lng1 = record1[i].lng
                let lat = parseFloat(lat1);
                let lng = parseFloat(lng1);

                //   let doctor_address = record1[i].doctor_address
                let doctor_id = record1[i].id
                let experience = record1[i].experience
                let sub_category = record1[i].sub_category
                  let c_name = record1[i].c_name
                let avg_rating = record1[i].avg_rating
                let total_review = record1[i].total_review
                let license_number = record1[i].license_number
                let degree = record1[i].degree
                let city = record1[i].city
                let stripe_key = record1[i].stripe_key

                let a_r = Number(avg_rating).toFixed(1);
                  let fee = record1[i].fee
                //   let fcm_token = record1[i].fcm_token



                //   let c_images = record1[i].c_images
                // let clinic_images =Connection+'images/'+c_images


                // console.log('AAAAAAAAAAAAAAAAAAAAAAA',clinic_images)
                // console.log('AAAAAAAAAAAAAAAAAAAAAAA',c_name)




                let profile1 = record1[i].profile

                let profile = Connection + 'images/' + profile1

                //       let profile1 = record1[i].user_profile

                //       let profile =Connection+'CarFinder/'+profile1
                //   console.log("aaaaaaaaaaaaa",profile);

                //       let comment = record1[i].comment
                //       let rating = record1[i].rating







                table.push(<View>
                    {
                        <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.Doctor_Appointment_Profile_1({ stripe_key:stripe_key, name1: name, profile: profile, category: category, doctor_id: doctor_id, experience: experience, fee: fee, address: address, lat: lat, lng: lng, total_review: total_review, a_r: a_r, license_number: license_number, degree: degree, city: city,c_name:c_name ,day_1: this.state.day_1, final_date_1: this.state.final_date_1,})}
                            style={{ width: width / 2.3, backgroundColor: 'white', borderRadius: 10, paddingTop: 10, paddingBottom: 5, paddingHorizontal: 10, marginLeft: 10 }}>



                            {/* <Image style={{ width: '100%', height: 100 }} source={require('../assets/martin.jpg')} /> */}

                            <ImageLoad
                                style={{ width: '100%', height: 100 }}
                                loadingStyle={{ size: 'large', color: 'blue' }}
                                source={{ uri: profile }}
                                // borderRadius={150}
                                placeholderStyle={{ width: '100%', height: 100 }}
                            />
                            <Text style={{ color: 'black', fontSize: 16, marginTop: 10 }}>Dr.{name}</Text>
                            <Text style={{ color: 'gray', fontSize: 12 }}>{category}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                     <StarRating
                                         disabled={false}
                                         maxStars={5}
                                         rating={a_r}
                                         containerStyle={{ width: 70 }}
                                         starSize={13}
                                         fullStarColor={'#F5C60D'}
                                     />
                                     <Text style={{ color: 'gray', fontSize: 13, fontWeight: '400' }}> ({a_r})</Text>
                                </View>
                            {/* <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={a_r}
                                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                containerStyle={{ width: 100 ,marginTop:5}}
                                starSize={12}
                                fullStarColor={'#F5C60D'}
                            /> */}
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                         <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                         <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                         <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                         <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                         <Icon name="star" type="FontAwesome" style={{ color: 'lightgray', fontSize: 15 }} />
                     </View> */}
                        </TouchableOpacity>}
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

        return (

            <View style={{ flex: 1 }}>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    zoomEnabled={true}
                    mapType={"standard"}
                    userInterfaceStyle={"dark"}
                    style={styles.map}
                    // showsUserLocation={true}
                    // showsMyLocationButton={true}
                    showsBuildings={true}
                    //  minZoomLevel={14}
                    // maxZoomLevel={90}
                    region={{
                        latitude: this.props.user_c_lat,
                        longitude: this.props.user_c_lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                    <Marker
                        coordinate={{
                            latitude: this.props.user_c_lat,
                            longitude: this.props.user_c_lng,
                        }}
                    >
                        <Icon name="map-marker-alt" type="FontAwesome5" style={{ color: 'red', fontSize: 30 }} />

                    </Marker>

                    {this.createtable2()}
                </MapView>



                <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 15,
            backgroundColor: "#24C6D2",
            position:'absolute',
            top:0,
            width:width,

          }}
        >

<TouchableOpacity  onPress={() => Actions.pop()} style={{width:30,height:30,borderRadius:24, alignItems:'center',justifyContent:'center'}}>

                
<Icon
// onPress={() => Actions.pop()}
name="arrowleft"
type="AntDesign"
style={{ color: "white", fontSize: 22 }}
/>
</TouchableOpacity>

          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Nearby Doctors</Text>
          <Text></Text>

        </View>




{/* 
                <View style={{ width: width / 1, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', position: 'absolute', justifyContent: 'space-between', paddingHorizontal: 10, top: 10 }}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ width: 45, height: 45, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                        <Icon name="arrowleft" type="AntDesign" style={{ color: 'gray', fontSize: 20 }} />
                    </TouchableOpacity>

                    <View style={{ width: '85%', height: 45 }}>
                        <TextInput style={{ width: '100%', height: 45, borderRadius: 30, backgroundColor: 'white', borderWidth: 1, borderColor: '#6a80b8', color: 'black', paddingLeft: 20 }} placeholder='Find Doctor' placeholderTextColor='gray' />
                        <Icon name="ios-search" type="Ionicons" style={{ color: '#6a80b8', fontSize: 23, position: 'absolute', right: 15, top: 10 }} />
                    </View>
                </View> */}

                <View style={{ position: 'absolute', bottom: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <ScrollView horizontal={true}>


                        {this.createtable1()}
                        {/* <View style={{ width: width / 2.3, backgroundColor: 'white', borderRadius: 10, paddingTop: 10, paddingBottom: 5, paddingHorizontal: 10, marginLeft: 10 }}>
                            <Image style={{ width: '100%', height: 100 }} source={require('../assets/martin.jpg')} />
                            <Text style={{ color: 'black', fontSize: 16, marginTop: 10 }}>Dr.Jone</Text>
                            <Text style={{ color: 'gray', fontSize: 12, marginTop: 3 }}>Dental Care</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: 'lightgray', fontSize: 15 }} />
                            </View>
                        </View>

                        <View style={{ width: width / 2.3, backgroundColor: 'white', borderRadius: 10, paddingTop: 10, paddingBottom: 5, paddingHorizontal: 10, marginLeft: 20 }}>
                            <Image style={{ width: '100%', height: 100 }} source={require('../assets/martin.jpg')} />
                            <Text style={{ color: 'black', fontSize: 16, marginTop: 10 }}>Dr.Jone</Text>
                            <Text style={{ color: 'gray', fontSize: 12, marginTop: 3 }}>Dental Care</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: 'lightgray', fontSize: 15 }} />
                            </View>
                        </View>

                        <View style={{ width: width / 2.3, backgroundColor: 'white', borderRadius: 10, paddingTop: 10, paddingBottom: 5, paddingHorizontal: 10, marginLeft: 20 }}>
                            <Image style={{ width: '100%', height: 100 }} source={require('../assets/martin.jpg')} />
                            <Text style={{ color: 'black', fontSize: 16, marginTop: 10 }}>Dr.Jone</Text>
                            <Text style={{ color: 'gray', fontSize: 12, marginTop: 3 }}>Dental Care</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: 'lightgray', fontSize: 15 }} />
                            </View>
                        </View>

                        <View style={{ width: width / 2.3, backgroundColor: 'white', borderRadius: 10, paddingTop: 10, paddingBottom: 5, paddingHorizontal: 10, marginLeft: 20, marginRight: 10 }}>
                            <Image style={{ width: '100%', height: 100 }} source={require('../assets/martin.jpg')} />
                            <Text style={{ color: 'black', fontSize: 16, marginTop: 10 }}>Dr.Jone</Text>
                            <Text style={{ color: 'gray', fontSize: 12, marginTop: 3 }}>Dental Care</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: '#fddd55', fontSize: 15 }} />
                                <Icon name="star" type="FontAwesome" style={{ color: 'lightgray', fontSize: 15 }} />
                            </View>
                        </View> */}
                    </ScrollView>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({

    map: {
        width: width,
        height: height
    }
})


