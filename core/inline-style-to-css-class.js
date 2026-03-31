// Konverter inline style HTML ke class CSS dan merapikan output
function convertInlineStyle() {
    const inputHtml = document.getElementById('inline-html-input').value;

    if (!inputHtml.trim()) {
        alert('Masukkan HTML dengan inline style terlebih dahulu.');
        return;
    }

    // Parsing HTML input
    const parser = new DOMParser();
    const doc = parser.parseFromString(inputHtml, 'text/html');

    const elemen = doc.body.firstElementChild;
    if (!elemen) {
        alert('Tidak ada elemen HTML valid dalam input.');
        return;
    }

    const inlineStyle = elemen.getAttribute('style');
    if (!inlineStyle) {
        alert('Elemen tidak memiliki atribut style.');
        return;
    }

    const namaClass = elemen.getAttribute('class') || 'generated';
    const classSelector = `.${namaClass}`;

    // Buat format CSS dari inline style
    const styleText = inlineStyle
        .split(';')
        .map(item => item.trim())
        .filter(item => item)
        .join('; ');

    const cssOutput = `${classSelector} { ${styleText} }`;

    // Update elemen HTML: hapus inline style, tetapkan class
    elemen.removeAttribute('style');
    elemen.setAttribute('class', namaClass);

    const outputHtml = elemen.outerHTML;

    // Render ke penampilan
    document.getElementById('html-output').textContent = outputHtml;
    document.getElementById('css-output').textContent = cssOutput;
    document.getElementById('preview-area').innerHTML = outputHtml;
}