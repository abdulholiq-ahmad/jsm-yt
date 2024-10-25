import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ErrorMessage } from "@/types";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { FC } from "react";

const ErrorAlert: FC<ErrorMessage> = ({ message }) => {
  return (
    <Alert variant="default" className="bg-red-500 absolute top-5 left-2/4 -translate-x-2/4 w-[350px]">
      <ExclamationTriangleIcon className="h-4 w-4" style={{ color: "white" }} />
      <AlertTitle className="text-white">Error</AlertTitle>
      <AlertDescription className="text-white">{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
