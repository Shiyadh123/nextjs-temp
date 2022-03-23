import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>appppp</title>
        <meta name="description" content="browse a huge list"></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin-Shiyadh:Shiyadh1212@cluster0.uzrul.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}).toArray();

  const meetupParsed = meetups.map((i) => ({
    title: i.data.title,
    image: i.data.image,
    address: i.data.address,
    id: i._id.toString(),
  }));

  await client.close();
  return {
    props: {
      meetups: meetupParsed,
    },
    revalidate: 1,
  };
}

export default HomePage;
