import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Language as WebsiteIcon,
} from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';

const PersonalInfoForm: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your basic contact information that will appear at the top of your resume.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            {...register('personalInfo.firstName', {
              required: 'First name is required',
            })}
            error={!!errors.personalInfo?.firstName}
            helperText={errors.personalInfo?.firstName?.message as string}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            {...register('personalInfo.lastName', {
              required: 'Last name is required',
            })}
            error={!!errors.personalInfo?.lastName}
            helperText={errors.personalInfo?.lastName?.message as string}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            {...register('personalInfo.email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.personalInfo?.email}
            helperText={errors.personalInfo?.email?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            {...register('personalInfo.phone')}
            error={!!errors.personalInfo?.phone}
            helperText={errors.personalInfo?.phone?.message as string}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            {...register('personalInfo.address')}
            error={!!errors.personalInfo?.address}
            helperText={errors.personalInfo?.address?.message as string}
            placeholder="City, State, ZIP Code"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Professional Links (Optional)
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="LinkedIn Profile"
            {...register('personalInfo.linkedin')}
            error={!!errors.personalInfo?.linkedin}
            helperText={errors.personalInfo?.linkedin?.message as string}
            placeholder="https://linkedin.com/in/yourprofile"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkedInIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="GitHub Profile"
            {...register('personalInfo.github')}
            error={!!errors.personalInfo?.github}
            helperText={errors.personalInfo?.github?.message as string}
            placeholder="https://github.com/yourusername"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GitHubIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Personal Website/Portfolio"
            {...register('personalInfo.website')}
            error={!!errors.personalInfo?.website}
            helperText={errors.personalInfo?.website?.message as string}
            placeholder="https://yourwebsite.com"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WebsiteIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoForm;