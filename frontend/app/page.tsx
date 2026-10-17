"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Home/Hero";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LoadingScreen from "@/components/LoadingScreen";

const Home = () => {
  const { loading, authChecked } = useSelector(
    (state: RootState) => state.auth
  );

  if (!authChecked || loading) {
    return (
      <LoadingScreen
        title="Checking your account"
        description="Getting everything ready for you..."
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* HERO */}
      <Hero />

      <Footer />

      <style>{`
        .ecg-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: ecg-draw 5s ease-in-out infinite;
        }

        @keyframes ecg-draw {
          0% {
            stroke-dashoffset: 1;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          65% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ecg-line {
            animation: none;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
