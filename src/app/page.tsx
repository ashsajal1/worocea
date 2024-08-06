import { db } from "@/db/drizzle";
import { workSpace } from "@/db/schema";
import { isNull } from "drizzle-orm";

export default async function Home() {
  const workspaces = await db.select().from(workSpace).where(isNull(workSpace.deletedAt));
  console.log(workspaces)
  return (
    <main>
      <h1>Welcome, this is home page!</h1>
    </main>
  );
}
