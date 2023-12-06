import React, { Component } from 'react'
import { Text, View,BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import { WebView } from 'react-native-webview';
 

export default class web_View extends Component {

    
    constructor(props) {
        super(props);
      this.WEBVIEW_REF = React.createRef();

        this.state = {

            backButtonEnabled:false,
            url1:'https://clinic.platomedical.com/book/ZHJzd2lmdA==/1577875de2bf46bdaa4cdf99a509b7a8'

        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
         
       
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
     
        navigate('NewScreen');
    }
    handleBackButtonClick() {
 
//     if(this.state.backButtonEnabled) {
//     this.WEBVIEW_REF.current.goBack();

//         return true;
//     }
//     if(this.state.backButtonEnabled==false)
//     {
//    BackHandler.exitApp();
//     }
 
Actions.pop();
    return true;








    }
    render() {
        return (
            
            // <WebView source={{ uri: 'https://cosocialize.com/' }} />



            <WebView



            ref={this.WEBVIEW_REF}
                    source={{
                      uri: this.state.url1
                    }}
            
                    onNavigationStateChange={this.handleWebViewNavigationStateChange}
                    userAgent={"chrome"}
                   />
                  




           
        )
    }

    handleWebViewNavigationStateChange = (newNavState) => {
        
        
        this.setState({
            backButtonEnabled: newNavState.canGoBack,
        });
        const { loading ,url} = newNavState;
        console.log("canGoBack => ",url)
         var pieces = url.split("#");
        console.log("canGoBack1 => ",pieces[1])

        
        if(url == 'https://clinic.platomedical.com/book/ZHJzd2lmdA==/1577875de2bf46bdaa4cdf99a509b7a8')
        {
            console.log("canGoBack => ",url)

            this.setState({
                backButtonEnabled:false,
               
                
               
            })
     
        }

    }
}
