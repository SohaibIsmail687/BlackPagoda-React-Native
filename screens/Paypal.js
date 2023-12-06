import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  BackHandler,
  SafeAreaView,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  ActivityIndicatorBase,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import Connection from '../connection';

// import { WebView } from 'react-native-webview';

import moment from 'moment';

export default class Paypal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderlist: [],
    };
    this.WEBVIEW_REF = React.createRef();

    this.state = {
      selectedbtn: '1',
      name: '',
      id: '',
      plusbutton: true,
      filter: true,
      policy: '',

      url1:
        'https://autismcare.ai/Autismcare/paypal-payment.php?cart_id=' +
        this.props.appointment_price,
      firsttime: true,
    };
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
    //  navigate('NewScreen');
  };
  handleBackButtonClick() {
    // BackHandler.exitApp();
    Actions.pop();
    return true;
  }

  componentDidMount = async () => {
    console.log(
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      this.props.appointment_price,
    );

    // let paypal_payment = await AsyncStorage.getItem('paypal_payment');
    // let parsed = JSON.parse(paypal_payment);
    // let payment_ride_id = parsed[0].payment_ride_id;
    // let payment_ride_price = parsed[0].payment_ride_price;
    let aa = moment(new Date()).format('YYYY-MM-DD hh:mm a');
    console.log('QQQQQQQQQQQQ,AA', this.props.fcm_token);
    let split = aa.split(' ');
    let date = split[0];
    let time = split[1];
    let am_pm = split[2];
    let final_time = time + ' ' + am_pm;
    let user = await AsyncStorage.getItem('customer');
    // console.log(user);
    let parsed = JSON.parse(user);
    let id = parsed[0].id;
    let name = parsed[0].name;
    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww', this.props.category);

    console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww', name);
    // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww',payment_ride_price);

    this.setState({
      name: name,
      id: id,
      date: date,
      time: final_time,
    });

    // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww',this.props.cart_id_1);
    // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww',payment_ride_price);

    this.setState({
      name: name,
    });

    this.add_cart();
  };

  add_cart = () => {
    let uploaddata = new FormData();

    uploaddata.append('item_number_', '1');
    uploaddata.append('item_name_', 'sample');

    uploaddata.append('amount_', this.props.appointment_price);
    uploaddata.append('quantity_', '1');

    //  uploaddata.append('newImage', newImage);

    let api = Connection + 'rest_apis.php?action=add_cart';
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
        console.log('response', response.response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  notification = async () => {
    let to = this.props.fcm_token;
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'AAAAggY2OZ8:APA91bH6Ph12nshAWeIuJ4viYbX-MDLb-EQrrUaCkn5MeJDD501Qpzzs8pwRQmC5qD5QJvzDDivB4vHNGN4qH9s-N2m1wMZc5QrDgptWZJ5syqmi-AQan2-KKeJ2HLQl33eO43AIRreo', //cloud server key
      },
      body: JSON.stringify({
        to: to,
        priority: 'high',
        notification: {
          title: 'Black Pagoda',
          body: this.state.name + ' has booked an appointment with you.',
          sound: 'default',
          icon: 'myicon',
        },
      }),
    })
      .then(res => res.json())
      .then(resjson => console.log('test', resjson))
      .catch(err => console.log('error =>', err));
  };

  Add_App_Wallet = val => {
    let uploaddata = new FormData();

    uploaddata.append('user_id', this.state.id);

    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('appointment_id', val);
    // uploaddata.append("day", this.props.day);
    uploaddata.append('d_earning', this.state.d_earning);

    uploaddata.append('price', this.props.fee);
    uploaddata.append('tax', '3');

    uploaddata.append('method', 'Paypal');

    let api = Connection + 'rest_apis.php?action=Add_App_Wallet';
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
        console.log(
          'KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK',
          response.response,
        );
        let record = response.response;
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });
          // alert(this.props.Something_went_wrong_try_agin_later);
        } else {
          this.setState({
            spinner: false,
          });
          Actions.Paypal_Success({
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
            fee: this.props.appointment_price,
            fcm_token: this.props.fcm_token,
            doctor_name: this.props.doctor_name,
            city: this.props.city,
            doctor_profile: this.props.doctor_profile,
            p_age: this.state.p_age,
          });
          // ToastAndroid.show(`Your appointment successfully booked!`, ToastAndroid.SHORT);

          // Actions.Patient_Tab_Screen({ app_id: app_id });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  add_notification = val => {
    let uploaddata = new FormData();
    uploaddata.append('user_id', this.state.id);
    uploaddata.append('time', this.state.time);
    uploaddata.append('type', 'success');
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('date', this.state.date);
    uploaddata.append('appointment_id', val);

    let api = Connection + 'rest_apis.php?action=add_notification';
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
        let record = response.response;
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });
        } else {
          this.Add_App_Wallet(val);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  Add_appointment = () => {
    let uploaddata = new FormData();

    console.log('arrrrrrrrrrrrrrrr', this.props.doctor_id);
    console.log('arrrrrrrrrrrrr111111111111rrr', this.props.time);
    console.log('arrrrrrrrr2222222222rrrrrrr', this.props.day);

    this.setState({spinner: true});
    uploaddata.append('user_id', this.state.id);
    uploaddata.append('time', this.props.time);
    uploaddata.append('category', this.props.category);
    uploaddata.append('doctor_id', this.props.doctor_id);
    uploaddata.append('date', this.props.date);
    uploaddata.append('day', this.props.day);
    uploaddata.append('fee', this.props.fee);
    uploaddata.append('payment_method', 'Paypal');

    let api = Connection + 'rest_apis.php?action=Add_Appointment';
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
        console.log(
          'KKKKKKKKKKKKKKKKKKKresponseeeeKKKKKKKKKKKKKK',
          response.response,
        );
        let record = response.response;
        if (record == 'fail') {
          this.setState({
            spinner: false,
          });
        } else {
          let app_id = record[0];
          console.log('OOOOOOOOOOOOOOO', app_id);

          // ToastAndroid.show(this.props.Your_appointment_successfully_booked, ToastAndroid.SHORT);

          this.notification();
          this.add_notification(app_id);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  get_percentage = () => {
    // console.log('((((((((((((((((((((((((((((((((',this.state.tax_percentage)

    let tax = Number((20 / 100) * this.props.appointment_price).toFixed(2);
    // console.log('((((((((((((((((((((((((((((((((',tax)

    let d_earning = Number(this.props.appointment_price - tax).toFixed(2);
    // console.log('((((((((((((((((((((((((((((((((',d_earning)

    this.setState({
      tax: tax,
      d_earning: d_earning,
    });
    setTimeout(() => {
      this.Add_appointment();
    }, 100);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
          ref={this.WEBVIEW_REF}
          source={{
            uri: this.state.url1,
          }}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
        />

        {/* <Text style={{fontSize:20,color:'black',fontWeight:'bold',marginVertical:22}}>payment </Text> */}

        {/* {this.props.cart_id_1=='$'?

 <WebView



ref={this.WEBVIEW_REF}
        source={{
          uri: this.state.url1
        }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
          
      />


:


<WebView



ref={this.WEBVIEW_REF}
        source={{
          uri: this.state.url1
        }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
          
      />


      } */}
      </View>
    );
  }

  handleWebViewNavigationStateChange = newNavState => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    this.setState({
      backButtonEnabled: newNavState.canGoBack,
    });
    const {loading, url} = newNavState;
    console.log(
      'canGoBack => ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
      url,
    );
    var pieces = url.split('###');
    console.log(
      'canGoBack1 => hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
      pieces[1],
    );

    if (pieces[1]) {
      console.log('canGoBack11111 => ssssssssssssssssssssssssssssssssss', url);

      // this.setState({
      //     backButtonEnabled:false,

      // })
      //Actions.calendar();
      setTimeout(() => {
        if (this.state.firsttime == true) {
          this.get_percentage();

          // Actions.Paypal_Success({ payment_method:this.props.payment_method, experience:this.props.experience,a_r:this.props.a_r, address: this.props.address, fcm_token: this.props.fcm_token, s_key: this.props.s_key, paypal: this.props.paypal, access: this.props.access, category: this.props.category, doctor_id: this.props.doctor_id, time: this.props.time, date: this.props.date, day: this.props.day, fee: this.props.appointment_price, fcm_token: this.props.fcm_token, doctor_name: this.props.doctor_name, city: this.props.city, doctor_profile: this.props.doctor_profile, p_age: this.state.p_age })
        }
        this.setState({
          firsttime: false,
        });
      }, 1000);
    }

    if (url == 'https://autismcare.ai/Autismcare/paypal-fail.php') {
      console.log('canGoBack => ', url);

      // this.setState({
      //     backButtonEnabled:true,

      //         dialogVisible1:true,

      // })
      // Actions.Paypal_Fail({cartid:this.props.cart_id_1, time: this.props.time, category: this.props.category, date: this.props.date, day: this.props.day, doctor_id: this.props.doctor_id, appointment_price: this.props.appointment_price, appointment_type: this.props.appointment_type, total_fee: this.state.toatal_fee, doctor_name: this.props.doctor_name,})
      Actions.Paypal_Fail({
        time: this.props.time,
        category: this.props.category,
        doctor_name: this.props.doctor_name,
        date: this.props.date,
        day: this.props.day,
        doctor_id: this.props.doctor_id,
        appointment_price: this.props.appointment_price,
        doctor_name: this.props.doctor_name,
        subject: this.props.subject,
        r_number: this.props.r_number,
        symptoms: this.props.symptoms,
        multi_Images: this.props.multi_Images,
        multi_image_check: this.props.multi_image_check,
        city: this.props.city,
      });
    }
    //     else if(pieces[1] == "done")
    //     {
    //         this.setState({
    //             backButtonEnabled:true,

    //                 dialogVisible2:true,

    //         })
    //     }
    //     if(url == "https://aucklandheatpumpinstallation.co.nz/Heatpump/#modalClosed" || pieces[1] == "modalClosed" )
    //     {
    //         this.setState({
    //             backButtonEnabled:false,
    //             jobdone:false,
    //         })
    //     }

    //     if(url == "https://aucklandheatpumpinstallation.co.nz/Heatpump/#modalOpen" || pieces[1] == "modalOpen")
    //     {

    //         this.setState({
    //             backButtonEnabled:true,
    //             jobdone:false,
    //         })
    //     }
    //     if(url == undefined )
    // {
    // console.log("updated record")
    // this.setState({
    //     backButtonEnabled:false,

    // })

    // }

    if (loading == false) {
      console.log('url => ', loading);
      this.setState({
        spinner2: true,
      });
    }

    // handle certain doctypes
    // if (url.includes('.pdf')) {
    //   this.webview.stopLoading();
    //   // open a modal with the PDF viewer
    // }

    // // one way to handle a successful form submit is via query strings
    // if (url.includes('?message=success')) {
    //   this.webview.stopLoading();
    //   // maybe close this view?
    // }

    // // one way to handle errors is via query string
    // if (url.includes('?errors=true')) {
    //   this.webview.stopLoading();
    // }

    // // redirect somewhere else
    // if (url.includes('google.com')) {
    //   const newURL = 'https://reactnative.dev/';
    //   const redirectTo = 'window.location = "' + newURL + '"';
    //   this.webview.injectJavaScript(redirectTo);
    // }
  };
}

// const mapStateToProps =(state)=>{
//   return{
//     product: state.product,
//     counter: state.counter,
//     counterNO: state.counterNO,

//   }
// }
// const mapDispatchToProps = (dispatch)=>{
//     return{
//       addproduct:(product)=>{dispatch({type:"add_product",payload:product})},
//       change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},

//       change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},

//     }
// }

// export default  connect(mapStateToProps,mapDispatchToProps)(Paypal);
