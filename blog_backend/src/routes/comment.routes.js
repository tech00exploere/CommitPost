export const deleteComment=async(req,res)=>{
  try{
    const{commentId}=req.params;
    const comment=await Comment.findById(commentId);
    if(!comment){
      return res.status(404).json({ message: "Comment not found" });
    }
    if(comment.author.toString()!==req.user._id.toString()){
      return res.status(403).json({ message: "Not authorized" });
    }
    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
