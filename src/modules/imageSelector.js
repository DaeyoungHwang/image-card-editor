import {createAction, handleActions} from 'redux-actions';

const initialState = {
  urls: [],
  imageDatas: [],
  currentImageData: '',
}


const imageSelector = handleActions({
  ['CHANGE_CONTENT_TEXT_RECT']: (state, {payload: textRect}) => ({...state}),

}, initialState);

export default imageSelector;
