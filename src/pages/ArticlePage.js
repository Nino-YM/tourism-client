import React, { useState, useEffect, useContext } from 'react';
import { getArticles, createArticle } from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';

const ArticlePage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({
        article_name: '',
        article_content: '',
        published_date: '',
    });

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await getArticles();
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching articles', error);
            }
        };

        fetchArticles();
    }, []);

    const handleChange = (e) => {
        setNewArticle({
            ...newArticle,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createArticle(newArticle);
            const updatedArticles = await getArticles();
            setArticles(updatedArticles.data);
            setNewArticle({
                article_name: '',
                article_content: '',
                published_date: '',
            });
            alert('Article créé avec succès');
        } catch (error) {
            alert('Erreur lors de la création de l\'article');
            console.error('Error creating article', error);
        }
    };

    return (
        <Container className="mt-5">
            <Box textAlign="center" mb={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Créer un Nouvel Article
                </Typography>
            </Box>
            <Row className="justify-content-md-center">
                <Col md="8">
                    {isAuthenticated && (
                        <Card className="p-4 mb-5">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formArticleName" className="mb-3">
                                    <Form.Label>Nom de l'Article</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="article_name"
                                        placeholder="Entrez le nom de l'article"
                                        onChange={handleChange}
                                        value={newArticle.article_name}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formArticleContent" className="mb-3">
                                    <Form.Label>Contenu de l'Article</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        name="article_content"
                                        placeholder="Entrez le contenu de l'article"
                                        onChange={handleChange}
                                        value={newArticle.article_content}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPublishedDate" className="mb-3">
                                    <Form.Label>Date de Publication</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="published_date"
                                        onChange={handleChange}
                                        value={newArticle.published_date}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Créer l'Article
                                </Button>
                            </Form>
                        </Card>
                    )}
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Box textAlign="center" mb={5}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Articles Récents
                        </Typography>
                    </Box>
                    <Row>
                        {articles.map((article) => (
                            <Col md={6} lg={4} key={article.id_article} className="mb-4">
                                <Card className="h-100">
                                    <Card.Img
                                        variant="top"
                                        src="https://via.placeholder.com/300"
                                        alt="Article Image Placeholder"
                                    />
                                    <Card.Body>
                                        <Card.Title>{article.article_name}</Card.Title>
                                        <Card.Text>{article.article_content.substring(0, 100)}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                        Publié le : {new Date(article.published_date).toLocaleDateString()}
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ArticlePage;
