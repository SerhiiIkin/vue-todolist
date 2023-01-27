import axios from "@/axios";
import type { ITodo } from "@/modules/modules";
import { reactive } from "vue";

import { defineStore } from "pinia";

export const useTodoStore = defineStore("todos", {
    state: () => {
        return reactive({
            todos: [] as ITodo[],
            errorGetTodos: "",
            errorText: "",
            loading: false,
        });
    },
    actions: {
        async updateTodo(todo: ITodo) {
            const currentTodos = [...this.todos];

            try {
                const response = await axios.put(
                    `/api/TodoList/UpdateTodo?id=${todo.id}`,
                    todo
                );

                if (response.status === 200) {
                    this.todos = this.todos.map((t) => {
                        if (t.id === response.data.id) {
                            return response.data;
                        }
                        return t;
                    });
                }
            } catch (error) {
                this.errorText = "Cant change todo";
                console.log(error);
                this.todos = currentTodos;
            }
        },

        async addTodo(todo: ITodo) {
            const currentTodos = [...this.todos];
            this.todos.push(todo);

            try {
                const response = await axios.post("/api/TodoList/Create", todo);

                if (response.status === 200) {
                    this.todos = this.todos.map((todo) => {
                        if (todo?.id === undefined) {
                            return response.data;
                        }
                        return todo;
                    });
                }
            } catch (error) {
                this.todos = currentTodos;
                this.errorText = "Cant add todo";
                console.log(error);
            }
        },
        async deleteTodo(id: string) {
            const currentTodos = [...this.todos];
            this.todos = this.todos.filter((todo) => todo.id !== id);

            try {
                await axios.delete(`/api/TodoList/Delete?id=${id}`);
                this.errorText = "";
            } catch (error) {
                this.todos = currentTodos;
                console.log(error);
                this.errorText = "Can't delete todo";
            }
        },

        async getTodos() {
            this.loading = true;
            try {
                const todos = await axios.get("/api/TodoList/GetAll");

                this.todos = todos.data;
                this.loading = false;
            } catch (error) {
                this.errorGetTodos = "Cant get todo. Network error";
                console.log(error);
                this.loading = false;
            }
        },
    },
});
