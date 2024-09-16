import EditTopicForm from "@/components/EditTopicForm";

const getTopicById = async (id) => {
  const apiUrl = process.env.API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null; // Return null in case of an error
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;
  const topicData = await getTopicById(id);

  // Check if topicData exists and is valid
  if (!topicData || !topicData.topic) {
    return <div>Topic not found or an error occurred.</div>;
  }

  const { title, description } = topicData.topic;

  return <EditTopicForm id={id} title={title} description={description} />;
}
