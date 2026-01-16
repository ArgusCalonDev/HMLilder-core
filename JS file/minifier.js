// minifier.js
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const htmlInput = document.getElementById('htmlInput');
    const htmlOutput = document.getElementById('htmlOutput');
    const minifyBtn = document.getElementById('minifyBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const inputCount = document.getElementById('inputCount');
    const outputCount = document.getElementById('outputCount');
    const savedPercent = document.getElementById('savedPercent');

    // ===== MINIFICATION LOGIC =====
    function minifyHTML(html) {
        if (!html.trim()) return '';
        
        let result = html;
        
        // 1. Remove HTML comments (safe)
        result = result.replace(/<!--[\s\S]*?-->/g, '');
        
        // 2. Remove whitespace between tags
        result = result.replace(/>\s+</g, '><');
        
        // 3. Collapse multiple spaces to single space
        result = result.replace(/\s+/g, ' ');
        
        // 4. Trim leading/trailing whitespace
        result = result.trim();
        
        // 5. Optional: Remove quotes from simple attributes
        // result = result.replace(/="([^"'>\s]+)"/g, '=$1');
        
        return result;
    }

    // ===== UPDATE STATS =====
    function updateStats(inputText, outputText) {
        const inputLength = inputText.length;
        const outputLength = outputText.length;
        const saved = inputLength - outputLength;
        const percent = inputLength > 0 ? Math.round((saved / inputLength) * 100) : 0;
        
        inputCount.textContent = inputLength.toLocaleString();
        outputCount.textContent = outputLength.toLocaleString();
        savedPercent.textContent = `${percent}%`;
        
        // Visual feedback for savings
        if (percent > 0) {
            savedPercent.style.color = '#06d6a0';
            savedPercent.innerHTML = `${percent}% <small>(✅ saved ${saved.toLocaleString()} chars)</small>`;
        } else {
            savedPercent.style.color = '#666';
        }
    }

function isSafeToMinify(html) {
    const dangerousPatterns = [
        /<\s*iframe[^>]*>[\s\S]*?<\s*\/\s*iframe\s*>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi
    ];
    
    for (let pattern of dangerousPatterns) {
        if (pattern.test(html)) {
            return confirm('⚠️ Kode HTML mengandung script/iframe.\nApakah anda ingin melanjutkan? (Beberapa fungsi yang tidak support mungkin akan rusak. Tes terlebih dahulu script hasil minify sebelum deploy.)');
        }
    }
    return true;
}

    // ===== MINIFY BUTTON HANDLER =====
    minifyBtn.addEventListener('click', function() {
        const input = htmlInput.value;
        
        if (!input.trim()) {
            alert('⚠️ Masukkan kode HTML terlebih dahulu!');
            htmlInput.focus();
            return;
        }

        if (!isSafeToMinify(input)) return;
        
        // Show loading state
        minifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        minifyBtn.disabled = true;
        
        // Simulate processing delay (for UX)
        setTimeout(() => {
            const minified = minifyHTML(input);
            
            // Update output
            htmlOutput.value = minified;
            
            // Update stats
            updateStats(input, minified);
            
            // Enable copy button if there's output
            copyBtn.disabled = !minified.trim();
            
            // Reset button
            minifyBtn.innerHTML = '<i class="fas fa-bolt"></i> Minify Now';
            minifyBtn.disabled = false;
            
            // Auto-scroll to output
            htmlOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    });

    // ===== COPY TO CLIPBOARD =====
    copyBtn.addEventListener('click', async function() {
        const text = htmlOutput.value;
        
        if (!text.trim()) {
            alert('⚠️ Tidak ada output untuk di-copy!');
            return;
        }
        
        try {
            await navigator.clipboard.writeText(text);
            
            // Visual feedback
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = '#06d6a0';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 2000);
            
        } catch (err) {
            // Fallback for older browsers
            htmlOutput.select();
            document.execCommand('copy');
            
            // Visual feedback for fallback
            alert('✅ Kode berhasil disalin ke clipboard!');
        }
    });

    // ===== CLEAR ALL =====
    clearBtn.addEventListener('click', function() {
        if (htmlInput.value.trim() || htmlOutput.value.trim()) {
            if (confirm('Hapus semua input dan output?')) {
                htmlInput.value = '';
                htmlOutput.value = '';
                inputCount.textContent = '0';
                outputCount.textContent = '0';
                savedPercent.textContent = '0%';
                savedPercent.style.color = '#666';
                copyBtn.disabled = true;
                htmlInput.focus();
            }
        }
    });

    // ===== REAL-TIME INPUT COUNT =====
    htmlInput.addEventListener('input', function() {
        const count = this.value.length;
        inputCount.textContent = count.toLocaleString();
        
        // Disable copy button if no output yet
        if (!htmlOutput.value.trim()) {
            copyBtn.disabled = true;
        }
    });

    // ===== ENTER KEY TO MINIFY =====
    htmlInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            minifyBtn.click();
        }
    });

    // ===== PASTE DETECTION =====
    htmlInput.addEventListener('paste', function(e) {
        setTimeout(() => {
            // Auto-minify if paste large content
            if (this.value.length > 500) {
                minifyBtn.click();
            }
        }, 100);
    });

    // ===== DRAG & DROP FILE =====
    htmlInput.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#4361ee';
        this.style.background = '#f8f9fa';
    });

    htmlInput.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '';
        this.style.background = '';
    });

    htmlInput.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '';
        this.style.background = '';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'text/html') {
            const reader = new FileReader();
            reader.onload = function(e) {
                htmlInput.value = e.target.result;
                minifyBtn.click();
            };
            reader.readAsText(file);
        } else {
            alert('⚠️ Hanya file HTML (.html) yang didukung!');
        }
    });

    // ===== INITIAL FOCUS =====
    htmlInput.focus();
});