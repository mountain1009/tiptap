import { Tiptap } from "./_component/tiptap";
import { Quill } from "./_component/quill";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tiptap />
      {/* <Quill /> */}
    </main>
  );
}
