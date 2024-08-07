"use server";

import { db } from "@/db/drizzle";
import { WorkspaceForm } from "./ws-dialog";
import { workSpace } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createWorkSpace = async (data: WorkspaceForm) => {
  const userId = auth().userId;

  if (!userId) {
    throw new Error("Unauthorized access!");
  }
  // Add validation here
  const existingWorkspace = await db
    .select()
    .from(workSpace)
    .where(eq(workSpace.name, data.name))
    .limit(1);
  if (existingWorkspace.length) {
    throw new Error("Workspace already exists");
  }

  // Create workspace
  const newWorkSpace = await db
    .insert(workSpace)
    .values({
      id: 1,
      name: data.name,
      type: data.type,
      creatorId: userId!,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning({
      id: workSpace.id,
    });

  // Handle error
  if (!newWorkSpace) {
    throw new Error("Unable to create");
  } else {
    revalidatePath("/ws");
  }
};
