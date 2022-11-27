import Head from 'next/head';
import Layout from '@/components/Layout';
import EventsItem from '@/components/EventsItem';
import { API_URL } from 'config';
import Link from 'next/link';

export default function HomePage({events}) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => {
        return  <EventsItem key={evt.id} evt={evt.attributes} />
      })}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>
            View All Events
          </a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  // const {NEXT_PUBLIC_API_URL} = process.env;
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=date:asc`);
  const events = await res.json();

  return {
    props: {events: events.data.map(a => a).slice(0, 3) },
    revalidate: 1
  }
}
