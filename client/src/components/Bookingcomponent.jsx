import React, { useState, useEffect } from "react";
import bookingbg from "../assets/bookinbg.png";

const services = {
  lashes: [
    { name: "Classic", price: 15000 },
    { name: "Hybrid", price: 20000 },
    { name: "Volume", price: 25000 },
    { name: "Mega Volume", price: 40000 },
    { name: "Lash Removal", price: 7000 },
    { name: "Lash Refill", price: "70% of original price" },
  ],
  lashAddOns: [
    { name: "Bottom lashes", price: 6000 },
    { name: "Spiky effect", price: 5000 },
    { name: "Color effect", price: 5000 },
    { name: "Cat eye", price: 4000 },
  ],
  brows: [
    { name: "Microblading", price: 40000 },
    { name: "Microshading", price: 50000 },
    { name: "Ombré brow", price: 60000 },
    { name: "Combo brows", price: 70000 },
    { name: "Touch up under 6 months", price: 30000 },
    { name: "1 year touch up", price: 50000 },
  ],
  facials: [
    { name: "Ayurvedic facials(organic)", price: 10000 },
    { name: "Instant glow facials(deep cleansing)", price: 17000 },
    { name: "Hydra glow facials(acne prone)", price: 25000 },
    { name: "Dermaplaning(facial hair removal)", price: 27000 },
    { name: "Vjaycials(waxing & treatment)", price: 30000 },
  ],
  "Body Waxing": [
    { name: "Underarm", price: 6500 },
    { name: "Half Legs", price: 9000 },
    { name: "Half arm", price: 7000 },
    { name: "Full legs", price: 18000 },
    { name: "Full arm", price: 14000 },
    { name: "Vjay wax", price: 15000 },
    { name: "Bikini line", price: 7000 },
    { name: "Chin", price: 5000 },
    { name: "Upper lips", price: 5000 },
    { name: "Side of face", price: 7000 },
    { name: "Half stomach", price: 10000 },
    { name: "Stomach", price: 14000 },
    { name: "Half Back", price: 10000 },
    { name: "Full Back", price: 17000 },
    { name: "Half Chest", price: 6000 },
    { name: "Full Chest", price: 12000 },
    { name: "eyebrows", price: 4000 },
    { name: "Full body(male)", price: 90000 },
    { name: "Full body(female)", price: 70000 },
  ],
  "Body Treatments": [
    { name: "Sugar Scrub Exfoliation & Steaming", price: 25000 },
    { name: "Ayurvedic(natural ingredients) & steaming", price: 18000 },
    { name: "Dilka Body Treatment with steaming", price: 35000 },
    { name: "Moroccan Body Treatment with steaming", price: 40000 },
  ],
  "Pedicure / Manicure": [
    { name: "Pedicure", price: 10000 },
    { name: "Manicure", price: 8000 },
  ],
  "Teeth Whitening": [
    { name: "Teeth Whitening (Per session)", price: 45000 },
    { name: "Scaling & Polish", price: 40000 },
    { name: "Both(Package of 2 sessions)", price: 80000 },
  ],
  Training: [
    { name: "Lash Extension Training(2 weeks)", price: 100000 },
    { name: "Brow Training", price: 150000 },
    { name: "Both", price: 220000 },
  ],
  // ... add other categories here
};

const singleSelectCategories = [
  "lashes",
  "brows",
  "facials",
  "Teeth Whitening",
];

const BookingForm = () => {
  const [category, setCategory] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [lashAddOns, setLashAddOns] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });
  const [total, setTotal] = useState(0);

  const handleServiceToggle = (service) => {
    if (singleSelectCategories.includes(category)) {
      setSelectedServices([service]);
    } else {
      setSelectedServices((prev) =>
        prev.includes(service)
          ? prev.filter((s) => s !== service)
          : [...prev, service]
      );
    }
  };

  const handleAddOnToggle = (addon) => {
    setLashAddOns((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  useEffect(() => {
    let newTotal = 0;

    if (category && services[category]) {
      services[category].forEach((item) => {
        if (
          selectedServices.includes(item.name) &&
          typeof item.price === "number"
        ) {
          newTotal += item.price;
        }
      });
    }

    if (category === "lashes") {
      services.lashAddOns.forEach((addon) => {
        if (lashAddOns.includes(addon.name)) {
          newTotal += addon.price;
        }
      });
    }

    setTotal(newTotal);
  }, [category, selectedServices, lashAddOns]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        selectedServices,
        lashAddOns,
        total,
        ...formData,
      }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bookingbg})`,
        backgroundSize: "cover",
        padding: "1rem",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)", // Step 2
          zIndex: 1,
        }}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="sm:max-w-xl w-screen mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
        style={{ position: "relative", zIndex: 2 }}
      >
        <h2 className="text-3xl font-bold text-center">Book a Service</h2>

        <div>
          <label className="block font-medium mb-1">Select Category</label>
          <select
            className="w-full p-2 border border-gray-300 rounded cursor-pointer"
            value={category}
            required
            onChange={(e) => {
              setCategory(e.target.value);
              setSelectedServices([]);
              setLashAddOns([]);
            }}
          >
            <option value="">-- Choose a Category --</option>
            {Object.keys(services)
              .filter((cat) => cat !== "lashAddOns")
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
          </select>
        </div>

        {category && (
          <div className="space-y-2">
            <p className="font-semibold">
              Select Service
              {singleSelectCategories.includes(category)
                ? " (choose one)"
                : "(s)"}
            </p>
            {services[category].map((s) => (
              <label
                key={s.name}
                className="flex items-center space-x-2 border-b py-1"
              >
                <input
                  type={
                    singleSelectCategories.includes(category)
                      ? "radio"
                      : "checkbox"
                  }
                  className="form-checkbox"
                  checked={selectedServices.includes(s.name)}
                  onChange={() => handleServiceToggle(s.name)}
                />
                <span>
                  {s.name} – ₦
                  {typeof s.price === "number"
                    ? s.price.toLocaleString()
                    : s.price}
                </span>
              </label>
            ))}
          </div>
        )}

        {category === "lashes" && selectedServices.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold mt-4">Optional Lash Add-ons</h3>
            {services.lashAddOns.map((addon) => (
              <label key={addon.name} className="block">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={lashAddOns.includes(addon.name)}
                  onChange={() => handleAddOnToggle(addon.name)}
                />
                {addon.name} – ₦{addon.price.toLocaleString()}
              </label>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>
        <label htmlFor="date" className="font-medium text-start">
          Select Date
        </label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded"
          min={new Date().toISOString().split("T")[0]}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <label className="font-medium text-start">Time Slot</label>
        <input
          type="time"
          name="time"
          min="08:00"
          max="18:00"
          placeholder="e.g. 10:00 AM"
          className="w-full p-2 border border-gray-300 rounded"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        />

        <div className="text-right font-bold text-lg">
          Total: ₦{total.toLocaleString()}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-3 rounded hover:bg-gray-800 transition-all"
        >
          Book Now
        </button>
      </form>
    </section>
  );
};

export default BookingForm;
