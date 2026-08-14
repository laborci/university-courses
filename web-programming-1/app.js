const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/laborci/university-courses/main/web-programming-1';

let config = null;
let currentLang = '';

const dom = {
    langSelect: document.getElementById('lang-select'),
    navTree: document.getElementById('nav-tree'),
    content: document.getElementById('content'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    sidebar: document.getElementById('sidebar')
};

// Initialize
async function init() {
    try {
        // Fetch config directly from GitHub
        const response = await fetch(`${GITHUB_RAW_BASE}/config.json`);
        config = await response.json();
        
        setupLanguageSelector();
        setupMobileMenu();
        
        window.addEventListener('hashchange', handleRoute);
        
        // Initial route
        handleRoute();
    } catch (err) {
        dom.content.innerHTML = `<div style="color:red">Error loading configuration from GitHub.</div>`;
        console.error(err);
    }
}

function setupLanguageSelector() {
    config.languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = lang.toUpperCase();
        dom.langSelect.appendChild(option);
    });

    dom.langSelect.addEventListener('change', (e) => {
        const newLang = e.target.value;
        if (newLang !== currentLang) {
            // Navigate to root of new language
            const firstFile = config.sidebar[newLang]?.[0]?.files?.[0]?.path;
            if (firstFile) {
                window.location.hash = `#/${firstFile}`;
            }
        }
    });
}

function setupMobileMenu() {
    dom.mobileMenuBtn.addEventListener('click', () => {
        dom.sidebar.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!dom.sidebar.contains(e.target) && !dom.mobileMenuBtn.contains(e.target)) {
            dom.sidebar.classList.remove('open');
        }
    });
}

function renderSidebar(lang, activePath) {
    dom.navTree.innerHTML = '';
    const sections = config.sidebar[lang] || [];
    
    sections.forEach(section => {
        const sectionEl = document.createElement('div');
        sectionEl.className = 'nav-section';
        
        const titleEl = document.createElement('div');
        titleEl.className = 'nav-section-title';
        titleEl.textContent = section.title;
        sectionEl.appendChild(titleEl);
        
        const ul = document.createElement('ul');
        ul.className = 'nav-links';
        
        section.files.forEach(file => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'nav-link';
            if (activePath === file.path) {
                a.classList.add('active');
            }
            a.href = `#/${file.path}`;
            a.textContent = file.title;
            li.appendChild(a);
            ul.appendChild(li);
        });
        
        sectionEl.appendChild(ul);
        dom.navTree.appendChild(sectionEl);
    });
}

async function loadContent(path) {
    dom.content.innerHTML = `<div class="loader">Loading from GitHub...</div>`;
    try {
        // Fetch raw markdown directly from GitHub
        const response = await fetch(`${GITHUB_RAW_BASE}/${path}`);
        if (!response.ok) throw new Error('File not found');
        
        const markdown = await response.text();
        
        // Setup marked to handle relative links within markdown
        const renderer = new marked.Renderer();
        const basePath = path.substring(0, path.lastIndexOf('/') + 1);
        
        renderer.link = function(href, title, text) {
            if (href.endsWith('.md') && !href.startsWith('http')) {
                // Convert relative markdown links to hash routes
                let resolvedPath = basePath + href;
                resolvedPath = resolvedPath.replace(/\.\//g, '');
                return `<a href="#/${resolvedPath}" title="${title || ''}">${text}</a>`;
            }
            return `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`;
        };

        // Also fix relative image paths to load from GitHub
        renderer.image = function(href, title, text) {
            if (!href.startsWith('http')) {
                let resolvedPath = basePath + href;
                resolvedPath = resolvedPath.replace(/\.\//g, '');
                href = `${GITHUB_RAW_BASE}/${resolvedPath}`;
            }
            return `<img src="${href}" alt="${text}" title="${title || ''}" />`;
        };
        
        marked.setOptions({ renderer });
        
        dom.content.innerHTML = marked.parse(markdown);
        
        // Scroll to top
        window.scrollTo(0, 0);
        // Close mobile menu
        dom.sidebar.classList.remove('open');
        
    } catch (err) {
        dom.content.innerHTML = `
            <h2>Page not found</h2>
            <p>The requested document could not be loaded from GitHub.</p>
        `;
    }
}

function handleRoute() {
    let hash = window.location.hash.slice(1); // remove #
    if (hash.startsWith('/')) hash = hash.slice(1);
    
    // Default route
    if (!hash) {
        const defaultLang = config.defaultLanguage;
        const firstFile = config.sidebar[defaultLang]?.[0]?.files?.[0]?.path;
        if (firstFile) {
            window.location.hash = `#/${firstFile}`;
            return;
        }
    }
    
    // Determine language from path (e.g. hu/01-...)
    const pathParts = hash.split('/');
    const lang = pathParts[0];
    
    if (config.languages.includes(lang)) {
        currentLang = lang;
        dom.langSelect.value = lang;
    }
    
    renderSidebar(currentLang, hash);
    loadContent(hash);
}

// Start app
init();
