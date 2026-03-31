// Button Generator Logic

// DOM Elements
const btnText = document.getElementById('btn-text');
const btnSize = document.getElementById('btn-size');
const btnColor = document.getElementById('btn-color');
const btnColorHex = document.getElementById('btn-color-hex');
const btnTextColor = document.getElementById('btn-text-color');
const btnTextColorHex = document.getElementById('btn-text-color-hex');
const btnBorderRadius = document.getElementById('btn-border-radius');
const previewBtn = document.getElementById('preview-btn');
const codeOutput = document.getElementById('code-output');

// Size mappings
const sizeStyles = {
    small: { padding: '8px 16px', fontSize: '0.9rem' },
    medium: { padding: '12px 24px', fontSize: '1rem' },
    large: { padding: '16px 32px', fontSize: '1.2rem' }
};

// Update color hex display
btnColor.addEventListener('input', function() {
    btnColorHex.value = this.value;
});

btnTextColor.addEventListener('input', function() {
    btnTextColorHex.value = this.value;
});

// Generate button function
function generateButton() {
    const text = btnText.value || 'Button';
    const size = btnSize.value;
    const bgColor = btnColor.value;
    const textColor = btnTextColor.value;
    const borderRadius = btnBorderRadius.value + 'px';

    // Update preview
    previewBtn.textContent = text;
    previewBtn.style.backgroundColor = bgColor;
    previewBtn.style.color = textColor;
    previewBtn.style.borderRadius = borderRadius;
    previewBtn.style.padding = sizeStyles[size].padding;
    previewBtn.style.fontSize = sizeStyles[size].fontSize;

    // Generate HTML code
    const htmlCode = `<button style="background-color: ${bgColor}; color: ${textColor}; border: none; padding: ${sizeStyles[size].padding}; border-radius: ${borderRadius}; font-size: ${sizeStyles[size].fontSize}; font-weight: 600; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">${text}</button>`;

    codeOutput.textContent = htmlCode;
}

// Copy code to clipboard
function copyCode() {
    const code = codeOutput.textContent;
    navigator.clipboard.writeText(code).then(function() {
        // Show success feedback
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
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
    generateButton(); // Generate initial button
    
    // Add real-time updates
    [btnText, btnSize, btnColor, btnTextColor, btnBorderRadius].forEach(element => {
        element.addEventListener('input', generateButton);
    });
});