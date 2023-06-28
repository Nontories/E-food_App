import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabNavigate from "../TabNavigate";
import { View, StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadChatLog(); // Load the chat log when the component mounts
  }, []);

  useEffect(() => {
    saveChatLog(); // Save the chat log whenever it changes
  }, [messages]);

  const loadChatLog = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem('chatLog');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.log('Error loading chat log:', error);
    }
  };

  const saveChatLog = async () => {
    try {
      await AsyncStorage.setItem('chatLog', JSON.stringify(messages));
    } catch (error) {
      console.log('Error saving chat log:', error);
    }
  };

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
          Authorization: 'Bearer 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',
        },
        body: JSON.stringify(requestBody),
      }
    );
  
    if (!response.ok) {
      throw new Error('Error communicating with the API');
    }
  
    const responseData = await response.json();

    console.log(responseData);
  
    if (responseData && responseData.choices && responseData.choices.length > 0) {
      return responseData.choices[0].text.trim();
    } else {
      // Fallback response in case of an invalid API response
      return 'Failed to retrieve a valid response.';
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1,
          }}
        />
      </View>
      <TabNavigate />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    width: WIDTH,
    height: HEIGHT * 0.9,
    position: "absolute",
    bottom: HEIGHT * 0.08
  },
});

export default Chat;
