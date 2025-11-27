"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./textarea";
import { ChangeEvent } from "react";

type Props = {
  noteId: string;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const { noteId, setNodeId } = useNote();

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNoteText(text);
    clearTimeout = setTimeout(() => {
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
