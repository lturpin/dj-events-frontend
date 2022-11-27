import Layout from "@/components/Layout"
import EventsItem from "@/components/EventsItem"
import { API_URL, PER_PAGE } from "@/config/index"
import Pagination from "@/components/Pagination"



function EventsPage({ events, meta, page }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventsItem key={evt.id} evt={evt.attributes} />
      ))}

    <Pagination meta={meta} page={page} />
    </Layout>
  )
}

export async function getServerSideProps({query: {page = 1}}) {
  // Calculate start page
  const start = +page === 1 ? 0 : (page - 1) * PER_PAGE
  const eventRes = await fetch(
    `${API_URL}/api/events?populate=*&sort=date:asc&pagination[pageSize]=${PER_PAGE}&pagination[page]=${page}`
  )
  const events = await eventRes.json();

  return {
    props: { 
      events: events.data.map(a => a),
      meta: events.meta,
      page
   }
  }
}
export default EventsPage