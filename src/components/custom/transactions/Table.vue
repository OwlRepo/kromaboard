<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="grid gap-2">
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          Recent transactions from your store.
        </CardDescription>
      </div>
      <div class="flex flex-row space-x-5">
        <FilterTable />
        <CreateTransaction />
      </div>
    </CardHeader>
    <CardContent>
      <Alert
        v-if="transactionsStore.errorMessage"
        variant="destructive"
        class="mb-5"
      >
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Operation failed</AlertTitle>
        <AlertDescription>
          {{ transactionsStore.errorMessage }}
        </AlertDescription>
      </Alert>
      <Table v-if="transactionsStore?.transactions?.length > 0">
        <TableHeader>
          <TableRow class="bg-muted">
            <TableHead class="text-black">Category</TableHead>
            <TableHead class="text-black">Product</TableHead>
            <TableHead class="text-black">Created at</TableHead>
            <TableHead class="text-black">Price</TableHead>
            <TableHead class="text-black">Profit</TableHead>
            <TableHead class="text-black">Quantity</TableHead>
            <TableHead class="text-black">Status</TableHead>
            <TableHead class="text-black">Remarks</TableHead>
            <TableHead class="text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(transaction, index) in transactionsStore.transactions"
            :key="transaction.id"
          >
            <TableCell class="font-bold overflow-auto max-w-[300px] uppercase">
              {{ transaction?.categories?.name }}
            </TableCell>
            <TableCell class="font-bold overflow-auto max-w-[300px] uppercase">
              {{ transaction.product_name }}
            </TableCell>
            <TableCell>{{
              dayjs(transaction.created_at).format("MMMM DD, YYYY - hh:mm a")
            }}</TableCell>
            <TableCell>
              {{ transaction.transaction_amount }}
            </TableCell>
            <TableCell>
              {{ transaction.business_profit }}
            </TableCell>

            <TableCell>
              {{ transaction.quantity }}
            </TableCell>

            <TableCell>
              <Badge :variant="transaction.status">{{
                transaction.status
              }}</Badge>
            </TableCell>

            <TableCell>
              {{ transaction.remarks }}
              <CircleX
                class="h-4 w-4 text-red-600"
                v-if="!transaction.remarks"
              />
            </TableCell>
            <TableCell>
              <div class="flex flex-row space-x-2">
                <EditTransaction :index="index" />
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
        <p>There are no transactions yet</p>
      </div>
      <Pagination
        v-if="transactionsStore?.transactions?.length > 0"
        class="ml-auto w-fit mt-5"
        v-model:page="transactionsStore.currentPage"
        :total="transactionsStore.transactionCount"
        show-edges
        :default-page="Number(getQueryVariable('page'))"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst
            @click.prevent="transactionsStore.fetchTransactions(1)"
          />
          <PaginationPrev
            @click.prevent="
              transactionsStore.fetchTransactions(
                transactionsStore.currentPage - 1
              )
            "
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
                :variant="
                  item.value === transactionsStore.currentPage
                    ? 'default'
                    : 'outline'
                "
                @click.prevent="transactionsStore.fetchTransactions(item.value)"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext
            @click.prevent="
              transactionsStore.fetchTransactions(
                transactionsStore.currentPage + 1
              )
            "
          />
          <PaginationLast
            @click.prevent="
              transactionsStore.fetchTransactions(transactionsStore.pageCount)
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { AlertCircle, CircleX, PackageSearch } from "lucide-vue-next";
import EditTransaction from "./modals/EditTransaction.vue";
import { onMounted, ref } from "vue";
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
import CreateTransaction from "./modals/CreateTransaction.vue";
import FilterTable from "./modals/FilterTable.vue";
import { useTransactionsStore } from "@/stores/transactions";
import Badge from "@/components/ui/badge/Badge.vue";

const transactionsStore = useTransactionsStore();

onMounted(() => {
  transactionsStore.fetchTransactions();
});
</script>
