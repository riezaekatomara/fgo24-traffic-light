// Kelas utama untuk mengatur lampu lalu lintas pintar
class SmartTrafficLight {
  constructor() {
    // Mengambil elemen lampu dari HTML
    this.redLight = document.getElementById("redLight");
    this.yellowLight = document.getElementById("yellowLight");
    this.greenLight = document.getElementById("greenLight");

    // Mengambil elemen tampilan informasi
    this.statusText = document.getElementById("status");
    this.timerText = document.getElementById("timer");
    this.trafficContainer = document.getElementById("trafficContainer");
    this.modeIndicator = document.getElementById("modeIndicator");

    // Mengambil elemen tombol kontrol
    this.startBtn = document.getElementById("startBtn");
    this.stopBtn = document.getElementById("stopBtn");
    this.resetBtn = document.getElementById("resetBtn");
    this.manualBtn = document.getElementById("manualBtn");

    // Mengambil elemen statistik
    this.cycleCountEl = document.getElementById("cycleCount");
    this.totalTimeEl = document.getElementById("totalTime");
    this.currentPhaseEl = document.getElementById("currentPhase");

    // Variabel untuk mengatur status lampu lalu lintas
    this.isRunning = false;
    this.isManualMode = false;
    this.currentTimer = 0;
    this.cycleCount = 0;
    this.totalRunTime = 0;
    this.currentPhase = "Siap";
    this.startTime = null;

    // Pengaturan fase lampu lalu lintas
    this.phases = [
      { name: "Berhenti", light: "red", duration: 5000, emoji: "🔴" },
      { name: "Bersiap", light: "yellow", duration: 2000, emoji: "🟡" },
      { name: "Jalan", light: "green", duration: 5000, emoji: "🟢" },
      { name: "Hati-hati", light: "yellow", duration: 2000, emoji: "🟡" },
    ];

    // Menjalankan fungsi inisialisasi
    this.initEventListeners();
    this.updateDisplay();
    this.startRealTimeTimer();
  }

  // Mengatur semua event listener (pendengar kejadian)
  initEventListeners() {
    // Event listener untuk tombol-tombol
    this.startBtn.addEventListener("click", () => this.startTrafficLight());
    this.stopBtn.addEventListener("click", () => this.stopTrafficLight());
    this.resetBtn.addEventListener("click", () => this.resetTrafficLight());
    this.manualBtn.addEventListener("click", () => this.toggleManualMode());

    // Event listener untuk kontrol manual dengan klik lampu
    this.redLight.addEventListener("click", () => this.manualControl("red"));
    this.yellowLight.addEventListener("click", () =>
      this.manualControl("yellow")
    );
    this.greenLight.addEventListener("click", () =>
      this.manualControl("green")
    );

    // Event listener untuk perangkat sentuh (mobile)
    this.setupTouchEvents();

    // Event listener untuk shortcut keyboard
    this.setupKeyboardShortcuts();
  }

  // Mengatur event sentuh untuk perangkat mobile
  setupTouchEvents() {
    [this.redLight, this.yellowLight, this.greenLight].forEach((light) => {
      light.addEventListener("touchstart", (e) => {
        e.preventDefault();
        const color = this.getLightColor(light);
        this.manualControl(color);
      });
    });
  }

