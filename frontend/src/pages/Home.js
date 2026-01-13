import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { 
  FiEdit, 
  FiImage, 
  FiVideo, 
  FiFileText, 
  FiCalendar,
  FiThumbsUp,
  FiMessageCircle,
  FiShare2,
  FiSend,
  FiMoreVertical
} from 'react-icons/fi';
import { MdWork, MdSchool, MdCelebration } from 'react-icons/md';
import './Home.css';

const Home = () => {
  const { user } = useUser();
  const [postContent, setPostContent] = useState('');
  
  const feedPosts = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        title: 'Senior Product Manager @ Google',
        avatar: 'SJ',
        time: '2h ago'
      },
      content: 'Just launched a new feature that increased user engagement by 40%! So proud of my team for all the hard work. #productmanagement #tech',
      likes: 124,
      comments: 23,
      shares: 8,
      type: 'achievement'
    },
    {
      id: 2,
      user: {
        name: 'Tech Startup News',
        title: 'Technology • 500k followers',
        avatar: 'TS',
        time: '4h ago'
      },
      content: 'Remote work is here to stay. Companies embracing flexible work policies are seeing 25% higher employee retention rates.',
      likes: 892,
      comments: 145,
      shares: 203,
      type: 'news'
    },
    {
      id: 3,
      user: {
        name: 'Michael Chen',
        title: 'Lead Frontend Engineer @ Netflix',
        avatar: 'MC',
        time: '1d ago'
      },
      content: 'Looking for a senior React developer with TypeScript experience. Must have 5+ years building scalable web applications. DM me if interested!',
      likes: 56,
      comments: 32,
      shares: 12,
      type: 'hiring'
    },
    {
      id: 4,
      user: {
        name: 'AI Research Lab',
        title: 'Artificial Intelligence • 1M followers',
        avatar: 'AI',
        time: '2d ago'
      },
      content: 'New paper published: "Transformers for Computer Vision" - achieving state-of-the-art results on multiple benchmarks.',
      likes: 2100,
      comments: 189,
      shares: 450,
      type: 'research'
    }
  ];

  const suggestedConnections = [
    { id: 1, name: 'Alex Rivera', title: 'UX Designer @ Apple', mutual: 12 },
    { id: 2, name: 'Jessica Wang', title: 'Data Scientist @ Meta', mutual: 8 },
    { id: 3, name: 'David Kim', title: 'Backend Engineer @ Airbnb', mutual: 15 },
    { id: 4, name: 'Lisa Patel', title: 'Product Manager @ Microsoft', mutual: 6 }
  ];

  const trendingTopics = [
    { tag: '#RemoteWork', posts: '12.5k' },
    { tag: '#TechJobs', posts: '8.3k' },
    { tag: '#WebDevelopment', posts: '15.2k' },
    { tag: '#CareerGrowth', posts: '7.8k' },
    { tag: '#AI', posts: '25.1k' }
  ];

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      console.log('Posting:', postContent);
      setPostContent('');
    }
  };

  return (
    <div className="home-container">
      {/* Left Sidebar */}
      <div className="home-sidebar left">
        <div className="profile-card">
          {user.profilePic ? (
            <img src={user.profilePic} alt={user.name} className="sidebar-profile-pic" />
          ) : (
            <div className="sidebar-profile-initials">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <h3>{user.name}</h3>
          <p>{user.headline}</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="number">{user.connections}</span>
              <span className="label">Connections</span>
            </div>
            <div className="stat">
              <span className="number">{user.followers}</span>
              <span className="label">Followers</span>
            </div>
          </div>
          <button className="view-profile-btn">View Profile</button>
        </div>

        <div className="recent-searches">
          <h4>Recent Searches</h4>
          <ul>
            <li>React Developer Jobs</li>
            <li>Remote Tech Companies</li>
            <li>Startup Funding Rounds</li>
            <li>UX Design Salaries 2024</li>
          </ul>
        </div>
      </div>

      {/* Main Feed */}
      <div className="home-feed">
        {/* Create Post */}
        <div className="create-post">
          <div className="post-header">
            {user.profilePic ? (
              <img src={user.profilePic} alt={user.name} className="post-profile-pic" />
            ) : (
              <div className="post-profile-initials">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <textarea
              placeholder="Share an update, article, or job opportunity..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="post-input"
            />
          </div>
          <div className="post-actions">
            <div className="action-icons">
              <button className="action-btn"><FiImage /> Photo</button>
              <button className="action-btn"><FiVideo /> Video</button>
              <button className="action-btn"><FiFileText /> Document</button>
              <button className="action-btn"><FiCalendar /> Event</button>
            </div>
            <button 
              className="post-submit-btn"
              onClick={handlePostSubmit}
              disabled={!postContent.trim()}
            >
              <FiSend /> Post
            </button>
          </div>
        </div>

        {/* Feed Posts */}
        {feedPosts.map((post) => (
          <div key={post.id} className="feed-post">
            <div className="post-header">
              <div className="post-user">
                <div className="post-avatar">{post.user.avatar}</div>
                <div>
                  <h4>{post.user.name}</h4>
                  <p>{post.user.title} • {post.user.time}</p>
                </div>
              </div>
              <button className="post-more"><FiMoreVertical /></button>
            </div>
            
            <div className="post-content">
              <p>{post.content}</p>
            </div>

            <div className="post-stats">
              <span>{post.likes.toLocaleString()} likes</span>
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>

            <div className="post-actions">
              <button className="post-action-btn">
                <FiThumbsUp /> Like
              </button>
              <button className="post-action-btn">
                <FiMessageCircle /> Comment
              </button>
              <button className="post-action-btn">
                <FiShare2 /> Share
              </button>
              <button className="post-action-btn">
                <FiSend /> Send
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="home-sidebar right">
        {/* News & Updates */}
        <div className="news-card">
          <h4>Career News & Updates</h4>
          <div className="news-item">
            <MdWork />
            <div>
              <p>Tech salaries increased by 15% this year</p>
              <small>2 hours ago</small>
            </div>
          </div>
          <div className="news-item">
            <MdSchool />
            <div>
              <p>New certification: Advanced React Patterns</p>
              <small>5 hours ago</small>
            </div>
          </div>
          <div className="news-item">
            <MdCelebration />
            <div>
              <p>Your connection got a new job at Amazon</p>
              <small>1 day ago</small>
            </div>
          </div>
        </div>

        {/* Suggested Connections */}
        <div className="connections-card">
          <div className="card-header">
            <h4>Suggested for You</h4>
            <button className="see-all">See all</button>
          </div>
          {suggestedConnections.map((conn) => (
            <div key={conn.id} className="connection-item">
              <div className="conn-info">
                <div className="conn-avatar">{conn.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <h5>{conn.name}</h5>
                  <p>{conn.title}</p>
                  <small>{conn.mutual} mutual connections</small>
                </div>
              </div>
              <button className="connect-btn">Connect</button>
            </div>
          ))}
        </div>

        {/* Trending Topics */}
        <div className="trending-card">
          <h4>Trending Topics</h4>
          {trendingTopics.map((topic, index) => (
            <div key={index} className="trending-item">
              <span className="trending-tag">{topic.tag}</span>
              <span className="trending-count">{topic.posts} posts</span>
            </div>
          ))}
          <button className="show-more">Show more</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
