import { ref, onMounted } from 'vue'

export function usePaystack() {
    const loading = ref(false)
    const error = ref(null)

    /**
     * Load Paystack inline script
     */
    const loadPaystackScript = () => {
        return new Promise((resolve, reject) => {
            if (window.PaystackPop) {
                resolve(window.PaystackPop)
                return
            }

            const script = document.createElement('script')
            script.src = 'https://js.paystack.co/v1/inline.js'
            script.async = true
            script.onload = () => resolve(window.PaystackPop)
            script.onerror = () => reject(new Error('Failed to load Paystack script'))
            document.head.appendChild(script)
        })
    }

    /**
     * Initialize Paystack payment
     */
    const initializePayment = async ({
        email,
        amount,
        reference,
        onSuccess,
        onClose,
        metadata = {},
    }) => {
        loading.value = true
        error.value = null

        try {
            const PaystackPop = await loadPaystackScript()

            const handler = PaystackPop.setup({
                key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
                email,
                amount: amount * 100, // Convert to kobo
                ref: reference,
                metadata,
                callback: (response) => {
                    loading.value = false
                    if (onSuccess) {
                        onSuccess(response)
                    }
                },
                onClose: () => {
                    loading.value = false
                    if (onClose) {
                        onClose()
                    }
                },
            })

            handler.openIframe()
        } catch (err) {
            loading.value = false
            error.value = err.message
            throw err
        }
    }

    return {
        loading,
        error,
        initializePayment,
    }
}
