(function (window) {
  'use strict';

  const { fetchManifest, debounce, escapeHtml, formatDate } = window.SkillUtils;

  const CATEGORIES = [
    'All',
    'Document Processing',
    'Data & Spreadsheets',
    'Communication & Drafting',
    'Research & Summarization',
    'Code & Development',
    'Scheduling & Automation',
    'Presentations',
    'Other',
  ];

  let allSkills = [];
  let activeCategory = 'All';
  let activeSort = 'newest';
  let searchQuery = '';

  // ---------- Filtering & Sorting ----------

  function filterSkills(skills, query, category) {
    return skills.filter((skill) => {
      const matchesCategory = category === 'All' || skill.category === category;
      if (!matchesCategory) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      const searchable = [
        skill.name || '',
        skill.description || '',
        (skill.tags || []).join(' '),
        skill.author || '',
        skill.category || '',
      ].join(' ').toLowerCase();
      return searchable.includes(q);
    });
  }

  function sortSkills(skills, sort) {
    const copy = [...skills];
    if (sort === 'newest') {
      copy.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    } else if (sort === 'popular') {
      copy.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
    } else if (sort === 'alpha') {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    }
    return copy;
  }

  // ---------- Rendering ----------

  function categoryBadgeClass(category) {
    const map = {
      'Document Processing': 'bg-amber-50 text-amber-600',
      'Data & Spreadsheets': 'bg-emerald-50 text-emerald-600',
      'Communication & Drafting': 'bg-sky-50 text-sky-600',
      'Research & Summarization': 'bg-violet-50 text-violet-600',
      'Code & Development': 'bg-teal-50 text-teal-600',
      'Scheduling & Automation': 'bg-orange-50 text-orange-500',
      'Presentations': 'bg-pink-50 text-pink-500',
      'Other': 'bg-gray-50 text-gray-500',
    };
    return map[category] || map['Other'];
  }

  function defaultIconSvg(category) {
    const icons = {
      'Document Processing': '📄',
      'Data & Spreadsheets': '📊',
      'Communication & Drafting': '✉️',
      'Research & Summarization': '🔍',
      'Code & Development': '💻',
      'Scheduling & Automation': '⚙️',
      'Presentations': '📽️',
      'Other': '🧩',
    };
    return icons[category] || '🧩';
  }

  function renderSkillCard(skill) {
    const tags = (skill.tags || []).slice(0, 3);
    const tagHtml = tags
      .map((t) => `<span class="inline-block bg-gray-50 text-gray-500 text-xs px-2 py-0.5 rounded-full border border-gray-200">${escapeHtml(t)}</span>`)
      .join('');
    const icon = skill.icon
      ? `<img src="${escapeHtml(skill.icon)}" alt="${escapeHtml(skill.name)} icon" class="w-12 h-12 rounded-xl object-cover" />`
      : `<div class="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl" aria-hidden="true">${defaultIconSvg(skill.category)}</div>`;

    return `
      <article class="skill-card rounded-xl p-6 flex flex-col gap-4" data-skill-id="${escapeHtml(skill.id)}">
        <div class="flex items-start gap-4">
          ${icon}
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-semibold text-base leading-tight">
                <a href="skill.html?id=${escapeHtml(skill.id)}" class="hover:text-[#00a187] focus:outline-none focus-visible:underline">
                  ${escapeHtml(skill.name)}
                </a>
              </h3>
              ${skill.featured ? '<span class="badge-featured text-xs px-2 py-0.5 rounded-full font-medium">Featured</span>' : ''}
            </div>
            <span class="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${categoryBadgeClass(skill.category)}">${escapeHtml(skill.category)}</span>
          </div>
        </div>
        <p class="skill-card__description text-sm">${escapeHtml(skill.description)}</p>
        <div class="flex flex-wrap gap-1">${tagHtml}</div>
        <div class="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div class="text-xs text-gray-500">
            <span>by ${escapeHtml(skill.author)}</span>
            <span class="mx-1">·</span>
            <span>v${escapeHtml(skill.version)}</span>
          </div>
          <a href="skill.html?id=${escapeHtml(skill.id)}"
             class="text-sm bg-[#00a187] hover:bg-[#007d68] text-white px-3 py-1.5 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
             aria-label="View and download ${escapeHtml(skill.name)}">
            View &amp; Download
          </a>
        </div>
      </article>`;
  }

  function renderFeatured(skills) {
    const featured = skills.filter((s) => s.featured);
    const container = document.getElementById('featured-grid');
    if (!container) return;
    if (featured.length === 0) {
      document.getElementById('featured-section').style.display = 'none';
      return;
    }
    container.innerHTML = featured.map(renderSkillCard).join('');
  }

  function renderCatalog(skills) {
    const container = document.getElementById('catalog-grid');
    const countEl = document.getElementById('result-count');
    if (!container) return;

    if (skills.length === 0) {
      container.innerHTML = `
        <div class="col-span-full empty-state">
          <div class="text-5xl mb-4" aria-hidden="true">🔍</div>
          <h3 class="text-lg font-semibold mb-2">No skills found</h3>
          <p class="text-sm">Try adjusting your search or clearing the category filter.</p>
          <button onclick="Marketplace.clearFilters()" class="mt-4 text-[#00a187] text-sm underline hover:no-underline">
            Clear filters
          </button>
        </div>`;
    } else {
      container.innerHTML = skills.map(renderSkillCard).join('');
    }

    if (countEl) {
      const total = allSkills.length;
      countEl.textContent = skills.length === total
        ? `${total} skill${total !== 1 ? 's' : ''}`
        : `${skills.length} of ${total} skills`;
    }
  }

  function renderCategoryButtons() {
    const container = document.getElementById('category-filters');
    const drawerContainer = document.getElementById('drawer-category-filters');
    if (!container) return;

    const html = CATEGORIES.map((cat) => `
      <button
        class="category-btn w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors${cat === activeCategory ? ' active' : ''}"
        data-category="${escapeHtml(cat)}"
        aria-pressed="${cat === activeCategory}"
      >${escapeHtml(cat)}</button>
    `).join('');

    container.innerHTML = html;
    if (drawerContainer) drawerContainer.innerHTML = html;

    // Wire up click events
    [container, drawerContainer].forEach((c) => {
      if (!c) return;
      c.querySelectorAll('.category-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          activeCategory = btn.dataset.category;
          updateCatalog();
          renderCategoryButtons();
          // Close drawer on mobile after selection
          setDrawerOpen(false);
        });
      });
    });
  }

  function updateCatalog() {
    const filtered = filterSkills(allSkills, searchQuery, activeCategory);
    const sorted = sortSkills(filtered, activeSort);
    renderCatalog(sorted);
  }

  // ---------- Mobile Drawer ----------

  function setDrawerOpen(open) {
    const drawer = document.getElementById('filter-drawer');
    if (!drawer) return;
    if (open) {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      const panel = document.getElementById('filter-drawer__panel');
      if (panel) panel.focus();
    } else {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
    }
  }

  // ---------- Skeleton Loaders ----------

  function renderSkeletons(count) {
    const container = document.getElementById('catalog-grid');
    if (!container) return;
    container.innerHTML = Array.from({ length: count }, () => `
      <div class="skill-card rounded-xl p-6 flex flex-col gap-4">
        <div class="flex items-start gap-4">
          <div class="skeleton w-12 h-12 rounded-xl"></div>
          <div class="flex-1 space-y-2">
            <div class="skeleton h-4 w-3/4"></div>
            <div class="skeleton h-3 w-1/3"></div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="skeleton h-3 w-full"></div>
          <div class="skeleton h-3 w-5/6"></div>
        </div>
        <div class="flex gap-2">
          <div class="skeleton h-5 w-14 rounded-full"></div>
          <div class="skeleton h-5 w-14 rounded-full"></div>
        </div>
        <div class="flex justify-between pt-2 border-t border-gray-100">
          <div class="skeleton h-3 w-24"></div>
          <div class="skeleton h-7 w-28 rounded-lg"></div>
        </div>
      </div>
    `).join('');
  }

  // ---------- Init ----------

  async function init() {
    renderSkeletons(6);
    renderCategoryButtons();

    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      const handleSearch = debounce((e) => {
        searchQuery = e.target.value.trim();
        updateCatalog();
      }, 300);
      searchInput.addEventListener('input', handleSearch);
    }

    // Sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        activeSort = e.target.value;
        updateCatalog();
      });
    }

    // Mobile drawer toggle
    document.getElementById('filter-toggle-btn')?.addEventListener('click', () => setDrawerOpen(true));
    document.getElementById('filter-drawer__close')?.addEventListener('click', () => setDrawerOpen(false));
    document.getElementById('filter-drawer__backdrop')?.addEventListener('click', () => setDrawerOpen(false));

    // Keyboard: close drawer on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    });

    try {
      const manifest = await fetchManifest();
      allSkills = manifest.skills || [];
      renderFeatured(allSkills);
      updateCatalog();
    } catch (err) {
      console.error('Failed to load skills:', err);
      const container = document.getElementById('catalog-grid');
      if (container) {
        container.innerHTML = `<div class="col-span-full empty-state">
          <div class="text-5xl mb-4" aria-hidden="true">⚠️</div>
          <p class="text-sm">Failed to load skills. Please refresh the page.</p>
        </div>`;
      }
    }
  }

  function clearFilters() {
    searchQuery = '';
    activeCategory = 'All';
    activeSort = 'newest';
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'newest';
    renderCategoryButtons();
    updateCatalog();
  }

  window.Marketplace = { init, clearFilters };

  document.addEventListener('DOMContentLoaded', init);
})(window);
