<template>
  <div class="report">
    <div id="copy-area">
      <van-cell-group>
        <van-cell :title="'门店名称：' + baseInfo.shop"></van-cell>
        <van-cell :title="'执行日期：' + baseInfo.date"></van-cell>
        <van-cell
          v-for="(item, index) in products"
          :key="index"
          :title="`${item.name}&nbsp;&nbsp;&nbsp;&nbsp;单价(${item.price || ''})&nbsp;&nbsp;&nbsp;&nbsp;数量(${item.count || ''})`">
        </van-cell>
        <van-cell :title="`总售金额：(${total})元`"></van-cell>
        <van-cell :title="`是否有试吃：${otherInfo.tryEat ? '有' : '无'}`"></van-cell>
        <van-cell :title="`试吃品使用量：${otherInfo.tryEatCount}`"></van-cell>
        <van-cell :title="`是否有赠品：${otherInfo.giveaway ? '有' : '无'}`"></van-cell>
        <van-cell :title="`赠品：${otherInfo.giveawayInfo}`"></van-cell>
        <van-cell :title="`备注：${otherInfo.remarks}`"></van-cell>
      </van-cell-group>
    </div>
    <footer>
      <van-row type="flex" justify="space-around">
        <van-col span="10">
          <van-button style="width: 100%" data-clipboard-target="#copy-area" class="copy-link">拷贝结果</van-button>
        </van-col>
        <van-col span="10">
          <van-button style="width: 100%" type="primary" to="/">返回首页</van-button>
        </van-col>
      </van-row>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import Clipboard from 'clipboard'
import { Toast } from 'vant'

export default defineComponent({
  setup () {
    const store = useStore<GlobalDataProps>()
    const baseInfo = computed(() => store.state.baseInfo)
    const products = computed(() => store.state.products)
    const otherInfo = computed(() => store.state.otherInfo)
    const total = computed(() => store.getters.getTotal)

    onMounted(() => {
      const clipboard = new Clipboard('.copy-link')
      clipboard.on('success', () => {
        Toast.success('拷贝成功')
      })
    })

    return {
      baseInfo,
      products,
      otherInfo,
      total
    }
  }
})
</script>

<style lang="less" scoped>
.report {
  padding-bottom: 74px;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0;
  background-color: #f2f2f2;
  z-index: 10;
}
</style>
