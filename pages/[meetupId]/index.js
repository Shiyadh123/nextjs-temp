import { React } from "react";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const page = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.data.title}</title>
      </Head>
      <MeetupDetail
        id={props.meetupData._id}
        image={props.meetupData.data.image}
        title={props.meetupData.data.title}
        address={props.meetupData.data.address}
        description={props.meetupData.data.description}
      ></MeetupDetail>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const id = context.params.meetupId;
  //fetch dta for a single meetupret
  const client = await MongoClient.connect(
    "mongodb+srv://admin-Shiyadh:Shiyadh1212@cluster0.uzrul.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetup = await meetupsCollection.findOne({ _id: ObjectId(id) });
  console.log(meetup);

  client.close();

  return {
    props: {
      meetupData: {
        ...meetup,
        _id: meetup._id.toString(),
      },
    },
  };
}

export async function getStaticPaths() {
  //
  const client = await MongoClient.connect(
    "mongodb+srv://admin-Shiyadh:Shiyadh1212@cluster0.uzrul.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetupsId = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  const pathsIds = meetupsId.map((i) => {
    return { params: { meetupId: i._id.toString() } };
  });

  return {
    fallback: true,
    paths: pathsIds,
  };
}

export default page;
