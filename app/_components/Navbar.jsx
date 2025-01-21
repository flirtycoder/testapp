'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const supabase = createClient(
  "https://iqtjzpskysvetlttpgra.supabase.co", // Replace with your Supabase URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdGp6cHNreXN2ZXRsdHRwZ3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NDY1NjUsImV4cCI6MjA1MDUyMjU2NX0.NVTHoVn7uKUl7N0pWECDwb7M2Wv2vIQa56hL8QXorKM"
);

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfiler] = useState("");

  const dummyGoogleURL = 'https://lh3.googleusercontent.com/a/ACg8ocLGDB_rbNErqwd4MmmQul1EL3X0jc0sJ9f37xmIsl7c1Nir2v2h=s96-c'; // Googleusercontent image URL
  const dummyDribbbleURL = 'https://cdn.dribbble.com/userupload/17949280/file/original-1f490698687e95378cfd58f2d442caeb.jpg?format=webp&resize=400x300';

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData?.user || null);
      console.log("User:", userData);
    };

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    fetchUser();

    return () => {
      // listener?.unsubscribe();
    };
  }, []);

  return (
    <nav className="w-full bg-white py-6 px-16 border-b-2 shadow-sm flex justify-between items-center">
      <h2 className="text-xl font-bold text-black">LOGO</h2>

      <div className="gap-6 items-center text-center lg:flex hidden pr-10">
        <p>Explore</p>
        <p>Hire a Designer</p>
        <p>Find Jobs</p>
        <p>Blogs</p>
      </div>

      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <Image
              src={dummyGoogleURL} 
              alt="User Avatar"
              width={40} // Specify the width
              height={40} // Specify the height
              className="rounded-full border-2"
            />
            <span className="font-semibold">{user.user_metadata.name || "User"}</span>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href={"/signup"}>
              <button className="px-4 py-2 text-black rounded-full">Signup</button>
            </Link>
            <Link href={"/login"}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
