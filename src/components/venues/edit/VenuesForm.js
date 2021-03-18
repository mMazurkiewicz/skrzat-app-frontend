import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import CancelIcon from '@material-ui/icons/Cancel';
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
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { pl } from 'date-fns/locale';
import HOCForm from '../../abstr/HOCForm/HOCForm';
import validateURI from '../../../helpers/uriValidator';
import Breadcrumbs from '../../abstr/breadcrumbs/Breadcrumbs';

export class VenuesForm extends Component {
  constructor(props) {
    super(props);
    this.getMapQuery = this.getMapQuery.bind(this);
  }

  getMapQuery() {
    const { item } = this.props;
    const query = `${item.street}+${item.streetNo}+${item.city}`;
    return `http://maps.google.com/?q=${query}`;
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
      getBreadCrumbName,
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Breadcrumbs
          routes={[
            { name: 'Placówki', href: '/venues' },
            {
              name: getBreadCrumbName('Nowa placówka'),
            },
          ]}
        />

        {loading && (
          <div className={classes.loader}>
            <CircularProgress align="center" />
          </div>
        )}
        {!loading && (
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="name"
                  label="Nazwa"
                  value={item.name}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('name', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  disabled={!editMode}
                  id="lastContact"
                  label="Ostatni kontakt"
                  format="dd/MM/yyyy"
                  value={item.lastContact || null}
                  onChange={(e) => handleChange('lastContact', e, true)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="street"
                  label="Ulica"
                  value={item.street}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('street', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>

            <Grid item xs={4} md={2}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="streetNo"
                  label="Numer"
                  value={item.streetNo}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('streetNo', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>

            <Grid item xs={8} md={4}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="city"
                  label="Miasto"
                  value={item.city}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('city', e)}
                  disabled={!editMode}
                  InputProps={{
                    endAdornment: item.street && item.streetNo && item.city && (
                      <InputAdornment
                        onClick={() =>
                          window.open(this.getMapQuery(), '_blank')
                        }
                        position="end"
                      >
                        <Tooltip title="Idź do mapy">
                          <MapIcon
                            color="primary"
                            style={{ cursor: 'pointer' }}
                          />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} md={2}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="zip"
                  label="Kod pocztowy"
                  value={item.zip}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('zip', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} md={4}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="postOffice"
                  label="Poczta"
                  value={item.postOffice}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('postOffice', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="phone"
                  label="Telefon"
                  value={item.phone}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('phone', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                error={!(item.website === '') && !validateURI(item.website)}
                helperText="Wpisz adres bez http(s)://"
                id="website"
                label="strona www"
                value={item.website}
                variant="outlined"
                multiline
                onChange={(e) => handleChange('website', e)}
                disabled={!editMode}
                InputProps={{
                  endAdornment: validateURI(item.website) && (
                    <InputAdornment
                      onClick={() =>
                        window.open(`http://${item.website}`, '_blank')
                      }
                      position="end"
                    >
                      <Tooltip title="Idź do strony">
                        <ExitToAppIcon
                          color="primary"
                          style={{ cursor: 'pointer' }}
                        />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  id="additionalInfo"
                  label="Dodatkowe informacje"
                  value={item.additionalInfo}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('additionalInfo', e)}
                  disabled={!editMode}
                />
              </FormControl>
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

VenuesForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    streetNo: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    postOffice: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string,
    lastContact: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    zip: PropTypes.string.isRequired,
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
  editMode: PropTypes.bool,
  loading: PropTypes.bool,
  toggleEditMode: PropTypes.func,
  goBack: PropTypes.func,
  sendDataToServer: PropTypes.func,
  handleChange: PropTypes.func,
  getBreadCrumbName: PropTypes.func.isRequired,
};

export const prefix = 'VENUES_FORM_';

const mapStateToProps = (state) => ({
  loading: state.venues.form.loading,
  item: state.venues.form.item,
  editMode: state.venues.form.editMode,
});

const wrappedForm = HOCForm(VenuesForm, {
  prefix,
  route: 'venues',
});

export default connect(mapStateToProps, null)(wrappedForm);
