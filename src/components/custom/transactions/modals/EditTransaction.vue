<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        aria-label="edit-category"
        size="sm"
        variant="outline"
        @click="prepareForm"
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
          <Label
            >Select category
            <span class="text-red-400">*</span>
          </Label>
          <Select v-model="transactionsStore.transactions[index].category_id">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Category..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="category in transactionsStore.categories"
                  :value="category.id"
                >
                  {{ category.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label
            >Select product
            <span class="text-red-400">*</span>
          </Label>
          <Select v-model="transactionsStore.transactions[index].product_id">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Product..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="product in transactionsStore.products"
                  :value="product.id"
                >
                  {{ product.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="transaction_amount"
            >Transaction Amount
            <span class="text-red-400">*</span>
          </Label>
          <Input
            v-model="transactionsStore.transactions[index].transaction_amount"
            id="transaction_amount"
            type="number"
            min="1"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="business_profit"
            >Business Profit
            <span class="text-red-400">*</span>
          </Label>
          <Input
            v-model="transactionsStore.transactions[index].business_profit"
            id="business_profit"
            type="number"
            min="1"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="item_count"
            >Quantity
            <span class="text-red-400">*</span>
          </Label>
          <Input
            v-model="transactionsStore.transactions[index].quantity"
            id="item_count"
            type="number"
            min="1"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label
            >Transaction Status
            <span class="text-red-400">*</span>
          </Label>
          <Select v-model="transactionsStore.transactions[index].status">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="success"> Success </SelectItem>
                <SelectItem value="pending"> Pending </SelectItem>
                <SelectItem value="refunded"> Refunded </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="remarks">Remarks (optional)</Label>
          <Input
            v-model="transactionsStore.transactions[index].remarks"
            id="remarks"
            type="text"
            min="1"
            required
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button
            type="submit"
            @click.prevent="
              () => {
                isDraft = false;
                transactionsStore.updateTransaction(
                  transactionsStore.transactions[index]
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
import DialogClose from "@/components/ui/dialog/DialogClose.vue";
import Switch from "@/components/ui/switch/Switch.vue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ref, watch } from "vue";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectGroup from "@/components/ui/select/SelectGroup.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import { useTransactionsStore } from "@/stores/transactions";

const transactionsStore = useTransactionsStore();
const isDraft = ref(false);

function prepareForm() {
  isDraft.value = true;
  transactionsStore.fetchCategories();
  transactionsStore.fetchProductsByCategoryId(
    transactionsStore.transactions[props.index].category_id
  );
}

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

watch(
  () => [transactionsStore.transactions[props.index].category_id],
  () => {
    transactionsStore.fetchProductsByCategoryId(
      transactionsStore.transactions[props.index].category_id
    );
  }
);
</script>
