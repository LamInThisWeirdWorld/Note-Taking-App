import { getUser } from "@/app/auth/server";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Note, Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import SidebarGroupContent from "./ui/SidebarGroupContent";

const prisma = new PrismaClient();

async function AppSidebar() {
  const user = await getUser();

  let notes: Note[] = [];

  if (user) {
    notes = await prisma.note.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        updateAt: "desc",
      },
    });
  }

  return (
    <Sidebar>
      <SidebarGroup>
        <SidebarGroupLabel className="mt-2 mb-2 text-lg">
          {user ? (
            "Your Notes"
          ) : (
            <p>
              <Link href="/login" className="underline">
                Login
              </Link>{" "}
              to see your notes.
            </p>
          )}
        </SidebarGroupLabel>
        <SidebarContent className="custom-scrollbar"></SidebarContent>
        {user && <SidebarGroupContent notes={notes} />}
      </SidebarGroup>
    </Sidebar>
  );
}

export { AppSidebar };
