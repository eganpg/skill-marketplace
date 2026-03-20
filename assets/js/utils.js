(function (window) {
  'use strict';

  // Central config — update when repo moves
  const REPO_SLUG = 'your-org/skill-marketplace';
  const MANIFEST_PATH = 'skills/manifest.json';

  let _manifestCache = null;

  async function fetchManifest() {
    if (_manifestCache) return _manifestCache;
    const res = await fetch(MANIFEST_PATH);
    if (!res.ok) throw new Error('Failed to load skill manifest');
    _manifestCache = await res.json();
    return _manifestCache;
  }

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildGitHubIssueUrl(title, labels) {
    const base = `https://github.com/${REPO_SLUG}/issues/new`;
    const params = new URLSearchParams({ title, labels: labels || '' });
    return `${base}?${params.toString()}`;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  window.SkillUtils = {
    REPO_SLUG,
    fetchManifest,
    debounce,
    escapeHtml,
    buildGitHubIssueUrl,
    formatDate,
  };
})(window);
