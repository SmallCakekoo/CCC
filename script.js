// Global variables for charts and map
let ch4Chart, n2oChart, researchMap;
let sensorData = {
  temperature: 28,
  humidity: 75,
  waterLevel: "Óptimo",
  lastReading: "Hace 5 min",
};

// Navigation Functions
function goToConsumerMode() {
  window.location.href = "consumidor-modo.html";
}

function goToCommunity() {
  window.location.href = "comunidad.html";
}

function goToGamification() {
  window.location.href = "gamificacion.html";
}

function goToRegistration() {
  window.location.href = "registro.html";
}

function goToQRScanner() {
  window.location.href = "escaner-qr.html";
}

function goToProducerMode() {
  window.location.href = "login-agricultor.html";
}

// Mobile Menu Toggle
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      document.getElementById("navLinks").classList.remove("active");
    }
  });
});

// Initialize Interactive Research Map
function initializeResearchMap() {
  // Initialize map centered on Colombia
  researchMap = L.map("researchMap").setView([4.6097, -74.0817], 6);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(researchMap);

  // Research project data
  const projects = [
    {
      name: "FEDEARROZ 2000 - Valle del Cauca",
      type: "arroz",
      lat: 3.4516,
      lng: -76.532,
      description:
        "Desarrollo de variedad de arroz bajo en metano. Reducción del 35% en emisiones CH₄.",
      status: "Certificada",
      participants: 15,
      startDate: "2022",
    },
    {
      name: "Forraje Verde Smart - Meta",
      type: "forrajes",
      lat: 4.142,
      lng: -73.6268,
      description:
        "Forraje mejorado para ganadería sostenible. Reduce emisiones de metano en rumiantes.",
      status: "En Prueba",
      participants: 8,
      startDate: "2023",
    },
    {
      name: "Arroz Clima Plus - Tolima",
      type: "arroz",
      lat: 4.4389,
      lng: -75.2322,
      description:
        "Variedad experimental con potencial de reducción del 42% en emisiones.",
      status: "Experimental",
      participants: 12,
      startDate: "2023",
    },
    {
      name: "Sistema Mixto Sostenible - Cundinamarca",
      type: "mixto",
      lat: 4.711,
      lng: -74.0721,
      description:
        "Integración de arroz y ganadería con prácticas regenerativas.",
      status: "Piloto",
      participants: 20,
      startDate: "2024",
    },
    {
      name: "Café Carbono Consciente - Quindío",
      type: "mixto",
      lat: 4.531,
      lng: -75.6811,
      description: "Cultivo de café con técnicas de captura de carbono.",
      status: "Certificada",
      participants: 25,
      startDate: "2021",
    },
    {
      name: "Maíz Bajo Emisiones - Santander",
      type: "arroz",
      lat: 7.1193,
      lng: -73.1227,
      description:
        "Desarrollo de variedades de maíz con menor huella de carbono.",
      status: "En Prueba",
      participants: 18,
      startDate: "2023",
    },
  ];

  // Add markers for each project
  projects.forEach((project) => {
    const color =
      project.type === "arroz"
        ? "#e74c3c"
        : project.type === "forrajes"
        ? "#3498db"
        : "#2ecc71";

    const marker = L.circleMarker([project.lat, project.lng], {
      radius: 15,
      fillColor: color,
      color: "#fff",
      weight: 3,
      opacity: 1,
      fillOpacity: 0.8,
    }).addTo(researchMap);

    // Create popup content
    const popupContent = `
            <div style="min-width: 250px;">
              <h4 style="color: var(--primary); margin-bottom: 0.5rem;">${
                project.name
              }</h4>
              <p style="color: #666; margin-bottom: 1rem;">${
                project.description
              }</p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.9rem;">
                <div><strong>Estado:</strong> ${project.status}</div>
                <div><strong>Participantes:</strong> ${
                  project.participants
                }</div>
                <div><strong>Inicio:</strong> ${project.startDate}</div>
                <div><strong>Tipo:</strong> ${
                  project.type.charAt(0).toUpperCase() + project.type.slice(1)
                }</div>
              </div>
              <button class="btn btn-primary" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="showProjectDetails('${
                project.name
              }')">
                Ver Detalles
              </button>
            </div>
          `;

    marker.bindPopup(popupContent);
  });

  // Add legend
  const legend = L.control({ position: "bottomright" });
  legend.onAdd = function (map) {
    const div = L.DomUtil.create("div", "map-legend");
    div.style.cssText =
      "background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);";
    div.innerHTML = `
            <h4 style="margin-bottom: 0.5rem; color: var(--primary);">Proyectos</h4>
            <div style="display: flex; align-items: center; margin-bottom: 0.3rem;">
              <div style="width: 15px; height: 15px; background: #e74c3c; border-radius: 50%; margin-right: 0.5rem;"></div>
              <span style="font-size: 0.9rem;">Arroz</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 0.3rem;">
              <div style="width: 15px; height: 15px; background: #3498db; border-radius: 50%; margin-right: 0.5rem;"></div>
              <span style="font-size: 0.9rem;">Forrajes</span>
            </div>
            <div style="display: flex; align-items: center;">
              <div style="width: 15px; height: 15px; background: #2ecc71; border-radius: 50%; margin-right: 0.5rem;"></div>
              <span style="font-size: 0.9rem;">Mixtos</span>
            </div>
          `;
    return div;
  };
  legend.addTo(researchMap);
}

