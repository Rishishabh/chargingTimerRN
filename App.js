import React from 'react';
import { WebView } from 'react-native-webview';
import { Platform } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

const App = () => {
  const htmlFile =
    Platform.OS === 'android'
      ? 'file:///android_asset/web/index.html'
      : './web/index.html';

  return (
    <View style={styles.container}>
      <WebView originWhitelist={['*']} source={{ uri: htmlFile }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
