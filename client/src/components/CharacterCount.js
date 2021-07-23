import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const columns = [
  { id: 'character', label: 'Character', minWidth: 170 },
  { id: 'count', label: 'Count', minWidth: 100 },
];

const CharacterCountDialog = (props) => {
  console.log(props);
  const { onClose, open, characterCounts} = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Unique Characters in Emails</DialogTitle>
      <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
              {columns.map((column) => (
                  <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  >
                  {column.label}
                  </TableCell>
              ))}
              </TableRow>
          </TableHead>
          <TableBody>
              {characterCounts.map((row, index) => {
                return (
                  <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                        <TableCell key={column.id} align={column.align}>
                            {value}
                        </TableCell>
                        );
                    })}
                  </TableRow>
                  );
                })}
          </TableBody>
        </Table>
    </Dialog>
  );
}

CharacterCountDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  characterCounts: PropTypes.array.isRequired
};


const CharacterCount = (props) => {
  console.log(props);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Show Email Character Counts
      </Button>
      <CharacterCountDialog open={open} onClose={handleClose} characterCounts={props.characterCounts}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    characterCounts: state.characterCounts
  };
};

export default connect(mapStateToProps)(CharacterCount);