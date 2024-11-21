import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card'
import { FileText, BarChart2, HelpCircle } from 'lucide-react'

const features = [
  {
    title: 'Extract Information',
    description: 'Summarize and extract key points from PDFs, DOCX, and TXT files.',
    icon: FileText,
  },
  {
    title: 'Data Insights',
    description: 'Analyze images, tables, and charts within documents.',
    icon: BarChart2,
  },
  {
    title: 'Local Q&A',
    description: 'Ask questions and get answers from uploaded files.',
    icon: HelpCircle,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-10 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