// Show Project Details Modal
function showProjectDetails(projectName) {
  const projectDetails = {
    "FEDEARROZ 2000 - Valle del Cauca": {
      title: "FEDEARROZ 2000 - Valle del Cauca",
      content: `
              <h4>Objetivos del Proyecto</h4>
              <ul>
                <li>Desarrollar variedades de arroz con menor emisión de metano</li>
                <li>Mantener o mejorar el rendimiento productivo</li>
                <li>Validar prácticas de manejo sostenible</li>
              </ul>
              <h4>Resultados Alcanzados</h4>
              <ul>
                <li>35% de reducción en emisiones de CH₄</li>
                <li>12% de incremento en rendimiento</li>
                <li>Certificación obtenida en 2024</li>
              </ul>
              <h4>Próximos Pasos</h4>
              <ul>
                <li>Expansión a otras regiones arroceras</li>
                <li>Capacitación de productores</li>
                <li>Desarrollo de nuevas variedades</li>
              </ul>
            `,
    },
  };

  const project = projectDetails[projectName] || {
    title: projectName,
    content: `
            <h4>Información del Proyecto</h4>
            <p>Este proyecto forma parte de la iniciativa nacional de agricultura carbono consciente.</p>
            <h4>Contacto</h4>
            <p>Para más información sobre este proyecto, contacta a nuestro equipo de investigación.</p>
          `,
  };

  showModal(project.title, project.content);
}

