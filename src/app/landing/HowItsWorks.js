import { Upload, Search, FileText } from 'lucide-react'

const steps = [
  {
    title: 'Upload',
    description: 'Drag & drop your files.',
    icon: Upload,
  },
  {
    title: 'Analyze',
    description: 'Select your preferred model for extraction.',
    icon: Search,
  },
  {
    title: 'Extract Insights',
    description: 'View summaries and key information.',
    icon: FileText,
  },
]

export default function HowItWorks() {
  return (
    <section id='hiw' className="py-10 px-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center mb-8 md:mb-0">
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-center text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}