import {
  SET_SMEGAS,
  FAME_SMEGA,
  DEFAME_SMEGA,
  LOADING_DATA,
  DELETE_SMEGA,
  POST_SMEGA,
  SET_SMEGA,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  smegas: [],
  smega: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SMEGAS:
      return {
        ...state,
        smegas: action.payload,
        loading: false
      };
    case SET_SMEGA:
      return {
        ...state,
        smega: action.payload
      };
    case FAME_SMEGA:
    case DEFAME_SMEGA:
      let index = state.smegas.findIndex(
        smega => smega.smegaId === action.payload.smegaId
      );
      state.smegas[index] = action.payload;
      if (state.smega.smegaId === action.payload.smegaId) {
        state.smega = action.payload;
      }
      return {
        ...state
      };
    case DELETE_SMEGA:
      let deleteIndex = state.smegas.findIndex(
        smega => smega.smegaId === action.payload
      );
      state.smegas.splice(deleteIndex, 1);
      return {
        ...state
      };
    case POST_SMEGA:
      return {
        ...state,
        smegas: [action.payload, ...state.smegas]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        smega: {
          ...state.smega,
          comments: [action.payload, ...state.smega.comments]
        }
      };
    default:
      return state;
  }
}
