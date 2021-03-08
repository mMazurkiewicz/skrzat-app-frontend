import setAuthToken from '../../helpers/setAuthToken';
import { resetState as resetUserState } from '../../auth/AuthActions';

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem('skrzatAppJWTToken');
  setAuthToken(null);
  dispatch(resetUserState());
  history.push('/login');
};

export default {
  logoutUser,
};
