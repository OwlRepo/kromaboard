<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="grid gap-2">
        <CardTitle>Filter</CardTitle>
        <CardDescription> Filter by date, status or product. </CardDescription>
      </div>
    </CardHeader>
    <CardContent class="flex flex-col space-y-6 items-stretch">
      <div class="flex flex-col space-y-2">
        <b>Transaction Date</b>
        <div class="flex flex-row items-center">
          <DateRangePicker client:visible />
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <b>Status</b>
        <div
          class="flex flex-col space-y-2 xl:space-y-0 xl:flex-row xl:space-x-10"
        >
          <div class="flex flex-col space-y-2">
            <div>
              <Checkbox id="success" name="success" aria-label="success" />
              <label
                for="success"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Success
              </label>
            </div>
            <div>
              <Checkbox id="failed" name="failed" aria-label="failed" />
              <label
                for="failed"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Failed
              </label>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <div>
              <Checkbox name="pending" id="pending" aria-label="pending" />
              <label
                for="pending"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Pending
              </label>
            </div>
            <div>
              <Checkbox name="refunded" id="refunded" aria-label="refunded" />
              <label
                for="refunded"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Refunded
              </label>
            </div>
          </div>
        </div>
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
import { Checkbox } from "@/components/ui/checkbox";
import DateRangePicker from "@/components/custom/form/DateRangePicker.vue";
</script>
