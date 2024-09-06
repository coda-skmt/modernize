export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: ['@nuxt/content', '@nuxt/ui', '@nuxt/eslint', '@nuxt/image', '@vueuse/nuxt', 'nuxt-file-storage', 'nuxt-lodash', '@nuxtjs/supabase'],

    supabase: {
        redirect: false
    },

    fileStorage: {
        mount: 'public/'
    },

    lodash: {
        prefix: 'use',
        upperAfterPrefix: true
    },

    extends: ['@nuxt/ui-pro'],

    css: ['animate.css'],

    app: {
        head: {
            title: 'Modernize',
            meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
            link: [{ rel: 'icon', href: 'https://modernize-vue3-dark.netlify.app/favicon.svg' }]
        }
    },

    nitro: {
        devProxy: {
            '/outApi': {
                target: 'http://localhost:3001/api',
                changeOrigin: true,
                prependPath: true
            }
        },
        routeRules: {
            '/outApi/**': {
                proxy: 'http://localhost:3001/api/**'
            }
        }
    },

    compatibilityDate: '2024-07-28'
})
