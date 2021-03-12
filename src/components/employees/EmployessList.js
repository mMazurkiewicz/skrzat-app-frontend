import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DetailsIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import HOCList from '../abstr/HOCList/HOCList';

export class EmployeesList extends Component {
  render() {
    const { classes, items, deleteItemOnServer } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h3" gutterBottom align="center">
          Pracownicy
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Imię i nazwisko</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell>Ekipy</TableCell>
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
                  <TableCell component="th" colSpan={5} align="center">
                    Lista pusta! Dodaj nowego pracownika!
                  </TableCell>
                </TableRow>
              )}
              {items.map((item) => (
                <TableRow key={item._id} hover className={classes.tr}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell className={classes.td}>
                    {item.email ? item.email : 'Brak maila :-('}
                  </TableCell>
                  <TableCell className={classes.td}>
                    {item.phoneNumber}
                  </TableCell>
                  <TableCell className={classes.td}>
                    {item.teams
                      ? item.teams.map((team) => (
                          <Tooltip key={team._id} title="Edytuj ekipę">
                            <Chip
                              key={team._id}
                              size="small"
                              className={classes.chips}
                              label={team.name}
                              component="a"
                              href={`teams/${team._id}`}
                              clickable
                              style={{
                                color: team.color,
                                borderColor: team.color,
                              }}
                              variant="outlined"
                            />
                          </Tooltip>
                        ))
                      : '-'}
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
                        onClick={() => deleteItemOnServer(item._id)}
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
    tr: PropTypes.string,
    chips: PropTypes.string,
  }),
  deleteItemOnServer: PropTypes.func,
};

const mapStateToProps = (state) => ({
  loading: state.employees.list.loading,
  items: state.employees.list.items,
});

export const prefix = 'EMPLOYEES_LIST';

const wrappedList = HOCList(EmployeesList, {
  prefix,
  serverRoute: 'employees',
});

export default connect(mapStateToProps, null)(wrappedList);
