import { TodoCreateModel, TodoItem, TodoUpdateModel } from '../models/TodoItem'
import * as uuid from 'uuid'
import { getUserId } from '../lambda/utils'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { TodoAccess } from '../dataLayer/todosAcess'

// TODO: Implement businessLogic
const todoAccess = new TodoAccess()

export async function getTodos(
  event: APIGatewayProxyEvent
): Promise<TodoItem[]> {
  const userId: string = getUserId(event)
  return todoAccess.getListTodo(userId)
}

export async function getTodo(
  event: APIGatewayProxyEvent,
  todoId: string
): Promise<TodoItem> {
  const userId: string = getUserId(event)
  return todoAccess.getTodo(userId, todoId)
}

export async function createTodo(
  event: APIGatewayProxyEvent,
  newTodoData: TodoCreateModel
): Promise<TodoItem> {
  const todoId = uuid.v4()
  const userId = getUserId(event)
  const createdDate = new Date().toISOString()
  const done = false
  const newTodo: TodoItem = {
    todoId,
    userId,
    createdAt: createdDate,
    done,
    ...newTodoData
  }
  return todoAccess.createTodo(newTodo)
}

export async function updateTodo(
  event: APIGatewayProxyEvent,
  todoId: string,
  updateData: TodoUpdateModel
): Promise<void> {
  const userId = getUserId(event)
  return todoAccess.updateTodo(userId, todoId, updateData)
}

export async function deleteTodo(
  event: APIGatewayProxyEvent,
  todoId: string
): Promise<void> {
  const userId = getUserId(event)
  return todoAccess.deleteTodo(userId, todoId)
}
