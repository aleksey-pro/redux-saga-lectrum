// Core
import { all } from 'redux-saga/effects';

// Instruments
// import { runExample } from '../examples/1'; // worker saga
// import { runExample } from '../examples/2'; // call/apply
// import { runExample } from '../examples/3'; // yield*
// import { runExample } from '../examples/4'; // call + делегирование другой саге
// import { runExample } from '../examples/5'; // fork (parallel)
// import { runExample } from '../examples/6'; // cancel
// import { runExample } from '../examples/7'; // ALL (one of)
// import { runExample } from '../examples/8'; // spawn (vs fork) (unblock parallel)
import { runExample } from '../examples/9'; // takeEvery (vs fork) (unblock) = (take + fork) ближе к redux-thunk
// import { runExample } from '../examples/10'; // takeLatest = take + cancel + fork
// import { runExample } from '../examples/11'; // мплементация эффекта takeLatest
// import { runExample } from '../examples/12'; // actionChannel

export function* rootSaga() {
    try {
        yield all([ runExample() ]);
    } catch (error) {
        console.log('→ error caught', error);
    }
}
