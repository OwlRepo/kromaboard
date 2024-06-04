<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="grid gap-2">
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          Recent transactions from your store.
        </CardDescription>
      </div>
      <CreateCategory />
    </CardHeader>
    <CardContent>
      <Alert
        v-if="categoriesStore.errorMessage"
        variant="destructive"
        class="mb-5"
      >
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Operation failed</AlertTitle>
        <AlertDescription>
          {{ categoriesStore.errorMessage }}
        </AlertDescription>
      </Alert>
      <Alert v-if="categoriesStore.loading" class="mb-5">
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Operation in-progress</AlertTitle>
        <AlertDescription> Reloading categories... </AlertDescription>
      </Alert>
      <Table v-if="categoriesStore.categories">
        <TableHeader>
          <TableRow class="bg-muted">
            <TableHead>Name</TableHead>
            <TableHead class="w-[150px]"> Created at </TableHead>
            <TableHead class="w-[150px]"> Is Active </TableHead>
            <TableHead class="w-[150px]"> Actions </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(category, index) in categoriesStore.categories"
            :key="category.id"
          >
            <TableCell class="font-bold">
              {{ category.name }}
            </TableCell>
            <TableCell>{{
              dayjs(category.created_at).format("DD/MM/YYYY")
            }}</TableCell>
            <TableCell class="text-center">
              <CheckCircle
                class="h-4 w-4 text-green-600"
                v-if="category.is_active"
              />
              <CircleX class="h-4 w-4 text-red-600" v-else />
            </TableCell>
            <TableCell>
              <div class="flex flex-row space-x-2">
                <EditCategory :category="category" :index="index" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div
        v-else
        class="flex flex-col items-center w-full text-muted-foreground space-y-3 my-10"
      >
        <PackageSearch class="h-12 w-12" />
        <p>There are no categories yet</p>
      </div>
    </CardContent>
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
import CreateCategory from "./modals/CreateCategory.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import dayjs from "dayjs";
import {
  AlertCircle,
  CheckCircle,
  CircleX,
  PackageSearch,
} from "lucide-vue-next";
import EditCategory from "./modals/EditCategory.vue";
import { useCategoriesStore } from "@/stores/categories";
import { onMounted } from "vue";
import Alert from "@/components/ui/alert/Alert.vue";
import AlertTitle from "@/components/ui/alert/AlertTitle.vue";
import AlertDescription from "@/components/ui/alert/AlertDescription.vue";

const categoriesStore = useCategoriesStore();

onMounted(() => {
  categoriesStore.fetchCategories();
});
</script>
