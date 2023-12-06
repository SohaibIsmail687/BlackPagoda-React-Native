import { Row } from 'native-base';
import React, { Component } from 'react';
import { connect } from "react-redux";
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
import ImageLoad from 'react-native-image-placeholder';
import StarRating from 'react-native-star-rating';
 
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

class All_Articles extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      text1: 2,
      text2: 1,
      text3: 1,
      text4: 1,
      text5: 1,
      text6: 1,
      text7: 1,
      text8: 1,
      text9:1,
      skalton1:true,




      text10:2,
      text11:1,
      text12:1,
      text13:1,
      text14:1,
      text15:1,
      text16:1,
      text17:1,
      text18:1,


text19:2,
text20:1,
text21:1,
text22:1,
text23:1,
text24:1,
text25:1,


      data5: [],
      data4:[],
      skalton:true,
      fav_image:null,
      check_design:'Newest',
      search:false,
      count_doctor:0,
      filter_category:'All',
      filter_rating:'All'
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

    let user = await AsyncStorage.getItem('customer');

   
    let parsed = JSON.parse(user);
    let name = parsed[0].name;
    let id = parsed[0].id;


    this.setState({
      name: name,
      id: id,
      search:this.props.search

    })

    this.doctors_all_fav()

  }
 

  doctors_all_fav = () => {
    

    // let uploaddata = new FormData();


 

    this.setState({
      skalton:true
    })



    let api = Connection + "rest_apis.php?action=all_banners";
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

        
        // ORDER BY r.id DESC LIMIT 1

        let table = [];
        let record = response.response
        console.log('mondddddddddddayyyyyyyyyy', record)

        let len = record.length;

   if (record != 'fail') {


   

    this.setState({
      data5: record,
      data4: record,

      skalton: false,
      skalton1:false
  })
  } else {
    this.setState({
      data5: [],
      skalton: false,
      skalton1:false
  })
  }

        // if (record != 'fail') {



        //   this.setState({
        //     data5: record
        //   })




        // }

      })
      .catch((error) => {
        console.error(error);
      });

  };



  doctors_category_fav = (val) => {
    

    let uploaddata = new FormData();


 

    this.setState({
      skalton:true
    })

    uploaddata.append("category", val);


    let api = Connection + "rest_apis.php?action=baner_by_category";
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

        
        // ORDER BY r.id DESC LIMIT 1

        let table = [];
        let record = response.response
        console.log('mondddddddddddayyyyyyyyyy', record)

        let len = record.length;

   if (record != 'fail') {


   

    this.setState({
      data5: record,
      skalton: false
  })
  } else {
    this.setState({
      data5:  [],
      skalton: false
    })
  }

        // if (record != 'fail') {



        //   this.setState({
        //     data5: record
        //   })




        // }

      })
      .catch((error) => {
        console.error(error);
      });

  };


  changebtn(value, val) {
 
    if(val=='Newest'){
      this.doctors_all_fav()
    } else {
      this.doctors_category_fav(val)
    }
   
    if (this.state[value] == 2) {
  
  
  
        this.setState({
            text1: 1,
            text2: 1,
            text3: 1,
            text4: 1,
            text5: 1,
            text6: 1,
            text7: 1,
            text8: 1,
          text9: 1,
  
  
  
  
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
          text7: 1,
          text8: 1,
          text9: 1,
            [value]: 2,
  
  
        })
  
    }
    this.setState({
        check_design: val,
        name1:'',
        found:false
  
    })
   
  }
  
  



  createtable2 = () => {
    let table = []

    let record1 = this.state.data5
    let len = record1.length
    if (record1 != 'fail') {
        for (let i = 0; i < len; i++) {



            let name = record1[i].name
            let profile1 = record1[i].image

            let profile = Connection + 'images/' + profile1
            // console.log("aaaaaaaaaaaaa", profile);


            let description = record1[i].description
            let category = record1[i].category
            let date = record1[i].date


            let ss = date.split(' ');
            let date_1 = ss[0]
            let time_1 = ss[1]




            table.push(<View>
                {

<TouchableOpacity activeOpacity={0.8} onPress={() => { Actions.Articles_Profile({date:date_1,name1:name,description:description,profile:profile,category:category}) }}
              style={{flexDirection:'row',alignItems:'center',width:width/1-50,alignSelf:'center',marginTop:15}}>
              {/* <Image style={{ width: 90, height: 100, borderRadius: 15}} source={require('../assets/covid.jpg')} /> */}
            
              <ImageLoad

style={{ width: 90, height: 100, borderRadius: 15}} 
                  loadingStyle={{ size: 'large', color: 'blue' }}
                  source={{ uri: profile }}
                  borderRadius={15}

                  placeholderStyle={{ width: 90, height: 100, borderRadius: 15}} 

                />
              <View style={{width:'70%',marginLeft:10}}>
                  <Text style={{color:'gray',fontSize:12}}>{date_1}</Text>
                  <Text numberOfLines={3} style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:2}}>{name}</Text>
                  <View style={{paddingHorizontal:6,paddingVertical:3,backgroundColor:'#c2ecfc',marginTop:3,alignSelf:'flex-start',borderRadius:5}}>
                      <Text style={{color:'#007fff',fontSize:13}}>{category}</Text>
                  </View>
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






show_Serach=()=>{
  this.setState({
    search:true
  })
}





Serach_doctor = (val) => {
  this.setState({ skalton: true, })


  let uploaddata = new FormData();

  console.log('name', val);
  let name1 = val['name']
  console.log('name1name1name1name1', name1);
  this.setState({
    name1:name1
  })
if(this.state.check_design=='Newest') {


uploaddata.append('name', name1);
  
 
uploaddata.append('category_search',"false");

} else {
  uploaddata.append('name', name1);
  

 
  uploaddata.append('category',this.state.check_design);
uploaddata.append('category_search',"true");

}
  // this.setState({ spinner: true });
  
 
  
  //  uploaddata.append('comment',this.state.comment);


  let api = Connection + 'rest_apis.php?action=search_banner';
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
          console.log("response", response.response)

          let record = response.response;
      
          if (record != 'fail') {
            let len = record.length
            
           
              this.setState({
                data5: record,
                  skalton: false,
                  count_doctor:len,
                  found:true
                  
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
                data5: [],
                  skalton: false,
                  found:true,
                  count_doctor:0,


              })
          }

      })
      .catch((error) => {
          console.error(error);
      });

}





  
hide_search=()=>{
  this.setState({
    search:false,
    found:false,
    name1:'',
    text1:2,
    text2:1,
    text3:1,
    text4:1,
    text5:1,
    check_design:'Newest'



  })
  this.doctors_all_fav()
  }
  
 
  render() {
  

    return (
      <View style={{ flex: 1,backgroundColor:'white'}}>

<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, backgroundColor: '#24C6D2', paddingHorizontal: 15, }}>
                    <Icon onPress={() => Actions.pop()} name="arrow-back" type="MaterialIcons" style={{ color: "white", fontSize: 24 }} />


                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>All Articles</Text>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', }}>    </Text>

                </View>
 {/* {this.state.search==false?
                 

                 <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, width: width }}>
                 <Icon onPress={() => { Actions.pop() }} name="arrowleft" type="AntDesign" style={{ color: "black", fontSize: 23}} />
                 <Text style={{ color: 'black', fontSize: 18, fontWeight: '700', width: '70%' }} numberOfLines={1}>Articles</Text>
                 <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                      <Icon onPress={()=>this.show_Serach()} name="search-outline" type="Ionicons" style={{ color: "gray", fontSize: 23 }} />
                      <Icon name="dots-horizontal-circle-outline" type="MaterialCommunityIcons" style={{ color: "gray", fontSize: 23,marginLeft:15 }} />
                 </View>
              </View>

                 :

                 
       <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:20,marginTop:25,marginBottom:15,justifyContent:'space-between',width:width}}>
       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
       <Icon onPress={() => { Actions.pop() }} name="arrowleft" type="AntDesign" style={{ color: "black", fontSize: 23}} />


           <View style={{ width: '90%', height: 45,  alignSelf: 'center' }}>

           <TextInput value={this.state.name1}  onChangeText={name => this.Serach_doctor({ name })} style={{ width: '100%', alignSelf: 'center', backgroundColor: '#eef3ff', height: 50, borderRadius: 10, paddingHorizontal: 15, color: 'black' }} placeholder="Search" placeholderTextColor='gray'/>
        <Icon   name="search-outline" type="Ionicons" style={{ color: '#007fff', fontSize: 20, position: 'absolute', top: 15, right: 24 }} />
       </View>
       </View>

    </View>
                } */}
          
  
  
{/*   
           <View style={{flexDirection:'row',alignItems:'center',marginTop:10,marginHorizontal:12}}>
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => this.changebtn("text1", 'Newest')}  style={(this.state.text1 == 1 ? styles.in_active_button : styles.active_button)}>
                <Text style={(this.state.text1 == 1 ? styles.in_active_text : styles.active_text)}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.changebtn("text2", 'Mental Health')}  style={(this.state.text2 == 1 ? styles.in_active_button : styles.active_button)}>
                <Text style={(this.state.text2 == 1 ? styles.in_active_text : styles.active_text)}>Mental Health</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.changebtn("text3", 'Behaviroal Health')}  style={(this.state.text3 == 1 ? styles.in_active_button : styles.active_button)}>
                <Text style={(this.state.text3 == 1 ? styles.in_active_text : styles.active_text)}>Behaviroal Health</Text>
            </TouchableOpacity>
 
          
          </ScrollView>
           </View> */}
           



           {this.state.search == true && this.state.found==true &&
  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:18,marginVertical:15}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:15}}>{this.state.count_doctor} found</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>this.hide_search()} style={{flexDirection:'row',alignItems:'center'}}>
                 <Text style={{color:'#007fff',fontSize:13,marginRight:5}}>Default</Text>
                 <Icon name="filter" type="AntDesign" style={{ color: '#007fff', fontSize: 15 }} />
            </TouchableOpacity>
        </View>
  }
       


           {this.state.skalton == true ?


<SkeletonPlaceholder>
  <View
    style={{
      width: "90%",
      alignSelf: "center",
      height: 90,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
      backgroundColor: 'white'
    }}
  ></View>

  <View
    style={{
      width: "90%",
      alignSelf: "center",
      height: 90,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
      backgroundColor: "white",
    }}
  ></View>


  <View
    style={{
      width: "90%",
      alignSelf: "center",
      height: 90,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
      backgroundColor: "white",
    }}
  ></View>



  <View
    style={{
      width: "90%",
      alignSelf: "center",
      height: 90,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
      backgroundColor: "white",
    }}
  ></View>


  <View
    style={{
      width: "90%",
      alignSelf: "center",
      height: 90,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
      backgroundColor: "white",
    }}
  ></View>


  <View
    style={{
      width: "90%",
      alignSelf: "center",
      height: 90,
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
      height: 90,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 20,
      backgroundColor: "white",
    }}
  ></View>


</SkeletonPlaceholder>
:

<ScrollView >
  {this.state.data5 == "" ?
    <View style={{ alignItems: 'center', justifyContent: 'center', height: height / 1.5 }}>
      <Text style={{color:'black'}}>No articles found</Text>
    </View>
    :
    <View style={{ paddingBottom: 20, paddingHorizontal: 15, marginTop: 10 }}>
      {this.createtable2()}
    </View>
  }
</ScrollView>
}




 

         
          
      </View>

    )
  }}

 
  const styles = StyleSheet.create({

    active_button: {
      paddingHorizontal:25,paddingVertical:6,justifyContent:'center',alignItems:'center',borderRadius:100,marginLeft:6,marginRight:6,borderWidth:1.5,borderColor:'#007fff',backgroundColor:'#007fff'
    },

    in_active_button: {
      paddingHorizontal:25,paddingVertical:6,justifyContent:'center',alignItems:'center',borderRadius:100,marginLeft:6,marginRight:6,borderWidth:1.5,borderColor:'#007fff'
    },

    active_text: {
      color:'white',fontWeight:'bold'
        
    },

    in_active_text: {
      color: '#007fff', fontWeight: 'bold',
    },












    active_button_r: {
      paddingHorizontal: 20, height: 28, borderRadius: 14, backgroundColor: '#007fff', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginHorizontal: 5
  },

  in_active_button_r: {
      paddingHorizontal: 20, height: 28, borderRadius: 14, borderColor: '#007fff', borderWidth: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginHorizontal: 5
  },

  active_text_r: {
      color: 'white', fontWeight: 'bold', fontSize: 14, marginLeft: 5
      
  },

  in_active_text_r: {
      color: '#007fff', fontWeight: 'bold', fontSize: 12, marginLeft: 5
  },
  active_icon_r:{
      color: "white", fontSize: 14 
  },in_active_icon_r:{
      color: "#007fff", fontSize: 14 
  }
})
  
  
  const mapStateToProps = (state) => {
    return {
        Choose_an_action: state.Choose_an_action,
  
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
      spanish_lang: (Choose_an_action) => { dispatch({ type: "spanish_lang", payload: Choose_an_action }) },
      english_lang: (Choose_an_action) => { dispatch({ type: "english_lang", payload: Choose_an_action }) },
      add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
      // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
      // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
      // addservice:(service)=>{dispatch({type:"addservice",payload:service})},
 
  
    }
  }
  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(All_Articles);