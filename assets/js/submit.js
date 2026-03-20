(function (window) {
  'use strict';

  const { buildGitHubIssueUrl, escapeHtml } = window.SkillUtils;

  const CHECKLIST_ITEMS = [
    'skill-tested',
    'skill-file-included',
    'tags-relevant',
    'readme-included',
  ];

  function allChecked() {
    return CHECKLIST_ITEMS.every((id) => {
      const el = document.getElementById(id);
      return el && el.checked;
    });
  }

  function updateSubmitButton() {
    const btn = document.getElementById('open-issue-btn');
    if (!btn) return;
    const ready = allChecked();
    btn.disabled = !ready;
    btn.classList.toggle('opacity-50', !ready);
    btn.classList.toggle('cursor-not-allowed', !ready);
  }

  function buildIssueBody() {
    const name = document.getElementById('skill-name')?.value?.trim() || '';
    const description = document.getElementById('skill-description')?.value?.trim() || '';
    const author = document.getElementById('author-name')?.value?.trim() || '';
    const category = document.getElementById('skill-category')?.value || '';
    const tags = document.getElementById('skill-tags')?.value?.trim() || '';
    const notes = document.getElementById('additional-notes')?.value?.trim() || '';

    return [
      '## Skill Submission',
      '',
      `**Skill Name:** ${name}`,
      `**Author:** ${author}`,
      `**Category:** ${category}`,
      `**Tags:** ${tags}`,
      '',
      '### Description',
      description,
      '',
      ...(notes ? ['### Additional Notes', notes, ''] : []),
      '### Checklist',
      '- [x] I have tested this skill in Claude and it works as expected',
      '- [x] The .skill file is ready to attach',
      '- [x] Tags are relevant and specific',
      '- [x] A README or description is included',
      '',
      '> **Next step:** Attach your `.skill` file to this issue after it is created.',
    ].join('\n');
  }

  function openGitHubIssue() {
    const name = document.getElementById('skill-name')?.value?.trim() || 'New Skill';
    const title = `[SKILL SUBMISSION] ${name}`;
    const body = buildIssueBody();
    const url = `https://github.com/${window.SkillUtils.REPO_SLUG}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=skill-submission`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function init() {
    // Checklist interactivity
    CHECKLIST_ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', updateSubmitButton);
    });

    updateSubmitButton();

    // Submit button
    const btn = document.getElementById('open-issue-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!allChecked()) return;
        openGitHubIssue();
      });
    }

    // Character count for description
    const descField = document.getElementById('skill-description');
    const descCount = document.getElementById('desc-count');
    if (descField && descCount) {
      descField.addEventListener('input', () => {
        descCount.textContent = `${descField.value.length}/300`;
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
