import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { showErrorModalAction } from '../../abstr/errorModal/ErrorModalActions';
import {
  saveItemFromServerAction,
  toggleLoadingAction,
  handleChangeInputAction,
  toggleEditAction,
  resetStateAction,
} from './FairyTalesFormActions';

const drawerWidth = 240;

const parseId = (id) => (id === '0' ? 0 : id);

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  loader: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
});

export class FairyTalesForm extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.id = parseId(match.params.id);
    this.serverRoute = `${window.App.serverPath}fairyTales/${this.id}`;
    this.route = `/fairyTales/`;
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.sendDataToServer = this.sendDataToServer.bind(this);
  }

  componentDidMount() {
    const { toggleLoading, saveItemFromServer, toggleEdit } = this.props;
    if (this.id) {
      toggleLoading(true);
      axios.get(this.serverRoute).then((res) => {
        saveItemFromServer(res.data);
        toggleLoading(false);
      });
    } else {
      toggleEdit(true);
    }
  }

  goBack() {
    const { history, resetState } = this.props;

    history.push('/fairyTales');
    resetState();
  }

  handleChange(field, e) {
    const { handleChangeInput } = this.props;

    handleChangeInput(field, e.target.value);
  }

  toggleEdit() {
    const { editMode, toggleEdit } = this.props;
    toggleEdit(!editMode);
  }

  sendDataToServer() {
    const {
      item,
      toggleLoading,
      toggleEdit,
      showErrorModal,
      history,
      saveItemFromServer,
    } = this.props;

    toggleLoading(true);

    axios
      .post(this.serverRoute, item)
      .then((res) => {
        toggleLoading(false);
        toggleEdit(false);
        saveItemFromServer(res.data);
        history.push(`${this.route}${res.data._id}`);
      })
      .catch((err) => {
        const error = { err };
        showErrorModal(error.err.response.data.message);
      });
  }

  render() {
    const { classes, item, editMode, loading } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {loading && (
          <div className={classes.loader}>
            <CircularProgress align="center" />
          </div>
        )}
        {!loading && (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="name"
                  label="Nazwa"
                  value={item.name}
                  variant="outlined"
                  multiline
                  onChange={(e) => this.handleChange('name', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} align="right">
              <Tooltip title="Edytuj">
                <span>
                  <IconButton
                    disabled={!item._id}
                    edge="end"
                    aria-label="edit"
                    onClick={this.toggleEdit}
                  >
                    <EditIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="description"
                  label="Opis"
                  value={item.description}
                  variant="outlined"
                  multiline
                  onChange={(e) => this.handleChange('description', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
              <div className={classes.root}>
                <Button
                  variant="outlined"
                  onClick={this.goBack}
                  size="large"
                  startIcon={<UndoIcon />}
                >
                  Wróć
                </Button>

                <Button
                  onClick={this.sendDataToServer}
                  size="large"
                  disabled={!editMode}
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                >
                  Zapisz
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
      </main>
    );
  }
}

FairyTalesForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  classes: PropTypes.shape({
    toolbar: PropTypes.string,
    loader: PropTypes.string,
    root: PropTypes.string,
    content: PropTypes.string,
  }),
  history: PropTypes.object,
  resetState: PropTypes.func,
  toggleLoading: PropTypes.func,
  toggleEdit: PropTypes.func,
  handleChangeInput: PropTypes.func,
  saveItemFromServer: PropTypes.func,
  editMode: PropTypes.bool,
  loading: PropTypes.bool,
  showErrorModal: PropTypes.func,
};

const styledComponent = withStyles(styles)(FairyTalesForm);

const mapStateToProps = (state) => ({
  loading: state.fairyTales.form.loading,
  item: state.fairyTales.form.item,
  editMode: state.fairyTales.form.editMode,
});

const mapActionsToProps = {
  toggleLoading: toggleLoadingAction,
  saveItemFromServer: saveItemFromServerAction,
  toggleEdit: toggleEditAction,
  resetState: resetStateAction,
  handleChangeInput: handleChangeInputAction,
  showErrorModal: showErrorModalAction,
};

export default connect(mapStateToProps, mapActionsToProps)(styledComponent);
