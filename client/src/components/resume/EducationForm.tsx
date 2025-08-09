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
  Autocomplete,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useFormContext, useFieldArray } from 'react-hook-form';

const degreeOptions = [
  'High School Diploma',
  'Associate Degree',
  'Bachelor of Arts (BA)',
  'Bachelor of Science (BS)',
  'Bachelor of Engineering (BE)',
  'Bachelor of Technology (BTech)',
  'Master of Arts (MA)',
  'Master of Science (MS)',
  'Master of Engineering (ME)',
  'Master of Technology (MTech)',
  'Master of Business Administration (MBA)',
  'Doctor of Philosophy (PhD)',
  'Juris Doctor (JD)',
  'Doctor of Medicine (MD)',
];

const fieldOptions = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Data Science',
  'Artificial Intelligence',
  'Cybersecurity',
  'Business Administration',
  'Marketing',
  'Finance',
  'Accounting',
  'Economics',
  'Psychology',
  'Biology',
  'Chemistry',
  'Physics',
  'Mathematics',
  'Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'English Literature',
  'Communications',
  'Political Science',
  'History',
  'Philosophy',
  'Art',
  'Music',
  'Other',
];

const EducationForm: React.FC = () => {
  const { register, control, formState: { errors }, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  const addEducation = () => {
    append({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      coursework: [],
    });
  };

  const removeEducation = (index: number) => {
    remove(index);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Education
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add your educational background, starting with the most recent.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addEducation}
          size="small"
        >
          Add Education
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
          <SchoolIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No education entries yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add your educational background to strengthen your resume.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={addEducation}>
            Add Your First Education
          </Button>
        </Box>
      )}

      {fields.map((field, index) => (
        <Card key={field.id} sx={{ mb: 3 }} variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Education #{index + 1}
              </Typography>
              <IconButton
                onClick={() => removeEducation(index)}
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
                  label="Institution/School Name"
                  {...register(`education.${index}.institution`, {
                    required: 'Institution name is required',
                  })}
                  error={!!errors.education?.[index]?.institution}
                  helperText={errors.education?.[index]?.institution?.message as string}
                  placeholder="e.g., University of California, Berkeley"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  {...register(`education.${index}.location`)}
                  error={!!errors.education?.[index]?.location}
                  helperText={errors.education?.[index]?.location?.message as string}
                  placeholder="e.g., Berkeley, CA"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={degreeOptions}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Degree"
                      {...register(`education.${index}.degree`, {
                        required: 'Degree is required',
                      })}
                      error={!!errors.education?.[index]?.degree}
                      helperText={errors.education?.[index]?.degree?.message as string}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={fieldOptions}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Field of Study"
                      {...register(`education.${index}.field`)}
                      error={!!errors.education?.[index]?.field}
                      helperText={errors.education?.[index]?.field?.message as string}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="month"
                  {...register(`education.${index}.startDate`)}
                  error={!!errors.education?.[index]?.startDate}
                  helperText={errors.education?.[index]?.startDate?.message as string}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="month"
                  {...register(`education.${index}.endDate`)}
                  error={!!errors.education?.[index]?.endDate}
                  helperText={errors.education?.[index]?.endDate?.message as string}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Leave empty if current"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="GPA (Optional)"
                  {...register(`education.${index}.gpa`)}
                  error={!!errors.education?.[index]?.gpa}
                  helperText={errors.education?.[index]?.gpa?.message as string}
                  placeholder="e.g., 3.8/4.0"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Relevant Coursework (Optional)"
                  {...register(`education.${index}.coursework`)}
                  error={!!errors.education?.[index]?.coursework}
                  helperText="Separate courses with commas (e.g., Data Structures, Algorithms, Database Systems)"
                  placeholder="Data Structures, Algorithms, Database Systems"
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Honors & Awards (Optional)"
                  {...register(`education.${index}.honors`)}
                  error={!!errors.education?.[index]?.honors}
                  helperText="Any academic honors, scholarships, or awards"
                  placeholder="Dean's List, Magna Cum Laude, Academic Scholarship"
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {fields.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addEducation}
          >
            Add Another Education
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EducationForm;