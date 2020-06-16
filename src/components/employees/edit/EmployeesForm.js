import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import Chip from '@material-ui/core/Chip';
import HOCForm from '../../abstr/HOCForm/HOCForm';

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
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="name"
                  label="Imię i nazwisko"
                  value={item.name}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('name', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>
            <Grid item xs={5} className={classes.gridWithChips}>
                {
                  item.teams && item.teams.map(team => (
                    <Tooltip key={team._id} title="Edytuj ekipę">
                      <Chip 
                        key={team._id}
                        variant='outlined'
                        className={classes.chip} 
                        label={team.name} 
                        component="a" 
                        href={`../teams/${team._id}`} 
                        clickable 
                        color="primary"
                      />
                    </Tooltip>
                  ))
                }
            </Grid>
            <Grid item xs={1} align="right">
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
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="mail"
                  label="E-mail"
                  value={item.mail}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('mail', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="phoneNumber"
                  label="Telefon"
                  value={item.phoneNumber}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('phoneNumber', e)}
                  disabled={!editMode}
                />
              </FormControl>
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

EmployeesForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
    _id: PropTypes.string,
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
