import type { ITodo } from "@/modules/modules";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useDialogStore = defineStore("dialog", {
    state: () => {
        return reactive({
            isOpen: false,
            dialogTodo: {
                description: "",
                id: "",
                isDone: false,
            },
        });
    },
    actions: {
        changeStatusWindow() {
            this.isOpen = !this.isOpen;
        },

        changeCurrentTodo(todo: ITodo) {
            this.dialogTodo = {
                id: todo.id!,
                description: todo.description,
                isDone: todo.isDone,
            };
        },
    },
});
