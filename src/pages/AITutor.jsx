import PageLayout from "../components/PageLayout";
import PlaceholderCard from "../components/PlaceholderCard";

export default function AITutor({ navigate }) {
  return (
    <PageLayout navigate={navigate} icon="🤖" title="AI Tutor" breadcrumb="AI Tutor">
      <PlaceholderCard
        icon="🤖"
        title="This is the AI Tutor Page"
        description="Ask any academic question and receive instant, accurate answers powered by artificial intelligence — available 24/7."
      />
    </PageLayout>
  );
}
