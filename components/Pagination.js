import Link from 'next/link'

export default function Pagination({meta, page}) {
  return (
    <>
       {page > 1 && (
      <Link href={`/events?page=${page - 1}`}>
        <a className='btn-secondary'>Prev</a>
      </Link>
    )}

    {page < meta.pagination.pageCount && (
      <Link href={`/events?page=${Number(page) + 1}`}>
        <a className='btn-secondary'>Next</a>
      </Link>
    )}
    </>
  ) 
}