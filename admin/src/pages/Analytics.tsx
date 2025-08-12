import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [userRegistrationData, setUserRegistrationData] = useState<any[]>([]);
  const [applicationStatusData, setApplicationStatusData] = useState<any[]>([]);
  const [fieldDistributionData, setFieldDistributionData] = useState<any[]>([]);
  const [engagementData, setEngagementData] = useState<any[]>([]);

  useEffect(() => {
    // Pull live data from backend
    const load = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const statsRes = await fetch('/api/admin/stats', token ? { headers: { Authorization: `Bearer ${token}` } } as any : undefined);
        const stats = await statsRes.json();

        const usersRes = await fetch('/api/admin/users', token ? { headers: { Authorization: `Bearer ${token}` } } as any : undefined);
        const usersJson = await usersRes.json();
        const users = usersJson.users || [];
        // Build a simple last-6-months registration trend from createdAt
        const byMonth = new Map<string, number>();
        users.forEach((u: any) => {
          const d = new Date(u.createdAt || Date.now());
          const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
          byMonth.set(key, (byMonth.get(key) || 0) + 1);
        });
        const months = Array.from(byMonth.keys()).sort().slice(-6);
        setUserRegistrationData(months.map(m => ({ date: m, users: byMonth.get(m) || 0 })));

        // Field distribution from internships
        const intsRes = await fetch('/api/internships');
        const intsJson = await intsRes.json();
        const ints = intsJson.internships || [];
        const fieldMap = new Map<string, number>();
        ints.forEach((i: any) => fieldMap.set(i.field || 'Other', (fieldMap.get(i.field || 'Other') || 0) + 1));
        setFieldDistributionData(Array.from(fieldMap.entries()).map(([field, count]) => ({ field, count })));

        // Application status and engagement are placeholders until app tracking is added
        setApplicationStatusData([
          { name: 'Pending', value: Math.max(1, Math.floor((stats.activeApplications || 0) * 0.5)), color: '#ffa726' },
          { name: 'Approved', value: Math.max(1, Math.floor((stats.activeApplications || 0) * 0.3)), color: '#66bb6a' },
          { name: 'Rejected', value: Math.max(1, Math.floor((stats.activeApplications || 0) * 0.15)), color: '#ef5350' },
          { name: 'Withdrawn', value: Math.max(1, Math.floor((stats.activeApplications || 0) * 0.05)), color: '#bdbdbd' },
        ]);
        setEngagementData([
          { day: 'Mon', pageViews: 100 + ints.length * 2, uniqueVisitors: 80 },
          { day: 'Tue', pageViews: 120 + users.length, uniqueVisitors: 90 },
          { day: 'Wed', pageViews: 110, uniqueVisitors: 75 },
          { day: 'Thu', pageViews: 160, uniqueVisitors: 110 },
          { day: 'Fri', pageViews: 180, uniqueVisitors: 125 },
          { day: 'Sat', pageViews: 90, uniqueVisitors: 60 },
          { day: 'Sun', pageViews: 70, uniqueVisitors: 45 },
        ]);
      } catch (e) {
        // Fall back to empty if API fails
        setUserRegistrationData([]);
        setFieldDistributionData([]);
        setApplicationStatusData([]);
        setEngagementData([]);
      }
    };
    load();
  }, [timeRange]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Analytics Dashboard
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={30}>Last 30 days</MenuItem>
            <MenuItem value={90}>Last 3 months</MenuItem>
            <MenuItem value={365}>Last year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Key Metrics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Conversion Rate
              </Typography>
              <Typography variant="h4" component="div">
                68.5%
              </Typography>
              <Typography variant="body2" color="success.main">
                +5.2% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Avg. Time on Site
              </Typography>
              <Typography variant="h4" component="div">
                4:32
              </Typography>
              <Typography variant="body2" color="success.main">
                +12s from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Bounce Rate
              </Typography>
              <Typography variant="h4" component="div">
                23.4%
              </Typography>
              <Typography variant="body2" color="error.main">
                +1.2% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Revenue
              </Typography>
              <Typography variant="h4" component="div">
                $12.4K
              </Typography>
              <Typography variant="body2" color="success.main">
                +8.3% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* User Registration Trend */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              User Registration Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#1976d2" fill="#1976d2" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Application Status Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Application Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Field Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Internships by Field
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fieldDistributionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="field" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#388e3c" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* User Engagement */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Weekly User Engagement
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pageViews" stroke="#1976d2" strokeWidth={2} />
                <Line type="monotone" dataKey="uniqueVisitors" stroke="#f57c00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;