import type {
  ResumeData,
  ResumeHeader,
  WorkExperience,
  Education,
  SkillCategory,
  Project,
  Certification,
} from '@/types/resume'

/**
 * 单栏布局变体。
 * 所有视觉来自 --resume-* CSS 变量，不写死任何品牌色。
 * 字体走 var(--font-display) / var(--font-body)，圆角走 var(--resume-radius)。
 */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-sm font-bold uppercase tracking-[0.2em] mb-4 pb-2"
      style={{
        color: 'var(--resume-foreground)',
        borderBottom: '1px solid var(--resume-border)',
        fontFamily: 'var(--font-display)',
      }}
    >
      {children}
    </h3>
  )
}

function HeaderView({ header }: { header: ResumeHeader }) {
  return (
    <header
      className="mb-8 pb-6"
      style={{ borderBottom: '2px solid var(--resume-foreground)' }}
    >
      <h1
        className="text-4xl font-bold tracking-tight"
        style={{ color: 'var(--resume-foreground)', fontFamily: 'var(--font-display)' }}
      >
        {header.name}
      </h1>
      <p
        className="mt-1 text-lg"
        style={{ color: 'var(--resume-primary)', fontFamily: 'var(--font-body)' }}
      >
        {header.title}
      </p>
      <div
        className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs"
        style={{ color: 'var(--resume-muted-foreground)', fontFamily: 'var(--font-body)' }}
      >
        {header.email && <span>{header.email}</span>}
        {header.phone && <span>{header.phone}</span>}
        {header.location && <span>{header.location}</span>}
        {header.website && <span>{header.website}</span>}
      </div>
    </header>
  )
}

function SummaryView({ summary }: { summary: string }) {
  if (!summary) return null
  return (
    <section className="mb-8">
      <SectionTitle>职业概述</SectionTitle>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--resume-foreground)', fontFamily: 'var(--font-body)' }}
      >
        {summary}
      </p>
    </section>
  )
}

