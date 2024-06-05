import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';

const App = () => (
  <div>
    <h1>Defang x Meteor</h1>
  </div>
);

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
