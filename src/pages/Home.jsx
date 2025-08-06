import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import PostCard from '../components/PostCard'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('created_at')

  useEffect(() => {
    fetchPosts()
  }, [sortBy])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order(sortBy, { ascending: sortBy === 'created_at' ? false : false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading amazing travel posts...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error">
        <h3>Error loading posts</h3>
        <p>{error}</p>
        <button onClick={fetchPosts} className="btn btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>
          🌍 Welcome to HobbyHub Travel Forum
        </h1>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '1.1rem' }}>
          Share your travel experiences, discover new destinations, and connect with fellow travelers!
        </p>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="🔍 Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="created_at">Sort by Date</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <h3>No posts found</h3>
          {searchTerm ? (
            <p>No posts match your search term "{searchTerm}"</p>
          ) : (
            <p>Be the first to share your travel experience!</p>
          )}
        </div>
      ) : (
        <div className="post-grid">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home