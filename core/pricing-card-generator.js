// Pricing Card Generator Logic

let pricingPlans = [
    {
        name: 'Basic',
        price: '$9.99',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        featured: false
    }
];

// DOM Elements
const pricingForms = document.getElementById('pricing-forms');
const pricingPreview = document.getElementById('pricing-preview');
const htmlOutput = document.getElementById('html-output');
const cssOutput = document.getElementById('css-output');

// Add pricing plan function
function addPricingPlan() {
    const newPlan = {
        name: '',
        price: '$0',
        features: [''],
        featured: false
    };
    pricingPlans.push(newPlan);
    renderForms();
    renderPreview();
    generateCode();
}

// Delete pricing plan function
function deletePricingPlan(index) {
    pricingPlans.splice(index, 1);
    renderForms();
    renderPreview();
    generateCode();
}

// Update pricing plan data
function updatePricingPlan(index, field, value) {
    pricingPlans[index][field] = value;
    renderPreview();
    generateCode();
}

// Update pricing features
function updateFeature(planIndex, featureIndex, value) {
    pricingPlans[planIndex].features[featureIndex] = value;
    renderPreview();
    generateCode();
}

// Add feature to plan
function addFeature(planIndex) {
    pricingPlans[planIndex].features.push('');
    renderForms();
    renderPreview();
    generateCode();
}

// Remove feature from plan
function removeFeature(planIndex, featureIndex) {
    pricingPlans[planIndex].features.splice(featureIndex, 1);
    renderForms();
    renderPreview();
    generateCode();
}

// Toggle featured
function toggleFeatured(index) {
    pricingPlans[index].featured = !pricingPlans[index].featured;
    renderForms();
    renderPreview();
    generateCode();
}

// Render forms
function renderForms() {
    pricingForms.innerHTML = '';
    pricingPlans.forEach((plan, planIndex) => {
        let featuresHtml = '';
        plan.features.forEach((feature, featureIndex) => {
            featuresHtml += `
                <div style="display: flex; gap: 5px; margin-bottom: 8px;">
                    <input type="text" value="${feature}" 
                           oninput="updateFeature(${planIndex}, ${featureIndex}, this.value)"
                           placeholder="Masukkan fitur"
                           style="flex: 1; padding: 8px; border: 2px solid #e9ecef; border-radius: 4px;">
                    <button onclick="removeFeature(${planIndex}, ${featureIndex})" 
                            style="background: #f72585; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });

        const formHtml = `
            <div class="pricing-form">
                <button class="delete-plan-btn" onclick="deletePricingPlan(${planIndex})">
                    <i class="fas fa-trash"></i>
                </button>
                <h3>Plan ${planIndex + 1}</h3>
                
                <div class="form-group">
                    <label>Nama Plan:</label>
                    <input type="text" value="${plan.name}" 
                           oninput="updatePricingPlan(${planIndex}, 'name', this.value)">
                </div>
                
                <div class="form-group">
                    <label>Harga:</label>
                    <input type="text" value="${plan.price}" 
                           oninput="updatePricingPlan(${planIndex}, 'price', this.value)">
                </div>
                
                <div class="form-group">
                    <label>Fitur-Fitur:</label>
                    ${featuresHtml}
                    <button onclick="addFeature(${planIndex})" 
                            style="width: 100%; background: #4361ee; color: white; border: none; padding: 8px; border-radius: 4px; cursor: pointer; margin-top: 10px;">
                        <i class="fas fa-plus"></i> Tambah Fitur
                    </button>
                </div>
                
                <div class="checkbox-group">
                    <input type="checkbox" id="featured-${planIndex}" 
                           ${plan.featured ? 'checked' : ''} 
                           onchange="toggleFeatured(${planIndex})">
                    <label for="featured-${planIndex}" style="margin-bottom: 0;">Tandai sebagai plan unggulan</label>
                </div>
            </div>
        `;
        pricingForms.insertAdjacentHTML('beforeend', formHtml);
    });
}

// Render preview
function renderPreview() {
    pricingPreview.innerHTML = '';
    pricingPlans.forEach(plan => {
        let featuresHtml = '';
        plan.features.forEach(feature => {
            if (feature) {
                featuresHtml += `<li>${feature}</li>`;
            }
        });

        const itemHtml = `
            <div class="pricing-card ${plan.featured ? 'featured' : ''}">
                <h3 class="pricing-title">${plan.name || 'Plan'}</h3>
                <div class="pricing-price">${plan.price || '$0'}</div>
                <ul class="pricing-features">
                    ${featuresHtml || '<li>Tidak ada fitur</li>'}
                </ul>
                <button class="pricing-button">Pilih Plan</button>
            </div>
        `;
        pricingPreview.insertAdjacentHTML('beforeend', itemHtml);
    });
}

// Generate code
function generateCode() {
    // Generate HTML
    let htmlCode = '<div class="pricing-grid">\n';
    pricingPlans.forEach(plan => {
        htmlCode += `  <div class="pricing-card${plan.featured ? ' featured' : ''}">\n`;
        htmlCode += `    <h3 class="pricing-title">${plan.name}</h3>\n`;
        htmlCode += `    <div class="pricing-price">${plan.price}</div>\n`;
        htmlCode += '    <ul class="pricing-features">\n';
        plan.features.forEach(feature => {
            if (feature) {
                htmlCode += `      <li>${feature}</li>\n`;
            }
        });
        htmlCode += '    </ul>\n';
        htmlCode += '    <button class="pricing-button">Pilih Plan</button>\n';
        htmlCode += '  </div>\n';
    });
    htmlCode += '</div>';

    // Generate CSS
    const cssCode = `.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-card {
  background: white;
  border-radius: 10px;
  padding: 30px 25px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.pricing-card.featured {
  border: 2px solid #4361ee;
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(67, 97, 238, 0.3);
}

.pricing-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-weight: bold;
}

.pricing-price {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #4361ee;
}

.pricing-features {
  list-style: none;
  margin: 20px 0;
  text-align: left;
}

.pricing-features li {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.pricing-features li:last-child {
  border-bottom: none;
}

.pricing-button {
  background: #4361ee;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
}

.pricing-button:hover {
  background: #3a0ca3;
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