import React, { useState, useEffect, useContext } from 'react';
import { createEvent, getEvents, createLocation } from '../api/axios';
import MapView from '../components/MapView';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';

const provider = new OpenStreetMapProvider();

const EventPage = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        event_name: '',
        event_description: '',
        start_date: '',
        end_date: '',
    });
    const [newLocation, setNewLocation] = useState({
        location_name: '',
        location_description: 'Event location',
        location_category: 'Event',
        latitude: '',
        longitude: '',
    });
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationId, setLocationId] = useState(null);

    useEffect(() => {
        console.log('User state on EventPage load:', user);
        const fetchEvents = async () => {
            if (isAuthenticated) {
                try {
                    const response = await getEvents();
                    setEvents(response.data);
                } catch (error) {
                    console.error('Error fetching events', error);
                }
            }
        };

        fetchEvents();
    }, [isAuthenticated, user]);

    const handleChange = (e) => {
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value,
        });
    };

    const handleLocationChange = (e) => {
        setNewLocation({
            ...newLocation,
            location_name: e.target.value,
        });
    };

    const handleAddressChange = async (e) => {
        const query = e.target.value;
        setNewLocation({
            ...newLocation,
            location_name: query,
        });

        if (query.length > 2) {
            const results = await provider.search({ query });
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (suggestion) => {
        setSelectedLocation(suggestion);
        setNewLocation({
            ...newLocation,
            location_name: suggestion.label,
            latitude: suggestion.y,
            longitude: suggestion.x,
        });
        setSuggestions([]);
    };

    const handleAddLocation = async () => {
        if (selectedLocation) {
            const locationPayload = {
                location_name: newLocation.location_name,
                location_description: newLocation.location_description,
                location_category: newLocation.location_category,
                latitude: newLocation.latitude,
                longitude: newLocation.longitude,
            };

            console.log('Payload being sent to /locations:', locationPayload);

            try {
                const locationResponse = await createLocation(locationPayload);
                console.log('Location Response:', locationResponse);
                setLocationId(locationResponse.id_location);
                alert('Location added successfully');
            } catch (error) {
                alert('Error adding location');
                console.error('Error response:', error.response);
                console.error(error);
            }
        } else {
            alert('Please select a valid address');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('User:', user);

        if (user && locationId) {
            try {
                const eventPayload = {
                    ...newEvent,
                    id_location: locationId,
                    id_user: user.id_user,
                };

                console.log('Payload being sent to /events:', eventPayload);

                const eventResponse = await createEvent(eventPayload);
                console.log('Event Response:', eventResponse);

                const updatedEvents = await getEvents();
                setEvents(updatedEvents.data);

                setNewEvent({
                    event_name: '',
                    event_description: '',
                    start_date: '',
                    end_date: '',
                });
                setNewLocation({
                    location_name: '',
                    location_description: 'Event location',
                    location_category: 'Event',
                    latitude: '',
                    longitude: '',
                });
                setSelectedLocation(null);
                setLocationId(null);
                alert('Event created successfully');
            } catch (error) {
                alert('Error creating event');
                console.error(error);
            }
        } else {
            alert('Please add and validate a location first');
        }
    };

    return (
        <div className="event-page">
            <h1>Events in Angers</h1>
            <div className="map-wrapper">
                <MapView events={events} />
            </div>
            {isAuthenticated && (
                <Container className="mt-5">
                    <Row className="justify-content-md-center">
                        <Col md="6">
                            <h2 className="text-center mb-4">Create Event</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formEventName" className="mb-3">
                                    <Form.Label>Event Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="event_name"
                                        placeholder="Enter event name"
                                        onChange={handleChange}
                                        value={newEvent.event_name}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEventDescription" className="mb-3">
                                    <Form.Label>Event Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="event_description"
                                        placeholder="Enter event description"
                                        onChange={handleChange}
                                        value={newEvent.event_description}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formStartDate" className="mb-3">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="start_date"
                                        onChange={handleChange}
                                        value={newEvent.start_date}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEndDate" className="mb-3">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="end_date"
                                        onChange={handleChange}
                                        value={newEvent.end_date}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Create Event
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-5">
                        <Col md="6">
                            <h2 className="text-center mb-4">Add Location</h2>
                            <Form>
                                <Form.Group controlId="formLocationAddress" className="mb-3">
                                    <Form.Label>Location Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location_address"
                                        placeholder="Enter location address"
                                        onChange={handleAddressChange}
                                        value={newLocation.location_name}
                                        required
                                    />
                                    {suggestions.length > 0 && (
                                        <div className="suggestions-container">
                                            {suggestions.map((suggestion) => (
                                                <div
                                                    key={suggestion.x}
                                                    onClick={() => handleSelect(suggestion)}
                                                    className="suggestion-item"
                                                >
                                                    {suggestion.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Form.Group>
                                <Button variant="secondary" onClick={handleAddLocation} className="w-100">
                                    Validate Location
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )}
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h2 className="text-center mb-4">Current Events</h2>
                        {events.map((event) => (
                            <div key={event.id_event} className="event-item">
                                <h3>{event.event_name}</h3>
                                <p>{event.event_description}</p>
                                <p>
                                    {event.start_date} - {event.end_date}
                                </p>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EventPage;
