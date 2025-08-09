import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Chip,
  Card,
  CardContent,
  Autocomplete,
  Divider,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useFormContext, useFieldArray } from 'react-hook-form';

const technicalSkillsOptions = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'C', 'Go', 'Rust', 'Swift', 'Kotlin',
  'PHP', 'Ruby', 'Scala', 'R', 'MATLAB', 'SQL', 'HTML', 'CSS', 'Dart',
  
  // Frontend
  'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'jQuery', 'Bootstrap', 'Tailwind CSS',
  'Material-UI', 'Sass', 'Less', 'Webpack', 'Vite', 'Parcel',
  
  // Backend
  'Node.js', 'Express.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'ASP.NET', 'Ruby on Rails',
  'Laravel', 'Symfony', 'NestJS', 'Koa.js',
  
  // Databases
  'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Cassandra', 'DynamoDB', 'Firebase',
  'Elasticsearch', 'Neo4j',
  
  // Cloud & DevOps
  'AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions',
  'Terraform', 'Ansible', 'Nginx', 'Apache',
  
  // Tools & Others
  'Git', 'Linux', 'Bash', 'PowerShell', 'Postman', 'Figma', 'Adobe Creative Suite', 'Jira',
  'Slack', 'Notion', 'VS Code', 'IntelliJ IDEA',
  
  // Data Science & AI
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter',
  'Apache Spark', 'Hadoop', 'Tableau', 'Power BI',
];

const softSkillsOptions = [
  'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
  'Time Management', 'Project Management', 'Adaptability', 'Creativity', 'Public Speaking',
  'Negotiation', 'Conflict Resolution', 'Mentoring', 'Strategic Planning', 'Decision Making',
  'Analytical Thinking', 'Attention to Detail', 'Customer Service', 'Sales', 'Marketing',
  'Research', 'Writing', 'Presentation Skills', 'Interpersonal Skills', 'Emotional Intelligence',
];

const languageOptions = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese (Mandarin)',
  'Chinese (Cantonese)', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali', 'Urdu', 'Turkish',
  'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish', 'Czech', 'Hungarian',
  'Greek', 'Hebrew', 'Thai', 'Vietnamese', 'Indonesian', 'Malay',
];

const proficiencyLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
  { value: 'native', label: 'Native' },
];

const SkillsForm: React.FC = () => {
  const { register, control, formState: { errors }, watch, setValue } = useFormContext();
  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: 'skills.languages',
  });

  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);

  const addLanguage = () => {
    appendLanguage({
      language: '',
      proficiency: 'intermediate',
    });
  };

  const removeLanguageSkill = (index: number) => {
    removeLanguage(index);
  };

  const handleTechnicalSkillsChange = (event: any, newValue: string[]) => {
    setTechnicalSkills(newValue);
    setValue('skills.technical', newValue.join(', '));
  };

  const handleSoftSkillsChange = (event: any, newValue: string[]) => {
    setSoftSkills(newValue);
    setValue('skills.soft', newValue.join(', '));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Showcase your technical skills, soft skills, and language proficiencies.
      </Typography>

      {/* Technical Skills */}
      <Card sx={{ mb: 3 }} variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CodeIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Technical Skills</Typography>
          </Box>
          
          <Autocomplete
            multiple
            options={technicalSkillsOptions}
            value={technicalSkills}
            onChange={handleTechnicalSkillsChange}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={index}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Technical Skills"
                placeholder="Type or select skills (e.g., React, Python, AWS)"
                helperText="Add programming languages, frameworks, tools, and technologies you know"
              />
            )}
          />

          <TextField
            fullWidth
            label="Additional Technical Skills"
            {...register('skills.technicalOther')}
            placeholder="Any other technical skills not listed above"
            helperText="Separate with commas"
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card sx={{ mb: 3 }} variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PsychologyIcon sx={{ mr: 1, color: 'secondary.main' }} />
            <Typography variant="h6">Soft Skills</Typography>
          </Box>
          
          <Autocomplete
            multiple
            options={softSkillsOptions}
            value={softSkills}
            onChange={handleSoftSkillsChange}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  color="secondary"
                  {...getTagProps({ index })}
                  key={index}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Soft Skills"
                placeholder="Type or select skills (e.g., Leadership, Communication)"
                helperText="Add interpersonal and professional skills"
              />
            )}
          />

          <TextField
            fullWidth
            label="Additional Soft Skills"
            {...register('skills.softOther')}
            placeholder="Any other soft skills not listed above"
            helperText="Separate with commas"
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>

      {/* Languages */}
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LanguageIcon sx={{ mr: 1, color: 'success.main' }} />
              <Typography variant="h6">Languages</Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addLanguage}
              size="small"
            >
              Add Language
            </Button>
          </Box>

          {languageFields.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 3,
                border: '1px dashed',
                borderColor: 'grey.300',
                borderRadius: 1,
                bgcolor: 'grey.50',
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                No languages added yet
              </Typography>
              <Button variant="outlined" startIcon={<AddIcon />} onClick={addLanguage} size="small">
                Add Your First Language
              </Button>
            </Box>
          )}

          {languageFields.map((field, index) => (
            <Box key={field.id} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'grey.200', borderRadius: 1 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  <Autocomplete
                    options={languageOptions}
                    freeSolo
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Language"
                        {...register(`skills.languages.${index}.language`, {
                          required: 'Language is required',
                        })}
                        error={!!errors.skills?.languages?.[index]?.language}
                        helperText={errors.skills?.languages?.[index]?.language?.message as string}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={5}>
                  <FormControl fullWidth>
                    <InputLabel>Proficiency Level</InputLabel>
                    <Select
                      {...register(`skills.languages.${index}.proficiency`)}
                      label="Proficiency Level"
                      defaultValue="intermediate"
                    >
                      {proficiencyLevels.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                          {level.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={2}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeLanguageSkill(index)}
                    fullWidth
                    size="small"
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}

          {languageFields.length > 0 && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addLanguage}
                size="small"
              >
                Add Another Language
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card sx={{ mt: 3 }} variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Certifications & Awards (Optional)
          </Typography>
          
          <TextField
            fullWidth
            label="Certifications"
            {...register('skills.certifications')}
            placeholder="AWS Certified Developer, Google Analytics Certified, Dean's List"
            helperText="List any relevant certifications, awards, or recognitions (separate with commas)"
            multiline
            rows={3}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default SkillsForm;