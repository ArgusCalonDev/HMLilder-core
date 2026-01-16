 // penting: di HTML, panggil file component.js dan data-component.js agar sinkron dan tidak error.


 // ===== VARIABLES =====
  let currentComponent = 'hero';
  const componentSelect = document.getElementById('component-select');
  const outputPanel = document.querySelector('.output-panel');
  
  // ===== INITIALIZE =====
  function initComponentGenerator() {
    console.log('🚀 Component Generator initialized');
    
    // Event listener untuk select
    componentSelect.addEventListener('change', function() {
      currentComponent = this.value;
      console.log('Component selected:', currentComponent);
      generateComponentCode();
    });
    
    // Generate komponen pertama kali
    generateComponentCode();
  }
  
  // ===== GENERATE CODE =====
  function generateComponentCode() {
    const component = components[currentComponent];
    
    if (!component) {
      console.error('Component not found:', currentComponent);
      return;
    }
    
    // Buat output HTML
    const outputHTML = `
      <h2 class="panel-title"><i class="fas fa-code"></i> ${component.name}</h2>
      <p style="color: #666; margin-bottom: 20px;">${component.description}</p>
      
      <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #4361ee;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h3 style="margin: 0; color: #2b2d42;">
            <i class="fas fa-cube"></i> Preview Komponen
          </h3>
          <small style="color: #6c757d;">${component.name}</small>
        </div>
        <div id="component-preview" style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: white; overflow: auto;">
          ${component.html}
        </div>
      </div>

      <div style="background: #1e1e1e; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
          <h3 style="margin: 0; color: #fff;">
            <i class="fas fa-file-code"></i> Kode HTML
          </h3>
          <button id="copyBtn" class="btn btn-primary" style="padding: 10px 20px; font-size: 0.9rem;">
            <i class="fas fa-copy"></i> Salin Kode
          </button>
        </div>
        <pre id="code-output" style="background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 5px; overflow: auto; font-family: 'Courier New', monospace; font-size: 14px; margin: 0; white-space: pre-wrap;">
${escapeHTML(component.html)}</pre>
      </div>
      
      <div style="background: #e3f2fd; border-radius: 10px; padding: 15px; border-left: 4px solid #2196f3;">
        <h4 style="margin: 0 0 10px 0; color: #0d47a1;">
          <i class="fas fa-lightbulb"></i> Cara Pakai
        </h4>
        <ol style="margin: 0; padding-left: 20px; color: #1565c0;">
          <li>Salin kode HTML di atas</li>
          <li>Tempel di file HTML Anda</li>
          <li>Customize sesuai kebutuhan</li>
          <li>Simpan dan lihat hasilnya!</li>
        </ol>
      </div>
    `;
    
    // Update output panel
    outputPanel.innerHTML = outputHTML;
    
    // Setup copy button
    setupCopyButton();
    
    console.log(`✅ ${component.name} code generated`);
  }
  
  // ===== HELPER FUNCTIONS =====
  function escapeHTML(html) {
    return html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  
  function setupCopyButton() {
    const copyBtn = document.getElementById('copyBtn');
    const codeOutput = document.getElementById('code-output');
    
    if (copyBtn && codeOutput) {
      copyBtn.addEventListener('click', function() {
        // Ambil teks dari pre element (tanpa HTML entities)
        const textToCopy = codeOutput.textContent;
        
        // Copy ke clipboard
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            // Feedback visual
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
            copyBtn.style.background = '#06d6a0';
            
            setTimeout(() => {
              copyBtn.innerHTML = originalHTML;
              copyBtn.style.background = '';
            }, 2000);
            
            console.log('✅ Code copied to clipboard');
          })
          .catch(err => {
            console.error('❌ Failed to copy:', err);
            alert('Gagal menyalin kode. Coba salin manual dari kotak kode.');
          });
      });
    }
  }

  function updateComponentDescription() {
    const component = components[currentComponent];
    const descElement = document.getElementById('component-description');
    
    if (descElement && component) {
        descElement.innerHTML = `
            <h4 style="margin-bottom: 10px; color: #4361ee;">${component.name}</h4>
            <p style="color: #666; margin: 0;">${component.description}</p>
        `;
    }
}

// Update init function
function initComponentGenerator() {
    console.log('🚀 Component Generator initialized');
    
    // Event listener untuk select
    componentSelect.addEventListener('change', function() {
        currentComponent = this.value;
        console.log('Component selected:', currentComponent);
        generateComponentCode();
        updateComponentDescription(); // ⬅️ TAMBAH INI
    });
    
    // Generate komponen pertama kali
    generateComponentCode();
    updateComponentDescription(); // ⬅️ TAMBAH INI
}