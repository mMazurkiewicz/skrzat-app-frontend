import React from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import HOCForm from '../abstr/HOCForm/HOCForm';
import setAuthToken from '../../helpers/setAuthToken';
import { saveUserData } from '../../auth/AuthActions';

const styles = {
  content: {
    margin: '0 auto',
    width: '100%',
    height: '100%',
    padding: 0,
  },
};

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.serverRoute = `${window.App.serverPath}employees/login`;
    this.sendDataToServer = this.sendDataToServer.bind(this);
  }

  sendDataToServer(item, e) {
    const {
      toggleLoading,
      showErrorModal,
      resetState,
      history,
      setLoggedUser,
    } = this.props;

    e.preventDefault();

    toggleLoading(true);
    axios
      .post(this.serverRoute, item)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('skrzatAppJWTToken', token);

        setAuthToken(token);
        setLoggedUser(res.data);

        toggleLoading(false);
        resetState();
        history.push(`/`);
      })
      .catch((err) => {
        const error = { err };
        console.log(error.err.response);
        showErrorModal(error.err.response.data.message);
      });
  }

  render() {
    const { classes, loading, handleChange, item } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h3" gutterBottom align="center">
          Logowanie
        </Typography>
        {loading && (
          <div className={classes.loader}>
            <CircularProgress align="center" />
          </div>
        )}
        {!loading && (
          <Grid
            container
            justify="center"
            style={{
              padding: '50px',
              minHeight: '50vh',
            }}
          >
            <Grid item xs={12} sm={8} md={4} lg={2} xl={2}>
              <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
                style={{
                  height: '100%',
                }}
              >
                <form
                  className="center"
                  onSubmit={(e) => this.sendDataToServer(item, e)}
                >
                  <TextField
                    fullWidth
                    autoComplete="username"
                    id="email"
                    label="Login"
                    value={item.email}
                    onChange={(e) => handleChange('email', e)}
                  />
                  <TextField
                    style={{
                      marginTop: '30px',
                    }}
                    fullWidth
                    id="password"
                    autoComplete="current-password"
                    label="Hasło"
                    value={item.password}
                    type="password"
                    onChange={(e) => handleChange('password', e)}
                  />
                  <Button
                    style={{
                      marginTop: '50px',
                    }}
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Zaloguj
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Grid>
        )}
      </main>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.shape({
    content: PropTypes.string,
    loader: PropTypes.string,
    toolbar: PropTypes.string,
  }),
  loading: PropTypes.bool,
  handleChange: PropTypes.func,
  item: PropTypes.object,
  toggleLoading: PropTypes.func.isRequired,
  showErrorModal: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  setLoggedUser: PropTypes.func.isRequired,
};

export const prefix = 'LOGIN_FORM_';

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  item: state.login.item,
});

const wrappedForm = HOCForm(LoginForm, {
  prefix,
  route: 'login',
});

const styledComponent = withStyles(styles)(wrappedForm);

export default connect(mapStateToProps, {
  setLoggedUser: saveUserData,
})(styledComponent);
