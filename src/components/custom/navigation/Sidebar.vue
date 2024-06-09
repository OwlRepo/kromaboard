<script setup>
import { LOGGED_IN_ROUTES } from "@/constants";
const currentRoute = window.location.pathname;
</script>

<template>
  <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
    <a
      v-for="route in LOGGED_IN_ROUTES"
      :key="route.path"
      :href="route.path"
      class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
      :class="{
        'bg-muted text-foreground': route.path.includes(currentRoute),
        'text-muted-foreground hover:text-foreground':
          !route.path.includes(currentRoute),
      }"
    >
      <component
        :is="route.icon"
        class="w-4"
        :class="{
          'bg-muted text-foreground': route.path.includes(currentRoute),
        }"
      />
      {{ route.name }}
    </a>
  </nav>
</template>
