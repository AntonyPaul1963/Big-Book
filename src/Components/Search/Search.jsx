import { Box, Typography, InputBase } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';

const CustomInputBase = styled(InputBase)({
  '& input': {
    fontSize: '1.2rem',
    caretColor: 'black',
    caretShape: 'block',
  }
});

export default function Search() {

  const [searchText, setSearchText] = useState('');

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h4" align="center" sx={{ mt: 3 }}>
        Find your research Paper
      </Typography>
      <CustomInputBase
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        value={searchText}
        sx={{ width: '45%', mt: 3, ml: 2, p: 0.5, borderRadius: 1, border: 1, borderColor: 'blue' }}
      />
    </Box>
  );
}