  // Mengatur shortcut keyboard
  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        this.isRunning ? this.stopTrafficLight() : this.startTrafficLight();
      } else if (e.code === "KeyR") {
        this.resetTrafficLight();
      } else if (e.code === "KeyM") {
        this.toggleManualMode();
      }
    });
  }

  // Mendapatkan warna lampu berdasarkan elemen
  getLightColor(light) {
    if (light.classList.contains("red")) return "red";
    if (light.classList.contains("yellow")) return "yellow";
    return "green";
  }

  // Memulai timer waktu real-time
  startRealTimeTimer() {
    setInterval(() => {
      if (this.isRunning && this.startTime) {
        this.totalRunTime = Math.floor((Date.now() - this.startTime) / 1000);
        this.totalTimeEl.textContent = this.totalRunTime + "s";
      }
    }, 1000);
  }

  // Fungsi untuk menunggu (delay)
  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Mematikan semua lampu
  turnOffAllLights() {
    this.redLight.classList.remove("active");
    this.yellowLight.classList.remove("active");
    this.greenLight.classList.remove("active");
  }

  // Menyalakan lampu sesuai warna
  activateLight(color) {
    this.turnOffAllLights();
    const light = this.getLightElement(color);
    light.classList.add("active");
  }

  // Mendapatkan elemen lampu berdasarkan warna
  getLightElement(color) {
    switch (color) {
      case "red":
        return this.redLight;
      case "yellow":
        return this.yellowLight;
      case "green":
        return this.greenLight;
      default:
        return this.redLight;
    }
  }

  // Memperbarui status tampilan
  updateStatus(text, phase = null) {
    this.statusText.textContent = `Status: ${text}`;
    if (phase) {
      this.currentPhase = phase;
      this.currentPhaseEl.textContent = phase;
    }
  }

  // Memulai countdown timer
  startCountdown(duration) {
    return new Promise((resolve) => {
      let remaining = Math.ceil(duration / 1000);
      this.currentTimer = remaining;

      const countdown = setInterval(() => {
        this.timerText.textContent = remaining.toString().padStart(2, "0");
        remaining--;

        // Berhenti jika waktu habis atau lampu dihentikan
        if (remaining < 0 || !this.isRunning) {
          clearInterval(countdown);
          resolve();
        }
      }, 1000);
    });
  }

  // Menjalankan siklus lampu lalu lintas
  async runTrafficCycle() {
    let phaseIndex = 0;

    while (this.isRunning) {
      const phase = this.phases[phaseIndex];

      // Menyalakan lampu dan memperbarui status
      this.activateLight(phase.light);
      this.updateStatus(`${phase.emoji} ${phase.name}`, phase.name);

      // Menunggu sesuai durasi fase
      await this.startCountdown(phase.duration);

      if (!this.isRunning) break;

      // Pindah ke fase berikutnya
      phaseIndex = (phaseIndex + 1) % this.phases.length;

      // Menambah hitungan siklus setelah satu putaran lengkap
      if (phaseIndex === 0) {
        this.cycleCount++;
        this.cycleCountEl.textContent = this.cycleCount;
      }
    }
  }

  // Memulai lampu lalu lintas
  startTrafficLight() {
    if (!this.isRunning && !this.isManualMode) {
      this.isRunning = true;
      this.startTime = Date.now();
      this.trafficContainer.classList.add("active");
      this.updateButtonStates();
      this.runTrafficCycle();
    }
  }

  // Menghentikan lampu lalu lintas
  stopTrafficLight() {
    this.isRunning = false;
    this.trafficContainer.classList.remove("active");
    this.turnOffAllLights();
    this.updateStatus("⏹️ Berhenti", "Berhenti");
    this.timerText.textContent = "00";
    this.updateButtonStates();
  }

  // Mereset lampu lalu lintas ke kondisi awal
  resetTrafficLight() {
    this.stopTrafficLight();
    this.cycleCount = 0;
    this.totalRunTime = 0;
    this.startTime = null;
    this.updateStatus("🔄 Reset", "Siap");
    this.currentPhaseEl.textContent = "-";
    this.cycleCountEl.textContent = "0";
    this.totalTimeEl.textContent = "0s";
  }

  // Mengubah mode antara otomatis dan manual
  toggleManualMode() {
    this.isManualMode = !this.isManualMode;

    if (this.isManualMode) {
      this.enterManualMode();
    } else {
      this.enterAutomaticMode();
    }

    this.updateButtonStates();
  }

  // Masuk ke mode manual
  enterManualMode() {
    this.stopTrafficLight();
    this.modeIndicator.textContent = "Mode: Manual";
    this.updateStatus("👆 Mode Manual - Klik lampu", "Manual");
  }

  // Masuk ke mode otomatis
  enterAutomaticMode() {
    this.modeIndicator.textContent = "Mode: Otomatis";
    this.updateStatus("🤖 Mode Otomatis", "Otomatis");
    this.turnOffAllLights();
  }

  // Kontrol manual lampu
  manualControl(color) {
    if (this.isManualMode) {
      this.activateLight(color);
      const colorInfo = this.getColorInfo(color);
      this.updateStatus(
        `${colorInfo.emoji} Manual - ${colorInfo.name}`,
        colorInfo.name
      );
    }
  }

  // Mendapatkan informasi warna (emoji dan nama)
  getColorInfo(color) {
    const colorMap = {
      red: { emoji: "🔴", name: "Merah" },
      yellow: { emoji: "🟡", name: "Kuning" },
      green: { emoji: "🟢", name: "Hijau" },
    };
    return colorMap[color] || colorMap.red;
  }

  // Memperbarui status tombol-tombol
  updateButtonStates() {
    this.startBtn.disabled = this.isRunning || this.isManualMode;
    this.stopBtn.disabled = !this.isRunning;
    this.manualBtn.textContent = this.isManualMode
      ? "🤖 Otomatis"
      : "👆 Manual";
  }

  // Memperbarui tampilan awal
  updateDisplay() {
    this.updateStatus("🚦 Siap", "Siap");
    this.updateButtonStates();
  }
}

// Menjalankan sistem lampu lalu lintas setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  new SmartTrafficLight();
});

// Menambahkan efek visual cursor (hanya untuk perangkat dengan mouse)
document.addEventListener("mousemove", (e) => {
  // Hanya aktif pada perangkat dengan pointer presisi (mouse)
  if (window.matchMedia("(pointer: fine)").matches) {
    const cursor = document.querySelector(".cursor");

    // Membuat elemen cursor jika belum ada
    if (!cursor) {
      const newCursor = document.createElement("div");
      newCursor.className = "cursor";
      newCursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(78,205,196,0.3), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
      `;
      document.body.appendChild(newCursor);
    }

    // Mengatur posisi cursor mengikuti mouse
    const cursorEl = document.querySelector(".cursor");
    cursorEl.style.left = e.clientX - 10 + "px";
    cursorEl.style.top = e.clientY - 10 + "px";
  }
});
