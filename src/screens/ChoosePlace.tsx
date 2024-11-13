import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { LocationContext } from '../contexts/locationContext';

interface latLong{
  location: {
    latitude: number;
    longitude: number;
  }
}

export function ChoosePlace({location}: latLong) {

  const { locationSelected, setLocationSelected } = useContext(LocationContext);

  const [region, setRegion] = useState<any>({
    latitude: -23.55052,
    longitude: -46.633308,
    latitudeDelta: 0.013554923119248663,
    longitudeDelta: 0.008667223155498505,
  });
  const handleRegionChangeComplete = (newRegion : any) => {
    const { latitude, longitude } = newRegion;
    const newLocation = { location: { latitude, longitude } };
    //atualiza a regiao atual sempre que mover o mapa
    setRegion(newRegion); 
    setLocationSelected(newLocation)
  };

  //sempre que o botao de meu local for pressionado, a regiao muda para o local atual
  //do usuario, e faz o mapa atualizar
  useEffect(() => {
    setRegion({
      ...region,
      latitude:location?.latitude,
      longitude:location?.longitude,
  });
  }, [location]);

  return(
   <View style={styles.container}>
      
     <MapView
       onRegionChangeComplete={handleRegionChangeComplete}
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={region}
       zoomEnabled
       loadingEnabled
     >
     </MapView>
     {/* Marcador fixo no centro da tela */}
     <View style={styles.markerFixed}>
        <Image
          source={require('../../assets/img/pole.png')} // Imagem do marcador
          style={styles.marker}
        />
      </View>
   </View>
    
  )
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerFixed: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -18, // Ajusta o marcador para o centro horizontalmente
    marginTop: -45,  // Ajusta o marcador para o centro verticalmente
  },
  marker: {
    width: 48,
    height: 48,
  },
 });