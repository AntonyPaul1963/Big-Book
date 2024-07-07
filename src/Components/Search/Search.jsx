import { useState } from 'react';
import { Box, Typography, InputBase, Button } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Skeleton from '@mui/material/Skeleton';

const CustomInputBase = styled(InputBase)({
  '& input': {
    fontSize: '1.2rem',
    caretColor: 'black',
  }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Search() {
  //This is the state that will store the text that the user types in the search bar
  const [display, setDisplay] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [topics, setTopics] = useState(null);

  //This function will be called when the user clicks the search button
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('');

  const [papers, setPapers] = useState(null);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCellClick = (url) => {
    setUrl(url);
    setDisplay(false);
    setTopics(null);
  };

  const callPythonFunction = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/getResearch', { data: searchText });
      setTopics(response.data.result);
    } catch (error) {
      console.error('Error calling the API', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>

      {display === true &&
        <>
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
            <Button variant="contained" color="primary" onClick={() => { callPythonFunction() }} sx={{ ml: 2 }}>
              Search
            </Button>
          </Box>
        </>

      }

      {topics &&
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: '85%',
            margin: '2rem',
            borderRadius: 4
          }}
        >
          <Scrollbars style={{ width: '100%', height: '500px' }} autoHide>
            <Table sx={{ minWidth: 650, height: '500px' }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Upload Date</StyledTableCell>
                  <StyledTableCell align="center">Title</StyledTableCell>
                  <StyledTableCell align="center">Researcher</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  // Render skeleton loaders while loading
                  Array.from(new Array(5)).map((_, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <Skeleton animation="wave" />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton animation="wave" />
                      </StyledTableCell>
                      <StyledTableCell>
                        <Skeleton animation="wave" />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  // Render actual data when loaded
                  topics.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">{row[1]}</StyledTableCell>
                      <StyledTableCell align="center">
                        <a
                          href={row[3]} // Assuming row[3] contains the URL to navigate to
                          style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            transition: 'color 0.3s ease-in-out', // Smooth color transition
                            '&:hover': {
                              color: 'blue', // Change color to blue on hover
                            },
                          }}
                          onClick={(e) => { e.preventDefault(); handleCellClick(row[3]); }}
                        >
                          {row[2]}
                        </a>
                      </StyledTableCell>
                      <StyledTableCell align="center">{row[4]}</StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Scrollbars>
        </TableContainer>
      }

      {}


    </Box>
  );
}

export default Search;
