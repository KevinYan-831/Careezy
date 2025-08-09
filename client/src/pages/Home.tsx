import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Stack,
  Fade,
  Slide,
  Grow,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Build as BuildIcon,
  Search as SearchIcon,
  Psychology as PsychologyIcon,
  Dashboard as DashboardIcon,
  ArrowForward as ArrowForwardIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Speed as SpeedIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Instagram as InstagramIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <BuildIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Smart Resume Builder',
      description: 'Create professional resumes with AI-powered suggestions and real-time formatting.',
      action: 'Build Resume',
      path: '/resume-builder',
      stats: '50K+ resumes created',
      color: '#2563eb',
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Internship Aggregator',
      description: 'Discover thousands of internship opportunities from top companies worldwide.',
      action: 'Explore Internships',
      path: '/internships',
      stats: '10K+ opportunities',
      color: '#10b981',
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: 'AI Career Coach',
      description: 'Get personalized career advice and skill recommendations powered by AI.',
      action: 'Get Coaching',
      path: '/dashboard',
      stats: '95% success rate',
      color: '#f59e0b',
    },
    {
      icon: <DashboardIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      title: 'Personal Dashboard',
      description: 'Track your applications, progress, and career development in one place.',
      action: 'View Dashboard',
      path: '/dashboard',
      stats: '24/7 tracking',
      color: '#ef4444',
    },
  ];



  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={isVisible} timeout={1000}>
                <Box>
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      color: 'white',
                      mb: 3,
                      fontWeight: 800,
                      background: 'linear-gradient(45deg, #ffffff 30%, #e0e7ff 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Careezy
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'rgba(255,255,255,0.9)',
                      mb: 3,
                      fontWeight: 400,
                      lineHeight: 1.3,
                    }}
                  >
                    Your entire career journey in one place
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      mb: 4,
                      fontWeight: 400,
                    }}
                  >
                    Build standout resumes, discover perfect internships, and get AI-powered career guidance.
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/register')}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': {
                          bgcolor: 'grey.100',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Get Started Free
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/resume-builder')}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Try Demo
                    </Button>
                  </Stack>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ color: '#fbbf24', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        4.9/5 from 1000+ students
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon sx={{ color: '#10b981', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        95% success rate
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slide direction="left" in={isVisible} timeout={1200}>
                <Box
                  sx={{
                    position: 'relative',
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Animated Feature Showcase */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {features.map((feature, index) => (
                      <Grow
                        key={index}
                        in={currentFeature === index}
                        timeout={500}
                        style={{
                          position: 'absolute',
                          display: currentFeature === index ? 'block' : 'none',
                        }}
                      >
                        <Card
                          sx={{
                            p: 4,
                            textAlign: 'center',
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 4,
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            border: `2px solid ${feature.color}`,
                            minWidth: 300,
                          }}
                        >
                          <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                          <Typography variant="h6" gutterBottom>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {feature.description}
                          </Typography>
                          <Chip
                            label={feature.stats}
                            sx={{ bgcolor: feature.color, color: 'white' }}
                          />
                        </Card>
                      </Grow>
                    ))}
                  </Box>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h2" gutterBottom>
            Everything you need to succeed
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            From building standout resumes to landing your dream internship, we've got every step covered
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Fade in={isVisible} timeout={1000 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    },
                  }}
                  onClick={() => navigate(feature.path)}
                >
                  <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {feature.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{ borderColor: feature.color, color: feature.color }}
                  >
                    {feature.action}
                  </Button>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

        {/* About Section */}
        <Box id="about" sx={{ bgcolor: 'grey.50', py: 12 }}>
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <Typography variant="h2" component="h2" gutterBottom>
              About Careezy
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
              Careezy is the ultimate platform for students and recent graduates to accelerate their career journey. 
              We combine cutting-edge AI technology with comprehensive career tools to help you build standout resumes, 
              discover perfect internship opportunities, and receive personalized career guidance.
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    10,000+
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Students Helped
                  </Typography>
                  <Typography color="text.secondary">
                    Thousands of students have successfully launched their careers with Careezy
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    500+
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Partner Companies
                  </Typography>
                  <Typography color="text.secondary">
                    We work with leading companies to bring you the best internship opportunities
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    95%
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Success Rate
                  </Typography>
                  <Typography color="text.secondary">
                    Our users report significant improvement in their job application success
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Stats Section */}
        <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <Grid container spacing={4} textAlign="center">
          {[
            { number: '50K+', label: 'Resumes Created', icon: <BuildIcon /> },
            { number: '10K+', label: 'Internships Listed', icon: <SearchIcon /> },
            { number: '95%', label: 'Success Rate', icon: <TrendingUpIcon /> },
            { number: '24/7', label: 'AI Support', icon: <SpeedIcon /> },
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Fade in={isVisible} timeout={1400 + index * 100}>
                <Box>
                  <Box sx={{ mb: 2, color: 'primary.main' }}>{stat.icon}</Box>
                  <Typography variant="h3" color="primary.main" gutterBottom fontWeight={700}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h2" sx={{ color: 'white', mb: 3 }}>
            Ready to launch your career?
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 6 }}>
            Join thousands of students who have successfully landed their dream internships with Careezy
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Start Building Your Future
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ bgcolor: 'grey.900', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                Careezy
              </Typography>
              <Typography variant="body1" sx={{ color: 'grey.400', mb: 4, maxWidth: 500 }}>
                Empowering students to build successful careers through AI-powered tools, 
                comprehensive internship discovery, and personalized career guidance.
              </Typography>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Connect with us
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  }}
                >
                  <InstagramIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                {[
                  { label: 'Resume Builder', path: '/resume-builder' },
                  { label: 'Internship Explorer', path: '/internships' },
                  { label: 'AI Career Coach', path: '/dashboard' },
                  { label: 'Dashboard', path: '/dashboard' },
                ].map((link, index) => (
                  <Button
                    key={index}
                    onClick={() => navigate(link.path)}
                    sx={{
                      color: 'grey.400',
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      '&:hover': { color: 'white' },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 6, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              © 2025 Careezy. All rights reserved. Powered by DeepSeek AI.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;