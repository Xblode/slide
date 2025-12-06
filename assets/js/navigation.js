// Navigation and component loading
document.addEventListener('DOMContentLoaded', function() {
    // Components are already in the HTML, just set active sidebar item
    setActiveSidebarItem();
});

// Set active sidebar item based on current page
function setActiveSidebarItem() {
    const currentPage = getCurrentPageName();
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        const pageName = item.getAttribute('data-page');
        if (pageName === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Get current page name from URL
function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    if (filename === 'index.html' || filename === '' || filename === '/') {
        return 'dashboard';
    }
    
    // Remove .html extension
    const pageName = filename.replace('.html', '');
    return pageName;
}

