<template>
  <Card class="xl:col-span-3">
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="grid gap-2">
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          Recent transactions from your store.
        </CardDescription>
      </div>
      <Button size="sm" class="w-fit space-x-2">
        <span>New Transaction</span>
        <Plus class="h-4 w-4" />
      </Button>
    </CardHeader>
    <CardContent />
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";
</script>
