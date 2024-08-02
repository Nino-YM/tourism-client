import React, { useState, useEffect, useContext } from 'react';
import { getArticles, createArticle } from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

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
            alert('Article created successfully');
        } catch (error) {
            alert('Error creating article');
            console.error('Error creating article', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2 className="text-center mb-4">Create Article</h2>
                    {isAuthenticated && (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formArticleName" className="mb-3">
                                <Form.Label>Article Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="article_name"
                                    placeholder="Enter article name"
                                    onChange={handleChange}
                                    value={newArticle.article_name}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formArticleContent" className="mb-3">
                                <Form.Label>Article Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    name="article_content"
                                    placeholder="Enter article content"
                                    onChange={handleChange}
                                    value={newArticle.article_content}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPublishedDate" className="mb-3">
                                <Form.Label>Published Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="published_date"
                                    onChange={handleChange}
                                    value={newArticle.published_date}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Create Article
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <h2 className="text-center mb-4">Articles</h2>
                    {articles.map((article) => (
                        <div key={article.id_article} className="article-item mb-4">
                            <h3>{article.article_name}</h3>
                            <p>{article.article_content}</p>
                            <p>
                                Published on: {new Date(article.published_date).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default ArticlePage;
