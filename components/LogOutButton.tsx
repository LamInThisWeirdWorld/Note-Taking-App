"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logOutAction } from "@/app/action/user";

function LogOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    setLoading(true);

    const errorMessage = await logOutAction();

    if (!errorMessage) {
      toast.success("Logged out successfully");
      router.push("/");
    } else {
      toast.error("Error logging out: " + errorMessage);
    }

    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      className="w-24"
      onClick={handleLogOut}
      disabled={loading}
    >
      {" "}
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogOutButton;
