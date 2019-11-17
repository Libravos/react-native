import React from 'react';
import {StyleSheet, Text,Button, View} from 'react-native';
import Auth from '@aws-amplify/auth'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'My Profile',
    };

    async signOut() {
        await Auth.signOut()
        .then(user => {
          this.props.navigation.navigate('AuthLoading')
        })
        .catch(err => console.log(err));
	}

	render(){
	return(
	<View style={styles.container}>
        <Text style={{paddingVertical:100,fontSize:30}}>User Profile</Text>
        <Button
         title="Sign Out"
            onPress={() => this.signOut()}
        >
        </Button>
     </View>
		);
	}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center"
    }
})
