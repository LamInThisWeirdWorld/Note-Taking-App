"use client";

import { Note } from "@prisma/client";
import {
  SidebarGroupContent as SidebarGroupContentShadCN,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import Fuse from "fuse.js";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";

type Props = {
  notes: Note[];
};

function SidebarGroupContent({ notes }: Props) {
  const [searchText, setSearchText] = useState("");
  const [localNotes, setlocalNotes] = useState(notes);

  useEffect(() => {
    setlocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, [localNotes]);

  const deletNoteLocally = (noteId: string) => {
    setlocalNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId),
    );
  };

  const filterNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;

  return (
    <SidebarGroupContentShadCN>
      <div className="relative flex items-center">
        <SearchIcon className="left-e absolute size-4" />
        <Input
          className="bg-muted pl-8"
          placeholder="Search your notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <SidebarMenu className="mt-4">
        {filterNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group/item">
            <SelectNoteButton note={note} />

            <DeleteNoteButton
              noteId={note.id}
              deleteNoteLocally={deletNoteLocally}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContentShadCN>
  );
}

export default SidebarGroupContent;
