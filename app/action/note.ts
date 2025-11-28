"use server"

import { handleError } from "@/lib/utils"
import { getUser } from "../auth/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNoteAction = async (noteId: string ) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to create a note");

        await prisma.note.create({
            data: { 
                id: noteId,
                authorId: user.id,
                text: ""
             },     
        })

        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}

export const updateNoteAction = async (noteId: string, text: string ) => {
    try {
        const user = await getUser();

        await prisma.note.update({
            where: { id : noteId},
            data: { text },     
        })

        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}

export const deleteNoteAction = async (noteId: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to delete a note");

        await prisma.note.delete({
            where: { id : noteId, authorId : user.id}, 
        })

        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}