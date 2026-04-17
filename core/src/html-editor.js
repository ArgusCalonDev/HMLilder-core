// === DOM ===
const codeInput = document.getElementById('code-input');
const codeOutput = document.getElementById('output');
// download button
const downloadBtn = document.getElementById('download-btn');

// === FUNCTIONS ===
function updateOutput() {
    const code = codeInput.value;
    
    // Gunakan srcdoc untuk iframe atau buat iframe baru
    codeOutput.innerHTML = ''; // Kosongkan dulu
    
    // Buat iframe untuk preview yang terisolasi
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '500px';
    iframe.style.border = '1px solid #ccc';
    
    // Set HTML ke iframe
    iframe.srcdoc = code;
    
    codeOutput.appendChild(iframe);
}

// ===== DOWNLOAD HTML FILE FUNCTION =====
function downloadHTMLFile() {
    // AMBIL DARI TEXTAREA, BUKAN DARI OUTPUT
    const code = codeInput.value;

    if (!code.trim()) {
        alert('❌ Tidak ada kode HTML untuk didownload!');
        return;
    }

    const filename = `index.html`;

    // Create blob and download link
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Create temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';

    // Trigger download
    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Show success feedback
        const downloadBtn = document.getElementById('download-btn'); // ID yang benar
        const originalHTML = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '✓ Berhasil Download!';
        downloadBtn.style.background = '#06d6a0';

        setTimeout(() => {
            downloadBtn.innerHTML = originalHTML;
            downloadBtn.style.background = '';
        }, 2000);

    }, 100);
}

// === EVENT LISTENERS ===
codeInput.addEventListener('input', updateOutput);
downloadBtn.addEventListener('click', downloadHTMLFile);

// Event listener untuk perubahan ukuran
codeInput.addEventListener('input', updateOutput);

// Initial output update
updateOutput();

// function init
function init() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Tambahkan juga event listener untuk resize (opsional)
window.addEventListener('resize', updateOutput);

// dom content loaded
document.addEventListener('DOMContentLoaded', init);