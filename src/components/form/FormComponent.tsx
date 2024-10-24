import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { useLogInRequestMutation } from "@/redux/api/auth-api";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/redux/slice/auth-slice";
import { useDispatch } from "react-redux";
import ErrorAlert from "../alert/ErrorAlert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const formSchema = z.object({
  username: z.string().min(3).max(50, "Username must be between 3 and 50 characters long."),
  password: z.string().min(6).max(30, "Password must be between 6 and 30 characters long."),
});

const FormComponent: React.FC = () => {
  const [logInRequest, { data, isSuccess, isLoading, isError, error }] = useLogInRequestMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    logInRequest(values);
    if (isSuccess) {
      navigate("/");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      const accessToken = data?.accessToken;
      if (accessToken) {
        dispatch(signIn(accessToken));
        navigate("/");
      } else if (isError) {
        console.error("Error:", error);
      }
    }
  }, [isSuccess, data, dispatch, navigate, error, isError]);

  return (
    <>
      {isError && (
        <div className="absolute top-5 left-2/4 -translate-x-2/4 w-[300px]">
          <ErrorAlert message={(error as FetchBaseQueryError)?.data?.message || (error as SerializedError)?.message} />
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="text-white">
                <FormLabel className="text-[#EFEFEF]">Username or Email</FormLabel>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#EFEFEF]">Password</FormLabel>
                <FormControl className="text-white">
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
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default FormComponent;
