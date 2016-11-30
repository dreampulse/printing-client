import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../action';

import Upload from '../component/upload';

console.log("-- actions", actions);
const App = ({hello, bar, counter, onUpload, onUploaded}) => (
  <div>
    <h1>Hello World! {hello}</h1>
    <button onClick={bar}>Click me</button>
    {counter}
    <Upload onUpload={onUpload} onUploaded={onUploaded} />
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  hello: state.app.hello,
  counter: state.app.foo,
});
const mapDispatchToProps = {
  bar: actions.foo.bar,
  onUpload: actions.model.upload,
  onUploaded: actions.model.modelUploaded
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
