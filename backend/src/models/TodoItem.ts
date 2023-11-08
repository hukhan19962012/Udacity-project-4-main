export interface TodoItem {
  userId: string
  todoId: string
  createdAt: string
  name: string
  dueDate: string
  done: boolean
  attachmentUrl?: string
}


export interface TodoCreateModel {
  name: string;
  dueDate: string;
  attachmentUrl: string;
}

export interface TodoUpdateModel {
  name: string;
  dueDate: string;
  done: boolean;
}