import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Scrollbars } from 'react-custom-scrollbars-2';

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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomTable = ({ data }) => {

  return (
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
            {data.map((row) => (
              <StyledTableRow key={row[0]}>
                <StyledTableCell align="center">{row[1]}</StyledTableCell>
                <StyledTableCell align="center">{row[2]}</StyledTableCell>
                <StyledTableCell align="center">{row[4]}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbars>
    </TableContainer>
  );
};

export default CustomTable;
