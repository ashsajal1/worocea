import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { workSpace } from "@/db/schema";
import { isNull } from "drizzle-orm";

export default async function WS() {
    const workspaces = await db.select().from(workSpace).where(isNull(workSpace.deletedAt));

    if (!workspaces.length) {
      return <>
        <h1>No workspaces found</h1>
        <Button>Create workspace</Button>
      </>
    }
  return (
    <div>WS</div>
  )
}
