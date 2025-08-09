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
  Chip,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { useFormContext, useFieldArray } from 'react-hook-form';

const ExperienceForm: React.FC = () => {
  const { register, control, formState: { errors }, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  const addExperience = () => {
    append({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    });
  };

  const removeExperience = (index: number) => {
    remove(index);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Work Experience
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add your work experience, internships, and relevant positions.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addExperience}
          size="small"
        >
          Add Experience
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
          <WorkIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No work experience yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add your internships, part-time jobs, or volunteer work to showcase your experience.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={addExperience}>
            Add Your First Experience
          </Button>
        </Box>
      )}

      {fields.map((field, index) => {
        const isCurrentPosition = watch(`experience.${index}.current`);
        
        return (
          <Card key={field.id} sx={{ mb: 3 }} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Experience #{index + 1}
                </Typography>
                <IconButton
                  onClick={() => removeExperience(index)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    {...register(`experience.${index}.title`, {
                      required: 'Job title is required',
                    })}
                    error={!!errors.experience?.[index]?.title}
                    helperText={errors.experience?.[index]?.title?.message as string}
                    placeholder="e.g., Software Engineering Intern"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company/Organization"
                    {...register(`experience.${index}.company`, {
                      required: 'Company name is required',
                    })}
                    error={!!errors.experience?.[index]?.company}
                    helperText={errors.experience?.[index]?.company?.message as string}
                    placeholder="e.g., Google, Microsoft, Local Startup"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    {...register(`experience.${index}.location`)}
                    error={!!errors.experience?.[index]?.location}
                    helperText={errors.experience?.[index]?.location?.message as string}
                    placeholder="e.g., San Francisco, CA or Remote"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Employment Type"
                    {...register(`experience.${index}.type`)}
                    error={!!errors.experience?.[index]?.type}
                    helperText={errors.experience?.[index]?.type?.message as string}
                    placeholder="e.g., Internship, Part-time, Full-time"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="month"
                    {...register(`experience.${index}.startDate`, {
                      required: 'Start date is required',
                    })}
                    error={!!errors.experience?.[index]?.startDate}
                    helperText={errors.experience?.[index]?.startDate?.message as string}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="month"
                    {...register(`experience.${index}.endDate`)}
                    error={!!errors.experience?.[index]?.endDate}
                    helperText={errors.experience?.[index]?.endDate?.message as string}
                    InputLabelProps={{ shrink: true }}
                    disabled={isCurrentPosition}
                    placeholder={isCurrentPosition ? 'Current Position' : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register(`experience.${index}.current`)}
                        color="primary"
                      />
                    }
                    label="I currently work here"
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Job Description"
                    {...register(`experience.${index}.description`, {
                      required: 'Job description is required',
                    })}
                    error={!!errors.experience?.[index]?.description}
                    helperText={errors.experience?.[index]?.description?.message as string || "Describe your role and responsibilities"}
                    placeholder="Describe your main responsibilities and what you accomplished in this role..."
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Key Achievements (Optional)"
                    {...register(`experience.${index}.achievements`)}
                    error={!!errors.experience?.[index]?.achievements}
                    helperText="List specific accomplishments, metrics, or impact you made (separate with bullet points)"
                    placeholder="• Increased team productivity by 25% through process optimization\n• Led a team of 5 developers on a critical project\n• Reduced system downtime by 40% through improved monitoring"
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Skills Used (Optional)"
                    {...register(`experience.${index}.skills`)}
                    error={!!errors.experience?.[index]?.skills}
                    helperText="Technologies, tools, or skills you used in this role (separate with commas)"
                    placeholder="Python, React, AWS, Project Management, Data Analysis"
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
            onClick={addExperience}
          >
            Add Another Experience
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ExperienceForm;