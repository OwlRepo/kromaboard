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
import { onMounted, ref } from "vue";
import { AlertCircle, Eye, EyeOff } from "lucide-vue-next";
import { useResetPassword } from "@/stores/resetpassword";
import Alert from "@/components/ui/alert/Alert.vue";
import AlertTitle from "@/components/ui/alert/AlertTitle.vue";
import AlertDescription from "@/components/ui/alert/AlertDescription.vue";

const resetPassword = useResetPassword();
const showPassword = ref(false);

onMounted(() => {
  resetPassword.$reset();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 min-h-[100vh]">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <Alert v-if="resetPassword.errorMessage" variant="destructive">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>Reset password failed</AlertTitle>
          <AlertDescription>
            {{ resetPassword.errorMessage }}
          </AlertDescription>
        </Alert>
        <Alert v-if="resetPassword.successResetPassword">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>Sucessful reset</AlertTitle>
          <AlertDescription>
            Account password has been reset.
            <br />
            <a href="/" class="underline text-primary">Click</a> here to login.
          </AlertDescription>
        </Alert>
        <CardTitle class="text-xl"> Set new password </CardTitle>
        <CardDescription>
          Enter your new password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="password">New Password</Label>
            <div class="flex items-stretch space-x-2">
              <Input
                id="password"
                :disabled="resetPassword.successResetPassword"
                :type="showPassword ? 'text' : 'password'"
                required
                v-model="resetPassword.password"
              />
              <Button
                aria-label="show-hide-reset-password-toggle"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            class="w-full"
            :disabled="resetPassword.successResetPassword"
            @click="resetPassword.userResetPassword"
          >
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
