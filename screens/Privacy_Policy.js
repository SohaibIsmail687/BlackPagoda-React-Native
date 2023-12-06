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


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

 
 export default class Privacy_Policy extends Component {

  constructor(props) {

    super(props)

    this.state = {
    }
  }



  backAction = () => {
    // BackHandler.exitApp()
    // Actions.Roll_Screen()
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
  }
 

 
  render() {

 
    return (

        <View style={{flex:1,backgroundColor:'white'}}>

            <View style={{ width: width / 1, flexDirection: 'row', alignItems: 'center', elevation: 3, backgroundColor: "#38b6ff", paddingVertical: 18, paddingHorizontal: 15 }}>
                <Icon onPress={() => Actions.pop()} name="arrowleft" type="AntDesign" style={{color:'white',fontSize:25}}/>
                <Text style={{ color: 'white', fontSize: 20, marginLeft: 15, fontWeight: 'bold' }}>Privacy Policy</Text>
            </View>

            <ScrollView>

            <Text style={{color:'#38b6ff',fontWeight:'bold',fontSize:25,paddingHorizontal:15,marginTop:20}}>Privacy & Policy</Text>
            {/* <Text style={{color:'black',fontSize:13,paddingHorizontal:15,marginTop:10}}>Please select which terms you want to see.</Text>

            <View style={{width:width/1.1,alignSelf:'center',backgroundColor:'#f5f7f9',borderRadius:10,marginTop:30}}>
                <TextInput style={{color:'black',height:45,paddingLeft:15}} placeholder='Privacy' placeholderTextColor='#a9a9a9'/>
                <Icon name="down" type="AntDesign" style={{ color: "black", fontSize: 18,position:'absolute',right:14,top:14 }} />
            </View>

            <Text style={{color:'black',fontWeight:'bold',fontSize:15,marginLeft:15,marginTop:20}}>Data Privacy</Text>

            <Text style={{color:'black',fontWeight:'600',fontSize:14,marginLeft:15,marginTop:20}}>Lorem ipsum dolor sit amet</Text>
            <Text style={{color:'black',fontSize:12,paddingHorizontal:15,marginTop:10}}>Consectetur adipiscing elit. Duis viverra tellus elementum pretium pharetra. Suspendisse nec tellus consequat, efficitur nulla quis, rhoncus neque. Fusce a nulla vitae lectus euismod vehicula.</Text>
            <Text style={{color:'black',fontSize:12,paddingHorizontal:15,marginTop:10}}>Vivamus interdum, urna at convallis congue, tellus justo molestie sem, ac elementum felis ipsum ac ante. Maecenas eu consectetur nisl. Ut quis sodales justo. Maecenas non scelerisque neque. Mauris sed nibh nec nulla sodales consequat at id magna.</Text>

            <View style={{width:width/1.1,alignSelf:'center',borderWidth:2,borderColor:'#f5f7f9',marginVertical:30}}></View>

            <Text style={{color:'black',fontWeight:'600',fontSize:14,marginLeft:15}}>Lorem ipsum dolor sit amet</Text>
            <Text style={{color:'black',fontSize:12,paddingHorizontal:15,marginTop:10}}>Consectetur adipiscing elit. Duis viverra tellus elementum pretium pharetra. Suspendisse nec tellus consequat, efficitur nulla quis, rhoncus neque. Fusce a nulla vitae lectus euismod vehicula.</Text>
            <Text style={{color:'black',fontSize:12,paddingHorizontal:15,marginTop:10,marginBottom:20}}>Vivamus interdum, urna at convallis congue, tellus justo molestie sem, ac elementum felis ipsum ac ante. Maecenas eu consectetur nisl. Ut quis sodales justo. Maecenas non scelerisque neque. Mauris sed nibh nec nulla sodales consequat at id magna.</Text> */}

            <Text style={{color:'black',paddingHorizontal:15,marginTop:10,fontSize:13, textAlign: 'justify'}}>This Patient Solution, INC. Privacy Notice describes how we collect and use your personal information in relation to Patient Solution, INC. websites, products, services, and events that reference this Privacy Notice (together, “Patient Solution, INC. Offerings”). This Privacy Notice does not apply to the “content” processed, stored, or hosted by our customers using Patient Solution, INC. Offerings in connection with a Patient Solution, INC. account. This Privacy Notice also does not apply to any products, services, websites, or content that are offered by third parties or have their own privacy notice.</Text>

            <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingHorizontal:15,marginTop:10,textAlign: 'justify'}}>1. WHO WE ARE</Text>
            <Text style={{color:'black',paddingHorizontal:15,marginTop:5,fontSize:13,textAlign: 'justify'}}>We are a healthcare enthusiasts who share a collective passion for improving how primary care is delivered to patients.Our address is: Patient Solution, INC. _____________________.</Text>

            <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingHorizontal:15,marginTop:10,textAlign: 'justify'}}>2. INQUIRIES REGARDING HEALTH INFORMATION</Text>
            <Text style={{color:'black',paddingHorizontal:15,marginTop:5,fontSize:13,textAlign: 'justify'}}>We do not directly collect, use or disclose personal health information that is protected by law (PHI). We provide technical services for companies who provide services to individuals, healthcare professionals, companies and institutions. If you have an inquiry about the collection, use or disclosure of PHI by one of our customers, please contact them directly.</Text>
           
           <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingHorizontal:15,marginTop:10,textAlign: 'justify'}}>3. PERSONAL INFORMATION WE COLLECT</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:5,fontSize:13,textAlign: 'justify'}}>We collect your personal information in the course of providing Patient Solution, INC. Offerings to you. Here are the types of information we gather:</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:3,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Information You Give Us: We collect any information you provide in relation to Patient Solution, INC. Offerings.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Automatic Information: We automatically collect certain types of information when you interact with Patient Solution, INC. Offerings.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Information from Other Sources: We might collect information about you from other sources, including service providers, partners, and publicly available sources.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	When you use this website, we may collect the following personal information:</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Name</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Email address</Text>
	         <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Phone number</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Your Credit Card Information</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Your Bank Account Information</Text>
	         <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Your company and information about it</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	IP address, technical information about your browser, how you arrived at the site,</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:20,textAlign: 'justify'}}>where you clicked and amount of time spent on pages</Text>

           <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingHorizontal:15,marginTop:10,textAlign: 'justify'}}>4. HOW WE USE PERSONAL INFORMATION</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:5,fontSize:13,textAlign: 'justify'}}>We use your personal information to operate, provide, and improve Patient Solution, INC.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,textAlign: 'justify'}}>Offerings. Our purposes for using personal information include:</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:3,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Provide Patient Solution, INC. Offerings: We use your personal information to provide and deliver Patient Solution, INC. Offerings and process transactions related to Patient Solution, INC. Offerings, including registrations, subscriptions, purchases, and payments.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Measure, Support, and Improve Patient Solution, INC. Offerings: We use your personal information to measure use, analyze performance, fix errors, provide support, improve, and develop the Patient Solution, INC. Offerings.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Comply with Legal Obligations: In certain cases, we have a legal obligation to collect, use, or retain your personal information. For example, we collect contact information required for compliance notifications.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Communicate with You: We use your personal information to communicate with you in relation to Patient Solution, INC. Offerings via different channels (e.g., by phone, email, chat) and to respond to your requests.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Marketing: We use your personal information to market and promote Patient Solution, INC. Offerings.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Purposes for Which We Seek Your Consent: We may also ask for your consent to use your personal information for a specific purpose that we communicate to you.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,textAlign: 'justify'}}>g. To enable our systems to recognize your browser or device and to provide Patient Solution, INC. Offerings to you, we use cookies. For more information about cookies and how we use them, please read our Cookies Notice.</Text>

           <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingHorizontal:15,marginTop:10,textAlign: 'justify'}}>5. HOW WE SHARE PERSONAL INFORMATION</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:5,fontSize:13,textAlign: 'justify'}}>Information about our customers is an important part of our business and we are not in the business of selling our customers’ personal information to others. We share personal information only as described below:</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:3,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Transactions Involving Third Parties: We make available to you services, software, and content provided by third parties for use on or through Patient Solution, INC. Offerings. You can tell when a third party is involved in your transactions, and we share information related to those transactions with that third party.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Third-Party Service Providers: We employ other companies and individuals to perform functions on our behalf. Examples include: sending communications, processing payments, analyzing data, providing marketing and sales assistance (including advertising and event management), conducting customer relationship management. These third-party service providers have access to personal information needed to perform their functions, but may not use it for other purposes. Further, they must process that information in accordance with this Privacy Notice and as permitted by applicable data protection law.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Protection of Us and Others: We release account and other personal information when we believe release is appropriate to comply with the law, enforce or apply our terms and other agreements, or protect the rights, property, or security of Patient Solution, INC., our customers, or others.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	At Your Option: Other than as set out above, you will receive notice when personal information about you might be shared with third parties, and you will have an opportunity to choose not to share the information.</Text>

           <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingHorizontal:15,marginTop:10,textAlign: 'justify'}}>6. LOCATION OF PERSONAL INFORMATION</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:5,fontSize:13,textAlign: 'justify'}}>We are located in ________, and our affiliated companies are located throughout the world. Depending on the scope of your interactions with Patient Solution, INC. Offerings, your personal information may be stored in or accessed from multiple countries, including _______.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,textAlign: 'justify'}}>Whenever we transfer personal information to other jurisdictions, we will ensure that the information is transferred in accordance with this Privacy Notice and as permitted by applicable data protection laws.</Text>

           <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingHorizontal:15,marginTop:10,textAlign: 'justify'}}>7. HOW WE SECURE INFORMATION</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:5,fontSize:13,textAlign: 'justify'}}>At Patient Solution, INC., security is our highest priority. We design our systems with your security and privacy in mind;</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:3,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	We maintain a wide variety of compliance programs that validate our security controls.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	We protect the security of your information during transmission to or from Patient Solution, INC. website, products, or services by using encryption protocols and software.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	We carefuly handle credit card data as per industry Standards.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	We maintain physical, electronic, and procedural safeguards in connection with the</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>collection, storage, and disclosure of personal information. Our security procedures mean that we may request proof of identity before we disclose personal information to you.</Text>

           <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingHorizontal:15,marginTop:10,textAlign: 'justify'}}>8. ACCESS AND CHOICE</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:5,fontSize:13,textAlign: 'justify'}}>You can view, update, and delete certain information about your account and your interactions with Patient Solution, INC. Offerings. If you cannot access, update, or delete your information yourself, you can always contact us for assistance.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,textAlign: 'justify'}}>You have choices about the collection and use of your personal information. You can choose not to provide certain information, but then you might not be able to take advantage of certain Patient Solution, INC. Offerings.</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:3,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Account Information: If you want to add, update, or delete information related to your account, please go to the Patient Solution, INC. Dashboard.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	Communications: If you do not want to receive promotional messages from us, please unsubscribe or adjust your communication preferences in the Patient Solution, INC. Dashboard or by using the links at the bottom of promotional messages.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,textAlign: 'justify'}}>c. Browser and Devices: The Help feature on most browsers and devices will tell you how to prevent your browser or device from accepting new cookies, how to have the browser notify you when you receive a new cookie, or how to disable cookies altogether.</Text>

           <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingHorizontal:15,marginTop:10,textAlign: 'justify'}}>9. YOUR RIGHTS</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:5,fontSize:13,textAlign: 'justify'}}>Subject to applicable law, you have the right to:</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:3,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	ask whether we hold personal information about you and request copies of such personal information and information about how it is processed;</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	request that inaccurate personal information is corrected;</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	request deletion of personal information that is no longer necessary for the purposes underlying the processing, processed based on withdrawn consent, or processed in non-compliance with applicable legal requirements; and</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	lodge a complaint with us regarding our practices related to your personal information.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginLeft:10,textAlign: 'justify'}}>•	You can exercise your rights of access, rectification, erasure, restriction, or complaint by contacting us. If you wish to do any of these things and you are a Patient Solution, INC. customer, please contact us. If you are not a Patient Solution, INC. customer, please contact us at the address stated under Notice and Revisions above.</Text>

           <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingHorizontal:15,marginTop:10,textAlign: 'justify'}}>10. RETENTION OF PERSONAL INFORMATION</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:5,fontSize:13,textAlign: 'justify'}}>We keep your personal information to enable your continued use of Patient Solution, INC. Offerings, for as long as it is required in order to fulfill the relevant purposes described in this Privacy Notice, as may be required by law (including for tax and accounting purposes), or as otherwise communicated to you. How long we retain specific personal information varies depending on the purpose for its use, and we will delete your personal information in accordance with applicable law.</Text>
           
           <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingHorizontal:15,marginTop:10,textAlign: 'justify'}}>11. CONTACTS, NOTICES, AND REVISIONS</Text>
           <Text style={{color:'black',paddingHorizontal:15,marginTop:5,fontSize:13,textAlign: 'justify'}}>If you have any concerns about privacy at Patient Solution, INC., please contact us with a thorough description, and we will try to resolve it. You may also contact us at the address: Patient Solution, INC., ___________________________.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,textAlign: 'justify'}}>If you interact with Patient Solution, INC. Offerings on behalf of or through your organization, then your personal information may also be subject to your organization’s privacy practices, and you should direct privacy inquiries to your organization.</Text>
           <Text style={{color:'black',paddingHorizontal:15,fontSize:13,marginBottom:40,textAlign: 'justify'}}>Our business changes constantly, and our Privacy Notice may also change. You should check our website frequently to see recent changes. You can see the date on which the latest version of this Privacy Notice was posted. Unless stated otherwise, our current Privacy Notice applies to all personal information we have about you and your account. We stand behind the promises we make, however, and will never materially change our policies and practices to make them less protective of personal information collected in the past without informing affected customers and giving them a choice.</Text>

            </ScrollView>
        </View>

)
}}