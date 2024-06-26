<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="grid gap-2">
        <CardTitle>Categories</CardTitle>
        <CardDescription> Recent categories from your store. </CardDescription>
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
      <Table v-if="categoriesStore?.categories?.length > 0">
        <TableHeader>
          <TableRow class="bg-muted">
            <TableHead class="text-black">Name</TableHead>
            <TableHead class="text-black">Created At</TableHead>
            <TableHead class="text-black">Is Active</TableHead>
            <TableHead class="text-black">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(category, index) in categoriesStore.categories"
            :key="category.id"
          >
            <TableCell class="font-bold overflow-auto max-w-[300px]">
              {{ category.name }}
            </TableCell>
            <TableCell>{{
              dayjs(category.created_at).format("MMMM DD, YYYY - hh:mm a")
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
                <EditCategory :index="index" />
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
      <Pagination
        v-if="categoriesStore?.categories?.length > 0"
        class="ml-auto w-fit mt-5"
        v-slot="{ page }"
        :total="categoriesStore.categoryCount"
        show-edges
        :default-page="Number(getQueryVariable('page'))"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst
            @click.prevent="categoriesStore.fetchCategories(1)"
          />
          <PaginationPrev
            @click.prevent="categoriesStore.fetchCategories(page - 1)"
          />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-10 h-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
                @click.prevent="categoriesStore.fetchCategories(item.value)"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext
            @click.prevent="categoriesStore.fetchCategories(page + 1)"
          />
          <PaginationLast
            @click.prevent="
              categoriesStore.fetchCategories(categoriesStore.pageCount)
            "
          />
        </PaginationList>
      </Pagination>
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
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import getQueryVariable from "@/lib/helpers/getQueryVariable";

const categoriesStore = useCategoriesStore();

onMounted(() => {
  categoriesStore.fetchCategories();
});
</script>
