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
    updateTodo(req, res) {
        const todoId = req.params.id
        const updatedTask = req.body.task

        const todoIndex = this.todos.findIndex((todo) => todo.id === todoId)

        if (todoIndex < 0) {
            res.status(404).json({
                message: "Todo not found"
            })
            return
        }

        this.todos[todoIndex] = new Todo(this.todos[todoIndex].id, updatedTask)
        res.json({
            message: "Todo updated",
            updatedTask: this.todos[todoIndex]
        })
    } 
}


export const TodoController = new TodoControllerClass()