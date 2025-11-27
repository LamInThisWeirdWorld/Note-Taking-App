"use client";
import { User } from "@supabase/supabase-js";

type Props = {
  user: User | null;
};

function AskAIButton({ user }: Props) {
  console.log(user?.email);
  return <button>Ask AI</button>;
}

export default AskAIButton;
