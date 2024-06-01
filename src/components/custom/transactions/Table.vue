<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="grid gap-2">
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          Recent transactions from your store.
        </CardDescription>
      </div>
      <CreateTransaction />
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
import CreateTransaction from "@/components/custom/transactions/modals/CreateTransaction.vue";
</script>
