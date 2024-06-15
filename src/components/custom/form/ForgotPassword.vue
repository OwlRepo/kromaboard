<template>
  <div class="flex items-center justify-center py-12 min-h-[100vh]">
    <Card class="mx-auto w-full max-w-lg">
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
          <Alert v-if="forgotPasswordStore.errorMessage" variant="destructive">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>
              {{ forgotPasswordStore.errorMessage }}
            </AlertDescription>
          </Alert>
          <Button
            type="submit"
            class="w-full"
            @click="forgotPasswordStore.userForgotPassword"
          >
            Submit
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <a href="/" class="underline"> Sign in </a>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-vue-next";

const forgotPasswordStore = useForgotPassword();

onMounted(() => {
  forgotPasswordStore.$reset();
});
</script>
