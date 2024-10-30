import { useRef, useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { Marker } from "../types/marker";
import { MARKER_PRESET_SELECTED, MARKER_PRESET_DEFAULT } from "../const";

interface MyMapProps {
  markers: Marker[];
  selectedMarkerId: number | null;
  onMarkerClick: (id: number) => void;
  mapCenter: [number, number];
  zoomValue: number;
}

const MyMap: React.FC<MyMapProps> = ({ markers, selectedMarkerId, onMarkerClick, mapCenter, zoomValue }) => {
  const mapRef = useRef<ymaps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      (mapRef.current as unknown).setCenter(mapCenter);
      (mapRef.current as unknown).setZoom(zoomValue);
    }
  }, [mapCenter, zoomValue]);

  return (
    <YMaps>
      <Map className="map-container" instanceRef={mapRef} state={{ center: mapCenter, zoom: zoomValue }}>
        {markers.map((marker) => (
          <Placemark
            key={marker.id}
            geometry={[marker.latitude, marker.longitude]}
            properties={{
              hintContent: marker.name,
            }}
            options={{
              preset: selectedMarkerId === marker.id ? MARKER_PRESET_SELECTED : MARKER_PRESET_DEFAULT,
            }}
            onClick={() => onMarkerClick(marker.id)}
          />
        ))}
      </Map>
    </YMaps>
  );
};

export default MyMap;
