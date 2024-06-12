"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddVehicle from "./components/add-vehicle";

const Home = () => {
  const router = useRouter();
  const isToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      {isToken && (
        <div>
          <AddVehicle />
        </div>
      )}
    </div>
  );
};

export default Home;
