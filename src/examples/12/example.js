/**
 * redux-saga также предоставляет возможность имплементировать очередь выполнения эффектов.
 */

// Core
import { take, call, actionChannel } from 'redux-saga/effects';

// Instruments
import { types } from '../../bus/swapi/types';

// Workers
import { fetchEntity } from './fetchEntity';

export function* runExample() {
    const buffer = yield actionChannel(types.FETCH_ALL); // копит запущенные экшены с данным типом

    while (true) {  // будет последовательно выполнять экшены внутри while
        const action = yield take(buffer); // последовательно забирает экшены из очереди buffer

        yield call(fetchEntity, action, 'Planets');
        yield call(fetchEntity, action, 'Vehicles');
        yield call(fetchEntity, action, 'People');

        // если call заменить на fork -  очередь будет быстрее, но НЕТ ГАРАНТИИ строгой последовательности вызовов
        // так как fork - параллельная
    }
}
