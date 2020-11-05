import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function Header({ title, button, onPressButton }) {
  return (
    <View style={styles.header}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >

      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>

      </View>
    </View>
  );
}
