document.addEventListener("DOMContentLoaded", function () {
    // Inisialisasi peta dengan posisi awal di wilayah tertentu
    const initialCoordinates = [-6.3921, 106.7902];
    const initialZoom = 12;
    const map = L.map('map').setView(initialCoordinates, initialZoom);

    // Tambahkan pilihan layer peta
    const standardLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const grayscaleLayer = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    });

    const satelliteLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenTopoMap contributors'
    });

    // Tambahkan kontrol untuk memilih layer
    const baseMaps = {
        "Standar": standardLayer,
        "Grayscale": grayscaleLayer,
        "Satelit": satelliteLayer
    };
    L.control.layers(baseMaps).addTo(map);

    // Tambahkan marker lokasi utama
    const mainMarker = L.marker(initialCoordinates)
        .addTo(map)
        .bindPopup("📍 Wilayah Utama").openPopup();

    // Fungsi untuk mendapatkan lokasi pengguna
    function getLocation() {
        if (!navigator.geolocation) {
            alert("Geolocation tidak didukung di browser ini.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userCoords = [position.coords.latitude, position.coords.longitude];

                // Tambahkan ikon khusus untuk lokasi pengguna
                const userIcon = L.icon({
                    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                    iconSize: [35, 35],
                    iconAnchor: [17, 35]
                });

                L.marker(userCoords, { icon: userIcon })
                    .addTo(map)
                    .bindPopup("📍 Lokasi Anda").openPopup();

                // Fokuskan peta ke lokasi pengguna
                map.setView(userCoords, 15);
            },
            (error) => {
                alert("Gagal mendapatkan lokasi: " + error.message);
            }
        );
    }

    // Fungsi untuk navigasi antar-seksi
    function showSection(sectionId) {
        document.querySelectorAll("section").forEach(section => {
            section.style.display = section.id === sectionId ? "block" : "none";
        });
    }

    // Validasi form kontak
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Harap isi semua kolom!");
                return;
            }
            alert("Pesan berhasil dikirim!");
            contactForm.reset();
        });
    }

    // Hubungkan fungsi ke tombol di HTML
    window.getLocation = getLocation;
    window.showSection = showSection;
});