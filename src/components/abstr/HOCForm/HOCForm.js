import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { showErrorModalAction } from '../errorModal/ErrorModalActions';
import HOCFormActions from './HOCFormActions';

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
  chip: {
    alignSelf: 'center',
    marginLeft: '5px',
  },
  gridWithChips: {
    display: 'flex',
  },
});

const HOCForm = (WrappedComponent, { prefix, actions, route }) => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      const { match } = this.props;
      this.id = parseId(match.params.id);
      this.serverRoute = `${window.App.serverPath}${route}/${this.id}`;
      this.route = `${route}`;
      this.handleChange = this.handleChange.bind(this);
      this.toggleEditMode = this.toggleEditMode.bind(this);
      this.goBack = this.goBack.bind(this);
      this.sendDataToServer = this.sendDataToServer.bind(this);
      this.renderChips = this.renderChips.bind(this);
      this.getBreadCrumbName = this.getBreadCrumbName.bind(this);
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

    componentDidUpdate() {
      const { match } = this.props;
      this.id = parseId(match.params.id);
      this.serverRoute = `${window.App.serverPath}${route}/${this.id}`;
    }

    componentWillUnmount() {
      const { resetState } = this.props;
      resetState();
    }

    getBreadCrumbName(addNewName, alternativeName) {
      const { id } = this;
      const { item } = this.props;

      return id ? alternativeName || item.name || '' : addNewName;
    }

    goBack() {
      const { history, resetState } = this.props;
      history.push(`/${this.route}`);
      resetState();
    }

    handleChange(field, e) {
      const { handleChangeInput } = this.props;
      const value = e && e.target ? e.target.value : e;
      handleChangeInput(field, value);
    }

    toggleEditMode() {
      const { editMode, toggleEdit } = this.props;
      toggleEdit(!editMode);
    }

    sendDataToServer(item) {
      const { toggleLoading, toggleEdit, showErrorModal, history } = this.props;

      toggleLoading(true);
      axios
        .post(this.serverRoute, item)
        .then((res) => {
          history.push(`/${this.route}/${res.data._id}`);
          toggleLoading(false);
          toggleEdit(false);
          this.handleChange('_id', res.data._id);
        })
        .catch((err) => {
          const error = { err };
          showErrorModal(error.err.response.data.message);
        });
    }

    renderChips(options, selected) {
      const { classes } = this.props;

      const selectedOptions = options.filter(
        (option) => selected.indexOf(option._id) !== -1
      );

      return (
        <div className={classes.chips}>
          {selectedOptions.map((option) => (
            <Chip
              key={option._id}
              label={option.name}
              className={classes.chip}
            />
          ))}
        </div>
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          toggleEditMode={this.toggleEditMode}
          goBack={this.goBack}
          sendDataToServer={this.sendDataToServer}
          handleChange={this.handleChange}
          renderChips={this.renderChips}
          getBreadCrumbName={this.getBreadCrumbName}
        />
      );
    }
  }

  HOC.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    item: PropTypes.shape({
      name: PropTypes.string,
    }),
    classes: PropTypes.shape({
      chips: PropTypes.string,
      chip: PropTypes.string,
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

  const styledComponent = withStyles(styles)(HOC);

  const useActions = actions || new HOCFormActions({ prefix });

  return connect(null, {
    ...useActions,
    showErrorModal: showErrorModalAction,
  })(styledComponent);
};

export default HOCForm;
