import { Card, CardContent, CardHeader, CardTitle } from './Card'

const testimonials = [
  {
    name: 'Dr. Jane Smith',
    role: 'Research Scientist',
    quote: 'This tool has revolutionized the way I analyze research papers. It saves me hours of work!',
  },
  {
    name: 'Prof. John Doe',
    role: 'University Professor',
    quote: 'The ability to quickly extract key information from multiple documents is invaluable for my work.',
  },
]

export default function Testimonials() {
  return (
    <section id='testimonials' className="py-10 px-10 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{testimonial.name}</CardTitle>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </CardHeader>
              <CardContent>
                <p className="italic">&quot;{testimonial.quote}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}