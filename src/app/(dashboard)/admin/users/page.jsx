import PersonImage from "@/app/components/PersonImage";
import clsx from "clsx";

import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { redirect } from "next/navigation";

const people = [
  {
    id: "1",
    first_name: "Tommy",
    last_name: "Cupiani",
    username: "tommycupiani",
    role: "Student",
    deleted: false,
  },
  {
    id: "2",
    first_name: "Emma",
    last_name: "Johnson",
    username: "emmajohnson",
    role: "Wykładowca",
    deleted: false,
  },
  {
    id: "3",
    first_name: "John",
    last_name: "Smith",
    username: "johnsmith",
    role: "Administrator",
    deleted: false,
  },
  {
    id: "4",
    first_name: "Sophia",
    last_name: "Miller",
    username: "sophiamiller",
    role: "Student",
    deleted: true,
  },
  {
    id: "5",
    first_name: "Oliver",
    last_name: "Brown",
    username: "oliverbrown",
    role: "Wykładowca",
    deleted: false,
  },
  {
    id: "6",
    first_name: "Emily",
    last_name: "Wilson",
    username: "emilywilson",
    role: "Student",
    deleted: false,
  },
  {
    id: "7",
    first_name: "Daniel",
    last_name: "Anderson",
    username: "danielanderson",
    role: "Wykładowca",
    deleted: false,
  },
  {
    id: "8",
    first_name: "Sophie",
    last_name: "Davis",
    username: "sophiedavis",
    role: "Administrator",
    deleted: false,
  },
  {
    id: "9",
    first_name: "Michael",
    last_name: "Taylor",
    username: "michaeltaylor",
    role: "Student",
    deleted: false,
  },
  {
    id: "10",
    first_name: "Ella",
    last_name: "Harris",
    username: "ellaharris",
    role: "Wykładowca",
    deleted: false,
  },
  // More people...
];

async function getSession() {
  const session = await getServerSession(options);
  return session;
}

async function getUsersList(token) {
  const res = await fetch(`http://127.0.0.1:5003/api/list-users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data", res);
  }
  return res.json();
}

export default async function Users() {
  const session = await getSession();

  console.log(session.user.token);
  async function deleteUser(formData) {
    "use server";
    const res = await fetch(`http://127.0.0.1:5003/api/delete-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: session.user.token,
      },
      body: JSON.stringify({
        id_user: formData.get("id"),
      }),
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data", res);
    } else {
      return redirect("/admin/users");
    }
  }

  const { success, users } = await getUsersList(session.user.token);
  // const data = await getUsersList(session.user.token);
  console.log(users);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Użytkownicy
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista wszystkich użytkowników zarejestrowanych w systemie,
            zawierająca dane osobowe, status i role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <a
            type="button"
            href="/admin/users/add"
            className="block rounded-md bg-lime-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
          >
            Dodaj użytkownika
          </a>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    id
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Imię i nazwisko
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rola
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Usuń</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users?.map((person) => (
                  <tr key={person.username}>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 sm:pl-0">
                      {person.id}
                    </td>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <PersonImage
                            firstName={person.first_name}
                            lastName={person.last_name}
                            className="h-11 w-11 text-lg"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{`${person.first_name} ${person.last_name}`}</div>
                          <div className="mt-1 text-gray-500">
                            {person.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="text-gray-900">{person.title}</div>
                                            <div className="mt-1 text-gray-500">{person.department}</div>
                                        </td> */}
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20",
                          person.deleted &&
                            "bg-red-50 text-red-700 ring-red-600/20"
                        )}
                      >
                        {person.deleted ? "Usunięty" : "Aktywny"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {person.role}
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <form action={deleteUser}>
                        <input type="hidden" name="id" value={person.id} />
                        <button
                          className="text-red-600 hover:text-red-900"
                          type="submit"
                        >
                          Usuń<span className="sr-only">, {person.name}</span>
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
