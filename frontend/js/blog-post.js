// Blog Post Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPost();
});

async function loadBlogPost() {
    const container = document.getElementById('blogPost');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        container.innerHTML = '<div class="container"><h1>Статья не найдена</h1></div>';
        return;
    }

    try {
        const post = await window.API.blog.getById(postId);

        container.innerHTML = `
            <div class="blog-post">
                ${post.image ? `<img src="${post.image}" alt="${post.title}" class="blog-post-image">` : ''}
                <h1 class="blog-post-title">${post.title}</h1>
                <div class="blog-post-meta">
                    ${post.author ? `<span>Автор: ${post.author.name || 'Администратор'}</span>` : ''}
                    ${post.publishedAt ? `<span>${new Date(post.publishedAt).toLocaleDateString('ru-RU')}</span>` : ''}
                    ${post.views ? `<span>Просмотров: ${post.views}</span>` : ''}
                </div>
                <div class="blog-post-content">
                    ${post.content}
                </div>
            </div>
        `;

        document.title = `${post.title} - ПетроЭксперт`;
    } catch (error) {
        console.error('Error loading blog post:', error);
        container.innerHTML = '<div class="container"><h1>Ошибка загрузки статьи</h1></div>';
    }
}
