// ===== VARIABLES & STATE =====
let currentTemplate = 'landing';
let currentColor = '#4361ee';
let currentDevice = 'desktop';
let currentFont = 'Arial, sans-serif';

// ===== DOM ELEMENTS =====
const businessNameInput = document.getElementById('businessName');
const taglineInput = document.getElementById('tagline');
const descriptionInput = document.getElementById('description');
const ctaTextInput = document.getElementById('ctaText');
const problemTextInput = document.getElementById('problemText');
const solutionTextInput = document.getElementById('solutionText');
const alurText1Input = document.getElementById('alurText1');
const alurText2Input = document.getElementById('alurText2');
const alurText3Input = document.getElementById('alurText3');
const previewContainer = document.getElementById('previewContainer');
const codeOutput = document.getElementById('codeOutput');

const ctaLinkInput = document.getElementById('ctaLink');
if (ctaLinkInput) {
    ctaLinkInput.addEventListener('input', updatePreviewAndCode);
}

// ===== TEMPLATE SELECTION =====
document.querySelectorAll('.template-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove active class from all
        document.querySelectorAll('.template-option').forEach(opt => {
            opt.classList.remove('active');
        });

        // Add active class to clicked
        this.classList.add('active');

        // Update current template
        currentTemplate = this.getAttribute('data-template');

        // ===== TAMBAHAN BARU: TOGGLE TEMPLATE-SPECIFIC INPUTS =====
        // Sembunyikan semua template-specific inputs dulu
        document.querySelectorAll('.template-specific').forEach(el => {
            el.style.display = 'none';
        });

        // Tampilkan input yang sesuai dengan template yang dipilih
        switch(currentTemplate) {
            case 'landing':
                document.getElementById('landingSpecific').style.display = 'block';
                break;
            case 'service':
                document.getElementById('serviceSpecific').style.display = 'block';
                break;
            case 'product':
                document.getElementById('productSpecific').style.display = 'block';
                break;
        }

        // Update preview
        updatePreview();
        updateCodeOutput();
    });
});

// ===== COLOR SELECTION =====
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove active class from all
        document.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
        });

        // Add active class to clicked
        this.classList.add('active');

        // Update current color
        currentColor = this.getAttribute('data-color');

        // Update preview
        updatePreview();
        updateCodeOutput();
    });
});

// ===== FONT SELECTION =====
document.querySelectorAll('.font-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove active class dari semua font
        document.querySelectorAll('.font-option').forEach(opt => {
            opt.classList.remove('active');
        });

        // Add active class ke yang diklik
        this.classList.add('active');

        // Update current font
        currentFont = this.getAttribute('data-font');

        // Update preview
        updatePreview();
        updateCodeOutput();
    });
});

// ===== DEVICE TOGGLE =====
document.querySelectorAll('.device-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all
        document.querySelectorAll('.device-btn').forEach(b => {
            b.classList.remove('active');
        });

        // Add active class to clicked
        this.classList.add('active');

        // Update current device
        currentDevice = this.getAttribute('data-device');

        // Update preview container style
        updatePreviewContainerSize();
    });
});

// Update preview container based on device
function updatePreviewContainerSize() {
    switch(currentDevice) {
        case 'mobile':
            previewContainer.style.maxWidth = '375px';
            previewContainer.style.margin = '0 auto';
            break;
        case 'tablet':
            previewContainer.style.maxWidth = '768px';
            previewContainer.style.margin = '0 auto';
            break;
        case 'desktop':
            previewContainer.style.maxWidth = '100%';
            previewContainer.style.margin = '0';
            break;
    }
}

// ===== INPUT EVENT LISTENERS =====
businessNameInput.addEventListener('input', updatePreviewAndCode);
taglineInput.addEventListener('input', updatePreviewAndCode);
descriptionInput.addEventListener('input', updatePreviewAndCode);
ctaTextInput.addEventListener('input', updatePreviewAndCode);
problemTextInput.addEventListener('input', updatePreviewAndCode);
solutionTextInput.addEventListener('input', updatePreviewAndCode);
alurText1Input.addEventListener('input', updatePreviewAndCode);
alurText2Input.addEventListener('input', updatePreviewAndCode);
alurText3Input.addEventListener('input', updatePreviewAndCode);

