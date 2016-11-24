import React, {Component} from 'react';
import {connect} from 'react-redux';

import actions from '../action';

const App = ({hello, bar, counter}) => (
  <div>
    <h1>Hello World! {hello}</h1>
    <button onClick={bar}>Click me</button>
    {counter}
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  hello: state.app.hello,
  counter: state.app.foo,
});
const mapDispatchToProps = {
  bar: actions.foo.bar
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
