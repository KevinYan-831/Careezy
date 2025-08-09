import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Paper,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  LinearProgress,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Internship {
  _id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  remote: boolean;
  experienceLevel: string;
  field: string;
  applicationUrl: string;
  applicationDeadline?: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
  duration: string;
  startDate: string;
  tags: string[];
  source: string;
  active: boolean;
  matchScore?: number;
}

interface FilterOptions {
  fields: string[];
  locations: string[];
  experienceLevels: string[];
}

const InternshipExplorer: React.FC = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    fields: [],
    locations: [],
    experienceLevels: [],
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [showMatched, setShowMatched] = useState(false);

  useEffect(() => {
    fetchInternships();
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [internships, searchQuery, selectedField, selectedLocation, selectedExperience, remoteOnly, showMatched]);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockInternships: Internship[] = [
        {
          _id: '1',
          title: 'Software Engineering Intern',
          company: 'Google',
          description: 'Join our team to work on cutting-edge technology and make an impact on billions of users worldwide.',
          requirements: ['Computer Science or related field', 'Programming experience in Java, Python, or C++', 'Strong problem-solving skills'],
          location: 'Mountain View, CA',
          remote: false,
          experienceLevel: 'Entry Level',
          field: 'Computer Science',
          applicationUrl: 'https://careers.google.com',
          applicationDeadline: '2024-03-15',
          salary: { min: 7000, max: 9000, currency: 'USD', period: 'month' },
          duration: '12 weeks',
          startDate: '2024-06-01',
          tags: ['Software Development', 'Machine Learning', 'Cloud Computing'],
          source: 'Company Website',
          active: true,
          matchScore: 95,
        },
        {
          _id: '2',
          title: 'Data Science Intern',
          company: 'Microsoft',
          description: 'Work with our data science team to analyze large datasets and build predictive models.',
          requirements: ['Statistics or Data Science background', 'Python/R programming', 'Machine Learning knowledge'],
          location: 'Seattle, WA',
          remote: true,
          experienceLevel: 'Entry Level',
          field: 'Data Science',
          applicationUrl: 'https://careers.microsoft.com',
          salary: { min: 6500, max: 8500, currency: 'USD', period: 'month' },
          duration: '10 weeks',
          startDate: '2024-06-15',
          tags: ['Data Analysis', 'Machine Learning', 'Python'],
          source: 'LinkedIn',
          active: true,
          matchScore: 88,
        },
        {
          _id: '3',
          title: 'UX Design Intern',
          company: 'Apple',
          description: 'Design intuitive and beautiful user experiences for our next-generation products.',
          requirements: ['Design portfolio', 'Figma/Sketch experience', 'User research skills'],
          location: 'Cupertino, CA',
          remote: false,
          experienceLevel: 'Entry Level',
          field: 'Design',
          applicationUrl: 'https://jobs.apple.com',
          duration: '12 weeks',
          startDate: '2024-06-01',
          tags: ['UI/UX Design', 'Prototyping', 'User Research'],
          source: 'Company Website',
          active: true,
          matchScore: 72,
        },
        {
          _id: '4',
          title: 'Marketing Analytics Intern',
          company: 'Meta',
          description: 'Analyze marketing campaigns and user behavior to drive business growth.',
          requirements: ['Marketing or Business background', 'SQL knowledge', 'Analytics tools experience'],
          location: 'Menlo Park, CA',
          remote: true,
          experienceLevel: 'Entry Level',
          field: 'Marketing',
          applicationUrl: 'https://careers.meta.com',
          salary: { min: 6000, max: 7500, currency: 'USD', period: 'month' },
          duration: '12 weeks',
          startDate: '2024-06-01',
          tags: ['Marketing', 'Analytics', 'SQL'],
          source: 'Indeed',
          active: true,
          matchScore: 65,
        },
      ];
      
      setInternships(mockInternships);
      setError(null);
    } catch (err) {
      setError('Failed to fetch internships. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      // Mock filter options
      setFilterOptions({
        fields: ['Computer Science', 'Data Science', 'Design', 'Marketing', 'Business', 'Engineering'],
        locations: ['Mountain View, CA', 'Seattle, WA', 'Cupertino, CA', 'Menlo Park, CA', 'New York, NY', 'Austin, TX'],
        experienceLevels: ['Entry Level', 'Intermediate', 'Advanced'],
      });
    } catch (err) {
      console.error('Failed to fetch filter options:', err);
    }
  };

  const applyFilters = () => {
    let filtered = [...internships];

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (internship) =>
          internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Field filter
    if (selectedField) {
      filtered = filtered.filter((internship) => internship.field === selectedField);
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter((internship) => internship.location === selectedLocation);
    }

    // Experience level filter
    if (selectedExperience) {
      filtered = filtered.filter((internship) => internship.experienceLevel === selectedExperience);
    }

    // Remote filter
    if (remoteOnly) {
      filtered = filtered.filter((internship) => internship.remote);
    }

    // Show only matched internships
    if (showMatched) {
      filtered = filtered.filter((internship) => internship.matchScore && internship.matchScore > 70);
    }

    // Sort by match score if available
    filtered.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

    setFilteredInternships(filtered);
  };

  const handleInternshipClick = (internship: Internship) => {
    setSelectedInternship(internship);
    setDialogOpen(true);
  };

  const handleBookmark = (internshipId: string) => {
    const newBookmarked = new Set(bookmarkedIds);
    if (newBookmarked.has(internshipId)) {
      newBookmarked.delete(internshipId);
    } else {
      newBookmarked.add(internshipId);
    }
    setBookmarkedIds(newBookmarked);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedField('');
    setSelectedLocation('');
    setSelectedExperience('');
    setRemoteOnly(false);
    setShowMatched(false);
  };

  const formatSalary = (salary: Internship['salary']) => {
    if (!salary) return 'Not specified';
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()} ${salary.currency}/${salary.period}`;
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton variant="text" width={500} height={24} />
        </Box>
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Internship Explorer
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover internship opportunities tailored to your profile and interests.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Filters</Typography>
          <Button onClick={clearFilters} sx={{ ml: 'auto' }} size="small">
            Clear All
          </Button>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, company, or description"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Field</InputLabel>
              <Select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                label="Field"
              >
                <MenuItem value="">All Fields</MenuItem>
                {filterOptions.fields.map((field) => (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                label="Location"
              >
                <MenuItem value="">All Locations</MenuItem>
                {filterOptions.locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Experience</InputLabel>
              <Select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                label="Experience"
              >
                <MenuItem value="">All Levels</MenuItem>
                {filterOptions.experienceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant={remoteOnly ? 'contained' : 'outlined'}
                onClick={() => setRemoteOnly(!remoteOnly)}
                size="small"
              >
                Remote Only
              </Button>
              <Button
                variant={showMatched ? 'contained' : 'outlined'}
                onClick={() => setShowMatched(!showMatched)}
                size="small"
                startIcon={<TrendingUpIcon />}
              >
                Best Matches
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Results Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">
          {filteredInternships.length} internship{filteredInternships.length !== 1 ? 's' : ''} found
        </Typography>
      </Box>

      {/* Internship Cards */}
      <Grid container spacing={3}>
        {filteredInternships.map((internship) => (
          <Grid item xs={12} md={6} lg={4} key={internship._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => handleInternshipClick(internship)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {internship.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <BusinessIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {internship.company}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmark(internship._id);
                      }}
                      size="small"
                    >
                      {bookmarkedIds.has(internship._id) ? (
                        <BookmarkIcon color="primary" />
                      ) : (
                        <BookmarkBorderIcon />
                      )}
                    </IconButton>
                    
                    {internship.matchScore && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <StarIcon sx={{ fontSize: 16, mr: 0.5, color: getMatchScoreColor(internship.matchScore) + '.main' }} />
                        <Typography variant="caption" color={getMatchScoreColor(internship.matchScore) + '.main'}>
                          {internship.matchScore}% match
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {internship.location}
                    {internship.remote && ' (Remote)'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {internship.duration} • Starts {new Date(internship.startDate).toLocaleDateString()}
                  </Typography>
                </Box>

                {internship.salary && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MoneyIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatSalary(internship.salary)}
                    </Typography>
                  </Box>
                )}

                <Typography variant="body2" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {internship.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {internship.tags.slice(0, 3).map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                  {internship.tags.length > 3 && (
                    <Chip label={`+${internship.tags.length - 3} more`} size="small" variant="outlined" />
                  )}
                </Box>
              </CardContent>
              
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(internship.applicationUrl, '_blank');
                  }}
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredInternships.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No internships found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Try adjusting your filters or search criteria.
          </Typography>
          <Button variant="outlined" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Box>
      )}

      {/* Internship Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedInternship && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5" component="div">
                    {selectedInternship.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {selectedInternship.company}
                  </Typography>
                </Box>
                <IconButton onClick={() => setDialogOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedInternship.description}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom>
                    Requirements
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {selectedInternship.requirements.map((req, index) => (
                      <Typography component="li" key={index} variant="body2" sx={{ mb: 0.5 }}>
                        {req}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Tags
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedInternship.tags.map((tag) => (
                        <Chip key={tag} label={tag} variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Details
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Location
                      </Typography>
                      <Typography variant="body1">
                        {selectedInternship.location}
                        {selectedInternship.remote && ' (Remote)'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Duration
                      </Typography>
                      <Typography variant="body1">
                        {selectedInternship.duration}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Start Date
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedInternship.startDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    
                    {selectedInternship.salary && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Compensation
                        </Typography>
                        <Typography variant="body1">
                          {formatSalary(selectedInternship.salary)}
                        </Typography>
                      </Box>
                    )}
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Experience Level
                      </Typography>
                      <Typography variant="body1">
                        {selectedInternship.experienceLevel}
                      </Typography>
                    </Box>
                    
                    {selectedInternship.matchScore && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Match Score
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LinearProgress
                            variant="determinate"
                            value={selectedInternship.matchScore}
                            sx={{ flexGrow: 1, mr: 1 }}
                            color={getMatchScoreColor(selectedInternship.matchScore) as any}
                          />
                          <Typography variant="body2">
                            {selectedInternship.matchScore}%
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button
                onClick={() => handleBookmark(selectedInternship._id)}
                startIcon={
                  bookmarkedIds.has(selectedInternship._id) ? (
                    <BookmarkIcon />
                  ) : (
                    <BookmarkBorderIcon />
                  )
                }
              >
                {bookmarkedIds.has(selectedInternship._id) ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button
                variant="contained"
                onClick={() => window.open(selectedInternship.applicationUrl, '_blank')}
              >
                Apply Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default InternshipExplorer;