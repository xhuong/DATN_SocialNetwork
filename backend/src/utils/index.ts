function buildNestedComments(comments, parentId = null) {
  const result = [];
  for (const comment of comments) {
    if (comment.parent_comment_id === parentId) {
      const replies = buildNestedComments(comments, comment.id);
      if (replies.length) {
        comment.replies = replies;
      }
      result.push(comment);
    }
  }
  return result;
}

export { buildNestedComments };
