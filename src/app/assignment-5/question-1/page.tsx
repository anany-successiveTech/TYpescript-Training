"use client";

import React, { useEffect, useState } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) throw new Error("Failed to fetch posts");
    const data: Post[] = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <p style={{ textAlign: "center", margin: "2rem" }}>
        1. Create a Next.js component using the App Router that fetches data on
        the server side (SSR) from a public API (e.g., JSONPlaceholder) and
        displays the results on the page.
      </p>
      <main style={{ padding: "2rem" }}>
        <h1>Blog Posts (Server-Side Rendered)</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "1.5rem" }}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default PostsPage;
