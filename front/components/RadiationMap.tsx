import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapWrapper = styled.div`
  height: 500px;
  width: 100%;
  margin-top: 20px;
`;

interface RadiationMapProps {
    position: [number, number] | null;
    polygon: [number, number][] | null;
    cityName: string | null;
    annualRadiation: number | null;
}

const MapUpdater = ({ position, polygon }: { 
    position: [number, number] | null;
    polygon: [number, number][] | null;
}) => {
    const map = useMap();
    
    React.useEffect(() => {
        if (!map || !position) return;
        
        try {
            if (polygon && polygon.length > 0) {
                const bounds = L.latLngBounds([
                    position,
                    ...polygon
                ]);
                map.flyToBounds(bounds, {
                    padding: [50, 50],
                    duration: 1
                });
            } else {
                map.flyTo(position, 14, {
                    duration: 1
                });
            }
        } catch (error) {
            console.error("Erro no flyTo:", error);
        }
    }, [position, polygon, map]);

    return null;
};

const RadiationMap: React.FC<RadiationMapProps> = ({
    position,
    polygon,
    cityName,
    annualRadiation
}) => {
    const brazilCenter: [number, number] = [-14.2350, -51.9253];
    const zoomLevel = 4;

    return (
        <MapWrapper>
            <MapContainer
                center={position || brazilCenter}
                zoom={position ? 12 : zoomLevel}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {position && (
                    <Marker position={position} icon={defaultIcon}>
                        <Popup>
                            <strong>{cityName}</strong>
                            <br />
                            Irradiação Anual: {annualRadiation} kWh/m²
                            <br />
                            Coordenadas: {position[0].toFixed(4)}, {position[1].toFixed(4)}
                        </Popup>
                    </Marker>
                )}

                {polygon && polygon.length > 0 && (
                    <Polygon
                        positions={polygon}
                        color="blue"
                        fillColor="red"
                        fillOpacity={0.2}
                        weight={2}
                    />
                )}
            </MapContainer>
        </MapWrapper>
    );
};

export default RadiationMap;