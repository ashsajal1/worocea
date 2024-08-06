import { Button } from "@/components/ui/button";
import Link from "next/link";
Button

export default function Home() {

  return (
    <main>
      <h1>Welcome, this is home page!</h1>
      <Link href={'/ws'}>
        <Button>Go to workspace</Button>
      </Link>
    </main>
  );
}
