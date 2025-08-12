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

const initialForm: Partial<Internship> = {
  title: '',
  company: '',
  location: '',
  field: '',
  experienceLevel: '',
  remote: false,
  isActive: true,
  applicationDeadline: new Date().toISOString(),
};
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/internships/${id}`);
      fetchInternships();
    } catch (e) {
      console.error('Failed to delete internship', e);
    }
  };

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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [form, setForm] = useState<Partial<Internship>>(initialForm);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const res = await axios.get('/api/internships');
      const data: any[] = res.data?.internships || [];
      const normalized: Internship[] = data.map((i) => ({
        _id: i._id,
        title: i.title,
        company: i.company,
        location: i.location,
        remote: !!i.remote,
        experienceLevel: i.experienceLevel,
        field: i.field,
        applicationDeadline: i.applicationDeadline || i.deadline || new Date().toISOString(),
        isActive: !!i.isActive,
        applicationsCount: i.applicationsCount || 0,
      }));
      setInternships(normalized);
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
          onClick={() => { setForm(initialForm); setEditDialogOpen(true); }}
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
                  <IconButton size="small" color="secondary" onClick={() => handleViewInternship(internship)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(internship._id)}>
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

      {/* Add Internship Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Internship</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
            <TextField label="Title" value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <TextField label="Company" value={form.company || ''} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <TextField label="Location" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <TextField label="Field" value={form.field || ''} onChange={(e) => setForm({ ...form, field: e.target.value })} />
            <TextField label="Experience Level" value={form.experienceLevel || ''} onChange={(e) => setForm({ ...form, experienceLevel: e.target.value })} />
            <TextField label="Application Deadline" value={form.applicationDeadline || ''} onChange={(e) => setForm({ ...form, applicationDeadline: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={async () => {
            try { await axios.post('/api/internships', form); setEditDialogOpen(false); fetchInternships(); } catch (e) { console.error('Create failed', e); }
          }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Internships;