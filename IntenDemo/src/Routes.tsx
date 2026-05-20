import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import Hero from "./components/Hero";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Hero
            name="Checking"
            bio="test"
            title="test"
            user={{ firstname: "aAliya", lastname: "Hamidha" }}
          />
        }
      />
      <Route path="/about" element={<About fullBio="test" />} />
      <Route path="/contact" element={<ContactForm />} />
    </Routes>
  );
};

export default AppRoutes;
