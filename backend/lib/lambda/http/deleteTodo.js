import 'source-map-support/register';
const logger = createLogger('DeleteTodo');
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';
import { deleteTodo } from '../../helpers/todos';
import { createLogger } from '../../utils/logger';
export const handler = middy(async (event) => {
    const todoId = event.pathParameters.todoId;
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    logger.info('doing deletetodo event...');
    try {
        await deleteTodo(event, todoId);
        return {
            statusCode: 204,
            headers,
            body: undefined
        };
    }
    catch (error) {
        logger.info('error at deletetodo event...');
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
//# sourceMappingURL=deleteTodo.js.map