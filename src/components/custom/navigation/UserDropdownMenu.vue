<script setup lang="ts">
import { CircleUser } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
async function logout() {
  let { error } = await supabase.auth.signOut();
  if (!error) {
    window.localStorage.clear();
    window.location.href = "/";
  }
}

const { data: user } = await supabase.auth.getUser();
</script>

<template>
  <div class="flex flex-row space-x-2 items-center">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="secondary" size="icon" class="rounded-full">
          <CircleUser class="h-5 w-5" />
          <span class="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p class="text-xs">
            {{ user.user.email }}
          </p></DropdownMenuLabel
        >
        <!-- <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem> -->
        <DropdownMenuSeparator />
        <DropdownMenuItem @click.prevent="logout()">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
