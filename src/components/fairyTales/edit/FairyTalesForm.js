import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import HOCForm from '../../abstr/HOCForm/HOCForm';
import Breadcrumbs from '../../abstr/breadcrumbs/Breadcrumbs';

export class FairyTalesForm extends Component {
  render() {
    const {
      classes,
      item,
      editMode,
      loading,
      toggleEditMode,
      goBack,
      handleChange,
      sendDataToServer,
      getBreadCrumbName,
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Breadcrumbs
          routes={[
            { name: 'Bajki', href: '/fairyTales' },
            {
              name: getBreadCrumbName('Nowa bajka'),
            },
          ]}
        />
        {loading && (
          <div className={classes.loader}>
            <CircularProgress align="center" />
          </div>
        )}
        {!loading && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="name"
                  label="Nazwa"
                  value={item.name}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('name', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <TextField
                  required
                  id="description"
                  label="Opis"
                  value={item.description}
                  variant="outlined"
                  multiline
                  onChange={(e) => handleChange('description', e)}
                  disabled={!editMode}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} align="center">
              <div className={classes.root}>
                {!editMode || !item._id ? (
                  <Button
                    variant="outlined"
                    onClick={goBack}
                    size="large"
                    startIcon={<UndoIcon />}
                  >
                    Wróć
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={toggleEditMode}
                    size="large"
                    startIcon={<CancelIcon />}
                  >
                    Anuluj
                  </Button>
                )}
                {editMode ? (
                  <Button
                    onClick={() => sendDataToServer(item)}
                    size="large"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Zapisz
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={toggleEditMode}
                    size="large"
                    color="primary"
                    startIcon={<EditIcon />}
                  >
                    Edytuj
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        )}
      </main>
    );
  }
}

FairyTalesForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  classes: PropTypes.shape({
    toolbar: PropTypes.string,
    loader: PropTypes.string,
    root: PropTypes.string,
    content: PropTypes.string,
  }),
  editMode: PropTypes.bool,
  loading: PropTypes.bool,
  toggleEditMode: PropTypes.func,
  goBack: PropTypes.func,
  sendDataToServer: PropTypes.func,
  handleChange: PropTypes.func,
  getBreadCrumbName: PropTypes.func.isRequired,
};

export const prefix = 'FAIRYTALES_FORM_';

const mapStateToProps = (state) => ({
  loading: state.fairyTales.form.loading,
  item: state.fairyTales.form.item,
  editMode: state.fairyTales.form.editMode,
});

const wrappedForm = HOCForm(FairyTalesForm, {
  prefix,
  route: 'fairyTales',
});

export default connect(mapStateToProps, null)(wrappedForm);
