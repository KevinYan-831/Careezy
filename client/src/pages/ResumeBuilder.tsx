import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Alert,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Save as SaveIcon,
  Download as DownloadIcon,
  Preview as PreviewIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';

// Form Components
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import EducationForm from '../components/resume/EducationForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import ProjectsForm from '../components/resume/ProjectsForm';
import SkillsForm from '../components/resume/SkillsForm';
import ExtracurricularsForm from '../components/resume/ExtracurricularsForm';
import ResumePreview from '../components/resume/ResumePreview';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`resume-tabpanel-${index}`}
      aria-labelledby={`resume-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [commonAppDialog, setCommonAppDialog] = useState(false);
  const [commonAppData, setCommonAppData] = useState('');
  const [template, setTemplate] = useState<'default' | 'custom'>('default');
  
  const methods = useForm({
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        github: '',
        website: '',
      },
      education: [],
      experience: [],
      projects: [],
      skills: {
        technical: '',
        technicalOther: '',
        soft: '',
        softOther: '',
        certifications: '',
        languages: [],
      },
      activities: [],
    },
  });

  const { handleSubmit, watch, reset } = methods;
  const watchedData = watch();

  // Load existing resume on component mount
  useEffect(() => {
    loadResume();
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (saveStatus === 'idle') {
        autoSave();
      }
    }, 5000); // Auto-save every 5 seconds

    return () => clearTimeout(timer);
  }, [watchedData, saveStatus]);

  const loadResume = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

       const response = await axios.get('http://localhost:5000/api/resume', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        reset(response.data);
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    }
  };

  const autoSave = async () => {
    try {
      setSaveStatus('saving');
      const token = localStorage.getItem('token');
      if (!token) return;

       await axios.post(`http://localhost:5000/api/resume${template === 'custom' ? '?template=custom' : ''}`,
         watchedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Auto-save error:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/resume${template === 'custom' ? '?template=custom' : ''}`,
        data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaveStatus('saved');
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/resume/pdf', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // For now, just show the LaTeX code
      // In production, this would trigger a PDF download
      console.log('LaTeX Code:', response.data.latexCode);
      alert('PDF generation feature coming soon! Check console for LaTeX code.');
    } catch (error) {
      console.error('PDF generation error:', error);
    }
  };

  const handleCommonAppUpload = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        `http://localhost:5000/api/resume/parse-common-app${template === 'custom' ? '?template=custom' : ''}`,
        { commonAppData: JSON.parse(commonAppData) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      reset(response.data);
      setCommonAppDialog(false);
      setCommonAppData('');
    } catch (error) {
      console.error('Common App parsing error:', error);
      alert('Error parsing Common App data. Please check the format and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: 'Personal Info', component: PersonalInfoForm },
    { label: 'Education', component: EducationForm },
    { label: 'Experience', component: ExperienceForm },
    { label: 'Projects', component: ProjectsForm },
    { label: 'Skills', component: SkillsForm },
    { label: 'Activities', component: ExtracurricularsForm },
  ];

  return (
    <FormProvider {...methods}>
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Form Section */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ height: 'fit-content' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, gap: 2 }}>
                <Typography variant="h5" component="h1" fontWeight={600}>
                  Resume Builder
                </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                      <InputLabel id="template-select-label">Template</InputLabel>
                      <Select
                        labelId="template-select-label"
                        value={template}
                        label="Template"
                        onChange={(e) => setTemplate(e.target.value as 'default' | 'custom')}
                      >
                        <MenuItem value="default">Platform Default</MenuItem>
                        <MenuItem value="custom">Jake Gutierrez (LaTeX)</MenuItem>
                      </Select>
                    </FormControl>
                  <Button
                    variant="outlined"
                    startIcon={<UploadIcon />}
                    onClick={() => setCommonAppDialog(true)}
                    size="small"
                  >
                    Import Common App
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownloadPDF}
                    size="small"
                  >
                    Download PDF
                  </Button>
                </Box>
              </Box>
              
              {saveStatus !== 'idle' && (
                <Alert 
                  severity={saveStatus === 'saved' ? 'success' : saveStatus === 'error' ? 'error' : 'info'}
                  sx={{ mx: 2, mb: 2 }}
                >
                  {saveStatus === 'saving' && 'Saving...'}
                  {saveStatus === 'saved' && 'Resume saved successfully!'}
                  {saveStatus === 'error' && 'Error saving resume. Please try again.'}
                </Alert>
              )}
              
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ px: 2 }}
              >
                {tabs.map((tab, index) => (
                  <Tab key={index} label={tab.label} />
                ))}
              </Tabs>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              {tabs.map((tab, index) => {
                const Component = tab.component;
                return (
                  <TabPanel key={index} value={activeTab} index={index}>
                    <Component />
                  </TabPanel>
                );
              })}
            </form>
          </Paper>
        </Grid>

        {/* Preview Section */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ position: 'sticky', top: 20 }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" fontWeight={600}>
                Live Preview
              </Typography>
            </Box>
            <ResumePreview data={watchedData} />
          </Paper>
        </Grid>
      </Grid>

      {/* Floating Action Button for Save */}
      <Fab
        color="primary"
        aria-label="save"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <SaveIcon />
      </Fab>

      {/* Common App Upload Dialog */}
      <Dialog open={commonAppDialog} onClose={() => setCommonAppDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Import Common App Data</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Paste your Common App data in JSON format below. Our AI will parse it and populate your resume.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={commonAppData}
            onChange={(e) => setCommonAppData(e.target.value)}
            placeholder='{
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@email.com"
  },
  "education": [...],
  "activities": [...]
}'
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommonAppDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleCommonAppUpload} 
            variant="contained" 
            disabled={!commonAppData.trim() || loading}
          >
            {loading ? 'Processing...' : 'Import & Parse'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </FormProvider>
  );
};

export default ResumeBuilder;