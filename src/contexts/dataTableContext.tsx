import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface DataTableContextProps {
  toDeleteDataId: number | undefined;
  setToDeleteDataId: Dispatch<SetStateAction<number | undefined>>;
  toUpdateDataId: number | undefined;
  setToUpdateDataId: Dispatch<SetStateAction<number | undefined>>;
  alertDialogIsOpen: boolean;
  setAlertDialogIsOpen: Dispatch<SetStateAction<boolean>>;
  updateDataDialogIsOpen: boolean;
  setUpdateDataDialogIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface DataTableProviderProps {
  children: ReactNode;
}

const DataTableContext = createContext<DataTableContextProps>(
  {} as DataTableContextProps,
);

export function DataTableContextProvider({ children }: DataTableProviderProps) {
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);
  const [updateDataDialogIsOpen, setUpdateDataDialogIsOpen] = useState(false);
  const [toDeleteDataId, setToDeleteDataId] = useState<number>();
  const [toUpdateDataId, setToUpdateDataId] = useState<number>();

  return (
    <DataTableContext.Provider
      value={{
        toDeleteDataId,
        setToDeleteDataId,
        toUpdateDataId,
        setToUpdateDataId,
        alertDialogIsOpen,
        setAlertDialogIsOpen,
        updateDataDialogIsOpen,
        setUpdateDataDialogIsOpen,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export function useDataTableContext(): DataTableContextProps {
  const context = useContext(DataTableContext) as DataTableContextProps;

  if (!context) {
    throw new Error(
      "useDataTableContext must be used within a DataTableContextProvider",
    );
  }

  return context;
}

export default DataTableContext;
