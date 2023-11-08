import 'source-map-support/register';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { getTodos } from '../../helpers/todos';
import { createLogger } from '../../utils/logger';
const logger = createLogger('GetTodo');
// TODO: Get all TODO items for a current user
export const handler = middy(async (event) => {
    // Write your code her
    logger.info('doing GetTodo event...');
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    try {
        const todoList = await getTodos(event);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ todoList })
        };
    }
    catch (error) {
        logger.info('error at GetTodo event...');
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error })
        };
    }
});
handler.use(cors({
    credentials: true
}));
//# sourceMappingURL=getTodos.js.map