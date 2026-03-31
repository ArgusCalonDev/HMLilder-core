// Hero Section Generator Logic

// DOM Elements
const heroTitle = document.getElementById('hero-title');
const heroSubtitle = document.getElementById('hero-subtitle');
const heroBgType = document.getElementById('hero-bg-type');
const heroBgColor = document.getElementById('hero-bg-color');
const heroBgColorHex = document.getElementById('hero-bg-color-hex');
const heroGradientStart = document.getElementById('hero-gradient-start');
const heroGradientEnd = document.getElementById('hero-gradient-end');
const heroBgImage = document.getElementById('hero-bg-image');
const heroTextColor = document.getElementById('hero-text-color');
const heroTextColorHex = document.getElementById('hero-text-color-hex');
const heroButtonText = document.getElementById('hero-button-text');
const heroButtonUrl = document.getElementById('hero-button-url');
const previewHero = document.getElementById('preview-hero');
const htmlOutput = document.getElementById('html-output');
const cssOutput = document.getElementById('css-output');

// Background type settings
const bgColorSettings = document.getElementById('bg-color-settings');
const bgGradientSettings = document.getElementById('bg-gradient-settings');
const bgImageSettings = document.getElementById('bg-image-settings');

// Update background type visibility
function updateBgType() {
    const bgType = heroBgType.value;
    
    bgColorSettings.style.display = bgType === 'color' ? 'block' : 'none';
    bgGradientSettings.style.display = bgType === 'gradient' ? 'block' : 'none';
    bgImageSettings.style.display = bgType === 'image' ? 'block' : 'none';
    
    updateHero();
}

// Update color hex display
heroBgColor.addEventListener('input', function() {
    heroBgColorHex.value = this.value;
});

heroTextColor.addEventListener('input', function() {
    heroTextColorHex.value = this.value;
});

// Update hero section function
function updateHero() {
    const title = heroTitle.value || 'Judul Hero';
    const subtitle = heroSubtitle.value || 'Deskripsi singkat';
    const bgType = heroBgType.value;
    const textColor = heroTextColor.value;
    const buttonText = heroButtonText.value || 'Button';
    const buttonUrl = heroButtonUrl.value || '#';

    // Get background style
    let bgStyle = '';
    let backgroundCss = '';
    
    if (bgType === 'color') {
        const color = heroBgColor.value;
        bgStyle = `background: ${color};`;
        backgroundCss = `background: ${color};`;
    } else if (bgType === 'gradient') {
        const startColor = heroGradientStart.value;
        const endColor = heroGradientEnd.value;
        bgStyle = `background: linear-gradient(135deg, ${startColor} 0%, ${endColor} 100%);`;
        backgroundCss = `background: linear-gradient(135deg, ${startColor} 0%, ${endColor} 100%);`;
    } else if (bgType === 'image') {
        const imageUrl = heroBgImage.value;
        if (imageUrl) {
            bgStyle = `background: url('${imageUrl}'); background-size: cover; background-position: center;`;
            backgroundCss = `background: url('${imageUrl}');\n  background-size: cover;\n  background-position: center;`;
        } else {
            bgStyle = `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`;
            backgroundCss = `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`;
        }
    }

    // Update preview
    previewHero.style.color = textColor;
    previewHero.setAttribute('style', `${bgStyle} color: ${textColor}; padding: 100px 20px; text-align: center; min-height: 400px; display: flex; align-items: center; justify-content: center; background-size: cover; background-position: center;`);
    
    const previewTitle = previewHero.querySelector('.hero-title');
    const previewSubtitle = previewHero.querySelector('.hero-subtitle');
    const previewButton = previewHero.querySelector('.hero-button');
    
    previewTitle.textContent = title;
    previewSubtitle.textContent = subtitle;
    previewButton.textContent = buttonText;
    previewButton.href = buttonUrl;
    previewButton.style.color = bgType === 'color' ? getContrastColor(heroBgColor.value) : '#667eea';

    // Generate code
    generateCode(title, subtitle, bgType, textColor, buttonText, buttonUrl, backgroundCss);
}

// Get contrast color (white or dark text based on background)
function getContrastColor(hexColor) {
    const rgb = parseInt(hexColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? '#2b2d42' : '#ffffff';
}

// Generate code
function generateCode(title, subtitle, bgType, textColor, buttonText, buttonUrl, backgroundCss) {
    // Generate HTML
    const htmlCode = `<section class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">${title}</h1>
    <p class="hero-subtitle">${subtitle}</p>
    <a href="${buttonUrl}" class="hero-button">${buttonText}</a>
  </div>
</section>`;

    // Generate CSS
    let buttonStyleCss = '';
    if (bgType === 'color') {
        const contrastColor = getContrastColor(heroBgColor.value);
        buttonStyleCss = `
.hero-button {
  display: inline-block;
  background: ${contrastColor === '#ffffff' ? '#ffffff' : 'rgba(255,255,255,0.1)'};
  color: ${contrastColor};
  text-decoration: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}`;
    } else {
        buttonStyleCss = `
.hero-button {
  display: inline-block;
  background: white;
  color: #667eea;
  text-decoration: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}`;
    }

    const cssCode = `.hero-section {
  ${backgroundCss}
  color: ${textColor};
  padding: 100px 20px;
  text-align: center;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 40px;
  line-height: 1.6;
}
${buttonStyleCss}

.hero-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
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
        // Tampilkan feedback sukses
        const copyBtn = document.querySelector('.copy-btn');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Disalin!';
        copyBtn.style.background = 'var(--success)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = 'var(--success)';
        }, 2000);
    }).catch(function(err) {
        console.error('Gagal copy: ', err);
        alert('Gagal menyalin kode. Silakan salin manual.');
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateHero();
    
    // Add event listeners untuk semua input
    [heroTitle, heroSubtitle, heroTextColor, heroButtonText, heroButtonUrl].forEach(element => {
        element.addEventListener('input', updateHero);
    });
    
    // Event listener untuk gradient colors
    heroGradientStart.addEventListener('input', updateHero);
    heroGradientEnd.addEventListener('input', updateHero);
    
    // Event listener untuk image URL
    heroBgImage.addEventListener('input', updateHero);
    
    // Event listener untuk bg color
    heroBgColor.addEventListener('input', updateHero);
});