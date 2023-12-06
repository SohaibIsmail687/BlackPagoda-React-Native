import React, {Component} from 'react';
import {useEffect} from 'react';
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
  PermissionsAndroid,
  AsyncStorage,
  Platform,
} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import Splash from './screens/Splash';
import Patient_Login_Screen from './screens/Patient_Login_Screen';
import book_appointment from './screens/book_appointment';
import Patient_SignUp_Screen from './screens/Patient_SignUp_Screen';
import Patient_Tab_Screen from './screens/Patient_Tab_Screen';
import Patient_Home from './screens/Patient_Home';
import Patient_All_Appointment from './screens/Patient_All_Appointment';
import chat from './screens/chat';
import Patient_Profile from './screens/Patient_Profile';
import Chatroom from './screens/Chatroom';
import Doctor_Appointment_Profile from './screens/Doctor_Appointment_Profile';
import payment_done from './screens/payment_done';
import cancel_appointment from './screens/cancel_appointment';
import appointment_checkout from './screens/appointment_checkout';
import Payment_Method from './screens/Payment_Method';
import Payment from './screens/Payment';
import doctor_signup from './screens/doctor_signup';
import Doctor_Profile from './screens/Doctor_Profile';
import Doctor_Tab_Screen from './screens/Doctor_Tab_Screen';
import Docto_All_appointmenst from './screens/Docto_All_appointmenst';
import Doctor_Home from './screens/Doctor_Home';
import patient_site_appointment_detai from './screens/patient_site_appointment_detai';
import doctor_site_appointment_detail from './screens/doctor_site_appointment_detail';
import add_schedulling from './screens/add_schedulling';
import update_doctor_profile from './screens/update_doctor_profile';
import doc_notification from './screens/doc_notification';
import video_done_1 from './screens/video_done_1';
import give_review from './screens/give_review';
import All_sponsored_clinics from './screens/All_sponsored_clinics';
import Doctor_By_Category from './screens/Doctor_By_Category';
import All_Categories from './screens/All_Categories';
import update_patient_profile from './screens/update_patient_profile';
import favourite_doctors from './screens/favourite_doctors';
import Notifications from './screens/Notifications';
import Patient_Wallet from './screens/Patient_Wallet';
import Delete_Account from './screens/Delete_Account';
import video_call from './screens/video_call';
import Patient_Forgot_Screen from './screens/Patient_Forgot_Screen';
import Patient_ChangePassword_Screen from './screens/Patient_ChangePassword_Screen';

