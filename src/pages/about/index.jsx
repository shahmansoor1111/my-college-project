import PageLayout from "../../components/PageLayout";
import PlaceholderCard from "../../components/PlaceholderCard";

export function Vision({ navigate }) {
  return (
    <PageLayout icon="🎯" title="Vision" breadcrumb="About FG → Vision" navigate={navigate}>
      <PlaceholderCard
        icon="🎯"
        title="This is the Vision Page"
        description="The long-term vision of FG Degree College Peshawar — our aspirations, core values, and educational goals for the community will be described here."
      />
    </PageLayout>
  );
}

export function Mission({ navigate }) {
  return (
    <PageLayout icon="🚀" title="Mission" breadcrumb="About FG → Mission" navigate={navigate}>
      <PlaceholderCard
        icon="🚀"
        title="This is the Mission Page"
        description="Our mission statement and core objectives that guide every academic and administrative decision at the college will be outlined here."
      />
    </PageLayout>
  );
}

export function History({ navigate }) {
  return (
    <PageLayout icon="📜" title="History" breadcrumb="About FG → History" navigate={navigate}>
      <PlaceholderCard
        icon="📜"
        title="This is the History Page"
        description="The rich history of FG Degree College from its founding in 1947 to the present day — milestones, achievements, and legacy will be documented here."
      />
    </PageLayout>
  );
}
