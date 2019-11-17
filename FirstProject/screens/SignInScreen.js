import React from 'react';
import {StyleSheet,TouchableHighlight, Alert, Text, TextInput, View} from 'react-native';
import Auth from '@aws-amplify/auth'

export default class SignInScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            usernaame: '',
            password: '',
        };
    }
    async signIn() {
        const { username, password } = this.state;
        await Auth.signIn(username, password)
        .then(user => {
          this.setState({user})
          console.log('user logged in')
          this.props.navigation.navigate('AuthLoading')
        })
        .catch(err => {
          if (! err.message) {
            console.log('Error when signing in: ', err)
            Alert.alert('Error when signing in: ', err)
          } else {
            console.log('Error when signing in: ', err.message)
            Alert.alert('Error when signing in: ', err.message)
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
		        placeholder="Enter your password"
		        onChangeText={(password) => this.setState({password})}
		        value={this.state.password}
		    />
		    <TouchableHighlight
		        onPress={() => this.signIn()}
		    >
    		    <View>
                    <Text>Sign in</Text>
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