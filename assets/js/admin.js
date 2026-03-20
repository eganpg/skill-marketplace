(function (window) {
  'use strict';

  const { escapeHtml, formatDate } = window.SkillUtils;
  const ROADMAP_PATH = 'roadmap/roadmap.json';

  const STATUS_CONFIG = {
    idea:     { label: 'Idea',     emoji: '💡', color: 'bg-amber-50 text-amber-600',   border: 'border-amber-200' },
    approved: { label: 'Approved', emoji: '✅', color: 'bg-sky-50 text-sky-600',       border: 'border-sky-200'   },
    building: { label: 'Building', emoji: '🔨', color: 'bg-violet-50 text-violet-600', border: 'border-violet-200'},
    done:     { label: 'Done',     emoji: '🚀', color: 'bg-teal-50 text-teal-700',     border: 'border-teal-200'  },
  };

  const STATUS_ORDER = ['idea', 'approved', 'building', 'done'];

  async function fetchRoadmap() {
    const res = await fetch(ROADMAP_PATH);
    if (!res.ok) throw new Error('Failed to load roadmap');
    return res.json();
  }

  function statusBadge(status) {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.idea;
    return `<span class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.color} border ${cfg.border}">
      <span aria-hidden="true">${cfg.emoji}</span> ${cfg.label}
    </span>`;
  }

  function buildAgentIssueUrl(item) {
    const title = `[SKILL BUILD] ${item.title}`;
    const body = [
      '## Skill Build Request',
      '',
      `**Skill Name:** ${item.title}`,
      `**Requested by:** ${item.submitter}`,
      `**Roadmap ID:** ${item.id}`,
      '',
      '### What the skill should do',
      item.description,
      '',
      '### Why it\'s needed (use case)',
      item.useCase || '_No use case provided_',
      '',
      '### Templates / Documentation provided',
      item.templates || '_None provided_',
      '',
      '---',
      '',
      '## Instructions for Claude',
      '',
      'Please build a Claude `.skill` file for the skill described above.',
      '',
      'The `.skill` file must be a zip archive containing a `SKILL.md` at the root.',
      'The `SKILL.md` should include:',
      '- A clear title',
      '- What the skill does (1–2 sentences)',
      '- Step-by-step instructions for the user',
      '- An example input and example output',
      '',
      'Also provide:',
      '- A `README.md` with full documentation (overview, how to use, examples, tips)',
      '- A `manifest.json` entry (id, name, description, version, author, tags, category, file, readme)',
      '',
      'Base the skill on the use case and any templates provided above.',
      '',
      '### After building',
      '- [ ] Attach the `.skill` zip to this issue',
      '- [ ] Open a PR to add it to the marketplace',
      `- [ ] Update roadmap.json: set status to "done" and add skillId for item id: ${item.id}`,
    ].join('\n');

    const url = `https://github.com/${window.SkillUtils.REPO_SLUG}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=skill-build,admin`;
    return url;
  }

  function renderAdminCard(item) {
    const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.idea;
    const canBuild = item.status === 'idea' || item.status === 'approved';
    const hasIssue = !!item.githubIssue;

    return `
      <article class="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4" data-id="${escapeHtml(item.id)}">
        <div class="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h3 class="font-semibold text-base mb-1">${escapeHtml(item.title)}</h3>
            <div class="flex items-center gap-2 flex-wrap">
              ${statusBadge(item.status)}
              <span class="text-xs text-gray-400">submitted by ${escapeHtml(item.submitter)} · ${formatDate(item.submittedAt)}</span>
            </div>
          </div>
          ${canBuild ? `
            <a href="${buildAgentIssueUrl(item)}" target="_blank" rel="noopener noreferrer"
               class="shrink-0 inline-flex items-center gap-2 bg-[#00a187] hover:bg-[#007d68] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
              🤖 Start Building
            </a>` : ''}
          ${item.status === 'done' && item.skillId ? `
            <a href="skill.html?id=${escapeHtml(item.skillId)}"
               class="shrink-0 text-sm text-[#00a187] hover:underline font-medium">
              View in marketplace →
            </a>` : ''}
        </div>

        <p class="text-sm text-gray-600 leading-relaxed">${escapeHtml(item.description)}</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Use Case</p>
            <p class="text-sm text-gray-600">${escapeHtml(item.useCase || '—')}</p>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Templates / Docs</p>
            ${item.templates
              ? `<pre class="text-xs text-gray-600 bg-gray-50 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">${escapeHtml(item.templates)}</pre>`
              : `<p class="text-sm text-gray-400 italic">None provided</p>`}
          </div>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400 flex-wrap gap-2">
          <span>ID: <code class="bg-gray-50 px-1 rounded">${escapeHtml(item.id)}</code></span>
          ${hasIssue
            ? `<a href="${escapeHtml(item.githubIssue)}" target="_blank" rel="noopener noreferrer" class="text-[#00a187] hover:underline">View GitHub Issue →</a>`
            : '<span class="italic">No issue linked yet</span>'}
        </div>

        <details class="text-xs">
          <summary class="text-gray-400 cursor-pointer hover:text-gray-600 select-none">Update status instructions</summary>
          <div class="mt-3 bg-gray-50 rounded-lg p-4 space-y-1 text-gray-600 leading-relaxed">
            <p>Edit <code class="bg-white border border-gray-200 px-1 rounded">roadmap/roadmap.json</code> and change <code class="bg-white border border-gray-200 px-1 rounded">"status"</code> for this item (<code class="bg-white border border-gray-200 px-1 rounded">${escapeHtml(item.id)}</code>) to one of:</p>
            <ul class="list-disc list-inside space-y-0.5 mt-1">
              <li><code class="bg-white border border-gray-200 px-1 rounded">idea</code> — submitted, not yet reviewed</li>
              <li><code class="bg-white border border-gray-200 px-1 rounded">approved</code> — reviewed and queued to build</li>
              <li><code class="bg-white border border-gray-200 px-1 rounded">building</code> — actively being built</li>
              <li><code class="bg-white border border-gray-200 px-1 rounded">done</code> — published to marketplace (also set <code class="bg-white border border-gray-200 px-1 rounded">skillId</code>)</li>
            </ul>
          </div>
        </details>
      </article>`;
  }

  function renderSections(items) {
    const container = document.getElementById('admin-items');
    if (!container) return;

    let html = '';
    STATUS_ORDER.forEach((status) => {
      const group = items.filter((i) => i.status === status);
      if (group.length === 0) return;
      const cfg = STATUS_CONFIG[status];
      html += `
        <section class="mb-10" aria-labelledby="section-${status}">
          <h2 id="section-${status}" class="flex items-center gap-2 text-lg font-bold mb-4">
            <span aria-hidden="true">${cfg.emoji}</span> ${cfg.label}
            <span class="text-sm font-normal text-gray-400">(${group.length})</span>
          </h2>
          <div class="space-y-4">
            ${group.map(renderAdminCard).join('')}
          </div>
        </section>`;
    });

    container.innerHTML = html || '<p class="text-gray-400 italic">No roadmap items found.</p>';
  }

  async function init() {
    try {
      const data = await fetchRoadmap();
      renderSections(data.items || []);
    } catch (err) {
      console.error('Failed to load roadmap:', err);
      document.getElementById('admin-items')?.insertAdjacentHTML('beforebegin',
        `<p class="text-red-500 text-sm mb-4">Failed to load roadmap data.</p>`);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
