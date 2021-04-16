import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


function SearchBar({searchTerm, setSearchTerm}) {

    const classes = useStyles();
    return (
        <div>
        <div style={{width:'100%', marginTop:'1%'}}>
                <form style={{display:'flex', justifyContent:'center'}}
                className={classes.root} 
                noValidate autoComplete="off"
                onSubmit={e => {
                  e.preventDefault();

                }}
                >
                <TextField 
                id="standard-basic" 
                label="Search Links Or Urls" 
                onChange={(event) => setSearchTerm(event.target.value)} value={searchTerm}
                />

                </form>

        </div>
        </div>
    )
}

export default SearchBar
