import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DetailsIcon from '@material-ui/icons/Assignment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import {
  saveItemsFromServerAction,
  toggleLoadingAction,
} from './EmployeesListActions';

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
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

export class EmployeesList extends Component {
  constructor(props) {
    super(props);
    this.route = `${window.App.serverPath}employees`;
    this.loadData = this.loadData.bind(this);
    this.deleteItemOnServer = this.deleteItemOnServer.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { toggleLoading, saveItemsFromServer } = this.props;

    toggleLoading(true);
    axios.get(this.route).then((res) => {
      saveItemsFromServer(res.data);
      toggleLoading(false);
    });
  }

  deleteItemOnServer(itemId) {
    axios.delete(`${this.route}/${itemId}`).then(() => this.loadData());
  }

  render() {
    const { classes, items } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Imię i nazwisko</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell align="right">
                  <Tooltip title="Dodaj nowego pracownika">
                    <IconButton
                      edge="end"
                      aria-label="add"
                      component={Link}
                      to="/employees/0"
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 && (
                <TableRow>
                  <TableCell component="th" colSpan={4} align="center">
                    Lista pusta! Dodaj nowego pracownika!
                  </TableCell>
                </TableRow>
              )}
              {items.map((item) => (
                <TableRow key={item._id} hover>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell className={classes.td}>
                    {item.mail ? item.mail : 'Brak maila :-('}
                  </TableCell>
                  <TableCell className={classes.td}>
                    {item.phoneNumber}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edytuj dane pracownika">
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        component={Link}
                        to={`/employees/${item._id}`}
                      >
                        <DetailsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Usuń pracownika">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => this.deleteItemOnServer(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    );
  }
}

EmployeesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  classes: PropTypes.shape({
    table: PropTypes.string,
    content: PropTypes.string,
    toolbar: PropTypes.string,
    td: PropTypes.string,
  }),
  toggleLoading: PropTypes.func,
  saveItemsFromServer: PropTypes.func,
};

const mapStateToProps = (state) => ({
  loading: state.employees.list.loading,
  items: state.employees.list.items,
});

const mapActionsToProps = {
  saveItemsFromServer: saveItemsFromServerAction,
  toggleLoading: toggleLoadingAction,
};

const styledComponent = withStyles(styles)(EmployeesList);

export default connect(mapStateToProps, mapActionsToProps)(styledComponent);
