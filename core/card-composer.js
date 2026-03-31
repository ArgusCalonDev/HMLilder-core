// Card Composer Logic

// DOM Elements
const cardTitle = document.getElementById('card-title');
const cardDescription = document.getElementById('card-description');
const cardImage = document.getElementById('card-image');
const cardBgColor = document.getElementById('card-bg-color');
const cardBgColorHex = document.getElementById('card-bg-color-hex');
const cardTextColor = document.getElementById('card-text-color');
const cardTextColorHex = document.getElementById('card-text-color-hex');
const cardBorderRadius = document.getElementById('card-border-radius');
const previewCard = document.getElementById('preview-card');
const previewImage = document.getElementById('preview-image');
const previewTitle = document.getElementById('preview-title');
const previewDescription = document.getElementById('preview-description');
const htmlOutput = document.getElementById('html-output');
const cssOutput = document.getElementById('css-output');

// Update color hex display
cardBgColor.addEventListener('input', function() {
    cardBgColorHex.value = this.value;
});

cardTextColor.addEventListener('input', function() {
    cardTextColorHex.value = this.value;
});

// Generate card function
function generateCard() {
    const title = cardTitle.value || 'Card Title';
    const description = cardDescription.value || 'Card description';
    const imageUrl = cardImage.value;
    const bgColor = cardBgColor.value;
    const textColor = cardTextColor.value;
    const borderRadius = cardBorderRadius.value + 'px';

    // Update preview
    previewTitle.textContent = title;
    previewDescription.textContent = description;
    previewCard.style.backgroundColor = bgColor;
    previewCard.style.color = textColor;
    previewCard.style.borderRadius = borderRadius;

    if (imageUrl) {
        previewImage.src = imageUrl;
        previewImage.alt = title;
        previewImage.style.display = 'block';
    } else {
        previewImage.style.display = 'none';
    }

    // Generate HTML
    const htmlCode = `<div class="card">
  ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ''}
  <h3>${title}</h3>
  <p>${description}</p>
</div>`;

    // Generate CSS
    const cssCode = `.card {
  background-color: ${bgColor};
  color: ${textColor};
  border-radius: ${borderRadius};
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  max-width: 300px;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.card h3 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
}

.card p {
  margin: 0;
  line-height: 1.5;
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
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = 'var(--success)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = 'var(--success)';
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy code. Please copy manually.');
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    generateCard(); // Generate initial card
    
    // Add real-time updates
    [cardTitle, cardDescription, cardImage, cardBgColor, cardTextColor, cardBorderRadius].forEach(element => {
        element.addEventListener('input', generateCard);
    });
});