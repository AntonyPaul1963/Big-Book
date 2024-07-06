import { useState } from 'react';
import { Box, Typography, InputBase, Button } from '@mui/material';
import { styled } from '@mui/system';

const CustomInputBase = styled(InputBase)({
  '& input': {
    fontSize: '1.2rem',
    caretColor: 'black',
  }
});

function Search() {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    console.log('Search text:', searchText);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h4" align="center">
        Find your research Paper
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, width: { xs: '80%', sm: '60%', md: '45%' } }}>
        <CustomInputBase
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          value={searchText}
          onChange={handleInputChange}
          sx={{ flex: 1, p: 1, borderRadius: 3, border: 1, borderColor: 'blue' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ ml: 2 }}>
          Search
        </Button>
      </Box>
    </Box>
  );
}

export default Search;
