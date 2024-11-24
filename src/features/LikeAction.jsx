const LikeAction = ({ post, updatePost }) => {
    const handleLike = () => {
      updatePost({ ...post, likes: post.likes + 1 });
    };
  
    return <button onClick={handleLike}>Like ({post.likes})</button>;
  };
  
  export default LikeAction;
  