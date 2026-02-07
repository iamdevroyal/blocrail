import api from './api'

export const productService = {
    /**
     * Get all products
     */
    async getProducts(params = {}) {
        return api.get('/products', { params })
    },

    /**
     * Get single product
     */
    async getProduct(id) {
        return api.get(`/products/${id}`)
    },

    /**
     * Create new product
     */
    async createProduct(data) {
        return api.post('/products', data)
    },

    /**
     * Update product
     */
    async updateProduct(id, data) {
        return api.put(`/products/${id}`, data)
    },

    /**
     * Delete product
     */
    async deleteProduct(id) {
        return api.delete(`/products/${id}`)
    },

    /**
     * Get categories
     */
    async getCategories() {
        return api.get('/products/categories')
    },

    /**
     * Get subcategories
     */
    async getSubcategories(categoryId) {
        return api.get(`/products/categories/${categoryId}/subcategories`)
    },

    /**
     * Upload product images
     */
    async uploadImages(productId, files) {
        const formData = new FormData()
        formData.append('product_id', productId)
        files.forEach((file, index) => {
            formData.append(`images[${index}]`, file)
        })

        return api.post('/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },

    /**
     * Delete product image
     */
    async deleteImage(productId, imageId) {
        return api.delete('/images/delete', {
            data: {
                image_id: imageId,
                product_id: productId
            }
        })
    },
}

