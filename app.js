const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Global array to store User 1 posts after initial fetch
let userPosts = [];

const statusEl = document.getElementById('status');
const containerEl = document.getElementById('posts-container');
const searchInput = document.getElementById('searchInput');

// 1. Fetch & Store Data
const fetchPosts = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const posts = await response.json();

    // Initial array filter for userId 1
    userPosts = posts.filter(({ userId }) => userId === 1);

    statusEl.textContent = `Showing ${userPosts.length} posts.`;
    renderPosts(userPosts);
  } catch (error) {
    statusEl.textContent = `Error: ${error.message}`;
    statusEl.style.color = '#d32f2f';
  }
};

// 2. Render Posts to DOM
const renderPosts = (postsToDisplay) => {
  containerEl.innerHTML = '';

  if (postsToDisplay.length === 0) {
    containerEl.innerHTML = '<p class="no-results">No posts found matching your filter.</p>';
    return;
  }

  postsToDisplay.forEach(({ id, title, body }) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>#${id} ${title}</h3>
      <p>${body}</p>
    `;
    containerEl.appendChild(card);
  });
};

// 3. Live Filter Event Listener using .filter()
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();

  // JavaScript .filter() checks title or body against query
  const filteredPosts = userPosts.filter(({ title, body }) => 
    title.toLowerCase().includes(query) || body.toLowerCase().includes(query)
  );

  statusEl.textContent = `Showing ${filteredPosts.length} of ${userPosts.length} posts.`;
  renderPosts(filteredPosts);
});

fetchPosts();