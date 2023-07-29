import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";

import TabNavigate from "../TabNavigate";
import { Text, View, StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [key, setKey] = useState("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");
  const [render, setRender] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchData();
    loadChatLog(); // Load the chat log when the component mounts
  }, []);

  useEffect(() => {
    saveChatLog(); // Save the chat log whenever it changes
  }, [messages]);

  const fetchData = () => {
    fetch('http://efood.somee.com/api/Chat', {
      method: 'GET',
      headers: {
        'accept': '*/*'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(responseText => {
        setKey(responseText);
        setRender(true);
      })
      .catch(error => {
        console.error("log : " + error);
      });
  };


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

    try {
      const response = await fetch(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.status === 429) {
        console.log(response.status);
      } else if (!response.ok) {
        showToast("Không thể kết nối với GPT", "warning");
        throw new Error('Error communicating with the API');
      }

      let responseData = await response.json();

      if (responseData && responseData.choices && responseData.choices.length > 0) {
        return responseData.choices[0].text.trim();
      } else {
        if(response.status === 429){
          return 'Hình như... quá tải rồi.';
        }
        return 'Failed to retrieve a valid response.';
      }
    } catch (error) {
      showToast("Lỗi GPT", "warning");
      console.error('Unhandled Promise Rejection:', error);
      throw error;
    }
  };

  const showToast = (message, type) => {
    toast.show(message, {
      type: type,
      placement: "top",
      duration: 3000,
      animationType: "slide-in",
    });
  };


  return (
    <View style={styles.container}>
      {render ?
        <View style={styles.chatContainer}>
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
              _id: 1,
            }}
          />
        </View>
        :
        <Text>Get key...</Text>
      }

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
