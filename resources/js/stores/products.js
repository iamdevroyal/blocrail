import { defineStore } from 'pinia'
import { productService } from '@/services/product.service'

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [],
        categories: [],
        subcategories: [],
        currentProduct: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 15,
            total: 0,
        },
        filters: {
            search: '',
            status: '',
        },
        loading: false,
        error: null,
    }),

    getters: {
        activeProducts: (state) => state.products.filter(p => p.status === 'active'),
        inactiveProducts: (state) => state.products.filter(p => p.status === 'inactive'),
    },

    actions: {
        /**
         * Fetch products with pagination and filters
         */
        async fetchProducts(page = 1) {
            this.loading = true
            this.error = null

            try {
                const params = {
                    page,
                    per_page: this.pagination.per_page,
                    search: this.filters.search,
                    status: this.filters.status,
                }

                const { data } = await productService.getProducts(params)
                const paginator = data.data

                this.products = paginator.data || []
                this.pagination = {
                    current_page: paginator.current_page,
                    last_page: paginator.last_page,
                    per_page: paginator.per_page,
                    total: paginator.total,
                }

                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load products'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Fetch all categories
         */
        async fetchCategories() {
            try {
                const { data } = await productService.getCategories()
                this.categories = data.data
                return data.data
            } catch (error) {
                console.error('Failed to fetch categories:', error)
                throw error
            }
        },

        /**
         * Fetch subcategories for a category
         */
        async fetchSubcategories(categoryId) {
            try {
                const { data } = await productService.getSubcategories(categoryId)
                this.subcategories = data.data
                return data.data
            } catch (error) {
                console.error('Failed to fetch subcategories:', error)
                throw error
            }
        },

        /**
         * Fetch single product
         */
        async fetchProduct(id) {
            this.loading = true
            this.error = null

            try {
                const { data } = await productService.getProduct(id)
                this.currentProduct = data.data
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to load product'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Create new product
         */
        async createProduct(productData) {
            this.loading = true
            this.error = null

            try {
                const { data } = await productService.createProduct(productData)
                this.products.unshift(data.data)
                return data.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to create product'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Update product
         */
        async updateProduct(id, productData) {
            this.loading = true
            this.error = null

            try {
                const { data } = await productService.updateProduct(id, productData)
                const updatedProduct = data.data

                const index = this.products.findIndex(p => p.id === id)
                if (index !== -1) {
                    this.products[index] = updatedProduct
                }

                this.currentProduct = updatedProduct
                return updatedProduct
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to update product'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Delete product
         */
        async deleteProduct(id) {
            this.loading = true
            this.error = null

            try {
                await productService.deleteProduct(id)
                this.products = this.products.filter(p => p.id !== id)
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to delete product'
                throw error
            } finally {
                this.loading = false
            }
        },

        /**
         * Upload product images
         */
        async uploadImages(productId, files) {
            try {
                const { data } = await productService.uploadImages(productId, files)
                const images = data.data.images

                // Update product images in state
                const product = this.products.find(p => p.id === productId)
                if (product) {
                    product.images = images
                }

                if (this.currentProduct?.id === productId) {
                    this.currentProduct.images = images
                }

                return data
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to upload images'
                throw error
            }
        },

        /**
         * Delete product image
         */
        async deleteImage(productId, imageId) {
            try {
                const { data } = await productService.deleteImage(productId, imageId)
                const images = data.data

                // Update state with fresh image list from backend
                const product = this.products.find(p => p.id === productId)
                if (product) {
                    product.images = images
                }

                if (this.currentProduct?.id === productId) {
                    this.currentProduct.images = images
                }
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to delete image'
                throw error
            }
        },


        /**
         * Set filters
         */
        setFilters(filters) {
            this.filters = { ...this.filters, ...filters }
        },

        /**
         * Clear filters
         */
        clearFilters() {
            this.filters = {
                search: '',
                status: '',
            }
        },
    },
})
