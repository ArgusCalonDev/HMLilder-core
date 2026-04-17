// tanggal
const now = new Date();
const qs =
  now.getFullYear() +
  String(now.getMonth() + 1).padStart(2, "0") +
  String(now.getDate()).padStart(2, "0") +
  String(now.getHours()).padStart(2, "0") +
  String(now.getMinutes()).padStart(2, "0") +
  String(now.getSeconds()).padStart(2, "0");

// sidebar.js
fetch("sidebar.html?v=" + qs, { cache: "no-store" })
    .then(res => res.text())
    .then(html => {
        // 1. Inject sidebar HTML
        document.getElementById("sidebar-container").innerHTML = html;
        
        // 2. SETELAH HTML dimuat, baru setup dropdown
        setupDropdown();
    });

// Alternatif yang lebih clean
function setupDropdown() {
    document.querySelectorAll('.dropdown-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            
            // Close other open dropdowns
            document.querySelectorAll('.dropdown-btn.active').forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.classList.remove('active');
                    otherBtn.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            this.classList.toggle('active');
            const dropdownContent = this.nextElementSibling;
            dropdownContent.classList.toggle('active');
        });
    });
    
    // Close dropdown ketika klik di luar
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropdown-btn') && !e.target.closest('.dropdown-container')) {
            document.querySelectorAll('.dropdown-btn.active').forEach(btn => {
                btn.classList.remove('active');
                btn.nextElementSibling.classList.remove('active');
            });
        }
    });
}