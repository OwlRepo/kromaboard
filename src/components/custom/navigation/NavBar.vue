<script setup lang="ts">
import { Bell, Package2, Search } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { computed } from "vue";

const currentRoute = computed(() => window.location.pathname);
</script>

<template>
  <div
    class="grid max-h-screen min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="">imboard</span>
          </a>
          <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="flex-1">
          <slot name="side-bar" />
        </div>
        <div class="mt-auto p-4">
          <Card>
            <CardHeader class="p-2 pt-0 md:p-4">
              <CardTitle>Check Plugins</CardTitle>
              <CardDescription>
                See the collection of our plugins that you might need and only
                use what you need
              </CardDescription>
            </CardHeader>
            <CardContent class="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" class="w-full"> Marketplace </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <header
        class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
      >
        <slot name="mobile-nav-sheet" />
        <div class="w-full flex-1">
          <form>
            <div class="relative">
              <Search
                class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              />
              <label for="search"></label>
              <Input
                name="search"
                type="search"
                placeholder="Search products..."
                aria-label="search"
                class="w-full appearance-none bg-background pl-8 shadow-none"
              />
            </div>
          </form>
        </div>
        <slot name="user-dropdown-menu" />
      </header>
      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
