import React, { useState } from 'react';
import { Container, Paper, Box, Typography, TextField, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const CareerCoaching: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const question = input.trim();
    if (!question) return;
    setInput('');
    const newMsg: Message = { role: 'user', content: question, timestamp: new Date().toISOString() };
    setMessages((m) => [...m, newMsg]);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await axios.post('/api/ai/career-advice', {
        userProfile: user,
        question,
        isPremium: false,
      }, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
      const reply: Message = {
        role: 'assistant',
        content: res.data?.advice || 'No response',
        timestamp: new Date().toISOString(),
      };
      setMessages((m) => [...m, reply]);
    } catch (e: any) {
      const errMsg: Message = { role: 'assistant', content: e.response?.data?.error || 'Failed to get advice', timestamp: new Date().toISOString() };
      setMessages((m) => [...m, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Career Coaching</Typography>
        <List sx={{ minHeight: 300, maxHeight: 480, overflowY: 'auto', mb: 2, bgcolor: 'grey.50' }}>
          {messages.map((m, idx) => (
            <ListItem key={idx} alignItems="flex-start">
              <ListItemText
                primary={m.role === 'user' ? 'You' : 'Coach'}
                secondary={<span style={{ whiteSpace: 'pre-wrap' }}>{m.content}</span>}
              />
            </ListItem>
          ))}
          {loading && (
            <ListItem>
              <CircularProgress size={20} />
              <Typography variant="body2" sx={{ ml: 1 }}>Thinking...</Typography>
            </ListItem>
          )}
        </List>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Ask for resume feedback, interview prep, skill planning..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          />
          <Button variant="contained" onClick={sendMessage} disabled={loading}>Send</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CareerCoaching;

