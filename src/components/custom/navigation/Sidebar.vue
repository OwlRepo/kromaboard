<script setup>
import { LOGGED_IN_ROUTES } from "@/constants";
import { computed } from "vue";

const currentRoute = computed(() => window.location.pathname);
</script>

<template>
  <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
    <a
      v-for="route in LOGGED_IN_ROUTES"
      :key="route.path"
      :href="route.path"
      class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
      :class="{
        'bg-muted text-black': currentRoute.includes(route.path),
      }"
    >
      {{ route.name }}</a
    >
  </nav>
</template>
