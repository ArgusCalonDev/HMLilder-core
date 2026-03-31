// Simple Form Builder Logic

// Data struktur untuk form fields
let formFields = [
    {
        id: 1,
        type: 'text',
        label: 'Nama',
        placeholder: 'Masukkan nama Anda',
        required: true,
        options: []
    },
    {
        id: 2,
        type: 'email',
        label: 'Email',
        placeholder: 'Masukkan email Anda',
        required: true,
        options: []
    },
    {
        id: 3,
        type: 'textarea',
        label: 'Pesan',
        placeholder: 'Masukkan pesan Anda',
        required: true,
        options: []
    }
];

let fieldIdCounter = 4;

// DOM Elements
const formTitle = document.getElementById('form-title');
const formFieldsContainer = document.getElementById('form-fields');
const formPreview = document.getElementById('form-preview');
const formTitlePreview = document.getElementById('form-title-preview');
const formFieldsPreview = document.getElementById('form-fields-preview');
const htmlOutput = document.getElementById('html-output');
const cssOutput = document.getElementById('css-output');
const jsOutput = document.getElementById('js-output');

// Tipe field yang tersedia
const fieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'email', label: 'Email Input' },
    { value: 'password', label: 'Password Input' },
    { value: 'number', label: 'Number Input' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select', label: 'Dropdown Select' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio Button' }
];

// Tambah field form
function addFormField() {
    const newField = {
        id: fieldIdCounter++,
        type: 'text',
        label: 'Field Baru',
        placeholder: '',
        required: false,
        options: []
    };
    formFields.push(newField);
    renderFieldEditors();
    updateFormPreview();
}

// Hapus field form
function deleteFormField(id) {
    formFields = formFields.filter(field => field.id !== id);
    renderFieldEditors();
    updateFormPreview();
}

// Update field data
function updateField(id, key, value) {
    const field = formFields.find(f => f.id === id);
    if (field) {
        field[key] = value;
        updateFormPreview();
    }
}

