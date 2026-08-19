const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let userPosts = [];

const statusEl = document.getElementById('status');
const containerEl = document.getElementById('posts-container');
const searchInput = document.getElementById('searchInput');
const fetchPosts = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const posts = await response.json();

    userPosts = posts.filter(({ userId }) => userId === 1);

    statusEl.textContent = `Showing ${userPosts.length} posts.`;
    renderPosts(userPosts);
  } catch (error) {
    statusEl.textContent = `Error: ${error.message}`;
    statusEl.style.color = '#d32f2f';
  }
};

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

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();

  const filteredPosts = userPosts.filter(({ title, body }) => 
    title.toLowerCase().includes(query) || body.toLowerCase().includes(query)
  );

  statusEl.textContent = `Showing ${filteredPosts.length} of ${userPosts.length} posts.`;
  renderPosts(filteredPosts);
});

fetchPosts();