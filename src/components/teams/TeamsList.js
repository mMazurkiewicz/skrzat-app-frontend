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
import Typography from '@material-ui/core/Typography';

import HOCList from '../abstr/HOCList/HOCList';

export class TeamsList extends Component {
  render() {
    const { classes, items, deleteItemOnServer } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h3" gutterBottom align="center">
          Ekipy
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nazwa</TableCell>
                <TableCell>Członkowie</TableCell>
                <TableCell align="right">
                  <Tooltip title="Dodaj nową ekipę">
                    <IconButton
                      edge="end"
                      aria-label="add"
                      component={Link}
                      to="/teams/0"
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
                  <TableCell component="th" colSpan={3} align="center">
                    Lista pusta! Dodaj nową ekipę!
                  </TableCell>
                </TableRow>
              )}
              {items.map((item) => (
                <TableRow key={item._id} hover className={classes.tr}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ color: item.color }}
                  >
                    {item.name}
                  </TableCell>

                  <TableCell className={classes.td}>
                    {item.members.map((member) => member.name).join(', ')}
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edytuj ekipę">
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        component={Link}
                        to={`/teams/${item._id}`}
                      >
                        <DetailsIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Usuń ekipę">
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

TeamsList.propTypes = {
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
  }),
  deleteItemOnServer: PropTypes.func,
};

const mapStateToProps = (state) => ({
  loading: state.teams.list.loading,
  items: state.teams.list.items,
});

export const prefix = 'TEAMS_LIST_';

const wrappedList = HOCList(TeamsList, {
  prefix,
  serverRoute: 'teams',
});

export default connect(mapStateToProps, null)(wrappedList);
