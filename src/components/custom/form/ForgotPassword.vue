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
import { useForgotPassword } from "@/stores/forgotpassword";
import { onMounted } from "vue";

const forgotPasswordStore = useForgotPassword();

onMounted(() => {
  forgotPasswordStore.$reset();
});
</script>

<template>
  <div class="flex items-center justify-center py-12 min-h-[100vh]">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl"> Forgot Password </CardTitle>
        <CardDescription>
          Enter your email to reeset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              v-model="forgotPasswordStore.email"
            />
          </div>
          <a href="/">
            <Button
              type="submit"
              class="w-full"
              @click="forgotPasswordStore.userForgotPassword"
            >
              Submit
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
