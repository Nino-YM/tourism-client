import React, { useState, useEffect, useContext } from 'react';
import { createEvent, getEvents, createLocation } from '../api/axios';
import MapView from '../components/MapView';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import 'leaflet/dist/leaflet.css';

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
        const fetchEvents = async () => {
            if (isAuthenticated) {
                try {
                    const response = await getEvents();
                    setEvents(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des événements', error);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user && locationId) {
            try {
                const eventPayload = {
                    ...newEvent,
                    id_location: locationId,
                    id_user: user.id_user,
                };

                const eventResponse = await createEvent(eventPayload);
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
                alert('Événement créé avec succès');
            } catch (error) {
                alert('Erreur lors de la création de l\'événement');
                console.error(error);
            }
        } else {
            alert('Veuillez ajouter et valider un lieu d\'abord');
        }
    };

    return (
        <Container>
            <Box textAlign="center" my={4}>
                <Typography variant="h2">Événements à Angers</Typography>
            </Box>
            <Box mb={4} className="map-wrapper">
                <MapView events={events} />
            </Box>
            {isAuthenticated && (
                <Card className="p-4 mb-5">
                    <Row className="justify-content-md-center">
                        <Col md="6">
                            <Typography variant="h5" className="text-center mb-4">Créer un Événement</Typography>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formEventName" className="mb-3">
                                    <Form.Label>Nom de l'Événement</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="event_name"
                                        placeholder="Entrez le nom de l'événement"
                                        onChange={handleChange}
                                        value={newEvent.event_name}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEventDescription" className="mb-3">
                                    <Form.Label>Description de l'Événement</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="event_description"
                                        placeholder="Entrez la description de l'événement"
                                        onChange={handleChange}
                                        value={newEvent.event_description}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formStartDate" className="mb-3">
                                    <Form.Label>Date de Début</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="start_date"
                                        onChange={handleChange}
                                        value={newEvent.start_date}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEndDate" className="mb-3">
                                    <Form.Label>Date de Fin</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="end_date"
                                        onChange={handleChange}
                                        value={newEvent.end_date}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Créer un Événement
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            )}
            <Box mt={5}>
                <Typography variant="h4" className="text-center mb-4">Événements Actuels</Typography>
                <Row>
                    {events.map((event) => (
                        <Col md={4} key={event.id_event} className="mb-4">
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src="https://via.placeholder.com/300"
                                    alt="Event Image Placeholder"
                                />
                                <Card.Body>
                                    <Card.Title>{event.event_name}</Card.Title>
                                    <Card.Text>{event.event_description.substring(0, 100)}...</Card.Text>
                                    <Card.Text>
                                        <strong>Dates:</strong> {event.start_date} - {event.end_date}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Box>
        </Container>
    );
};

export default EventPage;
