import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import HOCFormActions from './HOCFormActions';
import { showErrorModalAction } from '../errorModal/ErrorModalActions';

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

const HOCForm = (WrappedComponent, { prefix, route }) => {
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
      history.push(`/${this.route}`);
      resetState();
    }

    handleChange(field, e, withValue) {
      const { handleChangeInput } = this.props;
      const value = withValue ? e : e.target.value;
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
          toggleLoading(false);
          toggleEdit(false);
          history.push(`/${this.route}/${res.data._id}`);
        })
        .catch((err) => {
          const error = { err };
          showErrorModal(error.err.response.data.message);
        });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          toggleEditMode={this.toggleEditMode}
          goBack={this.goBack}
          sendDataToServer={this.sendDataToServer}
          handleChange={this.handleChange}
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

  const actions = new HOCFormActions({ prefix });

  return connect(null, {
    ...actions,
    showErrorModal: showErrorModalAction,
  })(styledComponent);
};

export default HOCForm;
