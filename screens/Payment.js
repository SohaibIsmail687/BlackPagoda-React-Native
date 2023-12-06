import React, {Component} from 'react';
import {
  StyleSheet,
  Keyboard,
  ScrollView,
  BackHandler,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  AsyncStorage,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Form,
  Container,
  Header,
} from 'native-base';
import {connect} from 'react-redux';
import Connection from '../connection';
import Stripe from 'react-native-stripe-api';
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
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
import moment from 'moment';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Payment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardnumber: '',
      dateshow: false,
      numberstatus: 'incomplete',
      expirystatus: 'incomplete',
      cvcstatus: 'incomplete',
      postalstatus: 'incomplete',
      cardexpiry: '',
      cardcvc: '',
      cardpostal: '',
      timemode: 'AM',
      platformname: '',
      price: this.props.fee,
      username: 'asad',
      card_check: false,
      visible: false,
      visible1: false,
      currency_sign: '',
      // spinner: true,
      Butun_Hide: true,
    };
  }

  componentDidMount = async () => {
    console.log(
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      this.props.s_key,
    );

    // this.get_key()
    // this.get_percentage()
    // let paypal_payment = await AsyncStorage.getItem('paypal_payment');
    // let parsed = JSON.parse(paypal_payment);
    // let payment_ride_id = parsed[0].payment_ride_id;
    // let payment_ride_price = parsed[0].payment_ride_price;
    let user = await AsyncStorage.getItem('customer');
    console.log(user);
    let parsed = JSON.parse(user);
    let id = parsed[0].id;
    let name = parsed[0].name;

    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww', this.props.fee);
    // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww',payment_ride_price);
    console.log(
      'fcm_token,fcm_token,fcm_token,fcm_token',
      this.props.fcm_token,
    );

    this.setState({
      name: name,
    });

    if (this.props.currency_1 == 'EUR') {
      this.setState({
        currency_sign: '€',
      });
    } else {
      this.setState({
        currency_sign: '$',
      });
    }
  };

  _onCreditCardChanged = result => {
    console.log('aa', result);
    let numberstatus = result.status.number;
    let expirystatus = result.status.expiry;
    let cvcstatus = result.status.cvc;
    let postalstatus = result.status.postalCode;

    let number = result.values.number;
    let expiry = result.values.expiry;
    let cvc = result.values.cvc;
    let postalCode = result.values.postalCode;

    this.setState({
      numberstatus: numberstatus,
      expirystatus: expirystatus,
      postalstatus: postalstatus,
      cvcstatus: cvcstatus,
      cardnumber: number,
      cardexpiry: expiry,
      cardcvc: cvc,
      cardpostal: postalCode,
      card_check: true,
    });

    if (result.values.expiry !== 'incomplete') {
      let number = this.state.cardnumber;
      let expiry = this.state.cardexpiry;
      console.log(number);
      console.log(number.replace(/ /g, ''));
      console.log(expiry.replace(/\\|\//g, ''));
      let check = expiry.split('/');
      console.log(expiry);
    }
  };

  request() {
    let cardnumber = this.state.cardnumber;
    let fcardnumber = cardnumber.replace(/ /g, '');
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', fcardnumber);
    let cardexpiry = this.state.cardexpiry;
    let fcardexpiry = cardexpiry.split('/');
    let month = fcardexpiry[0];
    let year = fcardexpiry[1];
    console.log(month);
    let cvc = this.state.cardcvc;
    let postal = this.state.cardpostal;

    console.log('11111111111111111', this.state.cvcstatus);

    if (
      this.state.numberstatus == 'incomplete' ||
      this.state.numberstatus == 'invalid'
    ) {
      alert(this.props.Card_Number_is_invalid);
    } else if (
      this.state.expirystatus == 'incomplete' ||
      this.state.expirystatus == 'invalid'
    ) {
      alert(this.props.Expiry_date_is_invalid);
    } else if (
      this.state.cvcstatus == 'incomplete' ||
      this.state.cvcstatus == 'invalid'
    ) {
      alert(this.props.CVC_is_invalid);
    } else {
      this.check(fcardnumber, month, year, cvc, postal);
    }
  }

  check = async (fcardnumber, month, year, cvc, postal) => {
    this.setState({
      spinner: true,
    });
    // const apiKey= this.state.stripe_key
    const apiKey =
      'sk_test_51M4lgyAPBelfJ3bbIpEHdnZROEOemuEoXZWZuzXRq8hFoFwqhoO5T8dtZY5Y15z89WkuTmwEh9GeYCtrxRToNg5K00IUGjEhdg';

    const client = new Stripe(apiKey);

    console.log('card ' + fcardnumber);
    console.log('month ' + month);
    console.log('year ' + year);
    console.log('cvc ' + cvc);
    console.log('postal ' + postal);

    client
      .createToken({
        number: fcardnumber,
        exp_month: month,
        exp_year: year,
        cvc: cvc,
        address_zip: postal,
      })
      .then(x => {
        console.log('cool ' + x.id);
        id = x.id;

        this.paymentCharge_3(id, apiKey, fcardnumber);
      })
      .catch(e => {
        console.log(e);
      });
  };

  keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
    // alert('Keyboard is open')
    this.setState({Butun_Hide: false});
  });
  keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
    // alert('Keyboard is closed')
    this.setState({Butun_Hide: true});
  });

  paymentCharge_3(id, apiKey, fcardnumber) {
    console.log('chrge');
    console.log('chrge1', this.props.cardtoken);
    console.log('chrge2', this.props.cardkey);

    let total = this.props.fee;
    total = parseFloat(total);
    let finaltotal = total * 100;
    let name = this.state.name;
    let cname = 'Mass Clinicas';
    console.log(
      'amount=100&currency=usd&source=' +
        id +
        '&description=' +
        name +
        ' Paid ' +
        total +
        ' $ to ' +
        cname,
    );
    fetch('https://api.stripe.com/v1/charges', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + apiKey,
      },
      body:
        'amount=' +
        finaltotal +
        '&currency=usd&source=' +
        id +
        '&description=' +
        name +
        ' Paid ' +
        total +
        ' $ to ' +
        cname,
    })
      .then(response => response.json())
      .then(json => {
        console.log('222222222222', json);
        console.log('33333333333333', json.balance_transaction);
        let pid = json.balance_transaction;
        let status = json.status;
        if (status == 'succeeded') {
          this.setState({
            transactionid: pid,
            spinner: false,
          });
          //  this. placeorder()
          Actions.payment_done({
            payment_method: this.props.payment_method,
            experience: this.props.experience,
            a_r: this.props.a_r,
            address: this.props.address,
            fcm_token: this.props.fcm_token,
            s_key: this.props.s_key,
            paypal: this.props.paypal,
            access: this.props.access,
            category: this.props.category,
            doctor_id: this.props.doctor_id,
            time: this.props.time,
            date: this.props.date,
            day: this.props.day,
            fee: this.props.fee,
            fcm_token: this.props.fcm_token,
            doctor_name: this.props.doctor_name,
            city: this.props.city,
            doctor_profile: this.props.doctor_profile,
            p_name: this.props.p_name,
            p_mobile_number: this.props.p_mobile_number,
            p_age: this.props.p_age,
            p_gender: this.props.p_gender,
          });
          // Actions.payment_done({ doctor_name: this.props.doctor_name, card_no: this.state.cardnumber, name1: this.state.name, doctor_name: this.props.doctor_name, amount: this.props.amount, time: this.props.time, category: this.props.category, date: this.props.date, day: this.props.day, doctor_id: this.props.doctor_id, fee: this.props.fee, appointment_type: this.props.appointment_type, total_fee: this.props.total_fee, s_currency: this.props.s_currency })
        } else {
          // Actions.Card_Fail()
          this.setState({
            // visible1: true,
            spinner: false,
          });
        }

        // cid= json.id;
      });
  }

  get_key = () => {
    let api = Connection + 'rest_apis.php?action=get_key';
    console.log('pass => ', api);
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        otherHeader: 'foo',
      },
    })
      .then(response => response.json())
      .then(response => {
        //  console.log('11111111111111111111', response.response);

        let record = response.response;
        let len = record.length;

        if (record !== 'fail') {
          let stripe_key = record[0].key_s;
          this.setState({
            stripe_key: stripe_key,
            spinner: false,
          });
        }
        this.setState({
          spinner: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor="white" barStyle="light-content" />

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
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            Select Method For Payment
          </Text>

          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            {' '}
          </Text>
        </View>

        <ScrollView>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
              marginVertical: 22,
              marginLeft: 20,
            }}>
            {this.props.Enter_Card_Details}
          </Text>
          <CreditCardInput
            onChange={this._onCreditCardChanged}
            autofocus
            requireName={true}
            requireCVC={true}
            requiresPostalCode={true}
            validColor="black"
            invalidColor="red"
            placeholderColor="darkgray"
          />
          {/* <CreditCardInput onChange={this._onChange} /> */}
          {/* <Text style={{fontSize:18,color:'black',fontWeight:'bold',marginTop:30,marginLeft:15,}}>NOME E COGNOME SULLA CARTA</Text>

<TextInput
              placeholder="Full Name"
              style={{fontSize: 16,
                width: '70%',
                borderBottomWidth: 1,
                paddingHorizontal: 10,
                borderBottomColor: 'gray',
                marginLeft: 20,}}
              
           
            
              // autoCorrect={false}
           
              color="black"
              placeholderTextColor='gray'


onChangeText={(text) => this.setState({ number: text })}

            />
  */}
          {/* 
        <Text style={{
          fontSize: 18,
          textAlign: "center",
          marginTop: 120,
          paddingHorizontal: 40,
        }}> Se vuoi prenotare questo appuntamento pagherai {this.props.amount}€</Text> */}
        </ScrollView>

        {/* <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.request()}
            style={{
              width: width / 1.1,
              alignSelf: 'center',
              height: 48,
              backgroundColor: '#9d0c0f',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Pay using this card
            </Text>
          </TouchableOpacity>
        </View> */}

        {this.state.Butun_Hide == true ? (
          <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
            {this.state.card_check == true ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.request()}
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  height: 48,
                  backgroundColor: '#9d0c0f',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Pay using this card
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.setState({visible: true})}
                style={{
                  width: width / 1.1,
                  alignSelf: 'center',
                  height: 48,
                  backgroundColor: '#9d0c0f',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Pay using this card
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View></View>
        )}

        {/*      

        // {this.state.Butun_Hide == true?
        //   <View style={{position:'absolute',bottom:20,alignSelf:'center'}}>
        //     {this.state.card_check == true ?
        //       <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.payment_done()}
        //         style={{ width: width / 1.1, alignSelf: 'center', height: 48, backgroundColor: '#9d0c0f', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
        //          <Text style={{ color: 'white', fontWeight: 'bold' }}>Pay using this card</Text>
        //       </TouchableOpacity>
        //       :
        //       <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ visible: true })}
        //         style={{ width: width / 1.1, alignSelf: 'center', height: 48, backgroundColor: '#9d0c0f', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
        //          <Text style={{ color: 'white', fontWeight: 'bold' }}>Pay using this card</Text>
        //       </TouchableOpacity>
        //     }
        //   </View>
        //   :
        //   <View></View>
        //  } */}

        <Dialog
          //  dialogTitle={<DialogTitle title="CONGRATULATION" />}
          style={{backgroundColor: 'black', padding: 0}}
          width={'90%'}
          visible={this.state.visible}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="Ok"
                textStyle={{color: '#9d0c0f'}}
                onPress={() => this.setState({visible: false})}
              />
              <DialogButton
                text="Cancella"
                textStyle={{color: '#9d0c0f'}}
                onPress={() => {
                  this.setState({
                    visible: false,
                  });
                }}
              />
            </DialogFooter>
          }>
          <DialogContent
            style={{paddingLeft: 0, paddingRight: 0, paddingBottom: 0}}>
            <Icon
              name="close"
              type="AntDesign"
              style={{
                color: 'green',
                alignSelf: 'flex-end',
                marginTop: 10,
                marginRight: 10,
                fontSize: 22,
                fontFamily: 'Poppins-ExtraBold',
              }}
              onPress={() => {
                this.setState({visible: false});
              }}
            />
            <View style={{paddingHorizontal: 20}}>
              {/* <Text style={{fontSize:20,fontFamily:'Poppins-ExtraBold', color:'green'}}>Pagamento offline </Text> */}
            </View>
            <View
              style={{width: '100%', paddingHorizontal: 40, paddingBottom: 30}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-ExtraBold',
                  textAlign: 'center',
                }}>
                {this.props.If_you_want_to_pay_then_please}
              </Text>
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          //  dialogTitle={<DialogTitle title="CONGRATULATION" />}
          style={{backgroundColor: 'black', padding: 0}}
          width={'90%'}
          visible={this.state.visible1}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="Ok"
                textStyle={{color: 'green'}}
                onPress={() => this.setState({visible1: false})}
              />
              <DialogButton
                text="Cancella"
                textStyle={{color: 'green'}}
                onPress={() => {
                  this.setState({
                    visible1: false,
                  });
                }}
              />
            </DialogFooter>
          }>
          <DialogContent
            style={{paddingLeft: 0, paddingRight: 0, paddingBottom: 0}}>
            <Icon
              name="close"
              type="AntDesign"
              style={{
                color: 'green',
                alignSelf: 'flex-end',
                marginTop: 10,
                marginRight: 10,
                fontSize: 22,
                fontFamily: 'Poppins-ExtraBold',
              }}
              onPress={() => {
                this.setState({visible1: false});
              }}
            />
            <View style={{paddingHorizontal: 20}}>
              {/* <Text style={{fontSize:20,fontFamily:'Poppins-ExtraBold', color:'green'}}>Pagamento offline </Text> */}
            </View>
            <View
              style={{width: '100%', paddingHorizontal: 40, paddingBottom: 30}}>
              <Text
                style={{
                  fontSize: 16,
                  // color:'green',
                  fontFamily: 'Poppins-ExtraBold',
                  textAlign: 'center',
                }}>
                Controlla i dettagli della tua carta e riprova
              </Text>
            </View>
          </DialogContent>
        </Dialog>

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

