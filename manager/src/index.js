import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';
import '@babel/polyfill';




// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user').default);
app.model(require('./models/question').default);
app.model(require('./models/client').default);
app.model(require('./models/grade').default);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
