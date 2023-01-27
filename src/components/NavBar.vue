<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { linksStore } from "../stores/linksStore";
const { links, changeActive } = linksStore;
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li
                        class="nav-item"
                        v-for="({ id, name, isActive, to }, index) in links"
                        :key="id"
                    >
                        <span class="nav-link">
                            <RouterLink
                                @click="changeActive(id)"
                                :to="to"
                                class="text-decoration-none p-2"
                                :class="isActive ? 'active border rounded' : ''"
                            >
                                {{ name }}
                            </RouterLink></span
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
