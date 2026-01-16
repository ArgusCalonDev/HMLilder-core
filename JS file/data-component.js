const components = {
  hero: {
    name: "Hero Section",
    html: `
<section class="hero" style="text-align: center; padding: 80px 20px; background: linear-gradient(135deg, #4361ee, #3a0ca3); color: white; border-radius: 15px;">
  <h1 style="font-size: 2.8rem; margin-bottom: 20px;">Judul Hero Anda</h1>
  <p style="font-size: 1.2rem; max-width: 600px; margin: 0 auto 30px;">Deskripsi hero section yang menarik perhatian pengunjung website.</p>
  <button style="background: white; color: #4361ee; border: none; padding: 15px 35px; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer;">Call to Action</button>
</section>`,
    description: "Bagian utama website untuk menarik perhatian pengunjung"
  },
  
  features: {
    name: "Features Section",
    html: `
<div class="features" style="padding: 60px 20px;">
  <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 40px; color: #2b2d42;">✨ Fitur Unggulan</h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px;">
    <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; border-left: 5px solid #4361ee;">
      <h3 style="color: #4361ee; margin-bottom: 10px;">🛠️ Fitur 1</h3>
      <p>Deskripsi singkat tentang fitur pertama yang menarik.</p>
    </div>
    <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; border-left: 5px solid #4361ee;">
      <h3 style="color: #4361ee; margin-bottom: 10px;">⚡ Fitur 2</h3>
      <p>Deskripsi singkat tentang fitur kedua yang bermanfaat.</p>
    </div>
    <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; border-left: 5px solid #4361ee;">
      <h3 style="color: #4361ee; margin-bottom: 10px;">🎯 Fitur 3</h3>
      <p>Deskripsi singkat tentang fitur ketiga yang istimewa.</p>
    </div>
  </div>
</div>`,
    description: "Menampilkan fitur-fitur produk/layanan"
  },
  
  pricing: {
    name: "Pricing Table",
    html: `
<div class="pricing" style="padding: 60px 20px; background: #f5f7fa;">
  <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 40px; color: #2b2d42;">💎 Pilihan Paket</h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; max-width: 1000px; margin: 0 auto;">
    <div style="background: white; padding: 35px; border-radius: 15px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
      <h3 style="color: #4361ee; margin-bottom: 15px;">Basic</h3>
      <div style="font-size: 2.5rem; font-weight: bold; color: #2b2d42; margin-bottom: 20px;">Rp 99k<span style="font-size: 1rem; color: #6c757d;">/bulan</span></div>
      <ul style="list-style: none; padding: 0; margin-bottom: 25px; text-align: left;">
        <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ Fitur dasar</li>
        <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ Support email</li>
        <li style="padding: 8px 0;">✓ 1GB storage</li>
      </ul>
      <button style="width: 100%; padding: 15px; background: #4361ee; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;">Pilih Paket</button>
    </div>
    
    <div style="background: white; padding: 35px; border-radius: 15px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 2px solid #4361ee; transform: scale(1.05);">
      <div style="background: #4361ee; color: white; padding: 5px 15px; border-radius: 20px; display: inline-block; margin-bottom: 15px; font-size: 0.9rem;">POPULER</div>
      <h3 style="color: #4361ee; margin-bottom: 15px;">Pro</h3>
      <div style="font-size: 2.5rem; font-weight: bold; color: #2b2d42; margin-bottom: 20px;">Rp 199k<span style="font-size: 1rem; color: #6c757d;">/bulan</span></div>
      <ul style="list-style: none; padding: 0; margin-bottom: 25px; text-align: left;">
        <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ Semua fitur Basic</li>
        <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ Support prioritas</li>
        <li style="padding: 8px 0; border-bottom: 1px solid #eee;">✓ 10GB storage</li>
        <li style="padding: 8px 0;">✓ Update gratis</li>
      </ul>
      <button style="width: 100%; padding: 15px; background: #4361ee; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer;">Pilih Paket</button>
    </div>
  </div>
</div>`,
    description: "Tabel harga/paket untuk bisnis"
  },
  
  testimonials: {
    name: "Testimonials",
    html: `
<div class="testimonials" style="padding: 60px 20px;">
  <h2 style="text-align: center; font-size: 2.2rem; margin-bottom: 40px; color: #2b2d42;">💬 Kata Pelanggan</h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; max-width: 1000px; margin: 0 auto;">
    <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; position: relative;">
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <div style="width: 60px; height: 60px; background: #4361ee; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; margin-right: 15px;">A</div>
        <div>
          <h4 style="margin: 0; color: #2b2d42;">Andi Wijaya</h4>
          <p style="margin: 5px 0 0; color: #6c757d; font-size: 0.9rem;">CEO Startup Tech</p>
        </div>
      </div>
      <p style="font-style: italic; color: #555;">"Produk ini benar-benar mengubah cara kerja tim kami. Sangat recommended!"</p>
      <div style="color: #ffd166; font-size: 1.2rem; margin-top: 15px;">★★★★★</div>
    </div>
    
    <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; position: relative;">
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <div style="width: 60px; height: 60px; background: #3a0ca3; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; margin-right: 15px;">S</div>
        <div>
          <h4 style="margin: 0; color: #2b2d42;">Sari Dewi</h4>
          <p style="margin: 5px 0 0; color: #6c757d; font-size: 0.9rem;">Digital Marketer</p>
        </div>
      </div>
      <p style="font-style: italic; color: #555;">"Hasilnya melebihi ekspektasi. Support timnya juga sangat responsif!"</p>
      <div style="color: #ffd166; font-size: 1.2rem; margin-top: 15px;">★★★★★</div>
    </div>
  </div>
</div>`,
    description: "Testimoni dari pelanggan/pengguna"
  },

  ctabar: {
    name: "Call to Action Bar",
    html: `
    <section style="padding:25px 20px; background:#0066ff; color:white; text-align:center;">
      <h2 style="margin-bottom:10px; font-size:26px;">Siap Lorem Ipsum Dolor Sit Amet?</h2>
      <a href="#order" style="padding:12px 24px; background:white; color:#0066ff; 
                         font-weight:700; border-radius:6px; text-decoration:none;">
      Pesan Sekarang
      </a>
    </section>`,
    description: "Bar ajakan bertindak untuk pengguna"
  },

  linkblock: {
    name: "Link Block",
    html: `
    <section style="padding:40px 20px; background:#f9f9f9;">
      <h3 style="margin-bottom:20px;">Navigasi Cepat</h3>
      <div style="display:flex; flex-direction:column; gap:12px;">

      <a href="#home" 
        style="padding:12px 16px; background:white; border-radius:8px; 
              text-decoration:none; color:#222; border:1px solid #eee;">
        Home
      </a>

      <a href="#pricing" 
        style="padding:12px 16px; background:white; border-radius:8px; 
              text-decoration:none; color:#222; border:1px solid #eee;">
        Harga
      </a>

      <a href="#contact" 
        style="padding:12px 16px; background:white; border-radius:8px; 
              text-decoration:none; color:#222; border:1px solid #eee;">
        Kontak
      </a>

    </div>
  </section>`,
    description: "Blok tautan navigasi cepat untuk website"
  },

  minifooter: {
    name: "Mini Footer",
    html: `
    <footer style="padding:20px; background:#111; color:#fff; text-align:center;">
      <h3 style="margin:0 0 10px; font-size:18px;">Lorem ipsum dolor.</h3>

      <p style="max-width:500px; margin:0 auto; font-size:14px; color:#ddd;">
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.
      </p>

      <p style="margin-top:12px; font-size:13px; color:#aaa;">
        © 2026 Lorem ipsum dolor.
      </p>
    </footer>`,
    description: "Footer kecil untuk bagian bawah halaman"
  },

  pricingcomparison: {
    name: "Pricing Comparison Table",
    html: `
    <section style="padding:40px 20px; background:#f7f9fc;">
  <h2 style="text-align:center; margin-bottom:20px; font-size:26px; font-weight:700;">
    Lorem ipsum dolor.
  </h2>

  <p style="max-width:600px; margin:0 auto 30px; text-align:center; color:#444;">
    Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.
  </p>

  <div style="display:flex; gap:20px; flex-wrap:wrap; justify-content:center;">

    <!-- Paket A -->
    <div style="flex:1; min-width:260px; max-width:320px; background:white; padding:25px; border-radius:12px; border:1px solid #ddd;">
      <h3 style="margin-top:0; font-size:20px; font-weight:700;">Lorem ipsum dolor.</h3>
      <p style="font-size:28px; font-weight:700; margin:10px 0;">Rp24.999</p>

      <ul style="list-style:none; padding:0; margin:0 0 20px; color:#444;">
        <li>• Lorem ipsum dolor.</li>
        <li>• Lorem ipsum dolor.</li>
        <li>• Lorem ipsum dolor.</li>
      </ul>

      <button style="width:100%; padding:10px; background:#0077ff; color:white; border:none; border-radius:8px; font-size:15px;">
        Pilih Paket
      </button>
    </div>

    <!-- Paket B -->
    <div style="flex:1; min-width:260px; max-width:320px; background:white; padding:25px; border-radius:12px; border:1px solid #ddd;">
      <h3 style="margin-top:0; font-size:20px; font-weight:700;">Lorem ipsum dolor.</h3>
      <p style="font-size:28px; font-weight:700; margin:10px 0;">Rp35.999</p>

      <ul style="list-style:none; padding:0; margin:0 0 20px; color:#444;">
        <li>• Lorem ipsum dolor.</li>
        <li>• Lorem ipsum dolor.</li>
        <li>• Lorem ipsum dolor.</li>
        <li>• Lorem ipsum dolor.</li>
      </ul>

      <button style="width:100%; padding:10px; background:#222; color:white; border:none; border-radius:8px; font-size:15px;">
        Pilih Paket
      </button>
    </div>

  </div>
</section>`,
    description: "Tabel perbandingan harga untuk berbagai paket"
  },

projectshowcase: {
    name: "Project Showcase",
    html: `
<section style="padding:40px;">
  <h2 style="text-align:center; font-size:24px; font-weight:700;">Lorem ipsum dolor.</h2>

  <div style="margin-top:25px; display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:20px;">
    <div style="border:1px solid #ddd; border-radius:12px; overflow:hidden;">
      <img src="https://via.placeholder.com/400x250" style="width:100%;">
      <div style="padding:15px;">
        <h3 style="margin:0 0 8px;">Lorem ipsum dolor.</h3>
        <p style="color:#555;">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
      </div>
    </div>

    <div style="border:1px solid #ddd; border-radius:12px; overflow:hidden;">
      <img src="https://via.placeholder.com/400x250" style="width:100%;">
      <div style="padding:15px;">
        <h3 style="margin:0 0 8px;">Lorem ipsum dolor.</h3>
        <p style="color:#555;">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
      </div>
    </div>
  </div>
</section>`,
    description: "Menampilkan proyek atau portofolio dengan gaya menarik"
  },

  achievements: {
    name: "Achievements Section",
    html: `
<section style="padding:40px;">
  <h2 style="text-align:center; font-size:24px; font-weight:700;">Lorem ipsum dolor.</h2>

  <div style="margin-top:25px; display:flex; flex-wrap:wrap; gap:20px; justify-content:center;">
    <div style="border:1px solid #ddd; padding:20px; border-radius:12px; width:260px;">
      <h3 style="margin:0 0 10px;">Lorem ipsum dolor.</h3>
      <p style="color:#555;">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
    </div>

    <div style="border:1px solid #ddd; padding:20px; border-radius:12px; width:260px;">
      <h3 style="margin:0 0 10px;">Lorem ipsum dolor.</h3>
      <p style="color:#555;">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
    </div>
  </div>
</section>`,
    description: "Menampilkan pencapaian atau penghargaan"
  },

  bioblock: {
    name: "Bio Block",
    html: `
<section style="padding:40px; max-width:600px; margin:auto; text-align:center;">
  <img src="https://via.placeholder.com/120" style="border-radius:50%; margin-bottom:20px;">
  <h1 style="margin:0 0 10px; font-size:28px; font-weight:700;">Lorem ipsum dolor.</h1>

  <p style="color:#444;">
    Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.
  </p>

  <div style="margin-top:20px; display:flex; justify-content:center; gap:15px;">
    <a href="#" style="text-decoration:none; color:#0077ff;">GitHub</a>
    <a href="#" style="text-decoration:none; color:#0077ff;">Instagram</a>
    <a href="#" style="text-decoration:none; color:#0077ff;">LinkedIn</a>
  </div>
</section>`,
    description: "Blok bio singkat dengan foto, deskripsi, dan tautan sosial"
  }
};