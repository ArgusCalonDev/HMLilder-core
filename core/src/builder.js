// ===== VARIABLES & STATE =====
let currentColor = '#4361ee';
let currentDevice = 'desktop';
let currentFont = 'Arial, sans-serif';

// ===== DOM ELEMENTS =====
const productNameInput = document.getElementById('productName');
const productDescriptionInput = document.getElementById('productDescription');
const advantage1Input = document.getElementById('advantage1');
const advantage2Input = document.getElementById('advantage2');
const advantage3Input = document.getElementById('advantage3');
const whatsappNumberInput = document.getElementById('whatsappNumber');
const businessTypeSelect = document.getElementById('businessType');
const previewContainer = document.getElementById('previewContainer');
const codeOutput = document.getElementById('codeOutput');

// ===== TEMPLATE SELECTION =====
document.querySelectorAll('.template-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.template-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        updatePreviewAndCode();
    });
});

// ===== COLOR SELECTION =====
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        currentColor = this.getAttribute('data-color');
        updatePreviewAndCode();
    });
});

// ===== FONT SELECTION =====
document.querySelectorAll('.font-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.font-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        currentFont = this.getAttribute('data-font');
        updatePreviewAndCode();
    });
});

// ===== DEVICE TOGGLE =====
document.querySelectorAll('.device-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentDevice = this.getAttribute('data-device');
        updatePreviewContainerSize();
    });
});

function updatePreviewContainerSize() {
    switch (currentDevice) {
        case 'mobile':
            previewContainer.style.maxWidth = '375px';
            previewContainer.style.margin = '0 auto';
            break;
        case 'tablet':
            previewContainer.style.maxWidth = '768px';
            previewContainer.style.margin = '0 auto';
            break;
        default:
            previewContainer.style.maxWidth = '100%';
            previewContainer.style.margin = '0';
            break;
    }
}

// ===== INPUT EVENT LISTENERS =====
[productNameInput, productDescriptionInput, advantage1Input, advantage2Input, advantage3Input, whatsappNumberInput, businessTypeSelect].forEach(el => {
    if (el) el.addEventListener('input', updatePreviewAndCode);
});

function updatePreviewAndCode() {
    updatePreview();
    updateCodeOutput();
}

function cleanPhoneNumber(number) {
    return number.replace(/[^0-9]/g, '');
}

function getWhatsAppLink(number) {
    const cleaned = cleanPhoneNumber(number);
    return cleaned ? `https://wa.me/${cleaned}` : '';
}

function getBusinessTypeLabel(type) {
    switch (type) {
        case 'makanan': return 'Usaha Makanan';
        case 'jasa': return 'Usaha Jasa';
        case 'produk digital': return 'Produk Digital';
        default: return 'Usaha';
    }
}

function buildAdvantagesHTML(adv1, adv2, adv3) {
    return [adv1, adv2, adv3].map(text => {
        if (!text) return '';
        return `<div style="flex: 1 1 240px; min-width: 220px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 22px; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.06);">
            <p style="margin: 0; color: #334155; line-height: 1.75;">✓ ${text}</p>
        </div>`;
    }).join('');
}

function updatePreview() {
    const productName = productNameInput?.value.trim() || 'Produk Terbaik Anda';
    const productDescription = productDescriptionInput?.value.trim() || 'Deskripsi singkat yang menjelaskan produk Anda dengan jelas dan langsung.';
    const advantage1 = advantage1Input?.value.trim() || 'Mudah digunakan';
    const advantage2 = advantage2Input?.value.trim() || 'Harga terjangkau';
    const advantage3 = advantage3Input?.value.trim() || 'Hasil berkualitas';
    const whatsappNumber = whatsappNumberInput?.value.trim() || '6281234567890';
    const businessType = businessTypeSelect?.value || 'produk digital';
    const businessTypeLabel = getBusinessTypeLabel(businessType);
    const waLink = getWhatsAppLink(whatsappNumber);

    const ctaHTML = waLink
        ? `<a href="${waLink}" target="_blank" class="cta-button" style="background: ${currentColor};">Hubungi via WhatsApp</a>`
        : `<button class="cta-button" style="background: ${currentColor};">Hubungi via WhatsApp</button>`;

    const advantagesHTML = buildAdvantagesHTML(advantage1, advantage2, advantage3);

    previewContainer.innerHTML = `
        <div class="generated-page" style="font-family: ${currentFont}; padding: 20px;">
            <div class="hero-section" style="background: linear-gradient(135deg, ${currentColor}15, #ffffff); border-radius: 24px; padding: 40px; box-shadow: 0 22px 60px rgba(15, 23, 42, 0.08);">
                <div style="color: ${currentColor}; font-weight: 700; margin-bottom: 14px;">${businessTypeLabel}</div>
                <h1 style="font-size: 2.8rem; margin-bottom: 18px; color: ${currentColor}; line-height: 1.05;">${productName}</h1>
                <p style="font-size: 1.05rem; max-width: 760px; color: #334155; margin-bottom: 28px; line-height: 1.8;">${productDescription}</p>
                ${ctaHTML}
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 34px;">
                ${advantagesHTML}
            </div>
            <footer style="margin-top: 36px; padding-top: 30px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b;">
                <p>&copy; 2026 ${productName}</p>
            </footer>
        </div>`;
}

