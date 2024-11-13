import React, { createContext, useState } from "react"
interface latLong{
  location: {
    latitude: number;
    longitude: number;
  }
}

interface LocationContextType {
  locationSelected: latLong;
  setLocationSelected: (location: latLong) => void;
}

export const LocationContext = createContext<LocationContextType>(
  {} as LocationContextType)
function LocationProvider({ children }: any) {

  const [locationSelected, setLocationSelected] = useState<latLong>({ location: { latitude: 0, longitude: 0 } });

  return(
    <LocationContext.Provider 
      value={{
        locationSelected,
        setLocationSelected
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export default LocationProvider