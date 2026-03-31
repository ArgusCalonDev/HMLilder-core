// Fungsi utama untuk memformat HTML
function formatHTML() {
    // Mengambil nilai dari textarea input
    const inputHTML = document.getElementById('html-input').value;
    
    if (!inputHTML.trim()) {
        alert('Masukkan kode HTML terlebih dahulu!');
        return;
    }
    
    try {
        // Parsing HTML menggunakan DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(inputHTML, 'text/html');
        
        // Membersihkan HTML dan membuatnya rapi
        const formattedHTML = formatHTMLElement(doc.documentElement, 0);
        
        // Menampilkan hasil di preview area
        document.getElementById('preview-area').innerHTML = formattedHTML;
        
        // Menampilkan kode HTML yang telah dirapihkan
        document.getElementById('html-output').textContent = formattedHTML;
        
    } catch (error) {
        alert('Terjadi kesalahan dalam memproses HTML: ' + error.message);
    }
}

// Fungsi untuk memformat elemen HTML dengan indentasi
function formatHTMLElement(element, indentLevel) {
    // Membuat indentasi berdasarkan level
    const indent = '  '.repeat(indentLevel);
    
    // Jika elemen adalah teks saja
    if (element.nodeType === Node.TEXT_NODE) {
        const text = element.textContent.trim();
        return text ? indent + text + '\n' : '';
    }
    
    // Jika bukan elemen, lewati
    if (element.nodeType !== Node.ELEMENT_NODE) {
        return '';
    }
    
    let result = indent + '<' + element.tagName.toLowerCase();
    
    // Menambahkan atribut
    for (let attr of element.attributes) {
        result += ' ' + attr.name + '="' + attr.value + '"';
    }
    
    // Jika elemen kosong (self-closing)
    if (element.childNodes.length === 0 && !isVoidElement(element.tagName)) {
        result += '></' + element.tagName.toLowerCase() + '>\n';
        return result;
    }
    
    result += '>\n';
    
    // Memproses anak-anak elemen
    let hasContent = false;
    for (let child of element.childNodes) {
        const formattedChild = formatHTMLElement(child, indentLevel + 1);
        if (formattedChild.trim()) {
            result += formattedChild;
            hasContent = true;
        }
    }
    
    // Menutup tag
    if (hasContent || element.childNodes.length > 0) {
        result += indent + '</' + element.tagName.toLowerCase() + '>\n';
    } else {
        // Untuk elemen kosong, ubah menjadi self-closing
        result = indent + '<' + element.tagName.toLowerCase();
        for (let attr of element.attributes) {
            result += ' ' + attr.name + '="' + attr.value + '"';
        }
        result += ' />\n';
    }
    
    return result;
}

// Fungsi untuk mengecek apakah elemen adalah void element (tidak memiliki closing tag)
function isVoidElement(tagName) {
    const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    return voidElements.includes(tagName.toLowerCase());
}