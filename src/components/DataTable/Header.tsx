"use client";
import {
  ChangeEvent,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { PlusIcon } from "lucide-react";

type Props = {
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  allowSearch?: boolean;
} & PropsWithChildren;

export default function DataTableHeader({
  setSearch,
  children,
  allowSearch,
}: Props) {
  const [value, setValue] = useState("");

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(value);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex w-full items-end gap-4">
      {children ?? null}
      {allowSearch && (
        <div className="flex flex-col gap-2">
          <Label>Pesquisar</Label>
          <Input value={value} onChange={handleSearch} />
        </div>
      )}
    </div>
  );
}
