import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import HOCListActions from './HOCListActions';

const drawerWidth = 240;

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  td: {
    maxWidth: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  tr: {
    transition: '0.2s',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  chips: {
    margin: '0 3px 0 0',
  },
});

const HOCList = (WrappedComponent, { prefix, serverRoute }) => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.serverRoute = `${window.App.serverPath}${serverRoute}`;
      this.loadData = this.loadData.bind(this);
      this.deleteItemOnServer = this.deleteItemOnServer.bind(this);
    }

    componentDidMount() {
      this.loadData();
    }

    loadData() {
      const { toggleLoading, saveItemsFromServer } = this.props;
      toggleLoading(true);
      axios.get(this.serverRoute).then((res) => {
        saveItemsFromServer(res.data);
        toggleLoading(false);
      });
    }

    deleteItemOnServer(itemId) {
      axios.delete(`${this.serverRoute}/${itemId}`).then(() => this.loadData());
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          deleteItemOnServer={this.deleteItemOnServer}
        />
      );
    }
  }

  HOC.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    classes: PropTypes.shape({
      content: PropTypes.string,
      toolbar: PropTypes.string,
      td: PropTypes.string,
    }),
    toggleLoading: PropTypes.func,
    saveItemsFromServer: PropTypes.func,
  };

  const styledComponent = withStyles(styles)(HOC);

  const actions = new HOCListActions({ prefix });

  return connect(null, actions)(styledComponent);
};

export default HOCList;
