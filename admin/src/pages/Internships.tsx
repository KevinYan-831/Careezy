import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface Internship {
  _id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  experienceLevel: string;
  field: string;
  applicationDeadline: string;
  isActive: boolean;
  applicationsCount: number;
}

const Internships: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockInternships: Internship[] = [
        {
          _id: '1',
          title: 'Software Engineer Intern',
          company: 'TechCorp',
          location: 'San Francisco, CA',
          remote: false,
          experienceLevel: 'Entry Level',
          field: 'Technology',
          applicationDeadline: '2024-06-30',
          isActive: true,
          applicationsCount: 45,
        },
        {
          _id: '2',
          title: 'Marketing Intern',
          company: 'StartupXYZ',
          location: 'Remote',
          remote: true,
          experienceLevel: 'Entry Level',
          field: 'Marketing',
          applicationDeadline: '2024-07-15',
          isActive: true,
          applicationsCount: 23,
        },
        {
          _id: '3',
          title: 'Data Science Intern',
          company: 'DataCorp',
          location: 'New York, NY',
          remote: false,
          experienceLevel: 'Intermediate',
          field: 'Data Science',
          applicationDeadline: '2024-05-20',
          isActive: false,
          applicationsCount: 67,
        },
      ];
      setInternships(mockInternships);
    } catch (error) {
      console.error('Error fetching internships:', error);
    }
  };

  const filteredInternships = internships.filter(
    (internship) =>
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.field.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewInternship = (internship: Internship) => {
    setSelectedInternship(internship);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedInternship(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Internship Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
        >
          Add Internship
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search internships by title, company, or field..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Field</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Applications</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInternships.map((internship) => (
              <TableRow key={internship._id}>
                <TableCell>{internship.title}</TableCell>
                <TableCell>{internship.company}</TableCell>
                <TableCell>
                  {internship.remote ? (
                    <Chip label="Remote" color="info" size="small" />
                  ) : (
                    internship.location
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    label={internship.field}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDate(internship.applicationDeadline)}</TableCell>
                <TableCell>
                  <Chip
                    label={internship.applicationsCount}
                    color="secondary"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={internship.isActive ? 'Active' : 'Inactive'}
                    color={internship.isActive ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleViewInternship(internship)}
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton size="small" color="secondary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Internship Details Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Internship Details</DialogTitle>
        <DialogContent>
          {selectedInternship && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedInternship.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Company:</strong> {selectedInternship.company}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Location:</strong> {selectedInternship.location}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Remote:</strong> {selectedInternship.remote ? 'Yes' : 'No'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Experience Level:</strong> {selectedInternship.experienceLevel}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Field:</strong> {selectedInternship.field}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Application Deadline:</strong> {formatDate(selectedInternship.applicationDeadline)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Applications Received:</strong> {selectedInternship.applicationsCount}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Status:</strong>{' '}
                <Chip
                  label={selectedInternship.isActive ? 'Active' : 'Inactive'}
                  color={selectedInternship.isActive ? 'success' : 'default'}
                  size="small"
                />
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Internships;