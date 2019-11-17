import React from 'react';
import {StyleSheet,TouchableHighlight, Alert, Text, TextInput, View} from 'react-native';
import Auth from '@aws-amplify/auth'

export default class SignUpScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            usernaame: '',
            email: '',
            password: '',
        };
    }
    openSignIn = () => {
            this.props.navigation.navigate('SignIn');
    }
    async signUp() {
        const { username, email, password } = this.state;
        const phone_number = username;
        Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
            }
        })
        .then(() => {
            console.log('sign up successful!')
            this.props.navigation.navigate('ConfirmSignUp',{username:username})
        })
        .catch(err => {
            if (! err.message) {
              Alert.alert('Error when signing up: ', err)
            } else {
              Alert.alert('Error when signing up: ', err.message)
            }
        })
    }
	render(){
	return(
		<View style={styles.container}>
		    <TextInput
		        placeholder="Enter your phone number"
		        onChangeText={(username) => this.setState({username})}
		        value={this.state.username}
		    />
		    <TextInput
		        placeholder="Enter your email"
		        onChangeText={(email) => this.setState({email})}
		        value={this.state.email}
		    />
		    <TextInput
		        placeholder="Enter your password"
		        onChangeText={(password) => this.setState({password})}
		        value={this.state.password}
		    />
		    <TouchableHighlight
		        onPress={() => this.signUp()}
		    >
    		    <View>
                    <Text>Sign up</Text>
                </View>
		    </TouchableHighlight>

		    <Text style={{paddingVertical:50}}>
		        already have an account? <Text style={{color:'blue',textDecorationLine:'underline'}}onPress={this.openSignIn}>Click here to sign in</Text>
		    </Text>
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