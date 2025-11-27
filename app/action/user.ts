"use server"

import { PrismaClient } from "@prisma/client";
import { createClient } from "../auth/server"
import { handleError } from "@/lib/utils"

const prisma = new PrismaClient();


export const loginAction = async (email: string, password: string ) => {
    try {
        const { auth } = await createClient();

        const { error } = await auth.signInWithPassword ({
            email,
            password,
        });

        if (error) throw error;

        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}

export const logOutAction = async () => {
    try {
        const { auth } = await createClient();

        const { error } = await auth.signOut ();

        if (error) throw error;

        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}


export const signUpAction = async (email: string, password: string ) => {
    try {
        const { auth } = await createClient();

        const { data, error } = await auth.signUp ({
            email,
            password,
        });

        console.log(process.env.SUPABASE_URL);
        console.log(process.env.SUPABASE_PUBLISHABLE_KEY);

        console.log("SignUp data:", email, password, data);

        if (error) throw error;

        const userId = data.user?.id;
        // Add user to database
        await prisma.user.create({
            data: {
                id: userId,
                email,
            },
        });

        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}