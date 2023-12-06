import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  Button,
  Text,
  BackHandler,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Form,
  Container,
  Header,
} from "native-base";
import Connection from "../connection";
import { connect } from "react-redux";
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from "react-native-popup-dialog";

class Paypal_Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orderlist: [],
      check: true,
      visible: false,
      visible_1: false,
      c_id: 1,
      c_amount: 1.1,
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
    Actions.pop();
    return true;
  }

  handleDelete = () => {
    this.setState({
      visible: false,
    });
  };

  idet = () => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    this.setState({
      visible: true,
    });
  };

  handleDelete_1 = () => {
    this.setState({
      visible_1: false,
    });
  };

  idet_1 = () => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    this.setState({
      visible_1: true,
    });
  };

  place_cart() {
    let uploaddata = new FormData();
    let customer_id = this.state.id;
    let data = this.state.orderlist;
    console.log(
      "9pppppppppppppppppppppppppppppppppppppppppppp",
      this.state.orderlist
    );

    uploaddata.append("customer_id", "1");
    uploaddata.append("order_data", JSON.stringify(data));
    let api = Connection + "rest_apis.php?action=place_cart";
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
        console.log("11111111111111response", response.response);
        let cartid = response.response;

        this.props.cart_id(cartid);
        Actions.Paypal({ cart_id_1: this.props.currency });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  geted = async () => {
    let orderlist = [];
    let record = this.props.counter;
    console.log("99999999999922222222222222", record);
    for (let i = 0; i < record; i++) {
      let shop1 = "shop" + i;
      console.log("9pppppppppppppppppppppppppppppppppppppppppppp", shop1);

      let user = await AsyncStorage.getItem(shop1);
      // console.log('9pppppppppppppppppppppppppppppppppppppppppppp',user);

      if (user != null) {
        let parsed = JSON.parse(user);
        let hel = parsed[0];
        // console.log('9pppppppppppppppppppppppppppppppppppppppppppp',hel);

        // console.log('999999999999',hel);
        orderlist.push(hel);
      }
      console.log("44444444444444444444444", orderlist);
    }
    this.setState({
      orderlist: orderlist,
    });
  };

  alert_function() {
    alert("Require Business Account");
  }

  navigate_func() {
    this.setState({
      visible_1: false,
    });
    // setTimeout(() => {
    //   Actions.Home();
    //   },100)
  }

  componentDidMount = async () => {
    // let paypal_payment = await AsyncStorage.getItem('paypal_payment');
    // let parsed = JSON.parse(paypal_payment);
    // let payment_ride_id = parsed[0].payment_ride_id;
    // let payment_ride_price = parsed[0].payment_ride_price;
    let user = await AsyncStorage.getItem("customer");
    // console.log(user)
    let parsed = JSON.parse(user);
    let id = parsed[0].id;

    // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww',payment_ride_id);
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww', this.props.s_currency);

    this.setState({
      // payment_ride_id:payment_ride_id,
      // payment_ride_price:payment_ride_price
      id: id,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            height: 40,
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#dee3de",
            justifyContent: "center",
            backgroundColor: "#f0f2f0",
            flexDirection: "row",
          }}
        >
          <Icon
            name="lock"
            type="Entypo"
            style={{ color: "gray", marginRight: 0, fontSize: 18 }}
          />

          <Text
            style={{
              color: "gray",
              marginLeft: 10,
              textAlign: "center",
              fontSize: 12,
            }}
          >
            {this.props.payment_and_card_details_are_encrypted}
          </Text>
        </View>


        {/* onPress={() =>  Actions.payment_option({cartid:this.state.payment_ride_id,amount:this.state.payment_ride_price})} */}
        <TouchableOpacity
          onPress={() =>
            Actions.Payment()
          }
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#dee3de",
            paddingVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "15%", justifyContent: "center" }}>
              <Icon
                name="creditcard"
                type="AntDesign"
                style={{ color: "black", marginRight: 0, fontSize: 25 }}
              />
            </View>

            <View style={{ width: "75%", justifyContent: "center" }}>
              <Text style={{ fontSize: 16 }}>{this.props.pay_with_card}</Text>
              <Text style={{ fontSize: 12, marginTop: 5, color: "gray" }}>
                {this.props.all_credit_depit_cards}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
      
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#dee3de",
            paddingVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "15%", justifyContent: "center" }}>
              <Icon
                name="paypal"
                type="Entypo"
                style={{ color: "#02a3ed", marginRight: 0, fontSize: 25 }}
              />
            </View>

            <View style={{ width: "75%", justifyContent: "center" }}>
              <Text style={{ fontSize: 16 }}>{this.props.pay_with_PayPal}</Text>
              <Text style={{ fontSize: 12, marginTop: 5, color: "gray" }}>
                {this.props.log_into_PayPal}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          activeOpacity={0.9}
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#dee3de",
            paddingVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "15%", justifyContent: "center" }}>
              <Icon
                name="account-cash-outline"
                type="MaterialCommunityIcons"
                style={{ marginRight: 0, fontSize: 25 }}
              />
            </View>

            <View style={{ width: "75%", justifyContent: "center" }}>
              <Text style={{ fontSize: 16 }}>Cash on Delivery</Text>
              <Text style={{ fontSize: 12, marginTop: 5, color: "gray" }}>
                Cash on Delivery
              </Text>
            </View>
          </View>
        </TouchableOpacity> */}
        <Dialog
          //  dialogTitle={<DialogTitle title="CONGRATULATION" />}
          style={{ backgroundColor: "black", padding: 0 }}
          width={"90%"}
          visible={this.state.visible}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="Ok"
                textStyle={{ color: "green" }}
                onPress={() => {
                  this.setState({
                    visible: false,
                  });
                }}
              />
              <DialogButton
                text="Cancel"
                textStyle={{ color: "green" }}
                onPress={() => {
                  this.setState({
                    visible: false,
                  });
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}
          >
            <Icon
              name="close"
              type="AntDesign"
              style={{
                color: "green",
                alignSelf: "flex-end",
                marginTop: 10,
                marginRight: 10,
                fontSize: 22,
                fontFamily: "Poppins-ExtraBold",
              }}
              onPress={() => {
                this.handleDelete();
              }}
            />
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins-ExtraBold",
                  color: "green",
                }}
              >
                {this.props.Still_Working}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 20,
                paddingVertical: 30,
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: "Poppins-ExtraBold" }}>
                {this.props.Please_use_Card_for_payment}
              </Text>

              {/* <Image  source={require('../assets/ip1.png')} style={{width:'90%',height:100,alignSelf:'center',marginTop:20}} resizeMode="cover" /> */}
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          //  dialogTitle={<DialogTitle title="CONGRATULATION" />}
          style={{ backgroundColor: "black", padding: 0 }}
          width={"90%"}
          visible={this.state.visible_1}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="Ok"
                textStyle={{ color: "green" }}
                onPress={() => this.navigate_func()}
              />
              <DialogButton
                text="Cancel"
                textStyle={{ color: "green" }}
                onPress={() => {
                  this.setState({
                    visible_1: false,
                  });
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}
          >
            <Icon
              name="close"
              type="AntDesign"
              style={{
                color: "green",
                alignSelf: "flex-end",
                marginTop: 10,
                marginRight: 10,
                fontSize: 22,
                fontFamily: "Poppins-ExtraBold",
              }}
              onPress={() => {
                this.handleDelete_1();
              }}
            />
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins-ExtraBold",
                  color: "green",
                }}
              >
                {this.props.Offline_Payment}{" "}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 20,
                paddingVertical: 30,
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: "Poppins-ExtraBold" }}>
                {this.props.If_you_dont_want_pay_online_then_click}
              </Text>

              {/* <Image  source={require('../assets/ip1.png')} style={{width:'90%',height:100,alignSelf:'center',marginTop:20}} resizeMode="cover" /> */}
            </View>
          </DialogContent>
        </Dialog>
        {/* 
<TouchableOpacity  onPress={() => this.idet_1()}    style={{ width:300, height:50,  alignSelf: 'center', borderRadius: 38, backgroundColor: '#24AE34', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, flexDirection: 'row',marginTop:20}}   >

<Text style={{color: 'white',  fontSize: 16, }}> Ignore Online payment</Text>

</TouchableOpacity> */}

        <View style={{ position: "absolute", bottom: 10, width: "100%" }}>
          <TouchableOpacity
            onPress={() => Actions.Patient_Tab_Screen()}
            style={{
              width: "90%",
              marginTop: 10,
              borderRadius: 8,
              backgroundColor: "#24C6D2",
              alignItems: "center",
              justifyContent: "center",
              padding: 13,
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    payment_and_card_details_are_encrypted: state.payment_and_card_details_are_encrypted,
    pay_with_card: state.pay_with_card,
    all_credit_depit_cards: state.all_credit_depit_cards,
    pay_with_PayPal: state.pay_with_PayPal,
    log_into_PayPal: state.log_into_PayPal,
    Still_Working: state.Still_Working,
    Please_use_Card_for_payment: state.Please_use_Card_for_payment,
    Offline_Payment: state.Offline_Payment,
    If_you_dont_want_pay_online_then_click: state.If_you_dont_want_pay_online_then_click,
    Go_Back: state.Go_Back,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
    spanish_lang: (payment_and_card_details_are_encrypted, pay_with_card, all_credit_depit_cards, pay_with_PayPal, log_into_PayPal, Still_Working, Please_use_Card_for_payment, Offline_Payment, If_you_dont_want_pay_online_then_click, Go_Back) => { dispatch({ type: "spanish_lang", payload: payment_and_card_details_are_encrypted, pay_with_card, all_credit_depit_cards, pay_with_PayPal, log_into_PayPal, Still_Working, Please_use_Card_for_payment, Offline_Payment, If_you_dont_want_pay_online_then_click, Go_Back }) },
    english_lang: (payment_and_card_details_are_encrypted, pay_with_card, all_credit_depit_cards, pay_with_PayPal, log_into_PayPal, Still_Working, Please_use_Card_for_payment, Offline_Payment, If_you_dont_want_pay_online_then_click, Go_Back) => { dispatch({ type: "english_lang", payload: payment_and_card_details_are_encrypted, pay_with_card, all_credit_depit_cards, pay_with_PayPal, log_into_PayPal, Still_Working, Please_use_Card_for_payment, Offline_Payment, If_you_dont_want_pay_online_then_click, Go_Back }) },
    add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
    // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
    // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
    // addservice:(service)=>{dispatch({type:"addservice",payload:service})},






  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Paypal_Options);