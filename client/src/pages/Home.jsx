import Topnav from "../components/Topnav";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import BookingForm from "../components/Bookingcomponent";

function Home() {
  return (
    <div>
      <Topnav />
      <Hero />
      <About />
      <Services />
      <BookingForm />
    </div>
  );
}

export default Home;
