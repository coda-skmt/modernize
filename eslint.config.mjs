import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    files: ['**/*.vue'],
    rules: {
        'vue/multi-word-component-names': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always'
                }
            }
        ]
    }
})
