import { CircularProgress } from "@mui/material";
import useFetch from "../hooks/useFetch";
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}
function PostList() {
  const { data, loading, error } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
  );
  if (loading) {
    return (
      <CircularProgress />
      // <div>
      //   {[1, 2, 3].map((i) => (
      //     <div key={i} className="animate-pulse">
      //       <div className="h-4 bg-gray-200 rounded mb-2" />
      //       <div className="h-3 bg-gray-100 rounded w-3/4" />
      //     </div>
      //   ))}
      // </div>
    );
  }
  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  if (!data?.length) return <p>No posts found.</p>;
  return (
    <ul>
      {data?.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}

//   if (loading) return <CircularProgress />;
//  if (error) return <Alert severity="error">{error}</Alert>;
//   return (
//     <>
// // 1. Loading skeleton

//  const { data: posts, loading, error } = useFetch('/api/posts');

//   // 2. Error with retry
//   if (error) {
//     return (
//       <div className="text-center">
//         <p className="text-red-500">{error}</p>
//         <button onClick={() => window.location.reload()}>
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // 3. Empty state
//   if (!posts?.length) return <p>No posts found.</p>;

//   // 4. Success state
//   return <ul>{posts.map(p => <PostCard key={p.id} {...p} />)}</ul>;

export default PostList;
