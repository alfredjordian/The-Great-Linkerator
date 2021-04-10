import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
  }));

function LinkCard({date, url, count, comments, tags}) {
    const classes = useStyles();

    return (
        <div>
        <Card className={classes.root} variant="outlined" style={{backgroundColor: '#ebebe0'}}>
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            Date : {date}
            </Typography>
            <Typography variant="h5" component="h2">
            URL : {url}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            Click Count : {count}
            </Typography>
            <Typography className={classes.pos} variant="body2" component="p">
            {/* Comment : {comments.map((com) => <h1>{com}</h1>)} */} Comment :
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            Tags : {tags}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" style={{color: 'darkblue', backgroundColor:'white', fontWeight:'bolder'}}>Link to URL</Button>
            <Button
            style={{backgroundColor:'lightgreen', fontWeight:'bolder', marginLeft:'1%'}}

            size="small"
            variant="contained"
            className={classes.button}
            endIcon={<AddCircleIcon></AddCircleIcon>}
            >
            New
            </Button>
            </CardActions>
            
        </Card>
        </div>
    )
}

export default LinkCard
