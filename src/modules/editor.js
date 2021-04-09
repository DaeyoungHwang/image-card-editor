import {createAction, handleActions} from 'redux-actions';

const initialState = {
  contentTextBox: {
    contentText: '',
    textSize: 32,
    textBoxFocused: false,
    isTextEditMode: false,
    startCursorPos: 0,
    endCursorPos: 0,
    font: 'Georgia',
    color: 'white',
    bold: false,

    textRect: {
      x: 10,
      y: 10,
      w: 300,
      h: 100,
    }
  },

  image: {
    data: '',
    sizeTemplate: 'tall'
  },

  filter: {
    lightContrast: false,
    heavyContrast: false,
    blur: false,
  },
}

const editor = handleActions({

}, initialState);

export default editor;
