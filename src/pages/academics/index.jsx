import PageLayout from "../../components/PageLayout";
import PlaceholderCard from "../../components/PlaceholderCard";

export function FscCS({ navigate }) {
  return (
    <PageLayout icon="💻" title="FSc Computer Science" breadcrumb="Academics → FSc Computer Science" navigate={navigate}>
      <PlaceholderCard
        icon="💻"
        title="This is the FSc Computer Science Page"
        description="Program details, course outline, admission criteria, and career pathways for FSc Computer Science students will be displayed here."
      />
    </PageLayout>
  );
}

export function PreMedical({ navigate }) {
  return (
    <PageLayout icon="🔬" title="Pre-Medical" breadcrumb="Academics → Pre-Medical" navigate={navigate}>
      <PlaceholderCard
        icon="🔬"
        title="This is the Pre-Medical Page"
        description="Full details about the Pre-Medical program including Biology, Chemistry, Physics subjects and medical entrance guidance."
      />
    </PageLayout>
  );
}

export function Arts({ navigate }) {
  return (
    <PageLayout icon="🎨" title="Arts" breadcrumb="Academics → Arts" navigate={navigate}>
      <PlaceholderCard
        icon="🎨"
        title="This is the Arts Page"
        description="Explore the Arts program covering humanities, social sciences, and liberal arts subjects offered at FG Degree College."
      />
    </PageLayout>
  );
}

export function BsCS({ navigate }) {
  return (
    <PageLayout icon="🖥️" title="BS Computer Science" breadcrumb="Academics → BS Computer Science" navigate={navigate}>
      <PlaceholderCard
        icon="🖥️"
        title="This is the BS Computer Science Page"
        description="Four-year BS degree in Computer Science — curriculum, faculty profiles, labs, and career prospects detailed here."
      />
    </PageLayout>
  );
}

export function BBA({ navigate }) {
  return (
    <PageLayout icon="📊" title="BBA" breadcrumb="Academics → BBA" navigate={navigate}>
      <PlaceholderCard
        icon="📊"
        title="This is the BBA Page"
        description="Bachelor of Business Administration — management, finance, marketing, and entrepreneurship tracks described here."
      />
    </PageLayout>
  );
}

export function BsPolSci({ navigate }) {
  return (
    <PageLayout icon="🏛️" title="BS Political Science" breadcrumb="Academics → BS Political Science" navigate={navigate}>
      <PlaceholderCard
        icon="🏛️"
        title="This is the BS Political Science Page"
        description="Study governance, international relations, and public policy in the BS Political Science program."
      />
    </PageLayout>
  );
}

export function BsEnglish({ navigate }) {
  return (
    <PageLayout icon="📚" title="BS English" breadcrumb="Academics → BS English" navigate={navigate}>
      <PlaceholderCard
        icon="📚"
        title="This is the BS English Page"
        description="Literature, linguistics, and communication — the BS English program nurtures critical thinking and writing excellence."
      />
    </PageLayout>
  );
}
