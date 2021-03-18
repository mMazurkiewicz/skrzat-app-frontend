import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
  toggleModalAction,
  setMessageAction,
  showErrorModalAction,
} from './ErrorModalActions';

const styles = () => ({
  title: {
    padding: '3rem',
  },
  message: {
    padding: '1rem',
  },
  button: {
    margin: '2rem',
  },
});

export class ErrorModal extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    const { toggleModal } = this.props;
    toggleModal(false);
  }

  render() {
    const { classes, open, message } = this.props;
    return (
      <Dialog
        onClose={this.onClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle
          className={classes.title}
          align="center"
          id="simple-dialog-title"
        >
          Coś poszło nie tak!
        </DialogTitle>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              align="center"
              paragraph
              display="block"
              className={classes.message}
            >
              {message}
            </Typography>
          </Grid>
          <Grid item xs="12" align="center">
            <Button
              variant="outlined"
              className={classes.button}
              onClick={this.onClose}
              size="large"
              startIcon={<CancelIcon />}
            >
              Zamknij
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}

ErrorModal.propTypes = {
  classes: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
    button: PropTypes.string,
  }),
  message: PropTypes.string,
  open: PropTypes.bool,
  toggleModal: PropTypes.func,
};

const styledComponent = withStyles(styles)(ErrorModal);

const mapStateToProps = (state) => ({
  open: state.errorModal.open,
  message: state.errorModal.message,
});

const mapActionsToProps = {
  toggleModal: toggleModalAction,
  setMessage: setMessageAction,
  showErrorModal: showErrorModalAction,
};

export default connect(mapStateToProps, mapActionsToProps)(styledComponent);
