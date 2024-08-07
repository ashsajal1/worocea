import { Button } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { workSpace } from "@/db/schema";
import Link from "next/link";

export default async function Home() {

  const data = await db.delete(workSpace).returning({
    id: workSpace.id
  })
  console.log(data)
  return (
    <main>
      <h1>Welcome, this is home page!</h1>
      <Link href={'/ws'}>
        <Button>Go to workspace</Button>
      </Link>
    </main>
  );
}
