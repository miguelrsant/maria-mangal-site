import type { Metadata } from "next";
import InnerPage from "@/components/InnerPage";
import { paginaPorPath } from "@/lib/pages";
import { pageMeta } from "@/lib/meta";

const page = paginaPorPath("/contato")!;

export const metadata: Metadata = pageMeta(page);

export default function Page() {
  return <InnerPage page={page} />;
}
