import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      
      setFormData({
        title: data.title || '',
        content: data.content || '',
        image_url: data.image_url || ''
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }

    try {
      setSaving(true)
      setError(null)

      const { error } = await supabase
        .from('posts')
        .update({
          title: formData.title.trim(),
          content: formData.content.trim() || null,
          image_url: formData.image_url.trim() || null
        })
        .eq('id', id)

      if (error) throw error

      navigate(`/post/${id}`)
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading post...</h2>
      </div>
    )
  }

  if (error && !formData.title) {
    return (
      <div className="error">
        <h3>Error loading post</h3>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        ✏️ Edit Your Travel Post
      </h1>
      
      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., Amazing sunset at Santorini, Greece!"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-control"
            placeholder="Tell us about your travel experience, recommendations, tips, or ask for advice..."
            rows="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com/your-travel-photo.jpg"
          />
          {formData.image_url && (
            <div style={{ marginTop: '1rem' }}>
              <img 
                src={formData.image_url} 
                alt="Preview" 
                style={{ 
                  maxWidth: '100%', 
                  height: '200px', 
                  objectFit: 'cover', 
                  borderRadius: '10px' 
                }}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate(`/post/${id}`)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPost