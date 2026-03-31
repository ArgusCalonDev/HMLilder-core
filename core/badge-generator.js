// Badge Generator Logic

// DOM Elements
const badgeText = document.getElementById('badge-text');
const badgeShape = document.getElementById('badge-shape');
const badgeBgColor = document.getElementById('badge-bg-color');
const badgeBgColorHex = document.getElementById('badge-bg-color-hex');
const badgeTextColor = document.getElementById('badge-text-color');
const badgeTextColorHex = document.getElementById('badge-text-color-hex');
const previewBadge = document.getElementById('preview-badge');
const htmlOutput = document.getElementById('html-output');
const cssOutput = document.getElementById('css-output');

// Update color hex display
badgeBgColor.addEventListener('input', function() {
    badgeBgColorHex.value = this.value;
});

badgeTextColor.addEventListener('input', function() {
    badgeTextColorHex.value = this.value;
});

// Update badge function
function updateBadge() {
    const text = badgeText.value || 'Badge';
    const shape = badgeShape.value;
    const bgColor = badgeBgColor.value;
    const textColor = badgeTextColor.value;

    // Update preview
    previewBadge.textContent = text;
    previewBadge.style.backgroundColor = bgColor;
    previewBadge.style.color = textColor;
    
    // Update classes
    previewBadge.className = `badge badge-${shape}`;

    // Generate code
    generateCode(text, shape, bgColor, textColor);
}

// Generate code
function generateCode(text, shape, bgColor, textColor) {
    // Generate HTML
    const htmlCode = `<span class="badge badge-${shape}">${text}</span>`;

    // Generate CSS
    const cssCode = `.badge {
  display: inline-block;
  padding: 6px 12px;
  font-weight: 600;
  font-size: 0.85rem;
  background-color: ${bgColor};
  color: ${textColor};
}

.badge-rounded {
  border-radius: 6px;
}

.badge-pill {
  border-radius: 20px;
}

.badge-square {
  border-radius: 0;
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
    updateBadge(); // Generate initial badge
});