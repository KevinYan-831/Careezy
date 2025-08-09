import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Groups as GroupsIcon,
} from '@mui/icons-material';
import { useFormContext, useFieldArray } from 'react-hook-form';

const activityTypes = [
  'Student Organization',
  'Club Leadership',
  'Volunteer Work',
  'Community Service',
  'Sports Team',
  'Academic Competition',
  'Research Project',
  'Hackathon',
  'Conference/Workshop',
  'Mentoring/Tutoring',
  'Cultural Organization',
  'Professional Association',
  'Honor Society',
  'Student Government',
  'Greek Life',
  'Religious Organization',
  'Environmental Initiative',
  'Social Impact Project',
  'Entrepreneurship',
  'Creative Arts',
  'Other',
];

const ActivitiesForm: React.FC = () => {
  const { register, control, formState: { errors }, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'activities',
  });

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
      description: '',
      achievements: '',
      hoursPerWeek: '',
    });
  };

  const removeActivity = (index: number) => {
    remove(index);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Extracurricular Activities
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add your involvement in clubs, organizations, volunteer work, and leadership roles.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addActivity}
          size="small"
        >
          Add Activity
        </Button>
      </Box>

      {fields.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            border: '2px dashed',
            borderColor: 'grey.300',
            borderRadius: 2,
            bgcolor: 'grey.50',
          }}
        >
          <GroupsIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No activities yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add your extracurricular activities, volunteer work, and leadership experiences.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={addActivity}>
            Add Your First Activity
          </Button>
        </Box>
      )}

      {fields.map((field, index) => {
        const isCurrentActivity = watch(`activities.${index}.current`);
        
        return (
          <Card key={field.id} sx={{ mb: 3 }} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Activity #{index + 1}
                </Typography>
                <IconButton
                  onClick={() => removeActivity(index)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Activity/Organization Name"
                    {...register(`activities.${index}.name`, {
                      required: 'Activity name is required',
                    })}
                    error={!!errors.activities?.[index]?.name}
                    helperText={errors.activities?.[index]?.name?.message as string}
                    placeholder="e.g., Computer Science Club, Red Cross Volunteer"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    options={activityTypes}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Activity Type"
                        {...register(`activities.${index}.type`)}
                        error={!!errors.activities?.[index]?.type}
                        helperText={errors.activities?.[index]?.type?.message as string}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position/Role"
                    {...register(`activities.${index}.position`)}
                    error={!!errors.activities?.[index]?.position}
                    helperText={errors.activities?.[index]?.position?.message as string}
                    placeholder="e.g., President, Volunteer, Member, Team Captain"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    {...register(`activities.${index}.location`)}
                    error={!!errors.activities?.[index]?.location}
                    helperText={errors.activities?.[index]?.location?.message as string}
                    placeholder="e.g., University Campus, Local Community Center"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="month"
                    {...register(`activities.${index}.startDate`)}
                    error={!!errors.activities?.[index]?.startDate}
                    helperText={errors.activities?.[index]?.startDate?.message as string}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="month"
                    {...register(`activities.${index}.endDate`)}
                    error={!!errors.activities?.[index]?.endDate}
                    helperText={errors.activities?.[index]?.endDate?.message as string}
                    InputLabelProps={{ shrink: true }}
                    disabled={isCurrentActivity}
                    placeholder={isCurrentActivity ? 'Current Activity' : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <TextField
                      fullWidth
                      label="Hours per Week"
                      {...register(`activities.${index}.hoursPerWeek`)}
                      error={!!errors.activities?.[index]?.hoursPerWeek}
                      helperText={errors.activities?.[index]?.hoursPerWeek?.message as string}
                      placeholder="e.g., 5-10 hours"
                      sx={{ mb: 1 }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(`activities.${index}.current`)}
                          color="primary"
                        />
                      }
                      label="Currently active"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description & Responsibilities"
                    {...register(`activities.${index}.description`, {
                      required: 'Description is required',
                    })}
                    error={!!errors.activities?.[index]?.description}
                    helperText={errors.activities?.[index]?.description?.message as string || "Describe your role and what you did in this activity"}
                    placeholder="Describe your responsibilities, what you learned, and your contributions to the organization..."
                    multiline
                    rows={3}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Key Achievements & Impact (Optional)"
                    {...register(`activities.${index}.achievements`)}
                    error={!!errors.activities?.[index]?.achievements}
                    helperText="List specific accomplishments, events organized, or impact made (separate with bullet points)"
                    placeholder="• Organized annual tech conference with 500+ attendees\n• Raised $5,000 for local charity through fundraising events\n• Led team of 15 volunteers in community service projects"
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Skills Developed (Optional)"
                    {...register(`activities.${index}.skills`)}
                    error={!!errors.activities?.[index]?.skills}
                    helperText="Skills you gained or improved through this activity (separate with commas)"
                    placeholder="Leadership, Event Planning, Public Speaking, Team Management, Fundraising"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      })}

      {fields.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addActivity}
          >
            Add Another Activity
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ActivitiesForm;