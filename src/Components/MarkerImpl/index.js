import React from 'react';
import { foodIcons } from '../../utils/Icons';
import MarkerIcon from '../MarkerIcon';
import {Marker} from 'react-native-maps';

export default function MarkerImpl({
  onPress,
  mark,
}) {
  return (
    <Marker
      onPress={onPress}
      tracksViewChanges={false}
      key={mark._id}
      coordinate={{
        latitude: mark.latitude,
        longitude: mark.longitude
      }}
      title={`Marker_${mark.title}`}
    >
      <MarkerIcon emoji={foodIcons[3].data} />

    </Marker>
  );
}
