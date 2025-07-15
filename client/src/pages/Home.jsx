import Topnav from "../components/Topnav";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import BookingForm from "../components/Bookingcomponent";
import Banner from "../sections/Banner";
import Testimonial from "../sections/Testimonial";

function Home() {
  return (
    <div>
      <Topnav />
      <Hero />
      <About />
      <Services />
      <BookingForm />
      <Banner />
      <Testimonial />
    </div>
  );
}

export default Home;
