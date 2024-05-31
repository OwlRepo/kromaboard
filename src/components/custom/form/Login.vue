<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginStore } from "@/stores/login";
import { onMounted } from "vue";
const loginStore = useLoginStore();
onMounted(() => {
  loginStore.$reset();
});
</script>

<template>
  <div class="flex items-center justify-center py-12">
    <div class="mx-auto grid w-[350px] gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Login</h1>
        <p class="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            v-model="loginStore.email"
          />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a
              href="/forgot-password"
              class="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            v-model="loginStore.password"
          />
        </div>
        <Button
          type="submit"
          class="w-full"
          @click.prevent="loginStore.userLogin()"
        >
          Login
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <a href="/sign-up" class="underline"> Sign up </a>
      </div>
      <div class="text-center text-sm">
        Want to see how it works?
        <a href="/dashboard" class="underline"> See preview </a>
      </div>
    </div>
  </div>
</template>
