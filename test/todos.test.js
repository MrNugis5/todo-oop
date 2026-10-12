import test from 'node:test';
import assert from 'node:assert/strict';

import { Todo } from '../models/todo.js';
import { TodoController } from '../controllers/todos.js';

test('Todo stores provided id and task', () => {
  const todo = new Todo('1', 'buy milk');
  assert.equal(todo.id, '1');
  assert.equal(todo.task, 'buy milk');
});

test('TodoController creates a new todo from request body', () => {
  TodoController.todos = [];

  const req = { body: { task: 'write tests' } };
  let payload;
  const res = {
    json(value) {
      payload = value;
    },
  };

  TodoController.createTodo(req, res);

  assert.equal(TodoController.todos.length, 1);
  assert.equal(TodoController.todos[0].task, 'write tests');
  assert.equal(payload.newTask.task, 'write tests');
});
