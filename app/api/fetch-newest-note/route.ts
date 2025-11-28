import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("userId") || "";

    const newestNoteId = await prisma.note.findFirst({
        where: {
            authorId: userId,
        },
        orderBy: {
            createAt: "desc",
        },
        select: {
            id: true,
        },

    });

    return NextResponse.json ({
        newestNoteId: newestNoteId?.id,
    })
}