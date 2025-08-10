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
  Paper,
  LinearProgress,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Description as DescriptionIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  Bookmark as BookmarkIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  profileType: string;
  joinDate: string;
}

interface ResumeStats {
  completionPercentage: number;
  lastUpdated: string;
  sections: {
    personalInfo: boolean;
    education: boolean;
    experience: boolean;
    projects: boolean;
    skills: boolean;
    activities: boolean;
  };
}

interface InternshipMatch {
  _id: string;
  title: string;
  company: string;
  matchScore: number;
  location: string;
  deadline: string;
  applied: boolean;
}

interface Notification {
  _id: string;
  type: 'deadline' | 'match' | 'update' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [resumeStats, setResumeStats] = useState<ResumeStats | null>(null);
  const [topMatches, setTopMatches] = useState<InternshipMatch[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const u = res.data?.user;
          if (u) {
            setUserProfile({
              firstName: u.firstName || '',
              lastName: u.lastName || '',
              email: u.email || '',
              profileType: u.profileType || '',
              joinDate: u.createdAt || new Date().toISOString(),
            });
            // Keep localStorage in sync in case other tabs need it
            localStorage.setItem('user', JSON.stringify({
              firstName: u.firstName,
              lastName: u.lastName,
              email: u.email,
              profileType: u.profileType,
            }));
          }
        } else {
          const user = localStorage.getItem('user');
          if (user) {
            const parsed = JSON.parse(user);
            setUserProfile({
              firstName: parsed.firstName || '',
              lastName: parsed.lastName || '',
              email: parsed.email || '',
              profileType: parsed.profileType || '',
              joinDate: new Date().toISOString(),
            });
          }
        }
      } catch (e) {
        // If token invalid, fall back to localStorage data if present
        const user = localStorage.getItem('user');
        if (user) {
          try {
            const parsed = JSON.parse(user);
            setUserProfile({
              firstName: parsed.firstName || '',
              lastName: parsed.lastName || '',
              email: parsed.email || '',
              profileType: parsed.profileType || '',
              joinDate: new Date().toISOString(),
            });
          } catch {}
        }
      } finally {
        fetchDashboardData();
      }
    };

    loadUser();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // New users should start blank
      setResumeStats(null);
      setTopMatches([]);
      setNotifications([]);
      setBookmarkedCount(0);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 50) return 'warning';
    return 'error';
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <ScheduleIcon color="warning" />;
      case 'match':
        return <StarIcon color="primary" />;
      case 'achievement':
        return <CheckCircleIcon color="success" />;
      default:
        return <NotificationsIcon />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Skeleton variant="text" width={300} height={40} />
          </Grid>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {userProfile?.firstName}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your personalized dashboard with the latest updates and recommendations.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ width: 56, height: 56, mr: 2, bgcolor: 'primary.main' }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {userProfile?.firstName} {userProfile?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userProfile?.profileType}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body2">
                  {userProfile?.email}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Member since
                </Typography>
                <Typography variant="body2">
                  {userProfile && formatDate(userProfile.joinDate)}
                </Typography>
              </Box>
            </CardContent>
            
            <CardActions>
              <Button size="small" startIcon={<EditIcon />}>
                Edit Profile
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Resume Progress */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  <DescriptionIcon sx={{ mr: 1 }} />
                  Resume Progress
                </Typography>
                <Chip
                  label={`${resumeStats?.completionPercentage}% Complete`}
                  color={getCompletionColor(resumeStats?.completionPercentage || 0) as any}
                  variant="outlined"
                />
              </Box>
              
              <LinearProgress
                variant="determinate"
                value={resumeStats?.completionPercentage || 0}
                sx={{ mb: 2, height: 8, borderRadius: 4 }}
                color={getCompletionColor(resumeStats?.completionPercentage || 0) as any}
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Last updated: {resumeStats && formatDate(resumeStats.lastUpdated)}
              </Typography>
              
              <Grid container spacing={1}>
                {resumeStats && Object.entries(resumeStats.sections).map(([section, completed]) => (
                  <Grid item xs={6} sm={4} key={section}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {completed ? (
                        <CheckCircleIcon color="success" sx={{ fontSize: 16, mr: 0.5 }} />
                      ) : (
                        <WarningIcon color="warning" sx={{ fontSize: 16, mr: 0.5 }} />
                      )}
                      <Typography variant="caption">
                        {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            
            <CardActions>
              <Button
                size="small"
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => navigate('/resume')}
              >
                Continue Building
              </Button>
              <Button size="small" startIcon={<DownloadIcon />}>
                Download PDF
              </Button>
              <Button size="small" startIcon={<ShareIcon />}>
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Top Internship Matches */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ mr: 1 }} />
                  Top Matches for You
                </Typography>
                <Button
                  size="small"
                  onClick={() => navigate('/internships')}
                >
                  View All
                </Button>
              </Box>
              
              <List>
                {topMatches.map((match, index) => (
                  <React.Fragment key={match._id}>
                    <ListItem
                      sx={{
                        cursor: 'pointer',
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                      onClick={() => navigate('/internships')}
                    >
                      <ListItemIcon>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                          <WorkIcon />
                        </Avatar>
                      </ListItemIcon>
                      
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle2">
                              {match.title}
                            </Typography>
                            <Chip
                              label={`${match.matchScore}% match`}
                              size="small"
                              color={getMatchScoreColor(match.matchScore) as any}
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {match.company} • {match.location}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Deadline: {formatDate(match.deadline)}
                              {match.applied && ' • Applied'}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < topMatches.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <BookmarkIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h4" component="div">
                    {bookmarkedCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bookmarked Internships
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button size="small" onClick={() => navigate('/internships')}>
                    View Bookmarks
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                  <Typography variant="h4" component="div">
                    {topMatches.filter(m => m.matchScore >= 80).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    High-Quality Matches
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button size="small" onClick={() => navigate('/internships')}>
                    Explore Matches
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Recent Notifications */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ mr: 1 }} />
                Recent Notifications
              </Typography>
              
              {notifications.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No new notifications
                </Typography>
              ) : (
                <List>
                  {notifications.slice(0, 5).map((notification, index) => (
                    <React.Fragment key={notification._id}>
                      <ListItem
                        sx={{
                          bgcolor: notification.read ? 'transparent' : 'action.hover',
                          borderRadius: 1,
                          mb: 0.5,
                        }}
                      >
                        <ListItemIcon>
                          {getNotificationIcon(notification.type)}
                        </ListItemIcon>
                        
                        <ListItemText
                          primary={notification.title}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {notification.message}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {getTimeAgo(notification.timestamp)}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < notifications.slice(0, 5).length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
            
            {notifications.length > 5 && (
              <CardActions>
                <Button size="small">
                  View All Notifications
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<DescriptionIcon />}
                  onClick={() => navigate('/resume')}
                  sx={{ py: 1.5 }}
                >
                  Edit Resume
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<WorkIcon />}
                  onClick={() => navigate('/internships')}
                  sx={{ py: 1.5 }}
                >
                  Find Internships
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<TrendingUpIcon />}
                  sx={{ py: 1.5 }}
                >
                  Career Coaching
                </Button>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{ py: 1.5 }}
                >
                  Download Resume
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;