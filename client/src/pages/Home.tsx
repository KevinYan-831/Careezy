import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Zoom,
  Collapse,
  useScrollTrigger,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Section from '../components/layout/Section';
import ResponsiveGrid, { ResponsiveGridItem } from '../components/layout/ResponsiveGrid';
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
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from '@mui/icons-material';
import CareezyLogo from '../assets/Careezy-Logo.png';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({ students: 0, companies: 0, success: 0 });

  // reusable animation function
  const animateNumbers = useCallback((key?: 'students' | 'companies' | 'success', targetValue?: number) => {
      const targets = { students: 5000, companies: 200, success: 95 };

      // if a specific key is provided, animate only that metric
      if (key) {
        setAnimatedNumbers(prev => ({ ...prev, [key]: 0 }));
        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;
        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          setAnimatedNumbers(prev => ({ ...prev, [key]: Math.floor((targetValue ?? targets[key]) * progress) }));
          if (currentStep >= steps) {
            clearInterval(timer);
            setAnimatedNumbers(prev => ({ ...prev, [key]: (targetValue ?? targets[key]) }));
          }
        }, stepTime);
        return;
      }

      // otherwise animate all stats (initial load)
      setAnimatedNumbers({ students: 0, companies: 0, success: 0 });
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setAnimatedNumbers({
          students: Math.floor(targets.students * progress),
          companies: Math.floor(targets.companies * progress),
          success: Math.floor(targets.success * progress),
        });
        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedNumbers(targets);
        }
      }, stepTime);
    }, []);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 4000);
    
    // Trigger stats animation after a delay
    const statsTimer = setTimeout(() => {
      setAnimatedStats(true);
    }, 1500);
    
    return () => {
      clearInterval(interval);
      clearTimeout(statsTimer);
    };
  }, []);

  // Number animation effect (initial trigger)
  useEffect(() => {
    if (animatedStats) {
      animateNumbers();
    }
  }, [animatedStats, animateNumbers]);

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
      <Section
        background="#ffffff"
        fullHeight
        centerContent
        sx={{
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '90vh', md: '80vh' },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'transparent',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            display: 'none',
          },
          '@keyframes float': {},
        }}
      >
        <ResponsiveGrid spacing={6} alignItems="center" justifyContent="center">
          <ResponsiveGridItem xs={12} md={6}>
              <Fade in={isVisible} timeout={1000}>
                <Box>
                  {/* Hero Title Section */}
                  <Box sx={{ 
                    textAlign: { xs: 'center', md: 'left' },
                    mb: 4 
                  }}>
                    <Typography
                      variant="h1"
                      component="h1"
                      sx={{
                        color: '#000000',
                        fontWeight: 900,
                        fontSize: { xs: '3.5rem', md: '4.5rem', lg: '6rem' },
                        textShadow: 'none',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                        textRendering: 'optimizeLegibility',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        mb: 2
                      }}
                    >
                      Your Career Journey
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                      <img 
                        src={CareezyLogo} 
                        alt="Careezy Logo" 
                        style={{ 
                          height: '48px', 
                          width: 'auto'
                        }} 
                      />
                      <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                          color: '#00796B',
                          fontWeight: 700,
                          fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                          letterSpacing: '-0.01em',
                          lineHeight: 1.2,
                          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                        }}
                      >
                        Starts at Careezy
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#000000',
                      mb: 3,
                      fontWeight: 600,
                      lineHeight: 1.4,
                      fontSize: { xs: '1.4rem', md: '1.8rem', lg: '2rem' },
                      textShadow: 'none',
                      letterSpacing: '0.005em',
                      textAlign: { xs: 'center', md: 'left' },
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                    }}
                  >
                    Build resumes, find internships, get AI guidance
                  </Typography>
                  <Grow in={isVisible} timeout={1500}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#000000',
                        mb: 5,
                        fontWeight: 500,
                        fontSize: { xs: '1.3rem', md: '1.5rem', lg: '1.7rem' },
                        lineHeight: 1.8,
                        textShadow: '0 3px 10px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)',
                        letterSpacing: '0.005em',
                        maxWidth: '650px',
                        textAlign: { xs: 'center', md: 'left' },
                        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                        textRendering: 'optimizeLegibility',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                      }}
                    >
                      Build professional resumes, discover internships, and get AI-powered career guidance all in one platform
                    </Typography>
                  </Grow>
                  <Zoom in={isVisible} timeout={1800}>
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={3} 
                      sx={{ 
                        mb: 6,
                        alignItems: { xs: 'center', md: 'flex-start' },
                        justifyContent: { xs: 'center', md: 'flex-start' },
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/register')}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          bgcolor: '#00796B',
                          color: '#ffffff',
                           fontWeight: 900,
                           px: { xs: 4, sm: 5, md: 6 },
                           py: { xs: 1.8, sm: 2.2, md: 2.5 },
                           fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
                           borderRadius: 3,
                           textTransform: 'none',
                           boxShadow: '0 10px 30px rgba(0,121,107,0.35)',
                           position: 'relative',
                           overflow: 'hidden',
                           animation: 'pulse 2s ease-in-out infinite',
                           fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                           textRendering: 'optimizeLegibility',
                           WebkitFontSmoothing: 'antialiased',
                           MozOsxFontSmoothing: 'grayscale',
                           letterSpacing: '0.02em',
                           '&::before': {
                             content: '""',
                             position: 'absolute',
                             top: 0,
                             left: '-100%',
                             width: '100%',
                             height: '100%',
                             background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                             transition: 'left 0.6s',
                           },
                           '&:hover': {
                            bgcolor: '#00796B',
                             transform: 'translateY(-4px) scale(1.05)',
                            boxShadow: '0 14px 36px rgba(0,121,107,0.4)',
                             '&::before': {
                               left: '100%',
                             },
                           },
                           '@keyframes pulse': {
                             '0%, 100%': { boxShadow: '0 8px 26px rgba(0,121,107,0.28)' },
                             '50%': { boxShadow: '0 8px 26px rgba(0,121,107,0.36), 0 0 14px rgba(255,255,255,0.4)' },
                           },
                         }}
                       >
                         Get Started
                      </Button>
                    </Stack>
                  </Zoom>

                </Box>
              </Fade>
            </ResponsiveGridItem>
            <ResponsiveGridItem xs={12} md={6}>
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
                      height: '500px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      mt: 4,
                      mb: 4,
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
                            p: 3,
                            textAlign: 'center',
                            background: '#ffffff',
                            borderRadius: 3,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                            border: `2px solid ${feature.color}30`,
                            minWidth: 280,
                            maxWidth: 320,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                              border: `2px solid ${feature.color}`,
                            },
                          }}
                          onClick={() => navigate(feature.path)}
                        >
                          <Box sx={{ 
                            mb: 2,
                            color: feature.color,
                          }}>
                            {feature.icon}
                          </Box>
                          <Typography variant="h6" gutterBottom sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            mb: 1.5,
                            fontSize: '1.3rem',
                            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                            textRendering: 'optimizeLegibility',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale',
                            letterSpacing: '0.005em'
                          }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ 
                            mb: 2,
                            lineHeight: 1.6,
                            fontSize: '1rem',
                            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                            textRendering: 'optimizeLegibility',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale',
                            fontWeight: 400
                          }}>
                            {feature.description}
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Chip
                              label={feature.stats}
                              size="small"
                              sx={{ 
                                bgcolor: `${feature.color}20`, 
                                color: feature.color,
                                fontWeight: 600,
                                fontSize: '0.8rem',
                              }}
                            />
                            <Button
                              variant="text"
                              size="small"
                              sx={{
                                color: feature.color,
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                '&:hover': {
                                  bgcolor: `${feature.color}10`,
                                }
                              }}
                            >
                              {feature.action}
                            </Button>
                          </Box>
                        </Card>
                      </Grow>
                    ))}
                  </Box>
                </Box>
              </Slide>
            </ResponsiveGridItem>
          </ResponsiveGrid>
        </Section>

      {/* Features Section */}
      <Section centerContent sx={{
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: 'transparent',
          borderRadius: '50%',
          animation: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '30%',
          right: '8%',
          width: '150px',
          height: '150px',
          background: 'transparent',
          borderRadius: '50%',
          animation: 'none',
        },

      }}>
        <Box sx={{ textAlign: 'center', mb: 8, position: 'relative', zIndex: 1 }}>
          <Slide direction="up" in={isVisible} timeout={1000}>
            <Typography variant="h2" component="h2" gutterBottom sx={{
              fontWeight: 900,
              fontSize: { xs: '3rem', md: '4.2rem' },
              color: '#1e293b',
              mb: 3,
              textShadow: 'none',
              letterSpacing: '-0.02em',
              position: 'relative',
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '3px',
                background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                borderRadius: '2px',
                animation: 'expandLine 2s ease-out 0.5s both',
              },
              '@keyframes expandLine': {
                '0%': { width: '0px', opacity: 0 },
                '100%': { width: '120px', opacity: 1 },
              },
            }}>
              Everything you need to succeed
            </Typography>
          </Slide>
          <Grow in={isVisible} timeout={1200}>
            <Typography variant="h6" color="text.secondary" sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              fontSize: '1.4rem',
              lineHeight: 1.8,
              fontWeight: 500,
              textShadow: '0 1px 3px rgba(0,0,0,0.1)',
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              letterSpacing: '0.005em'
            }}>
              From building standout resumes to landing your dream internship, we've got every step covered
            </Typography>
          </Grow>
        </Box>

        {/* Carousel Container */}
        <Box sx={{ 
           position: 'relative',
           width: '100%',
           height: '500px',
           overflow: 'hidden',
           borderRadius: 4,
           background: '#ffffff',
           border: '1px solid rgba(255,255,255,0.2)',
           boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
         }}>
          {/* Carousel Track */}
          <Box sx={{
            display: 'flex',
            width: '400%',
            height: '100%',
            transform: `translateX(-${currentFeature * 25}%)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ 
                width: '25%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4
              }}>
                <Card
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => navigate(feature.path)}
                  sx={{
                    width: '90%',
                    maxWidth: '400px',
                    height: '400px',
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    borderRadius: 4,
                    border: hoveredCard === index ? `3px solid ${feature.color}` : '3px solid transparent',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}08)`,
                      opacity: hoveredCard === index ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                      zIndex: 0,
                    },
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: `0 20px 40px rgba(0,0,0,0.15), 0 0 20px ${feature.color}30`,
                    },
                  }}
                >
                  <Box sx={{ 
                    mb: 3,
                    position: 'relative',
                    zIndex: 1,
                    transition: 'transform 0.3s ease',
                    transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{
                    fontWeight: 700,
                    position: 'relative',
                    zIndex: 1,
                    color: hoveredCard === index ? feature.color : 'text.primary',
                    transition: 'color 0.3s ease',
                    fontSize: '1.4rem',
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    mb: 2
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ 
                    mb: 3,
                    position: 'relative',
                    zIndex: 1,
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    flex: 1
                  }}>
                    {feature.description}
                  </Typography>
                  <Button
                    variant={hoveredCard === index ? "contained" : "outlined"}
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      borderColor: feature.color, 
                      color: hoveredCard === index ? 'white' : feature.color,
                      bgcolor: hoveredCard === index ? feature.color : 'transparent',
                      position: 'relative',
                      zIndex: 1,
                      fontWeight: 600,
                      py: 1.5,
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      textTransform: 'none',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    {feature.action}
                  </Button>
                </Card>
              </Box>
            ))}
          </Box>
          
          {/* Navigation Arrows */}
          <Box
            onClick={() => setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)}
            sx={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
                transform: 'translateY(-50%) scale(1.1)'
              }
            }}
          >
            <ArrowBackIosIcon />
          </Box>
          
          <Box
            onClick={() => setCurrentFeature((prev) => (prev + 1) % features.length)}
            sx={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
                transform: 'translateY(-50%) scale(1.1)'
              }
            }}
          >
            <ArrowForwardIosIcon />
          </Box>

          {/* Carousel Indicators */}
          <Box sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 2
          }}>
            {features.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentFeature(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: currentFeature === index ? 'black' : 'rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'black',
                    transform: 'scale(1.2)'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Section>

        {/* About Section */}
        <Section 
          id="about" 
            background="linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" 
          centerContent
          ref={(el) => {
            if (el && !animatedStats) {
              const observer = new IntersectionObserver(
                ([entry]) => {
                  if (entry.isIntersecting) {
                    setAnimatedStats(true);
                    observer.disconnect();
                  }
                },
                { threshold: 0.3 }
              );
              observer.observe(el);
            }
          }}
        >
          <Fade in={trigger} timeout={800}>
            <Typography variant="h2" component="h2" gutterBottom sx={{
              fontWeight: 800,
              fontSize: { xs: '2.8rem', md: '3.8rem' },
              color: '#1e293b',
              mb: 4,
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              letterSpacing: '-0.01em'
            }}>
              About Careezy
            </Typography>
          </Fade>
          <Fade in={trigger} timeout={1000}>
            <Typography variant="h6" color="text.secondary" sx={{ 
              mb: 6, 
              maxWidth: '900px', 
              mx: 'auto',
              fontSize: '1.35rem',
              lineHeight: 1.8,
              fontWeight: 500,
              textAlign: 'center',
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              letterSpacing: '0.005em'
            }}>
              Careezy is the ultimate platform for students and recent graduates to accelerate their career journey. 
              We combine cutting-edge AI technology with comprehensive career tools to help you build standout resumes, 
              discover perfect internship opportunities, and receive personalized career guidance.
            </Typography>
          </Fade>
          <ResponsiveGrid spacing={4} sx={{ mt: 4 }} justifyContent="center">
            {[
              { key: 'students', target: 5000, number: animatedNumbers.students, suffix: '+', title: 'Students Helped', desc: 'Thousands of students have successfully launched their careers with Careezy', color: '#2563eb' },
              { key: 'companies', target: 200, number: animatedNumbers.companies, suffix: '+', title: 'Partner Companies', desc: 'We work with leading companies to bring you the best internship opportunities', color: '#10b981' },
              { key: 'success', target: 95, number: animatedNumbers.success, suffix: '%', title: 'Success Rate', desc: 'Our users report significant improvement in their job application success', color: '#f59e0b' }
            ].map((stat, index) => (
              <ResponsiveGridItem xs={12} sm={6} md={4} key={index}>
                <Zoom in={trigger} timeout={1000 + index * 200}>
                  <Box onMouseEnter={() => animateNumbers(stat.key as any, stat.target)}
                    sx={{ 
                      p: 4, 
                      textAlign: 'center',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${stat.color}20`,
                      }
                    }}>
                    <Typography variant="h3" gutterBottom sx={{
                      fontWeight: 900,
                      color: stat.color,
                      fontSize: { xs: '2.8rem', md: '3.2rem' },
                      mb: 2,
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale'
                    }}>
                      {stat.number.toLocaleString()}{stat.suffix}
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{
                      fontWeight: 700,
                      color: 'text.primary',
                      mb: 2,
                      fontSize: '1.4rem',
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      letterSpacing: '0.005em'
                    }}>
                      {stat.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      fontWeight: 400
                    }}>
                      {stat.desc}
                    </Typography>
                  </Box>
                </Zoom>
              </ResponsiveGridItem>
            ))}
          </ResponsiveGrid>
        </Section>

      {/* Contact Section */}
      <Section background="grey.900">
          <ResponsiveGrid spacing={6}>
            <ResponsiveGridItem xs={12} md={8}>
              <Typography variant="h4" sx={{ 
                color: 'white', 
                mb: 2,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                fontWeight: 700,
                fontSize: '2.2rem'
              }}>
                Careezy
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'grey.400', 
                mb: 4, 
                maxWidth: 500,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}>
                Empowering students to build successful careers through AI-powered tools, 
                comprehensive internship discovery, and personalized career guidance.
              </Typography>
              <Typography variant="h6" sx={{ 
                color: 'white', 
                mb: 2,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                fontWeight: 600,
                fontSize: '1.3rem'
              }}>
                Connect with us
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    width: 60,
                    height: 60,
                    fontSize: '2rem',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    width: 60,
                    height: 60,
                    fontSize: '2rem',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    width: 60,
                    height: 60,
                    fontSize: '2rem',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                  }}
                >
                  <InstagramIcon />
                </IconButton>
              </Stack>
            </ResponsiveGridItem>
            <ResponsiveGridItem xs={12} md={4}>
              <Typography variant="h6" sx={{ 
                color: 'white', 
                mb: 3,
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                fontWeight: 600,
                fontSize: '1.3rem'
              }}>
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
            </ResponsiveGridItem>
          </ResponsiveGrid>
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 6, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              © 2025 Careezy. All rights reserved. Powered by DeepSeek AI.
            </Typography>
          </Box>
      </Section>
    </Box>
  );
};

export default Home;