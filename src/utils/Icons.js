import React from 'react';
import { Text } from 'react-native';

export const foodIcons = [
  { key: 0, data: '🍗' },
  { key: 1, data: '🍖' },
  { key: 2, data: '🍺' },
  { key: 3, data: '🍔' },
  { key: 4, data: '🌭' },
  { key: 5, data: '🍝' },
  { key: 6, data: '🍕' },
  { key: 7, data: '🥙' },
  { key: 8, data: '🌮' },
];
export const profileIcons = [
  { key: 0, data: '😎' },
  { key: 1, data: '😃' },
  { key: 2, data: '😄' },
  { key: 3, data: '😋' },
  { key: 4, data: '😴' },
  { key: 5, data: '😜' },
  { key: 6, data: '😝' },
  { key: 7, data: '😭' },
  { key: 8, data: '🙃' },
  { key: 9, data: '😷' },
];

export default function ({ icon, size, type, style, onPress, testid }) {
  return (
    <Text
      style={{ fontFamily: 'NotoColorEmoji', fontSize: size, ...style }}
      onPress={onPress}
    >
      {type === 'food' ? foodIcons[icon].data : profileIcons[icon].data}
    </Text>
  );
}