// ===== TAMBAHAN BARU: LISTENERS UNTUK INPUT TEMPLATE-SPECIFIC =====
// Landing
const landingWhyInput = document.getElementById('landingWhy');
if (landingWhyInput) landingWhyInput.addEventListener('input', updatePreviewAndCode);

// Service
['service1Title', 'service1Desc', 'service2Title', 'service2Desc', 'service3Title', 'service3Desc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updatePreviewAndCode);
});

// Product
['productTitle', 'productFeature1', 'productFeature2', 'productFeature3', 'productFeature4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updatePreviewAndCode);
});

function updatePreviewAndCode() {
    updatePreview();
    updateCodeOutput();
}

// ===== PREVIEW GENERATION =====
function updatePreview() {
    const businessName = businessNameInput.value || "Nama Bisnis Anda";
    const tagline = taglineInput.value || "Solusi Terbaik untuk Bisnis Anda";
    const description = descriptionInput.value || "Deskripsi bisnis Anda";
    const ctaText = ctaTextInput.value || "Hubungi Kami Sekarang";
    const problemText = problemTextInput.value || "Masalah yang dihadapi pelanggan";
    const solutionText = solutionTextInput.value || "Solusi yang ditawarkan";
    const alurText1 = alurText1Input.value || "Tekan tombol pesan";
    const alurText2 = alurText2Input.value || "Website dikerjakan oleh tim kami";
    const alurText3 = alurText3Input.value || "Website selesai dan online";

    // Gunakan window.ctaLinkInput jika ada, kalo gak baru cari manual
    const ctaLinkInputElement = window.ctaLinkInput || document.getElementById('ctaLink');
    const ctaLink = ctaLinkInputElement ? ctaLinkInputElement.value.trim() : '';

    // Format CTA Action dengan validasi
    let ctaAction = '';
    if (ctaLink && ctaLink !== '' && ctaLink !== '#') {
        let formattedLink = ctaLink;

        // Auto-correct WhatsApp links
        if (ctaLink.includes('wa.me') && !ctaLink.startsWith('http')) {
            formattedLink = 'https://' + ctaLink;
        }

        // Pastikan punya protocol
        if (!formattedLink.startsWith('http') && !formattedLink.startsWith('https') &&
            !formattedLink.startsWith('tel') && !formattedLink.startsWith('mailto')) {
            formattedLink = 'https://' + formattedLink;
        }

        ctaAction = `onclick="window.open('${formattedLink}', '_blank')"`;
        console.log('CTA Action set:', ctaAction);
    }

    // Ambil gambar dari localStorage
    const uploadedImage = localStorage.getItem('hml_uploaded_image');
    const logoHTML = uploadedImage
        ? `<img src="${uploadedImage}" style="max-width: 200px; max-height: 100px; margin-bottom: 20px; border-radius: 8px; object-fit: contain;" alt="Logo">`
        : '';

    let featuresHTML = '';
    let templateTitle = '';

    // Template-specific content
    switch(currentTemplate) {
        case 'service':
            templateTitle = 'Layanan Kami';
            // AMBIL NILAI DARI INPUT BARU
            const service1Title = document.getElementById('service1Title')?.value || "Layanan Profesional";
            const service1Desc = document.getElementById('service1Desc')?.value || "Kami memberikan layanan terbaik dengan tim ahli di bidangnya.";
            const service2Title = document.getElementById('service2Title')?.value || "Support 24/7";
            const service2Desc = document.getElementById('service2Desc')?.value || "Tim support kami siap membantu Anda kapan saja, di mana saja.";
            const service3Title = document.getElementById('service3Title')?.value || "Hasil Terjamin";
            const service3Desc = document.getElementById('service3Desc')?.value || "Kami menjamin kepuasan dan hasil yang maksimal untuk Anda.";

            featuresHTML = `
            <div class="features-section">
                <div class="feature-card">
                    <h3 style="color: ${currentColor}; margin-bottom: 10px;">${service1Title}</h3>
                    <p>${service1Desc}</p>
                </div>
                <div class="feature-card">
                    <h3 style="color: ${currentColor}; margin-bottom: 10px;">${service2Title}</h3>
                    <p>${service2Desc}</p>
                </div>
                <div class="feature-card">
                    <h3 style="color: ${currentColor}; margin-bottom: 10px;">${service3Title}</h3>
                    <p>${service3Desc}</p>
                </div>
            </div>`;
            break;

        case 'product':
            templateTitle = 'Produk Unggulan';
            // AMBIL NILAI DARI INPUT BARU
            const productTitle = document.getElementById('productTitle')?.value || "✨ Fitur Unggulan";
            const productFeature1 = document.getElementById('productFeature1')?.value || "Fitur premium pertama dengan kualitas terbaik";
            const productFeature2 = document.getElementById('productFeature2')?.value || "Fitur kedua yang akan mengubah cara kerja Anda";
            const productFeature3 = document.getElementById('productFeature3')?.value || "Fitur ketiga dengan teknologi terkini";
            const productFeature4 = document.getElementById('productFeature4')?.value || "Fitur keempat yang memberikan nilai tambah";

            featuresHTML = `
            <div style="text-align: left; margin: 40px 0;">
                <h2 style="color: ${currentColor}; margin-bottom: 20px; text-align: center;">${productTitle}</h2>
                <ul style="list-style: none; padding-left: 0; max-width: 600px; margin: 0 auto;">
                    <li style="padding: 12px 0; border-bottom: 1px solid #eee; display: flex; align-items: center;">
                        <i class="fas fa-check-circle" style="color: ${currentColor}; margin-right: 10px;"></i>
                        <span>${productFeature1}</span>
                    </li>
                    <li style="padding: 12px 0; border-bottom: 1px solid #eee; display: flex; align-items: center;">
                        <i class="fas fa-check-circle" style="color: ${currentColor}; margin-right: 10px;"></i>
                        <span>${productFeature2}</span>
                    </li>
                    <li style="padding: 12px 0; border-bottom: 1px solid #eee; display: flex; align-items: center;">
                        <i class="fas fa-check-circle" style="color: ${currentColor}; margin-right: 10px;"></i>
                        <span>${productFeature3}</span>
                    </li>
                    <li style="padding: 12px 0; display: flex; align-items: center;">
                        <i class="fas fa-check-circle" style="color: ${currentColor}; margin-right: 10px;"></i>
                        <span>${productFeature4}</span>
                    </li>
                </ul>
            </div>`;
            break;

        default: // landing
            templateTitle = 'Selamat Datang';
            // AMBIL NILAI DARI INPUT BARU
            const landingWhy = document.getElementById('landingWhy')?.value || "Kami berkomitmen memberikan solusi terbaik dengan inovasi dan kualitas yang tidak diragukan lagi. Setiap produk dan layanan kami dirancang untuk memenuhi kebutuhan spesifik Anda.";

            featuresHTML = `
            <div style="margin: 40px 0; text-align: center;">
                <h2 style="color: ${currentColor}; margin-bottom: 20px;">Mengapa Memilih Kami?</h2>
                <p style="font-size: 1.2rem; max-width: 800px; margin: 0 auto 30px; line-height: 1.7;">
                    ${landingWhy}
                </p>
            </div>`;
    }

    // GENERATE CUSTOM FOOTER (SEMUA USER SEKARANG DAPAT FULL ACCESS)
    const footerText1 = document.getElementById('footerText1')?.value || `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`;
    const footerText2 = document.getElementById('footerText2')?.value || "Dibuat dengan ❤️";
    const showCredit = document.getElementById('showCredit')?.checked !== false;

    // Social links
    const facebook = document.getElementById('facebookLink')?.value.trim();
    const instagram = document.getElementById('instagramLink')?.value.trim();
    const whatsapp = document.getElementById('whatsappLink')?.value.trim();

    // Generate social icons jika ada link
    let socialHTML = '';
    if (facebook || instagram || whatsapp) {
        socialHTML = `
        <div class="social-links" style="margin: 15px 0;">
            ${
                facebook ?
                `<a href="${facebook}" target="_blank" style="margin: 0 10px; color: ${currentColor};">
                    <i class="fab fa-facebook"></i>
                </a>` : ''
            }
            ${
                instagram ?
                `<a href="${instagram}" target="_blank" style="margin: 0 10px; color: ${currentColor};">
                    <i class="fab fa-instagram"></i>
                </a>` : ''
            }
            ${
                whatsapp ?
                `<a href="${whatsapp}" target="_blank" style="margin: 0 10px; color: ${currentColor};">
                    <i class="fab fa-whatsapp"></i>
                </a>` : ''
            }
        </div>`;
    }

    const customFooterHTML = `
    <div class="custom-footer" style="text-align: center; margin-top: 50px; padding: 30px; border-top: 1px solid #eee; color: #666; font-family: ${currentFont};">
        <p style="margin: 10px 0;">${footerText1}</p>
        ${socialHTML}
        ${showCredit ? `<p style="margin-top: 20px; font-size: 0.9rem;">${footerText2}</p>` : ''}
    </div>`;

    // Generate preview HTML
    const previewHTML = `
    <div class="generated-page" style="font-family: ${currentFont};">
        <div class="hero-section" style="background: linear-gradient(135deg, ${currentColor}15, #ffffff);">
            ${logoHTML}
            <h1 class="hero-title" style="color: ${currentColor}; font-family: ${currentFont};
            ${currentFont.includes('Montserrat') ? 'font-weight: 600;' : ''}">${businessName}</h1>
            <p class="hero-tagline" style="font-family: ${currentFont};
            ${currentFont.includes('Montserrat') ? 'font-weight: 600;' : ''}">${tagline}</p>
            <p class="hero-description" style="font-family: ${currentFont};
            ${currentFont.includes('Montserrat') ? 'font-weight: 600;' : ''}">${description}</p>

            ${featuresHTML}

            <h1>Masalah</h1>
            <p>${problemText}</p>
            <h1>Solusi</h1>
            <p>${solutionText}</p>

            <br><br>

            <h1>Alur Pengerjaan</h1>
            <ol>
                <li>${alurText1}</li>
                <li>${alurText2}</li>
                <li>${alurText3}</li>
            </ol>

            <br><br>
            <button class="cta-button" style="background: ${currentColor}; font-family: ${currentFont};
            ${currentFont.includes('Montserrat') ? 'font-weight: 600;' : ''}" ${ctaAction}>${ctaText}</button>
        </div>

        ${customFooterHTML}
    </div>`;

    previewContainer.innerHTML = previewHTML;
}

