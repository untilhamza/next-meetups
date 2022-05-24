import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetUpPage() {
  const router = useRouter();
  async function handleAddMeetup(newMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);

    router.replace("/");
  }

  return (
    <>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add new meetups and create awesome experiences. A meetups web built by Kyamanywa Hamza. You can browse a huge list of highly active meetups"
        />
      </Head>
      <NewMeetupForm onAddMeetup={handleAddMeetup} />
    </>
  );
}

export default NewMeetUpPage;
