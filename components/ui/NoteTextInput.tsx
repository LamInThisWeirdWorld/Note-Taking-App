"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./textarea";
import { ChangeEvent, useEffect } from "react";
import { debounceTimeout } from "@/lib/constants";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/app/action/note";

type Props = {
  noteId: string;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const { noteText, setNoteText } = useNote();

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(startingNoteText);
    }
  }, [noteIdParam, noteId, setNoteText, startingNoteText]);

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    setNoteText(text);

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateNoteAction(noteId, text);
    }, debounceTimeout);
  };
  return (
    <Textarea
      value={noteText}
      onChange={handleUpdateNote}
      placeholder="Type your note here..."
      className="custom-scrollbar placeholder:text-muted-foreground focus-visible; mb-4 h-full max-w-4xl resize-none border p-4 ring-0 focus-visible:ring-offset-0"
    />
  );
}

export default NoteTextInput;
