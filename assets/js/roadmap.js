(function (window) {
  'use strict';

  const { fetchManifest, debounce, escapeHtml, formatDate } = window.SkillUtils;
  const ROADMAP_PATH = 'roadmap/roadmap.json';

  const STATUS_CONFIG = {
    idea:     { label: 'Idea',     emoji: '💡', color: 'bg-amber-50 text-amber-600',   border: 'border-amber-200' },
    approved: { label: 'Approved', emoji: '✅', color: 'bg-sky-50 text-sky-600',       border: 'border-sky-200'   },
    building: { label: 'Building', emoji: '🔨', color: 'bg-violet-50 text-violet-600', border: 'border-violet-200'},
    done:     { label: 'Done',     emoji: '🚀', color: 'bg-teal-50 text-teal-700',     border: 'border-teal-200'  },
  };

  const STATUS_ORDER = ['idea', 'approved', 'building', 'done'];

  let allItems = [];

  async function fetchRoadmap() {
    const res = await fetch(ROADMAP_PATH);
    if (!res.ok) throw new Error('Failed to load roadmap');
    return res.json();
  }

  // ---------- Rendering ----------

  function statusBadge(status) {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.idea;
    return `<span class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.color} border ${cfg.border}">
      <span aria-hidden="true">${cfg.emoji}</span> ${cfg.label}
    </span>`;
  }

  function renderCard(item) {
    const date = formatDate(item.submittedAt);
    const doneLink = item.skillId
      ? `<a href="skill.html?id=${escapeHtml(item.skillId)}" class="text-xs text-[#00a187] hover:underline font-medium">View in marketplace →</a>`
      : '';
    const readyBadge = item.type === 'ready'
      ? `<span class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-200">📦 Skill ready</span>`
      : '';

    return `
      <article class="skill-card rounded-xl p-5 flex flex-col gap-3" data-id="${escapeHtml(item.id)}">
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-semibold text-sm leading-snug">${escapeHtml(item.title)}</h3>
          ${statusBadge(item.status)}
        </div>
        ${readyBadge ? `<div>${readyBadge}</div>` : ''}
        <p class="text-xs text-gray-500 leading-relaxed line-clamp-2">${escapeHtml(item.description)}</p>
        <div class="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 text-xs text-gray-400">
          <span>by ${escapeHtml(item.submitter)} · ${date}</span>
          ${doneLink}
        </div>
      </article>`;
  }

  function renderColumns(items) {
    STATUS_ORDER.forEach((status) => {
      const col = document.getElementById(`col-${status}`);
      const countEl = document.getElementById(`count-${status}`);
      if (!col) return;

      const filtered = items.filter((i) => i.status === status);
      if (countEl) countEl.textContent = filtered.length;

      if (filtered.length === 0) {
        col.innerHTML = `<p class="text-xs text-gray-400 text-center py-6 italic">No items yet</p>`;
      } else {
        col.innerHTML = filtered.map(renderCard).join('');
      }
    });
  }

  // ---------- Submit form ----------

  function initSubmitForm() {
    const toggleBtn = document.getElementById('submit-toggle-btn');
    const panel = document.getElementById('submit-panel');

    function closePanel() {
      panel?.classList.add('hidden');
      if (toggleBtn) toggleBtn.textContent = '+ Submit an Idea';
      panel?.querySelectorAll('input, textarea').forEach(el => el.value = '');
      document.getElementById('form-error')?.classList.add('hidden');
    }

    toggleBtn?.addEventListener('click', () => {
      const isHidden = panel.classList.contains('hidden');
      if (isHidden) {
        panel.classList.remove('hidden');
        toggleBtn.textContent = '− Cancel';
        panel.querySelector('input, textarea')?.focus();
      } else {
        closePanel();
      }
    });

    document.getElementById('panel-cancel')?.addEventListener('click', closePanel);

    document.getElementById('idea-submit-btn')?.addEventListener('click', () => {
      const title = document.getElementById('idea-title')?.value.trim();
      const description = document.getElementById('idea-description')?.value.trim();
      const useCase = document.getElementById('idea-usecase')?.value.trim();
      const templates = document.getElementById('idea-templates')?.value.trim();
      const submitter = document.getElementById('idea-submitter')?.value.trim();

      if (!title || !description || !useCase || !submitter) {
        document.getElementById('form-error')?.classList.remove('hidden');
        return;
      }
      document.getElementById('form-error')?.classList.add('hidden');

      const issueTitle = `[SKILL IDEA] ${title}`;
      const body = [
        '## Skill Idea Submission',
        '',
        `**Skill Name:** ${title}`,
        `**Submitted by:** ${submitter}`,
        '',
        '### Description',
        description,
        '',
        '### Use Case',
        useCase,
        '',
        templates ? `### Templates / Documentation\n${templates}` : '### Templates / Documentation\n_None provided_',
        '',
        '### Next Steps',
        '- [ ] Admin review',
        '- [ ] Add to roadmap.json with status: approved',
        '- [ ] Build and publish to marketplace',
      ].join('\n');

      const url = `https://github.com/${window.SkillUtils.REPO_SLUG}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(body)}&labels=skill-idea`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });

    // Character counts
    [
      ['idea-description', 'idea-desc-count', 200],
      ['idea-usecase', 'idea-usecase-count', 300],
    ].forEach(([fieldId, countId, max]) => {
      const field = document.getElementById(fieldId);
      const counter = document.getElementById(countId);
      if (field && counter) {
        field.addEventListener('input', () => {
          counter.textContent = `${field.value.length}/${max}`;
        });
      }
    });
  }

  // ---------- Init ----------

  async function init() {
    try {
      const data = await fetchRoadmap();
      allItems = data.items || [];
      renderColumns(allItems);
    } catch (err) {
      console.error('Failed to load roadmap:', err);
      document.getElementById('roadmap-board')?.insertAdjacentHTML('beforebegin',
        `<p class="text-red-500 text-sm mb-4">Failed to load roadmap. Please refresh.</p>`);
    }

    initSubmitForm();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
