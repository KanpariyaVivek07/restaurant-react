// BlogPage.jsx
import React, { useState, useEffect } from 'react';
import '../css/BlogPage.css'; // Import the CSS file

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [expandedChef, setExpandedChef] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'restaurant-news', name: 'Restaurant News' },
    { id: 'recipes', name: 'Recipes' },
    { id: 'ingredients', name: 'Ingredients' },
    { id: 'chef-tips', name: 'Chef Tips' }
  ];

  // Load data on component mount
  useEffect(() => {
    const blogData = [
      {
        id: 1,
        title: "The Secret Behind Our Award-Winning Ramen",
        image: "/image/blog_1.jpeg",
        date: "15 June 2023",
        category: "restaurant-news",
        content: "After years of perfecting our craft, we're proud to share that our signature ramen has won the 'Best Noodle Dish' award. What makes it special? It starts with our 18-hour pork bone broth simmered with secret spices from Kyushu, Japan.",
        views: 12400,
        comments: 142,
        likes: 2800,
        saved: false,
        liked: false
      },
      {
        id: 2,
        title: "Seasonal Specials: Summer Flavors Arrive",
        image: "/image/blog_2.jpg",
        date: "28 May 2023",
        category: "recipes",
        content: "This summer we're introducing refreshing new dishes featuring locally-sourced produce. Try our chilled somen noodles with heirloom tomatoes or the citrus-marinated salmon bowl. Limited time only through August!",
        views: 9700,
        comments: 89,
        likes: 1500,
        saved: false,
        liked: false
      },
      {
        id: 3,
        title: "Vegetarian Options: Flavor Without Compromise",
        image: "/image/blog_3.jpg",
        date: "10 May 2023",
        category: "ingredients",
        content: "Our new mushroom-based ramen broth has been in development for 6 months, combining shiitake, maitake, and porcini mushrooms for an umami-rich vegetarian alternative that even meat-lovers enjoy.",
        views: 8200,
        comments: 76,
        likes: 1200,
        saved: false,
        liked: false
      },
      {
        id: 4,
        title: "The Art of Noodle Making: A Chef's Perspective",
        image: "/image/blog_4.jpg",
        date: "22 April 2023",
        category: "chef-tips",
        content: "Join Chef Alex as he demonstrates the traditional Japanese techniques we use to make our noodles fresh daily. From flour selection to the perfect alkaline balance, learn what makes our noodles special.",
        views: 11300,
        comments: 103,
        likes: 2100,
        saved: false,
        liked: false
      },
      {
        id: 5,
        title: "Spice Levels Explained: Finding Your Perfect Heat",
        image: "/image/blog_5.jpg",
        date: "5 April 2023",
        category: "chef-tips",
        content: "Our spice scale ranges from 1-10, but what does that really mean? We break down each level with recommendations based on your tolerance. Plus: the story behind our house-made chili oil.",
        views: 7500,
        comments: 64,
        likes: 1100,
        saved: false,
        liked: false
      },
      {
        id: 6,
        title: "Behind the Scenes: A Day in Our Kitchen",
        image: "/image/blog_6.jpg",
        date: "18 March 2023",
        category: "restaurant-news",
        content: "Ever wonder what goes on before we open our doors? Follow our team from 5 AM broth preparation to late-night cleaning. Meet the dedicated staff who make your dining experience possible.",
        views: 10100,
        comments: 92,
        likes: 1800,
        saved: false,
        liked: false
      },
      {
        id: 7,
        title: "Ramen Pairings: Best Sides and Drinks",
        image: "/image/blog_7.jpg",
        date: "2 March 2023",
        category: "chef-tips",
        content: "While our ramen shines on its own, the right accompaniments can elevate your meal. Our sommelier recommends perfect drink pairings, from craft beers to non-alcoholic options.",
        views: 6800,
        comments: 58,
        likes: 987,
        saved: false,
        liked: false
      },
      {
        id: 8,
        title: "Meet Our Chefs: The Team Behind the Flavors",
        image: "/image/blog_8.jpg",
        date: "15 February 2023",
        category: "restaurant-news",
        content: "Get to know the culinary artists who create your favorite dishes. From Tokyo-trained ramen masters to our pastry chef with 20 years experience, discover the faces behind your meal.",
        views: 9300,
        comments: 87,
        likes: 1600,
        saved: false,
        liked: false
      },
      {
        id: 9,
        title: "The History of Ramen and Our Interpretation",
        image: "/image/blog_9.jpeg",
        date: "28 January 2023",
        category: "ingredients",
        content: "Tracing ramen's journey from Chinese noodle soup to Japanese staple, and how we've adapted traditions for modern palates while respecting the dish's roots.",
        views: 8700,
        comments: 79,
        likes: 1400,
        saved: false,
        liked: false
      },
      {
        id: 10,
        title: "Customer Favorites: Top 5 Most Ordered Dishes",
        image: "/image/blog_10.jpeg",
        date: "10 January 2023",
        category: "restaurant-news",
        content: "Beyond our famous ramen, these dishes keep customers coming back. Discover why our pork buns have a cult following and which dessert surprises everyone.",
        views: 7900,
        comments: 71,
        likes: 1300,
        saved: false,
        liked: false
      },
      {
        id: 11,
        title: "Ramen Making Classes: Coming This Spring",
        image: "/image/blog_11.jpg",
        date: "20 December 2022",
        category: "restaurant-news",
        content: "We're excited to announce hands-on workshops where you can learn to make ramen at home. Limited spots available - sign up for our newsletter to get early access.",
        views: 6500,
        comments: 53,
        likes: 945,
        saved: false,
        liked: false
      },
      {
        id: 12,
        title: "Our Sustainability Promise: Farm to Bowl",
        image: "/image/blog_12.webp",
        date: "5 December 2022",
        category: "ingredients",
        content: "How we're reducing food waste, sourcing ethically, and supporting local farmers while maintaining authentic flavors. Our commitment to the planet and our community.",
        views: 5800,
        comments: 47,
        likes: 872,
        saved: false,
        liked: false
      }
    ];

    const chefsData = [
      {
        id: 1,
        name: "Chef Tanaka",
        role: "Head Ramen Chef, Tokyo",
        image: "/image/follow_1.png",
        bio: "Trained for 10 years in Tokyo's finest ramen shops before bringing his expertise to our kitchen. Specializes in tonkotsu broth preparation and traditional toppings."
      },
      {
        id: 2,
        name: "Chef Maria",
        role: "Pastry Chef, Barcelona",
        image: "/image/follow_2.png",
        bio: "Combines traditional Japanese wagashi with Western pastry techniques for unique desserts. Creator of our signature matcha tiramisu."
      },
      {
        id: 3,
        name: "Chef Alex",
        role: "Content Chef, New York",
        image: "/image/follow_3.png",
        bio: "Creates our recipe content and develops new dishes inspired by global street food. Host of our popular cooking classes."
      },
      {
        id: 4,
        name: "Sous Chef Lee",
        role: "Noodle Specialist, Seoul",
        image: "/image/follow_4.png",
        bio: "Master of traditional and innovative noodle-making techniques with 15 years experience. Developed our house-made alkaline noodles."
      },
      {
        id: 5,
        name: "Sommelier Dupont",
        role: "Beverage Director, Paris",
        image: "/image/follow_5.jpg",
        bio: "Curates our drink pairings with an emphasis on small producers and unique flavor combinations. Creator of our sake flight program."
      },
      {
        id: 6,
        name: "Chef Patel",
        role: "Vegetarian Specialist, Mumbai",
        image: "/image/follow_6.jpg",
        bio: "Develops our plant-based menu items with authentic Indian spices and techniques. Creator of our popular vegan ramen options."
      },
      {
        id: 7,
        name: "Chef Garcia",
        role: "Grill Master, Mexico City",
        image: "/image/follow_7.jpg",
        bio: "Brings bold Mexican flavors to our grilled items and small plates. Developed our popular chashu pork recipe."
      },
      {
        id: 8,
        name: "Chef Chen",
        role: "Dim Sum Chef, Hong Kong",
        image: "/image/follow_8.webp",
        bio: "Creates our popular dumpling and small bite menu with Cantonese precision. Trained in Michelin-starred dim sum houses."
      },
      {
        id: 9,
        name: "Chef Rossi",
        role: "Pasta Specialist, Rome",
        image: "/image/follow_9.jpg",
        bio: "Italian-trained chef who adapts traditional pasta techniques to Japanese noodle dishes. Creator of our udon-carbonara fusion."
      },
      {
        id: 10,
        name: "Pastry Chef Laurent",
        role: "Dessert Innovator, Lyon",
        image: "/image/follow_10.jpg",
        bio: "Combines French pastry techniques with Japanese ingredients for our signature desserts. Developed our black sesame crème brûlée."
      }
    ];

    // Initialize mock comments for each post
    const initialComments = {};
    blogData.forEach(post => {
      initialComments[post.id] = [
        {
          id: 1,
          author: "Food Lover",
          date: "2 days ago",
          text: "This recipe changed my life! So delicious!"
        },
        {
          id: 2,
          author: "Home Chef",
          date: "1 week ago",
          text: "I tried this at home and it turned out great. Thanks for the tips!"
        }
      ];
    });

    setComments(initialComments);
    setBlogPosts(blogData);
    setChefs(chefsData);
    
    // Add scroll event listener for back to top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Filter posts by category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSavePost = (postId) => {
    setBlogPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId ? { ...post, saved: !post.saved } : post
      )
    );
    
    setSavedPosts(prev => {
      const isAlreadySaved = prev.includes(postId);
      return isAlreadySaved 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId];
    });
  };

  const toggleLikePost = (postId) => {
    setBlogPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            } 
          : post
      )
    );
  };

  const openCommentModal = (post) => {
    setSelectedPost(post);
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
    setSelectedPost(null);
    setNewComment('');
  };

  const toggleChefBio = (chefId) => {
    setExpandedChef(expandedChef === chefId ? null : chefId);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() && selectedPost) {
      const newCommentObj = {
        id: Date.now(),
        author: "You",
        date: "Just now",
        text: newComment
      };

      setComments(prev => ({
        ...prev,
        [selectedPost.id]: [newCommentObj, ...prev[selectedPost.id]]
      }));

      // Update comment count
      setBlogPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === selectedPost.id 
            ? { ...post, comments: post.comments + 1 } 
            : post
        )
      );

      setNewComment('');
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  const formatCategory = (category) => {
    const words = category.split('-');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="blog-page">
      {/* Banner */}
      <div className="hero_banner">
        <div className="banner_content">
          <h1><span>Our</span> Food Blog</h1>
          <p className="subtitle">Culinary stories, recipes, and chef insights</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          <div className="scroll_hint">
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="var(--white)" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="banner_overlay"></div>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Blog Content */}
      <div className="main_blog anim">
        <div className="slide_1">
          <div className="blog_box">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div key={post.id} className="blog_card" data-id={post.id} data-category={post.category}>
                  <div className="blog_image">
                    <img src={post.image} alt={post.title} />
                    <button 
                      className={`save-post-btn ${post.saved ? 'saved' : ''}`}
                      onClick={() => toggleSavePost(post.id)}
                    >
                      <i className={post.saved ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>
                    </button>
                  </div>
                  <div className="blog_tag">
                    <div className="blog_date">
                      <p>{post.date} <i className="fa-solid fa-calendar-days"></i></p>
                      <span className="post-category">{formatCategory(post.category)}</span>
                    </div>
                    <h3 className="blog_heading">{post.title}</h3>
                    <p className="blog_text">{post.content}</p>
                    <hr />
                    <div className="view_and_like">
                      <div className="view">
                        <p>{formatNumber(post.views)} views</p>
                        <p className="b_com" onClick={() => openCommentModal(post)}>
                          {post.comments} comments
                        </p>
                      </div>
                      <div className="like">
                        <p>{formatNumber(post.likes)}</p>
                        <i 
                          className={`fa-${post.liked ? 'solid' : 'regular'} fa-heart`}
                          onClick={() => toggleLikePost(post.id)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-posts-message">
                <i className="fas fa-search"></i>
                <h3>No posts found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="slide_2">
          <div className="blog_sidebar">
            {/* Popular Posts */}
            <div className="sidebar_section">
              <h3>Popular Posts</h3>
              {blogPosts
                .sort((a, b) => b.views - a.views)
                .slice(0, 3)
                .map(post => (
                  <div key={post.id} className="popular_post">
                    <img src={post.image} alt={post.title} />
                    <div className="popular_post_content">
                      <h4>{post.title}</h4>
                      <p>{post.date}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Categories */}
            <div className="sidebar_section">
              <h3>Categories</h3>
              <ul className="category_list">
                {categories.map(category => (
                  <li 
                    key={category.id} 
                    className={activeCategory === category.id ? 'active' : ''}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                    <span>({blogPosts.filter(post => post.category === category.id).length})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Chefs */}
            <div className="sidebar_section">
              <h3>Meet Our Chefs</h3>
              <div className="chef_list">
                {chefs.map(chef => (
                  <div 
                    key={chef.id} 
                    className="chef_card"
                    onClick={() => toggleChefBio(chef.id)}
                  >
                    <img src={chef.image} alt={chef.name} />
                    <div className="chef_info">
                      <h4>{chef.name}</h4>
                      <p>{chef.role}</p>
                      {expandedChef === chef.id && (
                        <div className="chef_bio">
                          <p>{chef.bio}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="sidebar_section newsletter">
              <h3>Subscribe to Newsletter</h3>
              <p>Get the latest recipes and cooking tips delivered to your inbox.</p>
              <form className="newsletter_form">
                <input type="email" placeholder="Your email address" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      {isCommentModalOpen && selectedPost && (
        <div className="comment_modal">
          <div className="modal_content">
            <div className="modal_header">
              <h3>Comments ({selectedPost.comments})</h3>
              <button className="close_modal" onClick={closeCommentModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="comment_form">
              <textarea
                placeholder="Add your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button onClick={handleCommentSubmit}>Post Comment</button>
            </div>
            <div className="comments_list">
              {comments[selectedPost.id].map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment_avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="comment_content">
                    <div className="comment_header">
                      <h4>{comment.author}</h4>
                      <span>{comment.date}</span>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <div className="back_to_top show" onClick={scrollToTop}>
          <a href="#">
            <i className="fas fa-arrow-up"></i>
          </a>
        </div>
      )}
    </div>
  );
};

export default BlogPage;