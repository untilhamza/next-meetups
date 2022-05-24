import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first meet up",
    image:
      "https://www.c-mw.net/wp-content/uploads/2019/06/steven-roe-991118-unsplash-800x500.jpg",
    address: "meetup address",
    description: "this is a first meet up",
  },
  {
    id: "m2",
    title: "A second meet up",
    image:
      "https://www.c-mw.net/wp-content/uploads/2019/06/steven-roe-991118-unsplash-800x500.jpg",
    address: "meetup address",
    description: "this is a second meet up",
  },
];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <>
      <Head>
        <title>Next Js Meetups</title>
        <meta
          name="description"
          content="A meetups web built by Kyamanywa Hamza. You can browse a huge list of highly active meetups"
        />
      </Head>
      <h1> Meet ups</h1>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// this code will only run on the server side to prepare the page during the build step

export async function getStaticProps() {
  //fetch data from api\
  //read data from fs
  const client = await MongoClient.connect(
    "mongodb+srv://hsanshine:WTBWk7qXMDYK414f@cluster0.rfedb.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    }, //props taht the page gests..
    revalidate: 3600, //seconds to wait to regenerate page with requests...
  };
}

//runs each time we get a request
//can even put credenitails... this oonly runs on the server
// export async function getServerSideProps(context) {
//   const req = context.req; //to get more data off the req to process it...
//   const res = context.res;
//   //fetch data from api
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
