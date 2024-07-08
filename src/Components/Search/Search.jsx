import { useState } from 'react';
import { Box, Typography, InputBase, Button } from '@mui/material';
import axios from 'axios';
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
import CircularProgress from '@mui/material/CircularProgress';

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
    wordBreak: 'break-word', // Allow words to break within the cell
    whiteSpace: 'normal', // Allow text to wrap
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
  const [display, setDisplay] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [topics, setTopics] = useState(null);
  const [details, setDetails] = useState(null);
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCellClick = (url) => {
    console.log(url);
    setUrl(url);
    setDisplay(false);
    setTopics(null);
    callPythonFunction2(url);
    callPythonFunction3(url);
  };

  const callPythonFunction = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/getResearch', { data: searchText });
      setTopics(response.data.result);
      console.log(response.data.result);
      setLoading(false);
    } catch (error) {
      console.error('Error calling the API', error);
    }
  };

  const callPythonFunction2 = async (url) => {
    try {
      const response = await axios.post('http://localhost:8000/api/getDetails', { data: url });
      setDetails(response.data.result);
      setLoading2(false);
    } catch (error) {
      console.error('Error calling the API', error);
    }
  };

  const callPythonFunction3 = async (url) => {
    try {
      const response = await axios.post('http://localhost:8000/api/getFiles', { data: url });
      setFiles(response.data.result);
      setLoading3(false);
    } catch (error) {
      console.error('Error calling the API', error);
    }
  };

  const openFile = async (file) => {
    const url = 'http://localhost:8000/runSelenium';

    const payload = {
      url: file,
      script: 'redirectPage(2)'
    }
    try {
      const response = await axios.post(url, payload);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      {display === true && (
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
            <Button variant="contained" color="primary" onClick={callPythonFunction} sx={{ ml: 2 }}>
              Search
            </Button>
          </Box>
        </>
      )}

      {topics && (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: '85%',
            margin: '2rem',
            borderRadius: 4,
            flexGrow: 1 // Make the table container grow to fill the available space
          }}
        >
          <Scrollbars style={{ width: '100%', height: '500px' }} autoHide>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
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
                  topics.map((row) => (
                    <StyledTableRow key={row[0]}>
                      <StyledTableCell align="center">{row[1]}</StyledTableCell>
                      <StyledTableCell align="center" onClick={() => handleCellClick(row[3])}>
                        {row[2]}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row[4]}</StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Scrollbars>
        </TableContainer>
      )}

      {url && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 3, mb: 3, height: '100%', flexGrow: 1 }}>
          <Scrollbars style={{ width: '100%', height: '100%' }} autoHide>
            {url && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, alignSelf: 'center' }}>
                {loading2 ? (
                  <CircularProgress color="secondary" />
                ) : (
                  url && (
                    <TableContainer component={Paper} sx={{ maxWidth: '85%', margin: '2rem', borderRadius: 4, overflow: 'hidden', flexGrow: 1 }}>
                      <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell colSpan={2} align="center">Paper Details</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <StyledTableRow>
                            <StyledTableCell align="center">Title</StyledTableCell>
                            <StyledTableCell align="center">{details && details[0]}</StyledTableCell>
                          </StyledTableRow>
                          <StyledTableRow>
                            <StyledTableCell align="center">Authors</StyledTableCell>
                            <StyledTableCell align="center">{details && details[1]}</StyledTableCell>
                          </StyledTableRow>
                          <StyledTableRow>
                            <StyledTableCell align="center">Abstract</StyledTableCell>
                            <StyledTableCell align="center">{details && details[2]}</StyledTableCell>
                          </StyledTableRow>
                          <StyledTableRow>
                            <StyledTableCell align="center">Keywords</StyledTableCell>
                            <StyledTableCell align="center">{details && details[3]}</StyledTableCell>
                          </StyledTableRow>
                          <StyledTableRow>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="center">{details && details[4]}</StyledTableCell>
                          </StyledTableRow>
                          <StyledTableRow>
                            <StyledTableCell align="center">URL</StyledTableCell>
                            <StyledTableCell align="center">{details && details[5]}</StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                )}
              </Box>
            )}

            {url && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, alignSelf: 'center' }}>
                {loading3 ? (
                  <CircularProgress color="secondary" />
                ) : (
                  files && (
                    <TableContainer component={Paper} sx={{ maxWidth: '85%', margin: '2rem', borderRadius: 4, flexGrow: 1 }}>
                      <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">Title</StyledTableCell>
                            <StyledTableCell align="center">Size</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {files.map((row) => (
                            <StyledTableRow key={row[0]}>
                              <StyledTableCell align="center" onClick={() => openFile(row[3])}>{row[1]}</StyledTableCell>
                              <StyledTableCell align="center">{row[2]}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )
                )}
              </Box>
            )}
          </Scrollbars>
        </Box>
      )}
    </Box>
  );
}

export default Search;
