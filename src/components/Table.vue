<script setup lang="ts">
import type { ITodo } from "@/modules/modules";
import { useDialogStore } from "@/stores/dialogStore";
import { useTodoStore } from "../stores/todosStore";

const store = useTodoStore();
const dialogStore = useDialogStore();

function changeStatus(todo: ITodo) {
    const changedStatusTodo = { ...todo, isDone: !todo.isDone };

    store.updateTodo(changedStatusTodo);
}

function changeTodo(todo: ITodo) {
    dialogStore.changeStatusWindow();

    dialogStore.changeCurrentTodo(todo);
}
</script>

<template>
    <div class="table-responsive">
        <h2>Todo list page</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Description</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="todo in store.todos" :key="todo?.id">
                    <td>
                        <input
                            type="checkbox"
                            class="me-2"
                            id="isDone"
                            v-model="todo.isDone"
                            @click="changeStatus(todo)"
                        />
                    </td>
                    <td :class="todo.isDone && 'text-decoration-line-through'">
                        {{ todo.description }}
                    </td>

                    <td class="d-flex justify-content-end">
                        <i
                            @click="changeTodo(todo)"
                            class="bi bi-pen btn text-primary ms-2"
                        ></i>
                        <i
                            @click="store.deleteTodo(todo?.id!)"
                            class="bi bi-trash text-danger btn ms-2"
                        ></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <h4 v-if="store?.errorText" class="text-center text-danger">
            {{ store?.errorText }}
        </h4>
    </div>
</template>
