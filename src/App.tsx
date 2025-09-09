import Footer from "@/components/Footer.tsx"
import CardGrid from "@/components/CardGrid.tsx"
import Header from "@/components/Header"

function App() {
  return (
    <>
      <Header />
      <main className="p-8">
        <div className="container flex flex-col items-center gap-2 py-10 text-center md:py-16 lg:py-20">
          <h1 className="text-primary font-semibold text-5xl text-center">
            An API Handling Website Prototype
          </h1>
          <p className="text-lg">Each card is an API. Try out!</p>
        </div>
        <CardGrid />
      </main>
      <Footer />
    </>
  );
}

export default App;
