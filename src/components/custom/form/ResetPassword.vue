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
import { Eye, EyeOff } from "lucide-vue-next";

const signUpStore = useSignUpStore();
const showPassword = ref(false);
const showConfirmPassword = ref(false);

onMounted(() => {
  signUpStore.$reset();
});
</script>

<template>
  <div class="flex items-center justify-center py-12 min-h-[100vh]">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
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
                :type="showPassword ? 'text' : 'password'"
                required
                v-model="signUpStore.password"
              />
              <Button @click="showPassword = !showPassword">
                <Eye v-if="showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </Button>
            </div>
          </div>
          <a href="/">
            <Button
              type="submit"
              class="w-full"
              @click="signUpStore.userSignUp"
            >
              Submit
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
