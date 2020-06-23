import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import MapIcon from '@material-ui/icons/Map';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DateTimePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { pl } from 'date-fns/locale';
import HOCForm from '../../abstr/HOCForm/HOCForm';
import validateURI from '../../../helpers/uriValidator';

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
            <Grid item xs={8}>
              <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
                <DateTimePicker
                  fullWidth
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

            <Grid item xs={2} align="right">
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
              {/* <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-mutiple-chip-label">Miejsce</InputLabel>
                <Select
                  disabled={!editMode}
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={item.members.map((member) =>
                    member._id ? member._id : member
                  )}
                  onChange={(e) => handleChange('members', e)}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => this.renderChips(selected)}
                  MenuProps={MenuProps}
                >
                  {employeesOptions.map((member) => (
                    <MenuItem key={member._id} value={member._id}>
                      {member.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <Autocomplete
                value={item.venue}
                onChange={(e, newValue) =>
                  console.log(e.target, newValue) ||
                  handleChange('venue', newValue, true)
                }
                getOptionSelected={(o, v) => o.name === v}
                id="combo-box-demo"
                options={venuesOptions}
                getOptionLabel={(option) => option.name || option}
                renderInput={(params) => (
                  <TextField {...params} label="Miejsce" variant="outlined" />
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
