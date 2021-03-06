import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { pl } from 'date-fns/locale';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from '@material-ui/lab/Alert';
import HOCForm from '../../abstr/HOCForm/HOCForm';
import FormActions from './EventsFormActions';
import { prefix } from './eventsFormReducer';
import Breadcrumbs from '../../abstr/breadcrumbs/Breadcrumbs';

export class EventsForm extends Component {
  constructor(props) {
    super(props);
    this.venuesRoute = `${window.App.serverPath}venues/dictionary`;
    this.teamsRoute = `${window.App.serverPath}teams/dictionary`;
    this.fairyTalesRoute = `${window.App.serverPath}fairyTales/dictionary`;
    this.loadVenues = this.loadVenues.bind(this);
    this.loadTeams = this.loadTeams.bind(this);
    this.loadFairyTales = this.loadFairyTales.bind(this);
    this.getVenueSearchValue = this.getVenueSearchValue.bind(this);
    this.loadVenuesDebounced = AwesomeDebouncePromise(this.loadVenues, 500);
    this.findTeamColor = this.findTeamColor.bind(this);
    this.isPast = this.isPast.bind(this);
  }

  componentDidMount() {
    this.loadTeams();
    this.loadFairyTales();
  }

  getVenueSearchValue(inputValue) {
    const { item } = this.props;
    const venue = item.venue ? item.venue.name : null;
    return inputValue.match(venue) ? venue : inputValue;
  }

  isPast() {
    const { item } = this.props;
    return Date.parse(item.dateTime) < Date.now();
  }

  loadVenues(inputValue) {
    const { addExtraOptions, handleNonItemChange } = this.props;

    const searchValue = this.getVenueSearchValue(inputValue);

    if (inputValue.length > 0) {
      handleNonItemChange('venuesLoading', true);
      axios
        .get(this.venuesRoute, { params: { value: searchValue } })
        .then((res) => {
          addExtraOptions(res.data, 'venuesOptions');
          handleNonItemChange('venuesLoading', false);
        });
    }
  }

  loadTeams() {
    const { addExtraOptions } = this.props;

    axios.get(this.teamsRoute).then((res) => {
      addExtraOptions(res.data, 'teamsOptions');
    });
  }

  loadFairyTales() {
    const { addExtraOptions } = this.props;

    axios.get(this.fairyTalesRoute).then((res) => {
      addExtraOptions(res.data, 'fairyTalesOptions');
    });
  }

  findTeamColor() {
    const { teamsOptions, item } = this.props;

    const teamId = item.team ? item.team._id : null;
    const currentTeam = teamsOptions.filter((option) => option._id === teamId);
    return currentTeam.length ? currentTeam[0].color : null;
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
      addExtraOptions,
      venuesLoading,
      getBreadCrumbName,
    } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Breadcrumbs
          routes={[
            { name: 'Przedstawienia', href: '/events' },
            {
              name: getBreadCrumbName(
                'Nowe przedstawienie',
                'Edytuj przedstawienie'
              ),
            },
          ]}
        />
        {loading && (
          <div className={classes.loader}>
            <CircularProgress align="center" />
          </div>
        )}
        {!loading && (
          <Grid container spacing={4} alignItems="flex-end">
            {this.isPast() && item._id && (
              <Grid item xs={12} align="center">
                <Alert severity="warning">
                  Wydarzenie już się odbyło! Brak możliwośći edycji!
                </Alert>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
                <DateTimePicker
                  fullWidth
                  required
                  id="dateTime"
                  disabled={!editMode}
                  label="Data"
                  disablePast={!(this.isPast() && item._id)}
                  ampm={false}
                  inputVariant="outlined"
                  value={item.dateTime}
                  onChange={(e) => handleChange('dateTime', e, true)}
                  format="dd/MM/yyyy HH:mm"
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                required
                autoHighlight
                noOptionsText="Brak wyników"
                clearText="Wyczyść"
                id="venue picker"
                disabled={!editMode || !!(!this.isPast() && item._id)}
                filterOptions={(x) => x}
                value={item.venue}
                options={venuesOptions.sort((a, b) =>
                  a.city.localeCompare(b.city)
                )}
                groupBy={(option) => option.city}
                getOptionLabel={(option) => option.name}
                onInputChange={async (e, value) => {
                  if (value.length === 0) {
                    addExtraOptions([], 'venuesOptions');
                  } else {
                    await this.loadVenuesDebounced(value);
                  }
                }}
                onChange={(e, newValue) => handleChange('venue', newValue)}
                getOptionSelected={(o, v) => o._id === v._id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required={!item.venue}
                    placeholder="Zacznij pisać aby szukać po nazwie lub mieście..."
                    label={item.venue ? item.venue.city : 'Miejsce'}
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {venuesLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                id="teams picker"
                disabled={!editMode}
                value={item.team}
                onChange={(e, newValue) => handleChange('team', newValue, true)}
                getOptionSelected={(o, v) => o._id === v._id}
                options={teamsOptions}
                getOptionLabel={(option) => option.name}
                renderOption={(option) => (
                  <ListItemText
                    primary={option.name}
                    style={{ color: option.color }}
                  />
                )}
                style={{
                  borderRadius: '5px',
                  boxShadow: `inset 31px 0px 0px -23px ${this.findTeamColor()}`,
                }}
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

            <Grid item xs={12} md={6}>
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
                {!editMode || !item._id ? (
                  <Button
                    variant="outlined"
                    onClick={goBack}
                    size="large"
                    startIcon={<UndoIcon />}
                  >
                    Wróć
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={toggleEditMode}
                    size="large"
                    startIcon={<CancelIcon />}
                  >
                    Anuluj
                  </Button>
                )}
                {editMode ? (
                  <Button
                    onClick={() => sendDataToServer(item)}
                    size="large"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Zapisz
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={toggleEditMode}
                    size="large"
                    color="primary"
                    startIcon={<EditIcon />}
                    disabled={this.isPast()}
                  >
                    Edytuj
                  </Button>
                )}
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
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  addExtraOptions: PropTypes.func,
  handleNonItemChange: PropTypes.func,
  getBreadCrumbName: PropTypes.func,
  venuesLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.events.form.loading,
  item: state.events.form.item,
  editMode: state.events.form.editMode,
  venuesOptions: state.events.form.venuesOptions,
  venuesLoading: state.events.form.venuesLoading,
  teamsOptions: state.events.form.teamsOptions,
  fairyTalesOptions: state.events.form.fairyTalesOptions,
});

const wrappedForm = HOCForm(EventsForm, {
  route: 'events',
  prefix,
  actions: FormActions,
});

export default connect(mapStateToProps, null)(wrappedForm);
