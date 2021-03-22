import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { CirclePicker } from 'react-color';
import HOCForm from '../../abstr/HOCForm/HOCForm';
import Breadcrumbs from '../../abstr/breadcrumbs/Breadcrumbs';

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

export class TeamsForm extends Component {
  constructor(props) {
    super(props);
    this.employeesRoute = `${window.App.serverPath}employees/dictionary`;
    this.loadEmployees = this.loadEmployees.bind(this);
    this.prepareDataAndSave = this.prepareDataAndSave.bind(this);
    this.checkForMembers = this.checkForMembers.bind(this);
  }

  componentDidMount() {
    this.loadEmployees();
  }

  loadEmployees() {
    const { saveEmployeesOptions } = this.props;

    axios.get(this.employeesRoute).then((res) => {
      saveEmployeesOptions(res.data);
    });
  }

  checkForMembers(employee) {
    const { item } = this.props;

    return item.members.find((member) => {
      const id = member._id ? member._id : member;
      return id === employee._id;
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
      employeesOptions,
      renderChips,
      getBreadCrumbName,
      sendDataToServer,
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Breadcrumbs
          routes={[
            { name: 'Ekipy', href: '/teams' },
            {
              name: getBreadCrumbName('Nowa ekipa'),
            },
          ]}
        />
        {loading && (
          <div className={classes.loader}>
            <CircularProgress align="center" />
          </div>
        )}
        {!loading && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="name"
                label="Nazwa"
                value={item.name}
                variant="outlined"
                multiline
                onChange={(e) => handleChange('name', e)}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="Członkowie" required>
                  Członkowie
                </InputLabel>
                <Select
                  required
                  disabled={!editMode}
                  labelId="Członkowie"
                  id="members"
                  multiple
                  value={item.members.map((member) =>
                    member._id ? member._id : member
                  )}
                  onChange={(e) => handleChange('members', e)}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      variant="outlined"
                      label="Członkowie *"
                    />
                  }
                  renderValue={(selected) =>
                    renderChips(employeesOptions, selected)
                  }
                  MenuProps={MenuProps}
                >
                  {employeesOptions.map((employee) => (
                    <MenuItem key={employee._id} value={employee._id}>
                      <Checkbox
                        checked={item.members.indexOf(employee._id) > -1}
                      />
                      <ListItemText primary={employee.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={editMode ? 12 : 6}>
              {editMode ? (
                <CirclePicker
                  disabled
                  width="100%"
                  color={item.color}
                  onChange={(color) => handleChange('color', color.hex)}
                  circleSpacing={10}
                  circleSize={28}
                  colors={[
                    '#f44336',
                    '#e91e63',
                    '#aa00ff',
                    '#673ab7',
                    '#3f51b5',
                    '#2196f3',
                    '#03a9f4',
                    '#00bcd4',
                    '#009688',
                    '#4caf50',
                    '#8bc34a',
                    '#cddc39',
                    '#ffeb3b',
                    '#ffc107',
                    '#ff9800',
                    '#ff5722',
                    '#795548',
                    '#607d8b',
                  ]}
                />
              ) : (
                <TextField
                  fullWidth
                  required
                  id="color"
                  variant="outlined"
                  label="Kolor"
                  value={item.color}
                  disabled
                  inputProps={{
                    style: {
                      borderLeft: `9px solid ${item.color}`,
                      borderRadius: '5px',
                    },
                  }}
                />
              )}
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

TeamsForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    members: PropTypes.array,
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    chip: PropTypes.string,
    chips: PropTypes.string,
  }),
  editMode: PropTypes.bool,
  loading: PropTypes.bool,
  toggleEditMode: PropTypes.func,
  goBack: PropTypes.func,
  sendDataToServer: PropTypes.func,
  handleChange: PropTypes.func,
  employeesOptions: PropTypes.array,
  saveEmployeesOptions: PropTypes.func.isRequired,
  renderChips: PropTypes.func.isRequired,
  getBreadCrumbName: PropTypes.func.isRequired,
};

export const prefix = 'TEAMS_FORM_';

const mapStateToProps = (state) => ({
  loading: state.teams.form.loading,
  item: state.teams.form.item,
  editMode: state.teams.form.editMode,
  employeesOptions: state.teams.form.employeesOptions,
});

const wrappedForm = HOCForm(TeamsForm, {
  prefix,
  route: 'teams',
});

export default connect(mapStateToProps, null)(wrappedForm);
