let isPlaying = false;
let currentTrack = 0;
const audio = document.getElementById('audioPlayer');
let currentVolume = 0.5;

const tracks = [
    {file: "../songs and images/AGAR TUM NA HOTE.mp3", image: "../songs and images/Agar_tum_na_hote.jpeg", title: "Agar_Tum_Nahi_Hote", theme: "#A98B76"},
    {file: "../songs and images/aisi_surat_teri_kamiliwale.MP3", image: "../songs and images/aisi_surat_teri_kamiliwale.jpeg", title: "Aisi_Surat_Kamiliwale", theme: "linear-gradient(135deg, #A98B76"},
    {file: "../songs and images/Ane_pal_jane_wala_hai.MP3", image: "../songs and images/Ane_pal_jane_wala_hai.jpeg", title: "Ane_Wale_Paal_Jane_Wale_HAi", theme: "#A98B76"},
    {file: "../songs and images/ate_jate_khubsurut.MP3", image: "../songs and images/ate_jate_khubsurut.jpeg", title: "Ate_Jate_Khubsoorat", theme: "#A98B76"},
    {file: "../songs and images/Awargi_mein_haad_se.mp3", image: "../songs and images/Awargi_mein_haad_se.jpeg", title: "Awargi_Mein_Haad_se", theme: "#A98B76"},
    {file: "../songs and images/Dam_mast_kalandar.mp3", image: "../songs and images/Dam_mast_kalandar.jpeg", title: "Dam_Mast_Kalandar", theme: "#A98B76"},
    {file: "../songs and images/gam_hai_ya_khushi.mp3", image: "../songs and images/gam_hai_ya_khushi.jpeg", title: "Gum_Hai_Ya_Khushi", theme: "#A98B76"},
    {file: "../songs and images/kisi_se_unki_manzil_ka_pata.mp3", image: "../songs and images/kisi_se_unki_manzil_ka_pata.jpeg", title: "Kisi_Se_Unki_Manzil_Ka_Pata", theme: "#A98B76"},
    {file: "../songs and images/mujhe_tum_yaad_ate_ho.mp3", image: "../songs and images/mujhe_tum_yaad_ate_ho.jpeg", title: "Mujhe_Tum_Yaad_Ate_Ho", theme: "#A98B76"},
    {file: "../songs and images/Sanu_ek_pal_chain_na_awe.mp3", image: "../songs and images/Sanu_ek_pal_chain_na_awe.jpeg", title: "Sanu_Ek_Pal_Chain_Na_Awe", theme: "#A98B76"},
    {file: "../songs and images/teri_duniya_se_door.mp3", image: "../songs and images/teri_duniya_se_door.jpeg", title: "Teri_Duniya_Se_Door", theme: "#A98B76"},
    {file: "../songs and images/unki_gali_mein_ana_jana.mp3", image: "../songs and images/unki_gali_mein_ana_jana.jpeg", title: "Unki_Gali_Mein_Ana_Jana", theme: "#A98B76"}
];

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        // Set volume and unmute on first user interaction
        audio.volume = currentVolume || 0.5;
        if (audio.muted) {
            audio.muted = false;
        }
        audio.play().catch(e => console.error('Playback failed:', e));
        isPlaying = true;
    }
    const playBtn = document.getElementById('playBtn');
    const player = document.getElementById('musicPlayer');
    playBtn.innerHTML = isPlaying ? '⏸' : '▶';
    player.classList.toggle('playing', isPlaying);
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    updateTrackDisplay();
    if (isPlaying) {
        audio.currentTime = 0;
        audio.play().catch(e => console.error('Playback failed:', e));
    }
}

function previousTrack() {
    currentTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    updateTrackDisplay();
    if (isPlaying) {
        audio.currentTime = 0;
        audio.play().catch(e => console.error('Playback failed:', e));
    }
}

function updateTrackDisplay() {
    const displayImage = document.getElementById('displayImage');
    displayImage.src = encodeURI(tracks[currentTrack].image);
    displayImage.alt = tracks[currentTrack].title;
    document.getElementById('songTitle').textContent = tracks[currentTrack].title;
    audio.src = encodeURI(tracks[currentTrack].file);
    audio.load();
    document.getElementById('musicPlayer').style.background = tracks[currentTrack].theme;
    // Reset timeline on track change
    document.getElementById('currentTime').textContent = '0:00';
    document.getElementById('duration').textContent = '0:00';
    document.getElementById('progressFill').style.width = '0%';
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateTimeline() {
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const progressFill = document.getElementById('progressFill');

    if (audio.duration) {
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
    }
}

function seek(event) {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = (x / rect.width);

    if (audio.duration) {
        audio.currentTime = percentage * audio.duration;
    }
}

function minimizePlayer() {
    const player = document.getElementById('musicPlayer');
    player.style.transform = 'scale(0.1)';
    player.style.opacity = '0.5';
    
    setTimeout(() => {
        player.style.transform = 'scale(1)';
        player.style.opacity = '1';
    }, 1000);
}

function closePlayer() {
    const player = document.getElementById('musicPlayer');
    player.style.animation = 'fadeOut 0.3s ease-out forwards';
    
    setTimeout(() => {
        player.style.display = 'none';
        setTimeout(() => {
            player.style.display = 'block';
            player.style.animation = 'none';
        }, 2000);
    }, 300);
}

// Add event listeners for timeline
audio.addEventListener('loadedmetadata', () => {
    updateTimeline();
});
audio.addEventListener('timeupdate', updateTimeline);
audio.addEventListener('ended', () => {
    nextTrack();
});

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateTrackDisplay);
} else {
    updateTrackDisplay();
}