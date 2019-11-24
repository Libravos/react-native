import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default class ChatScreen extends React.Component {
  state = {
    messages: [],
    num_responses: 1
  }

  componentWillMount() {
    const response_num = this.state.num_responses
    this.setState({
      messages: [
        {
          _id: response_num,
          text: 'Welcome to Libravos! Im Elias, how can I help you today (file a claim, learn about premiums, etc.)',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

//[{"_id": "b03637f6-8645-4a67-8174-27c5a634ae28", "createdAt": 2019-11-17T15:33:03.101Z, "text": "what's up", "user": {"_id": 1}}]

  getRasaResponse(message){
        console.log(message)
      return fetch('http://40.71.20.54:80/webhooks/rest/webhook',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'react-native-client1',
          message: message ,
        }),
      }
      ).then((response) => response.json())
           .then((responseJson) => {
             console.log(responseJson)
             this.rasaRespond(responseJson[0].text)
             return responseJson;
           })
           .catch((error) => {
             console.error(error);
           });

  }

  rasaRespond(response) {
    console.log(response);
    this.setState({ num_responses: this.state.num_responses + 1 })
    let messages = []
    messages = [{"_id": this.state.num_responses, "createdAt": new Date(), "text": response, "user": {"_id": 2}}];
    console.log(messages);
    this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    console.log(messages[0].text);
    this.getRasaResponse(messages[0].text);
    //fetch here
    //add the response as a message here
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}