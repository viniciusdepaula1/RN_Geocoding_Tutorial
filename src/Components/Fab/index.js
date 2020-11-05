import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Fab({
  onPress,
  iconName,
  iconColor,
  color,
  containerStyle,
  accessibilityLabel,
  iconSize
}) {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 25,
        elevation: 10,
        ...containerStyle
      }}
      onPress={onPress}
      acessible={true}
      accessibilityLabel={accessibilityLabel}
    >
      <Icon name={iconName} size={iconSize} color='#b11111' />
    </TouchableOpacity>
  );
}
