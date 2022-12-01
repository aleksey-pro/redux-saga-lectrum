/**
 * Эффект takeLatest не блокирует поток, и похож на take + fork.
 * ИСПОЛЬЗУЕМ ЧТОБЫ ВЗЯТЬ ПОСЛЕДНЕЕ ЗНАЧЕНИЕ РЯДА ОПЕРАЦИЙ
 *
 * Однако при попытке начать новый task до завершения предыдущего — предыдущий
 * task будет отменён с помощью эффекта cancel.
 * То есть до конца единовременно выполнится лишь тот task, который запустился последним.
 * ПРИ БЫСТРОМ КЛИКЕ НА КНОПКУ ВЫЗОВА FETCH_PLANETS_ASYNC
 */

// Core
import { takeLatest, put, call, apply, delay } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../Api';

function* fetchPlanets(action) {
    yield delay(1000);

    const response = yield call(api.fetchPlanets, action.payload);
    const data = yield apply(response, response.json);

    yield put(swapiActions.fillPlanets(data.results));
}

export function* runExample() {
    yield takeLatest(types.FETCH_PLANETS_ASYNC, fetchPlanets); // = take + fork + CANCEL
}
