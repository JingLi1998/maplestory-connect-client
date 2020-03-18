import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  FAME_SMEGA,
  DEFAME_SMEGA,
  MARK_NOTIFICATIONS_READ
} from '../types';

const initialState = {
  authenticated: false,
  credentials: {},
  fame: [],
  notifications: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case FAME_SMEGA:
      return {
        ...state,
        fame: [
          ...state.fame,
          {
            userHandle: state.credentials.handle,
            smegaId: action.payload.smegaId
          }
        ]
      };
    case DEFAME_SMEGA:
      return {
        ...state,
        fame: state.fame.filter(fame => fame.smegaId !== action.payload.smegaId)
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(not => (not.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
}
