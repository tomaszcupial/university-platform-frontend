const stats = [
  { name: 'Ilość użytkowników', stat: '10' },
  { name: 'Ilość aktywnych użytkowników', stat: '90%' },
  { name: 'Ilość kursów', stat: '5' },
]

export default function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Statystyki</h1>
          <p className="mt-2 text-sm text-gray-700">
            Podstawowe statystyki systemu
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
