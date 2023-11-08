import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createTodo } from '../../helpers/todos'
import { TodoCreateModel, TodoItem } from '../../models/TodoItem'
import { createLogger } from '../../utils/logger'

const logger = createLogger('CreateTodo')



export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    // TODO: Implement creating a new TODO item
  const newTodoData: TodoCreateModel = JSON.parse(event.body);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };
  logger.info('doing createToto event...');
  try {
    const newTodo: TodoItem = await createTodo(event, newTodoData);
 
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ newTodo })
    }
  } catch (error) {
    logger.info('error at createToto event...');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error })
    }
  }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
