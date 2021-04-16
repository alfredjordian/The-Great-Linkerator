import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudIcon from '@material-ui/icons/Cloud';
import { destroyLink, updateLink } from '../api';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import UpdateLinkCard from './UpdateLinkCard';


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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));

function LinkCard({date, url, count, comments, tags, linkId}) {
    const classes = useStyles();
    console.log(count)

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

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
            Comment : {comments}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            Tags : {tags}
            </Typography>
            </CardContent>
            <CardActions>
            <Link href = {url}>
            <Button 
            size="small" 
            style={{color: 'darkblue', backgroundColor:'white', fontWeight:'bolder'}}
            onClick={() => {
                count = count + 1
                
                updateLink(date, url, count, comments, tags, linkId)
                 
            }}
            >
            Link to URL</Button>
            </Link>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() =>{  
                    
                    destroyLink(linkId)
                
                
                }}
                >
                Delete
                </Button>

                <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CloudIcon />}
                onClick={handleOpen}> 
                Update Link!
                </Button>
                        
                <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
                >
                <Fade in={open}>
                <UpdateLinkCard linkId={linkId}/>
                </Fade>
                </Modal> 

            </CardActions>
            
        </Card>
        </div>
    )
}

export default LinkCard
