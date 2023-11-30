/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Animated,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import ModalAnim, {ModalRef, showModal} from './ModalAnim';

function App(): JSX.Element {
  const refModal = useRef<ModalRef>(null);
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={{margin: 10}}
          onLongPress={() => {
            showModal();
          }}>
          <View style={styles.box}></View>
        </TouchableOpacity>
        <TouchableOpacity style={{margin: 10}} onLongPress={() => {}}>
          <View style={styles.box}></View>
        </TouchableOpacity>
        <TouchableOpacity style={{margin: 10}} onLongPress={() => {}}>
          <View style={styles.box}></View>
        </TouchableOpacity>
      </ScrollView>
      <ModalAnim ref={refModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default App;
