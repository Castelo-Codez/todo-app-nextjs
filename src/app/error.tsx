"use client";

import { useEffect } from "react";
import { clearError } from "../../lib/store";
import { useAppDispatch } from "../../lib/hooks";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const appDisp = useAppDispatch();
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);
  return (
    <div className=" flex flex-col justify-center items-center min-h-screen">
      <h2 className=" text-red-400 text-[2rem]">{error.message}</h2>
      <button
        className=" cursor-pointer mt-4 p-2 border border-red-400 text-red-400"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            appDisp(clearError({ status: false }));
            reset();
          }
        }
      >
        Try again
      </button>
    </div>
  );
}
