import { useState } from "react";
import { Marker } from "../types/marker";

interface MarkerListProps {
  markers: Marker[];
  onSelect: (id: number) => void;
  selectedMarkerId: number | null;
  onToggleVisibility: (id: number) => void;
  hiddenMarkerIds: number[];
}

const MarkerList: React.FC<MarkerListProps> = ({
  markers,
  onSelect,
  selectedMarkerId,
  onToggleVisibility,
  hiddenMarkerIds,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMarkers = markers.filter((marker) => marker.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="list-wrapper">
      <input
        type="text"
        placeholder="Поиск по точкам"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="list-header">
        <span>Скрыть</span>
        <span>Наименование</span>
      </div>
      <ul className="list">
        {filteredMarkers.length > 0 ? (
          filteredMarkers.map((marker) => (
            <li
              key={marker.id}
              onClick={() => onSelect(marker.id)}
              className={`list-item ${selectedMarkerId === marker.id ? "selected" : ""}`}
            >
              <input
                type="checkbox"
                checked={hiddenMarkerIds.includes(marker.id)}
                onChange={() => onToggleVisibility(marker.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <span>{marker.name}</span>
            </li>
          ))
        ) : (
          <li className="list-item no-matches">Нет совпадений</li>
        )}
      </ul>
    </div>
  );
};

export default MarkerList;
