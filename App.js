/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default App => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [value, onChangeText] = React.useState('Welcome to react native');

  const lang = 'en';
  const targetLang = 'id';

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function print(obj) {
    console.log(JSON.stringify(obj, null, 4));
  }

  const getTranslate = async value => {
    setIsLoading(false);
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${value}&langpair=${lang}|${targetLang}`,
      );
      const json = await response.json();
      const translate = json.responseData.translatedText;
      print(translate);
      setData(translate);
      setIsLoading(true);
    } catch (error) {
      console.error(error);
      setData(error);
      setIsLoading(true);
    }
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  useEffect(() => {
    getTranslate(value);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
          />
          <View
            style={{
              margin: 20,
            }}>
            <Button
              onPress={() => {
                getTranslate(value);
              }}
              title="Translate"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>

          <Section title="Language">{value}</Section>
          <Section title="Translate">{isLoading ? data : 'Proses...'}</Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
