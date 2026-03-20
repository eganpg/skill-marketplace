(function (window) {
  'use strict';

  // NOTE: marked.js is loaded via CDN before this script.
  // README content comes from repo-controlled files, so sanitization is not enabled.
  // Do not expose this page to user-submitted content without adding DOMPurify.

  const { fetchManifest, escapeHtml, buildGitHubIssueUrl, formatDate } = window.SkillUtils;

  const CATEGORY_COLORS = {
    'Document Processing': 'bg-amber-100 text-amber-800',
    'Data & Spreadsheets': 'bg-emerald-100 text-emerald-800',
    'Communication & Drafting': 'bg-sky-100 text-sky-800',
    'Research & Summarization': 'bg-violet-100 text-violet-800',
    'Code & Development': 'bg-teal-100 text-teal-800',
    'Scheduling & Automation': 'bg-orange-100 text-orange-800',
    'Presentations': 'bg-pink-100 text-pink-800',
    'Other': 'bg-gray-100 text-gray-700',
  };

  const CATEGORY_EMOJI = {
    'Document Processing': '📄',
    'Data & Spreadsheets': '📊',
    'Communication & Drafting': '✉️',
    'Research & Summarization': '🔍',
    'Code & Development': '💻',
    'Scheduling & Automation': '⚙️',
    'Presentations': '📽️',
    'Other': '🧩',
  };

  function getSkillIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  function renderNotFound(id) {
    document.title = 'Skill Not Found — Skill Marketplace';
    const main = document.getElementById('skill-content');
    if (main) {
      main.innerHTML = `
        <div class="flex flex-col items-center justify-center py-24 text-center">
          <div class="text-6xl mb-6" aria-hidden="true">🔍</div>
          <h1 class="text-2xl font-bold mb-3">Skill not found</h1>
          <p class="text-gray-500 dark:text-gray-400 mb-6">
            No skill with ID <code class="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">${escapeHtml(id || '')}</code> exists in the marketplace.
          </p>
          <a href="index.html" class="bg-[#00a187] hover:bg-[#007d68] text-white px-5 py-2.5 rounded-full font-medium transition-colors">
            Back to Marketplace
          </a>
        </div>`;
    }
  }

  function renderMeta(skill) {
    document.title = `${skill.name} — Skill Marketplace`;

    // Breadcrumb
    const crumb = document.getElementById('breadcrumb-skill-name');
    if (crumb) crumb.textContent = skill.name;

    // Icon
    const iconEl = document.getElementById('skill-icon');
    if (iconEl) {
      if (skill.icon) {
        iconEl.innerHTML = `<img src="${escapeHtml(skill.icon)}" alt="${escapeHtml(skill.name)} icon" class="w-full h-full object-cover rounded-2xl" />`;
      } else {
        iconEl.textContent = CATEGORY_EMOJI[skill.category] || '🧩';
      }
    }

    // Name
    const nameEl = document.getElementById('skill-name');
    if (nameEl) nameEl.textContent = skill.name;

    // Category badge
    const catEl = document.getElementById('skill-category');
    if (catEl) {
      const colorClass = CATEGORY_COLORS[skill.category] || CATEGORY_COLORS['Other'];
      catEl.textContent = skill.category;
      catEl.className = `inline-block text-sm px-3 py-1 rounded-full font-medium ${colorClass}`;
    }

    // Meta row
    const metaEl = document.getElementById('skill-meta');
    if (metaEl) {
      metaEl.innerHTML = `
        <span>by <strong>${escapeHtml(skill.author)}</strong></span>
        <span class="text-gray-300 dark:text-gray-600" aria-hidden="true">·</span>
        <span>v${escapeHtml(skill.version)}</span>
        <span class="text-gray-300 dark:text-gray-600" aria-hidden="true">·</span>
        <span>Published ${formatDate(skill.publishedAt)}</span>
        ${skill.updatedAt && skill.updatedAt !== skill.publishedAt
          ? `<span class="text-gray-300 dark:text-gray-600" aria-hidden="true">·</span><span>Updated ${formatDate(skill.updatedAt)}</span>`
          : ''}
      `;
    }

    // Tags
    const tagsEl = document.getElementById('skill-tags');
    if (tagsEl && skill.tags) {
      tagsEl.innerHTML = skill.tags
        .map((t) => `<span class="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm px-3 py-1 rounded-full">${escapeHtml(t)}</span>`)
        .join('');
    }

    // Description
    const descEl = document.getElementById('skill-description');
    if (descEl) descEl.textContent = skill.description;
  }

  async function renderReadme(skill) {
    const container = document.getElementById('readme-content');
    if (!container || !skill.readme) {
      if (container) container.innerHTML = `<p class="text-gray-500 dark:text-gray-400 italic">No documentation provided for this skill.</p>`;
      return;
    }

    container.innerHTML = `<div class="skeleton h-4 w-full mb-3"></div><div class="skeleton h-4 w-5/6"></div>`;

    try {
      const res = await fetch(skill.readme);
      if (!res.ok) throw new Error('README not found');
      const md = await res.text();
      const html = window.marked ? window.marked.parse(md, { mangle: false, headerIds: false }) : `<pre>${escapeHtml(md)}</pre>`;
      container.innerHTML = html;
    } catch (err) {
      container.innerHTML = `<p class="text-gray-500 dark:text-gray-400 italic">Documentation could not be loaded.</p>`;
    }
  }

  function renderInstallPanel(skill) {
    const panelEl = document.getElementById('install-action');
    if (!panelEl) return;

    panelEl.dataset.skillId = skill.id;
    panelEl.dataset.skillFile = skill.file;

    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
      downloadBtn.href = skill.file;
      downloadBtn.download = skill.file.split('/').pop();
      downloadBtn.setAttribute('aria-label', `Download ${skill.name} skill file`);
      downloadBtn.addEventListener('click', () => {
        // Increment download counter here in Phase 2
        console.log(`Download initiated for: ${skill.id}`);
      });
    }
  }

  function renderReportLink(skill) {
    const linkEl = document.getElementById('report-issue-link');
    if (!linkEl) return;
    const url = buildGitHubIssueUrl(
      `Bug report: ${skill.name}`,
      'bug,skill-report'
    );
    linkEl.href = url;
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer';
  }

  async function init() {
    const skillId = getSkillIdFromUrl();

    if (!skillId) {
      renderNotFound(skillId);
      return;
    }

    try {
      const manifest = await fetchManifest();
      const skill = (manifest.skills || []).find((s) => s.id === skillId);

      if (!skill) {
        renderNotFound(skillId);
        return;
      }

      renderMeta(skill);
      renderInstallPanel(skill);
      renderReportLink(skill);
      await renderReadme(skill);
    } catch (err) {
      console.error('Failed to load skill:', err);
      renderNotFound(skillId);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
