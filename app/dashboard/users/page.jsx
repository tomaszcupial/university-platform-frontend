const people = [
    { id: '1', name: 'Tomasz Cupiał', username: 'tomaszcupial', role: 'Student' },
    { id: '2', name: 'Anna Smith', username: 'annasmith', role: 'Lecturer' },
    { id: '3', name: 'John Doe', username: 'johndoe', role: 'Student' },
    { id: '4', name: 'Emily Johnson', username: 'emilyjohnson', role: 'Lecturer' },
    { id: '5', name: 'Michael Brown', username: 'michaelbrown', role: 'Student' },
    { id: '6', name: 'Sarah Thompson', username: 'sarahthompson', role: 'Lecturer' },
    { id: '7', name: 'David Lee', username: 'davidlee', role: 'Student' },
    { id: '8', name: 'Jessica Miller', username: 'jessicamiller', role: 'Lecturer' },
    { id: '9', name: 'Daniel Wilson', username: 'danielwilson', role: 'Student' },
    { id: '10', name: 'Jennifer Garcia', username: 'jennifergarcia', role: 'Admin' }
    // More people...
]

export default function Users() {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Użytkownicy</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Lista wszystkich użytkowników, zawierająca dane osobowe i rolę.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-lime-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                    >
                        Dodaj użytkownika
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                                    >
                                        Imię i nazwisko
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Nazwa użytkownika
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Rola
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                                        <span className="sr-only">Edytuj</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {people.map((person) => (
                                    <tr key={person.username}>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.id}</td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                            {person.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.username}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                                            <a href="#" className="text-lime-600 hover:text-lime-900">
                                                Edytuj<span className="sr-only">, {person.name}</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
