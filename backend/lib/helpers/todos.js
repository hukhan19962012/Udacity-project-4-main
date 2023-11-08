import { TodoAccess } from './todosAcess';
import * as uuid from 'uuid';
import { getUserId } from '../lambda/utils';
// TODO: Implement businessLogic
const todoAccess = new TodoAccess();
export async function getTodos(event) {
    const userId = getUserId(event);
    return todoAccess.getListTodo(userId);
}
export async function getTodo(event, todoId) {
    const userId = getUserId(event);
    return todoAccess.getTodo(userId, todoId);
}
export async function createTodo(event, newTodoData) {
    const todoId = uuid.v4();
    const userId = getUserId(event);
    const createdDate = new Date().toISOString();
    const done = false;
    const newTodo = Object.assign({ todoId, userId, createdAt: createdDate, done }, newTodoData);
    return todoAccess.createTodo(newTodo);
}
export async function updateTodo(event, todoId, updateData) {
    const userId = getUserId(event);
    return todoAccess.updateTodo(userId, todoId, updateData);
}
export async function deleteTodo(event, todoId) {
    const userId = getUserId(event);
    return todoAccess.deleteTodo(userId, todoId);
}
//# sourceMappingURL=todos.js.map