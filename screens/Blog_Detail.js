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
} from 'react-native';
import { Content, Card, CardItem, Thumbnail, Icon, Form, Container, Header, Drawer } from 'native-base'; 
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { Open,Email } from 'react-native-openanything';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height


class Blog_Detail extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
    
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

  }

 
  open_web = () => {
    Open("https://www.mdpi.com/1422-0067/14/10/21087")
  }

  open_web_1 = () => {
    Open("https://www.ncbi.nlm.nih.gov/books/NBK519533/")
  }

  open_web_2 = () => {
    Open("https://www.ncbi.nlm.nih.gov/books/NBK9963/")
  }

  open_web_3 = () => {
    Open("https://www.ncbi.nlm.nih.gov/books/NBK560826/")
  }

  open_web_4 = () => {
    Open("https://doi.org/10.1136/oem.42.10.716")
  }

  open_web_5 = () => {
    Open("https://doi.org/10.1183/09059180.00000814")
  }

  open_web_6 = () => {
    Open("https://doi.org/10.1200/JCO.2004.01.0421")
  }

  open_web_7 = () => {
    Open("https://doi.org/10.1002/ijc.29958")
  }

  open_web_8 = () => {
    Open("https://doi.org/10.1007/s10654-011-9647-5")
  }

  open_web_9 = () => {
    Open("https://doi.org/10.1016/j.suc.2015.05.009")
  }

  render() {


    return (
              <View style={{ flex: 1,backgroundColor:'#38b6ff' }}>
                    


                    {/* <View>
                         <Image style={{width:width,height:height/2.5,}} source={require('../assets/Bloog2.png')} />
                         <View style={{position:'absolute',bottom:80,left:20}}>
                             <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>[H1] Cancer:</Text>
                             <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Everything You Need To Know</Text>
                         </View>
                         <View style={{flexDirection:'row',alignItems:'center',marginTop:5,position:'absolute',bottom:40,left:20}}>
                             <Image style={{ width:30, borderRadius: 100, height:30 }} source={require('../assets/doc4.jpg')} />
                             <Text style={{color:'#b3b3b3',fontSize:12,marginLeft:5}}>Dr. Reymim</Text>
                         </View>
                    </View> */}

                    <View style={{width:width,flexDirection:'row',alignItems:'center',paddingHorizontal:13,paddingVertical:10,justifyContent:'space-between'}}>
                         <Icon onPress={() => { Actions.pop() }} name="keyboard-arrow-left" type="MaterialIcons" style={{ color: "#24C6D2", fontSize: 33 }} />
                         <Text style={{color:'#24C6D2',fontWeight:'bold',fontSize:20}}>Cancer:</Text>
                         <Text style={{color:'#24C6D2',fontWeight:'bold',fontSize:20}}>    </Text>

                    </View>

                    <Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:'center',paddingBottom:10}}>Everything You Need To Know</Text>
                    
                   <ScrollView  style={{paddingVertical:10,backgroundColor:'white',borderTopLeftRadius:40,borderTopRightRadius:40}}>
                         <Text style={{color:'black',fontWeight:'bold',fontSize:20,paddingHorizontal:15,marginTop:10}}>Blog Details</Text>

                         <Text style={{color:'gray',fontSize:17,paddingHorizontal:15,marginTop:10}}>Cancer growths may develop in the body when a cell leaves its normal division cycle and starts its own agenda for proliferation. All the cells produced by these cells' proliferation are also found to display inappropriate cell proliferation. The resulting cancerous growth may be benign or malignant in nature. While the benign tumors remain within their area of origin and do not spread to other parts of the body, the malignant cancers have the potential to spread to other areas. This spread may occur by two common routes: The blood and the lymph. (1)</Text>

                         <Text style={{color:'black',fontSize:17,paddingHorizontal:15,marginTop:10}}>Symptoms of Cancer</Text>
                         <Text style={{color:'gray',fontSize:17,paddingHorizontal:15,marginTop:5}}>Even though the symptoms of cancer are usually specific to the organ or the area of the body that is affected by cancer, certain signs and symptoms may be common to all forms of cancer. </Text>

                         <Text style={{color:'gray',fontSize:16,paddingHorizontal:15,marginTop:5}}>These include:</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Feel excessively tired</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Fatigue, which does not improve after rest</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	A sudden weight loss or weight gain of 5 kgs and more without any apparent reason</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Not feeling hungry</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Difficulty in swallowing</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Stomach ache after eating</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Feeling Nauseous all the time</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Presence of an unusual swelling or lump in the body</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Pain is a part of the body that keeps getting worse without any known reason</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Unusual changes in the skin, like a new mole that may be increasing in size</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Voice changes or a cough that has lasted several months</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Unusual bruises on the skin</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Bleeding from a part of the body, without an apparent reason</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Fever</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Night Sweats</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Pain passing urine</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Vision problems</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Headaches that are getting progressively worse </Text>

                         <Text style={{color:'black',fontSize:17,paddingHorizontal:15,marginTop:10}}>Types of Cancers</Text>
                         <Text style={{color:'gray',fontSize:16,paddingHorizontal:15,marginTop:5}}>The three common types of cancer, which are classified according to their origin cells, include:</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Sarcomas: Sarcomas are a form of cancer that originates from either the muscles, adipose tissues, bone, or blood vessels. (2)</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Carcinomas: Carcinomas are the form of cancer that originates from epithelial cells. These epithelial cells may be located in any part of the body, whether internal organs, gastrointestinal tract, or skin. (3)</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Lymphomas: As the name suggests, the lymphomas originate from the lymph tissues. (4)</Text>

                         <Text style={{color:'black',fontSize:17,paddingHorizontal:15,marginTop:10}}>Hoes Does a Cancer Develop?</Text>
                         <Text style={{color:'gray',fontSize:16,paddingHorizontal:15,marginTop:5}}>The steps involved in cancer development in the body include:</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Cancer initiation: Tumor initiation is caused by alternations in certain genes, leading to an uncontrolled proliferation of the cells. </Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Cancer progression: Cancer progression is the continuation of the increase in canceled cells population that was initiated by the carcinogen. As the cells replicate and produce new descendants, some of the descendants with the mutations become dominant in the tumor cell population. This is known as Clonal selection. </Text>

                         <Text style={{color:'black',fontSize:17,paddingHorizontal:15,marginTop:10}}>Causes of Cancer</Text>
                         <Text style={{color:'gray',fontSize:17,paddingHorizontal:15,marginTop:5}}>The substances which cause cancer are known as Carcinogens. Their role in cancer formation has been proven in both animal and human studies. An example is the chemicals found in cigarette smoke, which predisposes these individuals to a greater risk for lung cancer. However, cancer development has been considered a multi-step process, which means several other factors may play a role during each stage of cancer formation. </Text>

                         <Text style={{color:'black',fontSize:17,paddingHorizontal:15,marginTop:10}}>Cancer Initiating Substances</Text>
                         <Text style={{color:'gray',fontSize:17,paddingHorizontal:15,marginTop:5}}>Exposure of the body cells to radiation can lead to DNA damage and higher chances of mutations. The carcinogens found in radiation ways leading to cell mutations can also be referred to as initiating agents. This is because the mutation is the initial step of cancer formation. These initiating factors include Aflatoxins and tobacco Smoke. Aflatoxins are powerful carcinogens that are found in certain molds. These molds can contaminate food substances like Peanuts if they are not properly stored. On the other hand, the substances found in tobacco smoke that may lead to Cancer formation include the Benzo Alpha Pyrene, Nickle compounds, and dimethylnitrosamine. Exposure to these substances most commonly leads to lung cancer. However, it may also be associated with other cancers like cancer of the pharynx, cancer of the larynx, and cancer of the esophagus. Another example of cancer-inducing substances includes viruses. Studies have shown that certain viruses can lead to the development of cancers like Liver cancer and cervical cancer. (5)</Text>

                         <Text style={{color:'black',fontSize:17,paddingHorizontal:15,marginTop:10}}>Cancer Promoting Substances</Text>
                         <Text style={{color:'gray',fontSize:17,paddingHorizontal:15,marginTop:5}}>Cancer-promoting substances, or cancer promoters, are those compounds that promote cancer cell proliferation rather than inducing mutation. The compounds lead to an increased population of cancerous cells, which allows the outgrowth and spread of cancer all over the body. The examples of cancer promoters that may play an important role during the early stages of cancer development include hormones like Estrogen. Estrogen causes the proliferation of the endometrial cells in the Uterus. High exposure to Estrogen caused by overproduction of this hormone in the body can lead to endometrial cancer. (6)</Text>

                         <Text style={{color:'black',fontSize:17,paddingHorizontal:15,marginTop:10}}>Who is at Risk For Cancer?</Text>

                         <Text style={{color:'black',fontSize:17,paddingHorizontal:15,marginTop:7}}>Based on Race</Text>
                         <Text style={{color:'gray',fontSize:17,paddingHorizontal:15,marginTop:5}}>Individuals belonging to a certain ethnicity or race may be at an increased risk for cancer as compared to others. The factors which may be responsible for these differences include lifestyle, habits, activities, and the particular diet they indulge in. (7). For example, studies have found that individuals living in the United States who belong to an Asian background have a lower risk for cancer than other racial groups. The researchers proposed this difference be caused by their unique genetics and specific environmental and behavioral factors. (8) Data also shows that cancer risk and its associated mortality are different in the African Americans and white populations in the United States. Until the 1970s, African Americans were at equal risk for breast cancer as the white population; however, these mortality rates were found to go much higher afterward. (9) </Text>

                         <Text style={{color:'black',fontSize:17,paddingHorizontal:15,marginTop:7}}>Based On Gender</Text>
                         <Text style={{color:'gray',fontSize:17,paddingHorizontal:15,marginTop:5}}>The risk for the majority of cancer is found to be higher in males as compared to females. These statistics are not only found in a particular country or ethnicity but may be seen in all regions and populations. This was further proven in the International Agency for Research on Cancer data in 2012. (10) It showed that out of 35 different areas of the body which may be affected by cancer, 32 are found to have a higher predominance of cancer in the males. The two types of cancer found to have a particularly high incidence in males include laryngeal and hypophyseal cancer. Males are likely to have a six times more risk for these cancers as compared to females. However, parts of the body where the incidence of cancer is higher in females than males include the Gallbladder, the anus, and thyroid gland. </Text>

                         <Text style={{color:'black',fontSize:17,paddingHorizontal:15,marginTop:10}}>The Importance of Routine Cancer Screening</Text>
                         <Text style={{color:'gray',fontSize:17,paddingHorizontal:15,marginTop:5}}>Routine cancer screening has been considered an essential asset for the prevention of cancer and its early treatment. A routine screening provides a chance for the early detection of cancer while it is in its initial stages. This allows the doctor to immediately start the cancer treatment and prevent it from spreading further and affecting other areas of the body. In addition, screening may not only allow an early cancer treatment but also allow the doctor to catch any premalignant lesion present in the body. These lesions have a high risk of being converted to cancerous growths, and their early removal can prevent cancer initiation in the body. (11) Data shows that cancer detected at its early stages leads to a five-year survival rate of more than 80%. </Text>
                         <Text style={{color:'gray',fontSize:16,paddingHorizontal:15,marginTop:5}}>The cancer screening recommendations made by the majority of health authorities all over the world include:</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Women aged between 50 and 64 years get screening mammography two times a year. While this is mandatory for women belonging to ages above 50, those below 50 do not require it twice a year. However, they are still encouraged to get a mammography screening once a year, especially by the time they have started to reach their 50s.</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Males and females who smoke should get a low-dose lung computed tomography done between 55 to 80 years old. They may not need current smokers to get their timely lung screening done, but this may also be recommended for individuals with a 30-pack per year history of smoking or those who have quit smoking over the past fifteen years. </Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Males with a history of prostate cancer in the family are also recommended to get a prostate screening. This is particularly crucial for males who had their brother or father diagnosed with prostate cancer before they reached 65 years of age. Screening is also stressed in African American males due to their higher risk for prostate cancer. The ideal age to start prostate screening is after 45 years. </Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Adults may also be recommended a stool-based screening done after reaching 50 years of age. This is done as a preventative measure for colon cancer. The individuals may also get screened by undergoing a colonoscopy every ten years, a sigmoidoscopy every five years, or a CT of the colon every five years. </Text>

                         <Text style={{color:'black',fontSize:17,paddingHorizontal:15,marginTop:10}}>Conclusion</Text>
                         <Text style={{color:'gray',fontSize:17,paddingHorizontal:15,marginTop:5}}>Cancer is a condition of the body where the cells start to replicate uncontrollably and may spread to different areas. This may lead to devastating consequences for the individuals affected by it. Common cancer symptoms include weight loss, loss of appetite, nausea, weakness, fatigue, lumps, swellings, and skin changes. Early detection of cancer is considered the key to successful treatment outcomes – which is why screening is recommended. Routine screening can allow an individual to get any precancerous and cancerous growth detected and treated before it worsens or starts affecting other body parts. </Text>

                         <Text style={{color:'black',fontSize:16,paddingHorizontal:15,marginTop:10}}>References:</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20}}>•	Sarkar, S., Horn, G., Moulton, K., Oza, A., Byler, S., Kokolus, S., & Longacre, M. (2013). Cancer development, progression, and therapy: an epigenetic overview. International journal of molecular sciences,</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}>14(10), 21087–21113.</Text>
                         <TouchableOpacity  onPress={() => this.open_web()}>
                               <Text style={{color:'#38b6ff',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}>https://doi.org/10.3390/ijms141021087</Text>
                         </TouchableOpacity>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,marginTop:3}}>•	Popovich JR, Kashyap S, Cassaro S. Sarcoma. [Updated 2021 Jul 17]. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2022 Jan-. Available from:</Text>
                         <TouchableOpacity  onPress={() => this.open_web_1()}>
                               <Text style={{color:'#38b6ff',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}>https://www.ncbi.nlm.nih.gov/books/NBK519533/</Text>
                         </TouchableOpacity>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,marginTop:3}}>•	Cooper GM. The Cell: A Molecular Approach. 2nd edition. Sunderland (MA): Sinauer Associates; 2000. The Development and Causes of Cancer. Available from:</Text>
                         <TouchableOpacity  onPress={() => this.open_web_2()}>
                               <Text style={{color:'#38b6ff',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}>https://www.ncbi.nlm.nih.gov/books/NBK9963/</Text>
                         </TouchableOpacity>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,marginTop:3}}>•	Jamil A, Mukkamalla SKR. Lymphoma. [Updated 2021 Sep 18]. In: StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2022 Jan-. Available from:</Text>
                         <TouchableOpacity  onPress={() => this.open_web_3()}>
                               <Text style={{color:'#38b6ff',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}>https://www.ncbi.nlm.nih.gov/books/NBK560826/</Text>
                         </TouchableOpacity>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,marginTop:3}}>•	Boyland E. (1985). Tumour initiators, promoters, and complete carcinogens. British journal of industrial medicine,</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}> 42(10), 716–718.</Text>
                         <TouchableOpacity  onPress={() => this.open_web_4()}>
                               <Text style={{color:'#38b6ff',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}>https://doi.org/10.1136/oem.42.10.716</Text>
                         </TouchableOpacity>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,marginTop:3}}>•	Kashkin, K. N., Chernov, I. P., Stukacheva, E. A., Kopantzev, E. P., Monastyrskaya, G. S., Uspenskaya, N. Y., & Sverdlov, E. D. (2013). Cancer specificity of promoters of the genes involved in cell proliferation control. Acta naturae, 5(3), 79–83.</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,marginTop:3}}>•	Young, R. P., & Hopkins, R. J. (2014). A review of the Hispanic paradox: time to spill the beans?. European respiratory review : an official journal of the European Respiratory Society,</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}> 23(134), 439–449.</Text>
                         <TouchableOpacity  onPress={() => this.open_web_5()}>
                               <Text style={{color:'#38b6ff',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}>https://doi.org/10.1183/09059180.00000814</Text>
                         </TouchableOpacity>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,marginTop:3}}>•	Jatoi, I., Anderson, W. F., Rao, S. R., & Devesa, S. S. (2005). Breast cancer trends among black and white women in the United States. Journal of clinical oncology : official journal of the American Society of Clinical Oncology,</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}> 23(31), 7836–7841.</Text>
                         <TouchableOpacity  onPress={() => this.open_web_6()}>
                               <Text style={{color:'#38b6ff',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}>https://doi.org/10.1200/JCO.2004.01.0421</Text>
                         </TouchableOpacity>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,marginTop:3}}>•	Jin, H., Pinheiro, P. S., Xu, J., & Amei, A. (2016). Cancer incidence among Asian American populations in the United States, 2009-2011. International journal of cancer,</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}> 138(9), 2136–2145.</Text>
                         <TouchableOpacity  onPress={() => this.open_web_7()}>
                               <Text style={{color:'#38b6ff',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}>https://doi.org/10.1002/ijc.29958</Text>
                         </TouchableOpacity>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,marginTop:3}}>•	Edgren, G., Liang, L., Adami, H. O., & Chang, E. T. (2012). Enigmatic sex disparities in cancer incidence. European journal of epidemiology,</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}> 27(3), 187–196.</Text>
                         <TouchableOpacity  onPress={() => this.open_web_8()}>
                               <Text style={{color:'#38b6ff',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}>https://doi.org/10.1007/s10654-011-9647-5</Text>
                         </TouchableOpacity>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,marginTop:3}}>•	Pinsky P. F. (2015). Principles of Cancer Screening. The Surgical clinics of North America,</Text>
                         <Text style={{color:'gray',fontSize:15,paddingHorizontal:20,fontWeight:'bold'}}> 95(5), 953–966.</Text>
                         <TouchableOpacity  onPress={() => this.open_web_9()}>
                               <Text style={{color:'#38b6ff',fontSize:15,paddingHorizontal:20,fontWeight:'bold',marginBottom:30}}>https://doi.org/10.1016/j.suc.2015.05.009</Text>
                         </TouchableOpacity>


                   </ScrollView>
              

                    {/* <View style={{width:60,height:60,borderRadius:100,justifyContent:'center',alignItems:'center',backgroundColor:'white',position:'absolute',bottom:20,right:20, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 3}}>
                         <Icon name="heart" type="AntDesign" style={{ color: "#f10703", fontSize: 20 }} />
                         <Text style={{color:'black',fontSize:12}}>200</Text>
                    </View> */}
              </View>

)
}}


