import { useState, useEffect } from 'react';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export default () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    (async function loadPosition(){
      const result = await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION]).then(
        (statuses) => {
          const statusFine = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
          const statusBack = statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION];

          if(statusFine == 'granted' && statusBack == 'granted'){
            return true;
          } else{
            setErrorMsg('Usuário não aceitou solicitação de uso do GPS');
          }
        },
      );
      
      if(result){
        await Geolocation.getCurrentPosition(
          ({ coords }) => {
            setCoords({
              latitude: coords.latitude,
              longitude: coords.longitude,
            });
          }, (error) => {
            //console.log(error);
            setErrorMsg('Não foi possível obter a localização');
          }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
      }
        
    })()
  }, [])

  return { coords, errorMsg }
}