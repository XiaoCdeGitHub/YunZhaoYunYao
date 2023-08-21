<template>
  <main class="bg-write">
    <TheHeader v-if="!configStore.isMobi" />
    <TheMobiHeader v-else></TheMobiHeader>
    <RouterView />
    <TheFooter v-if="!configStore.isMobi" class="text-white" />
    <TheMobiFooter v-else></TheMobiFooter>
    <ContactUs v-if="visible" v-model:visible="visible" @cancel="visible = false"></ContactUs>
  </main>
</template>
<script lang="ts" setup>
import { useConfigStore } from '~/stores/user'
const configStore = useConfigStore()
const visible = ref(false)


</script>
<style lang="less" scoped>
.float-button {
  position: fixed;
  top: 85%;
  right: 0.388888888rem;
  /*14px */
  width: 1.44444444rem;
  /*52px*/
  height: 1.44444444rem;
  /*52px*/
  background-color: #0252fa;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0Px 1Px 3Px 1Px rgba(117, 115, 115, 0.5);

  .button-part {
    height: 0.9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;


  }

  img {
    width: 0.46666666rem;
    height: 0.46666666rem;
  }

  p {
    font-size: 12Px;
    /*8px */
    font-weight: 400;
    color: #FFFFFF;
    line-height: 0.3rem;
    /*11px */
  }

}

.float-button.open {
  width: 200px;
  height: 200px;
}

.float-button.open slot {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.float-button slot {
  display: none;
}</style>
