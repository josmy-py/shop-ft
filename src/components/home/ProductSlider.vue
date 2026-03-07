<template>
  <section class="container mx-auto px-6 py-16">
    <h3 class="text-3xl font-bold mb-10 text-primary">
      Nuevos Productos
    </h3>

    <Carousel
      :value="products"
      :numVisible="1"
      :numScroll="1"
      :circular="true"
      :autoplayInterval="5000"
      :responsiveOptions="responsiveOptions"
      showNavigators
      showIndicators
      class="premium-carousel"
    >
      <template #item="slotProps">
        <div class="p-4">
          <Card
            class="shadow-xl rounded-2xl overflow-hidden 
                   transition-all duration-500 ease-in-out
                   hover:scale-[1.03] hover:shadow-2xl"
          >
            <template #header>
              <img
                :src="slotProps.data.image"
                class="w-full h-56 object-cover"
              />
            </template>

            <template #title>
              <span class="text-xl font-bold">
                {{ slotProps.data.name }}
              </span>
            </template>

            <template #content>
              <p class="text-primary font-bold text-lg">
                ${{ slotProps.data.price }}
              </p>
            </template>
          </Card>
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script setup>
import Carousel from 'primevue/carousel'
import Card from 'primevue/card'

const products = [
  {
    name: 'Laptop Gamer RTX',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'
  },
  {
    name: 'Monitor 27" 144Hz',
    price: 320,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3'
  },
  {
    name: 'Teclado Mecánico RGB',
    price: 120,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef'
  },
  {
    name: 'Mouse Gamer Pro',
    price: 80,
    image: 'https://images.unsplash.com/photo-1587202372775-989c3e5b9b18'
  },
  {
    name: 'SSD NVMe 1TB',
    price: 150,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68'
  }   
]

const responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1
  }
]
</script>