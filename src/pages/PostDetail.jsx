import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commentLoading, setCommentLoading] = useState(false)

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [id])

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setPost(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true })

      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const handleUpvote = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ upvotes: post.upvotes + 1 })
        .eq('id', id)
        .select()

      if (error) throw error
      setPost(data[0])
    } catch (error) {
      console.error('Error upvoting post:', error)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      setCommentLoading(true)
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: id,
            content: newComment.trim()
          }
        ])
        .select()

      if (error) throw error
      setComments(prev => [...prev, ...data])
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setCommentLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      navigate('/')
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading post...</h2>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="error">
        <h3>Error loading post</h3>
        <p>{error || 'Post not found'}</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="card">
        <div className="post-meta">
          <span>📅 {formatDate(post.created_at)}</span>
          <div className="upvotes">
            ❤️ {post.upvotes}
          </div>
        </div>

        <h1 className="post-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          {post.title}
        </h1>

        {post.image_url && (
          <img 
            src={post.image_url} 
            alt={post.title}
            className="post-image"
            style={{ height: '400px' }}
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        )}

        {post.content && (
          <div className="post-content" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '1rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        )}

        <div className="post-actions">
          <button onClick={handleUpvote} className="upvote-btn">
            ❤️ Upvote ({post.upvotes})
          </button>
          <Link to={`/edit/${post.id}`} className="btn btn-secondary">
            ✏️ Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            🗑️ Delete
          </button>
          <Link to="/" className="btn btn-secondary">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="comments-section">
        <h2 className="comments-title">💬 Comments ({comments.length})</h2>

        <form onSubmit={handleAddComment} className="comment-form">
          <div className="form-group">
            <label htmlFor="comment">Add a comment:</label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="form-control"
              placeholder="Share your thoughts, ask questions, or provide travel tips..."
              rows="3"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={commentLoading}
          >
            {commentLoading ? 'Adding...' : '💬 Add Comment'}
          </button>
        </form>

        <div style={{ marginTop: '2rem' }}>
          {comments.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-meta">
                  📅 {formatDate(comment.created_at)}
                </div>
                <div className="comment-content">
                  {comment.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default PostDetail