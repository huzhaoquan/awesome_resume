import { notFound } from 'next/navigation'
import { getTemplateById } from '@/lib/templates'
import { TemplateDetailContent } from '@/components/template-detail-content'

export default async function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const template = getTemplateById(id)

  if (!template) {
    notFound()
  }

  return <TemplateDetailContent template={template} />
}
