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
