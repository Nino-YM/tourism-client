import React from 'react';
import MapView from '../components/MapView';
import './HomePage.css';
import { Container, Typography, Box, Grid, Button } from '@mui/material';

const HomePage = () => {
    return (
        <div className="homepage">
            <Container maxWidth="lg">
                <Box
                    textAlign="center"
                    mt={4}
                    mb={4}
                    p={4}
                    bgcolor="#f5f5f5"
                    borderRadius={4}
                    boxShadow={3}
                >
                    <Typography variant="h2" component="h1" gutterBottom>
                        Office de Tourisme de la ville d'Angers
                    </Typography>
                    <Typography variant="h5" color="textSecondary" paragraph>
                        Découvrez les merveilles d'Angers, une ville riche en histoire, culture, et gastronomie. Explorez nos
                        attractions touristiques, assistez à des événements passionnants et profitez de votre séjour au
                        cœur de la vallée de la Loire.
                    </Typography>
                    <Button variant="contained" color="primary" href="/events" size="large">
                        Explorer les Événements
                    </Button>
                </Box>

                <div className="map-wrapper" style={{ marginTop: '40px' }}>
                    <MapView />
                </div>

                <Box mt={8} mb={8}>
                    <Typography variant="h4" gutterBottom>
                        Attractions Vedettes
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box borderRadius={8} overflow="hidden" boxShadow={3} bgcolor="#ffffff">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt="Château d'Angers"
                                    style={{ width: '100%' }}
                                />
                                <Box p={2}>
                                    <Typography variant="h6">Château d'Angers</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Explorez la forteresse médiévale qui surplombe la Maine.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box borderRadius={8} overflow="hidden" boxShadow={3} bgcolor="#ffffff">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt="Jardin des Plantes"
                                    style={{ width: '100%' }}
                                />
                                <Box p={2}>
                                    <Typography variant="h6">Jardin des Plantes</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Promenez-vous dans l'un des plus beaux jardins de France.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box borderRadius={8} overflow="hidden" boxShadow={3} bgcolor="#ffffff">
                                <img
                                    src="https://via.placeholder.com/300"
                                    alt="Musée des Beaux-Arts"
                                    style={{ width: '100%' }}
                                />
                                <Box p={2}>
                                    <Typography variant="h6">Musée des Beaux-Arts</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Découvrez une vaste collection d'art de différentes époques.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={8} mb={8}>
                    <Typography variant="h4" gutterBottom>
                        Événements à Venir
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box borderRadius={8} overflow="hidden" boxShadow={3} bgcolor="#ffffff">
                                <Box p={2}>
                                    <Typography variant="h6">Festival d'Anjou</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Assistez à l'un des festivals de théâtre les plus célèbres de France.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box borderRadius={8} overflow="hidden" boxShadow={3} bgcolor="#ffffff">
                                <Box p={2}>
                                    <Typography variant="h6">Marché de Noël</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Profitez de l'esprit festif avec les meilleurs artisans et gastronomes locaux.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box borderRadius={8} overflow="hidden" boxShadow={3} bgcolor="#ffffff">
                                <Box p={2}>
                                    <Typography variant="h6">Concert au Château</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Assistez à un concert magique dans le cadre historique du Château d'Angers.
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={8} mb={4} textAlign="center" color="textSecondary" bgcolor="#f5f5f5" py={2} borderRadius={4}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} Office de Tourisme de la ville d'Angers. Tous droits réservés.
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default HomePage;
