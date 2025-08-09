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
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Code as CodeIcon,
  Link as LinkIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { useFormContext, useFieldArray } from 'react-hook-form';

const ProjectsForm: React.FC = () => {
  const { register, control, formState: { errors }, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const addProject = () => {
    append({
      name: '',
      description: '',
      technologies: '',
      startDate: '',
      endDate: '',
      githubUrl: '',
      liveUrl: '',
      highlights: '',
      role: '',
      teamSize: '',
    });
  };

  const removeProject = (index: number) => {
    remove(index);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Showcase your personal projects, hackathons, and coursework.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addProject}
          size="small"
        >
          Add Project
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
          <CodeIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No projects yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add your coding projects, hackathon submissions, or coursework to demonstrate your skills.
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={addProject}>
            Add Your First Project
          </Button>
        </Box>
      )}

      {fields.map((field, index) => (
        <Card key={field.id} sx={{ mb: 3 }} variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Project #{index + 1}
              </Typography>
              <IconButton
                onClick={() => removeProject(index)}
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
                  label="Project Name"
                  {...register(`projects.${index}.name`, {
                    required: 'Project name is required',
                  })}
                  error={!!errors.projects?.[index]?.name}
                  helperText={errors.projects?.[index]?.name?.message as string}
                  placeholder="e.g., E-commerce Web Application"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Your Role"
                  {...register(`projects.${index}.role`)}
                  error={!!errors.projects?.[index]?.role}
                  helperText={errors.projects?.[index]?.role?.message as string}
                  placeholder="e.g., Full-Stack Developer, Team Lead"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Description"
                  {...register(`projects.${index}.description`, {
                    required: 'Project description is required',
                  })}
                  error={!!errors.projects?.[index]?.description}
                  helperText={errors.projects?.[index]?.description?.message as string || "Describe what the project does and its purpose"}
                  placeholder="Describe what your project does, its main features, and the problem it solves..."
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Technologies Used"
                  {...register(`projects.${index}.technologies`, {
                    required: 'Technologies are required',
                  })}
                  error={!!errors.projects?.[index]?.technologies}
                  helperText={errors.projects?.[index]?.technologies?.message as string || "List the programming languages, frameworks, and tools used (separate with commas)"}
                  placeholder="React, Node.js, MongoDB, Express, TypeScript, AWS"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="month"
                  {...register(`projects.${index}.startDate`)}
                  error={!!errors.projects?.[index]?.startDate}
                  helperText={errors.projects?.[index]?.startDate?.message as string}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="month"
                  {...register(`projects.${index}.endDate`)}
                  error={!!errors.projects?.[index]?.endDate}
                  helperText={errors.projects?.[index]?.endDate?.message as string}
                  InputLabelProps={{ shrink: true }}
                  placeholder="Leave empty if ongoing"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Team Size (Optional)"
                  {...register(`projects.${index}.teamSize`)}
                  error={!!errors.projects?.[index]?.teamSize}
                  helperText={errors.projects?.[index]?.teamSize?.message as string}
                  placeholder="e.g., Solo project, 3 members"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="GitHub Repository (Optional)"
                  {...register(`projects.${index}.githubUrl`)}
                  error={!!errors.projects?.[index]?.githubUrl}
                  helperText={errors.projects?.[index]?.githubUrl?.message as string}
                  placeholder="https://github.com/username/project-name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GitHubIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Live Demo URL (Optional)"
                  {...register(`projects.${index}.liveUrl`)}
                  error={!!errors.projects?.[index]?.liveUrl}
                  helperText={errors.projects?.[index]?.liveUrl?.message as string}
                  placeholder="https://your-project-demo.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Key Highlights & Achievements (Optional)"
                  {...register(`projects.${index}.highlights`)}
                  error={!!errors.projects?.[index]?.highlights}
                  helperText="List specific accomplishments, metrics, or notable features (separate with bullet points)"
                  placeholder="• Implemented real-time chat functionality serving 1000+ users\n• Achieved 95% test coverage with automated testing\n• Deployed using CI/CD pipeline with 99.9% uptime"
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Challenges & Solutions (Optional)"
                  {...register(`projects.${index}.challenges`)}
                  error={!!errors.projects?.[index]?.challenges}
                  helperText="Describe technical challenges you faced and how you solved them"
                  placeholder="Overcame scalability issues by implementing Redis caching, reducing response time by 60%..."
                  multiline
                  rows={3}
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
            onClick={addProject}
          >
            Add Another Project
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProjectsForm;