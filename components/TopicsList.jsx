import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  const apiUrl = process.env.API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data = await res.json();

    // Ensure that `data` has the expected structure
    return data && Array.isArray(data.topics) ? data.topics : [];
  } catch (error) {
    console.log("Error loading topics: ", error);
    return []; // Return an empty array in case of error
  }
};

export default async function TopicsList() {
  const topics = await getTopics(); // No need to destructure if we just return an array

  if (!topics || topics.length === 0) {
    return <div>No topics available</div>; // Render a fallback UI when no topics are available
  }

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
