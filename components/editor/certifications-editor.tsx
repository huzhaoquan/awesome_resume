'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useResumeEditor } from '@/contexts/resume-editor-context'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

export function CertificationsEditor() {
  const { data, addCertification, updateCertification, deleteCertification } =
    useResumeEditor()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleAddCertification = () => {
    addCertification()
    setTimeout(() => {
      const newId = Date.now().toString()
      setExpandedId(newId)
    }, 100)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">认证证书</h3>
        <Button
          onClick={handleAddCertification}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加证书
        </Button>
      </div>

      <div className="space-y-4">
        {(data.certifications || []).map((cert, index) => (
          <Card key={cert.id} className="border-gray-200">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">
                  <span className="text-gray-500 mr-2">#{index + 1}</span>
                  <span className={cert.name ? '' : 'text-gray-400'}>
                    {cert.name || '未命名证书'}
                  </span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(cert.id)}
                    className="h-8 w-8 p-0"
                  >
                    {expandedId === cert.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCertification(cert.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedId === cert.id && (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`cert-name-${cert.id}`}>证书名称</Label>
                      <Input
                        id={`cert-name-${cert.id}`}
                        value={cert.name}
                        onChange={(e) =>
                          updateCertification(cert.id, { name: e.target.value })
                        }
                        placeholder="例如：AWS Solutions Architect"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`cert-issuer-${cert.id}`}>颁发机构</Label>
                      <Input
                        id={`cert-issuer-${cert.id}`}
                        value={cert.issuer}
                        onChange={(e) =>
                          updateCertification(cert.id, { issuer: e.target.value })
                        }
                        placeholder="例如：Amazon Web Services"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`cert-date-${cert.id}`}>获得日期</Label>
                      <Input
                        id={`cert-date-${cert.id}`}
                        type="month"
                        value={cert.date}
                        onChange={(e) =>
                          updateCertification(cert.id, { date: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor={`cert-id-${cert.id}`}>
                        证书编号（可选）
                      </Label>
                      <Input
                        id={`cert-id-${cert.id}`}
                        value={cert.credentialId || ''}
                        onChange={(e) =>
                          updateCertification(cert.id, {
                            credentialId: e.target.value
                          })
                        }
                        placeholder="例如：AWS-123456"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        {(!data.certifications || data.certifications.length === 0) && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <p>还没有添加任何认证证书</p>
            <Button
              onClick={handleAddCertification}
              size="sm"
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              添加第一个证书
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