// Initialize Charts
function initializeCharts() {
  // CH4 Chart
  const ch4Ctx = document.getElementById("ch4Chart").getContext("2d");
  ch4Chart = new Chart(ch4Ctx, {
    type: "line",
    data: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [
        {
          label: "CH₄ (kg/ha)",
          data: [320, 280, 250, 220, 200, 180],
          borderColor: "#73a04e",
          backgroundColor: "rgba(115, 160, 78, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0,0,0,0.1)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });

  // N2O Chart
  const n2oCtx = document.getElementById("n2oChart").getContext("2d");
  n2oChart = new Chart(n2oCtx, {
    type: "bar",
    data: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [
        {
          label: "N₂O (kg/ha)",
          data: [18, 16, 14, 12, 10, 8],
          backgroundColor: "#d2dc8f",
          borderColor: "#73a04e",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0,0,0,0.1)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

// Simulate Real-time Sensor Data
function updateSensorData() {
  // Simulate temperature variation
  sensorData.temperature = 25 + Math.random() * 8;

  // Simulate humidity variation
  sensorData.humidity = 70 + Math.random() * 15;

  // Simulate water level
  const levels = ["Bajo", "Óptimo", "Alto"];
  sensorData.waterLevel = levels[Math.floor(Math.random() * levels.length)];

  // Update last reading time
  sensorData.lastReading = "Hace " + Math.floor(Math.random() * 10) + " min";

  // Update DOM
  updateSensorDisplay();
}

// Update Sensor Display
function updateSensorDisplay() {
  const tempElement = document.querySelector(".metric-value");
  if (tempElement) {
    tempElement.textContent = sensorData.temperature.toFixed(1) + "°C";
  }

  // Update all sensor metrics
  const metrics = document.querySelectorAll(
    ".dashboard-card:nth-child(3) .metric"
  );
  if (metrics.length >= 4) {
    metrics[0].querySelector(".metric-value").textContent =
      sensorData.temperature.toFixed(1) + "°C";
    metrics[1].querySelector(".metric-value").textContent =
      sensorData.humidity.toFixed(0) + "%";
    metrics[2].querySelector(".metric-value").textContent =
      sensorData.waterLevel;
    metrics[3].querySelector(".metric-value").textContent =
      sensorData.lastReading;
  }
}

// Generate AI Recommendations
function generateAIRecommendations() {
  const recommendations = [
    {
      icon: "fas fa-lightbulb",
      title: "Optimización de Riego",
      message:
        "Reducir los días de anegamiento en 3 días puede disminuir tus emisiones de CH₄ en un 20%. Tu lote #4 presenta condiciones óptimas para implementar esta práctica.",
      priority: "high",
    },
    {
      icon: "fas fa-seedling",
      title: "Rotación de Cultivos",
      message:
        "Implementar rotación con leguminosas puede mejorar la fertilidad del suelo y reducir la necesidad de fertilizantes nitrogenados.",
      priority: "medium",
    },
    {
      icon: "fas fa-leaf",
      title: "Cobertura Vegetal",
      message:
        "Mantener cobertura vegetal durante el período de barbecho puede reducir emisiones de N₂O en un 15%.",
      priority: "medium",
    },
    {
      icon: "fas fa-tint",
      title: "Gestión de Agua",
      message:
        "Los niveles de agua están óptimos. Considera implementar riego por goteo para mayor eficiencia.",
      priority: "low",
    },
  ];

  return recommendations[Math.floor(Math.random() * recommendations.length)];
}

// Update AI Recommendation Display
function updateAIRecommendation() {
  const recommendation = generateAIRecommendations();
  const alertBox = document.querySelector(".alert-box");
  if (alertBox) {
    alertBox.innerHTML = `
            <h4><i class="${recommendation.icon}"></i> Recomendación IA</h4>
            <p><strong>${recommendation.title}:</strong> ${
      recommendation.message
    }</p>
            <div class="recommendation-priority priority-${
              recommendation.priority
            }">
              Prioridad: ${
                recommendation.priority === "high"
                  ? "Alta"
                  : recommendation.priority === "medium"
                  ? "Media"
                  : "Baja"
              }
            </div>
          `;
  }
}

// Impact Calculator
function calculateImpact() {
  const product = document.getElementById("productSelect").value;
  const quantity = parseInt(document.getElementById("quantityInput").value);

  // Valores de ejemplo de CO2 ahorrado por producto
  const savings = {
    "Arroz Carbono Consciente (1 kg)": 1.2,
    "Leche Carbono Consciente (1 litro)": 0.8,
    "Carne Carbono Consciente (1 kg)": 5.5,
    "Café Carbono Consciente (500g)": 0.6,
  };

  const totalSavings = (savings[product] || 1) * quantity;
  const trees = Math.round(totalSavings / 20); // Un árbol absorbe ~20kg CO2/año

  document.getElementById("resultValue").textContent =
    totalSavings.toFixed(1) + " kg CO₂";
  document.getElementById("trees").textContent = trees;
  document.getElementById("result").style.display = "block";
}

// Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease-out forwards";
    }
  });
}, observerOptions);

document
  .querySelectorAll(
    ".dashboard-card, .research-card, .testimonial-card, .cert-step"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Header scroll effect
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
  } else {
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
  }

  lastScroll = currentScroll;
});

// Load random avatars from randomuser.me API
async function loadRandomAvatars() {
  try {
    // Load avatars for testimonials in index.html
    const testimonialAvatars = document.querySelectorAll(
      ".testimonial-card .author-avatar"
    );
    for (let i = 0; i < testimonialAvatars.length; i++) {
      const response = await fetch("https://randomuser.me/api/?gender=female");
      const data = await response.json();
      const avatarUrl = data.results[0].picture.medium;

      testimonialAvatars[
        i
      ].innerHTML = `<img src="${avatarUrl}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    }

    // Load avatars for community posts in comunidad.html
    const communityAvatars = document.querySelectorAll(
      ".forum-post .author-avatar, .contributor-item .contributor-avatar"
    );
    for (let i = 0; i < communityAvatars.length; i++) {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const avatarUrl = data.results[0].picture.medium;

      communityAvatars[
        i
      ].innerHTML = `<img src="${avatarUrl}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
    }
  } catch (error) {
    console.log("Error loading avatars:", error);
    // Fallback to default icons if API fails
  }
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Initialize charts
  initializeCharts();

  // Initialize research map
  initializeResearchMap();

  // Load random avatars
  loadRandomAvatars();

  // Update sensor data every 30 seconds
  setInterval(updateSensorData, 30000);

  // Update AI recommendations every 2 minutes
  setInterval(updateAIRecommendation, 120000);

  // Initial updates
  updateSensorData();
  updateAIRecommendation();

  // Add QR Scanner functionality
  initializeQRScanner();

  // Add gamification system
  initializeGamification();

  // Add export buttons
  addExportButtons();
});