function updateCodeOutput() {
    const productName = productNameInput?.value.trim() || 'Produk Terbaik Anda';
    const productDescription = productDescriptionInput?.value.trim() || 'Deskripsi singkat yang menjelaskan produk Anda dengan jelas dan langsung.';
    const advantage1 = advantage1Input?.value.trim() || 'Mudah digunakan';
    const advantage2 = advantage2Input?.value.trim() || 'Harga terjangkau';
    const advantage3 = advantage3Input?.value.trim() || 'Hasil berkualitas';
    const whatsappNumber = whatsappNumberInput?.value.trim() || '6281234567890';
    const businessType = businessTypeSelect?.value || 'produk digital';
    const businessTypeLabel = getBusinessTypeLabel(businessType);
    const whatsappLink = getWhatsAppLink(whatsappNumber);
    const rawLink = whatsappLink || '#';

    const fullHTML = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName}</title>
    <meta name="description" content="${productDescription}">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: ${currentFont}; }
        body { background: #f8fafc; color: #1f2937; }
        .container { max-width: 1040px; margin: 0 auto; padding: 40px 20px; }
        .hero { background: linear-gradient(135deg, ${currentColor}15, #ffffff); border-radius: 24px; padding: 48px 32px; box-shadow: 0 22px 60px rgba(15, 23, 42, 0.08); }
        .label { color: ${currentColor}; font-weight: 700; margin-bottom: 16px; display: inline-block; }
        .title { font-size: 3rem; color: ${currentColor}; margin-bottom: 20px; line-height: 1.05; }
        .text { font-size: 1.05rem; color: #334155; max-width: 760px; line-height: 1.8; margin-bottom: 28px; }
        .cta { display: inline-block; padding: 16px 28px; border-radius: 999px; background: ${currentColor}; color: #fff; text-decoration: none; font-weight: 700; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-top: 36px; }
        .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 22px; color: #334155; }
        footer { margin-top: 56px; text-align: center; color: #64748b; }
        @media (max-width: 768px) { .title { font-size: 2.4rem; } }
    </style>
</head>
<body>
    <div class="container">
        <section class="hero">
            <div class="label">${businessTypeLabel}</div>
            <h1 class="title">${productName}</h1>
            <p class="text">${productDescription}</p>
            <a href="${rawLink}" target="_blank" class="cta">Hubungi via WhatsApp</a>
            <div class="cards">
                <div class="card">✓ ${advantage1}</div>
                <div class="card">✓ ${advantage2}</div>
                <div class="card">✓ ${advantage3}</div>
            </div>
        </section>
        <footer>
            <p>&copy; 2026 ${productName}</p>
        </footer>
    </div>
</body>
</html>`;

    codeOutput.value = fullHTML;
}

function init() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    updatePreview();
    updateCodeOutput();
    updatePreviewContainerSize();
}

// ===== COPY CODE FUNCTION =====
document.getElementById('copyBtn').addEventListener('click', function() {
    codeOutput.select();
    codeOutput.setSelectionRange(0, 99999);

    try {
        navigator.clipboard.writeText(codeOutput.value);
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Kode Disalin!';
        this.style.background = '#06d6a0';
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '';
        }, 2000);
    } catch (err) {
        alert('Gagal menyalin kode. Silahkan salin manual dari kotak teks di atas.');
    }
});

// ===== DOWNLOAD HTML FILE FUNCTION =====
function downloadHTMLFile() {
    const code = codeOutput.value;
    if (!code.trim()) {
        alert('❌ Tidak ada kode HTML untuk didownload!');
        return;
    }
    const filename = `${productNameInput?.value.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'landing'}_${Date.now()}.html`;
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        const downloadBtn = document.getElementById('downloadBtn');
        const originalHTML = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-check"></i> Berhasil Download!';
        downloadBtn.style.background = '#06d6a0';
        setTimeout(() => {
            downloadBtn.innerHTML = originalHTML;
            downloadBtn.style.background = '';
        }, 2000);
    }, 100);
}

const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        downloadHTMLFile();
    });
}

window.addEventListener('DOMContentLoaded', init);
