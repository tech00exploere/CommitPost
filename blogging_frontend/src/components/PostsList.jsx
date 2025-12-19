import { useEffect, useState } from "react";
import API from "../api/axios"; 

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await API.get("/posts"); 
        setPosts(res.data);    
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>By: {post.user.name}</small>
          </div>
        ))
      )}
    </div>
  );
}
