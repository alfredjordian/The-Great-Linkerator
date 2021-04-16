import React from 'react';
import Button from '@material-ui/core/Button';
import CreateLinkCard from './CreateLinkCard';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
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

function CreateLink() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    

    return (
        <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'2%'}}>
        <Button
        style={{backgroundColor:'lightgreen', fontWeight:'bolder', width:'15%'}}
        size="small"
        variant="contained"
        className={classes.button}
        endIcon={<AddCircleIcon></AddCircleIcon>}
        type="button"
        onClick={handleOpen}
        >
        New Link
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
          <CreateLinkCard/>
        </Fade>
      </Modal> 
        </div>
    )
}

export default CreateLink
