import React from 'react';
import {StyleSheet,TouchableHighlight, Alert, Text, TextInput, View} from 'react-native';
import Auth from '@aws-amplify/auth'

export default class ConfirmSignUpScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:this.props.navigation.getParam('username',''),
            authCode: '',
        };
    }
    async confirmSignUp() {
        const { username, authCode } = this.state;
        await Auth.confirmSignUp(username, authCode)
        .then(() => {
            console.log('confirm sign up successful!')
            this.props.navigation.navigate('SignIn')
        })
        .catch(err => {
            if (! err.message) {
              Alert.alert('Error when entering confirmation code: ', err)
            } else {
              Alert.alert('Error when entering confirmation code: ', err.message)
            }
        })
    }

    async resendCode() {
        const { username } = this.state
        await Auth.resendSignUp(username)
        .then(() => console.log('Confirmation code resent successfully'))
        .catch(err => {
          if (! err.message) {
            console.log('Error requesting new confirmation code: ', err)
            Alert.alert('Error requesting new confirmation code: ', err)
          } else {
            console.log('Error requesting new confirmation code: ', err.message)
            Alert.alert('Error requesting new confirmation code: ', err.message)
          }
        })
      }


	render(){
	return(
		<View style={styles.container}>
		    <TextInput
		        placeholder="Enter your confirmation code"
		        onChangeText={(authCode) => this.setState({authCode})}
		        value={this.state.authCode}
		    />
		    <TouchableHighlight
		        onPress={() => this.confirmSignUp()}
		    >
    		    <View>
                    <Text>Sign up</Text>
                </View>
		    </TouchableHighlight>
		    <TouchableHighlight
		        onPress={() => this.resendCode()}
		    >
    		    <View>
                    <Text>Resend confirmation code</Text>
                </View>
		    </TouchableHighlight>
		</View>
		);
	}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    }
})