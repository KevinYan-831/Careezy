import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { Section } from '../components/layout/Section';
import { ResponsiveGrid, ResponsiveGridItem } from '../components/layout/ResponsiveGrid';
import {
  People as PeopleIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import axios from 'axios';

interface Stats {
  totalUsers: number;
  totalInternships: number;
  activeApplications: number;
  successRate: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalInternships: 0,
    activeApplications: 0,
    successRate: 0,
  });

  const [userGrowthData, setUserGrowthData] = useState<{ month: string; users: number }[]>([]);

  const [applicationData, setApplicationData] = useState<{ day: string; applications: number }[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/stats', token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
      const s = res.data || {};
      setStats({
        totalUsers: s.totalUsers || 0,
        totalInternships: s.totalInternships || 0,
        activeApplications: s.activeApplications || 0,
        successRate: s.successRate || 0,
      });
      // Simple derived demo metrics for charts
      setUserGrowthData([
        { month: 'Jan', users: Math.max(10, Math.floor((s.totalUsers || 0) * 0.2)) },
        { month: 'Feb', users: Math.max(10, Math.floor((s.totalUsers || 0) * 0.35)) },
        { month: 'Mar', users: Math.max(10, Math.floor((s.totalUsers || 0) * 0.5)) },
        { month: 'Apr', users: Math.max(10, Math.floor((s.totalUsers || 0) * 0.65)) },
        { month: 'May', users: Math.max(10, Math.floor((s.totalUsers || 0) * 0.8)) },
        { month: 'Jun', users: s.totalUsers || 0 },
      ]);
      setApplicationData([
        { day: 'Mon', applications: 5 },
        { day: 'Tue', applications: 9 },
        { day: 'Wed', applications: 7 },
        { day: 'Thu', applications: 12 },
        { day: 'Fri', applications: 8 },
        { day: 'Sat', applications: 4 },
        { day: 'Sun', applications: 3 },
      ]);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => (
    <Card className="dashboard-card" sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Box sx={{ color, fontSize: 40 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Section>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Dashboard Overview
      </Typography>
      
      <ResponsiveGrid spacing={3}>
        {/* Stats Cards */}
        <ResponsiveGridItem xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            icon={<PeopleIcon />}
            color="#1976d2"
          />
        </ResponsiveGridItem>
        <ResponsiveGridItem xs={12} sm={6} md={3}>
          <StatCard
            title="Active Internships"
            value={stats.totalInternships}
            icon={<WorkIcon />}
            color="#388e3c"
          />
        </ResponsiveGridItem>
        <ResponsiveGridItem xs={12} sm={6} md={3}>
          <StatCard
            title="Applications"
            value={stats.activeApplications}
            icon={<TrendingUpIcon />}
            color="#f57c00"
          />
        </ResponsiveGridItem>
        <ResponsiveGridItem xs={12} sm={6} md={3}>
          <StatCard
            title="Success Rate"
            value={`${stats.successRate}%`}
            icon={<AssessmentIcon />}
            color="#7b1fa2"
          />
        </ResponsiveGridItem>

        {/* User Growth Chart */}
        <ResponsiveGridItem xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              User Growth Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#1976d2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </ResponsiveGridItem>

        {/* Application Activity */}
        <ResponsiveGridItem xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Applications
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#388e3c" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </ResponsiveGridItem>

        {/* Recent Activity */}
        <ResponsiveGridItem xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Platform Activity
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • New user registration: john.doe@email.com
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Internship posted: Software Engineer Intern at TechCorp
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Application submitted: Marketing Intern at StartupXYZ
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Resume updated: jane.smith@email.com
              </Typography>
              <Typography variant="body2">
                • New internship match: Data Science Intern
              </Typography>
            </Box>
          </Paper>
        </ResponsiveGridItem>
      </ResponsiveGrid>
    </Section>
  );
};

export default Dashboard;