<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginStore } from "@/stores/login";
import { useSignUpStore } from "@/stores/signup";
import { onMounted, ref, watch } from "vue";
import { AlertCircle } from "lucide-vue-next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForgotPassword } from "@/stores/forgotpassword";
const loginStore = useLoginStore();
const signUpStore = useSignUpStore();
const forgotPasswordStore = useForgotPassword();
const showVerifyEmailAlert = ref(false);

onMounted(() => {
  loginStore.$reset();
});

watch(
  () => [
    signUpStore.successSignUp,
    forgotPasswordStore.successResetPasswordRequest,
  ],
  () => {
    if (
      signUpStore.successSignUp ||
      forgotPasswordStore.successResetPasswordRequest
    ) {
      showVerifyEmailAlert.value = true;
    }
  }
);
</script>

<template>
  <div class="flex items-center justify-center py-12">
    <div class="mx-auto grid w-[350px] gap-6">
      <Alert v-if="showVerifyEmailAlert" variant="default">
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Verify your email</AlertTitle>
        <AlertDescription>
          An email has been sent to
          <strong>{{
            signUpStore.email ? signUpStore.email : forgotPasswordStore.email
          }}</strong>
        </AlertDescription>
      </Alert>
      <Alert v-if="loginStore.errorMessage" variant="destructive">
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Login failed</AlertTitle>
        <AlertDescription>
          {{ loginStore.errorMessage }}
        </AlertDescription>
      </Alert>
      <div class="grid gap-2">
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
    </div>
  </div>
</template>
