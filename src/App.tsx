import { useState } from "react";
import MyMap from "./components/Map";
import MarkerList from "./components/MarkerList";
import { Marker } from "./types/marker";
import markersData from "./data/markers.json";
import { DEFAULT_MAP_CENTER, DEFAULT_ZOOM, ZOOM_ON_SELECT } from "./const";
import "./App.css";

const App: React.FC = () => {
  const markers: Marker[] = markersData as Marker[];

  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_MAP_CENTER);
  const [zoomValue, setZoomValue] = useState<number>(DEFAULT_ZOOM);
  const [hiddenMarkerIds, setHiddenMarkerIds] = useState<number[]>([]);

  const handleMarkerClick = (id: number) => {
    setSelectedMarkerId(id);

    const selectedMarker = markers.find((marker) => marker.id === id);
    if (selectedMarker) {
      setMapCenter([selectedMarker.latitude, selectedMarker.longitude]);
      setZoomValue(ZOOM_ON_SELECT);
    }
  };

  const handleToggleVisibility = (id: number) => {
    setHiddenMarkerIds((prevHiddenIds) =>
      prevHiddenIds.includes(id) ? prevHiddenIds.filter((markerId) => markerId !== id) : [...prevHiddenIds, id]
    );
  };

  const visibleMarkers = markers.filter((marker) => !hiddenMarkerIds.includes(marker.id));

  return (
    <div>
      <MarkerList
        markers={markers}
        onSelect={handleMarkerClick}
        selectedMarkerId={selectedMarkerId}
        onToggleVisibility={handleToggleVisibility}
        hiddenMarkerIds={hiddenMarkerIds}
      />
      <MyMap
        markers={visibleMarkers}
        onMarkerClick={handleMarkerClick}
        selectedMarkerId={selectedMarkerId}
        mapCenter={mapCenter}
        zoomValue={zoomValue}
      />
    </div>
  );
};

export default App;
