// Fungsi helper untuk normalisasi text ke class name bersih
function buatNamaClassDasar(teks) {
    const singkat = teks.trim().toLowerCase();
    return singkat
        .replace(/[^a-z0-9\s_-]/g, '') // hapus karakter ilegal
        .replace(/[\s_-]+/g, '-')      // spasi/dash/underscore jadi '-'
        .replace(/^-+|-+$/g, '');      // hapus '-' di awal/akhir
}

// Fungsi utama untuk generate nama class
function generateClassNames() {
    const komponenInput = document.getElementById('component-type').value;
    const modifierInput = document.getElementById('modifier-name').value;

    if (!komponenInput.trim()) {
        alert('Masukkan jenis komponen terlebih dahulu.');
        return;
    }

    const komponen = buatNamaClassDasar(komponenInput);
    const modifier = buatNamaClassDasar(modifierInput);

    const bemBase = komponen;
    const bemElement = `${bemBase}__title`;
    const bemModifier = modifier ? `${bemBase}--${modifier}` : `${bemBase}--active`;

    const utilityBase = `${komponen}`;
    const utilityBackground = `bg-${modifier || 'primary'}`;
    const utilityText = `text-${modifier || 'dark'}`;
    const utilitySpacing = `p-4 m-2`;

    const bemHasil = [
        `.${bemBase}`,
        `.${bemElement}`,
        `.${bemModifier}`
    ].join('\n');

    const utilityHasil = [
        `.${utilityBase}`,
        `.${utilityBackground}`,
        `.${utilityText}`,
        `.${utilitySpacing.split(' ').join(', .')}`
    ].join('\n');

    document.getElementById('bem-output').textContent = bemHasil;
    document.getElementById('utility-output').textContent = utilityHasil;
    document.getElementById('class-names-list').innerHTML = `
        <p><strong>BEM:</strong> ${bemBase}, ${bemElement}, ${bemModifier}</p>
        <p><strong>Utility:</strong> ${utilityBase}, ${utilityBackground}, ${utilityText}, ${utilitySpacing}</p>
    `;
}