// QR Scanner Functionality
function initializeQRScanner() {
  // Add QR scanner button to consumer section
  const consumerSection = document.getElementById("consumidor");
  if (consumerSection) {
    const qrScannerHTML = `
            <div style="background: white; padding: 3rem; border-radius: 20px; box-shadow: 0 5px 30px rgba(0, 0, 0, 0.08); margin-bottom: 3rem;">
              <h3 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">
                <i class="fas fa-qrcode"></i> Escáner de Productos Certificados
              </h3>
              <div style="text-align: center;">
                <div id="qr-reader" style="width: 300px; margin: 0 auto;"></div>
                <button class="btn btn-primary" onclick="startQRScanner()" style="margin-top: 1rem;">
                  <i class="fas fa-camera"></i> Escanear QR
                </button>
                <div id="qr-result" style="margin-top: 1rem; padding: 1rem; background: #f0f8f0; border-radius: 10px; display: none;">
                  <h4 style="color: var(--primary);">Producto Encontrado</h4>
                  <p id="product-info"></p>
                </div>
              </div>
            </div>
          `;
    consumerSection.insertAdjacentHTML("afterbegin", qrScannerHTML);
  }
}

// Start QR Scanner
function startQRScanner() {
  const resultDiv = document.getElementById("qr-result");
  const productInfo = document.getElementById("product-info");

  // Simulate QR scan result
  setTimeout(() => {
    resultDiv.style.display = "block";
    productInfo.innerHTML = `
            <strong>Arroz Carbono Consciente - Finca La Esperanza</strong><br>
            📍 Ubicación: Jamundí, Valle del Cauca<br>
            🌱 Prácticas: Riego optimizado, rotación de cultivos<br>
            📊 Emisiones evitadas: 35% menos que promedio<br>
            👨‍🌾 Productor: Carlos Mendoza<br>
            ✅ Certificado desde: Enero 2024
          `;
  }, 2000);
}

// Gamification System
function initializeGamification() {
  // Add progress bars and achievement system
  const gamificationSection = document.querySelector(".gamification");
  if (gamificationSection) {
    const progressHTML = `
            <div style="background: rgba(255, 255, 255, 0.1); padding: 2rem; border-radius: 20px; margin-top: 2rem;">
              <h3 style="color: white; text-align: center; margin-bottom: 1.5rem;">
                <i class="fas fa-trophy"></i> Tu Progreso
              </h3>
              <div class="progress-item">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span>Reducción de Emisiones</span>
                  <span>75%</span>
                </div>
                <div style="background: rgba(255, 255, 255, 0.2); height: 10px; border-radius: 5px;">
                  <div style="background: var(--highlight); height: 100%; width: 75%; border-radius: 5px;"></div>
                </div>
              </div>
              <div class="progress-item" style="margin-top: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span>Prácticas Sostenibles</span>
                  <span>8/10</span>
                </div>
                <div style="background: rgba(255, 255, 255, 0.2); height: 10px; border-radius: 5px;">
                  <div style="background: var(--highlight); height: 100%; width: 80%; border-radius: 5px;"></div>
                </div>
              </div>
            </div>
          `;
    gamificationSection.insertAdjacentHTML("beforeend", progressHTML);
  }
}

