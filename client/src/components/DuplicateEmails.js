import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const duplicateEmails = ["benolive@salesloft.com", "benoliv@salesloft.com", "shayne.all.moore@gmail.com", "shayne.allen.moore@gmail.com"];
const DuplicateEmailsDialog = (props) => {
  const { onClose, open} = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Possible Duplicate Emails</DialogTitle>
      <List component="nav">
        {duplicateEmails.map((email, index) => {
            return (
              <ListItem key={index}>
                <ListItemText primary={email} />
              </ListItem>
              );
          })}
      </List>
    </Dialog>
  );
}

DuplicateEmailsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};


const DuplicateEmails = (props) => {
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
        Show Possible Duplicates
      </Button>
      <DuplicateEmailsDialog open={open} onClose={handleClose} characterCounts={props.characterCounts}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    duplicateEmails: state.duplicateEmails
  };
};

export default connect(mapStateToProps)(DuplicateEmails);