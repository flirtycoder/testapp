"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FilePen, Trash2,Instagram,Twitter,Facebook } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Initialize Supabase client
const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL =
    "https://iqtjzpskysvetlttpgra.supabase.co"),
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxdGp6cHNreXN2ZXRsdHRwZ3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NDY1NjUsImV4cCI6MjA1MDUyMjU2NX0.NVTHoVn7uKUl7N0pWECDwb7M2Wv2vIQa56hL8QXorKM"),
);

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedImageUrl, setUpdatedImageUrl] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [currentPostId, setCurrentPostId] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error } = await supabase
        .from("posts")
        .update({
          post_title: updatedTitle,
          post_url: updatedImageUrl,
          post_des: updatedDescription,
        })
        .eq("id", currentPostId);

      if (error) throw error;

      setSuccess(true);
      fetchPosts(); // Refresh the posts
    } catch (err) {
      setError(`Error updating post: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId);

      if (error) throw error;

      // Refresh the posts after deletion
      fetchPosts();
    } catch (err) {
      setError(`Error deleting post: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      if (!userId) {
        throw new Error("User is not authenticated");
      }

      const { data, error } = await supabase.from("posts").insert([
        {
          post_title: title,
          post_url: imageUrl,
          post_des: description,
          user_id: userId,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setTitle("");
      setImageUrl("");
      setDescription("");
    } catch (err) {
      setError(`Error uploading data: ${err.message}`);
    } finally {
      setLoading(false);
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
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="py-10 px-4 lg:px-20">
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl">All Events....!!!!!</h1>
          <Dialog>
            <DialogTrigger className="bg-black text-white rounded-full w-48 h-10 border">
              Upload
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload your Content Here...!!!!</DialogTitle>
                <DialogDescription>
                  <form onSubmit={handleSubmit}>
                    <div className="mt-6">
                      <label className="block font-bold text-left">Title</label>
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
                    {success && (
                      <p className="mt-4 text-green-600 text-center">
                        Post submitted successfully!
                      </p>
                    )}
                    {error && (
                      <p className="mt-4 text-red-600 text-center">{error}</p>
                    )}
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20">
          {loading ? (
            <p>Loading...!!!!!!</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="w-full">
                <Link href={`/post/${post.id}`}>
                  <img
                    src={post.post_url}
                    alt={post.post_title}
                    className="h-60 border w-full rounded-lg object-cover"
                  />
                </Link>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <h3 className="text-lg font-bold">{post.post_title}</h3>
                  </div>
                  <div className="flex justify-between gap-2">
                    <Dialog>
                      <DialogTrigger
                        onClick={() => {
                          setUpdatedTitle(post.post_title);
                          setUpdatedImageUrl(post.post_url);
                          setUpdatedDescription(post.post_des);
                          setCurrentPostId(post.id);
                        }}
                      >
                        <FilePen />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Post</DialogTitle>
                          <DialogDescription>
                            <form onSubmit={handleUpdate}>
                              <div className="mt-6">
                                <label className="block font-bold text-left">
                                  Update Title
                                </label>
                                <input
                                  type="text"
                                  value={updatedTitle}
                                  onChange={(e) =>
                                    setUpdatedTitle(e.target.value)
                                  }
                                  className="border-2 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  required
                                />
                              </div>
                              <div className="mt-6">
                                <label className="block font-bold text-left">
                                  Update Image URL
                                </label>
                                <input
                                  type="url"
                                  value={updatedImageUrl}
                                  onChange={(e) =>
                                    setUpdatedImageUrl(e.target.value)
                                  }
                                  className="border-2 w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  required
                                />
                              </div>
                              <div className="mt-6">
                                <label className="block font-bold text-left">
                                  Update Description
                                </label>
                                <input
                                  type="text"
                                  value={updatedDescription}
                                  onChange={(e) =>
                                    setUpdatedDescription(e.target.value)
                                  }
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
                              {success && (
                                <p className="mt-4 text-green-600 text-center">
                                  Post updated successfully!
                                </p>
                              )}
                              {error && (
                                <p className="mt-4 text-red-600 text-center">
                                  {error}
                                </p>
                              )}
                            </form>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <button>
                          <Trash2 />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your post and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className=""
                              disabled={loading}
                            >
                              Continue
                            </button>
                          </AlertDialogAction>

                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))
          )}
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
    </div>
  );
};

export default Page;
