import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = ({ events = [] }) => {
    const defaultPosition = [47.478419, -0.563165]; // Coordinates for Angers, France

    return (
        <MapContainer center={defaultPosition} zoom={13} className="map-container">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {events.length > 0 && events.map(event => (
                event.location && (
                    <Marker
                        key={event.id_event}
                        position={[
                            event.location.latitude || defaultPosition[0],
                            event.location.longitude || defaultPosition[1]
                        ]}
                    >
                        <Popup>
                            <strong>{event.event_name}</strong><br />
                            {event.event_description}<br />
                            From: {new Date(event.start_date).toLocaleDateString()}<br />
                            To: {new Date(event.end_date).toLocaleDateString()}
                        </Popup>
                    </Marker>
                )
            ))}
        </MapContainer>
    );
};

export default MapView;
