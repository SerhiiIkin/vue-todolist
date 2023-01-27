<script setup lang="ts">
import { useDialogStore } from "@/stores/dialogStore";
import { useTodoStore } from "@/stores/todosStore";
import type { ITodo } from "../modules/modules";

const store = useTodoStore();
const dialogStore = useDialogStore();

function onCloseBtnClick() {
    dialogStore.changeStatusWindow();
}

function onOpenModalBtnCLick() {
    dialogStore.changeStatusWindow();
    dialogStore.dialogTodo = { description: "", isDone: false, id: "" };
}

function submitHandler(event: Event) {
    event.preventDefault();

    if (dialogStore.dialogTodo.id) {
        store.updateTodo(dialogStore.dialogTodo);
    } else {
        const newTodo: ITodo = {
            description: dialogStore.dialogTodo.description,
            isDone: false,
        };

        store.addTodo(newTodo);
    }

    dialogStore.changeStatusWindow();
}
</script>

<template>
    <button @click="onOpenModalBtnCLick" class="btn btn-info me-2">
        Add todo
    </button>

    <dialog
        :open="dialogStore.isOpen"
        style="--bs-bg-opacity: 0.5; z-index: 20"
        class="border-0 bg-success rounded w-100 h-100 top-0 start-0"
        @click="dialogStore.changeStatusWindow()"
    >
        <form
            @submit="submitHandler"
            class="position-absolute top-50 start-50 translate-middle d-flex flex-column p-4 rounded"
            style="background-color: grey"
            @click="(event) => event.stopPropagation()"
        >
            <button
                type="button"
                class="position-absolute border-0 btn-close text-danger right-5"
                style="right: 5px; top: 5px"
                @click="onCloseBtnClick"
            ></button>

            <input
                v-if="dialogStore.dialogTodo.id"
                type="hidden"
                v-model="dialogStore.dialogTodo.id"
            />

            <input
                v-if="dialogStore.dialogTodo.id"
                type="checkbox"
                v-model="dialogStore.dialogTodo.isDone"
                class="block align-self-start mb-2"
            />

            <label htmlFor="description"> Description: </label>
            <textarea
                class="p-2 rounded mb-3 mt-2"
                name="description"
                id="description"
                rows="4"
                v-model.trim="dialogStore.dialogTodo.description"
            />

            <span class="align-self-end">
                <button type="submit" class="btn btn-primary">Save</button>
            </span>
        </form>
    </dialog>
</template>

<style scoped>
textarea {
    resize: none;
}
</style>