const mapStateToProps = (state) => {
    return {
      No_Instance_ID_token: state.No_Instance_ID_token,
      An_error_occurred_while_retrieving_token: state.An_error_occurred_while_retrieving_token,
      Please_try_agin_later: state.Please_try_agin_later,
      Home: state.Home,
      Receive_the_care_you_need: state.Receive_the_care_you_need,
      When_you_need_it: state.When_you_need_it,
      Schedule_an_Online: state.Schedule_an_Online,
      Doctor_Appointment: state.Doctor_Appointment,
      View_all: state.View_all,
      Book_and_Appointment: state.Book_and_Appointment,
      Search_by_Specialty: state.Search_by_Specialty,
      Top_Rated_Doctors: state.Top_Rated_Doctors,
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      add_Vehicle: (vehicle) => { dispatch({ type: "add_Vehicle", payload: vehicle }) },
      spanish_lang: (No_Instance_ID_token, An_error_occurred_while_retrieving_token, Please_try_agin_later, Home, Receive_the_care_you_need, When_you_need_it, Schedule_an_Online, Doctor_Appointment, View_all, Book_and_Appointment, Search_by_Specialty, Top_Rated_Doctors) => { dispatch({ type: "spanish_lang", payload: No_Instance_ID_token, An_error_occurred_while_retrieving_token, Please_try_agin_later, Home, Receive_the_care_you_need, When_you_need_it, Schedule_an_Online, Doctor_Appointment, View_all, Book_and_Appointment, Search_by_Specialty, Top_Rated_Doctors }) },
      english_lang: (No_Instance_ID_token, An_error_occurred_while_retrieving_token, Please_try_agin_later, Home, Receive_the_care_you_need, When_you_need_it, Schedule_an_Online, Doctor_Appointment, View_all, Book_and_Appointment, Search_by_Specialty, Top_Rated_Doctors) => { dispatch({ type: "english_lang", payload: No_Instance_ID_token, An_error_occurred_while_retrieving_token, Please_try_agin_later, Home, Receive_the_care_you_need, When_you_need_it, Schedule_an_Online, Doctor_Appointment, View_all, Book_and_Appointment, Search_by_Specialty, Top_Rated_Doctors }) },
      add_Social_User: (social_user) => { dispatch({ type: "add_Social_User", payload: social_user }) },
      // change_counter:(counter)=>{dispatch({type:"change_counter",payload:counter})},
      // // change_counterNO:(counterNO)=>{dispatch({type:"change_counterNO",payload:counterNO})},
      // addservice:(service)=>{dispatch({type:"addservice",payload:service})},
  
  
  
  
  
  
    }
  }
  
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Blog_Detail);