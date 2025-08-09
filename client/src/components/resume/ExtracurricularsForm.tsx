import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useFieldArray, useFormContext } from 'react-hook-form';

const ExtracurricularsForm: React.FC = () => {
  const { control, register, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities',
  });

  const watchedActivities = watch('activities');

  const addActivity = () => {
    append({
      name: '',
      type: '',
      organization: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      hoursPerWeek: '',
      description: '',
      achievements: '',
      skillsDeveloped: '',
    });
  };

  const activityTypes = [
    'Academic',
    'Athletic',
    'Community Service',
    'Cultural',
    'Leadership',
    'Professional',
    'Religious',
    'Social',
    'Student Government',
    'Volunteer',
    'Work',
    'Other',
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Extracurricular Activities
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Add your extracurricular activities, volunteer work, leadership roles, and other meaningful experiences.
      </Typography>

      {fields.map((field, index) => (
        <Paper key={field.id} sx={{ p: 3, mb: 3, position: 'relative' }}>
          <IconButton
            onClick={() => remove(index)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>

          <Typography variant="subtitle1" gutterBottom sx={{ pr: 5 }}>
            Activity {index + 1}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                {...register(`activities.${index}.name`)}
                label="Activity Name"
                fullWidth
                placeholder="e.g., Student Government, Debate Team, Volunteer Tutor"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  {...register(`activities.${index}.type`)}
                  label="Type"
                  defaultValue=""
                >
                  {activityTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register(`activities.${index}.organization`)}
                label="Organization"
                fullWidth
                placeholder="e.g., University of XYZ, Local Community Center"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register(`activities.${index}.position`)}
                label="Position/Role"
                fullWidth
                placeholder="e.g., President, Member, Volunteer"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register(`activities.${index}.location`)}
                label="Location"
                fullWidth
                placeholder="e.g., Boston, MA"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register(`activities.${index}.hoursPerWeek`)}
                label="Hours per Week"
                type="number"
                fullWidth
                placeholder="e.g., 5"
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField
                {...register(`activities.${index}.startDate`)}
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                {...register(`activities.${index}.endDate`)}
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                disabled={watchedActivities?.[index]?.current}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register(`activities.${index}.current`)}
                  />
                }
                label="Current"
                sx={{ mt: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register(`activities.${index}.description`)}
                label="Description"
                multiline
                rows={3}
                fullWidth
                placeholder="Describe your role, responsibilities, and what the activity involved..."
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register(`activities.${index}.achievements`)}
                label="Key Achievements"
                multiline
                rows={2}
                fullWidth
                placeholder="• Led a team of 15 students\n• Organized fundraising event that raised $5,000\n• Improved community outreach by 40%"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register(`activities.${index}.skillsDeveloped`)}
                label="Skills Developed"
                fullWidth
                placeholder="e.g., Leadership, Public Speaking, Event Planning, Teamwork"
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button
        onClick={addActivity}
        startIcon={<AddIcon />}
        variant="outlined"
        sx={{ mt: 2 }}
      >
        Add Activity
      </Button>

      {fields.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 3 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Activities Added Yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Extracurricular activities show your interests, leadership skills, and commitment outside of academics.
          </Typography>
          <Button onClick={addActivity} variant="contained" startIcon={<AddIcon />}>
            Add Your First Activity
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default ExtracurricularsForm;