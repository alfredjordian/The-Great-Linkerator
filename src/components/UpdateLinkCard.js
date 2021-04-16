import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { updateLink } from '../api';


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


function UpdateLinkCard({linkId}) {

    const classes = useStyles();
  const [createDate, setCreateDate] = useState('');
  const [createUrl, setCreateUrl] = useState('')
  const [createComment, setCreateComment] = useState('')
  const [createTag, setCreateTag] = useState('')

    return (
            <div style={{ margin: "5%" }}>
      
      <Card>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form}
              onSubmit={e => {
              e.preventDefault();
                
              updateLink(createDate, createUrl, createComment, createTag, linkId)
    
           
            }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
                type="Date"
                onChange={(event) => setCreateDate(event.target.value)} value={createDate}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="URL"
                onChange={(event) => setCreateUrl(event.target.value)} value={createUrl}
              />
              <TextField
                variant="outlined"
                margin="normal"
                
                fullWidth
                label="Comments"
                onChange={(event) => setCreateComment(event.target.value)} value={createComment}
              />
              <TextField
                variant="outlined"
                margin="normal"
                
                fullWidth
                label="Tags"
                style={{marginBottom: "8%" }}
                onChange={(event) => setCreateTag(event.target.value)} value={createTag}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                style={{ backgroundColor: "blue", marginBottom: "8%", color:'white' }}
              >
                Update Link
              </Button>
            </form>
          </div>
        </Container>
      </Card>
  </div>

    )
}

export default UpdateLinkCard
