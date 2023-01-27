<script setup lang="ts">
import { useTodoStore } from "../stores/todosStore";
import { storeToRefs } from "pinia";
import Loader from "../components/Loader.vue";
import Table from "../components/Table.vue";
import AddTodo from "../components/AddTodo.vue";
import { useDialogStore } from "@/stores/dialogStore";

const store = useTodoStore();
const dialogStore = useDialogStore()

store.getTodos();
</script>

<template>
    <div class="container mx-auto px-2 mt-2">
        <AddTodo  v-if="!store?.errorGetTodos && !store?.loading"  />
        <Loader v-if="store?.loading" />
        <h2 v-else-if="store?.errorGetTodos" class="text-danger text-center">
            {{ store?.errorGetTodos }}
        </h2>
        <Table v-else />
    </div>
</template>
