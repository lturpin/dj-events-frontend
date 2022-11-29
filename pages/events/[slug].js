import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventMap from '@/components/EventMap';
import Layout from '@/components/Layout';
import {BsArrowLeft } from 'react-icons/bs';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from 'config';
import { useRouter } from 'next/router';

function EventPage({evt}) {
  const router = useRouter();
  const { id } = evt.data[0];
  const { attributes } = evt.data[0];
  
  return (
    <Layout>
      <div className={styles.event}>
       
        <span>
          {new Date(attributes.date).toLocaleDateString('en-GB')} at {attributes.time}
        </span>
        <h1>{attributes.name}</h1>
        <ToastContainer />
        {attributes.image.data && (
          <div className={styles.image}>
            <Image src={attributes.image.data.attributes.formats.medium.url}
            alt="medium size event"
             width={960} 
             height={600} 
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{attributes.performers}</p>
        <h3>Description:</h3>
        <p>{attributes.description}</p>
        <h3>Venue: {attributes.venue}</h3>
        <p>{attributes.address}</p>

        <EventMap evt={evt} />

        <Link href='/events'>
          <a className={styles.back}>
            <BsArrowLeft /> Go Back
          </a>
        </Link>
      </div>
    </Layout>
  )
}
export default EventPage

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events`)
//   const events = await res.json();
//   const newEvt = events.data.map(({id, ...attributes}) => ({id, ...attributes}));
//   const paths = newEvt.map(evt => ({
//     params: {slug: evt.attributes.slug}
//   }))

//   return {
//     paths,
//     fallback: true
//   }
// }

// export async function getStaticProps({params: {slug}}) {
//   console.log('getStaticProps:slug', slug);
//   const res = await fetch(`${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`)
//   const events = await res.json()
//   return {
//     props: {
//       evt: events
//     },
//     revalidate: 1
//   }
// }

export async function getServerSideProps({query: {slug}}) {
  const { NEXT_PUBLIC_API_URL} = process.env
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/events/?populate=*&filters[slug][$eq]=${slug}`)
  const events = await res.json()
  return {
    props: {
      evt: events
    }
  }
}