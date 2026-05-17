import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Shadow Garden",
  description:
    "Collect rare anime cards, battle in guilds, and rise through the ranks in Shadow Garden — the ultimate anime card RPG.",
  keywords: ["anime", "cards", "RPG", "guild", "pokemon", "shadow garden"],
  openGraph: {
    title: "Shadow Garden",
    description: "Collect rare anime cards and battle in the Shadow Garden",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0b1a12] text-white antialiased">
        <div className="flex min-h-screen">
          <Sidebar session={session} />
          <div className="flex-1 flex flex-col lg:ml-64">
            <Topbar session={session} />
            <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