// Variety Information Functions
function downloadVarietyInfo(varietyId) {
  const varietyData = {
    fedearroz2000: {
      name: "FEDEARROZ 2000",
      file: "Ficha_Tecnica_FEDEARROZ_2000.pdf",
      content:
        "Ficha técnica completa con especificaciones, rendimiento y prácticas recomendadas.",
    },
    climaplus: {
      name: "ARROZ CLIMA PLUS",
      file: "Ficha_Tecnica_Clima_Plus.pdf",
      content:
        "Documento experimental con resultados preliminares y protocolos de prueba.",
    },
    forrajesmart: {
      name: "FORRAJE VERDE SMART",
      file: "Ficha_Tecnica_Forraje_Smart.pdf",
      content:
        "Especificaciones técnicas para implementación en sistemas ganaderos.",
    },
  };

  const variety = varietyData[varietyId];
  if (variety) {
    // Simulate download
    const link = document.createElement("a");
    link.href = "#"; // In real implementation, this would be the actual PDF URL
    link.download = variety.file;
    link.click();

    // Show success message
    showNotification(`Descargando ${variety.file}...`, "success");
  }
}

function showVarietyDetails(varietyId) {
  const varietyDetails = {
    fedearroz2000: {
      name: "FEDEARROZ 2000",
      details: `
              <h4>Características Técnicas</h4>
              <ul>
                <li><strong>Ciclo:</strong> 120-130 días</li>
                <li><strong>Altura:</strong> 95-105 cm</li>
                <li><strong>Resistencia:</strong> Blast, virus de la hoja blanca</li>
                <li><strong>Rendimiento:</strong> 6-8 ton/ha</li>
                <li><strong>Reducción CH₄:</strong> 35% vs. variedades convencionales</li>
              </ul>
              <h4>Prácticas Recomendadas</h4>
              <ul>
                <li>Riego intermitente cada 7-10 días</li>
                <li>Fertilización balanceada con énfasis en potasio</li>
                <li>Manejo integrado de plagas</li>
                <li>Rotación con leguminosas</li>
              </ul>
            `,
    },
    climaplus: {
      name: "ARROZ CLIMA PLUS",
      details: `
              <h4>Estado Experimental</h4>
              <ul>
                <li><strong>Fase:</strong> Pruebas de campo (Año 2)</li>
                <li><strong>Ubicaciones:</strong> Valle del Cauca, Tolima, Meta</li>
                <li><strong>Reducción CH₄:</strong> 42% (datos preliminares)</li>
                <li><strong>Rendimiento:</strong> 5.5-7 ton/ha</li>
              </ul>
              <h4>Próximos Pasos</h4>
              <ul>
                <li>Validación en diferentes condiciones climáticas</li>
                <li>Análisis de estabilidad genética</li>
                <li>Evaluación económica</li>
                <li>Certificación prevista para 2026</li>
              </ul>
            `,
    },
    forrajesmart: {
      name: "FORRAJE VERDE SMART",
      details: `
              <h4>Especificaciones Ganaderas</h4>
              <ul>
                <li><strong>Proteína:</strong> 18-22%</li>
                <li><strong>Digestibilidad:</strong> 75-80%</li>
                <li><strong>Reducción CH₄:</strong> 28% en rumiantes</li>
                <li><strong>Crecimiento:</strong> 45-60 días para corte</li>
              </ul>
              <h4>Implementación</h4>
              <ul>
                <li>Siembra directa o trasplante</li>
                <li>Riego moderado (no requiere anegamiento)</li>
                <li>Corte rotativo cada 45 días</li>
                <li>Complemento ideal con pastos tradicionales</li>
              </ul>
            `,
    },
  };

  const variety = varietyDetails[varietyId];
  if (variety) {
    showModal(variety.name, variety.details);
  }
}

