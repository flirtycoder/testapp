"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Facebook,
  Instagram,
  Search,
  Twitter,
  Heart,
  Eye,
  chevrondown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Initialize Supabase client
const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL =
    "https://iqtjzpskysvetlttpgra.supabase.co"),
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdGp6cHNreXN2ZXRsdHRwZ3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NDY1NjUsImV4cCI6MjA1MDUyMjU2NX0.NVTHoVn7uKUl7N0pWECDwb7M2Wv2vIQa56hL8QXorKM"),
);

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        return;
      }
      if (sessionData?.session?.user?.id) {
        setUserId(sessionData.session.user.id);
      } else {
        console.error("User is not authenticated");
      }
    };

    // Add auth state change listener
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUserId(session.user.id);
        } else {
          setUserId(null);
        }
      },
    );

    getSession();

    // Cleanup listener
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      if (!userId) {
        throw new Error("User is not authenticated");
      }

      // Insert data into the 'posts' table
      const { data, error } = await supabase.from("posts").insert([
        {
          post_title: title,
          post_url: imageUrl,
          post_des: description,
          user_id: userId, // Include the user ID
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setTitle("");
      setImageUrl("");
      setDescription("");
    } catch (err) {
      setError(`Error uploading data: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Google sign-in error:", error);
    } else {
      console.log("Google sign-in data:", data);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.error("Error fetching posts:", error.message);
        return;
      }
      setPosts(data);
      console.log("data", data);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="py-10 px-4 lg:px-20">
      <div>
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold">
          Discover the World's Top Designers
        </h1>
        <h2 className="text-center py-6 sm:py-8 text-lg sm:text-xl lg:text-2xl">
          Explore work from the most talented and accomplished designers ready
          to take on your next project
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <input
          className="px-4 sm:px-6 py-2 sm:py-3 rounded-full w-full sm:w-[400px] border-2"
          type="search"
          placeholder="What are you looking for?"
        />
        <button className="px-2 py-2 sm:px-6 sm:py-3 bg-pink-500 rounded-full flex items-center justify-center text-white">
          <Search />
        </button>
      </div>

      <div className="w-full  flex justify-center mt-8">
        <div className="flex flex-wrap gap-4 items-center text-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              Popular{" "}
              
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>New&Networthy</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <p>Explore</p>
          <p>Hire a Designer</p>
          <p>Find Jobs</p>
          <p>Blogs</p>
        </div>
      </div>

      <div className="py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <p>Loading...!!!!!!</p>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className=" w-full ">
                <img
                  src={
                    post.post_url ||
                    "https://cdn.dribbble.com/userupload/17949280/file/original-1f490698687e95378cfd58f2d442caeb.jpg?format=webp&resize=400x300"
                  }
                  alt={post.title || "Post Image"}
                  className="h-60 border w-full rounded-lg object-cover"
                />
                <div className="mt-4 flex justify-between  items-center ">
                  <div className="flex justify-between gap-4 items-center ">
                    <h3 className="text-lg font-bold">{post.post_title}</h3>
                    <span className=" badge badge-team  rounded-sm hover:bg-gray-400 text-xs">
                      TEAM
                    </span>
                  </div>
                  <div>
                    <button className=" rounded-full   size-8">
                      <Heart />
                    </button>
                    <button className=" rounded-full   size-8">
                      <Eye />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <div className="flex justify-center gap-10">
        <div className="text-center">
          <Dialog>
            <DialogTrigger className=" bg-black text-white rounded-full w-48 h-10 border">
              Upload
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload your Content Here...!!!!</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center justify-center  bg-gray-50">
                    <div className="w-full sm:w-2/3 lg:w-full p-4">
                      {/* Header */}
                      <div className="text-center">
                        <h1 className="text-2xl sm:text-3xl font-bold">
                          Upload Post Details
                        </h1>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="mt-6">
                          <label className="block font-bold text-left">
                            Title
                          </label>
                          <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-2 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="mt-6">
                          <label className="block font-bold text-left">
                            Image URL
                          </label>
                          <input
                            type="url"
                            placeholder="URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="border-2 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="mt-6">
                          <label className="block font-bold text-left">
                            Image Description
                          </label>
                          <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-2 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mt-10 text-center">
                          <button
                            type="submit"
                            className="w-full py-4 bg-blue-950 text-white font-bold rounded-full hover:bg-gray-700"
                            disabled={loading}
                          >
                            {loading ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </form>
                      {success && (
                        <p className="mt-4 text-center text-green-600">
                          Post submitted successfully!
                        </p>
                      )}
                      {error && (
                        <p className="mt-4 text-center text-red-600">{error}</p>
                      )}
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div className="text-center ">
          <Dialog>
            <DialogTrigger className=" bg-black text-white rounded-full w-48 h-10 border">
              Sign up to Continue
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  To browse more shots, please sign in or create an account.
                </DialogTitle>
                <DialogDescription>
                  <div className="text-center flex justify-center mt-10">
                    <button
                      className="border-2 flex justify-center items-center p-4 lg:w-full rounded-full bg-blue-950 text-white"
                      onClick={handleGoogle}
                    >
                      <div className="flex gap-4">
                        <Image
                          src="./google.svg"
                          alt="Google"
                          height={25}
                          width={25}
                        />
                        <b>Sign in with Google</b>
                      </div>
                    </button>
                  </div>
                  <div className="text-center items-center flex w-full justify-center pt-5">
                    <hr className="w-1/3" />
                    <h1 className="font-light text-light">or</h1>
                    <hr className="w-1/3" />
                  </div>
                  <div className="mt-8">
                    <button className=" bg-white text-black rounded-full w-full h-16 border">
                      Continue with email.
                    </button>
                  </div>
                  <div className="pt-16 flex justify-center text-center">
                    <h1 className="text-xs">
                      By creating an account you agree with our{" "}
                      <u>Terms of Service, Privacy Policy,</u>
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-xm text-center">
                      and our default <u>Notification Settings.</u>
                    </h1>
                  </div>
                  <div className="pt-10 items-center">
                    <h1 className="text-sm text-center">
                      Already have an account? <u>Sign In</u>
                    </h1>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <nav className="w-full pt-10 lg:py-6">
        <h2 className="flex justify-center text-2xl font-bold">LOGO</h2>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          <p>For Designers</p>
          <p>Hire Talent</p>
          <p>Inspiration</p>
          <p>Advertising</p>
          <p>Blog</p>
          <p>About</p>
          <p>Career</p>
          <p>Support</p>
        </div>
        <div className="flex justify-center gap-4 items-center pt-8">
          <button className="rounded-full flex items-center justify-center text-black">
            <Instagram />
          </button>
          <button className="rounded-full flex items-center justify-center text-black">
            <Twitter />
          </button>
          <button className="rounded-full flex items-center justify-center text-black">
            <Facebook />
          </button>
        </div>
      </nav>

      <footer className="w-full pt-10 lg:py-6">
        <div className="flex flex-wrap justify-center gap-4 items-center">
          <p>@Arpan</p>
          <p>Home</p>
          <p>About</p>
          <p>Store</p>
          <p>Contact</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 items-center pt-6">
          <p>Jobs</p>
          <p>Designers</p>
          <p>Freelancers</p>
          <p>Tags</p>
          <p>Places</p>
          <p>Resources</p>
        </div>
      </footer>
    </div>
  );
}
