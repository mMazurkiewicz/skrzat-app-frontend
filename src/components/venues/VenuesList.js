/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import RoomIcon from '@material-ui/icons/Room';
import LanguageIcon from '@material-ui/icons/Language';
import CallIcon from '@material-ui/icons/Call';
import Pagination from '@material-ui/lab/Pagination';
import { prefix } from './venuesListReducer';
import EventsEditActions from '../events/edit/EventsFormActions';
import {
  differenceInDays,
  differenceInMonths,
  parseDate,
} from '../../helpers/dateHelpers';
import HOCList from '../abstr/HOCList/HOCList';
import Breadcrumbs from '../abstr/breadcrumbs/Breadcrumbs';

export class VenuesList extends Component {
  constructor(props) {
    super(props);
    this.handleCreateNewEventForVenue = this.handleCreateNewEventForVenue.bind(
      this
    );
  }

  getDateDiffTooltipText(date) {
    const diff = differenceInDays(date);
    if (!date) {
      return 'brak danych';
    }
    return diff === 1 ? `${diff} dzień temu` : `${diff} dni temu`;
  }

  handleCreateNewEventForVenue(e, item, i) {
    const { setVenueForNewEvent, history, closeItemMenu } = this.props;

    const venue = {
      _id: item._id,
      name: item.name,
      city: item.city,
    };

    e.stopPropagation();

    closeItemMenu(e, i);

    history.push('events/0');

    setVenueForNewEvent('venue', venue);
  }

  render() {
    const {
      classes,
      items,
      anchorEl,
      handleDeleteItem,
      openItemMenu,
      closeItemMenu,
      goToEdit,
      setPage,
      page,
      totalPages,
    } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Breadcrumbs routes={[{ name: 'Placówki' }]} />

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Pagination
              count={totalPages}
              classes={{
                ul: classes.alignPagination,
              }}
              page={page}
              onChange={(e, p) => setPage(p)}
            />
          </Grid>

          <Grid item xs={12} align="right">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={(e) => goToEdit(e, 0)}
            >
              Dodaj nową placówkę
            </Button>
          </Grid>
          {!items.length && (
            <Grid item xs={12} align="center">
              <Typography variant="overline">
                Lista pusta! Dodaj nową placówkę!
              </Typography>
            </Grid>
          )}
          {items.map((item, i) => (
            <Grid item key={item._id} xs={12}>
              <Paper
                elevation={3}
                onClick={(e) => goToEdit(e, item._id)}
                className={classes.paper}
              >
                <Grid container spacing={1} key={item._id}>
                  <Grid item xs={11} align="justify">
                    <Typography variant="subtitle1" color="textSecondary">
                      {item.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={1} align="right">
                    <IconButton
                      className={classes.showOnHover}
                      size="small"
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => openItemMenu(e, i)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl[i]}
                      keepMounted
                      open={Boolean(anchorEl[i])}
                      onClose={(e) => closeItemMenu(e, i)}
                      TransitionComponent={Fade}
                      elevation={1}
                    >
                      <MenuItem
                        onClick={(e) =>
                          this.handleCreateNewEventForVenue(e, item, i)
                        }
                      >
                        Dodaj wydarzenie dla placówki
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => handleDeleteItem(e, item._id, i)}
                      >
                        Usuń placówkę
                      </MenuItem>
                    </Menu>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.verticalCenterInGrid}
                  >
                    <Tooltip
                      title={this.getDateDiffTooltipText(item.lastContact)}
                      position="bottom-start"
                    >
                      <Typography
                        variant="subtitle2"
                        component="span"
                        display="inline"
                        color={
                          differenceInMonths(item.lastContact) > 6
                            ? 'error'
                            : 'textSecondary'
                        }
                      >
                        {parseDate(item.lastContact) || '---'}
                      </Typography>
                    </Tooltip>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Tooltip title="Pokaż na mapie" position="bottom-start">
                      <IconButton
                        aria-label="show-on-map"
                        component="span"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(this.getMapQuery(item), '_blank');
                        }}
                      >
                        <RoomIcon />
                      </IconButton>
                    </Tooltip>

                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      display="inline"
                    >
                      {`${item.street} ${item.streetNo}, ${item.city}`}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Tooltip title="Zadzwoń">
                      <IconButton
                        disabled={!item.phone}
                        aria-label="show-website"
                        component="a"
                        href={`tel:${item.phone}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <CallIcon />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      display="inline"
                    >
                      {item.phone || '---'}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Tooltip title="Odwiedź stronę">
                      <IconButton
                        disabled={!item.website}
                        aria-label="show-website"
                        component="span"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`http://${item.website}`, '_blank');
                        }}
                      >
                        <LanguageIcon />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      display="inline"
                    >
                      {item.website || '---'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
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
    content: PropTypes.string,
    toolbar: PropTypes.string,
    showOnHover: PropTypes.string,
    paper: PropTypes.string,
    addButton: PropTypes.string,
    verticalCenterInGrid: PropTypes.string,
    alignPagination: PropTypes.string,
  }),
  setVenueForNewEvent: PropTypes.func,
  anchorEl: PropTypes.arrayOf(PropTypes.object),
  handleDeleteItem: PropTypes.func,
  openItemMenu: PropTypes.func,
  closeItemMenu: PropTypes.func,
  goToEdit: PropTypes.func,
  setPage: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
};

const mapStateToProps = (state) => ({
  loading: state.venues.list.loading,
  items: state.venues.list.items,
  anchorEl: state.venues.list.anchorEl,
  page: state.venues.list.page,
  itemsPerPage: state.venues.list.itemsPerPage,
  totalItems: state.venues.list.totalItems,
  totalPages: state.venues.list.totalPages,
});

const mapActionsToProps = {
  setVenueForNewEvent: EventsEditActions.handleChangeInput,
};

const wrappedList = HOCList(VenuesList, {
  prefix,
  route: 'venues',
  serverRoute: 'venues',
});

export default connect(mapStateToProps, mapActionsToProps)(wrappedList);
