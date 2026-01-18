import { templates, categories } from '@/lib/templates'
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
          templates={templates}
          categories={categories}
          selectedCategory={selectedCategory}
        />
      </section>
    </>
  )
}
