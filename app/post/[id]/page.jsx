"use client";
import { Bookmark, Heart } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase client setup
const supabaseUrl = "https://iqtjzpskysvetlttpgra.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdGp6cHNreXN2ZXRsdHRwZ3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NDY1NjUsImV4cCI6MjA1MDUyMjU2NX0.NVTHoVn7uKUl7N0pWECDwb7M2Wv2vIQa56hL8QXorKM"; 
const supabase = createClient(supabaseUrl, supabaseKey);

const Page = () => {
  const params = useParams();
  const id = params.id; // Get the post ID from the URL
  const [postData, setPostData] = useState(null); // State to store post data
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single(); // Fetch a single post by ID

        if (error) {
          console.error("Error fetching post:", error.message);
          return;
        }

        setPostData(data); // Set the fetched post data
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!postData) {
    return <div>No post found.</div>;
  }

  return (
    <div className="bg-gray-50 lg:px-20">
      {/* Header */}
      <div className="font-bold pt-5 px-4 sm:px-6 md:px-14 text-2xl">
        <h2>{postData.post_title || "Crypto Portfolio Dashboard"}</h2>
      </div>

      {/* User Info Section */}
      <div className="flex flex-wrap justify-between items-center gap-5 px-4 sm:px-6 md:px-14 pt-5">
        <div className="flex gap-4 items-center">
          <img
            src={postData.post_url || "default_avatar_url.png"}
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p>{postData.post_title || "Anonymous User"}</p>
            <p className="text-green-500 text-sm">{postData.post_title || "Available for work Follow"}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="p-2 rounded-full flex items-center justify-center border border-gray-300">
            <Heart />
          </button>
          <button className="p-2 rounded-full flex items-center justify-center border border-gray-300">
            <Bookmark />
          </button>
          <button className="px-6 py-2 bg-black text-white rounded-full">
            Get in Touch
          </button>
        </div>
      </div>

      {/* Main Image */}
      <img
        src={postData.post_url || "default_image_url.jpg"}
        alt="Main"
        className="w-45 mt-5 rounded-2xl lg:w-full h-45 px-14 w-full"
      />

      {/* Key Features Section */}
      <div className="pt-10 px-4 sm:px-6 md:px-14">
        <h2 className="font-bold text-2xl">Hey Dribbblers!</h2>
        <p className="text-lg font-light pt-4">{postData.post_des}</p>
      </div>

      {/* Additional sections or images can be added here */}
      <div className="py-10 px-4 sm:px-6 md:px-14 lg:pt-16">
        <h2 className="font-bold text-xl pb-6">
          More by Extej UI UX Design Agency
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Repeated for each image */}
          <img
            src="https://cdn.dribbble.com/userupload/17949280/file/original-1f490698687e95378cfd58f2d442caeb.jpg?format=webp&resize=1200x900&vertical=center"
            className="w-full h-auto rounded-lg"
            alt="Example Work"
          />
          <img
            src="https://cdn.dribbble.com/userupload/17451031/file/original-f40ce2024c0726ff69373dadb1ca024d.png?format=webp&resize=450x338&vertical=center"
            className="h-45 w-full rounded-lg"
          />
          <img
            src="https://cdn.dribbble.com/userupload/17096997/file/original-4a081c4161d73734b62c73f414984238.png?format=webp&resize=450x338&vertical=center"
            className="h-45 w-full rounded-lg"
          />
          <img
            src="https://cdn.dribbble.com/userupload/12894295/file/original-a76def72cdea25d560956e824f479901.png?format=webp&resize=450x338&vertical=center"
            className="h-45 w-full rounded-lg"
          />

          {/* Add other images here */}
        </div>
        <hr className="w-full mt-16"></hr>
        <h1 className="text-l mt-16 font-bold">You might also like!!!</h1>
        <div className="py-6 grid gap-6 lg:grid-cols-3  grid-cols-1">
          <div className="h-50 w-full bg-black rounded-lg shadow-md">
            <img
              src="https://cdn.dribbble.com/userupload/17946515/file/original-0e95db30832fc015a428dca3a155a7b2.png?format=webp&resize=400x300&vertical=center"
              className="h-45 w-full rounded-lg"
            />
          </div>
          <div className="h-45 w-full bg-black rounded-lg shadow-md">
            <img
              src="https://cdn.dribbble.com/userupload/16674834/file/original-482458c5717f461c19e8f8b9e2a736f6.jpg?format=webp&resize=400x300&vertical=center"
              className="h-45 w-full rounded-lg"
            />
          </div>
          <div className="h-45 w-full bg-black rounded-lg shadow-md">
            <img
              src="https://cdn.dribbble.com/userupload/17947820/file/original-9e5d74a444081d88684e6273b63a7444.png?format=webp&resize=400x300&vertical=center"
              className="h-45 w-full rounded-lg"
            />
          </div>
          <div className="h-45 w-full bg-black rounded-lg shadow-md">
            <img
              src="https://cdn.dribbble.com/userupload/17918138/file/original-a83fd15fac5d8f67101a3ae82f92a0c2.jpg?format=webp&resize=400x300&vertical=center"
              className="h-45 w-full rounded-lg"
            />
          </div>
          <div className="h-45 w-full bg-black rounded-lg shadow-md">
            <img
              src="https://cdn.dribbble.com/userupload/17947764/file/original-633eeb7b25507fd5d3279c54a4647781.png?crop=96x92-1363x1042&format=webp&resize=400x300&vertical=center"
              className="h-45 w-full rounded-lg"
            />
          </div>
          <div className="h-45 w-full bg-black rounded-lg shadow-md">
            <img
              src="https://cdn.dribbble.com/userupload/17944402/file/original-0e9a4184dc50c185ff54a2bd231421d3.png?format=webp&resize=400x300&vertical=center"
              className="h-45 w-full rounded-lg"
            />
          </div>
        </div>
</div>
    </div>
    
  );
};

export default Page;
