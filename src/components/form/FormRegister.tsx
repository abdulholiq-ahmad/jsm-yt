import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { useRegisterRequestMutation } from "@/redux/api/auth-api";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../alert/ErrorAlert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface FormRegisterProps {
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

const formSchema = z.object({
  firstname: z.string().min(3, "Firstname is required").max(50, "Firstname must be less than 50 characters"),
  lastname: z.string().min(3, "Lastname is required").max(50, "Lastname must be less than 50 characters"),
  username: z.string().min(3, "Username is required").max(50, "Username must be less than 50 characters"),
  email: z.string().min(6, "Email is required").max(50, "Email must be less than 50 characters").email("Invalid email address"),
  password: z.string().min(6, "Password is required").max(50, "Password must be less than 50 characters"),
});

const FormRegister: React.FC = () => {
  const [register, { isSuccess, isLoading, isError, error }] = useRegisterRequestMutation<FormRegisterProps>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const { firstname, lastname, ...rest } = values;
    const fullName = `${firstname} ${lastname}`;

    const response = await register({
      ...rest,
      full_name: fullName,
    });

    if (response.data) {
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    if (isError) {
      console.error("Error:", error);
    }
  }, [isError, error]);

  return (
    <Form {...form}>
      {error && isError ? <ErrorAlert message={error?.data?.message} /> : null}
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel className="text-[#EFEFEF]">Firstname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Firstname"
                  {...field}
                  className="border-none bg-[#1F1F22] placeholder:text-slate-300 rounded-sm py-6 ps-4 ring-2 ring-transparent focus-visible:ring-[#877EFF]"
                />
              </FormControl>
              <FormMessage className="text-red-400">{form.formState.errors.firstname?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel className="text-[#EFEFEF]">Lastname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Lastname"
                  {...field}
                  className="border-none bg-[#1F1F22] placeholder:text-slate-300 rounded-sm py-6 ps-4 ring-2 ring-transparent focus-visible:ring-[#877EFF]"
                />
              </FormControl>
              <FormMessage className="text-red-400">{form.formState.errors.lastname?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel className="text-[#EFEFEF]">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  className="border-none bg-[#1F1F22] placeholder:text-slate-300 rounded-sm py-6 ps-4 ring-2 ring-transparent focus-visible:ring-[#877EFF]"
                />
              </FormControl>
              <FormMessage className="text-red-400">{form.formState.errors.username?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel className="text-[#EFEFEF]">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  {...field}
                  className="border-none bg-[#1F1F22] placeholder:text-slate-300 rounded-sm py-6 ps-4 ring-2 ring-transparent focus-visible:ring-[#877EFF]"
                />
              </FormControl>
              <FormMessage className="text-red-400">{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="text-white">
              <FormLabel className="text-[#EFEFEF]">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  className="border-none bg-[#1F1F22] placeholder:text-slate-300 rounded-sm py-6 ps-4 ring-2 ring-transparent focus-visible:ring-[#877EFF]"
                />
              </FormControl>
              <FormMessage className="text-red-400">{form.formState.errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" className="bg-[#877EFF] w-full py-5 rounded-sm hover:bg-[#6F66E6] focus-visible:bg-[#6F66E6]/7">
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormRegister;
