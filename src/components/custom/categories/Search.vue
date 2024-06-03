<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="grid gap-2">
        <CardTitle>Search</CardTitle>
        <CardDescription> Search transactions by product. </CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <form>
        <div class="relative">
          <Search
            class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
          />
          <Input
            name="search"
            type="search"
            placeholder="Search products..."
            aria-label="search"
            class="w-full appearance-none bg-background pl-8 shadow-none"
          />
        </div>
      </form>
    </CardContent>
  </Card>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
</script>
