<template>
  <div class="bg-gray-50 min-h-screen flex flex-col">
    <Navbar />
    <HeroSection />
    <CategoryBar />
    <SearchBar />
    <ProductSlider />
    <ProductGrid />
    <Footer />
  </div>
</template>

<script setup>
  import Navbar from "@/components/layouts/NavBar.vue";
  import Footer from "@/components/layouts/Footer.vue";
  import HeroSection from "@/components/layouts/HeroSection.vue";
  import CategoryBar from "@/components/home/CategoryBar.vue";
  import ProductSlider from "@/components/home/ProductSlider.vue";
  import ProductGrid from "@/components/home/ProductGrid.vue";
  import SearchBar from "@/components/home/SearchBar.vue";
</script>