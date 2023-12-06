 
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
    Pressable,
    Dimensions,
    BackHandler,
    AsyncStorage,
    KeyboardAvoidingView
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Connection from "../connection";
import { connect } from 'react-redux';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

 
  class Doctor_Wallet extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            total_balance: 0,
            data: [],
            skalton:true,
            check_design:'Appointment',
            text1: 2,
            text2: 1,
            text3: 1,
            data1:[],
            data2:[]
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

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );

        let user = await AsyncStorage.getItem("customer");
        // console.log(user);
        let parsed = JSON.parse(user);
        let id = parsed[0].id;
        let name = parsed[0].name;
        let currency = parsed[0].currency;
        console.log('jjjjjjjjjjjjj', currency)
        if (currency == 'USD') {
            this.setState({
                s_currency: '$'
            })

        }
        else {
            this.setState({
                s_currency: 'Br'
            })
        }
        console.log("wwwwwwwwwwwwwwwwwwwwwwwwwww", name);
        // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww',payment_ride_price);

        this.setState({
            name: name,
            id: id,
        });
        this.display_all_refunds()
        
    }



 



    display_all_refunds = () => {

        let uploaddata = new FormData();
      
      console.log('KKKKKKKKKKKLKLKLKL',this.state.id)
        uploaddata.append("id", this.state.id);
       
      
      
        let api = Connection + "rest_apis.php?action=display_all_refunds";
         console.log('pass => ', api)
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
             console.log('11111111111111111111', response.response);
      
            let record = response.response;
            let len = record.length;
            // console.log('rrrrrrrrrrrrrrreeeeeeeeeeeecccccccooord', record);
      
            if (record !== "fail") {
                for (let i = 0; i < len; i++) {

                    // let payment = record[i].payment
                    // let payment_method = record[i].payment_method
                    // let tax = record[i].tax
                    // let date = record[i].date
                    // let ride_id = record[i].id

                    this.setState({
                        data: record,
                        skalton:false
                    });
                    // console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', this.state.data);
                }
            }
            this.setState({
            
                skalton:false
            });
          })
          .catch((error) => {
            console.error(error);
          });
      };






      createtable2 = () => {
        let table = [];
        // let len = this.state.campaignlist.length;
        // let hasRecord = this.state.campaignlist;
        let record = this.state.data;
        // console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTt',record)

        let len = record.length;
        //console.log(hasRecord[0])
        if (record != "fail") {
            for (let i = 0; i < len; i++) {
                let appointment_id = record[i].appointment_id;
          

                let total_fee = record[i].total_fee;
                let reason = record[i].reason;
                let r_amount = record[i].r_amount;
                let date = record[i].date;
                let status = record[i].status;

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
                                        Appointment Id   : {appointment_id}
                                        </Text>
                                     
           {status=='pending'?
                                        <Text style={{ fontSize: 12, color: "red" }}>{status}</Text>
                                        :
                                        <Text style={{ fontSize: 12, color: "green" }}>{status}</Text>
                                    }
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginTop: 10,
                                        }}
                                    >
                                        <Text numberOfLines={2} style={{ fontSize: 12, color: "gray", width: "78%" }}>
                                         Cancel Reason: {reason}
                                        </Text>
                                        <Text style={{ fontSize: 14 }}>${total_fee}</Text>
                                        <Icon name="money-bill-wave" type="FontAwesome5" style={{ color: "#24AE34", fontSize: 14 }} />
                                      
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
                                        Refund Amount
                                        </Text>
                                        <Text style={{ fontSize: 14 }}>${r_amount}</Text>
                                        <Icon name="money-bill-wave" type="FontAwesome5" style={{ color: "#24AE34", fontSize: 14 }} />

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


 
    
  changebtn(value, val) {
      
    // if(val=='Wallet'){
    //   this.Display_User_Wallet_requested()
    // }
        if (this.state[value] == 2) {
    
    
    
            this.setState({
                text1: 1,
                text2: 1,
                text3: 1,
    
    
                [value]: 2,
    
    
            })
        }
        else {
            this.setState({
                text1: 1,
                text2: 1,
                text3: 1,
    
                [value]: 2,
    
    
            })
    
        }
        this.setState({
            check_design: val,
             
        })
    }
    
    payout_request1=()=>{
        if(this.state.balance<100){
            alert(this.props.You_have_payout_request)
        }
        else {
            Actions.payout_request({ total:this.state.balance})
        }
    }

    render() {


        return (

            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
            style={{flex:1}}>

            
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: 'white' }}>
                    <Icon onPress={() => Actions.pop()} name="chevron-left" type="Entypo" style={{ color: "#1B2E59", fontSize: 20 }} />
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '700' }}>All Refunds</Text>
                    <Text>       </Text>
                </View>

           
 
                <View style={{ paddingHorizontal: 15, paddingVertical: 12, backgroundColor: '#efefef' }}>
                    <Text style={{ color: 'black', fontSize: 11, fontWeight: '600' }}>Refund History</Text>
                </View>

 
             
                {this.state.skalton == true ?
             <SkeletonPlaceholder>

             <View style={{paddingVertical: 10,paddingHorizontal:15}}>
               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                  <View style={{width:110,height:17,borderRadius:10}}></View>
                  <View style={{width:100,height:15,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>
             </View>
             <View style={{width:width/1.1,alignSelf:'center',height:3,borderRadius:5,marginTop:2}}></View>



             <View style={{paddingVertical: 10,paddingHorizontal:15}}>
               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                  <View style={{width:110,height:17,borderRadius:10}}></View>
                  <View style={{width:100,height:15,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>
             </View>
             <View style={{width:width/1.1,alignSelf:'center',height:3,borderRadius:5,marginTop:2}}></View>



             <View style={{paddingVertical: 10,paddingHorizontal:15}}>
               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                  <View style={{width:110,height:17,borderRadius:10}}></View>
                  <View style={{width:100,height:15,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>
             </View>
             <View style={{width:width/1.1,alignSelf:'center',height:3,borderRadius:5,marginTop:2}}></View>



             <View style={{paddingVertical: 10,paddingHorizontal:15}}>
               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                  <View style={{width:110,height:17,borderRadius:10}}></View>
                  <View style={{width:100,height:15,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>
             </View>
             <View style={{width:width/1.1,alignSelf:'center',height:3,borderRadius:5,marginTop:2}}></View>



             <View style={{paddingVertical: 10,paddingHorizontal:15}}>
               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                  <View style={{width:110,height:17,borderRadius:10}}></View>
                  <View style={{width:100,height:15,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>
             </View>
             <View style={{width:width/1.1,alignSelf:'center',height:3,borderRadius:5,marginTop:2}}></View>



             <View style={{paddingVertical: 10,paddingHorizontal:15}}>
               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                  <View style={{width:110,height:17,borderRadius:10}}></View>
                  <View style={{width:100,height:15,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>
             </View>
             <View style={{width:width/1.1,alignSelf:'center',height:3,borderRadius:5,marginTop:2}}></View>


             <View style={{paddingVertical: 10,paddingHorizontal:15}}>
               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                  <View style={{width:110,height:17,borderRadius:10}}></View>
                  <View style={{width:100,height:15,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>

               <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between",marginTop: 10,}}>
                   <View style={{width:90,height:15,borderRadius:10}}></View>
                   <View style={{width:70,height:17,borderRadius:10}}></View>
               </View>
             </View>
             <View style={{width:width/1.1,alignSelf:'center',height:3,borderRadius:5,marginTop:2,marginBottom:25}}></View>
        </SkeletonPlaceholder>
:
<ScrollView>
                {this.state.data != "" ?
 
                    <View style={{ paddingHorizontal: 15 , paddingBottom:20,marginBottom:25}}>
                        {this.createtable2()}
                    </View>

                    :
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: width / 1, height: height / 1.5, backgroundColor: 'white' }}>
                        <Image style={{ width: width / 2, height: height / 5, borderRadius: 100 }} source={require('../assets/wallet.png')} />
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: '600', maxWidth: '60%', textAlign: 'center', marginTop: 10 }}>No Data Available</Text>
                        <Text style={{ color: 'black', fontSize: 12, fontWeight: '400', maxWidth: '80%', textAlign: 'center', marginTop: 5 }}>{this.props.Once_you_add_money}</Text>
                    </View>
                }
                </ScrollView>
    }
 
 
  
  
            </View>
            </KeyboardAvoidingView>
        )
    }
}






const styles = StyleSheet.create({


    four: {
        width: width / 1.1,
        backgroundColor: 'white',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
        paddingVertical: 15
  
    },
  
    image: {
        width: 60,
        height: 60,
        borderRadius: 15,
        borderWidth:3,
                              borderColor:'#874DAF'
  
    },
  
  
  
    active_button: {
       paddingVertical: 12,
       paddingHorizontal: 12,
        borderBottomColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1
      
    },
  
    in_active_button: {
      paddingHorizontal: 12, paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
  
    active_text: {
        color: 'black',
        fontSize:12,
        textAlign:'center'
    },
  
    in_active_text: {
        color: 'gray',
        fontSize:12,
        textAlign:'center'
  
    },
  
  
  
  })
  

const mapStateToProps = (state) => {
    return {
      Appointment_Id: state.Appointment_Id,
      Wallet: state.Wallet,
      transcation_history: state.transcation_history,
      Recharge_your_wallet_to_create_booking: state.Recharge_your_wallet_to_create_booking,
      Once_you_add_money: state.Once_you_add_money,
      Booking_Fee: state.Booking_Fee,
      Consult_Id:state.Consult_Id,

      You_have_payout_request:state.You_have_payout_request,
      Appointments_Transaction_Hostory:state.Appointments_Transaction_Hostory,
      Payoutss_Transaction_History:state.Payoutss_Transaction_History,
      Available_balance:state.Available_balance,
      Add_Payout:state.Add_Payout,
      You_dont_have_payout_request:state.You_dont_have_payout_request,

      Refunds:state.Refunds,
      Refunds_History:state.Refunds_History,
      Reason:state.Reason,
      Refund_Amount:state.Refund_Amount,

            

      
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
      spanish_lang: (Refund_Amount,Reason,Refunds_History,Refunds,Consult_Id,Appointment_Id,Wallet,transcation_history,Recharge_your_wallet_to_create_booking,Once_you_add_money,Booking_Fee,You_have_payout_request,Appointments_Transaction_Hostory,Payoutss_Transaction_History,Available_balance,Add_Payout,You_dont_have_payout_request) => { dispatch({ type: "spanish_lang", payload: Refund_Amount,Reason,Refunds_History,Refunds,Consult_Id,Appointment_Id,Wallet,transcation_history,Recharge_your_wallet_to_create_booking,Once_you_add_money,Booking_Fee,You_have_payout_request,Appointments_Transaction_Hostory,Payoutss_Transaction_History,Available_balance,Add_Payout,You_dont_have_payout_request})},
      english_lang: (Refund_Amount,Reason,Refunds_History,Refunds,Consult_Id,Appointment_Id,Wallet,transcation_history,Recharge_your_wallet_to_create_booking,Once_you_add_money,Booking_Fee,You_have_payout_request,Appointments_Transaction_Hostory,Payoutss_Transaction_History,Available_balance,Add_Payout,You_dont_have_payout_request) => { dispatch({ type: "english_lang", payload: Refund_Amount,Reason,Refunds_History,Refunds,Consult_Id,Appointment_Id,Wallet,transcation_history,Recharge_your_wallet_to_create_booking,Once_you_add_money,Booking_Fee,You_have_payout_request,Appointments_Transaction_Hostory,Payoutss_Transaction_History,Available_balance,Add_Payout,You_dont_have_payout_request})},
      add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
      // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
      // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
      // addservice:(service)=>{dispatch({type:"addservice",payload:service})},
    }
  }
  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Doctor_Wallet);