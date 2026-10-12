import { Todo } from "../models/todo.js"

class TodoControllerClass {
    constructor() {
        this.todos = []
    }

    createTodo(req, res) {
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)
        this.todos.push(newTodo)
        res.json({
            message: "Todo created",
            newTask: newTodo
        })
    }
    getTodos(req, res) {
        res.json({
            tasks: this.todos
        })
    }
}

export const TodoController = new TodoControllerClass()