import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItsWorks";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
