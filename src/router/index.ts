import TodoListVue from "@/views/TodoList.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "todolist",
            component: TodoListVue,
        },
    ],
});

export default router;
