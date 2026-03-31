// Quick Accessibility Checker: img alt, button teks, label form, kontras warna dasar
function runAccessibilityCheck() {
    const inputText = document.getElementById('accessibility-input').value;
    if (!inputText.trim()) {
        alert('Masukkan HTML untuk dicek.');
        return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(inputText, 'text/html');

    const hasil = [];

    // 1. img tanpa alt
    const images = Array.from(doc.querySelectorAll('img'));
    images.forEach(img => {
        if (!img.hasAttribute('alt') || !img.getAttribute('alt').trim()) {
            hasil.push(`⚠ img tanpa alt: ${img.outerHTML}`);
        }
    });

    // 2. button tanpa teks
    const buttons = Array.from(doc.querySelectorAll('button'));
    buttons.forEach(btn => {
        if (!btn.textContent.trim()) {
            hasil.push(`⚠ button kosong: ${btn.outerHTML}`);
        }
    });

    // 3. label form
    const inputs = Array.from(doc.querySelectorAll('input, textarea, select'));
    inputs.forEach(input => {
        const id = input.getAttribute('id');
        if (id) {
            const label = doc.querySelector(`label[for="${id}"]`);
            if (!label) {
                hasil.push(`⚠ field tanpa label terkait: ${input.outerHTML}`);
            }
        } else {
            hasil.push(`⚠ field tanpa id => label otomatis sulit: ${input.outerHTML}`);
        }
    });

    // 4. warna kontras dasar (style inline bg-color + color)
    const kontrasCheck = Array.from(doc.querySelectorAll('[style]'));
    kontrasCheck.forEach(el => {
        const style = el.getAttribute('style');
        const warnaTeksMatch = style.match(/color\s*:\s*([^;]+)/i);
        const bgMatch = style.match(/background(-color)?\s*:\s*([^;]+)/i);
        if (warnaTeksMatch && bgMatch) {
            const textColor = warnaTeksMatch[1].trim();
            const bgColor = bgMatch[2].trim();
            if (textColor === 'white' && bgColor === 'yellow') {
                hasil.push(`⚠ potensi kontras buruk: ${el.outerHTML}`);
            }
        }
    });

    // pesan default kalau sehat
    if (!hasil.length) {
        hasil.push('✅ Tidak ditemukan issue aksesibilitas dasar.');
    }

    // tampilkan output dan preview
    document.getElementById('check-output').textContent = hasil.join('\n');
    document.getElementById('preview-area').innerHTML = inputText;
}