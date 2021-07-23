import React from 'react';
import People  from './People';
import CharacterCount from './CharacterCount';
import { Container, Button, makeStyles} from '@material-ui/core';
import DuplicateEmails from './DuplicateEmails';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

export function LandingPage() {

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <People/>
      <CharacterCount></CharacterCount>
      <DuplicateEmails></DuplicateEmails>
    </Container>
  );
}