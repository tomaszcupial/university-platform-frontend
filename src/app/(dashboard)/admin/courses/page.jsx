import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { redirect } from "next/navigation";

const courses = [
  {
    id: "1",
    name: "C# dla początkujących",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolorem culpa beatae fuga quae hic.",
    owner: "Tommy Cupiani",
  },
  {
    id: "2",
    name: "Python dla programistów",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolorem culpa beatae fuga quae hic.",
    owner: "Emma Johnson",
  },
  {
    id: "3",
    name: "JavaScript od podstaw",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolorem culpa beatae fuga quae hic.",
    owner: "John Smith",
  },
  {
    id: "4",
    name: "Java dla zaawansowanych",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolorem culpa beatae fuga quae hic.",
    owner: "Sophia Miller",
  },
  {
    id: "5",
    name: "HTML i CSS - kurs praktyczny",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolorem culpa beatae fuga quae hic.",
    owner: "Oliver Brown",
  },
  // More courses...
];

async function getSession() {
  const session = await getServerSession(options);
  return session;
}

async function getCoursesList(token) {
  const res = await fetch(`http://127.0.0.1:5001/api/courses/list`, {
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

export default async function Courses() {
  const session = await getSession();

  async function deleteCourse(formData) {
    "use server";
    const res = await fetch(`http://127.0.0.1:5002/api/delete-course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: session.user.token,
      },
      body: JSON.stringify({
        id_course: formData.get("id"),
      }),
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    // Recommendation: handle errors

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data", res);
    } else {
      return redirect("/admin/courses");
    }
  }

  const { success, data } = await getCoursesList(session.user.token);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Kursy
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista wszystkich kursów zarejestrowanych w systemie.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <a
            type="button"
            href="/admin/courses/add"
            className="block rounded-md bg-lime-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
          >
            Dodaj kurs
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
                    Nazwa kursu
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Opis kursu
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Właściciel kursu
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Usuń</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data[0]?.map((course) => (
                  <tr key={course.username}>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 sm:pl-0">
                      {course.id}
                    </td>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm font-medium text-gray-900">
                      {course.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {course.description.substring(0, 20)}...
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      Użytkownik z id: {course.id_user}
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <form action={deleteCourse}>
                        <input type="hidden" name="id" value={course.id} />
                        <button
                          className="text-red-600 hover:text-red-900"
                          type="submit"
                        >
                          Usuń<span className="sr-only">, {course.name}</span>
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
