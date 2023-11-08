import 'source-map-support/register';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';
import { updateTodo } from '../../helpers/todos';
import { createLogger } from '../../utils/logger';
const logger = createLogger('UpdateTodo');
export const handler = middy(async (event) => {
    const todoId = event.pathParameters.todoId;
    const updatedTodo = JSON.parse(event.body);
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    logger.info('doing updateTodo event...');
    try {
        await updateTodo(event, todoId, updatedTodo);
        return {
            statusCode: 204,
            headers,
            body: undefined
        };
    }
    catch (error) {
        logger.info('error at updateTodo event...');
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error })
        };
    }
});
handler
    .use(httpErrorHandler())
    .use(cors({
    credentials: true
}));
//# sourceMappingURL=updateTodo.js.map