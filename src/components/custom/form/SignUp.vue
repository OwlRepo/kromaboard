<template>
  <div class="flex flex-col items-stretch justify-center py-12 min-h-[100vh]">
    <Card class="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle class="text-xl"> Sign Up </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent class="w-full">
        <div class="grid gap-4">
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
            <div class="flex items-stretch space-x-2">
              <Input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                required
                v-model="signUpStore.password"
              />
              <Button
                aria-label="show-hide-new-password-toggle"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="password">Confirm Password</Label>
            <div class="flex items-stretch space-x-2">
              <Input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                required
                v-model="signUpStore.confirmPassword"
              />
              <Button
                aria-label="show-hide-new-password-toggle"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Alert v-if="signUpStore.errorMessage" variant="destructive">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Oops!</AlertTitle>
            <AlertDescription>
              {{ signUpStore.errorMessage }}
            </AlertDescription>
          </Alert>
          <Button type="submit" class="w-full" @click="signUpStore.userSignUp">
            Create Account
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
import { useSignUpStore } from "@/stores/signup";
import { onMounted, ref } from "vue";
import { AlertCircle, Eye, EyeOff } from "lucide-vue-next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const signUpStore = useSignUpStore();
const showPassword = ref(false);
const showConfirmPassword = ref(false);

onMounted(() => {
  signUpStore.$reset();
});
</script>
