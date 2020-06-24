import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { pl } from 'date-fns/locale';
import HOCForm from '../../abstr/HOCForm/HOCForm';

export class EventsForm extends Component {
  constructor(props) {
    super(props);
    this.venuesRoute = `${window.App.serverPath}venues/dictionary`;
    this.teamsRoute = `${window.App.serverPath}teams/dictionary`;
    this.fairyTalesRoute = `${window.App.serverPath}fairyTales/dictionary`;
    this.loadVenues = this.loadVenues.bind(this);
    this.loadTeams = this.loadTeams.bind(this);
    this.loadFairyTales = this.loadFairyTales.bind(this);
  }

  componentDidMount() {
    this.loadVenues();
    this.loadTeams();
    this.loadFairyTales();
  }

  loadVenues() {
    const { addExtraOptionsOptions } = this.props;

    axios.get(this.venuesRoute).then((res) => {
      addExtraOptionsOptions(res.data, 'venuesOptions');
    });
  }

  loadTeams() {
    const { addExtraOptionsOptions } = this.props;

    axios.get(this.teamsRoute).then((res) => {
      addExtraOptionsOptions(res.data, 'teamsOptions');
    });
  }

  loadFairyTales() {
    const { addExtraOptionsOptions } = this.props;

    axios.get(this.fairyTalesRoute).then((res) => {
      addExtraOptionsOptions(res.data, 'fairyTalesOptions');
    });
  }

  render() {
    const {
      classes,
      item,
      editMode,
      loading,
      toggleEditMode,
      goBack,
      handleChange,
      sendDataToServer,
      venuesOptions,
      teamsOptions,
      fairyTalesOptions,
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {loading && (
          <div className={classes.loader}>
            <CircularProgress align="center" />
          </div>
        )}
        {!loading && (
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={6}>
              <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
                <DateTimePicker
                  required
                  id="dateTime"
                  disabled={!editMode}
                  label="Data"
                  disablePast
                  ampm={false}
                  inputVariant="outlined"
                  value={item.dateTime}
                  onChange={(e) => handleChange('dateTime', e, true)}
                  format="dd/MM/yyyy HH:mm"
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={6} align="right">
              <Tooltip title="Edytuj">
                <span>
                  <IconButton
                    disabled={!item._id}
                    edge="end"
                    aria-label="edit"
                    onClick={toggleEditMode}
                  >
                    <EditIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                id="venue picker"
                disabled={!editMode}
                value={item.venue}
                onChange={(e, newValue) =>
                  handleChange('venue', newValue, true)
                }
                getOptionSelected={(o, v) => o._id === v._id}
                options={venuesOptions}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Miejsce"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                id="teams picker"
                disabled={!editMode}
                value={item.team}
                onChange={(e, newValue) => handleChange('team', newValue, true)}
                getOptionSelected={(o, v) => o._id === v._id}
                options={teamsOptions}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Ekipa"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                id="fairyTales picker"
                disabled={!editMode}
                value={item.fairyTale}
                onChange={(e, newValue) =>
                  handleChange('fairyTale', newValue, true)
                }
                getOptionSelected={(o, v) => o._id === v._id}
                options={fairyTalesOptions}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Bajka"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} align="center">
              <div className={classes.root}>
                <Button
                  variant="outlined"
                  onClick={goBack}
                  size="large"
                  startIcon={<UndoIcon />}
                >
                  Wróć
                </Button>

                <Button
                  onClick={() => sendDataToServer(item)}
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

EventsForm.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    dateTime: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    venue: PropTypes.instanceOf(Object),
    team: PropTypes.instanceOf(Object),
    fairyTale: PropTypes.instanceOf(Object),
  }),
  venuesOptions: PropTypes.array.isRequired,
  teamsOptions: PropTypes.array.isRequired,
  fairyTalesOptions: PropTypes.array.isRequired,
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
  editMode: PropTypes.bool,
  loading: PropTypes.bool,
  toggleEditMode: PropTypes.func,
  goBack: PropTypes.func,
  sendDataToServer: PropTypes.func,
  handleChange: PropTypes.func,
  addExtraOptionsOptions: PropTypes.func,
};

export const prefix = 'EVENTS_FORM_';

const mapStateToProps = (state) => ({
  loading: state.events.form.loading,
  item: state.events.form.item,
  editMode: state.events.form.editMode,
  venuesOptions: state.events.form.venuesOptions,
  teamsOptions: state.events.form.teamsOptions,
  fairyTalesOptions: state.events.form.fairyTalesOptions,
});

const wrappedForm = HOCForm(EventsForm, {
  prefix,
  route: 'events',
});

export default connect(mapStateToProps, null)(wrappedForm);
