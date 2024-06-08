<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        aria-label="edit-category"
        size="sm"
        variant="outline"
        @click="isDraft = true"
      >
        <Edit v-if="!isDraft" class="h-4 w-4" />
        <TooltipProvider v-else>
          <Tooltip>
            <TooltipTrigger as-child>
              <CircleAlert class="h-4 w-4 text-red-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Changes are not saved</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[90vw] lg:max-w-[50vw] rounded-lg">
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogDescription> Edit the category name. </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <Label for="new_category_name"
            >New Category Name <span class="text-red-400">*</span></Label
          >
          <Input
            id="new_category_name"
            type="text"
            placeholder="Category Name..."
            v-model="categoriesStore.categories[index].name"
            required
          />
        </div>
        <div class="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            v-model:checked="categoriesStore.categories[index].is_active"
          />
          <Label for="airplane-mode">Active</Label>
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button
            type="submit"
            @click.prevent="
              () => {
                isDraft = false;
                categoriesStore.updateCategory(
                  categoriesStore.categories[index]
                );
              }
            "
          >
            Save
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
import { CircleAlert, Edit } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCategoriesStore } from "@/stores/categories";
import DialogClose from "@/components/ui/dialog/DialogClose.vue";
import Switch from "@/components/ui/switch/Switch.vue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { onUnmounted, ref } from "vue";

const categoriesStore = useCategoriesStore();
const isDraft = ref(false);

defineProps({
  index: {
    type: Number,
    required: true,
  },
});

onUnmounted(() => {
  categoriesStore.$reset();
});
</script>
