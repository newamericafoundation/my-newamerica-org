// Do not bundle User model.

import React from 'react';
import {render} from 'react-dom';

import routes from './../../routes/client.jsx';

console.log('Hi, Mom!');

render(routes, global.document.getElementById('main'));
