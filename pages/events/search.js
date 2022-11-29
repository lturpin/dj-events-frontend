import Layout from "@/components/Layout"
import EventsItem from "@/components/EventsItem"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index'


function SearchPage({ events }) {
  console.log('SearchPage:events', events)
  console.log('API_URL', API_URL)
  const router = useRouter()
  return (
    <Layout title="Search Results">
      <Link href='/events'>Go Back</Link>
      <h1>Search Results from {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.data.map((evt) => (
        <EventsItem key={evt.id} evt={evt.attributes} />
      ))}

    </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {
 
  const eventRes = await fetch(
    `${API_URL}/api/events?populate=*&filters[*][$containsi]=${term}`
  )
  const events = await eventRes.json();
  console.log('events:', events);
  return {
    props: { events }
  }
}
export default SearchPage