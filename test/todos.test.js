import test from 'node:test';
import assert from 'node:assert/strict';

import { Todo } from '../models/todo.js';
import { TodoController } from '../controllers/todos.js';

test('Todo stores provided id and task', () => {
  const todo = new Todo('1', 'buy milk');
  assert.equal(todo.id, '1');
  assert.equal(todo.task, 'buy milk');
});

test('TodoController creates a new todo from request body', async () => {
  TodoController.todos = [];

  const req = { body: { task: 'write tests' } };
  let payload;
  const res = {
    json(value) {
      payload = value;
    },
  };

  await TodoController.createTodo(req, res);

  assert.equal(TodoController.todos.length, 1);
  assert.equal(TodoController.todos[0].task, 'write tests');
  assert.equal(payload.newTask.task, 'write tests');
});

test('TodoController updates an existing todo by id', () => {
  TodoController.todos = [new Todo('abc', 'old task')];

  const req = {
    params: { id: 'abc' },
    body: { task: 'updated task' },
  };
  let payload;
  const res = {
    json(value) {
      payload = value;
    },
  };

  TodoController.updateTodo(req, res);

  assert.equal(TodoController.todos.length, 1);
  assert.equal(TodoController.todos[0].task, 'updated task');
  assert.equal(payload.updatedTask.task, 'updated task');
});
