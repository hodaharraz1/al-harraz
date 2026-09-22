import Link from 'next/link'

export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-navy-900/70">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center gap-1">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {index === items.length - 1 ? (
              <span aria-current="page" className="font-medium text-navy-950">
                {item.name}
              </span>
            ) : (
              <Link href={item.url} className="hover:text-cyan-600">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
