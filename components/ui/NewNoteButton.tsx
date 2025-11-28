"use client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { debounceTimeout } from "@/lib/constants";
import { createNoteAction } from "@/app/action/note";

type Props = {
  user: User | null;
};

function NewNoteButton({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);

      const savingToast = toast("Saving Current Note", {
        description: "Saving your current note before creating a new one",
      });

      await new Promise((resolve) =>
        setTimeout(resolve, debounceTimeout + 500),
      );

      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`);

      toast.dismiss(savingToast);

      toast.success("New Note Created", {
        description: "You have created a new note",
      });

      setLoading(false);
    }
  };
  return (
    <Button
      onClick={handleClickNewNoteButton}
      variant="secondary"
      className="w-24"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}

export default NewNoteButton;
