// import {createAction} from 'redux-actions';
//
// import TYPE from '../../../src/app/type';

export default ({api}) => {

  const upload = (form, onProgressChange) => dispatch => {
    return api.printingEngine.upload(form, onProgressChange);
  }

  const modelUploaded = (model) => dispatch => {
    console.log("-- modelUploaded()", model);
    // todo
  }

  return {
    upload,
    modelUploaded
  };
}
