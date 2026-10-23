/**
 * Application Configuration
 * Central place for all configurable values.
 */
const CONFIG = Object.freeze({
    github: {
        username: 'barisgneri',
        profileUrl: 'https://github.com/barisgneri',
        repositoriesUrl: 'https://github.com/barisgneri?tab=repositories',
    },

    /** Google Play Store Developer profile */
    playStoreDevUrl: 'https://play.google.com/store/apps/dev?id=8291046327375416952',

    /** Featured Projects (Curated high-impact showcase) */
    featuredProjects: [
        {
            id: 'kargo-takip',
            name: 'Kargo Takip — Tüm Kargolar',
            badge: 'Google Play',
            description: {
                en: 'Cross-platform mobile application for tracking cargo shipments across multiple carriers, live on Google Play. Built with Compose Multiplatform, Clean Architecture, and MVI pattern.',
                tr: "Google Play'de yayında olan, Türkiye'deki tüm kargo firmalarını tek ekrandan sorgulayıp takip etmeyi sağlayan mobil uygulama. Compose Multiplatform ve MVI mimarisiyle geliştirildi."
            },
            tags: ['Compose Multiplatform', 'Kotlin', 'MVI', 'Android & iOS'],
            language: 'Kotlin',
            githubUrl: 'https://github.com/barisgneri/KargoTakip-TumKargolar..',
            playStoreUrl: 'https://play.google.com/store/apps/details?id=com.barisproduction.kargo'
        },
        {
            id: 'android-security',
            name: 'Android Security Playground',
            badge: 'Enterprise Security',
            description: {
                en: 'Multi-module Android application showcasing hardware-backed device integrity checks, app malware scanning, and NFC-based EMV contactless credit card reading.',
                tr: 'Cihaz bütünlüğü (root/tamper) doğrulama, kötü amaçlı yazılım taraması ve NFC tabanlı temassız EMV kredi kartı okuma yeteneklerini sunan çok modüllü Android güvenlik mimarisi.'
            },
            tags: ['Multi-Module', 'Jetpack Compose', 'NFC / EMV', 'Hardware Integrity'],
            language: 'Kotlin',
            githubUrl: 'https://github.com/barisgneri/AndroidSecurityPlayground',
            playStoreUrl: null
        },
        {
            id: 'obd2-ecu',
            name: 'OBD2 — ECU Data Viewer',
            badge: 'Automotive IoT',
            description: {
                en: 'Automotive diagnostic tool for reading, decoding, and visualizing real-time telemetry and engine fault metrics directly from vehicle ECUs over Bluetooth.',
                tr: 'Bluetooth protokolü üzerinden araç kontrol ünitesine (ECU) bağlanarak anlık motor sensör verilerini ve arıza kayıtlarını okuyup görselleştiren otomotiv Ar-Ge projesi.'
            },
            tags: ['Bluetooth BLE/SPP', 'ECU Telemetry', 'Kotlin', 'Data Visualization'],
            language: 'Kotlin',
            githubUrl: 'https://github.com/barisgneri/ODB2-ECUViewer',
            playStoreUrl: null
        },
        {
            id: 'order-management',
            name: 'Restaurant Order Management',
            badge: 'Compose & MVI',
            description: {
                en: 'Native Android application for restaurant order management and real-time courier delivery tracking, architected with modern Jetpack Compose and reactive MVI.',
                tr: 'Restoran sipariş süreçleri ve anlık kurye teslimat takibi için modern Jetpack Compose ve reaktif MVI mimarisiyle inşa edilmiş native Android uygulaması.'
            },
            tags: ['Jetpack Compose', 'MVI Pattern', 'Kotlin Flow', 'Clean Architecture'],
            language: 'Kotlin',
            githubUrl: 'https://github.com/barisgneri/OrderManagement',
            playStoreUrl: null
        }
    ],

    /** Language dot colors */
    languageColors: {
        Kotlin:     '#A97BFF',
        Java:       '#b07219',
        JavaScript: '#f1e05a',
        TypeScript: '#3178c6',
        Python:     '#3572A5',
        Dart:       '#00B4AB',
        Swift:      '#F05138',
        'C#':       '#178600',
        HTML:       '#e34c26',
        CSS:        '#563d7c',
    },
});
