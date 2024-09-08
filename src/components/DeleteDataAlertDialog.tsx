import { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

type Props = {
  confirm: ({ id }: { id: number }) => Promise<void>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dataId?: number;
};

export default function DeleteDataAlertDialog({
  confirm,
  isOpen,
  setIsOpen,
  dataId,
}: Props) {
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = useForm();

  async function onSubmit() {
    if (dataId) {
      await confirm({ id: dataId });
      setIsOpen(false);
    }
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso irá deletar permanentemente
              esse dado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <Button disabled={isSubmitting} type="submit" className="lg:w-24">
              {isSubmitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin text-white" />
              ) : (
                "Continuar"
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
