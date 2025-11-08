
import heroImage from "../../assets/hero-healthcare.jpg";
import { Favorite, Event, Security, AccessTime, CheckCircle, Group, Menu, Label } from "@mui/icons-material";
import {
    AppBar,
    Toolbar,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    IconButton,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Paper,
    FormLabel
} from "@mui/material";
import { useState } from "react";
import './Index.scss';

const Index = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navItems = [
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' }
    ];

    return (
        <div className="home">
            {/* Header */}
            <AppBar position="sticky" color="inherit" elevation={0} className="home__header">
                <Toolbar>
                    <Grid container alignItems="center" className="home__header-logo">
                        <Grid item>
                            <Favorite sx={{ fontSize: 32, color: 'primary.contrastText' }} />
                        </Grid>
                        <Grid item>
                            <FormLabel component="div" sx={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'primary.contrastText' }}>
                                HealthCare+
                            </FormLabel>
                        </Grid>
                    </Grid>

                    {isMobile ? (
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => setMobileMenuOpen(true)}
                            sx={{ ml: 'auto' }}
                        >
                            <Menu />
                        </IconButton>
                    ) : (
                        <>
                            <Grid container justifyContent="center" sx={{ flex: 1 }}>
                                {navItems.map((item) => (
                                    <Grid item key={item.label}>
                                        <Button
                                            href={item.href}
                                            color="inherit"
                                            sx={{ mx: 1 }}
                                        >
                                            {item.label}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid container sx={{ width: 'auto' }} spacing={2}>
                                <Grid item>
                                    <Button color="inherit">Sign In</Button>
                                </Grid>

                            </Grid>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            >
                <List sx={{ width: 250 }}>
                    {navItems.map((item) => (
                        <ListItem
                            key={item.label}
                            button
                            component="a"
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                    <ListItem>
                        <Button fullWidth variant="outlined" color="primary" sx={{ mb: 1 }}>
                            Sign In
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth variant="contained" color="primary">
                            Book Appointment
                        </Button>
                    </ListItem>
                </List>
            </Drawer>

            {/* Hero Section */}
            <Grid container className="home__hero">
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6} sm={6} className="home__hero-content">
                            <Grid container direction="column" spacing={3}>
                                <Grid item>
                                    <FormLabel component="h1" className="hero-title" sx={{
                                        display: 'block',
                                        fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                                        fontWeight: 'bold',
                                        color: 'text.primary'
                                    }}>
                                        Your Health, Our Priority
                                    </FormLabel>
                                </Grid>
                                <Grid item>
                                    <FormLabel component="p" sx={{ color: 'text.secondary', display: 'block', mb: 4 }}>
                                        Experience world-class healthcare with our team of dedicated professionals.
                                        We're here to support your wellness journey every step of the way.
                                    </FormLabel>
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            startIcon={<Event />}
                                            color="primary"
                                        >
                                            Schedule Appointment
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            color="primary"
                                        >
                                            Learn More
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={4} className="home__hero-stats">
                                    {[
                                        { number: '10K+', label: 'Happy Patients' },
                                        { number: '50+', label: 'Specialists' },
                                        { number: '24/7', label: 'Support' }
                                    ].map((stat, index) => (
                                        <Grid item xs={4} key={index}>
                                            <FormLabel component="div" sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '2.5rem' }}>
                                                {stat.number}
                                            </FormLabel>
                                            <FormLabel component="div" sx={{ color: 'text.secondary' }}>
                                                {stat.label}
                                            </FormLabel>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} sm={6}>
                            <Paper elevation={0} className="home__hero-image">
                                <img
                                    src={heroImage}
                                    alt="Professional healthcare team"
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>

            {/* Services Section */}
            <Grid container id="services" className="home__services">
                <Container maxWidth="lg">
                    <Grid container direction="column" alignItems="center" sx={{ mb: 6 }}>
                        <Grid item>
                            <FormLabel component="h2" sx={{
                                display: 'block',
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                fontWeight: 'bold',
                                color: 'text.primary',
                                mb: 2,
                                textAlign: 'center'
                            }}>
                                Our Services
                            </FormLabel>
                        </Grid>
                        <Grid item>
                            <FormLabel component="p" sx={{
                                color: 'text.secondary',
                                maxWidth: 600,
                                textAlign: 'center',
                                display: 'block'
                            }}>
                                Comprehensive healthcare solutions tailored to your needs
                            </FormLabel>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        {services.map((service, index) => (
                            <Grid item xs={12} sm={4} md={4} key={index}>
                                <Card className="home__services-card" elevation={2}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item className="home__services-card-icon">
                                                {service.icon}
                                                <FormLabel component="h3" sx={{
                                                    display: 'block',
                                                    fontSize: '1.25rem',
                                                    fontWeight: 600,
                                                    color: 'text.primary',
                                                    mb: 1
                                                }}>
                                                    {service.title}
                                                </FormLabel>
                                            </Grid>
                                            <Grid item>
                                                <FormLabel component="p" sx={{ color: 'text.secondary' }}>
                                                    {service.description}
                                                </FormLabel>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Grid >

            {/* Why Choose Us */}
            < Grid container id="about" className="home__benefits" >
                <Container maxWidth="lg">
                    <Grid container direction="column" alignItems="center" sx={{ mb: 6 }}>
                        <Grid item>
                            <FormLabel component="h2" sx={{
                                display: 'block',
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                fontWeight: 'bold',
                                color: 'text.primary',
                                mb: 2,
                                textAlign: 'center'
                            }}>
                                Why Choose HealthCare+
                            </FormLabel>
                        </Grid>
                        <Grid item>
                            <FormLabel component="p" sx={{
                                color: 'text.secondary',
                                maxWidth: 600,
                                textAlign: 'center',
                                display: 'block'
                            }}>
                                We're committed to providing exceptional care with a personal touch
                            </FormLabel>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        {benefits.map((benefit, index) => (
                            <Grid item xs={12} sm={6} lg={3} key={index}>
                                <Grid container direction="column" alignItems="center" className="home__benefits-item">
                                    <Grid item className="home__benefits-item-icon">
                                        {benefit.icon}
                                    </Grid>
                                    <Grid item>
                                        <FormLabel component="h3" sx={{
                                            display: 'block',
                                            fontSize: '1.25rem',
                                            fontWeight: 600,
                                            color: 'text.primary',
                                            mb: 1,
                                            textAlign: 'center'
                                        }}>
                                            {benefit.title}
                                        </FormLabel>
                                    </Grid>
                                    <Grid item>
                                        <FormLabel component="p" sx={{
                                            color: 'text.secondary',
                                            textAlign: 'center',
                                            display: 'block'
                                        }}>
                                            {benefit.description}
                                        </FormLabel>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Grid >

            {/* CTA Section */}
            < Grid container className="home__cta" >
                <Container maxWidth="md">
                    <Grid container direction="column" alignItems="center" spacing={3}>
                        <Grid item>
                            <FormLabel component="h2" sx={{
                                display: 'block',
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                Ready to Get Started?
                            </FormLabel>
                        </Grid>
                        <Grid item>
                            <FormLabel component="p" sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                maxWidth: 600,
                                textAlign: 'center',
                                display: 'block'
                            }}>
                                Book your appointment today and take the first step towards better health
                            </FormLabel>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<Event />}
                                sx={{ px: 4 }}
                            >
                                Book Your Appointment
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Grid >

            {/* Footer */}
            < Grid container id="contact" component="footer" className="home__footer" >
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <Grid container direction="column" className="home__footer-section">
                                <Grid item container alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                    <Grid item>
                                        <Favorite color="primary" />
                                    </Grid>
                                    <Grid item>
                                        <FormLabel component="span" sx={{
                                            fontWeight: 'bold',
                                            fontSize: '1.25rem',
                                            color: 'text.primary'
                                        }}>
                                            HealthCare+
                                        </FormLabel>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <FormLabel component="p" sx={{ color: 'text.secondary' }}>
                                        Providing quality healthcare services with compassion and excellence.
                                    </FormLabel>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Grid container direction="column" className="home__footer-section">
                                <Grid item>
                                    <FormLabel component="h4" sx={{
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 2,
                                        display: 'block'
                                    }}>
                                        Services
                                    </FormLabel>
                                </Grid>
                                <Grid item>
                                    <List>
                                        {['Primary Care', 'Specialist Consultations', 'Emergency Services', 'Preventive Care'].map((item) => (
                                            <ListItem key={item} sx={{ py: 0.5 }}>
                                                <FormLabel component="span" sx={{ color: 'text.secondary' }}>
                                                    {item}
                                                </FormLabel>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Grid container direction="column" className="home__footer-section">
                                <Grid item>
                                    <FormLabel component="h4" sx={{
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 2,
                                        display: 'block'
                                    }}>
                                        Company
                                    </FormLabel>
                                </Grid>
                                <Grid item>
                                    <List>
                                        {['About Us', 'Our Team', 'Careers', 'Contact'].map((item) => (
                                            <ListItem key={item} sx={{ py: 0.5 }}>
                                                <FormLabel component="span" sx={{ color: 'text.secondary' }}>
                                                    {item}
                                                </FormLabel>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Grid container direction="column" className="home__footer-section">
                                <Grid item>
                                    <FormLabel component="h4" sx={{
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 2,
                                        display: 'block'
                                    }}>
                                        Contact
                                    </FormLabel>
                                </Grid>
                                <Grid item>
                                    <List>
                                        {[
                                            '123 Healthcare Ave',
                                            'Medical City, MC 12345',
                                            'Phone: (555) 123-4567',
                                            'Email: info@healthcareplus.com'
                                        ].map((item) => (
                                            <ListItem key={item} sx={{ py: 0.5 }}>
                                                <FormLabel component="span" sx={{ color: 'text.secondary' }}>
                                                    {item}
                                                </FormLabel>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" className="home__footer-copyright">
                        <Grid item>
                            <FormLabel component="p" sx={{ color: 'text.secondary' }}>
                                © 2024 HealthCare+. All rights reserved.
                            </FormLabel>
                        </Grid>
                    </Grid>
                </Container>
            </Grid >
        </div >
    );
};

const services = [
    {
        icon: <Favorite className="h-6 w-6 text-primary" />,
        title: "Primary Care",
        description: "Health screenings and preventive care for the whole family."
    },
    {
        icon: <Group className="h-6 w-6 text-primary" />,
        title: "Specialist Consultations",
        description: "Access to expert specialists across multiple medical disciplines."
    },
    {
        icon: <Security className="h-6 w-6 text-primary" />,
        title: "Emergency Services",
        description: "24/7 emergency care with rapid response and expert treatment."
    },
    {
        icon: <Event className="h-6 w-6 text-primary" />,
        title: "Scheduled Appointments",
        description: "Flexible scheduling with online booking for your convenience."
    },
    {
        icon: <AccessTime className="h-6 w-6 text-primary" />,
        title: "Urgent Care",
        description: "Fast treatment for non-life-threatening conditions without appointment."
    },
    {
        icon: <CheckCircle className="h-6 w-6 text-primary" />,
        title: "Preventive Care",
        description: "Regular check-ups and health assessments to keep you healthy."
    }
];

const benefits = [
    {
        icon: <Security className="h-8 w-8 text-primary" />,
        title: "Trusted Care",
        description: "Certified professionals with years of experience"
    },
    {
        icon: <AccessTime className="h-8 w-8 text-primary" />,
        title: "24/7 Available",
        description: "Round-the-clock support whenever you need it"
    },
    {
        icon: <Favorite className="h-8 w-8 text-primary" />,
        title: "Patient-Focused",
        description: "Your health and comfort are our top priority"
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-primary" />,
        title: "Quality Service",
        description: "State-of-the-art facilities and modern treatment"
    }
];

export default Index;
