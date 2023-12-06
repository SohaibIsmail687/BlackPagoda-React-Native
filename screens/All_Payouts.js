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
    Pressable,
    AsyncStorage,
    PermissionsAndroid
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Connection from "../connection";
import { connect } from "react-redux";
import ImageLoad from 'react-native-image-placeholder';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import moment from 'moment';


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class doc_notification extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            skalton: true,
            data1: []

        }
    }



    backAction = () => {
        Actions.pop()
        return true;
    };


    componentWillUnmount() {
        this.backHandler.remove();
    }


    componentDidMount = async () => {

        let aa = moment(new Date()).format("YYYY-MM-DD hh:mm A");
        console.log('QQQQQQQQQQQQ,AA', aa)
        let split = aa.split(' ')
        let date = split[0]

        let time = split[1]
        let am_pm = split[2]
        let final_time = time + "" + am_pm

        this.setState({
            time: final_time,
            date: date
        })

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

        let user = await AsyncStorage.getItem('customer');
        let parsed = JSON.parse(user);
        let id = parsed[0].id;
        this.setState({

            id: id,

        })
        this.get_appointments_user(this.state.check_design)

    }


    get_appointments_user = (val) => {

        let uploaddata = new FormData();
        this.setState({
            skalton: true
        })
        uploaddata.append("id", this.state.id);
       
        let api = Connection + "rest_apis.php?action=Display_Doctor_payouts";
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

                let record4 = response.response

                if (record4 != 'fail') {

                    this.setState({
                        data1: record4,
                        skalton: false
                    })

                } else {
                    this.setState({
                        data1: [],
                        
                    skalton: false
                    })
                }

                 
            })
            .catch((error) => {
                console.error(error);
            });

    };


    createtable1 = () => {
        let table = [];
        // let len = this.state.campaignlist.length;
        // let hasRecord = this.state.campaignlist;
        let record = this.state.data1;
        // console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTt',record)

        let len = record.length;
        //console.log(hasRecord[0])
        if (record != "fail") {
            for (let i = 0; i < len; i++) {
                let id = record[i].id;

                let amount = record[i].amount;
                let bank_name = record[i].babk_name;
                let account_no = record[i].acc_no;
                let currency = record[i].currency;
                let status = record[i].status;


                let date = record[i].date;
                let ss = date.split(" ");
                let date_1 = ss[0];
                let time_1 = ss[1];

                let xx = date_1;
                let qq = new Date(xx).toString();
                //  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',qq)
                let ddd = qq.split(" ");
                let dd_1 = ddd[1];
                let dd_2 = ddd[2];
                let dd_3 = ddd[3];
                let final_date = dd_1 + " " + dd_2 + " " + dd_3;

                // console.log('vvvvvvvvvvvvvvvvvvvvvvvvvv',ride_id)

                table.push(
                    <View>
                        {
                            <View>
                                <View
                                    style={{
                                        borderBottomColor: "gray",
                                        borderBottomWidth: 1,
                                        paddingVertical: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginTop: 10,
                                        }}
                                    >
                                        <Text style={{ fontSize: 14 }}>
                                         Payout Id  : {id}
                                        </Text>
                                        <Text style={{ fontSize: 12, color: "gray" }}>
                                            {final_date}{" "}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginTop: 10,
                                        }}
                                    >
                                        <Text style={{ fontSize: 12, color: "gray", width: "78%" }}>
                                            {account_no}
                                        </Text>
                                        <Text style={{ fontSize: 14 }}>${amount}</Text>
                                        <Icon name="money-bill-wave" type="FontAwesome5" style={{ color: "#24AE34", fontSize: 14 }} />

                                        {/* <FontAwesome5
                                            name="money-bill-wave"
                                            size={14}
                                            color="#24AE34"
                                        /> */}
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginTop: 10,
                                        }}
                                    >
                                        <Text style={{ fontSize: 12, color: "gray", width: "78%" }}>
                                            Payout Status
                                        </Text>
                                        {status=='pending'?
                                        <Text style={{ fontSize: 14 , color:'red',fontWeight:'bold'}}>{status}</Text>
                                        :
                                        <Text style={{ fontSize: 14 , color:'green',fontWeight:'bold'}}>{status}</Text>
                                    }
                                        {/* <Icon name="money-bill-wave" type="FontAwesome5" style={{ color: "#24AE34", fontSize: 14 }} /> */}
                                        {/* 
                                        <FontAwesome5
                                            name="money-bill-wave"
                                            size={14}
                                            color="#24AE34"
                                        /> */}
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                );
            }
            return table;
        } else {
            let img = [];
            img.push(
                <View style={{ flex: 1, justifyContent: "center" }}>
                    {<View></View>}
                </View>
            );
            return img;
        }
    };





    render() {


        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, backgroundColor: '#24C6D2', paddingHorizontal: 15, }}>
                    <Icon onPress={() => Actions.pop()} name="arrow-back" type="MaterialIcons" style={{ color: "white", fontSize: 24 }} />


                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>Requested Payouts</Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', }}>    </Text>

                </View>

                {this.state.skalton == true ?


                    <SkeletonPlaceholder>
                        <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e4f5e4' }}></View>

                                    <View style={{ marginLeft: 10 }}>
                                        <View style={{ width: 130, height: 16, borderRadius: 8 }}></View>
                                        <View style={{ width: 90, height: 13, borderRadius: 8, marginTop: 3 }}></View>
                                    </View>
                                </View>

                                <View style={{ width: 50, height: 26, borderRadius: 8 }}></View>
                            </View>

                            <View style={{ width: width / 1.1, marginTop: 10, height: 40, borderRadius: 10 }}></View>
                        </View>


                        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e4f5e4' }}></View>

                                    <View style={{ marginLeft: 10 }}>
                                        <View style={{ width: 130, height: 16, borderRadius: 8 }}></View>
                                        <View style={{ width: 90, height: 13, borderRadius: 8, marginTop: 3 }}></View>
                                    </View>
                                </View>

                                <View style={{ width: 50, height: 26, borderRadius: 8 }}></View>
                            </View>

                            <View style={{ width: width / 1.1, marginTop: 10, height: 40, borderRadius: 10 }}></View>
                        </View>



                        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e4f5e4' }}></View>

                                    <View style={{ marginLeft: 10 }}>
                                        <View style={{ width: 130, height: 16, borderRadius: 8 }}></View>
                                        <View style={{ width: 90, height: 13, borderRadius: 8, marginTop: 3 }}></View>
                                    </View>
                                </View>

                                <View style={{ width: 50, height: 26, borderRadius: 8 }}></View>
                            </View>

                            <View style={{ width: width / 1.1, marginTop: 10, height: 40, borderRadius: 10 }}></View>
                        </View>


                        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e4f5e4' }}></View>

                                    <View style={{ marginLeft: 10 }}>
                                        <View style={{ width: 130, height: 16, borderRadius: 8 }}></View>
                                        <View style={{ width: 90, height: 13, borderRadius: 8, marginTop: 3 }}></View>
                                    </View>
                                </View>

                                <View style={{ width: 50, height: 26, borderRadius: 8 }}></View>
                            </View>

                            <View style={{ width: width / 1.1, marginTop: 10, height: 40, borderRadius: 10 }}></View>
                        </View>


                        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e4f5e4' }}></View>

                                    <View style={{ marginLeft: 10 }}>
                                        <View style={{ width: 130, height: 16, borderRadius: 8 }}></View>
                                        <View style={{ width: 90, height: 13, borderRadius: 8, marginTop: 3 }}></View>
                                    </View>
                                </View>

                                <View style={{ width: 50, height: 26, borderRadius: 8 }}></View>
                            </View>

                            <View style={{ width: width / 1.1, marginTop: 10, height: 40, borderRadius: 10 }}></View>
                        </View>


                        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e4f5e4' }}></View>

                                    <View style={{ marginLeft: 10 }}>
                                        <View style={{ width: 130, height: 16, borderRadius: 8 }}></View>
                                        <View style={{ width: 90, height: 13, borderRadius: 8, marginTop: 3 }}></View>
                                    </View>
                                </View>

                                <View style={{ width: 50, height: 26, borderRadius: 8 }}></View>
                            </View>

                            <View style={{ width: width / 1.1, marginTop: 10, height: 40, borderRadius: 10 }}></View>
                        </View>


                        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e4f5e4' }}></View>

                                    <View style={{ marginLeft: 10 }}>
                                        <View style={{ width: 130, height: 16, borderRadius: 8 }}></View>
                                        <View style={{ width: 90, height: 13, borderRadius: 8, marginTop: 3 }}></View>
                                    </View>
                                </View>

                                <View style={{ width: 50, height: 26, borderRadius: 8 }}></View>
                            </View>

                            <View style={{ width: width / 1.1, marginTop: 10, height: 40, borderRadius: 10 }}></View>
                        </View>


                        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e4f5e4' }}></View>

                                    <View style={{ marginLeft: 10 }}>
                                        <View style={{ width: 130, height: 16, borderRadius: 8 }}></View>
                                        <View style={{ width: 90, height: 13, borderRadius: 8, marginTop: 3 }}></View>
                                    </View>
                                </View>

                                <View style={{ width: 50, height: 26, borderRadius: 8 }}></View>
                            </View>

                            <View style={{ width: width / 1.1, marginTop: 10, height: 40, borderRadius: 10 }}></View>
                        </View>
                    </SkeletonPlaceholder>


                    :


                    <ScrollView >
                        {this.state.data1 == "" ?
                            <View>
                                <Image source={require("../assets/No_appointment.png")} style={{ width: width / 1.3, height: height / 3.7, alignSelf: 'center', marginTop: 90, resizeMode: 'contain' }} />
                                <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', marginTop: 30, fontSize: 16 }}>No Requested Payouts .</Text>

                                <Text style={{ color: 'gray', textAlign: 'center', marginTop: 10, fontSize: 13, maxWidth: '78%', alignSelf: 'center' }}>You don't have any payout present at the moment.</Text>
                            </View>
                            :
                            <View style={{ paddingBottom: 20,paddingHorizontal:20 }}>
                                {this.createtable1()}
                            </View>
                        }
                    </ScrollView>
                }

            </View>

        )
    }
}



export default doc_notification; 