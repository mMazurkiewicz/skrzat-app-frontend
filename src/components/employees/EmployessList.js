import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import HOCList from '../abstr/HOCList/HOCList';

export class EmployeesList extends Component {
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
};

const mapStateToProps = (state) => ({
  loading: state.employees.list.loading,
  items: state.employees.list.items,
});

export const prefix = 'EMPLOYEES';

const wrappedList = HOCList(EmployeesList, {
  prefix,
  serverRoute: 'employees',
});

export default connect(mapStateToProps, null)(wrappedList);