// Render field editors
function renderFieldEditors() {
    formFieldsContainer.innerHTML = '';
    
    formFields.forEach((field, index) => {
        const fieldEditor = document.createElement('div');
        fieldEditor.className = 'field-editor';
        fieldEditor.innerHTML = `
            <button class="delete-field-btn" onclick="deleteFormField(${field.id})">
                <i class="fas fa-trash"></i>
            </button>
            <h3>Field ${index + 1}</h3>
            
            <div class="field-editor-grid">
                <div class="form-group">
                    <label>Tipe Field:</label>
                    <select onchange="updateField(${field.id}, 'type', this.value); renderFieldEditors(); updateFormPreview();">
                        ${fieldTypes.map(ft => `<option value="${ft.value}" ${field.type === ft.value ? 'selected' : ''}>${ft.label}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Label:</label>
                    <input type="text" value="${field.label}" onchange="updateField(${field.id}, 'label', this.value)">
                </div>
            </div>
            
            <div class="field-editor-grid full">
                <div class="form-group">
                    <label>Placeholder:</label>
                    <input type="text" value="${field.placeholder}" onchange="updateField(${field.id}, 'placeholder', this.value)">
                </div>
            </div>
            
            ${(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') ? `
                <div class="field-editor-grid full-width">
                    <div class="form-group">
                        <label>Opsi (pisahkan dengan koma):</label>
                        <input type="text" value="${field.options.join(', ')}" onchange="updateField(${field.id}, 'options', this.value.split(',').map(o => o.trim()))">
                    </div>
                </div>
            ` : ''}
            
            <div class="checkbox-group">
                <input type="checkbox" id="required-${field.id}" ${field.required ? 'checked' : ''} onchange="updateField(${field.id}, 'required', this.checked)">
                <label for="required-${field.id}" style="margin-bottom: 0;">Wajib Diisi</label>
            </div>
        `;
        
        formFieldsContainer.appendChild(fieldEditor);
    });
}

// Update preview form
function updateFormPreview() {
    // Update title
    formTitlePreview.textContent = formTitle.value || 'Form';
    
    // Update form fields
    formFieldsPreview.innerHTML = '';
    
    formFields.forEach(field => {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = 'form-field-wrapper';
        
        let fieldHTML = '';
        
        if (field.type === 'textarea') {
            fieldHTML = `
                <label>${field.label}${field.required ? ' *' : ''}</label>
                <textarea placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>
            `;
        } else if (field.type === 'select') {
            fieldHTML = `
                <label>${field.label}${field.required ? ' *' : ''}</label>
                <select ${field.required ? 'required' : ''}>
                    <option value="">Pilih salah satu</option>
                    ${field.options.map(opt => `<option>${opt}</option>`).join('')}
                </select>
            `;
        } else if (field.type === 'radio') {
            fieldHTML = `
                <label>${field.label}${field.required ? ' *' : ''}</label>
                <div>
                    ${field.options.map(opt => `
                        <div style="margin-bottom: 8px;">
                            <input type="radio" name="field-${field.id}" value="${opt}" ${field.required ? 'required' : ''}>
                            <label style="display: inline; margin-left: 5px;">${opt}</label>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (field.type === 'checkbox') {
            fieldHTML = `
                <label>${field.label}${field.required ? ' *' : ''}</label>
                <div>
                    ${field.options.map(opt => `
                        <div style="margin-bottom: 8px;">
                            <input type="checkbox" name="field-${field.id}" value="${opt}">
                            <label style="display: inline; margin-left: 5px;">${opt}</label>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            fieldHTML = `
                <label>${field.label}${field.required ? ' *' : ''}</label>
                <input type="${field.type}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>
            `;
        }
        
        fieldWrapper.innerHTML = fieldHTML;
        formFieldsPreview.appendChild(fieldWrapper);
    });
    
    // Generate code
    generateFormCode();
}

// Generate form code
function generateFormCode() {
    const formId = 'contact-form';
    const title = formTitle.value || 'Form';
    
    // Generate HTML
    let htmlCode = `<form id="${formId}">\n  <h3>${title}</h3>\n`;
    
    formFields.forEach(field => {
        if (field.type === 'textarea') {
            htmlCode += `  <div class="form-field">\n`;
            htmlCode += `    <label for="field-${field.id}">${field.label}${field.required ? ' <span>*</span>' : ''}</label>\n`;
            htmlCode += `    <textarea id="field-${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>\n`;
            htmlCode += `  </div>\n`;
        } else if (field.type === 'select') {
            htmlCode += `  <div class="form-field">\n`;
            htmlCode += `    <label for="field-${field.id}">${field.label}${field.required ? ' <span>*</span>' : ''}</label>\n`;
            htmlCode += `    <select id="field-${field.id}" ${field.required ? 'required' : ''}>\n`;
            htmlCode += `      <option value="">Pilih salah satu</option>\n`;
            field.options.forEach(opt => {
                htmlCode += `      <option value="${opt}">${opt}</option>\n`;
            });
            htmlCode += `    </select>\n`;
            htmlCode += `  </div>\n`;
        } else if (field.type === 'radio') {
            htmlCode += `  <div class="form-field">\n`;
            htmlCode += `    <label>${field.label}${field.required ? ' <span>*</span>' : ''}</label>\n`;
            field.options.forEach(opt => {
                htmlCode += `    <div class="form-option">\n`;
                htmlCode += `      <input type="radio" id="field-${field.id}-${opt}" name="field-${field.id}" value="${opt}" ${field.required ? 'required' : ''}>\n`;
                htmlCode += `      <label for="field-${field.id}-${opt}">${opt}</label>\n`;
                htmlCode += `    </div>\n`;
            });
            htmlCode += `  </div>\n`;
        } else if (field.type === 'checkbox') {
            htmlCode += `  <div class="form-field">\n`;
            htmlCode += `    <label>${field.label}${field.required ? ' <span>*</span>' : ''}</label>\n`;
            field.options.forEach(opt => {
                htmlCode += `    <div class="form-option">\n`;
                htmlCode += `      <input type="checkbox" id="field-${field.id}-${opt}" name="field-${field.id}" value="${opt}">\n`;
                htmlCode += `      <label for="field-${field.id}-${opt}">${opt}</label>\n`;
                htmlCode += `    </div>\n`;
            });
            htmlCode += `  </div>\n`;
        } else {
            htmlCode += `  <div class="form-field">\n`;
            htmlCode += `    <label for="field-${field.id}">${field.label}${field.required ? ' <span>*</span>' : ''}</label>\n`;
            htmlCode += `    <input type="${field.type}" id="field-${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>\n`;
            htmlCode += `  </div>\n`;
        }
    });
    
    htmlCode += `  <button type="submit" class="form-submit-btn">Kirim</button>\n`;
    htmlCode += `</form>`;
    
    // Generate CSS
    const cssCode = `/* Form Styling */
form {
  max-width: 500px;
  margin: 0 auto;
}

form h3 {
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-field {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form-field label {
  margin-bottom: 8px;
  font-weight: 600;
}

.form-field label span {
  color: red;
}

.form-field input,
.form-field textarea,
.form-field select {
  padding: 10px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
}

.form-field input:focus,
.form-field textarea:focus,
.form-field select:focus {
  outline: none;
  border-color: #4361ee;
}

.form-option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-option input {
  margin-right: 8px;
  width: auto;
}

.form-option label {
  margin-bottom: 0;
  font-weight: normal;
}

.form-submit-btn {
  background: #4361ee;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-submit-btn:hover {
  background: #3a0ca3;
}`;
    
    // Generate JavaScript
    const jsCode = `// Simple form handling dengan fetch API (template)
const form = document.getElementById('${formId}');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Kumpulkan data form
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  try {
    // Kirim ke API endpoint (ubah URL sesuai kebutuhan)
    const response = await fetch('/api/form-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      alert('Form berhasil dikirim!');
      form.reset();
    } else {
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Terjadi kesalahan jaringan. Silakan coba lagi.');
  }
});`;
    
    htmlOutput.textContent = htmlCode;
    cssOutput.textContent = cssCode;
    jsOutput.textContent = jsCode;
}

// Copy function
function copyAllCode() {
    const html = htmlOutput.textContent;
    const css = cssOutput.textContent;
    const js = jsOutput.textContent;
    const fullCode = `<!-- HTML -->\n${html}\n\n<!-- CSS -->\n<style>\n${css}\n</style>\n\n<!-- JavaScript -->\n<script>\n${js}\n</script>`;
    
    copyToClipboard(fullCode, 'Semua kode');
}

function copyHTMLOnly() {
    const html = htmlOutput.textContent;
    copyToClipboard(html, 'Kode HTML');
}

function copyCSSOnly() {
    const css = cssOutput.textContent;
    copyToClipboard(css, 'Kode CSS');
}

function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = event.target;
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Disalin!';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        console.error('Gagal copy:', err);
        alert('Gagal menyalin kode. Silakan salin manual.');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderFieldEditors();
    updateFormPreview();
});