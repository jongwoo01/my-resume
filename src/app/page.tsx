import ActivityList from "@/components/ActivityList";
import Competencies from "@/components/Competencies";
import CopyEmail from "@/components/CopyEmail";
import EducationList from "@/components/EducationList";
import ExperienceList from "@/components/ExperienceList";
import Hero from "@/components/Hero";
import PrintButton from "@/components/PrintButton";
import Section from "@/components/Section";
import SkillGroups from "@/components/SkillGroups";
import ToolGrid from "@/components/ToolGrid";
import { profile, sectionCopy } from "@/data/resume";
import { orderedTools } from "@/lib/tools";

export default function HomePage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    ...(profile.englishName ? { alternateName: profile.englishName } : {}),
    ...(profile.siteUrl ? { url: profile.siteUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main className="fade-in mx-auto w-full max-w-[1120px] flex-1 px-5 sm:px-8 lg:px-[72px]">
        {/* 1. 한 줄 소개와 대표 성과 */}
        <Hero />

        {/* 2. 핵심 역량 */}
        <Section
          id="competencies"
          label={sectionCopy.competencies.label}
          index={sectionCopy.competencies.index}
        >
          <Competencies />
        </Section>

        {/* 3. 경력·프로젝트 */}
        <Section
          id="experience"
          label={sectionCopy.experience.label}
          index={sectionCopy.experience.index}
        >
          <ExperienceList />
        </Section>

        {/* 4. AI 업무툴 포트폴리오 */}
        <Section
          id="tools"
          label={sectionCopy.tools.label}
          index={sectionCopy.tools.index}
        >
          <p className="mb-8 max-w-[60ch] break-keep text-[1.05rem] leading-[1.7] text-ink-soft">
            {sectionCopy.tools.lead}
          </p>
          <ToolGrid tools={orderedTools} />
        </Section>

        {/* 5. 학력·자격·어학 */}
        <Section
          id="education"
          label={sectionCopy.education.label}
          index={sectionCopy.education.index}
        >
          <EducationList />
        </Section>

        {/* 6. 직무 스킬 */}
        <Section
          id="skills"
          label={sectionCopy.skills.label}
          index={sectionCopy.skills.index}
        >
          <SkillGroups />
        </Section>

        {/* 7. 대외활동·수상 */}
        <Section
          id="activities"
          label={sectionCopy.activities.label}
          index={sectionCopy.activities.index}
        >
          <ActivityList />
        </Section>

        {/* 8. 연락 */}
        <Section
          id="contact"
          label={sectionCopy.contact.label}
          index={sectionCopy.contact.index}
        >
          <p className="max-w-[40ch] break-keep text-[1.05rem] leading-[1.7] text-ink-soft">
            {sectionCopy.contact.lead}
          </p>
          <p className="mt-3 font-mono text-[0.8rem] text-muted">
            근무 가능 지역 · {profile.location}
          </p>
          <div className="mt-8">
            <CopyEmail
              email={profile.email}
              subject={`${profile.name} 이력서 문의`}
              greeting={`안녕하세요, ${profile.name}님.\n\n`}
            />
          </div>
          <div className="mt-9 flex flex-wrap gap-6 font-mono text-[0.8rem] text-muted">
            <PrintButton
              label="PDF로 저장 (인쇄) ↓"
              className="cursor-pointer transition-colors hover:text-ink print:hidden"
            />
            {profile.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
