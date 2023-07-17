import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { redirect } from "next/navigation";

async function getSession() {
  const session = await getServerSession(options);
  return session;
}

export default async function Home() {
  const session = await getSession();
  console.log(session.user.role);

  if (session.user.role === "Administrator") {
    redirect("/admin");
  }
  if (session.user.role === "Wykladowca") {
    redirect("/lecturer");
  }
  if (session.user.role === "Student") {
    redirect("/student");
  }
}
