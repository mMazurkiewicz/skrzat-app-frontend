import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import HOCForm from '../../abstr/HOCForm/HOCForm';
import rolesOptions from '../../../enums/rolesEnum';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export class EmployeesForm extends React.Component {
  render() {
    const {
      classes,
      item,
      editMode,
      loading,
      toggleEditMode,
      goBack,
      sendDataToServer,
      handleChange,
      renderChips,
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
          <Grid container spacing={3}>
            {item.teams && (
              <Grid item xs={12} md={12} className={classes.gridWithChips}>
                {item.teams.map((team) => (
                  <Tooltip key={team._id} title="Edytuj ekipę">
                    <Chip
                      key={team._id}
                      variant="outlined"
                      className={classes.chip}
                      label={team.name}
                      component="a"
                      href={`../teams/${team._id}`}
                      clickable
                      style={{
                        color: team.color,
                        borderColor: team.color,
                      }}
                    />
                  </Tooltip>
                ))}
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                id="name"
                label="Imię i nazwisko"
                value={item.name}
                variant="outlined"
                multiline
                onChange={(e) => handleChange('name', e)}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                required
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="roles-label">Role</InputLabel>
                <Select
                  required
                  disabled={!editMode}
                  labelId="Role"
                  id="Role"
                  multiple
                  value={item.roles.map((role) =>
                    role._id ? role._id : Number(role)
                  )}
                  onChange={(e) => handleChange('roles', e)}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      variant="outlined"
                      label="Role *"
                    />
                  }
                  renderValue={(selected) =>
                    renderChips(rolesOptions, selected)
                  }
                  MenuProps={MenuProps}
                >
                  {rolesOptions.map((role) => (
                    <MenuItem key={role._id} value={role._id}>
                      <Checkbox checked={item.roles.indexOf(role._id) > -1} />
                      <ListItemText primary={role.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                id="email"
                label="E-mail"
                value={item.email}
                variant="outlined"
                onChange={(e) => handleChange('email', e)}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                id="phoneNumber"
                label="Telefon"
                value={item.phoneNumber}
                variant="outlined"
                onChange={(e) => handleChange('phoneNumber', e)}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="password"
                  label="Hasło"
                  value={item.password}
                  variant="outlined"
                  onChange={(e) => handleChange('password', e)}
                  disabled={!editMode}
                  type="password"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="repeatPassword"
                  label="Powtórz hasło"
                  value={item.repeatPassword}
                  variant="outlined"
                  onChange={(e) => handleChange('repeatPassword', e)}
                  disabled={!editMode}
                  type="password"
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

EmployeesForm.defaultProps = {
  item: PropTypes.shape({
    roles: [],
    password: '',
    repeatPassword: '',
  }),
};

EmployeesForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    repeatPassword: PropTypes.string.isRequired,
    roles: PropTypes.array.isRequired,
    _id: PropTypes.string,
    teams: PropTypes.array,
  }),
  classes: PropTypes.shape({
    toolbar: PropTypes.string,
    loader: PropTypes.string,
    root: PropTypes.string,
    content: PropTypes.string,
    gridWithChips: PropTypes.string,
    chip: PropTypes.string,
    formControl: PropTypes.string,
  }),
  editMode: PropTypes.bool,
  loading: PropTypes.bool,
  toggleEditMode: PropTypes.func,
  goBack: PropTypes.func,
  sendDataToServer: PropTypes.func,
  handleChange: PropTypes.func,
  renderChips: PropTypes.func,
};

export const prefix = 'EMPLOYEES_FORM_';

const mapStateToProps = (state) => ({
  loading: state.employees.form.loading,
  item: state.employees.form.item,
  editMode: state.employees.form.editMode,
});

const wrappedForm = HOCForm(EmployeesForm, {
  prefix,
  route: 'employees',
});

export default connect(mapStateToProps, null)(wrappedForm);