const mapStateToProps = state => {
  return {
    Progressing_your_request: state.Progressing_your_request,
    Card_Number_is_invalid: state.Card_Number_is_invalid,
    Expiry_date_is_invalid: state.Expiry_date_is_invalid,
    CVC_is_invalid: state.CVC_is_invalid,
    Card_Payment: state.Card_Payment,
    Enter_Card_Details: state.Enter_Card_Details,
    Pay_using_this_card: state.Pay_using_this_card,
    If_you_want_to_pay_then_please: state.If_you_want_to_pay_then_please,
    Please_enter_correct_details_of_your_card:
      state.Please_enter_correct_details_of_your_card,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add_Vehicle: vehicle => {
      dispatch({type: 'add_Vehicle', payload: vehicle});
    },
    spanish_lang: (
      Progressing_your_request,
      Card_Number_is_invalid,
      Expiry_date_is_invalid,
      CVC_is_invalid,
      Card_Payment,
      Enter_Card_Details,
      Pay_using_this_card,
      If_you_want_to_pay_then_please,
      Please_enter_correct_details_of_your_card,
    ) => {
      dispatch({
        type: 'spanish_lang',
        payload: Progressing_your_request,
        Card_Number_is_invalid,
        Expiry_date_is_invalid,
        CVC_is_invalid,
        Card_Payment,
        Enter_Card_Details,
        Pay_using_this_card,
        If_you_want_to_pay_then_please,
        Please_enter_correct_details_of_your_card,
      });
    },
    english_lang: (
      Progressing_your_request,
      Card_Number_is_invalid,
      Expiry_date_is_invalid,
      CVC_is_invalid,
      Card_Payment,
      Enter_Card_Details,
      Pay_using_this_card,
      If_you_want_to_pay_then_please,
      Please_enter_correct_details_of_your_card,
    ) => {
      dispatch({
        type: 'english_lang',
        payload: Progressing_your_request,
        Card_Number_is_invalid,
        Expiry_date_is_invalid,
        CVC_is_invalid,
        Card_Payment,
        Enter_Card_Details,
        Pay_using_this_card,
        If_you_want_to_pay_then_please,
        Please_enter_correct_details_of_your_card,
      });
    },
    add_Social_User: social_user => {
      dispatch({type: 'add_Social_User', payload: social_user});
    },
    // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
    // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
    // addservice:(service)=>{dispatch({type:"addservice",payload:service})},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
