<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="grid gap-2">
        <CardTitle>Products</CardTitle>
        <CardDescription> List of products from your store. </CardDescription>
      </div>
      <CreateProduct />
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
import CreateProduct from "./modals/CreateProduct.vue";
</script>
