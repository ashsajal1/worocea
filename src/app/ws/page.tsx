import { db } from "@/db/drizzle";
import { workSpace } from "@/db/schema";
import { isNull } from "drizzle-orm";
import WsDialog from "./ws-dialog";

export default async function WS() {
    const workspaces = await db.select().from(workSpace).where(isNull(workSpace.deletedAt));

    if (!workspaces.length) {
      return <>
        <h1>No workspaces found</h1>
        <WsDialog />
      </>
    }
  return (
    <div>WS</div>
  )
}
