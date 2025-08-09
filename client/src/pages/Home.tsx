import React, { useState, useEffect, useRef } from 'react';
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

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const startValue = 0;
    const endValue = parseInt(end.replace(/[^0-9]/g, ''));

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * endValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <span ref={counterRef}>
      {prefix}{end.includes('%') ? count + '%' : formatNumber(count) + (end.includes('+') ? '+' : '')}{suffix}
    </span>
  );
};
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
} from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState(false);
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
        background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
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
            background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
            pointerEvents: 'none',
          },
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0px) rotate(0deg)',
            },
            '50%': {
              transform: 'translateY(-20px) rotate(180deg)',
            },
          },
        }}
      >
        <ResponsiveGrid spacing={6} alignItems="center" justifyContent="center">
          <ResponsiveGridItem xs={12} md={6}>
              <Fade in={isVisible} timeout={1000}>
                <Box>
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      color: 'white',
                      mb: 2,
                      fontWeight: 900,
                      fontSize: { xs: '3rem', md: '4rem', lg: '5rem' },
                      textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      textAlign: { xs: 'center', md: 'left' },
                    }}
                  >
                    Careezy
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'rgba(255,255,255,0.95)',
                      mb: 2,
                      fontWeight: 600,
                      lineHeight: 1.3,
                      fontSize: { xs: '1.25rem', md: '1.5rem', lg: '1.75rem' },
                      textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      letterSpacing: '0.01em',
                      textAlign: { xs: 'center', md: 'left' },
                    }}
                  >
                    Your entire career journey in one place
                  </Typography>
                  <Grow in={isVisible} timeout={1500}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        mb: 4,
                        fontWeight: 400,
                        fontSize: { xs: '1.1rem', md: '1.25rem', lg: '1.4rem' },
                        lineHeight: 1.6,
                        textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                        letterSpacing: '0.01em',
                        maxWidth: '600px',
                        textAlign: { xs: 'center', md: 'left' },
                      }}
                    >
                      Build professional resumes, discover internships, and get AI-powered career guidance all in one platform
                    </Typography>
                  </Grow>
                  <Zoom in={isVisible} timeout={1800}>
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={2} 
                      sx={{ 
                        mb: 4,
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
                          bgcolor: 'white',
                          color: 'primary.main',
                          fontWeight: 700,
                          px: 5,
                          py: 2,
                          fontSize: '1.2rem',
                          borderRadius: 3,
                          textTransform: 'none',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                          position: 'relative',
                          overflow: 'hidden',
                          animation: 'pulse 2s ease-in-out infinite',
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
                            bgcolor: 'grey.100',
                            transform: 'translateY(-4px) scale(1.05)',
                            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                            '&::before': {
                              left: '100%',
                            },
                          },
                          '@keyframes pulse': {
                            '0%, 100%': { boxShadow: '0 8px 32px rgba(0,0,0,0.2)' },
                            '50%': { boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.5)' },
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
                          fontWeight: 600,
                          px: 5,
                          py: 2,
                          fontSize: '1.2rem',
                          borderRadius: 3,
                          textTransform: 'none',
                          borderWidth: '2px',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '0%',
                            height: '100%',
                            background: 'rgba(255,255,255,0.1)',
                            transition: 'width 0.3s ease',
                          },
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.15)',
                            borderColor: 'white',
                            transform: 'translateY(-4px) scale(1.05)',
                            boxShadow: '0 8px 25px rgba(255,255,255,0.2)',
                            '&::before': {
                              width: '100%',
                            },
                          },
                        }}
                      >
                        Try Demo
                      </Button>
                    </Stack>
                  </Zoom>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
                    <Zoom in={animatedStats} timeout={800}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.15)',
                          transform: 'scale(1.05)',
                        }
                      }}>
                        <StarIcon sx={{ color: '#fbbf24', mr: 1, fontSize: 24 }} />
                        <Typography variant="body1" sx={{ 
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '1.1rem'
                        }}>
                          4.9/5 from 1000+ students
                        </Typography>
                      </Box>
                    </Zoom>
                    <Zoom in={animatedStats} timeout={1000}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.15)',
                          transform: 'scale(1.05)',
                        }
                      }}>
                        <TrendingUpIcon sx={{ color: '#10b981', mr: 1, fontSize: 24 }} />
                        <Typography variant="body1" sx={{ 
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '1.1rem'
                        }}>
                          95% success rate
                        </Typography>
                      </Box>
                    </Zoom>
                  </Stack>
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
                            p: 3,
                            textAlign: 'center',
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(10px)',
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
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 1.5,
                            fontSize: '1.2rem'
                          }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ 
                            mb: 2,
                            lineHeight: 1.5,
                            fontSize: '0.9rem'
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
          background: 'radial-gradient(circle, rgba(102,126,234,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'floatLeft 8s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '30%',
          right: '8%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(118,75,162,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'floatRight 10s ease-in-out infinite',
        },
        '@keyframes floatLeft': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-30px) translateX(20px)' },
          '66%': { transform: 'translateY(20px) translateX(-15px)' },
        },
        '@keyframes floatRight': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-40px) translateX(-25px)' },
        },
      }}>
        <Box sx={{ textAlign: 'center', mb: 8, position: 'relative', zIndex: 1 }}>
          <Slide direction="up" in={isVisible} timeout={1000}>
            <Typography variant="h2" component="h2" gutterBottom sx={{
              fontWeight: 900,
              fontSize: { xs: '2.8rem', md: '4rem' },
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              textShadow: '0 4px 20px rgba(37,99,235,0.3)',
              letterSpacing: '-0.02em',
              position: 'relative',
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
              fontSize: '1.3rem',
              lineHeight: 1.7,
              fontWeight: 500,
              textShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              From building standout resumes to landing your dream internship, we've got every step covered
            </Typography>
          </Grow>
        </Box>

        <ResponsiveGrid spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <ResponsiveGridItem xs={12} sm={6} md={6} lg={3} key={index}>
              <Fade in={isVisible} timeout={1000 + index * 200}>
                <Card
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => navigate(feature.path)}
                  sx={{
                    height: '100%',
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    borderRadius: 4,
                    border: hoveredCard === index ? `3px solid ${feature.color}` : '3px solid transparent',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
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
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: `conic-gradient(from 0deg, transparent, ${feature.color}20, transparent)`,
                      opacity: hoveredCard === index ? 1 : 0,
                      animation: hoveredCard === index ? 'rotate 3s linear infinite' : 'none',
                      zIndex: 0,
                    },
                    '&:hover': {
                      transform: 'translateY(-16px) scale(1.03) rotateX(5deg)',
                      boxShadow: `0 30px 60px rgba(0,0,0,0.2), 0 0 30px ${feature.color}30`,
                    },
                    '@keyframes rotate': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
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
                    fontSize: '1.3rem'
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ 
                    mb: 3,
                    position: 'relative',
                    zIndex: 1,
                    lineHeight: 1.6,
                    fontSize: '1rem'
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
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    {feature.action}
                  </Button>
                </Card>
              </Fade>
            </ResponsiveGridItem>
          ))}
        </ResponsiveGrid>
      </Section>

        {/* About Section */}
        <Section id="about" background="linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" centerContent>
          <Fade in={trigger} timeout={800}>
            <Typography variant="h2" component="h2" gutterBottom sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(45deg, #1e293b 30%, #475569 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4
            }}>
              About Careezy
            </Typography>
          </Fade>
          <Fade in={trigger} timeout={1000}>
            <Typography variant="h6" color="text.secondary" sx={{ 
              mb: 6, 
              maxWidth: '900px', 
              mx: 'auto',
              fontSize: '1.25rem',
              lineHeight: 1.7,
              fontWeight: 400,
              textAlign: 'center'
            }}>
              Careezy is the ultimate platform for students and recent graduates to accelerate their career journey. 
              We combine cutting-edge AI technology with comprehensive career tools to help you build standout resumes, 
              discover perfect internship opportunities, and receive personalized career guidance.
            </Typography>
          </Fade>
          <ResponsiveGrid spacing={4} sx={{ mt: 4 }} justifyContent="center">
            {[
              { number: '10,000+', title: 'Students Helped', desc: 'Thousands of students have successfully launched their careers with Careezy', color: '#2563eb' },
              { number: '500+', title: 'Partner Companies', desc: 'We work with leading companies to bring you the best internship opportunities', color: '#10b981' },
              { number: '95%', title: 'Success Rate', desc: 'Our users report significant improvement in their job application success', color: '#f59e0b' }
            ].map((stat, index) => (
              <ResponsiveGridItem xs={12} sm={6} md={4} key={index}>
                <Zoom in={trigger} timeout={1000 + index * 200}>
                  <Box sx={{ 
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
                      fontSize: { xs: '2.5rem', md: '3rem' },
                      mb: 2
                    }}>
                      <AnimatedCounter end={stat.number} duration={2000} />
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{
                      fontWeight: 700,
                      color: 'text.primary',
                      mb: 2
                    }}>
                      {stat.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{
                      fontSize: '1rem',
                      lineHeight: 1.6
                    }}>
                      {stat.desc}
                    </Typography>
                  </Box>
                </Zoom>
              </ResponsiveGridItem>
            ))}
          </ResponsiveGrid>
        </Section>

        {/* Stats Section */}
        <Section centerContent background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Fade in={trigger} timeout={800}>
              <Typography variant="h3" component="h2" gutterBottom sx={{
                fontWeight: 800,
                color: 'white',
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 3
              }}>
                Trusted by Thousands
              </Typography>
            </Fade>
            <Fade in={trigger} timeout={1000}>
              <Typography variant="h6" sx={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '1.2rem',
                maxWidth: '600px',
                mx: 'auto'
              }}>
                Join the growing community of successful students and professionals
              </Typography>
            </Fade>
          </Box>
          <ResponsiveGrid spacing={4} textAlign="center" justifyContent="center">
            {[
              { number: '50K+', label: 'Resumes Created', icon: <BuildIcon />, color: '#fbbf24' },
              { number: '10K+', label: 'Internships Listed', icon: <SearchIcon />, color: '#10b981' },
              { number: '95%', label: 'Success Rate', icon: <TrendingUpIcon />, color: '#f59e0b' },
              { number: '24/7', label: 'AI Support', icon: <SpeedIcon />, color: '#ef4444' },
            ].map((stat, index) => (
              <ResponsiveGridItem xs={6} sm={3} md={3} key={index}>
              <Zoom in={trigger} timeout={1400 + index * 200}>
                <Box sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.15)',
                  }
                }}>
                  <Box sx={{ 
                    mb: 2, 
                    color: stat.color,
                    fontSize: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" gutterBottom sx={{
                    fontWeight: 900,
                    color: 'white',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    mb: 2
                  }}>
                    <AnimatedCounter end={stat.number} duration={2500} />
                  </Typography>
                  <Typography variant="h6" sx={{
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Zoom>
            </ResponsiveGridItem>
          ))}
        </ResponsiveGrid>
      </Section>

      {/* CTA Section */}
      <Section
        background="linear-gradient(135deg, #1e293b 0%, #334155 100%)"
        centerContent
        containerMaxWidth="md"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
            zIndex: 0,
          }
        }}
      >
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Fade in={trigger} timeout={800}>
              <Typography variant="h2" component="h2" sx={{ 
                color: 'white', 
                mb: 3,
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}>
                Ready to launch your career?
              </Typography>
            </Fade>
            <Fade in={trigger} timeout={1000}>
              <Typography variant="h6" sx={{ 
                color: 'rgba(255,255,255,0.9)', 
                mb: 6,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                maxWidth: '600px',
                mx: 'auto'
              }}>
                Join thousands of students who have successfully landed their dream internships with Careezy
              </Typography>
            </Fade>
          </Box>
          <Zoom in={trigger} timeout={1200}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ position: 'relative', zIndex: 1 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 5,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(255,255,255,0.3)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'translateY(-6px) scale(1.05)',
                    boxShadow: '0 16px 48px rgba(255,255,255,0.4)',
                  },
                  '&:active': {
                    transform: 'translateY(-3px) scale(1.02)',
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
                  px: 5,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  borderWidth: 2,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.15)',
                    transform: 'translateY(-6px) scale(1.05)',
                    boxShadow: '0 16px 48px rgba(255,255,255,0.2)',
                  },
                  '&:active': {
                    transform: 'translateY(-3px) scale(1.02)',
                  },
                }}
              >
                Sign In
              </Button>
            </Stack>
          </Zoom>
      </Section>

      {/* Contact Section */}
      <Section background="grey.900">
          <ResponsiveGrid spacing={6}>
            <ResponsiveGridItem xs={12} md={8}>
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
            </ResponsiveGridItem>
            <ResponsiveGridItem xs={12} md={4}>
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