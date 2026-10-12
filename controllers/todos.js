import { Todo } from "../models/todo.js"
import { fileManager } from "../files.js"

class TodoControllerClass {
    constructor() {
        this.initTodos()
    }

    async createTodo(req, res) {
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)
        this.todos.push(newTodo)
        await fileManager.writeFile("./data/todos.json", this.todos)
        res.json({
            message: "Todo created",
            newTask: newTodo
        })
    }

    async initTodos() {
        const todosData = await fileManager.readFile("./data/todos.json")
        if(todosData !== null){
            this.TODOS = todosData}
            else {
            this.TODOS = []
        }
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

    deleteTodo(req, res) {
        const todoId = req.params.id

        const todoIndex = this.todos.findIndex((todo) => todo.id === todoId)

        if (todoIndex < 0) {
            res.status(404).json({
                message: "Todo not found"
            })
            return
        }

        this.todos.splice(todoIndex, 1)
        res.json({
            message: "Todo deleted"
        })
    }
}

export const TodoController = new TodoControllerClass()