import PageLayout from "../components/PageLayout";
import PlaceholderCard from "../components/PlaceholderCard";

export default function Courses({ navigate }) {
  return (
    <PageLayout navigate={navigate} icon="📖" title="Courses" breadcrumb="Courses">
      <PlaceholderCard
        icon="📖"
        title="This is the Courses Page"
        description="All subjects, study materials, lecture notes, and resources for every program will be listed and accessible here."
      />
    </PageLayout>
  );
}
