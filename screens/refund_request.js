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
    AsyncStorage,
    BackHandler,
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Connection from "../connection";
import { connect } from "react-redux";
import Toast from 'react-native-simple-toast';
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

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
 

  class Chose_Category extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            data1: [],
      gallrey_di_image: null,
      spinner:false,
      name:'',
      amount:'',
      account_no:'',
      id:'',
      refund_fee:''

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
    let refund_fee = Number(this.props.fee)-Number(3)

        let user = await AsyncStorage.getItem('customer');


        let parsed = JSON.parse(user);

        let id = parsed[0].id;
        let name = parsed[0].name;

        let profile1 = parsed[0].profile;
        // let profile1 = Connection+'images/'+profile
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', profile1)

        this.setState({

            id: id,
            profile1: profile1,
            doctor_name:name,
            amount:this.props.total,
            refund_fee:refund_fee



        })
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        // this.get_categories()
    }


 

confirm=()=>{
    if(this.state.gallrey_di_image==null)
    {
        alert(this.props.Please_upload_receipt_before_moving_next)
    }
    else {
        Actions.bank_payment_2({ bank_name: this.props.bank_name,account_no:this.props.account_no,doctor_name: this.props.doctor_name, card_no: this.state.cardnumber, name1: this.state.name, doctor_name: this.props.doctor_name, amount: this.props.amount, time: this.props.time, category: this.props.category, date: this.props.date, day: this.props.day, doctor_id: this.props.doctor_id, appointment_price: this.props.appointment_price, appointment_type: this.props.appointment_type, total_fee: this.props.total_fee, s_currency: this.props.s_currency, discount: this.props.discount,recipt:this.state.gallrey_di_image}) 

    }
}
 


add_refund = () => {

  

    // this.setState({ spinner: true, visible: false })
    let uploaddata = new FormData();

    uploaddata.append("user_id", this.state.id);
    uploaddata.append("appointment_id", this.props.appointment_id);
    uploaddata.append("refund_fee", this.state.refund_fee);
    uploaddata.append("reason", this.state.cancel_reason);
    uploaddata.append("fee", this.props.fee);
    uploaddata.append("doctor_id", this.props.doctor_id);




    let api = Connection + "rest_apis.php?action=add_refund";
    console.log("pass => ", api);
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

        if (response.response == "fail") {
          this.setState({
            spinner: false,
          });
          alert(this.props.Something_went_wrong);
        } else {

        


        
       



        }
      })
      .catch((error) => {
        console.error(error);
      });

  };


 
add_payout_request = () => {

    let name = this.state.name;
    let amount = this.state.amount;
    let account_no = this.state.account_no;
 


    if (name == "") {
        alert("Please enter your bank name.");
      }
      else if (account_no == "") {
        alert("Please enter your account no.");
      }
      
    
else {




     this.setState({ spinner: true,  })
     let uploaddata = new FormData();

     uploaddata.append("user_id", this.state.id);
     uploaddata.append("appointment_id", this.props.appointment_id);
     uploaddata.append("refund_fee", this.state.refund_fee);
     uploaddata.append("reason", this.props.cancel_reason);
     uploaddata.append("fee", this.props.fee);
     uploaddata.append("doctor_id", this.props.doctor_id);
     uploaddata.append("bank_name", this.state.name);
     uploaddata.append("account_no", this.state.account_no);

 
 
 
 
     let api = Connection + "rest_apis.php?action=add_refund";
     console.log("pass => ", api);
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
 
         if (response.response == "fail") {
           this.setState({
             spinner: false,
           });
           alert(this.props.Something_went_wrong);
         } else {
 
            this.setState({
                spinner: false,
              });
              Actions.pop()
 
 
         
        
 
 
 
         }
       })
       .catch((error) => {
         console.error(error);
       });
    }
  };






    render() {


        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: 'white' }}>
                    <Icon onPress={() => Actions.pop()} name="chevron-left" type="Entypo" style={{ color: "#1B2E59", fontSize: 20 }} />
                    <Text style={{ color: 'black', fontSize: 15, fontWeight: '700' }}>Refund Request</Text>
                    <Text>       </Text>
                </View>
<ScrollView>
                <Text style={{ fontSize: 16,   color: 'gray', paddingHorizontal: 15, marginTop: 10 }}>Amount for Refund</Text>

                <Text style={{ color: 'black', paddingHorizontal: 17, fontSize: 16,fontWeight:'bold' }}>${this.state.refund_fee}</Text>

              
                <Text style={{     color: 'gray', paddingHorizontal: 15, marginTop: 10 ,marginBottom: 10,}}>Please enter your corect information for refund request</Text>


<Text style={{ color: 'black', fontSize: 13, paddingHorizontal: 15, marginTop: 10,fontWeight:'bold' }}>Bank Name</Text>

<TextInput
  placeholder="Enter bank name"
  style={styles.phoneinput}
  autoCapitalize="none"
  // autoCorrect={false}
  autoCompleteType="email"
  color="black"
  placeholderTextColor='black'
  onChangeText={name => this.setState({ name })}
//   value={this.props.name1}
/>
{/* <Text style={{ color: 'black', fontSize: 13, paddingHorizontal: 15, marginTop: 20,fontWeight:'bold' }}>Upload photo of recepit</Text> */}
 


<Text style={{ color: 'black', fontSize: 13, paddingHorizontal: 15, marginTop: 10,fontWeight:'bold' }}>Account Number</Text>

