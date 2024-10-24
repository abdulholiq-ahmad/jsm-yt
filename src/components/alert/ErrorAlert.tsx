import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ErrorMessage } from "@/types";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { FC } from "react";

const ErrorAlert: FC<ErrorMessage> = ({ message }) => {
  return (
    <Alert variant="destructive" className="bg-[#09090A]">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