function ExperienceView({ experience }: { experience: WorkExperience[] }) {
  if (!experience?.length) return null
  return (
    <section className="mb-8">
      <SectionTitle>工作经历</SectionTitle>
      <div className="space-y-5">
        {experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-baseline gap-4">
              <div>
                <h4
                  className="text-base font-bold"
                  style={{ color: 'var(--resume-foreground)', fontFamily: 'var(--font-display)' }}
                >
                  {exp.position}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: 'var(--resume-primary)', fontFamily: 'var(--font-body)' }}
                >
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ''}
                </p>
              </div>
              <span
                className="text-xs whitespace-nowrap px-2 py-0.5"
                style={{
                  color: 'var(--resume-muted-foreground)',
                  background: 'var(--resume-muted)',
                  borderRadius: 'var(--resume-radius)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {exp.startDate} — {exp.endDate}
              </span>
            </div>
            {exp.description && (
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: 'var(--resume-foreground)', fontFamily: 'var(--font-body)' }}
              >
                {exp.description}
              </p>
            )}
            {exp.achievements?.length ? (
              <ul className="mt-2 space-y-1">
                {exp.achievements.map((a, i) => (
                  <li
                    key={i}
                    className="text-sm flex gap-2"
                    style={{ color: 'var(--resume-foreground)', fontFamily: 'var(--font-body)' }}
                  >
                    <span style={{ color: 'var(--resume-primary)' }}>—</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {exp.techStack?.length ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5"
                    style={{
                      color: 'var(--resume-secondary-foreground)',
                      background: 'var(--resume-secondary)',
                      border: '1px solid var(--resume-border)',
                      borderRadius: 'var(--resume-radius)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectsView({ projects }: { projects?: Project[] }) {
  if (!projects?.length) return null
  return (
    <section className="mb-8">
      <SectionTitle>项目经验</SectionTitle>
      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.id}>
            <div className="flex justify-between items-baseline gap-4">
              <h4
                className="text-base font-bold"
                style={{ color: 'var(--resume-foreground)', fontFamily: 'var(--font-display)' }}
              >
                {p.name}
              </h4>
              {p.link && (
                <span
                  className="text-xs"
                  style={{ color: 'var(--resume-primary)', fontFamily: 'var(--font-body)' }}
                >
                  {p.link}
                </span>
              )}
            </div>
            {p.description && (
              <p
                className="mt-1 text-sm leading-relaxed"
                style={{ color: 'var(--resume-foreground)', fontFamily: 'var(--font-body)' }}
              >
                {p.description}
              </p>
            )}
            {p.achievements?.length ? (
              <ul className="mt-1.5 space-y-1">
                {p.achievements.map((a, i) => (
                  <li
                    key={i}
                    className="text-sm flex gap-2"
                    style={{ color: 'var(--resume-foreground)', fontFamily: 'var(--font-body)' }}
                  >
                    <span style={{ color: 'var(--resume-primary)' }}>—</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {p.techStack?.length ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5"
                    style={{
                      color: 'var(--resume-secondary-foreground)',
                      background: 'var(--resume-secondary)',
                      border: '1px solid var(--resume-border)',
                      borderRadius: 'var(--resume-radius)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function EducationView({ education }: { education: Education[] }) {
  if (!education?.length) return null
  return (
    <section className="mb-8">
      <SectionTitle>教育背景</SectionTitle>
      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="flex justify-between items-baseline gap-4">
            <div>
              <h4
                className="text-base font-bold"
                style={{ color: 'var(--resume-foreground)', fontFamily: 'var(--font-display)' }}
              >
                {edu.school}
              </h4>
              <p
                className="text-sm"
                style={{ color: 'var(--resume-muted-foreground)', fontFamily: 'var(--font-body)' }}
              >
                {edu.degree} · {edu.major}
                {edu.gpa ? ` · GPA ${edu.gpa}` : ''}
              </p>
              {edu.honors?.length ? (
                <p
                  className="text-sm mt-0.5"
                  style={{ color: 'var(--resume-muted-foreground)', fontFamily: 'var(--font-body)' }}
                >
                  {edu.honors.join('、')}
                </p>
              ) : null}
            </div>
            <span
              className="text-xs whitespace-nowrap"
              style={{ color: 'var(--resume-muted-foreground)', fontFamily: 'var(--font-body)' }}
            >
              {edu.startDate} — {edu.endDate}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function SkillsView({ skills }: { skills: SkillCategory[] }) {
  if (!skills?.length) return null
  return (
    <section className="mb-8">
      <SectionTitle>技能专长</SectionTitle>
      <div className="space-y-3">
        {skills.map((cat) => (
          <div key={cat.name}>
            <h4
              className="text-sm font-bold mb-1.5"
              style={{ color: 'var(--resume-primary)', fontFamily: 'var(--font-display)' }}
            >
              {cat.name}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-0.5"
                  style={{
                    color: 'var(--resume-secondary-foreground)',
                    background: 'var(--resume-secondary)',
                    border: '1px solid var(--resume-border)',
                    borderRadius: 'var(--resume-radius)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CertificationsView({ certifications }: { certifications?: Certification[] }) {
  if (!certifications?.length) return null
  return (
    <section className="mb-8">
      <SectionTitle>认证证书</SectionTitle>
      <div className="space-y-2">
        {certifications.map((cert) => (
          <div key={cert.id} className="flex justify-between items-baseline gap-4">
            <div>
              <h4
                className="text-sm font-bold"
                style={{ color: 'var(--resume-foreground)', fontFamily: 'var(--font-display)' }}
              >
                {cert.name}
              </h4>
              <p
                className="text-xs"
                style={{ color: 'var(--resume-muted-foreground)', fontFamily: 'var(--font-body)' }}
              >
                {cert.issuer}
                {cert.credentialId ? ` · ${cert.credentialId}` : ''}
              </p>
            </div>
            <span
              className="text-xs whitespace-nowrap"
              style={{ color: 'var(--resume-muted-foreground)', fontFamily: 'var(--font-body)' }}
            >
              {cert.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function SingleColumnLayout({ data }: { data: ResumeData }) {
  return (
    <div className="max-w-3xl mx-auto px-10 py-12">
      <HeaderView header={data.header} />
      <SummaryView summary={data.summary} />
      <ExperienceView experience={data.experience} />
      <ProjectsView projects={data.projects} />
      <EducationView education={data.education} />
      <SkillsView skills={data.skills} />
      <CertificationsView certifications={data.certifications} />
    </div>
  )
}