console.disableYellowBox = true;

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <SafeAreaView></SafeAreaView>

      <Router>
        <Stack key="root">
          <Scene
            key="Splash"
            component={Splash}
            title="Splash"
            hideNavBar={true}
          />

          {Platform.OS === 'ios' ? (
            <Scene
              key="Patient_Login_Screen"
              component={Patient_Login_Screen}
              title="Patient_Login_Screen"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="Patient_Login_Screen"
              component={Patient_Login_Screen}
              title="Patient_Login_Screen"
              hideNavBar={true}
            />
          )}
          {Platform.OS === 'ios' ? (
            <Scene
              key="Patient_SignUp_Screen"
              component={Patient_SignUp_Screen}
              title="Patient_SignUp_Screen"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="Patient_SignUp_Screen"
              component={Patient_SignUp_Screen}
              title="Patient_SignUp_Screen"
              hideNavBar={true}
            />
          )}
          {Platform.OS === 'ios' ? (
            <Scene
              key="Patient_Tab_Screen"
              component={Patient_Tab_Screen}
              title="Patient_Tab_Screen"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="Patient_Tab_Screen"
              component={Patient_Tab_Screen}
              title="Patient_Tab_Screen"
              hideNavBar={true}
            />
          )}
          <Scene
            key="Patient_Home"
            component={Patient_Home}
            title="Patient_Home"
            hideNavBar={true}
          />
          <Scene
            key="Patient_All_Appointment"
            component={Patient_All_Appointment}
            title="Patient_All_Appointment"
            hideNavBar={true}
          />
          <Scene key="chat" component={chat} title="chat" hideNavBar={true} />
          <Scene
            key="Patient_Profile"
            component={Patient_Profile}
            title="Patient_Profile"
            hideNavBar={true}
          />
          <Scene
            key="Chatroom"
            component={Chatroom}
            title="Chatroom"
            hideNavBar={true}
          />
          <Scene
            key="Doctor_Appointment_Profile"
            component={Doctor_Appointment_Profile}
            title="Doctor_Appointment_Profile"
            hideNavBar={true}
          />
          {Platform.OS === 'ios' ? (
            <Scene
              key="payment_done"
              component={payment_done}
              title="payment_done"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="payment_done"
              component={payment_done}
              title="payment_done"
              hideNavBar={true}
            />
          )}

          <Scene
            key="Payment"
            component={Payment}
            title="Payment"
            hideNavBar={true}
          />

          <Scene
            key="doctor_signup"
            component={doctor_signup}
            title="doctor_signup"
            hideNavBar={true}
          />
          <Scene
            key="Doctor_Profile"
            component={Doctor_Profile}
            title="Doctor_Profile"
            hideNavBar={true}
          />

          <Scene
            key="patient_site_appointment_detai"
            component={patient_site_appointment_detai}
            title="patient_site_appointment_detai"
            hideNavBar={true}
          />

          <Scene
            key="doctor_site_appointment_detail"
            component={doctor_site_appointment_detail}
            title="doctor_site_appointment_detail"
            hideNavBar={true}
          />

          <Scene
            key="cancel_appointment"
            component={cancel_appointment}
            title="cancel_appointment"
            hideNavBar={true}
          />
          <Scene
            key="Payment_Method"
            component={Payment_Method}
            title="Payment_Method"
            hideNavBar={true}
          />
          <Scene
            key="add_schedulling"
            component={add_schedulling}
            title="add_schedulling"
            hideNavBar={true}
          />
          <Scene
            key="book_appointment"
            component={book_appointment}
            title="book_appointment"
            hideNavBar={true}
          />
          <Scene
            key="appointment_checkout"
            component={appointment_checkout}
            title="appointment_checkout"
            hideNavBar={true}
          />
          {Platform.OS === 'ios' ? (
            <Scene
              key="payment_done"
              component={payment_done}
              title="payment_done"
              hideNavBar={true}
              type={'reset'}
            />
          ) : (
            <Scene
              key="payment_done"
              component={payment_done}
              title="payment_done"
              hideNavBar={true}
              type={'reset'}
            />
          )}
          {Platform.OS === 'ios' ? (
            <Scene
              key="Doctor_Tab_Screen"
              component={Doctor_Tab_Screen}
              title="Doctor_Tab_Screen"
              hideNavBar={true}
              type={'replace'}
            />
          ) : (
            <Scene
              key="Doctor_Tab_Screen"
              component={Doctor_Tab_Screen}
              title="Doctor_Tab_Screen"
              hideNavBar={true}
            />
          )}
          <Scene
            key="Docto_All_appointmenst"
            component={Docto_All_appointmenst}
            title="Docto_All_appointmenst"
            hideNavBar={true}
          />

          <Scene
            key="Doctor_Home"
            component={Doctor_Home}
            title="Doctor_Home"
            hideNavBar={true}
          />
          <Scene
            key="update_doctor_profile"
            component={update_doctor_profile}
            title="update_doctor_profile"
            hideNavBar={true}
          />
          <Scene
            key="doc_notification"
            component={doc_notification}
            title="doc_notification"
            hideNavBar={true}
          />
          <Scene
            key="video_done_1"
            component={video_done_1}
            title="video_done_1"
            hideNavBar={true}
          />
          <Scene
            key="give_review"
            component={give_review}
            title="give_review"
            hideNavBar={true}
          />
          <Scene
            key="All_sponsored_clinics"
            component={All_sponsored_clinics}
            title="All_sponsored_clinics"
            hideNavBar={true}
          />
          <Scene
            key="Doctor_By_Category"
            component={Doctor_By_Category}
            title="Doctor_By_Category"
            hideNavBar={true}
          />
          <Scene
            key="All_Categories"
            component={All_Categories}
            title="All_Categories"
            hideNavBar={true}
          />
          <Scene
            key="update_patient_profile"
            component={update_patient_profile}
            title="update_patient_profile"
            hideNavBar={true}
          />
          <Scene
            key="favourite_doctors"
            component={favourite_doctors}
            title="favourite_doctors"
            hideNavBar={true}
          />
          <Scene
            key="Notifications"
            component={Notifications}
            title="Notifications"
            hideNavBar={true}
          />
          <Scene
            key="Patient_Wallet"
            component={Patient_Wallet}
            title="Patient_Wallet"
            hideNavBar={true}
          />
          <Scene
            key="Delete_Account"
            component={Delete_Account}
            title="Delete_Account"
            hideNavBar={true}
          />
          <Scene
            key="video_call"
            component={video_call}
            title="video_call"
            hideNavBar={true}
          />
          <Scene
            key="Patient_Forgot_Screen"
            component={Patient_Forgot_Screen}
            title="Patient_Forgot_Screen"
            hideNavBar={true}
          />
          <Scene
            key="Patient_ChangePassword_Screen"
            component={Patient_ChangePassword_Screen}
            title="Patient_ChangePassword_Screen"
            hideNavBar={true}
          />
        </Stack>
      </Router>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
