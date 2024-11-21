import Button  from '../components/Button'

export default function Hero() {
  return (
    <section className="py-20 ps-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Unstructured Files into Actionable Insights
          </h1>
          <p className="text-xl mb-8">
            Effortlessly extract, analyze, and summarize content from your research documents.
          </p>
          <Button size="lg" asChild className={"bg-slate-700 hover:bg-slate-600"}>
            <a href="#upload">Upload Your First Document</a>
          </Button>
        </div>
        <div className="md:w-1/2">
          <img
            src="/Data_extraction_.png"
            alt="Document Analysis Illustration"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  )
}