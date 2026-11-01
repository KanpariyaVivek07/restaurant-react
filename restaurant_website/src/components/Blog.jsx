import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div class="blog">
        <h1>Our<span>Blog</span></h1>
        <div class="blog_box">
            <div class="blog_card">
                <div class="blog_img">
                    <img src="image/blog_1.jpeg" alt="Pizza Dough Blog"/>
                </div>

                <div class="blog_tag">
                    <div class="blog_date">
                        <p>18 May 2022<i class="fa-solid fa-calendar-days"></i></p>
                    </div>

                    <h3 class="blog_heading">
                        The Secret to Perfect Homemade Pizza Dough
                    </h3>

                    <p class="blog_text">
                        Discover the art of creating restaurant-quality pizza dough at home.
                        Learn about the perfect flour-to-water ratio, proper kneading techniques,
                        and the importance of letting your dough rest.
                    </p>

                    <hr/>

                    <div class="view_and_like">
                        <div class="view">
                            <p>15.3K Views</p>
                            <p class="b_comm">786 comments</p>
                        </div>

                        <div class="like">
                            <p>3K</p>
                            <i class="fa-regular fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="blog_card">
                <div class="blog_img">
                    <img src="image/blog_2.jpg" alt="Seasonal Ingredients"/>
                </div>

                <div class="blog_tag">
                    <div class="blog_date">
                        <p>12 June 2024<i class="fa-solid fa-calendar-days"></i></p>
                    </div>

                    <h3 class="blog_heading">
                        Seasonal Ingredients: What's Fresh This Month
                    </h3>

                    <p class="blog_text">
                        Explore the freshest seasonal ingredients that are making their way
                        into our kitchen this month. From spring asparagus to summer berries,
                        learn how we incorporate local, seasonal produce.
                    </p>

                    <hr/>

                    <div class="view_and_like">
                        <div class="view">
                            <p>15.3K Views</p>
                            <p class="b_comm">786 comments</p>
                        </div>

                        <div class="like">
                            <p>3K</p>
                            <i class="fa-regular fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="blog_card">
                <div class="blog_img">
                    <img src="image/blog_3.jpg" alt="Kitchen Behind the Scenes"/>
                </div>

                <div class="blog_tag">
                    <div class="blog_date">
                        <p>8 June 2024<i class="fa-solid fa-calendar-days"></i></p>
                    </div>

                    <h3 class="blog_heading">
                        Behind the Scenes: A Day in Our Kitchen
                    </h3>

                    <p class="blog_text">
                        Take a peek behind the scenes and discover what goes into preparing
                        your favorite dishes. From early morning prep work to the final
                        plating, see how our dedicated team works together.
                    </p>

                    <hr/>

                    <div class="view_and_like">
                        <div class="view">
                            <p>15.3K Views</p>
                            <p class="b_comm">786 comments</p>
                        </div>

                        <div class="like">
                            <p>3K</p>
                            <i class="fa-regular fa-heart"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Blog;