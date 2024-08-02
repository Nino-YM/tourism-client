import React, { useState, useEffect, useContext } from 'react';
import { createReview, getReviews, getEvents } from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

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
                console.error('Error fetching reviews and events', error);
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
            alert('Review created successfully');
        } catch (error) {
            alert('Error creating review');
            console.error(error);
        }
    };

    return (
        <div className="review-page">
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md="6">
                        <h2 className="text-center mb-4">Leave a Review</h2>
                        {isAuthenticated ? (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formRating" className="mb-3">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="rating"
                                        placeholder="Enter rating (1-5)"
                                        onChange={handleChange}
                                        value={newReview.rating}
                                        min="1"
                                        max="5"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formReviewContent" className="mb-3">
                                    <Form.Label>Review Content</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="review_content"
                                        placeholder="Enter your review"
                                        onChange={handleChange}
                                        value={newReview.review_content}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEvent" className="mb-3">
                                    <Form.Label>Event</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="id_event"
                                        onChange={handleChange}
                                        value={newReview.id_event}
                                        required
                                    >
                                        <option value="">Select an event</option>
                                        {events.map(event => (
                                            <option key={event.id_event} value={event.id_event}>
                                                {event.event_name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Submit Review
                                </Button>
                            </Form>
                        ) : (
                            <p>Please log in to leave a review.</p>
                        )}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h2 className="text-center mb-4">Reviews</h2>
                        {reviews.map(review => (
                            <div key={review.id_review} className="review-item">
                                <h3>{events.find(event => event.id_event === review.id_event)?.event_name}</h3>
                                <p><strong>Rating:</strong> {review.rating}</p>
                                <p>{review.review_content}</p>
                                <p><small>{review.review_date}</small></p>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ReviewPage;
