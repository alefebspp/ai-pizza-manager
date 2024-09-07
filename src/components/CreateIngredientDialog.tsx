"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, PlusIcon } from "lucide-react";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  createIngredient,
  getIngredient,
  updateIngredient,
} from "~/actions/ingredients";
import { useToast } from "~/hooks/use-toast";
import { useDataTableContext } from "~/contexts/dataTableContext";

const schema = z.object({
  name: z.string({ message: "Campo obrigatório" }),
  quantity: z.coerce
    .number({ message: "Campo obrigatório" })
    .min(1, { message: "O valor deve ser maior que 1" }),
});

export default function CreateIngredientDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toUpdateDataId, setToUpdateDataId } = useDataTableContext();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    toast({
      title: "Sucesso",
      description: "Ação realizada com sucesso",
      variant: "success",
    });
  };
  const onError = () => {
    setIsOpen(false);
    toast({
      title: "Erro",
      description: "Não foi possível realizar a ação. Tente novamente",
      variant: "destructive",
    });
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      quantity: undefined,
    },
    mode: "onChange",
  });

  const { data: ingredient } = useQuery({
    queryKey: ["ingredient"],
    queryFn: () => {
      if (toUpdateDataId) {
        const ingredient = getIngredient(toUpdateDataId);
        return ingredient;
      }
    },
    enabled: !!toUpdateDataId,
  });

  const { mutateAsync: createIngredientMutate } = useMutation({
    mutationFn: createIngredient,
    onSuccess,
    onError,
  });

  const { mutateAsync: updateIngredientMutate } = useMutation({
    mutationFn: updateIngredient,
    onSuccess,
    onError,
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  async function onSubmit(values: z.infer<typeof schema>) {
    if (toUpdateDataId) {
      await updateIngredientMutate({ id: toUpdateDataId, data: values });
    } else {
      await createIngredientMutate(values);
    }
    setIsOpen(false);
    reset();
  }

  useEffect(() => {
    if (toUpdateDataId) {
      setIsOpen(true);
    }
  }, [toUpdateDataId]);

  useEffect(() => {
    if (!isOpen && !!ingredient) {
      setToUpdateDataId(undefined);
      reset({
        name: "",
        quantity: undefined,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (ingredient && toUpdateDataId) {
      reset({
        name: ingredient.name || "",
        quantity: ingredient.quantity || undefined,
      });
    }
  }, [ingredient]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex h-10 appearance-none items-center justify-center rounded-lg border border-input bg-white px-2">
          <PlusIcon className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>
            {toUpdateDataId ? "Atualizar" : "Criar"} ingrediente
          </DialogTitle>
          <DialogDescription>
            Essa ação irá {toUpdateDataId ? "atualizar" : "criar"} um
            ingrediente
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do ingrediente</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Cebola" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isSubmitting}
              className="w-full lg:mx-auto lg:w-1/2"
              type="submit"
            >
              {isSubmitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin text-white" />
              ) : toUpdateDataId ? (
                "Atualizar"
              ) : (
                "Criar"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
