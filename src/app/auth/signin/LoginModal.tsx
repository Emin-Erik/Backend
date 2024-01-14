"use client";

import React, { useEffect, useState, useTransition } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Link,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import * as z from "zod";
import { LoginSchema } from "@/lib/schema";
import { login } from "@/actions/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function App() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { status } = useSession();
  const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setMessage("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setMessage(data.error);
          }

          if (data?.success) {
            form.reset();
            setMessage(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setMessage("Something went wrong"));
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
    }
  }, [status]);

  return (
    <>
      <ModalContent>
        {(onClose) => (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
                <ModalBody>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="john.doe@example.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Link color="primary" href="/auth/reset-password" size="sm">
                      Forgot password?
                    </Link>
                    <Button color="primary" type="submit">
                      Sign in
                    </Button>
                    <Button onClick={() => signIn("facebook")}>Facebook</Button>
                    <Button onClick={() => signIn("google")}>Google</Button>
                  </div>
                </ModalBody>
                <ModalFooter>{message}</ModalFooter>
              </form>
            </Form>
          </>
        )}
      </ModalContent>
    </>
  );
}
