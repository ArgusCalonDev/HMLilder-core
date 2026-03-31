// Alert Generator Logic

// DOM Elements
const alertType = document.getElementById('alert-type');
const alertText = document.getElementById('alert-text');
const alertTitle = document.getElementById('alert-title');
const previewAlert = document.getElementById('preview-alert');
const previewTitleEl = document.getElementById('preview-title');
const previewText = document.getElementById('preview-text');
const htmlOutput = document.getElementById('html-output');
const cssOutput = document.getElementById('css-output');

// Alert configuration
const alertConfig = {
    success: {
        class: 'alert-success',
        icon: 'fas fa-check-circle'
    },
    warning: {
        class: 'alert-warning',
        icon: 'fas fa-exclamation-triangle'
    },
    error: {
        class: 'alert-error',
        icon: 'fas fa-times-circle'
    },
    info: {
        class: 'alert-info',
        icon: 'fas fa-info-circle'
    }
};

// Update alert function
function updateAlert() {
    const type = alertType.value;
    const titleText = alertTitle.value;
    const bodyText = alertText.value;
    const config = alertConfig[type];

    // Update preview
    previewAlert.className = `alert ${config.class}`;
    
    const iconEl = previewAlert.querySelector('.alert-icon');
    iconEl.className = `alert-icon ${config.icon}`;
    
    previewTitleEl.textContent = titleText;
    previewText.textContent = bodyText;
    
    // Hide title if empty
    if (!titleText) {
        previewTitleEl.style.display = 'none';
    } else {
        previewTitleEl.style.display = 'block';
    }

    // Generate code
    generateCode(type, titleText, bodyText);
}

// Generate code
function generateCode(type, titleText, bodyText) {
    const config = alertConfig[type];
    
    // Generate HTML
    let htmlCode = `<div class="alert ${config.class}">
  <div class="alert-content">
    <i class="alert-icon ${config.icon}"></i>
    <div>`;
    
    if (titleText) {
        htmlCode += `\n      <strong>${titleText}</strong>`;
    }
    
    htmlCode += `\n      <p>${bodyText}</p>
    </div>
  </div>
</div>`;

    // Generate CSS
    const cssCode = `.alert {
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.alert-content {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.alert-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border-left: 4px solid #ffc107;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  border-left: 4px solid #f5222d;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  border-left: 4px solid #17a2b8;
}

.alert strong {
  display: block;
  margin-bottom: 5px;
}

.alert p {
  margin: 0;
}`;

    htmlOutput.textContent = htmlCode;
    cssOutput.textContent = cssCode;
}

// Copy code to clipboard
function copyCode() {
    const htmlCode = htmlOutput.textContent;
    const cssCode = cssOutput.textContent;
    const fullCode = `<!-- HTML -->\n${htmlCode}\n\n<!-- CSS -->\n<style>\n${cssCode}\n</style>`;

    navigator.clipboard.writeText(fullCode).then(function() {
        // Show success feedback
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Disalin!';
        copyBtn.style.background = 'var(--success)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = 'var(--success)';
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy: ', err);
        alert('Gagal menyalin kode. Silakan salin manual.');
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAlert(); // Generate initial alert
});