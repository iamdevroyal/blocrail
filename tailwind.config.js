/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'bg-primary': '#0A0B14',
                'bg-secondary': '#12131F',
                'bg-tertiary': '#1A1B2E',
                purple: {
                    400: '#A78BFA',
                    500: '#8B5CF6',
                    600: '#7C3AED',
                    700: '#6D28D9',
                },
                green: {
                    400: '#34D399',
                    500: '#10B981',
                },
                pink: {
                    500: '#EC4899',
                },
                blue: {
                    500: '#3B82F6',
                },
                'text-primary': '#FFFFFF',
                'text-secondary': '#E5E7EB',
                'text-muted': '#9CA3AF',
                'text-purple': '#A78BFA',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Space Grotesk', 'Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                'gradient-purple-blue': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                'gradient-dark': 'linear-gradient(180deg, #0A0B14 0%, #1A1B2E 100%)',
            },
            backdropBlur: {
                'glass': '20px',
            },
            boxShadow: {
                'glow-purple': '0 0 30px rgba(139, 92, 246, 0.3)',
                'glow-purple-lg': '0 0 40px rgba(139, 92, 246, 0.5)',
                'glow-purple-xl': '0 20px 60px rgba(139, 92, 246, 0.2)',
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [],
}
