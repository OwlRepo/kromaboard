<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignUpStore } from "@/stores/signup";
import { onMounted } from "vue";

const signUpStore = useSignUpStore();

onMounted(() => {
  signUpStore.$reset();
});
</script>

<template>
  <div class="flex items-center justify-center py-12">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl"> Sign Up </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="first-name">First name</Label>
              <Input
                id="first-name"
                placeholder="Max"
                required
                v-model="signUpStore.firstName"
              />
            </div>
            <div class="grid gap-2">
              <Label for="last-name">Last name</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                required
                v-model="signUpStore.lastName"
              />
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              v-model="signUpStore.email"
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              v-model="signUpStore.password"
            />
          </div>
          <div class="grid gap-2">
            <Label for="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              v-model="signUpStore.confirmPassword"
            />
          </div>
          <a href="/">
            <Button
              type="submit"
              class="w-full"
              @click="signUpStore.userSignUp"
            >
              Create Account
            </Button>
          </a>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <a href="/" class="underline"> Sign in </a>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
