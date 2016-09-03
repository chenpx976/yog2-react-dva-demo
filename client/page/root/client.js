import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router';
import fetch from 'dva/fetch';
import React from 'react';

// 1. Initialize
const app = dva();

// 2. Model
// Remove the comment and define your model.
app.model({
    namespace: 'count',
    state: {
        record: 0,
        current: 0,
    },
    reducers: {
        add(state) {
            const newCurrent = state.current + 1;
            return Object.assign({}, state, {
                record: newCurrent > state.record ? newCurrent : state.record,
                current: newCurrent,
            });
        },
        minus(state) {
            return Object.assign({}, state, {
                current: state.current - 1,
            });
        },
    }
});

// 3. Router
const CountApp = ({ count, dispatch }) => {
    return (
        <div className="normal">
            <div className="record">
                最高分: {count.record}
            </div>
            <div className="current">
                {count.current}
            </div>
            <div className="button">
                <button onClick={() => { dispatch({ type: 'count/add' }) } } >+</button>
                <button onClick={() => { dispatch({ type: 'count/minus' }) } } >-</button>
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return { count: state.count };
}

const HomePage = connect(mapStateToProps)(CountApp);

app.router(({ history }) =>
    <Router history={history}>
        <Route path="/" component={HomePage} />
    </Router>
);

// 4. Start
app.start('#root');
