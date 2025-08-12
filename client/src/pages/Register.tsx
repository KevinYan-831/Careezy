import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link as MuiLink,
  Divider,
  IconButton,
  InputAdornment,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileType: 'freshman' | 'current_student';
}

const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .matches(passwordRules, 'At least 8 characters, including a letter, a number, and a special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  profileType: yup.string().oneOf(['freshman', 'current_student']).required('Please select your profile type'),
});

const steps = ['Profile Type', 'Account Details'];

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      profileType: 'current_student',
    },
  });

  const profileType = watch('profileType');

  const handleNext = async () => {
    if (activeStep === 0) {
      const isValid = await trigger('profileType');
      if (isValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/auth/register', {
        firstName: data.firstName,
        lastName: data.lastName,
        // Normalize email to lowercase to match backend uniqueness constraint
        email: data.email.trim().toLowerCase(),
        password: data.password,
        profileType: data.profileType,
      });
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect based on profile type
      if (data.profileType === 'freshman') {
        navigate('/resume?onboarding=true');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Social login handled by GoogleLogin component

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What best describes you?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This helps us customize your experience and provide relevant features.
            </Typography>
            
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={profileType}
                onChange={async (_e, val) => {
                  const v = (val as 'freshman' | 'current_student') ?? 'current_student';
                  setValue('profileType', v, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                  await trigger('profileType');
                }}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 2,
                    border: profileType === 'freshman' ? '2px solid' : '1px solid',
                    borderColor: profileType === 'freshman' ? 'primary.main' : 'divider',
                  }}
                >
                  <FormControlLabel
                    value="freshman"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Incoming College Freshman
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          I'm about to start college and want to upload my Common App profile
                          to create a professional resume.
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>
                
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    border: profileType === 'current_student' ? '2px solid' : '1px solid',
                    borderColor: profileType === 'current_student' ? 'primary.main' : 'divider',
                  }}
                >
                  <FormControlLabel
                    value="current_student"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Current College Student
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          I'm currently in college and want to build my resume by adding
                          experience, projects, and skills manually.
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>
              </RadioGroup>
              {/* keep RHF field registered for validation */}
              <input type="hidden" value={profileType} {...register('profileType')} />
              {errors.profileType && (
                <Typography color="error" variant="caption">
                  {errors.profileType.message}
                </Typography>
              )}
            </FormControl>
          </Box>
        );
      
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Create Your Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Fill in your details to get started with Careezy.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                required
                fullWidth
                label="First Name"
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                required
                fullWidth
                label="Last Name"
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Box>
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
            Join Careezy
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            {renderStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ px: 4 }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext} sx={{ px: 4 }}>
                  Next
                </Button>
              )}
            </Box>
          </Box>

          {activeStep === 0 && (
            <>
              <Divider sx={{ my: 3, width: '100%' }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, width: '100%' }}>
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      if (!credentialResponse.credential) throw new Error('No credential received');
                      const resp = await axios.post('/api/auth/google', { idToken: credentialResponse.credential });
                      localStorage.setItem('token', resp.data.token);
                      localStorage.setItem('user', JSON.stringify(resp.data.user));
                      window.location.href = '/dashboard';
                    } catch (e: any) {
                      setError(e.response?.data?.message || 'Google sign-in failed. Please try again.');
                    }
                  }}
                  onError={() => setError('Google sign-in failed. Please try again.')}
                  useOneTap={false}
                />
              </Box>
            </>
          )}

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <MuiLink component={Link} to="/login" variant="body2">
                Sign in here
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;