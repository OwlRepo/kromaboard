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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DialogClose from "@/components/ui/dialog/DialogClose.vue";
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button size="sm" class="w-fit space-x-2">
        <span>New Product</span>
        <Plus class="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[90vw] lg:max-w-[50vw] rounded-lg">
      <DialogHeader>
        <DialogTitle>New Product</DialogTitle>
        <DialogDescription> Create a new product. </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <Label
            >Select Category
            <span class="text-red-400">*</span>
          </Label>
          <Select>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Category..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple"> Apple </SelectItem>
                <SelectItem value="banana"> Banana </SelectItem>
                <SelectItem value="blueberry"> Blueberry </SelectItem>
                <SelectItem value="grapes"> Grapes </SelectItem>
                <SelectItem value="pineapple"> Pineapple </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="remarks"
            >Product Name <span class="text-red-400">*</span></Label
          >
          <Input
            id="category_name"
            type="text"
            placeholder="Category Name..."
            required
          />
        </div>

        <div class="grid gap-2">
          <Label for="product_price" class="flex justify-between"
            >Product Price
            <span class="text-xs font-normal italic">
              ( Leave blank if not applicable )</span
            ></Label
          >
          <Input id="product_price" type="text" required />
        </div>

        <div class="grid gap-2">
          <Label for="product_profit" class="flex justify-between"
            >Profit per unit sold
            <span class="text-xs font-normal italic">
              ( Leave blank if not applicable )</span
            ></Label
          >
          <Input id="product_profit" type="text" required />
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button type="submit"> Submit </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
