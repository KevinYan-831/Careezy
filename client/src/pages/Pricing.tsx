import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack,
  Fade,
  Grow,
  useTheme,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Star as StarIcon,
  Psychology as PsychologyIcon,
  Build as BuildIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Section from '../components/layout/Section';
import ResponsiveGrid, { ResponsiveGridItem } from '../components/layout/ResponsiveGrid';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with your career journey',
      features: [
        'Smart Resume Builder',
        'Real-time Editing',
        'Internship Search',
        'Career Planning Tools',
        'Basic Templates',
        'PDF Export',
        'Community Support',
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outlined' as const,
      popular: false,
      color: theme.palette.primary.main,
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$9.99',
      period: 'per month',
      description: 'Unlock your full potential with AI-powered career coaching',
      features: [
        'Everything in Free Plan',
        'AI Career Coach',
        'Personalized Career Advice',
        'Advanced Resume Analytics',
        'Premium Templates',
        'Priority Support',
        'Interview Preparation',
        'Skill Gap Analysis',
        'Career Path Recommendations',
        'Unlimited Resume Versions',
      ],
      buttonText: 'Start Premium Trial',
      buttonVariant: 'contained' as const,
      popular: true,
      color: theme.palette.secondary.main,
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
    },
  ];

  const handlePlanSelect = (planId: string) => {
    if (planId === 'free') {
      navigate('/register');
    } else {
      navigate('/register?plan=premium');
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Section
        background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        sx={{
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
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
        }}
      >
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={1000}>
            <Box textAlign="center" sx={{ mb: 8 }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  mb: 3,
                  fontWeight: 900,
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  background: 'linear-gradient(45deg, #ffffff 30%, #f0f9ff 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                Choose Your Plan
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 400,
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Start your career journey with our free plan or unlock advanced AI coaching with Premium
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Section>

      {/* Pricing Cards */}
      <Section sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <ResponsiveGrid spacing={4} justifyContent="center">
            {plans.map((plan, index) => (
              <ResponsiveGridItem key={plan.id} xs={12} md={6} lg={5}>
                <Grow in={isVisible} timeout={1000 + index * 200}>
                  <Card
                    onMouseEnter={() => setHoveredPlan(plan.id)}
                    onMouseLeave={() => setHoveredPlan(null)}
                    sx={{
                      height: '100%',
                      position: 'relative',
                      borderRadius: 4,
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredPlan === plan.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                      boxShadow: plan.popular
                        ? '0 20px 60px rgba(16, 185, 129, 0.15), 0 0 0 2px #10b981'
                        : hoveredPlan === plan.id
                        ? '0 20px 60px rgba(0,0,0,0.15)'
                        : '0 8px 30px rgba(0,0,0,0.08)',
                      border: plan.popular ? '2px solid' : '1px solid',
                      borderColor: plan.popular ? 'secondary.main' : 'grey.200',
                      '&::before': plan.popular ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #10b981, #34d399)',
                      } : {},
                    }}
                  >
                    {plan.popular && (
                      <Chip
                        label="Most Popular"
                        icon={<StarIcon />}
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: 'secondary.main',
                          color: 'white',
                          fontWeight: 600,
                          zIndex: 1,
                        }}
                      />
                    )}
                    
                    <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Plan Header */}
                      <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: `${plan.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            color: plan.color,
                          }}
                        >
                          {plan.icon}
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                          {plan.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                          {plan.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
                          <Typography
                            variant="h2"
                            sx={{
                              fontWeight: 900,
                              color: plan.color,
                            }}
                          >
                            {plan.price}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {plan.period}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Features List */}
                      <List sx={{ flexGrow: 1, py: 0 }}>
                        {plan.features.map((feature, featureIndex) => (
                          <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckIcon sx={{ color: plan.color, fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '0.95rem',
                                  fontWeight: feature.includes('Everything in') ? 600 : 400,
                                  color: feature.includes('Everything in') ? plan.color : 'text.primary',
                                },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      {/* CTA Button */}
                      <Button
                        variant={plan.buttonVariant}
                        size="large"
                        fullWidth
                        onClick={() => handlePlanSelect(plan.id)}
                        sx={{
                          mt: 3,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: 'none',
                          ...(plan.buttonVariant === 'contained' && {
                            bgcolor: plan.color,
                            '&:hover': {
                              bgcolor: plan.color,
                              filter: 'brightness(0.9)',
                            },
                          }),
                          ...(plan.buttonVariant === 'outlined' && {
                            borderColor: plan.color,
                            color: plan.color,
                            '&:hover': {
                              bgcolor: `${plan.color}08`,
                              borderColor: plan.color,
                            },
                          }),
                        }}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                </Grow>
              </ResponsiveGridItem>
            ))}
          </ResponsiveGrid>
        </Container>
      </Section>

      {/* FAQ or Additional Info Section */}
      <Section sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Fade in={isVisible} timeout={1500}>
            <Box textAlign="center">
              <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
                Why Choose Careezy?
              </Typography>
              <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <TrendingUpIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      95% Success Rate
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Our users land internships 95% faster than traditional methods
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <PsychologyIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      AI-Powered Coaching
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Get personalized career advice tailored to your goals and skills
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <SearchIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      10K+ Opportunities
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Access thousands of internship opportunities from top companies
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Section>
    </Box>
  );
};

export default Pricing;