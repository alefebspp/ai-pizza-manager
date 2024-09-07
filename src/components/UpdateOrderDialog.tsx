"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

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
} from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useToast } from "~/hooks/use-toast";
import { useDataTableContext } from "~/contexts/dataTableContext";
import { getOrder, updateOrder } from "~/actions/orders";

const schema = z.object({
  status: z.string({ message: "Campo obrigatório" }),
});

export default function UpdateOrderDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toUpdateDataId, setToUpdateDataId } = useDataTableContext();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => {
      if (toUpdateDataId) {
        const order = getOrder(toUpdateDataId);
        return order;
      }
    },
    enabled: !!toUpdateDataId,
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: order?.orderInfos?.status || "",
    },
    mode: "onChange",
  });

  const { mutateAsync } = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
      toast({
        title: "Sucesso",
        description: "Ação realizada com sucesso",
        variant: "success",
      });
    },
    onError: () => {
      setIsOpen(false);
      toast({
        title: "Erro",
        description: "Não foi possível realizar a ação. Tente novamente",
        variant: "destructive",
      });
    },
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  async function onSubmit(values: z.infer<typeof schema>) {
    if (toUpdateDataId) {
      await mutateAsync({ status: values.status, id: toUpdateDataId });
      setIsOpen(false);
      reset();
    }
  }

  useEffect(() => {
    if (toUpdateDataId) {
      setIsOpen(true);
    }
  }, [toUpdateDataId]);

  useEffect(() => {
    if (!isOpen && !!order) {
      setToUpdateDataId(undefined);
      reset({
        status: "",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("ORDER:", order);
    if (order && toUpdateDataId) {
      reset({
        status: order.orderInfos?.status || "",
      });
    }
  }, [order]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>Atualizar status do pedido</DialogTitle>
          <DialogDescription>
            O status irá informar ao usuário a situação atual de seu pedido
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex h-56 w-full items-center justify-center">
            <LoaderCircle className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full flex-col space-y-8"
            >
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Status do pedido</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={order?.orderInfos?.status || ""}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cancelled" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Cancelado
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="pending" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Em preparo
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="out_for_delivery" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Saiu para entrega
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="finished" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Finalizado
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
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
                ) : (
                  "Atualizar"
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
