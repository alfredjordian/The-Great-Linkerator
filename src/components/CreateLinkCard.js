import React from 'react';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from '@material-ui/core/Avatar';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
    root: {
      minWidth: 275
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  });


function CreateLinkCard() {

    const classes = useStyles();


    return (
            <div style={{ margin: "5%" }}>
      
      <Card>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
          <Avatar className={classes.avatar}>
              <FitnessCenterIcon />
            </Avatar>
            <form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
                type="Date"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="URL"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Click Count"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Comments"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Tags"
                style={{marginBottom: "8%" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                style={{ backgroundColor: "green", marginBottom: "8%" }}
              >
                Create Link
              </Button>
            </form>
          </div>
        </Container>
      </Card>
  </div>

    )
}

export default CreateLinkCard
