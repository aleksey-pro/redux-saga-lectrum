/**
 * В саге-генераторе можно вызывать нужные методы в явном виде, без использования эффектов.
 * Можно также комбинировать эффекты с явными операциями без эффектов.
 *
 * Однако для описаний практически любой инструкции в
 * Redux Saga существует специальный эффект.
 * Примеры эффектов в этом файле — take и put.
 * put — самый простой эффект, он работает как store.dispatch.
 */

// Core
import { take, put } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';
import { swapiActions } from '../../bus/swapi/actions';
import { api } from '../../Api';

export function* runExample() {
    // try-catch - куда с циклом while??
    while (true) {
        const action = yield take(types.FETCH_PLANETS_ASYNC); // сработает сразу при получении экшена FETCH_PLANETS_ASYNC
        // блокирующий => генератор будет висеть пока не отработает экшен
        // запускается при нажатии на кнопку которая запускает dispatch fetchPeopleAsync и мы ее тут отловили
        // и это запускает работу всего runExample

        yield put(swapiActions.setIsFetching(true)); // выполняяет action redux внутри сага-воркера === dispatch
        const response = yield api.fetchPlanets(action.payload);
        const data = yield response.json();

        yield put(swapiActions.fillPlanets(data.results));
        yield put(swapiActions.setIsFetching(false));
    }
}