// ===== CODE GENERATION =====
function updateCodeOutput() {
    const businessName = businessNameInput.value || "Nama Bisnis Anda";
    const tagline = taglineInput.value || "Solusi Terbaik untuk Bisnis Anda";
    const description = descriptionInput.value || "Deskripsi bisnis Anda";
    const ctaText = ctaTextInput.value || "Hubungi Kami Sekarang";
    const problemText = problemTextInput.value || "Masalah yang dihadapi pelanggan";
    const solutionText = solutionTextInput.value || "Solusi yang ditawarkan";
    const alurText1 = alurText1Input.value || "Tekan tombol pesan";
    const alurText2 = alurText2Input.value || "Website dikerjakan oleh tim kami";
    const alurText3 = alurText3Input.value || "Website selesai dan online";
    const ctaLinkInputElement = window.ctaLinkInput || document.getElementById('ctaLink');
    const ctaLink = ctaLinkInputElement ? ctaLinkInputElement.value.trim() : '';

    // Ambil gambar untuk kode HTML
    const uploadedImage = localStorage.getItem('hml_uploaded_image');
    const logoHTMLCode = uploadedImage
        ? `<div style="text-align: center; margin-bottom: 30px;">
            <img src="${uploadedImage}" style="max-width: 200px; max-height: 100px;" alt="Logo ${businessName}">
           </div>`
        : '';

    let featuresHTML = '';

    // Template-specific content for code
    switch(currentTemplate) {
        case 'service':
            // AMBIL NILAI DARI INPUT BARU
            const service1Title = document.getElementById('service1Title')?.value || "Layanan Profesional";
            const service1Desc = document.getElementById('service1Desc')?.value || "Kami memberikan layanan terbaik dengan tim ahli di bidangnya.";
            const service2Title = document.getElementById('service2Title')?.value || "Support 24/7";
            const service2Desc = document.getElementById('service2Desc')?.value || "Tim support kami siap membantu Anda kapan saja, di mana saja.";
            const service3Title = document.getElementById('service3Title')?.value || "Hasil Terjamin";
            const service3Desc = document.getElementById('service3Desc')?.value || "Kami menjamin kepuasan dan hasil yang maksimal untuk Anda.";

            featuresHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 40px 0;">
            <div style="background: ${currentColor}10; padding: 20px; border-radius: 8px; border-left: 4px solid ${currentColor};">
                <h3 style="color: ${currentColor};">${service1Title}</h3>
                <p>${service1Desc}</p>
            </div>
            <div style="background: ${currentColor}10; padding: 20px; border-radius: 8px; border-left: 4px solid ${currentColor};">
                <h3 style="color: ${currentColor};">${service2Title}</h3>
                <p>${service2Desc}</p>
            </div>
            <div style="background: ${currentColor}10; padding: 20px; border-radius: 8px; border-left: 4px solid ${currentColor};">
                <h3 style="color: ${currentColor};">${service3Title}</h3>
                <p>${service3Desc}</p>
            </div>
        </div>`;
            break;

        case 'product':
            // AMBIL NILAI DARI INPUT BARU
            const productTitle = document.getElementById('productTitle')?.value || "✨ Fitur Unggulan";
            const productFeature1 = document.getElementById('productFeature1')?.value || "Fitur premium pertama dengan kualitas terbaik";
            const productFeature2 = document.getElementById('productFeature2')?.value || "Fitur kedua yang akan mengubah cara kerja Anda";
            const productFeature3 = document.getElementById('productFeature3')?.value || "Fitur ketiga dengan teknologi terkini";
            const productFeature4 = document.getElementById('productFeature4')?.value || "Fitur keempat yang memberikan nilai tambah";

            featuresHTML = `
        <div style="text-align: left; margin: 40px 0;">
            <h2 style="color: ${currentColor}; margin-bottom: 20px; text-align: center;">${productTitle}</h2>
            <ul style="list-style: none; padding-left: 0; max-width: 600px; margin: 0 auto;">
                <li style="padding: 12px 0; border-bottom: 1px solid #eee;">✓ ${productFeature1}</li>
                <li style="padding: 12px 0; border-bottom: 1px solid #eee;">✓ ${productFeature2}</li>
                <li style="padding: 12px 0; border-bottom: 1px solid #eee;">✓ ${productFeature3}</li>
                <li style="padding: 12px 0;">✓ ${productFeature4}</li>
            </ul>
        </div>`;
            break;

        default:
            // AMBIL NILAI DARI INPUT BARU
            const landingWhy = document.getElementById('landingWhy')?.value || "Kami berkomitmen memberikan solusi terbaik dengan inovasi dan kualitas yang tidak diragukan lagi. Setiap produk dan layanan kami dirancang untuk memenuhi kebutuhan spesifik Anda.";

            featuresHTML = `
        <div style="margin: 40px 0; text-align: center;">
            <h2 style="color: ${currentColor}; margin-bottom: 20px;">Mengapa Memilih Kami?</h2>
            <p style="font-size: 1.2rem; max-width: 800px; margin: 0 auto 30px; line-height: 1.7;">
                ${landingWhy}
            </p>
        </div>`;
    }

    // GENERATE CUSTOM FOOTER UNTUK SEMUA USER
    const footerText1 = document.getElementById('footerText1')?.value || `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`;
    const footerText2 = document.getElementById('footerText2')?.value || "Dibuat dengan ❤️ menggunakan HMLilder";
    const showCredit = document.getElementById('showCredit')?.checked !== false;

    // Social links untuk final HTML
    const facebook = document.getElementById('facebookLink')?.value.trim();
    const instagram = document.getElementById('instagramLink')?.value.trim();
    const whatsapp = document.getElementById('whatsappLink')?.value.trim();

    // Social icons dengan Font Awesome CDN
    let socialHTML = '';
    if (facebook || instagram || whatsapp) {
        socialHTML = `
        <div class="social-links" style="margin: 15px 0;">
            ${
                facebook ?
                `<a href="${facebook}" target="_blank" style="margin: 0 10px; color: ${currentColor}; text-decoration: none;">
                    <i class="fab fa-facebook"></i>
                </a>` : ''
            }
            ${
                instagram ?
                `<a href="${instagram}" target="_blank" style="margin: 0 10px; color: ${currentColor}; text-decoration: none;">
                    <i class="fab fa-instagram"></i>
                </a>` : ''
            }
            ${
                whatsapp ?
                `<a href="${whatsapp}" target="_blank" style="margin: 0 10px; color: ${currentColor}; text-decoration: none;">
                    <i class="fab fa-whatsapp"></i>
                </a>` : ''
            }
        </div>`;
    }

    const footerHTML = `
    <footer class="footer">
        <p>${footerText1}</p>
        ${socialHTML}
        ${showCredit ? `<p style="margin-top: 10px; font-size: 0.9rem;">${footerText2}</p>` : ''}
    </footer>`;

    // Full HTML code
    const fullHTML = `<!DOCTYPE html>
<!-- bahasa file html. "id" = indonesia -->
<html lang="id">
<!-- kepala dari file html -->
<head>
    <!-- UTF-8 berarti support konten unik seperti emoji -->
    <meta charset="UTF-8">
    <!-- responsif di layan kecil -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- judul website -->
    <title>${businessName} - ${tagline}</title>
    
    <!-- style dari website -->
    <style>
    ${
        (facebook || instagram || whatsapp) ?
        `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">` : ''
    }

    ${
        currentFont.includes('Montserrat') ?
        `<link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">` :
        ''
    }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: ${currentFont};
        }

        body {
            background: #f9fafb;
            color: #333;
            line-height: 1.6;
            font-family: ${currentFont};
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }

        .hero {
            text-align: center;
            padding: 60px 20px;
            background: linear-gradient(135deg, ${currentColor}20, #ffffff);
            border-radius: 16px;
            margin: 40px 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .hero h1 {
            font-size: 2.8rem;
            color: ${currentColor};
            margin-bottom: 15px;
            font-family: ${currentFont};
        }

        .hero .tagline {
            font-size: 1.4rem;
            color: #555;
            margin-bottom: 20px;
            font-weight: 500;
            font-family: ${currentFont};
        }

        .hero .description {
            font-size: 1.1rem;
            color: #666;
            max-width: 700px;
            margin: 0 auto 30px;
            font-family: ${currentFont};
        }

        .hero li {
            margin-bottom: 10px;
            font-family: ${currentFont};
        }

        .cta-button {
            display: inline-block;
            padding: 15px 35px;
            background: ${currentColor};
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1.1rem;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            font-family: ${currentFont};
            margin-top: 30px;
        }

        .cta-button:hover {
            background: ${currentColor.replace(')', ', 0.9)').replace('rgb', 'rgba')};
            transform: translateY(-3px);
            box-shadow: 0 10px 20px ${currentColor}40;
        }

        .footer {
            text-align: center;
            margin-top: 60px;
            padding: 20px;
            color: #666;
            border-top: 1px solid #eee;
        }

        @media (max-width: 768px) {
            .hero h1 { font-size: 2.2rem; }
            .hero .tagline { font-size: 1.2rem; }
        }
    </style>
</head>
<body>
    <!-- konten web -->
    <div class="container">
        <!-- header = bagian atas web -->
        <header style="text-align: center; padding: 20px 0;">
            <!-- logo -->
            ${logoHTMLCode}
        </header>
        <!-- konten utama -->
        <main>
            <!-- hero = konten mencolok/menarik pengunjung dari website -->
            <section class="hero">
                <!-- judul -->
                <h1>${businessName}</h1>
                <!-- tagline -->
                <p class="tagline">${tagline}</p>
                <!-- deskripsi -->
                <p class="description">${description}</p>
                <!-- features -->
                ${featuresHTML}

                <!-- problem-solution -->
                <h1>Masalah</h1>
                <p class="description">${problemText}</p>
                <h1>Solusi</h1>
                <p class="description">${solutionText}</p>

                <br><br>
                <!-- alur pengerjaan -->
                <h1>Alur Pengerjaan</h1>
                <ol>
                    <li>${alurText1}</li>
                    <li>${alurText2}</li>
                    <li>${alurText3}</li>
                </ol>

                <br><br>
                <!-- tombol -->
                ${ctaLink ? `<a href="${ctaLink}" target="_blank" class="cta-button">${ctaText}</a>` : `<button class="cta-button">${ctaText}</button>`}
            </section>
        </main>
        <!-- footer = bagian paling bawah website, biasanya isi credit/copyright. -->
        ${footerHTML}
    </div>

    <!-- atur link tombol -->
    <script>
        // CTA Button handler - conditional
        document.addEventListener('DOMContentLoaded', function() {
            const ctaBtn = document.querySelector('.cta-button');

            // Hanya attach event kalo:
            // 1. Itu BUTTON (bukan <a> tag)
            // 2. Tidak punya href attribute
            // 3. Tidak punya onclick attribute (karena di preview udah dikasih)
            if (ctaBtn &&
                ctaBtn.tagName === 'BUTTON' &&
                !ctaBtn.hasAttribute('href') &&
                !ctaBtn.hasAttribute('onclick')) {

                ctaBtn.addEventListener('click', function() {
                    alert('Terima kasih! Fitur CTA Link tersedia di Paket Plus.');
                });
            }
        });
    <\/script>
</body>
</html>`;

    codeOutput.value = fullHTML;
}

// ===== COPY CODE FUNCTION =====
document.getElementById('copyBtn').addEventListener('click', function() {
    codeOutput.select();
    codeOutput.setSelectionRange(0, 99999); // For mobile devices

    try {
        navigator.clipboard.writeText(codeOutput.value);

        // Visual feedback
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

// === GLOBAL CTA LINK FIX ===
// Function untuk testing CTA Link
window.testCTALink = function() {
    if (!window.ctaLinkInput) {
        alert('CTA Link input not found!');
        return;
    }

    const currentLink = window.ctaLinkInput.value.trim();
    if (!currentLink) {
        alert('CTA Link is empty! Try: https://wa.me/6281234567890');
        window.ctaLinkInput.value = 'https://wa.me/6281234567890';
        window.ctaLinkInput.dispatchEvent(new Event('input'));
    } else {
        alert(`Current CTA Link: ${currentLink}\n\nWill open in new tab when clicked.`);
        window.open(currentLink, '_blank');
    }
};

// ===== DOWNLOAD HTML FILE FUNCTION =====
function downloadHTMLFile() {
    const code = codeOutput.value;

    if (!code.trim()) {
        alert('❌ Tidak ada kode HTML untuk didownload!');
        return;
    }

    // Generate filename
    const businessName = businessNameInput.value.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `${businessName || 'website'}_${Date.now()}.html`;

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

// ===== IMAGE UPLOAD HANDLER =====
function handleImageUpload(event) {
    const file = event.target.files[0];

    if (!file) {
        alert('⚠️ Pilih gambar terlebih dahulu!');
        return;
    }

    // Validasi tipe file
    if (!file.type.match('image.*')) {
        alert('❌ File harus berupa gambar (JPG, PNG, GIF)');
        event.target.value = '';
        return;
    }

    // Validasi ukuran file (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('❌ Ukuran gambar maksimal 2MB');
        event.target.value = '';
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const imageData = e.target.result;

        // Simpan ke localStorage
        localStorage.setItem('hml_uploaded_image', imageData);

        // Tampilkan preview
        const imagePreview = document.getElementById('imagePreview');
        const previewImage = document.getElementById('previewImage');

        if (imagePreview && previewImage) {
            previewImage.src = imageData;
            imagePreview.style.display = 'block';
        }

        // Update preview
        updatePreview();
        updateCodeOutput();

        alert('✅ Gambar berhasil diupload!');
    };

    reader.onerror = function() {
        alert('❌ Gagal membaca file gambar');
        event.target.value = '';
    };

    reader.readAsDataURL(file);
}

// Update fungsi removeImage yang sudah ada
function removeImage() {
    localStorage.removeItem('hml_uploaded_image');

    const imagePreview = document.getElementById('imagePreview');
    const imageUpload = document.getElementById('imageUpload');

    if (imagePreview) {
        imagePreview.style.display = 'none';
    }

    if (imageUpload) {
        imageUpload.value = '';
    }

    updatePreview();
    updateCodeOutput();

    alert('🗑️ Gambar dihapus!');
}

// ===== INITIALIZE =====
function init() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Initial updates
    updatePreview();
    updateCodeOutput();
    updatePreviewContainerSize();

    // ===== TAMBAHAN: TAMPILKAN INPUT UNTUK TEMPLATE DEFAULT =====
    // Default template adalah 'landing', jadi tampilkan input landing
    document.getElementById('landingSpecific').style.display = 'block';

    // ===== UNLOCK IMAGE UPLOAD =====
    const imageUpload = document.getElementById('imageUpload');
    imageUpload.disabled = false;
    imageUpload.classList.remove('premium-locked');

    // Event listener untuk upload
    imageUpload.addEventListener('change', handleImageUpload);

    // ===== CHECK EXISTING UPLOADED IMAGE =====
    const existingImage = localStorage.getItem('hml_uploaded_image');
    if (existingImage) {
        document.getElementById('imagePreviewContainer').style.display = 'block';
        document.getElementById('uploadedImagePreview').src = existingImage;
    }

    // ===== CTA LINK SETUP =====
    window.ctaLinkInput = document.getElementById('ctaLink');
    if (window.ctaLinkInput) {
        // UNLOCK untuk SEMUA USER (free & premium)
        window.ctaLinkInput.disabled = false;
        window.ctaLinkInput.classList.remove('premium-locked');
        window.ctaLinkInput.placeholder = "https://wa.me/628...";

        window.ctaLinkInput.addEventListener('input', function() {
            updatePreview();
            updateCodeOutput();
        });
    }

    // 4. Debug button
    setTimeout(() => {
        const debugHTML = `
        <div style="position: fixed; bottom: 10px; right: 10px; background: #333; color: white; padding: 10px; border-radius: 5px; z-index: 9999; font-size: 12px;">
            <strong>CTA Debug:</strong><br>
            <button onclick="testCTALink()" style="background: #f72585; color: white; border: none; padding: 5px 10px; border-radius: 3px; margin-top: 5px; cursor: pointer;">
                Test CTA Link
            </button>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', debugHTML);
    }, 500);

    console.log('PageCraft Studio loaded successfully!');
}

// ===== DOWNLOAD BUTTON SETUP =====
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    // UNLOCK untuk semua user
    downloadBtn.classList.remove('premium-locked');
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = '<i class="fas fa-file-download"></i> Download File HTML';
    downloadBtn.style.background = '';

    // Pasang event listener
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        downloadHTMLFile();
    });
}

// Run initialization when page loads
window.addEventListener('DOMContentLoaded', init);