const apiURL = 'https://jsonplaceholder.typicode.com/posts';

// Async function using ES6+ arrow function syntax
const fetchAndProcessPosts = async () => {
  try {
    // 1. Asynchronous fetch request
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse JSON asynchronously
    const posts = await response.json();

    // 2. ES6+ Data Handling (Destructuring, Arrow functions, Array methods)
    
    // Filter posts for a specific user (e.g., userId 1)
    // Destructuring 'userId' directly inside the filter parameter
    const userOnePosts = posts
      .filter(({ userId }) => userId === 1)
      .map(({ id, title, body }) => ({
        id,
        // String transformation & Template Literals
        formattedTitle: title.toUpperCase(),
        summary: `${body.slice(0, 40)}...`
      }));

    // 3. Destructuring the first post to display clean output
    const [firstPost, ...remainingPosts] = userOnePosts;

    console.log(`Total Posts Fetched: ${posts.length}`);
    console.log(`User 1 Posts Count: ${userOnePosts.length}`);
    console.log('Sample Formatted Post:', firstPost);

    return userOnePosts;
  } catch (error) {
    console.error(`Fetch Error: ${error.message}`);
  }
};

// Execute the async function
fetchAndProcessPosts();