import deleteIngredient, { getIngredients } from "~/actions/ingredients";
import getColumns from "~/components/DataTable/columns/ingredient-columns";
import DataTable from "~/components/DataTable";
import CreateIngredientDialog from "~/components/CreateIngredientDialog";

export default async function IngredientsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const { data, pages } = await getIngredients({
    page: parseInt(searchParams?.page || "1"),
  });

  return (
    <DataTable
      data={data}
      pages={pages}
      getColumns={getColumns}
      queryKey="ingredients"
      allowSearch
      getFunction={getIngredients}
      deleteFunction={deleteIngredient}
    >
      <CreateIngredientDialog />
    </DataTable>
  );
}
