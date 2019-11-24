import React from 'react';
import {StyleSheet, Text,Button, View} from 'react-native';
import Auth from '@aws-amplify/auth'
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { Connect } from "aws-amplify-react-native";
//import * as queries from '../src/graphql/queries';

	const me = `query Me {
          me {
            firstName
            lastName
          }
        }
     `;

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'My Profile',
    };


    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
        }
        this.getProfile();
    }

    async getProfile(){
       const myInfo= await API.graphql(graphqlOperation(me));
        console.log(myInfo.data.me);
        this.setState({firstName: myInfo.data.me.firstName})
        this.setState({lastName: myInfo.data.me.lastName})
    }

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
	    <Text> </Text>
       <Text style={{paddingVertical:100,fontSize:30}}>Welcome {this.state.firstName}! </Text>
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
