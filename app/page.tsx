import Header from "./components/Header";
import SmoothScroll from "./components/SmoothScroll";
import Hero from "./components/Hero";
import ComplexityClarity from "./components/ComplexityClarity";
import Services from "./components/Services";
import Process from "./components/Process";
import Cases from "./components/Cases";
import Technology from "./components/Technology";
import About from "./components/About";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      <SmoothScroll />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ComplexityClarity />
        <Services />
        <Process />
        <Cases />
        <Technology />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
