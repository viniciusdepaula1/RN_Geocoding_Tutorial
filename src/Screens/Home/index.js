import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, ToastAndroid } from 'react-native';
import useLocation from '../../Hooks/useLocation';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Heatmap } from 'react-native-maps';
import { markers } from '../../utils/Markers';
import { foodIcons } from '../../utils/Icons';
import MarkerIcon from '../../Components/MarkerIcon';
import Fab from '../../Components/Fab';
import MarkerImpl from '../../Components/MarkerImpl';
import { GOOGLE_API_KEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';

export default function HomeScreen({ navigation }) {
  const [latitude, setLatitude] = useState(-20.398259);
  const [longitude, setLongitude] = useState(-43.507726);

  const [heatmapMode, setHeatmapMode] = useState(false);
  const [routeMode, setRouteMode] = useState(false);

  const [localDirection, setLocalDirection] = useState(null);
  const [mapMarkers, setMapMarkers] = useState(markers);
  const [positions, setPositions] = useState(mapMarkers.map(item => {
    return { "latitude": item.latitude, "longitude": item.longitude }
  }));

  const mapRef = useRef(null);

  const { coords, errorMsg } = useLocation();

  function handleRegionChanged(region) {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
  }

  useEffect(() => {
    console.log('É A API: ', GOOGLE_API_KEY)
  }, [])

  useEffect(() => {
    setPositions(mapMarkers.map(item => {
      return { "latitude": item.latitude, "longitude": item.longitude }
    }))
  }, [mapMarkers])

  useEffect(() => {
    if (errorMsg) {
      ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
      console.log(errorMsg);
    }
  }, [errorMsg]);

  return (
    <>
      {
        (!coords || errorMsg) ?

          <>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
              <ActivityIndicator size="large" color={'#b11111'} />
              <Text style={{
                marginTop: 10,
                color: '#000',
              }}>Carregando o mapa...</Text>
            </View>
          </>

          :

          <>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              onRegionChangeComplete={handleRegionChanged}
              showsUserLocation={true}
              showsMyLocationButton={false}
              toolbarEnabled={false}
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
              }}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.195,
                longitudeDelta: 0.1921,
                ...coords
              }}
            >

              {
                !heatmapMode ?
                  mapMarkers.map((_marker) => {
                    return (
                      <MarkerImpl
                        key={_marker._id}
                        mark={_marker}
                        onPress={() => setLocalDirection(_marker)}
                      />
                    )
                  }) : null
              }

              {
                positions && heatmapMode ?
                  <Heatmap
                    points={positions}
                    opacity={1}
                    radius={30}
                  />
                  : null
              }

              {
                routeMode ?
                  <MapViewDirections
                    strokeWidth={3}
                    strokeColor="red"
                    origin={coords}
                    destination={localDirection}
                    apikey={GOOGLE_API_KEY}
                    mode="DRIVING"
                  />
                  : null
              }

            </MapView>

            <Fab
              iconName='add'
              iconColor={'#b11111'}
              color={'#fff'}
              containerStyle={{ right: 16, bottom: 30 }}
              onPress={() => {
                const lastMarker = mapMarkers[mapMarkers.length - 1];
                const newId = lastMarker._id + 1;

                const newMarker = {
                  _id: newId,
                  title: `Marker${newId}`,
                  latitude,
                  longitude
                }

                setMapMarkers((old) => {
                  return [...old, newMarker];
                });
              }}
              iconSize={45}
            />

            <Fab
              iconName='gps-fixed'
              iconColor={'#b11111'}
              color={'#fff'}
              containerStyle={{ right: 20, bottom: 90 }}
              onPress={() => {
                mapRef.current.animateToRegion({
                  latitude: -20.398259, // posição padrão
                  longitude: -43.507726,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                  ...coords, // Sobrescreve a posição padrão se tiver carregado a posição do user
                })
              }}
              iconSize={35}
            />

            <Fab
              iconName='explore'
              iconColor={'#b11111'}
              color={'#fff'}
              containerStyle={{ right: 20, bottom: 135 }}
              onPress={() => { setRouteMode(!routeMode) }}
              iconSize={35}
            />

            <Fab
              iconName='bubble-chart'
              iconColor={'#b11111'}
              color={'#fff'}
              containerStyle={{ right: 20, bottom: 180 }}
              iconSize={35}
              onPress={async () => {
                if (heatmapMode) {
                  await mapRef.current.animateToRegion({
                    latitude: -20.398259, // posição padrão
                    longitude: -43.507726,
                    latitudeDelta: 0.195,
                    longitudeDelta: 0.1921,
                    ...coords, // Sobrescreve a posição padrão se tiver carregado a posição do user
                  })

                  setHeatmapMode(!heatmapMode)

                  return;
                }

                await mapRef.current.animateToRegion({
                  latitude: -20.398259, // posição padrão
                  longitude: -43.507726,
                  latitudeDelta: 3.2877014453955837,
                  longitudeDelta: 2.181449979543693,
                  ...coords, // Sobrescreve a posição padrão se tiver carregado a posição do user
                })

                setHeatmapMode(!heatmapMode)
              }}
            />
          </>
      }
    </>
  );
}
