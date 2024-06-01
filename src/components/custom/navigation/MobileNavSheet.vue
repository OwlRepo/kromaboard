<script setup lang="ts">
import { Menu, Package2 } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LOGGED_IN_ROUTES } from "@/constants";

defineProps({
  currentRoute: String,
});
</script>

<template>
  <div>
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline" size="icon" class="shrink-0 md:hidden">
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="flex flex-col">
        <nav class="grid gap-2 text-lg font-medium">
          <a
            href="/dashboard"
            class="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 class="h-6 w-6" />
            <span class="sr-only">kromaboard</span>
          </a>

          <a
            v-for="route in LOGGED_IN_ROUTES"
            :key="route.path"
            :href="route.path"
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
            :class="{
              'bg-muted text-foreground': currentRoute.includes(route.path),
              'text-muted-foreground hover:text-foreground':
                !currentRoute.includes(route.path),
            }"
          >
            <component
              :is="route.icon"
              class="w-4"
              :class="{
                'bg-muted text-foreground': currentRoute.includes(route.path),
              }"
            />
            {{ route.name }}
          </a>
        </nav>
        <div class="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Check Plugins</CardTitle>
              <CardDescription>
                See the collection of our plugins that you might need and only
                use what you need
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" class="w-full"> Marketplace </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>
