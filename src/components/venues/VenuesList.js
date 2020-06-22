/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import HOCList from '../abstr/HOCList/HOCList';
import {
  differenceInDays,
  differenceInMonths,
  parseDate,
} from '../../helpers/dateHelpers';

const iconProps = { style: { color: 'rgba(0, 0, 0, 0.54)' } };

export class VenuesList extends Component {
  getDateDiffTooltipText(date) {
    const diff = differenceInDays(date);
    return diff === 1 ? `${diff} dzień temu` : `${diff} dni temu`;
  }

  render() {
    const { classes, items, deleteItemOnServer, history } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Box style={{ textAlign: 'right' }}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.addButton}
            startIcon={<AddIcon />}
            onClick={() => history.push('venues/0')}
          >
            Dodaj nową placówkę
          </Button>
        </Box>

        <MaterialTable
          columns={[
            { title: 'Nazwa', field: 'name' },
            { title: 'Miejscowość', field: 'city' },
            { title: 'Telefon', field: 'phone', sorting: false },
            {
              title: 'Ostatni kontakt',
              field: 'lastContact',
              searchable: false,
              render: (rowData) => (
                <Tooltip
                  title={this.getDateDiffTooltipText(rowData.lastContact)}
                >
                  <Typography
                    variant="inherit"
                    color={
                      differenceInMonths(rowData.lastContact) > 6
                        ? 'error'
                        : 'textPrimary'
                    }
                  >
                    {parseDate(rowData.lastContact) || '-'}
                  </Typography>
                </Tooltip>
              ),
            },
          ]}
          data={items}
          title="Placówki"
          localization={{
            toolbar: {
              searchPlaceholder: 'Szukaj...',
            },
            body: {
              emptyDataSourceMessage: 'Lista pusta!',
            },
            header: {
              actions: '',
            },
            pagination: {
              labelRowsSelect: 'wierszy',
              labelDisplayedRows: '{from}-{to} z {count}',
              firstAriaLabel: 'Pierwsza strona',
              firstTooltip: 'Pierwsza strona',
              previousAriaLabel: 'Poprzednia strona',
              previousTooltip: 'Poprzednia strona',
              nextAriaLabel: 'Następna strona',
              nextTooltip: 'Następna strona',
              lastAriaLabel: 'Ostatnia strona',
              lastTooltip: 'Ostatnia strona',
            },
          }}
          options={{
            searchFieldStyle: {
              minWidth: '100%',
            },
            pageSize: 10,
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edytuj placówkę',
              iconProps,
              onClick: (event, rowData) => {
                history.push(`venues/${rowData._id}`);
              },
            },
            {
              icon: 'delete',
              tooltip: 'Usuń placówkę',
              iconProps,
              onClick: (event, rowData) => deleteItemOnServer(rowData._id),
            },
          ]}
        />
      </main>
    );
  }
}

VenuesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  classes: PropTypes.shape({
    table: PropTypes.string,
    content: PropTypes.string,
    toolbar: PropTypes.string,
    td: PropTypes.string,
    tr: PropTypes.string,
    addButton: PropTypes.string,
  }),
  deleteItemOnServer: PropTypes.func,
};

const mapStateToProps = (state) => ({
  loading: state.venues.list.loading,
  items: state.venues.list.items,
});

export const prefix = 'VENUES_LIST_';

const wrappedList = HOCList(VenuesList, {
  prefix,
  serverRoute: 'venues',
});

export default connect(mapStateToProps, null)(wrappedList);
