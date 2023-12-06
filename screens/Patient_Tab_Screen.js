import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  BackHandler,
  SafeAreaView,
  AsyncStorage,
  AppState,
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Icon,
  Footer,
  FooterTab,
  Badge,
  Right,
  Picker,
  Left,
  Button,
} from 'native-base';

import {connect} from 'react-redux';

import Patient_Home from './Patient_Home';
import Patient_All_Appointment from './Patient_All_Appointment';
import chat from './chat';
import Patient_Profile from './Patient_Profile';

class Patient_Tab_Screen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedbtn: '1',
      name: '',
      id: '',
    };
  }

  backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  };

  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };
  render() {
    let AppComponent = null;

    if (this.state.selectedbtn == '1') {
      AppComponent = Patient_Home;
    }

    if (this.state.selectedbtn == '2') {
      AppComponent = Patient_All_Appointment;
    }
    if (this.state.selectedbtn == '3') {
      AppComponent = chat;
    }
    if (this.state.selectedbtn == '4') {
      AppComponent = Patient_Profile;
    }
    if (this.state.selectedbtn == '5') {
      AppComponent = Patient_Orders;
    }

    return (
      <>
        <StatusBar backgroundColor="white" barStyle="light-content" />
        <View style={styles.container}>
          <Content contentContainerStyle={{flex: 1}}>
            <AppComponent />
          </Content>
          <Footer>
            <FooterTab style={styles.footer}>
              <Button
                vertical
                style={
                  this.state.selectedbtn == '1'
                    ? styles.btnactive
                    : styles.btnsegment
                }
                onPress={() => this.setState({selectedbtn: '1'})}>
                <Icon
                  style={
                    this.state.selectedbtn == '1'
                      ? styles.activeicone
                      : styles.inactiveicone
                  }
                  name="home-sharp"
                  type="Ionicons"
                />
                <Text
                  numberOfLines={1}
                  style={
                    this.state.selectedbtn == '1'
                      ? styles.activeText
                      : styles.inactiveText
                  }>
                  Home
                </Text>
              </Button>
              <Button
                vertical
                style={
                  this.state.selectedbtn == '2'
                    ? styles.btnactive
                    : styles.btnsegment
                }
                onPress={() => this.setState({selectedbtn: '2'})}>
                <Icon
                  style={
                    this.state.selectedbtn == '2'
                      ? styles.activeicone
                      : styles.inactiveicone
                  }
                  name="calendar"
                  type="Entypo"
                />
                <Text
                  numberOfLines={1}
                  style={
                    this.state.selectedbtn == '2'
                      ? styles.activeText
                      : styles.inactiveText
                  }>
                  Appointments
                </Text>
              </Button>
              <Button
                verticalstyle={
                  this.state.selectedbtn == '3'
                    ? styles.btnactive
                    : styles.btnsegment
                }
                onPress={() => this.setState({selectedbtn: '3'})}>
                <Icon
                  style={
                    this.state.selectedbtn == '3'
                      ? styles.activeicone
                      : styles.inactiveicone
                  }
                  name="chatbox"
                  type="Ionicons"
                />
                <Text
                  numberOfLines={1}
                  style={
                    this.state.selectedbtn == '3'
                      ? styles.activeText
                      : styles.inactiveText
                  }>
                  Chat
                </Text>
              </Button>

              <Button
                verticalstyle={
                  this.state.selectedbtn == '4'
                    ? styles.btnactive
                    : styles.btnsegment
                }
                onPress={() => this.setState({selectedbtn: '4'})}>
                <Icon
                  style={
                    this.state.selectedbtn == '4'
                      ? styles.activeicone
                      : styles.inactiveicone
                  }
                  name="user-alt"
                  type="FontAwesome5"
                />
                <Text
                  numberOfLines={1}
                  style={
                    this.state.selectedbtn == '4'
                      ? styles.activeText
                      : styles.inactiveText
                  }>
                  My Profile
                </Text>
              </Button>
            </FooterTab>
          </Footer>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },

  inactiveicone: {
    color: 'lightgray',
    fontSize: 22,
  },
  activeicone: {
    color: '#9d0c0f',
    fontSize: 25,
  },
  footer: {
    backgroundColor: 'white',
    paddingVertical: 3,
  },
  icon: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 40,
    color: 'white',
  },
  name: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 50,
    color: 'white',
  },

  inactiveText: {
    color: 'lightgray',
    fontSize: 11,
    fontWeight: 'bold',
    maxWidth: '100%',
  },
  activeText: {
    color: '#9d0c0f',
    fontSize: 11,
    maxWidth: '100%',
    fontWeight: 'bold',
  },
});

export default Patient_Tab_Screen;
