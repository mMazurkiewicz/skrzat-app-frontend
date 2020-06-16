import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import HOCForm from '../../abstr/HOCForm/HOCForm';

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
    this.employeesRoute = `${window.App.serverPath}employees`;
    this.loadEmployees = this.loadEmployees.bind(this);
    this.renderChips = this.renderChips.bind(this);
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

  renderChips(selected) {
    const { employeesOptions, classes } = this.props;

    const selectedEmployees = employeesOptions.filter(
      (option) => selected.indexOf(option._id) !== -1
    );

    return (
      <div className={classes.chips}>
        {selectedEmployees.map((employee) => (
          <Chip
            key={employee._id}
            label={employee.name}
            className={classes.chip}
          />
        ))}
      </div>
    );
  }

  checkForMembers(employee) {
    const { item } = this.props;

    return item.members.find(member => {
      let id = member._id ? member._id : member;
      return id === employee._id
    })
  }

  prepareDataAndSave() {
    const { item, sendDataToServer, employeesOptions } = this.props;
    
    const preparedEmployees = employeesOptions
      .filter(
        this.checkForMembers
      )
      .map(employee => ({ name: employee.name, _id: employee._id}));

    item.members = preparedEmployees;
    sendDataToServer(item);
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
                  label="Nazwa"
                  value={item.name}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('name', e)}
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
                    onClick={toggleEditMode}
                  >
                    <EditIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-mutiple-chip-label">Członkowie</InputLabel>
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
                  onClick={this.prepareDataAndSave}
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

TeamsForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    members: PropTypes.array,
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
