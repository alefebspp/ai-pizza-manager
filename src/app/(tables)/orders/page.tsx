import getColumns from "~/components/DataTable/columns/orders-columns";
import DataTable from "~/components/DataTable";
import deleteOrder, { getOrders } from "~/actions/orders";
import UpdateOrderDialog from "~/components/UpdateOrderDialog";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const { data, pages } = await getOrders({
    page: parseInt(searchParams?.page || "1"),
  });

  return (
    <DataTable
      data={data}
      pages={pages}
      getColumns={getColumns}
      queryKey="orders"
      getFunction={getOrders}
      deleteFunction={deleteOrder}
    >
      <UpdateOrderDialog />
    </DataTable>
  );
}
