<template>
  <div class="home">
    <!-- 基本信息 -->
    <van-cell-group border style="margin-bottom: 10px">
      <van-field label-width="40" label="门店" autofocus placeholder="请输入" v-model="baseInfo.shop"></van-field>
      <van-field label-width="40" label="日期" readonly v-model="baseInfo.date"></van-field>
    </van-cell-group>
    <!-- 商品信息 -->
    <van-cell-group style="margin-bottom: 10px" v-for="(item, index) in products" :key="index">
      <van-field label-width="40" label="商品" v-model="item.name" placeholder="请输入"></van-field>
      <van-row type="flex" justify="space-between">
        <van-col span="11">
          <van-field label-width="40" label="单价" placeholder="请输入" type="number" v-model="item.price"></van-field>
        </van-col>
        <van-col span="11">
          <van-field label-width="40" label="数量" placeholder="请输入" type="number" v-model="item.count"></van-field>
        </van-col>
      </van-row>
    </van-cell-group>
    <!-- 试吃信息 -->
    <van-cell-group style="margin-bottom: 10px">
      <van-row type="flex" justify="space-between">
        <van-col span="11">
          <van-field name="switch" label="试吃" label-width="40">
            <template #input>
              <van-switch v-model="otherInfo.tryEat" size="20px" />
            </template>
          </van-field>
        </van-col>
        <van-col span="11" v-show="otherInfo.tryEat">
          <van-field label-width="40" label="数量" placeholder="请输入" type="number" v-model="otherInfo.tryEatCount"></van-field>
        </van-col>
      </van-row>
    </van-cell-group>
    <!-- 赠品信息 -->
    <van-cell-group style="margin-bottom: 10px">
      <van-row type="flex" justify="space-between">
        <van-col span="11">
          <van-field name="switch" label="赠品" label-width="40">
            <template #input>
              <van-switch v-model="otherInfo.giveaway" size="20px" />
            </template>
          </van-field>
        </van-col>
        <van-col span="11" v-show="otherInfo.giveaway">
          <van-field label-width="40" label="详情" placeholder="请输入" v-model="otherInfo.giveawayInfo"></van-field>
        </van-col>
      </van-row>
    </van-cell-group>
    <!-- 备注 -->
    <van-cell-group style="margin-bottom: 10px">
      <van-field label-width="40" label="备注" placeholder="请输入" v-model="otherInfo.remarks"></van-field>
    </van-cell-group>
    <footer>
      <van-row type="flex" justify="space-around">
        <van-col span="10">
          <van-field label-width="40" label="总额" placeholder="请输入" v-model="total" readonly></van-field>
        </van-col>
        <van-col span="6">
          <van-button style="width: 100%" @click="addProduct">添加商品</van-button>
        </van-col>
        <van-col span="6">
          <van-button style="width: 100%" type="primary" to="/report">生成结果</van-button>
        </van-col>
      </van-row>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'

export default defineComponent({
  name: 'Home',

  setup () {
    const store = useStore<GlobalDataProps>()
    const baseInfo = computed(() => store.state.baseInfo)
    const products = computed(() => store.state.products)
    const otherInfo = computed(() => store.state.otherInfo)
    const total = computed(() => store.getters.getTotal)

    const addProduct = (): void => {
      store.commit('addProduct', { name: '', price: null, count: null })
    }

    return {
      baseInfo,
      products,
      otherInfo,
      total,
      addProduct
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  background-color: #f7f8fa;
  padding: 10px 0 64px;
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 0;
    background-color: #f2f2f2;
    z-index: 10;
  }
}
</style>
