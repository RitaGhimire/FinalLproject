import { Link } from 'react-router-dom'

function PostCard({ post }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
      <div className="card post-card">
        <div className="post-meta">
          <span>{formatDate(post.created_at)}</span>
          <div className="upvotes">
            ❤️ {post.upvotes}
          </div>
        </div>
        <h3 className="post-title">{post.title}</h3>
        {post.image_url && (
          <img 
            src={post.image_url} 
            alt={post.title}
            className="post-image"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        )}
        {post.content && (
          <p className="post-content">
            {post.content.length > 150 
              ? `${post.content.substring(0, 150)}...` 
              : post.content
            }
          </p>
        )}
      </div>
    </Link>
  )
}

export default PostCard