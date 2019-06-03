import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICompany, defaultValue } from 'app/shared/model/company.model';

export const ACTION_TYPES = {
  FETCH_COMPANY_LIST: 'company/FETCH_COMPANY_LIST',
  FETCH_COMPANY: 'company/FETCH_COMPANY',
  CREATE_COMPANY: 'company/CREATE_COMPANY',
  UPDATE_COMPANY: 'company/UPDATE_COMPANY',
  DELETE_COMPANY: 'company/DELETE_COMPANY',
  WORKING_COMPANY: 'company/WORKING_COMPANY',
  GET: 'company/GET',
  RESET: 'company/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICompany>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  workingCompany: defaultValue
};

export type CompanyState = Readonly<typeof initialState>;

// Reducer

export default (state: CompanyState = initialState, action): CompanyState => {
  switch (action.type) {
    case ACTION_TYPES.WORKING_COMPANY:
      return {
        ...state,
        workingCompany: state.entities.filter(el => el.id === action.payload)[0]
      };
    case REQUEST(ACTION_TYPES.FETCH_COMPANY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPANY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPANY):
    case REQUEST(ACTION_TYPES.UPDATE_COMPANY):
    case REQUEST(ACTION_TYPES.DELETE_COMPANY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPANY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPANY):
    case FAILURE(ACTION_TYPES.CREATE_COMPANY):
    case FAILURE(ACTION_TYPES.UPDATE_COMPANY):
    case FAILURE(ACTION_TYPES.DELETE_COMPANY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPANY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
        // workingCompany: action.payload.data.filter(el => el.id === state.workingCompany && state.workingCompany.id)[0]
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPANY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPANY):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPANY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPANY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
        workingCompany: state.workingCompany,
        entities: state.entities
      };
    default:
      return state;
  }
};

const apiUrl = 'api/companies';

// Actions

export const getEntities: ICrudGetAllAction<ICompany> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPANY_LIST,
  payload: axios.get<ICompany>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const setWorkingCompany = companyId => ({
  type: ACTION_TYPES.WORKING_COMPANY,
  payload: companyId
});

export const getState = () => ({
  type: ACTION_TYPES.GET
});

export const getEntity: ICrudGetAction<ICompany> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPANY,
    payload: axios.get<ICompany>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICompany> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPANY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICompany> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPANY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICompany> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPANY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
