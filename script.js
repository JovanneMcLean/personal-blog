document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('blog-form');
    const errorMessage = document.getElementById('error-message');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const backButton = document.getElementById('back-button');
    const formSection = document.getElementById('form-section');
    const postsSection = document.getElementById('posts-section');
    const postsContainer = document.getElementById('posts-container');

    // Form submission
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;

            if (!username || !title || !content) {
                errorMessage.textContent = 'Please complete the form.';
                return;
            }

            const blogPost = { username, title, content };

            let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            posts.push(blogPost);
            localStorage.setItem('blogPosts', JSON.stringify(posts));

            showPostsSection();
            form.reset(); // Clear form fields
            errorMessage.textContent = ''; // Clear error message
        });
    }

    // Load posts
    function loadPosts() {
        postsContainer.innerHTML = '';
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <h3>By ${post.username}</h3>
                <p>${post.content}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Toggle theme
    if (toggleThemeButton) {
        toggleThemeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            toggleThemeButton.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
        });
    }

    // Back button
    if (backButton) {
        backButton.addEventListener('click', () => {
            showFormSection();
        });
    }

    // Show form section
    function showFormSection() {
        formSection.style.display = 'flex';
        postsSection.style.display = 'none';
        backButton.style.display = 'none';
        loadPosts(); // Load posts in case new posts were added while viewing posts
    }

    // Show posts section
    function showPostsSection() {
        formSection.style.display = 'none';
        postsSection.style.display = 'block';
        backButton.style.display = 'inline-block';
        loadPosts(); // Reload posts to display the new post immediately
    }

    // Initial call to load posts
    loadPosts();
});
