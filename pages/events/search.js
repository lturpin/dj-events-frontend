import Layout from "@/components/Layout"
import EventsItem from "@/components/EventsItem"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API_URL } from "config"
import qs from 'qs'
// import Pagination from '@/components/Pagination'


function SearchPage({ events }) {
  const router = useRouter()
  return (
    <Layout title="Search Results">
      <Link href='/events'>Go Back</Link>
      <h1>Search Results from {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventsItem key={evt.id} evt={evt.attributes} />
      ))}

      {/* <Pagination page={page} total={total} /> */}
    </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {
  const query = qs.stringify({
    populate: '*',
    filters: {
      $or: [{
        name: {
          $contains: term
          }
      },
      {
        performers: {
          $contains: term
          }  
      },
      {
        descriptions: {
          $contains: term
          }
      },
      {
        venue: {
          $contains: term
          }
      }
    ]
    
    }
  })
  const eventRes = await fetch(
    `${API_URL}/api/events?${query}`
  )
  const events = await eventRes.json();

  return {
    props: { events: events.data.map(a => a) }
  }
}
export default SearchPage