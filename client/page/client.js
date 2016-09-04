import dva from 'dva';

// 1. Initialize
const app = dva();

// 2. Plugin


// 3. Model
app.model(require('../models/users'));
app.model(require('../models/products'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');