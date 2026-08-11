import { Code2, Heart, Shield, Users, Zap, Target } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-anthropic-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-anthropic-900 mb-6 font-serif">
            关于 <span className="gradient-text">Awesome Resume</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们致力于为技术从业者提供最专业、最高效的简历模板解决方案，
            让每一位技术人才都能在职业道路上展现最佳的自己。
          </p>
        </div>

        <div className="prose prose-lg mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-luxury border border-anthropic-200 p-8 mb-12">
            <h2 className="flex items-center text-2xl font-bold text-anthropic-900 mb-4 font-serif">
              <Target className="w-6 h-6 text-anthropic-600 mr-3" />
              我们的使命
            </h2>
            <p className="text-gray-600">
              在技术快速发展的时代，一份优秀的简历不仅是工作经历的简单罗列，
              更是个人技术实力、职业素养和创新能力的全面展现。
              Awesome Resume 专注为软件工程师、产品经理、数据科学家等技术岗位
              打造最专业、最具竞争力的简历模板。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-luxury border border-anthropic-200 p-8">
              <Heart className="w-10 h-10 text-anthropic-600 mb-4" />
              <h3 className="text-xl font-bold text-anthropic-900 mb-3 font-serif">专注技术领域</h3>
              <p className="text-gray-600">
                我们深刻理解技术人员的需求，所有模板都经过精心设计，
                确保技术能力、项目经验和职业亮点得到最佳展示。
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-luxury border border-anthropic-200 p-8">
              <Shield className="w-10 h-10 text-anthropic-600 mb-4" />
              <h3 className="text-xl font-bold text-anthropic-900 mb-3 font-serif">专业品质保证</h3>
              <p className="text-gray-600">
                每个模板都由资深HR和技术专家共同审核，
                确保既符合行业标准，又能突出技术优势。
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-luxury border border-anthropic-200 p-8">
              <Users className="w-10 h-10 text-anthropic-600 mb-4" />
              <h3 className="text-xl font-bold text-anthropic-900 mb-3 font-serif">社区驱动</h3>
              <p className="text-gray-600">
                我们倾听每一位用户的反馈，持续优化模板设计，
                确保跟上技术发展的脚步和市场需求的变化。
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-luxury border border-anthropic-200 p-8">
              <Zap className="w-10 h-10 text-anthropic-600 mb-4" />
              <h3 className="text-xl font-bold text-anthropic-900 mb-3 font-serif">高效便捷</h3>
              <p className="text-gray-600">
                简单易用的界面设计，让您快速找到最适合的简历模板，
                节省宝贵的时间，专注于展现自己的核心竞争力。
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-luxury border border-anthropic-200 p-8 mb-12">
            <h2 className="text-2xl font-bold text-anthropic-900 mb-4 font-serif">设计理念</h2>
            <p className="text-gray-600 mb-4">
              我们的设计遵循简洁、专业、现代的原则。以沉稳的酒红作为主色调，
              搭配暖米与金色点缀，配合衬线标题字体，传递出技术专业性与精致的品质感。
            </p>
            <p className="text-gray-600">
              每个模板都注重信息层次、阅读体验和视觉平衡，
              确保您的简历在HR和技术面试官眼中都能留下深刻印象。
            </p>
          </div>

          <div className="bg-gradient-to-r from-anthropic-600 to-anthropic-700 rounded-xl shadow-lg p-8 text-white text-center">
            <Code2 className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">开始您的职业新篇章</h2>
            <p className="text-anthropic-100">
              选择 Awesome Resume，让您的技术实力得到最好的展现
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            如有任何问题或建议，请随时联系我们
          </p>
        </div>
      </div>
    </div>
  )
}
