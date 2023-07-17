import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function getSession() {
  const session = await getServerSession(options);
  return session;
}

export default function addUser() {
  async function addUser(formData) {
    "use server";
    const session = await getSession();
    const res = await fetch(`http://127.0.0.1:5002/api/add-course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: session.user.token,
      },
      body: JSON.stringify({
        name: formData.get("name"),
        description: formData.get("description"),
        id_user: session.user.id,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data", res);
    } else {
      return redirect("/admin/courses");
    }
    // const firstName = formData.get("first-name");
    // const role = formData.get("role");
    // console.log(role);
  }
  return (
    <form action={addUser}>
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Dodaj nowy kurs
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            Podaj dane nowego użytkownika i dodaj go do bazy danych.
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Nazwa
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Opis
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="description"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Anuluj
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
        >
          Zapisz
        </button>
      </div>
    </form>
  );
}
