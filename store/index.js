import {combineReducers} from 'redux';
import {changeElementState, recalcElements,changeSizeField} from './field.js';

const CHANGE_TIMER = "CHANGE_TIMER";

const UPDATE_ELEMENT = "UPDATE_ELEMENT";

const RECALC_ELEMENTS = "RECALC_ELEMENTS";

const CHANGE_SIZE_FIELD = "CHANGE_SIZE_FIELD";

export const actions = {
  activeTimer: (active) => ({type: CHANGE_TIMER,isActive: active}),
  updateElement: (x,y) => ({type: UPDATE_ELEMENT, elementX: x, elementY: y}),
  recalcElements: () => ({type: RECALC_ELEMENTS}),
  changeSizeField: (number) => ({type: CHANGE_SIZE_FIELD, size: number})
};

const activeTimer = (state = false,action) => {
  switch(action.type) {
    case CHANGE_TIMER: return action.isActive;
    default: return state;
  }
}

const elements = (state = [],action) => {
  switch(action.type) {
    case UPDATE_ELEMENT: return changeElementState(state,action.elementX,action.elementY);
    case RECALC_ELEMENTS: return recalcElements(state);
    case CHANGE_SIZE_FIELD: return changeSizeField(state,action.size);
    default: return state;
  }
}

export const reducersCombine = combineReducers({
  activeTimer,
  elements
});
