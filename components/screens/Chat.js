import React, { useState, useEffect } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

import TabNavigate from '../TabNavigate';
import { View, StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Add an initial message when the component mounts
    setMessages([
      {
        _id: 1,
        text: 'Hello!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chat GPT',
        },
      },
    ]);
  }, []);

  const onSend = async (newMessages = []) => {
    const text = newMessages[0].text;

    // Add the user message immediately
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const response = await sendMessageToGpt(text);

    // Add the GPT response
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: Math.random().toString(),
          text: response,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Chat GPT',
          },
        },
      ])
    );
  };

  const sendMessageToGpt = async (text) => {
    const requestBody = {
      prompt: text,
      max_tokens: 999,
      temperature: 0.5,
      n: 1,
    };

    const response = await fetch(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
        },
        body: JSON.stringify(requestBody),
      }
    );

    const responseData = await response.json();
    return responseData.choices[0].text.trim();
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbarContainer}
        primaryStyle={styles.inputToolbarPrimary}
      />
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={styles.bubbleWrapper}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
      />
      <TabNavigate />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: HEIGHT * 0.1, // Adjust the margin to leave space for the TabNavigate component
  },
  inputToolbarContainer: {
    height: HEIGHT * 0.1,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  inputToolbarPrimary: {
    height: HEIGHT * 0.1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  bubbleWrapper: {
    height: HEIGHT * 0.5,
  },
});

export default Chat;
