// Testimonial Generator Logic

let testimonials = [
    {
        name: 'John Doe',
        role: 'CEO Company',
        image: '',
        text: 'This is an amazing service! Highly recommended.'
    }
];

let formCounter = 1;

// DOM Elements
const testimonialForms = document.getElementById('testimonial-forms');
const testimonialPreview = document.getElementById('testimonial-preview');
const htmlOutput = document.getElementById('html-output');
const cssOutput = document.getElementById('css-output');

// Add testimonial function
function addTestimonial() {
    const newTestimonial = {
        name: '',
        role: '',
        image: '',
        text: ''
    };
    testimonials.push(newTestimonial);
    renderForms();
    renderPreview();
    generateCode();
}

// Delete testimonial function
function deleteTestimonial(index) {
    testimonials.splice(index, 1);
    renderForms();
    renderPreview();
    generateCode();
}

// Update testimonial data
function updateTestimonial(index, field, value) {
    testimonials[index][field] = value;
    renderPreview();
    generateCode();
}

// Render forms
function renderForms() {
    testimonialForms.innerHTML = '';
    testimonials.forEach((testimonial, index) => {
        const formHtml = `
            <div class="testimonial-form">
                <button class="delete-testimonial-btn" onclick="deleteTestimonial(${index})">
                    <i class="fas fa-trash"></i>
                </button>
                <h3>Testimonial ${index + 1}</h3>
                <div class="form-group">
                    <label>Nama:</label>
                    <input type="text" value="${testimonial.name}" oninput="updateTestimonial(${index}, 'name', this.value)">
                </div>
                <div class="form-group">
                    <label>Jabatan / Role:</label>
                    <input type="text" value="${testimonial.role}" oninput="updateTestimonial(${index}, 'role', this.value)">
                </div>
                <div class="form-group">
                    <label>Foto (URL, opsional):</label>
                    <input type="url" value="${testimonial.image}" oninput="updateTestimonial(${index}, 'image', this.value)">
                </div>
                <div class="form-group">
                    <label>Isi Testimonial:</label>
                    <textarea oninput="updateTestimonial(${index}, 'text', this.value)">${testimonial.text}</textarea>
                </div>
            </div>
        `;
        testimonialForms.insertAdjacentHTML('beforeend', formHtml);
    });
}

// Render preview
function renderPreview() {
    testimonialPreview.innerHTML = '';
    testimonials.forEach(testimonial => {
        const itemHtml = `
            <div class="testimonial-item">
                ${testimonial.image ? `<img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">` : '<div class="testimonial-image" style="background: #e9ecef;"></div>'}
                <div class="testimonial-name">${testimonial.name || 'Nama'}</div>
                <div class="testimonial-role">${testimonial.role || 'Jabatan'}</div>
                <div class="testimonial-text">"${testimonial.text || 'Isi testimonial'}"</div>
            </div>
        `;
        testimonialPreview.insertAdjacentHTML('beforeend', itemHtml);
    });
}

// Generate code
function generateCode() {
    // Generate HTML
    let htmlCode = '<div class="testimonial-grid">\n';
    testimonials.forEach(testimonial => {
        htmlCode += '  <div class="testimonial-item">\n';
        if (testimonial.image) {
            htmlCode += `    <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">\n`;
        } else {
            htmlCode += '    <div class="testimonial-image"></div>\n';
        }
        htmlCode += `    <div class="testimonial-name">${testimonial.name}</div>\n`;
        htmlCode += `    <div class="testimonial-role">${testimonial.role}</div>\n`;
        htmlCode += `    <div class="testimonial-text">"${testimonial.text}"</div>\n`;
        htmlCode += '  </div>\n';
    });
    htmlCode += '</div>';

    // Generate CSS
    const cssCode = `.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-item {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.testimonial-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 15px;
  object-fit: cover;
  background: #e9ecef;
}

.testimonial-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.testimonial-role {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.testimonial-text {
  font-style: italic;
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
    renderForms();
    renderPreview();
    generateCode();
});