
import { Row } from 'native-base';
import React, { Component } from 'react';

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
    AsyncStorage
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Connection from "../connection";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { connect } from "react-redux";
import ImageLoad from 'react-native-image-placeholder';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height



class Doctor_By_Category extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            text1: 2,
            text2: 1,
            text3: 1,
            text4: 1,
            text5: 1,
            text6: 1,
            data1: [],
            skalton: false,


            check_design: 'All'

        }
    }


    backAction = () => {
        Actions.pop()
        return true;
    };



    componentWillUnmount() {
        this.backHandler.remove();
    }





    changebtn(value, val) {


        if (this.state[value] == 2) {

            this.setState({
                text1: 1,
                text2: 1,
                text3: 1,
                text4: 1,
                text5: 1,
                text6: 1,

                [value]: 2,


            })
        }
        else {
            this.setState({
                text1: 1,
                text2: 1,
                text3: 1,
                text4: 1,
                text5: 1,
                text6: 1,

                [value]: 2,


            })

        }
        this.setState({
            check_design: val
        })
    }





    componentDidMount = async () => {


        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );



        let user = await AsyncStorage.getItem('customer');


        let parsed = JSON.parse(user);

        let id = parsed[0].id;
        let latitude = parsed[0].lat;
        let longitude = parsed[0].lng;
        let lat = parseFloat(latitude);
        let lng = parseFloat(longitude);
        // let qq= new Date().toString()
        // let ddd=qq.split(' ')
        // let dd_1 = ddd[1]
        // let dd_2 = ddd[2]
        // let dd_3 = ddd[3]

        // let final_date= dd_1+' '+dd_2+' '+dd_3

        this.setState({

            id: id,
            lat: lat,
            lng: lng
            // final_date:final_date


        })

        console.log("category", this.props.state1);





        setTimeout(() => {
            this.doctors_by_category()

        }, 100);
    }





    doctors_by_category = () => {

        let uploaddata = new FormData();



        uploaddata.append("state", this.props.state1);





        let api = Connection + "rest_apis.php?action=doctor_by_state";
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

                let record = response.response


                console.log('mondddddddddddayyyyyyyyyy', record)


                if (record != 'fail') {



                    this.setState({
                        data1: record,
                        skalton: false
                    })

                    // console.log('mondddddddddddayyyyyyyyyy',this.state.tuesday1)


                }
                else {
                    this.setState({
                        data1: []
                    })
                }
                this.setState({
                    skalton: false
                })


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
                let fee = record1[i].fee

                let address = record1[i].address

                //   let doctor_address = record1[i].doctor_address
                let doctor_id = record1[i].id
                let lat1 = record1[i].lat
                let lng1 = record1[i].lng
                let lat = parseFloat(lat1);
                let lng = parseFloat(lng1);
                let experience = record1[i].experience
                let avg_rating = record1[i].avg_rating
                let total_review = record1[i].total_review

                let a_r = Number(avg_rating).toFixed(2);

                let degree = record1[i].degree
                let license_number = record1[i].license_number
                let city = record1[i].city

                let c_name = record1[i].c_name

                // let clinic_images =Connection+'images/'+c_images


                // console.log('AAAAAAAAAAAAAAAAAAAAAAA',clinic_images)




                let profile1 = record1[i].profile
                console.log('AAAAAAAAAAAAAAAAAAAAAAA', profile1)
                let profile = Connection + 'images/' + profile1

                //       let profile1 = record1[i].user_profile

                //       let profile =Connection+'CarFinder/'+profile1
                //   console.log("aaaaaaaaaaaaa",profile);

                //       let comment = record1[i].comment
                //       let rating = record1[i].rating







                table.push(<View>
                    {
                        <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.Doctor_Appointment_Profile({ name1: name, profile: profile, category: category, doctor_id: doctor_id, experience: experience, fee: fee, address: address, lat: lat, lng: lng, total_review: total_review, a_r: a_r, license_number: license_number, degree: degree, city: city, c_name:c_name })}
                            style={{ width: width / 1.1, alignSelf: 'center', backgroundColor: 'white', borderRadius: 8, flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginTop: 10, borderWidth: 1, borderColor: '#2C5BA4' }}>
                            {/* <Image source={require('../assets/profile.jpg')} /> */}
                            <ImageLoad
                                style={{ width: 70, height: 70, borderRadius: 12 }}
                                loadingStyle={{ size: 'large', color: 'blue' }}
                                source={{ uri: profile }}
                                borderRadius={12}
                                placeholderStyle={{ width: 70, height: 70, borderRadius: 12 }}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>{name}</Text>
                                <Text style={{ color: 'gray', fontSize: 13, fontWeight: '400' }}>{city}</Text>

                                {/* <Text style={{ color: 'gray', fontSize: 13, fontWeight: '400' }}>{category}</Text> */}

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <Icon name="star" type="AntDesign" style={{ color: "gold", fontSize: 13 }} />
                                    <Text style={{ color: 'black', fontSize: 13, fontWeight: '400' }}> {a_r}   {total_review} {this.props.Reviews}</Text>
                                </View>
                            </View>
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






    Serach_doctor = (val) => {
        this.setState({ skalton: true })


        let uploaddata = new FormData();




        this.setState({ spinner: true });
        console.log('name', val);
        let name1 = val['name']
        console.log('name1name1name1name1', name1);
        console.log('statestatestatestate', this.props.state1);


        // console.log('s_id',this.props.s_id);
        // console.log('rating',this.state.user_rating);
        // console.log('comment',this.state.comment);

        //  console.log("eamilllllllllll =>",newImage)
        uploaddata.append('name', name1);
        uploaddata.append('state', this.props.state1);

        //  uploaddata.append('s_id',this.props.s_id);
        //  uploaddata.append('rating',this.state.user_rating);
        //  uploaddata.append('comment',this.state.comment);


        let api = Connection + 'rest_apis.php?action=search_doctor1';
        console.log("pass => ", api)
        fetch(api, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
                "otherHeader": "foo",
            },
            body: uploaddata,
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log("response", response.response)

                let record = response.response;

                if (record != 'fail') {
                    this.setState({
                        data1: record,
                        skalton: false
                    })

                }

                else {
                    // setTimeout(()=>{
                    //   this.setState({
                    //     spinner:false
                    //   })
                    // //  Actions.LoginScreen()
                    // },100)

                    this.setState({
                        data1: [],
                        skalton: false


                    })
                }

            })
            .catch((error) => {
                console.error(error);
            });

    }




    render() {


        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: 'white' }}>
                    <Icon onPress={() => { Actions.pop() }} name="keyboard-arrow-left" type="MaterialIcons" style={{ color: "black", fontSize: 33 }} />
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{this.props.state1}</Text>
                    <Text>       </Text>
                </View>

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15, paddingLeft: 10 }}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.changebtn("text1", 'All')}  >
                            <View style={(this.state.text1 == 1 ? styles.in_active_button : styles.active_button)}>
                                <Text style={(this.state.text1 == 1 ? styles.in_active_text : styles.active_text)}>All</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.changebtn("text2", 'Telephone conversation')}  >
                            <View style={(this.state.text2 == 1 ? styles.in_active_button : styles.active_button)}>
                                <Text style={(this.state.text2 == 1 ? styles.in_active_text : styles.active_text)}>Telephone conversation</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.changebtn("text3", 'Text conversation')}  >
                            <View style={(this.state.text3 == 1 ? styles.in_active_button : styles.active_button)}>
                                <Text style={(this.state.text3 == 1 ? styles.in_active_text : styles.active_text)}>Text conversation</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.changebtn("text4", 'Actual Visit')}  >
                            <View style={(this.state.text4 == 1 ? styles.in_active_button : styles.active_button)}>
                                <Text style={(this.state.text4 == 1 ? styles.in_active_text : styles.active_text)}>Actual Visit</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.changebtn("text5", 'Phone Call')}  >
                            <View style={(this.state.text5 == 1 ? styles.in_active_button : styles.active_button)}>
                                <Text style={(this.state.text5 == 1 ? styles.in_active_text : styles.active_text)}>Phone Call</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.changebtn("text6", 'Vedio Call')}  >
                            <View style={(this.state.text6 == 1 ? styles.in_active_button : styles.active_button)}>
                                <Text style={(this.state.text6 == 1 ? styles.in_active_text : styles.active_text)}>Vedio Call</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View> */}

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginBottom: 10, marginTop: 15 }}>
                    <View>
                        <TextInput style={{ width: width / 1.3, color: 'black', borderWidth: 0.7, borderColor: 'gray', borderRadius: 5, height: 40, paddingLeft: 30 }} placeholder={this.props.Search_for} placeholderTextColor='gray' onChangeText={name => this.Serach_doctor({ name })} />
                        <Icon name="search1" type="AntDesign" style={{ color: "gray", fontSize: 15, position: 'absolute', top: 12, left: 8 }} />
                    </View>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.Map_Screen({ user_c_lat: this.state.lat, user_c_lng: this.state.lng, category: this.props.category, })}
                        style={{ height: 36, width: 36, borderRadius: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 0.7, borderColor: 'gray' }}>
                        <Icon name="google-maps" type="MaterialCommunityIcons" style={{ color: "#0192fc", fontSize: 20 }} />
                    </TouchableOpacity>
                </View>


                {this.state.skalton == true ?


                    <SkeletonPlaceholder>
                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 130,
                                borderRadius: 12,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 30,
                                backgroundColor: 'white'
                            }}
                        ></View>

                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 130,
                                borderRadius: 12,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 30,
                                backgroundColor: "white",
                            }}
                        ></View>


                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 130,
                                borderRadius: 12,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 30,
                                backgroundColor: "white",
                            }}
                        ></View>



                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 130,
                                borderRadius: 12,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 30,
                                backgroundColor: "white",
                            }}
                        ></View>


                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 130,
                                borderRadius: 12,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 30,
                                backgroundColor: "white",
                            }}
                        ></View>

                    </SkeletonPlaceholder>
                    :
                    <View>

                        {this.state.data1 == "" ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', height: height / 2 }}>
                                <Text style={{}}>
                                    {this.props.No_doctor_found_of_this_category}
                                </Text>
                            </View>
                            :
                            <View style={{ paddingBottom: 20 }}>
                                {this.createtable1()}
                            </View>
                        }

                    </View>
                }
            </View>

        )
    }
}


const styles = StyleSheet.create({

    active_button: {
        paddingHorizontal: 20, paddingVertical: 8, borderRadius: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0192fc', marginRight: 10
    },
    in_active_button: {
        paddingHorizontal: 20, paddingVertical: 8, borderRadius: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eeeeee', marginRight: 10
    },


    active_text: {
        color: 'white', fontSize: 13, fontWeight: 'bold'
    },
    in_active_text: {
        color: 'gray', fontSize: 13, fontWeight: 'bold'
    },

})


const mapStateToProps = (state) => {
    return {
        Reviews: state.Reviews,
        Search_for: state.Search_for,
        No_doctor_found_of_this_category: state.No_doctor_found_of_this_category,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
        spanish_lang: (Reviews, Search_for, No_doctor_found_of_this_category) => { dispatch({ type: "spanish_lang", payload: Reviews, Search_for, No_doctor_found_of_this_category }) },
        english_lang: (Reviews, Search_for, No_doctor_found_of_this_category) => { dispatch({ type: "english_lang", payload: Reviews, Search_for, No_doctor_found_of_this_category }) },
        add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
        // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
        // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
        // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Doctor_By_Category);