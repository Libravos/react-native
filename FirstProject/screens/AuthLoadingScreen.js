import React from 'react';
import {StyleSheet, ActivityIndicator,Text,View} from 'react-native';
import Auth from '@aws-amplify/auth'

export default class AuthLoadingScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userToken: null
        };
    }
    async componentDidMount () {
        console.log('loading')
        await this.loadApp()
    }

    loadApp = async () => {
        await Auth.currentAuthenticatedUser()
        .then(user => {
          this.setState({userToken: user.signInUserSession.accessToken.jwtToken})
        })
        .catch(err => console.log(err))
        /*if(this.state.userToken){
            let userProfile;
            Auth.currentAuthenticatedUser({
                bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
            }).then(user =>
            {
            console.log(user.attributes.phone_number)
            userProfile = user.attributes.phone_number;
            })
            .catch(err => console.log(err));
            this.props.navigation.navigate('App',{phone_number,userProfile})
        }
        else*/
        this.props.navigation.navigate(this.state.userToken ? 'App' : 'Auth')
    }

	render(){
	return(
		<View style={styles.container}>
		    <Text style={styles.text}> Logging in </Text>
			<ActivityIndicator />
		</View>
		);
	}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        paddingVertical:10
    }
})
