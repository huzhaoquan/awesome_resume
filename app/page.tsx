import { homepageTemplates, homepageCategories } from '@/lib/templates'
import Hero from '@/components/hero'
import TemplateGrid from '@/components/template-grid'

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const resolvedParams = await searchParams
  const selectedCategory = resolvedParams.category || 'all'

  return (
    <>
      <Hero />
      <section id="templates">
        <TemplateGrid
          templates={homepageTemplates}
          categories={homepageCategories}
          selectedCategory={selectedCategory}
        />
      </section>
    </>
  )
}
