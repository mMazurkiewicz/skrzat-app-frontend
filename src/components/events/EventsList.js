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
import Chip from '@material-ui/core/Chip';
import { parseDateTime } from '../../helpers/dateHelpers';
import HOCList from '../abstr/HOCList/HOCList';

export class EventsList extends Component {
  render() {
    const { classes, items, deleteItemOnServer } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h3" gutterBottom align="center">
          Przedstawienia
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Placówka</TableCell>
                <TableCell>Miasto</TableCell>
                <TableCell>Ekipa</TableCell>
                <TableCell>Bajka</TableCell>
                <TableCell align="right">
                  <Tooltip title="Dodaj nowe przedstawienie">
                    <IconButton
                      edge="end"
                      aria-label="add"
                      component={Link}
                      to="/events/0"
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
                    Lista pusta! Dodaj nowe przedstawienie!
                  </TableCell>
                </TableRow>
              )}
              {items.map((item) => (
                <TableRow key={item._id} hover className={classes.tr}>
                  <TableCell component="th" scope="row">
                    {parseDateTime(item.dateTime)}
                  </TableCell>

                  <Tooltip title={item.venue.name}>
                    <TableCell className={classes.td}>
                      {item.venue.name}
                    </TableCell>
                  </Tooltip>

                  <TableCell className={classes.td}>
                    {item.venue.city}
                  </TableCell>

                  {/* <TableCell className={classes.td}>{item.team.name}</TableCell> */}
                  <TableCell className={classes.td}>
                    <Tooltip key={item.team._id} title="Edytuj ekipę">
                      <Chip
                        key={item.team._id}
                        size="small"
                        className={classes.chips}
                        label={item.team.name}
                        component="a"
                        href={`teams/${item.team._id}`}
                        clickable
                        style={{
                          color: item.team.color,
                          borderColor: item.team.color,
                        }}
                        variant="outlined"
                      />
                    </Tooltip>
                  </TableCell>

                  <TableCell className={classes.td}>
                    {item.fairyTale.name}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edytuj przedstawienie">
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        component={Link}
                        to={`/events/${item._id}`}
                      >
                        <DetailsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Usuń przedstawienie">
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

EventsList.propTypes = {
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
  loading: state.events.list.loading,
  items: state.events.list.items,
});

export const prefix = 'EVENTS_LIST_';

const wrappedList = HOCList(EventsList, {
  prefix,
  serverRoute: 'events',
});

export default connect(mapStateToProps, null)(wrappedList);
