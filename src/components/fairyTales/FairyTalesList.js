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
import {
  saveItemsFromServerAction,
  toggleLoadingAction,
} from './FairyTalesListActions';
import HOCList from '../abstr/HOCList/HOCList';

export class FairyTalesList extends Component {
  render() {
    const { classes, items } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nazwa</TableCell>
                <TableCell>Opis</TableCell>
                <TableCell align="right">
                  <Tooltip title="Dodaj nową bajkę">
                    <IconButton
                      edge="end"
                      aria-label="add"
                      component={Link}
                      to="/fairyTales/0"
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
                    Lista pusta! Dodaj nową bajkę!
                  </TableCell>
                </TableRow>
              )}
              {items.map((item) => (
                <TableRow key={item._id} hover>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell className={classes.td}>
                    {item.description ? item.description : 'Brak opisu :-('}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edytuj bajkę">
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        component={Link}
                        to={`/fairyTales/${item._id}`}
                      >
                        <DetailsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Usuń bajkę">
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

FairyTalesList.propTypes = {
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
  loading: state.fairyTales.list.loading,
  items: state.fairyTales.list.items,
});

export const prefix = 'FAIRYTALES_LIST_';

const wrappedList = HOCList(FairyTalesList, {
  prefix,
  serverRoute: 'fairyTales',
});

export default connect(mapStateToProps, null)(wrappedList);
