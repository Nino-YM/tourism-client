import React from 'react';
import MapView from '../components/MapView';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage">
            <h1>Office de Tourisme de la ville d'Angers</h1>
            <div className="map-wrapper">
                <MapView />
            </div>
        </div>
    );
};

export default HomePage;
