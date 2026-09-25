// SCREEN 11: DOCUMENT CENTER — With Upload Simulation
import { documents } from '../js/data.js';
import { pageHeader, bottomNav, docCard } from '../js/components.js';
import { showToast, showModal } from '../js/ui.js';

export function renderDocumentCenter() {
  return `
    <div class="screen screen-scroll">
      ${pageHeader('Document Center')}
      <div class="page-content stagger">
        <div class="upload-area anim-slide-up" onclick="window.__triggerUpload()">
          <span class="material-symbols-rounded">cloud_upload</span>
          <p style="font-weight:600;margin-bottom:2px">Upload Documents</p>
          <p style="font-size:var(--text-xs)">Bills, invoices, loan documents</p>
        </div>
        <input type="file" id="doc-file-input" style="display:none" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onchange="window.__handleFileUpload(this)">
        
        <div id="upload-progress" style="display:none;margin-top:var(--space-3)">
          <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-1)">
            <span style="font-size:var(--text-xs);font-weight:500" id="upload-filename">Uploading...</span>
            <span style="font-size:var(--text-xs);color:var(--primary);font-weight:600" id="upload-percent">0%</span>
          </div>
          <div style="height:6px;background:var(--bg-secondary);border-radius:var(--radius-full);overflow:hidden">
            <div id="upload-bar" style="height:100%;background:var(--primary-gradient);border-radius:var(--radius-full);width:0%;transition:width 0.3s ease"></div>
          </div>
        </div>
        
        <div class="section-title anim-slide-up">Your Documents</div>
        <div id="docs-list">
          ${documents.map(d => docCard(d)).join('')}
        </div>
      </div>
      ${bottomNav('entrepreneur-dashboard')}
    </div>`;
}

// Trigger file picker
window.__triggerUpload = function() {
  document.getElementById('doc-file-input')?.click();
};

// Handle file upload simulation
window.__handleFileUpload = function(input) {
  const file = input.files?.[0];
  if (!file) return;

  const progressArea = document.getElementById('upload-progress');
  const bar = document.getElementById('upload-bar');
  const filename = document.getElementById('upload-filename');
  const percent = document.getElementById('upload-percent');

  if (progressArea) progressArea.style.display = 'block';
  if (filename) filename.textContent = file.name;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      setTimeout(() => {
        if (progressArea) progressArea.style.display = 'none';
        
        // Add new document to the list
        const docsList = document.getElementById('docs-list');
        if (docsList) {
          const newDoc = `
            <div class="doc-card anim-slide-up" onclick="window.__showDocDetail('${file.name}')">
              <div class="doc-icon"><span class="material-symbols-rounded">upload_file</span></div>
              <div class="doc-info">
                <div class="doc-name">${file.name}</div>
                <div class="doc-meta">Uploaded • Just now</div>
              </div>
              <span class="doc-status processing">Processing</span>
            </div>`;
          docsList.insertAdjacentHTML('afterbegin', newDoc);
        }
        
        showToast(`"${file.name}" uploaded successfully!`, 'success');
      }, 500);
    }
    if (bar) bar.style.width = `${Math.min(progress, 100)}%`;
    if (percent) percent.textContent = `${Math.round(Math.min(progress, 100))}%`;
  }, 200);

  // Reset file input
  input.value = '';
};

// Document detail modal
window.__showDocDetail = function(name) {
  showModal({
    title: 'Document Details',
    content: `
      <div style="text-align:center;padding:var(--space-4)">
        <span class="material-symbols-rounded" style="font-size:64px;color:var(--secondary);margin-bottom:var(--space-3)">description</span>
        <h3 style="font-size:var(--text-md);margin-bottom:var(--space-2)">${name}</h3>
        <p style="font-size:var(--text-xs);color:var(--text-muted)">Uploaded just now</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:var(--space-3);margin-top:var(--space-3)">
        <div style="display:flex;justify-content:space-between;padding:var(--space-3);background:var(--bg-secondary);border-radius:var(--radius-md)">
          <span style="font-size:var(--text-sm);color:var(--text-secondary)">Status</span>
          <span class="doc-status processing">Processing</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:var(--space-3);background:var(--bg-secondary);border-radius:var(--radius-md)">
          <span style="font-size:var(--text-sm);color:var(--text-secondary)">AI Analysis</span>
          <span style="font-size:var(--text-sm);font-weight:600;color:var(--primary)">In Progress</span>
        </div>
      </div>
      <button class="btn btn-primary btn-block btn-rounded" style="margin-top:var(--space-5)" onclick="window.__closeModal()">
        <span class="material-symbols-rounded">check</span> Done
      </button>
    `
  });
};

// Make existing docs clickable
document.addEventListener('screen:rendered', (e) => {
  if (e.detail.screen === 'document-center') {
    document.querySelectorAll('.doc-card').forEach(card => {
      if (!card.onclick) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          const name = card.querySelector('.doc-name')?.textContent || 'Document';
          window.__showDocDetail(name);
        });
      }
    });
  }
});

// SCREEN 12: NOTIFICATIONS
import { notifications } from '../js/data.js';
import { notifItem } from '../js/components.js';

export function renderNotifications() {
  return `
    <div class="screen screen-scroll">
      ${pageHeader('Notifications')}
      <div class="page-content stagger">
        ${notifications.length > 0 
          ? notifications.map(n => notifItem(n)).join('')
          : `<div style="text-align:center;padding:var(--space-8);color:var(--text-muted)">
               <span class="material-symbols-rounded" style="font-size:48px;margin-bottom:var(--space-3)">notifications_none</span>
               <p style="font-size:var(--text-sm);font-weight:500">No notifications yet</p>
             </div>`
        }
      </div>
      ${bottomNav('entrepreneur-dashboard')}
    </div>`;
}
