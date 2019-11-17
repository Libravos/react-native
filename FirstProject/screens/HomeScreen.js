import React from 'react';
import {StyleSheet, Text,TouchableHighlight, View, Image,SafeAreaView,ScrollView} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Dashboard',
    };

	render(){
	return(
		<SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
    		    <Text style={{paddingTop:40, fontSize:40}}> Welcome! </Text>
    		    <Text style={{paddingHorizontal:40, paddingVertical:10, fontSize:15}}>Libravos is still being constructed, but heres a mockup of the future design:</Text>
                <Image
                    style={{width: 400}}
                    source={require('../assets/images/mockup.png')}
                />
                </View>
            </ScrollView>
        </SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center"
    }
})
