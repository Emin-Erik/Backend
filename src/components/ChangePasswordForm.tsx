"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewPasswordSchema } from "@/app/lib/schema";
import { Input } from "@/components/ui/input";
import { newPassword } from "@/actions/new-password";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@nextui-org/react";

const ChangePasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    {
      setError("");
      setSuccess("");

      startTransition(() => {
        newPassword(values, token).then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="******"
                  type="password"
                />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending} type="submit" className="w-full">
          Reset password
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
