// Blog Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();
});

async function loadBlogPosts() {
    const container = document.getElementById('blogGrid');
    if (!container) return;

    try {
        const response = await window.API.blog.getAll();
        const posts = response.posts || [];

        if (posts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Статьи не найдены</p>
                </div>
            `;
            return;
        }

        container.innerHTML = posts.map(post => `
            <a href="blog-post.html?id=${post._id}" class="blog-card">
                ${post.image ? `<img src="${post.image}" alt="${post.title}" class="blog-card-image">` : ''}
                <div class="blog-card-content">
                    <h3 class="blog-card-title">${post.title}</h3>
                    <p class="blog-card-excerpt">${post.excerpt || post.content.substring(0, 150)}...</p>
                    <span class="blog-card-link">Читать далее →</span>
                </div>
            </a>
        `).join('');
    } catch (error) {
        console.error('Error loading blog posts:', error);
        container.innerHTML = `
            <div class="empty-state">
                <p>Ошибка загрузки статей</p>
            </div>
        `;
    }
}
