import { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, CircularProgress, Avatar } from '@mui/material';
import axios from 'axios';
import Scrollbars from 'react-custom-scrollbars-2';

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [responseLoading, setResponseLoading] = useState(false);
    const scrollbarsRef = useRef(null);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const fetchResponse = async (query, isEasyVersion = false) => {
        setResponseLoading(true);
        const requestData = isEasyVersion ? `${query}, Explain it like explaining it to a 10 year old.` : query;
        try {
            const response = await axios.post('http://localhost:8000/api/getGeminiResponse', { data: requestData });
            setChatHistory([...chatHistory, { role: 'You', text: query }, { role: 'Bot', text: response.data.result }]);
        } catch (error) {
            console.error('Error fetching response:', error);
        } finally {
            setResponseLoading(false);
        }
    };

    const handleSubmit = () => {
        if (input) {
            fetchResponse(input);
            setInput('');
        }
    };

    useEffect(() => {
        if (scrollbarsRef.current) {
            scrollbarsRef.current.scrollToBottom();
        }
    }, [chatHistory]);

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', backgroundColor: '#f4f4f4' }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: '1rem' }}>
                Placement Trainer Chatbot
            </Typography>
            <Scrollbars ref={scrollbarsRef} autoHide style={{ width: '100%', height: '70vh', backgroundColor: '#fff', borderRadius: '8px', padding: '1rem' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {chatHistory.map((entry, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <Avatar>{entry.role === 'You' ? 'Y' : 'B'}</Avatar>
                            <Paper elevation={3} sx={{ padding: '1rem', backgroundColor: entry.role === 'You' ? '#e3f2fd' : '#fce4ec', flexGrow: 1 }}>
                                <Typography variant="body1"><strong>{entry.role}:</strong> {entry.text}</Typography>
                            </Paper>
                        </Box>
                    ))}
                    {responseLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            </Scrollbars>
            <Box sx={{ display: 'flex', gap: '1rem', width: '100%', marginTop: '1rem' }}>
                <TextField
                    label="Ask me anything..."
                    variant="outlined"
                    value={input}
                    onChange={handleInputChange}
                    fullWidth
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={responseLoading}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatBot;
