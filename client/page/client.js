import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router';
import fetch from 'dva/fetch';
import React from 'react';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

// 2. Plugin


// 3. Model
app.model(require('../models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
