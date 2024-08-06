"use server"

import { db } from "@/db/drizzle"
import { WorkspaceForm } from "./ws-dialog"
import { workSpace } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

const userId = auth().userId;

export const createWorkSpace = async (data: WorkspaceForm) => {
    // Add validation here
    const existingWorkspace = await db.select().from(workSpace).where(eq(workSpace.name, data.name)).limit(1);
    if (existingWorkspace.length) {
        throw new Error('Workspace already exists');
    }

    // Create workspace
    const newWorkSpace = await db.insert(workSpace).values({
        id: 1,
        name: data.name,
        creatorId: userId!,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).returning({
        id: workSpace.id
    })

    // Handle error 
    if(!newWorkSpace) {
        throw new Error("Unable to create")
    } else {
        revalidatePath("/ws")
    }

}