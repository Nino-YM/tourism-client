import React, { useState, useEffect, useContext } from 'react';
import { createReview, getReviews, getEvents } from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import { Star, StarHalf, StarBorder } from '@mui/icons-material';
import './ReviewPage.css';

const ReviewPage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [events, setEvents] = useState([]);
    const [newReview, setNewReview] = useState({
        rating: '',
        review_content: '',
        review_date: '',
        id_event: '',
    });

    useEffect(() => {
        const fetchReviewsAndEvents = async () => {
            try {
                const reviewsResponse = await getReviews();
                setReviews(reviewsResponse.data);

                const eventsResponse = await getEvents();
                setEvents(eventsResponse.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des avis et des événements', error);
            }
        };

        fetchReviewsAndEvents();
    }, []);

    const handleChange = (e) => {
        setNewReview({
            ...newReview,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewPayload = {
                ...newReview,
                review_date: new Date().toISOString().split('T')[0],
            };

            const reviewResponse = await createReview(reviewPayload);
            setReviews([...reviews, reviewResponse.data]);

            setNewReview({
                rating: '',
                review_content: '',
                review_date: '',
                id_event: '',
            });
            alert('Avis créé avec succès');
        } catch (error) {
            alert('Erreur lors de la création de l\'avis');
            console.error(error);
        }
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <span className="star-rating">
                {[...Array(fullStars)].map((_, i) => <Star key={i} />)}
                {halfStar && <StarHalf />}
                {[...Array(emptyStars)].map((_, i) => <StarBorder key={i} />)}
            </span>
        );
    };

    return (
        <div className="review-page">
            <Container className="mt-5">
                <Box textAlign="center" mb={5}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Laissez un Avis
                    </Typography>
                </Box>
                <Row className="justify-content-md-center">
                    <Col md="6">
                        {isAuthenticated ? (
                            <Card className="p-4 mb-5">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formRating" className="mb-3">
                                        <Form.Label>Évaluation</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="rating"
                                            placeholder="Entrez une évaluation (1-5)"
                                            onChange={handleChange}
                                            value={newReview.rating}
                                            min="1"
                                            max="5"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formReviewContent" className="mb-3">
                                        <Form.Label>Contenu de l'Avis</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="review_content"
                                            placeholder="Entrez votre avis"
                                            onChange={handleChange}
                                            value={newReview.review_content}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEvent" className="mb-3">
                                        <Form.Label>Événement</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="id_event"
                                            onChange={handleChange}
                                            value={newReview.id_event}
                                            required
                                        >
                                            <option value="">Sélectionnez un événement</option>
                                            {events.map(event => (
                                                <option key={event.id_event} value={event.id_event}>
                                                    {event.event_name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Soumettre l'Avis
                                    </Button>
                                </Form>
                            </Card>
                        ) : (
                            <Typography variant="body1" color="textSecondary" textAlign="center">
                                Veuillez vous connecter pour laisser un avis.
                            </Typography>
                        )}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Box textAlign="center" mb={5}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                Avis Récents
                            </Typography>
                        </Box>
                        {reviews.map(review => (
                            <Card key={review.id_review} className="mb-4 review-card">
                                <Card.Body>
                                    <Card.Title>{events.find(event => event.id_event === review.id_event)?.event_name}</Card.Title>
                                    <Card.Text>
                                        <strong>Évaluation :</strong> {renderStars(review.rating)}
                                    </Card.Text>
                                    <Card.Text>{review.review_content}</Card.Text>
                                    <Card.Footer className="text-muted">
                                        Publié le : {new Date(review.review_date).toLocaleDateString()}
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ReviewPage;
