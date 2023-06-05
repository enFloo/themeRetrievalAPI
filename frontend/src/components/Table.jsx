import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1A76D2',
    color: theme.palette.common.white,
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

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, width: 255 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}



export default function DataTable({listProducts, setListProducts}){
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listProducts.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [updateState, setUpdateState] = useState(-1)

  return(
    <div className='col-md-8'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>ThumbnailURL</StyledTableCell>
              <StyledTableCell>SourceURL</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody> 
          {listProducts.map((row) => (
            updateState === row[0] ? <Edit row={row} listProducts={listProducts} handleEdit={handleEdit}/> :
            <StyledTableRow key={row[0]}>
              <StyledTableCell component="th" scope="row">
                {row[0]} 
              </StyledTableCell>
              <StyledTableCell>{row[1]}</StyledTableCell>
              <StyledTableCell>{row[2]}</StyledTableCell>
              <StyledTableCell>{row[3]}</StyledTableCell>
              <StyledTableCell>{row[4]}</StyledTableCell>
              <StyledTableCell className='actionContainer'><button type='button' className="linkButton editButton" onClick={(() => handleEdit(row[0]))}>edit</button>
                  <button className="linkButton deleteButton" onClick={(() => handleDelete(row[0]))}>delete</button></StyledTableCell>
            </StyledTableRow>
          ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={listProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
    
  )

  function handleEdit(id){
    setUpdateState(id)
  }
  
  function handleDelete(id){
    setUpdateState(id)
  }
  
}


function Edit({row, listProducts, handleEdit}){
  return(
    <StyledTableRow key={row[0]}>
      <StyledTableCell component="th" scope="row">
        {row[0]}
      </StyledTableCell>
      <StyledTableCell><input  type='text' name='name' defaultValue={row[1]} /></StyledTableCell>
      <StyledTableCell><input  type='text' name='thumbnailURL' defaultValue={row[2]} /></StyledTableCell>
      <StyledTableCell><input  type='text' name='sourceURL' defaultValue={row[3]} /></StyledTableCell>
      <StyledTableCell><input  type='text' name='category' defaultValue={row[4]} /></StyledTableCell>
      <StyledTableCell className='actionContainer'><button type='button' className="linkButton editButton" onClick={(() => handleEdit(row[0]))}>Update</button></StyledTableCell>
    </StyledTableRow>
  )
}