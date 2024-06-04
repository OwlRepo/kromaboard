<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button size="sm" class="w-fit space-x-2">
        <span>New Category</span>
        <Plus class="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[90vw] lg:max-w-[50vw] rounded-lg">
      <DialogHeader>
        <DialogTitle>New Category</DialogTitle>
        <DialogDescription> Create a new product category. </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <Label for="category_name"
            >Category Name <span class="text-red-400">*</span></Label
          >
          <Input
            id="category_name"
            type="text"
            placeholder="Category Name..."
            v-model="categoriesStore.newCategoryName"
            required
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button type="submit" @click="categoriesStore.createNewCategory">
            Submit
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogClose from "@/components/ui/dialog/DialogClose.vue";
import { useCategoriesStore } from "@/stores/categories";

const categoriesStore = useCategoriesStore();
</script>
