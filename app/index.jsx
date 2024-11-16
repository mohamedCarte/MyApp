import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Button, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

const ClickCounter = () => {
  const [count, setCount] = useState(0);
  const [sound, setSound] = useState();

  useEffect(() => {
    if (count === 100) {
      playSound();
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [count]);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sound/brid.mp3') 
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.container}>
        <ImageBackground 
          source={require('../assets/images/img.jpg')} 
          style={{ width: '100%', height: '100%' }}
        >
          <Text style={styles.text}>{count}</Text>
          <TouchableOpacity onPress={reset}>
            <Image source={require('../assets/images/reset.png')} style={{ width: 70, height: 70, marginTop: -30 }} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    position: 'relative',
    top: 150,
  },
});

export default ClickCounter;