<TextInput
  placeholder="Enter Your Account number"
  style={styles.phoneinput}
  autoCapitalize="none"
  // autoCorrect={false}
  autoCompleteType="email"
  color="black"
  placeholderTextColor='black'
  onChangeText={account_no => this.setState({ account_no })}
//   value={this.state.final_date_1}
/>

 
<TouchableOpacity activeOpacity={0.8} onPress={() => { this.add_payout_request() }}

style={{ width: width / 1.1, borderRadius: 10, backgroundColor: '#24C6D2', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingVertical: 10, marginVertical: 30 }}>
<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Submit</Text>

</TouchableOpacity>
</ScrollView>
 
          {this.state.spinner == true &&
          <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(2, 2, 2, 0.8)', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              width: width / 1.2, height: height / 9 - 20, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
              borderRadius: 6
            }}>
              <UIActivityIndicator color='#24C6D2' />
              <Text style={{ fontSize: 16, color: '#24C6D2', fontWeight: 'bold' }}>Progressing your request</Text>
            </View>
          </View>
        }
            </View>

        )
    }
}


const styles = StyleSheet.create({


    phoneinput: {
      fontSize: 14,
      borderColor: '#24C6D2',
      borderWidth: 1,
      alignSelf: 'center',
      height: 45,
      width: "94%",
      alignSelf: 'center',
      borderRadius:8,
      marginTop:10,
      paddingLeft:10
    },
  
    phoneinput2: {
      fontSize: 13,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.7,
      alignSelf: 'center',
      height: 38,
      width: width / 2.3,
      alignSelf: 'center',
  
    },
    phoneinput_date: {
      fontSize: 16,
      width: '95%',
      backgroundColor: 'white',
      borderBottomWidth: 0.5,
      paddingHorizontal: 10,
  
      alignSelf: 'center',
      paddingVertical: 5,
  
      borderBottomColor: 'gray',
  
      marginLeft: 6,
      marginTop: 5
    },
  })

const mapStateToProps = (state) => {
    return {
      Consult_a_Doctor: state.Consult_a_Doctor,
      Select_Category: state.Select_Category,
      Let_us_know_which_category: state.Let_us_know_which_category,
      All_Doctors: state.All_Doctors,
      Please_upload_receipt_before_moving_next: state.Please_upload_receipt_before_moving_next,
      Please_enter_your_bank_name: state.Please_enter_your_bank_name,
      Please_enter_your_account_no: state.Please_enter_your_account_no,
      Please_enter_your_amount: state.Please_enter_your_amount,
      Something_went_wrong_try_agin_later: state.Something_went_wrong_try_agin_later,
      You_successfully_requested_payout: state.You_successfully_requested_payout,
      Payout_Request: state.Payout_Request,
      Total_Amount: state.Total_Amount,
      Please_enter_correct_information_payout_request: state.Please_enter_correct_information_payout_request,
      Bank_Name: state.Bank_Name,
      Enter_bank_name: state.Enter_bank_name,
      Account_Number: state.Account_Number,
      Enter_Your_Account_number: state.Enter_Your_Account_number,
      Amount: state.Amount,
      Enter_amount: state.Enter_amount,
      Submit: state.Submit,
      Progressing_your_request: state.Progressing_your_request,
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
      spanish_lang: (Consult_a_Doctor,Select_Category,Let_us_know_which_category,All_Doctors,Please_upload_receipt_before_moving_next,Please_enter_your_bank_name,Please_enter_your_account_no,Please_enter_your_amount,You_successfully_requested_payout,Payout_Request,Total_Amount,Please_enter_correct_information_payout_request,Bank_Name,Enter_bank_name,Account_Number,Enter_Your_Account_number,Amount,Enter_amount,Submit,Progressing_your_request,Something_went_wrong_try_agin_later) => { dispatch({ type: "spanish_lang", payload: Consult_a_Doctor,Select_Category,Let_us_know_which_category,All_Doctors,Please_upload_receipt_before_moving_next,Please_enter_your_bank_name,Please_enter_your_account_no,Please_enter_your_amount,You_successfully_requested_payout,Payout_Request,Total_Amount,Please_enter_correct_information_payout_request,Bank_Name,Enter_bank_name,Account_Number,Enter_Your_Account_number,Amount,Enter_amount,Submit,Progressing_your_request,Something_went_wrong_try_agin_later})},
      english_lang: (Consult_a_Doctor,Select_Category,Let_us_know_which_category,All_Doctors,Please_upload_receipt_before_moving_next,Please_enter_your_bank_name,Please_enter_your_account_no,Please_enter_your_amount,You_successfully_requested_payout,Payout_Request,Total_Amount,Please_enter_correct_information_payout_request,Bank_Name,Enter_bank_name,Account_Number,Enter_Your_Account_number,Amount,Enter_amount,Submit,Progressing_your_request,Something_went_wrong_try_agin_later) => { dispatch({ type: "english_lang", payload: Consult_a_Doctor,Select_Category,Let_us_know_which_category,All_Doctors,Please_upload_receipt_before_moving_next,Please_enter_your_bank_name,Please_enter_your_account_no,Please_enter_your_amount,You_successfully_requested_payout,Payout_Request,Total_Amount,Please_enter_correct_information_payout_request,Bank_Name,Enter_bank_name,Account_Number,Enter_Your_Account_number,Amount,Enter_amount,Submit,Progressing_your_request,Something_went_wrong_try_agin_later})},
      add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
      // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
      // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
      // addservice:(service)=>{dispatch({type:"addservice",payload:service})},
    }
  }
  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Chose_Category);