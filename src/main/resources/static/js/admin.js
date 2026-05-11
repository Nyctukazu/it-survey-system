// ==========================================
// ADMIN PANEL LOGIC
// ==========================================

// --- Navigation & Login Logic ---
const loginView = document.getElementById('login-view');
const adminApp = document.getElementById('admin-app');
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');

const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const adminSections = document.querySelectorAll('.admin-section');

// Fake Login
btnLogin.addEventListener('click', () => {
    loginView.classList.add('hidden');
    adminApp.classList.remove('hidden');
    
    // IMPORTANT: Maps and Charts need to be "drawn" after the container becomes visible!
    setTimeout(() => {
        initCharts();
        initMap();
    }, 100);
});

// Logout
btnLogout.addEventListener('click', () => {
    adminApp.classList.add('hidden');
    loginView.classList.remove('hidden');
});

// Sidebar Navigation
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active class on sidebar
        sidebarLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        
        // Hide all sections, show the target one
        const targetId = e.target.getAttribute('data-target');
        adminSections.forEach(sec => sec.classList.add('hidden'));
        document.getElementById(targetId).classList.remove('hidden');
    });
});

// ==========================================
// GRAPHS & MAPS (Data Visualization)
// ==========================================

function initCharts() {
    // 1. Preparedness Pie Chart
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Prepared', 'Unprepared'],
            datasets: [{
                data: [75, 25],
                backgroundColor: ['#d9d9d9', '#f2f2f2'], // Light grays matching Figma
                borderWidth: 0
            }]
        },
        options: { responsive: true, cutout: '50%' } // Cutout makes it look like your Figma donut
    });

    // 2. Tourism Ratings Bar Chart
    const ctxBar = document.getElementById('barChart').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Loc 1', 'Loc 2', 'Loc 3'],
            datasets: [{
                label: 'Ratings',
                data: [12, 19, 8],
                backgroundColor: '#e6e6e6'
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true, display: false }, x: { display: false } },
            plugins: { legend: { display: false } }
        }
    });
}

function initMap() {
    // Initialize Leaflet Map centered on Taguig, Philippines
    const map = L.map('surveyMap').setView([14.5176, 121.0509], 12);

    // Load map tiles from OpenStreetMap (Free!)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Drop some fake survey pins!
    L.marker([14.53, 121.05]).addTo(map).bindPopup('Survey Taker: Juan D.');
    L.marker([14.51, 121.06]).addTo(map).bindPopup('Survey Taker: Maria C.');
    L.marker([14.50, 121.04]).addTo(map).bindPopup('Survey Taker: Leo K.');
}
