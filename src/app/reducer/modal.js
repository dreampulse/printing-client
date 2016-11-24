import {handleActions} from 'redux-actions';

import TYPE from '../type';

export default function create() {
  const initialState = {
    isOpen: false,
    title: null,
    contentFactory: null,
    contentProps: {},
    contentModifiers: []
  };

  function handleClose() {
    return initialState;
  }

  function handleOpen(state, action) {
    return {
      isOpen: true,
      title: action.payload.title,
      contentFactory: action.payload.contentFactory,
      contentProps: action.payload.contentProps || {},
      contentModifiers: action.payload.contentModifiers || []
    };
  }

  return handleActions({
    [TYPE.MODAL.OPEN]: handleOpen,
    [TYPE.MODAL.CLOSE]: handleClose
  }, initialState);
}