// Modal Functions
function showModal(title, content) {
  const modalHTML = `
          <div id="varietyModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; border-radius: 20px; padding: 2rem; max-width: 600px; max-height: 80vh; overflow-y: auto; margin: 2rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="color: var(--primary); margin: 0;">${title}</h3>
                <button onclick="closeModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">&times;</button>
              </div>
              <div style="color: #666; line-height: 1.6;">
                ${content}
              </div>
              <div style="text-align: center; margin-top: 2rem;">
                <button class="btn btn-primary" onclick="closeModal()">Cerrar</button>
              </div>
            </div>
          </div>
        `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function closeModal() {
  const modal = document.getElementById("varietyModal");
  if (modal) {
    modal.remove();
  }
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
          position: fixed;
          top: 100px;
          right: 20px;
          background: ${
            type === "success"
              ? "#4caf50"
              : type === "error"
              ? "#f44336"
              : "#2196f3"
          };
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
          z-index: 10001;
          animation: slideInRight 0.3s ease-out;
        `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Blockchain Verification
function verifyBlockchainProduct() {
  const resultDiv = document.getElementById("blockchain-result");
  const infoDiv = document.getElementById("blockchain-info");

  if (resultDiv && infoDiv) {
    // Simulate blockchain verification
    setTimeout(() => {
      resultDiv.style.display = "block";
      infoDiv.innerHTML = `
              <strong>Hash Blockchain:</strong> 0x7a8b9c2d3e4f5a6b7c8d9...<br>
              <strong>Finca:</strong> La Esperanza - Jamundí, Valle del Cauca<br>
              <strong>Productor:</strong> Carlos Mendoza<br>
              <strong>Fecha de Registro:</strong> 15 de Enero, 2024<br>
              <strong>Certificación:</strong> Verificada<br>
              <strong>Emisiones:</strong> 35% menos que promedio regional<br>
              <strong>Prácticas:</strong> Riego optimizado, rotación de cultivos, cobertura vegetal
            `;
    }, 1500);
  }
}

// Producer Registration Form
function submitProducerRegistration(event) {
  event.preventDefault();

  const formData = {
    producerName: document.getElementById("producerName").value,
    farmName: document.getElementById("farmName").value,
    location: document.getElementById("location").value,
    farmSize: document.getElementById("farmSize").value,
    cropType: document.getElementById("cropType").value,
    experience: document.getElementById("experience").value,
    currentPractices: document.getElementById("currentPractices").value,
    sustainabilityGoals: document.getElementById("sustainabilityGoals").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };

  // Simulate form submission
  showNotification(
    "Registro enviado exitosamente. Te contactaremos pronto.",
    "success"
  );

  // Reset form
  document.getElementById("producerRegistrationForm").reset();

  // Simulate processing
  setTimeout(() => {
    showNotification(
      "Tu solicitud está siendo procesada. Recibirás un email de confirmación.",
      "info"
    );
  }, 2000);
}

// Export Reports Functionality
function exportReport(type) {
  const reportData = {
    pdf: {
      filename:
        "Reporte_Emisiones_" + new Date().toISOString().split("T")[0] + ".pdf",
      content:
        "Generando reporte PDF con datos de emisiones y recomendaciones...",
    },
    excel: {
      filename:
        "Datos_Sensores_" + new Date().toISOString().split("T")[0] + ".xlsx",
      content: "Exportando datos de sensores a Excel...",
    },
  };

  const report = reportData[type];
  if (report) {
    showNotification(report.content, "success");

    // Simulate download
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "#";
      link.download = report.filename;
      link.click();
      showNotification(`Archivo ${report.filename} descargado`, "success");
    }, 2000);
  }
}

// Add Export Buttons to Dashboard
function addExportButtons() {
  const dashboardCards = document.querySelectorAll(".dashboard-card");
  dashboardCards.forEach((card) => {
    const title = card.querySelector("h3");
    if (title && title.textContent.includes("Emisiones")) {
      const exportDiv = document.createElement("div");
      exportDiv.style.cssText = "margin-top: 1rem; display: flex; gap: 0.5rem;";
      exportDiv.innerHTML = `
              <button class="export-btn" onclick="exportReport('pdf')" style="flex: 1;">
                <i style="color: var(--light);" class="fas fa-file-pdf"></i> PDF
              </button>
              <button class="export-btn" onclick="exportReport('excel')" style="flex: 1;">
                <i style="color: var(--light);" class="fas fa-file-excel"></i> Excel
              </button>
            `;
      card.appendChild(exportDiv);
    }
  });
}
