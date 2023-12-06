
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
    AsyncStorage
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Connection from "../connection";
import { connect } from "react-redux";
import ImageLoad from 'react-native-image-placeholder';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import RBSheet from "react-native-raw-bottom-sheet";
import { NavigationEvents } from 'react-navigation';
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
import getDistance from "geolib/es/getDistance";
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class all_pharmacies extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            text1: 2,
            text2: 1,
            text3: 1,
            //   text4:1,
            check_design: 'pending',
            visible: false,
            data1: [],
            skalton: false,
            data5:[],
        }
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
        if (this.props.user == true) {
            Actions.pop()

        }
        else {
            BackHandler.exitApp();

        }
        return true;
    }


    changebtn(value, val) {
        this.setState({
            check_design: val,

        })

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
        setTimeout(() => {
            // this.get_appointments_user()

        }, 100);
    }



    backAction = () => {
        // BackHandler.exitApp()
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
  
      let user = await AsyncStorage.getItem('customer');
  if(user!=null){


  
      let parsed = JSON.parse(user);
  
      let id = parsed[0].id;
      let latitude = parsed[0].lat;
      let longitude = parsed[0].lng;
      let lat = parseFloat(latitude);
      let lng = parseFloat(longitude);
  
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
  
          id: id,
          lat: lat,
          lng: lng,
          day_1: day_1,
          final_date_1: final_date_1,
          userlat: lat,
          userlng: lng
   
  
  
      })
  
      console.log("category", this.props.category);
    } else {
      this.setState({
        id:1
      })
    }
  
  
  
  
      
          this.all_pharmacies()
  
       
  }
  

  dd = () => {
    this.componentDidMount()
  }

    all_pharmacies = () => {
        let uploaddata = new FormData();
    
        uploaddata.append('user_id', '9');
    
        let api = "https://speak2med.com/Speak2Med/rest_apis.php?action=all_pharmacies";
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
            console.log('mondddddddddddayyyyyyyyyy', record)
    
            let len = record.length;
    
            if (record != 'fail') {
              for (let i = 0; i < len; i++) {
    
    
                let lat1 = record[i].lat
                let lng1 = record[i].lng
                let lat = parseFloat(lat1);
                let lng = parseFloat(lng1);
    
                if (lat1 != "" && lat1 != null) {
                  table.push(record[i]);
    
                }
                else {
                  this.setState({
                    data5: [],
                    skalton: false
                  })
                }
              }
    
    
              this.setState({
                data5: table,
                skalton: false
              })
            }
    
          })
          .catch((error) => {
            console.error(error);
          });
    
      };
    
    
    
      createtable5 = () => {
        let table = []
        let record1 = this.state.data5
        let len = record1.length
        if (record1 != 'fail') {
          for (let i = 0; i < len; i++) {
            let name = record1[i].p_name
            let category = record1[i].category
            let fee = record1[i].fee
            let address = record1[i].address
            let fcm_token = record1[i].fcm_token
            let pharmacy_id = record1[i].id
    
    
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
            let r_no = record1[i].r_no
            let appointment = record1[i].appointment
            let s_key = record1[i].s_key
            let paypal = record1[i].paypal
            let access = record1[i].access
            let mobile_number = record1[i].mobile_number
            let app = record1[i].app
            let profile1 = record1[i].profile
            let profile = Connection + 'images/' + profile1
            let my_like = record1[i].my_like
            console.log('mylikeeeeeeeeee',my_like)
            table.push(<View>
              {
    
    
    
    
    <TouchableOpacity activeOpacity={0.8} onPress={()=>Actions.Checkout({guest:this.props.guest, pharmacy_id:pharmacy_id,pharmacy_profile:profile,pharmacy_name:name,pharmacy_address:address,lng:lng,lat:lat,r_no:r_no,mobile_number:mobile_number})} style={{backgroundColor:'white',  width: width / 1.1,   alignSelf: 'center', borderRadius: 4, paddingLeft: 10, shadowOffset: { width: 0, height: 2, }, paddingVertical:10, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginVertical:10,paddingHorizontal:10 }}>
                                
    <View style={{ flexDirection: 'row', alignItems: 'center',paddingVertical:10,  }}>
{/* <Image   style={{ width: 70, height:70, borderRadius:4 }}  source={require('../assets/wallet.png')} /> */}
<ImageLoad

style={{width: 70, height:70, borderRadius:4,borderWidth:1,borderColor:'#2597CB'}}
                  loadingStyle={{ size: 'large', color: 'blue', }}
                  source={{ uri: profile }}
                  borderRadius={8}

                  placeholderStyle={{width: 70, height:70, borderRadius:4}}

                />
  
                <View style={{ width:'50%',marginLeft:10 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
             <Icon name="location-pin" type="Entypo" style={{ color: "gray", fontSize: 18}} />                                 
       
             <Text style={{color:'gray', fontSize:12,fontWeight:'bold',marginLeft:5}}>{address}</Text>
                 
     </View>
     <View style={{flexDirection:'row',alignItems:'center',marginLeft:4}}>
             <Icon name="mobile-phone" type="FontAwesome" style={{ color: "gray", fontSize: 20}} />                                 
       
             <Text style={{color:'gray', fontSize:12,fontWeight:'bold',marginLeft:5}}>{mobile_number}</Text>
                 
     </View>
                    {/* <Text numberOfLines={2} style={{ color: 'gray', fontSize: 12 }}>Pastry, stiff dough made from flour, salt, a relatively high proportion of fat, and a small proportion of liquid. It may also contain sugar or flavourings. Most pastry is leavened only by the action of steam, but Danish pastry is raised with yeast.</Text> */}
                </View>
                {/* <Text style={{ color: 'black', fontSize: 11, fontWeight: '600', }}>10 Jan, 2023</Text> */}

                {/* <TouchableOpacity activeOpacity={0.8} style={{ marginRight: 18, paddingHorizontal:10, paddingVertical: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCC564', borderRadius: 400 }}>
                <Text style={{ color: 'black', fontSize: 11, fontWeight: '600' }}>View Details</Text>

</TouchableOpacity> */}
            </View>
        

    </TouchableOpacity>


    
    
    
    
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
    
    
    

      doctors_by_categy_map = () => {

        this.setState({ spinner: true });
    
        let api = Connection + "rest_apis.php?action=all_pharmacies";
          console.log("pass => ", api);
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
                let map_arr = [];
              let  first_lat_1="";
              let first_lng_1="";
    
                let record = response.response
                let len = record.length;
    
                if (record != 'fail') {
                    for (let i = 0; i < len; i++) {
                        let lat = record[i].lat;
                        let lng = record[i].lng;
                        let first_lat = record[0].lat;
                        let first_lng = record[0].lng;
                       
                        let name = record[i].name;
                        let add = record[i].add;
    
                        let profile1 = record[i].profile
                        let profile = Connection + 'images/' + profile1 
    
                        let email = record[i].email
                        let mobile_number = record[i].mobile_number
                        let category = record[i].category
                        let fee = record[i].fee
                        let address = record[i].address
                        let doctor_id = record[i].id
                        let experience = record[i].experience
                        let avg_rating = record[i].avg_rating
                        let total_review = record[i].total_review
                        let city = record[i].city
        
                        let a_r = Number(avg_rating).toFixed(2);
        
                        let degree = record[i].degree
                        let license_number = record[i].license_number
                        let c_name = record[i].c_name
                        let appointment = record[i].appointment
                        let s_key = record[i].s_key
                        let paypal = record[i].paypal
                        let access = record[i].access
                        let fcm_token = record[i].fcm_token
                        let online = record[i].online
                        let app = record[i].app
    
    
                        let d_lat = parseFloat(lat);
                        let d_lng = parseFloat(lng);
                            first_lat_1 = parseFloat(first_lat);
                          first_lng_1 = parseFloat(first_lng);
                        let coordinate = {
                            latitude: d_lat,
                            longitude: d_lng,
                        };
                        // 5000000
                        let test ={
                            coordinate,
                            name:name,
                            add:add,
                            email:email,
                            mobile_number:mobile_number,
                            category:category,
                            fee:fee,
                            address:address,
                            doctor_id:doctor_id,
                            experience:experience,
                            total_review:total_review,
                            city:city,
                            a_r:a_r,
                            degree:degree,
                            license_number:license_number,
                            c_name:c_name,
                            appointment:appointment,
                            s_key:s_key,
                            paypal:paypal,
                            access:access,
                            fcm_token:fcm_token,
                            online:online,
                            app:app,
                            profile:profile,
                            doc_lat:d_lat,
                            doc_lng:d_lng,
    
                        }
                      
        
            console.log('mondddddddddddayyyyyyyyyy', coordinate)
            console.log('mondddddddddddayyyyyyyyyycoordinate              ', test)
    
                  
            
    
                        if (
                            getDistance(
                                {
                                    latitude: this.state.userlat,
                                    longitude: this.state.userlng,
                                },
                                coordinate
                            ) <= 15000
                        ) {
                            table.push(record[i]);
                            map_arr.push(test)
    
                        }
              
                    }
    
                    console.log('map_arrmap_arrmap_arrmap_arrmap_arrmap_arr', map_arr)
    
                }
    
                else {
                    this.setState({
                        data2: [],
                        spinner: false
                    })
                }
                this.setState({
                    data2: table,
                    skalton: false,
                    map_arr:map_arr,
                    spinner: false
                }) 
    setTimeout(() => {
      Actions.nearby_pharmacies({map_arr:this.state.map_arr,lat:first_lat_1,lng:first_lng_1,userlat:this.state.userlat,userlng:this.state.userlng})
      
    }, 100);
    
            })
            .catch((error) => {
                console.error(error);
            });
    
    };




    
    search_pharmacies = (val) => {
    this.setState({ skalton: true })


    let uploaddata = new FormData();




    // this.setState({ spinner: true });
    console.log('name', val);
    let name1 = val['name']
    uploaddata.append('name', name1);
 

    let api = Connection + 'rest_apis.php?action=search_pharmacies';
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
   

        let record = response.response;

        if (record != 'fail') {
          this.setState({
            data5: record,
            skalton: false
          })

        }

        else {
        
          this.setState({
            data5: [],
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
      <StatusBar backgroundColor="#2597CB" barStyle="light-content" />

                <NavigationEvents onDidFocus={payload => this.dd()} />
                <View style={{  paddingHorizontal: 15, paddingVertical: 15, backgroundColor: "#2597CB", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
          
          <View style={{ flexDirection: "row", justifyContent: 'space-between',alignItems: "center",  }}>


      
          
            <Icon onPress={() => { Actions.pop() }} name="keyboard-backspace" type="MaterialCommunityIcons" style={{ color: "white", fontSize: 28 }} />
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>All Pharmacies</Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>    </Text>

            {/* <Icon  name="search" type="FontAwesome" style={{ color: "white", fontSize: 24 }} /> */}
            {/* onPress={() => { this.search_true() }} */}

          </View>
          <View style={{ flexDirection: "row",marginTop:10, justifyContent: 'space-between',alignItems: "center",  }}>


          <View
              style={{ width: width / 1.2, justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: '#2597CB', borderColor: 'white', borderWidth: 1, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3 }}>
              <TextInput  onChangeText={name => this.search_pharmacies({ name })} style={{ width: '100%', alignSelf: 'center', height: 45, borderRadius: 8, paddingLeft: 15, color: 'white', }} placeholder="Search " placeholderTextColor='white' />
              <Icon

                name="search"
                type="Ionicons"
                style={{ color: "white", fontSize: 25, position: 'absolute', right: 10 }}
              />
            </View>
            <Icon onPress={()=>this.doctors_by_categy_map()}  name="location" type="Entypo" style={{ color: "white", fontSize: 28 }} />


            </View>

          </View>

              

 

                {this.state.skalton == true ?


                    <SkeletonPlaceholder>
                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 120,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 15,
                                backgroundColor: 'white'
                            }}
                        ></View>

                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 120,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 15,
                                backgroundColor: "white",
                            }}
                        ></View>


                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 120,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 15,
                                backgroundColor: "white",
                            }}
                        ></View>



                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 120,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 15,
                                backgroundColor: "white",
                            }}
                        ></View>


                        <View
                            style={{
                                width: "90%",
                                alignSelf: "center",
                                height: 120,
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 15,
                                backgroundColor: "white",
                                marginBottom: 15
                            }}
                        ></View>

                    </SkeletonPlaceholder>


                    :

                    <ScrollView showsVerticalScrollIndicator={false}>

 

  
                      <ScrollView showsVerticalScrollIndicator={false}>

<TouchableOpacity activeOpacity={0.8} onPress={()=>Actions.Checkout({guest:false, pharmacy_id:'4',pharmacy_profile:'profile',pharmacy_name:'Ajmal Pharmacy',pharmacy_address:'Circular Road Narowal',lng:'lng',lat:'lat',r_no:'74894',mobile_number:'+964738282'})} style={{backgroundColor:'white',  width: width / 1.1,   alignSelf: 'center', borderRadius: 4, paddingLeft: 10, shadowOffset: { width: 0, height: 2, }, paddingVertical:10, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginVertical:10,paddingHorizontal:10 }}>
                                
                                <View style={{ flexDirection: 'row', alignItems: 'center',paddingVertical:10,  }}>
                            <Image   style={{ width: 70, height:70, borderRadius:4 }}  source={require('../assets/practo_doctor.png')} />
                            {/* <ImageLoad
                            
                            style={{width: 70, height:70, borderRadius:4,borderWidth:1,borderColor:'#2597CB'}}
                                              loadingStyle={{ size: 'large', color: 'blue', }}
                                              source={{ uri: profile }}
                                              borderRadius={8}
                            
                                              placeholderStyle={{width: 70, height:70, borderRadius:4}}
                            
                                            /> */}
                              
                                            <View style={{ width:'50%',marginLeft:10 }}>
                                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Ajmal Pharmacy</Text>
                                                <View style={{flexDirection:'row',alignItems:'center',}}>
                                         <Icon name="location-pin" type="Entypo" style={{ color: "gray", fontSize: 18}} />                                 
                                   
                                         <Text style={{color:'gray', fontSize:12,fontWeight:'bold',marginLeft:5}}>Circular Road Narowal</Text>
                                             
                                 </View>
                                 <View style={{flexDirection:'row',alignItems:'center',marginLeft:4}}>
                                         <Icon name="mobile-phone" type="FontAwesome" style={{ color: "gray", fontSize: 20}} />                                 
                                   
                                         <Text style={{color:'gray', fontSize:12,fontWeight:'bold',marginLeft:5}}>+92340987655</Text>
                                             
                                 </View>
                                                {/* <Text numberOfLines={2} style={{ color: 'gray', fontSize: 12 }}>Pastry, stiff dough made from flour, salt, a relatively high proportion of fat, and a small proportion of liquid. It may also contain sugar or flavourings. Most pastry is leavened only by the action of steam, but Danish pastry is raised with yeast.</Text> */}
                                            </View>
                                            {/* <Text style={{ color: 'black', fontSize: 11, fontWeight: '600', }}>10 Jan, 2023</Text> */}
                            
                                            {/* <TouchableOpacity activeOpacity={0.8} style={{ marginRight: 18, paddingHorizontal:10, paddingVertical: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCC564', borderRadius: 400 }}>
                                            <Text style={{ color: 'black', fontSize: 11, fontWeight: '600' }}>View Details</Text>
                            
                            </TouchableOpacity> */}
                                        </View>
                                    
                            
                                </TouchableOpacity>
                     
                      </ScrollView>
       
                    <View style={{marginBottom:120}}></View>
                  </ScrollView>
                }




                <RBSheet
                    ref={ref => {
                        this.RBSheet1 = ref;
                    }}
                    closeOnDragDown={true}
                    height={220}
                    openDuration={270}
                    customStyles={{
                        container: {
                            paddingHorizontal: 20,
                            borderTopLeftRadius: 40,
                            borderTopRightRadius: 40,
                        },
                        draggableIcon: {
                            backgroundColor: "lightgray",
                        },
                    }}

                >
                    <View>
                        <Text style={{ fontSize: 18, color: 'red', marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>Cancella Appuntamento!</Text>

                        <View style={{ width: '100%', backgroundColor: 'lightgray', height: 1, marginVertical: 15 }}></View>
                        <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center', fontWeight: 'bold', paddingHorizontal: 30 }}>Confermi di voler cancellare l'appuntamento?</Text>
                        {/* <Text style={{ fontSize: 14, color: 'gray', marginTop: 10, textAlign: 'center', fontWeight: 'bold', paddingHorizontal: 30 }}>{this.props.Only_funds_will_return_your_accouont}</Text> */}

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => this.RBSheet1.close()} activeOpacity={0.8}
                                style={{ width: width / 2.3, paddingVertical: 13, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#eef3ff', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3 }}>
                                <Text style={{ color: '#FCC564', fontWeight: 'bold' }}>Cancella</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.next()} activeOpacity={0.8}
                                style={{ width: width / 2.3, paddingVertical: 13, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#FCC564', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Confermo</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </RBSheet>

                {this.state.spinner == true &&
            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(2, 2, 2, 0.8)', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{
                width: width / 2.3, height: height / 9 - 20, backgroundColor: "white", flexDirection: 'row', alignItems: 'center',  paddingHorizontal: 5, shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
                borderRadius: 6
              }}>
                <UIActivityIndicator style={{ }} color='#2597CB' />
                <Text style={{ fontSize: 16, color: '#2597CB', fontWeight: 'bold',textAlign:'left',marginRight:10,marginLeft:5 }}>Processing...</Text>
              </View>
            </View>
          }
            </View>

        )
    }
}

const styles = StyleSheet.create({

    active_button: {
        width: '98%',
        height: 45,
        borderBottomColor: '#FCC564',
        borderBottomWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',

    },

    in_active_button: {
        width: '98%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },

    active_text: {
        color: '#FCC564',
        fontSize: 14,
        fontWeight: 'bold'
    },

    in_active_text: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'


    },

})




export default all_pharmacies;