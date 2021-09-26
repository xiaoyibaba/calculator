import { createStore } from 'vuex'

interface ProductProp {
  name: string;
  price: null | number;
  count: null | number;
}

interface BaseInfoProp {
  shop: string;
  date: string;
}

interface OtherInfoProp {
  tryEat?: boolean;
  tryEatCount?: number;
  giveaway?: boolean;
  giveawayInfo?: string;
  remarks?: string;
}

export interface GlobalDataProps {
  baseInfo: BaseInfoProp;
  products: ProductProp[];
  otherInfo: OtherInfoProp;
}

function accAdd (arg1: number, arg2: number): number {
  let r1, r2
  try {
    // 获取参数1的小数长度，比如 12.12345，那么 r1 === 5
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    // 获取参数2的小数长度，比如 12.12345，那么 r2 === 5
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  const c = Math.abs(r1 - r2) // 获取绝对值
  const m = Math.pow(10, Math.max(r1, r2)) // 小数位数最多的，10的次幂
  if (c > 0) {
    // 确保小数转成整数的时候，一样大小，
    const cm = Math.pow(10, c)
    if (r1 > r2) {
      // 参数1的小数长度大于参数2，那么参数arg2去掉小数后，在乘上差的位数
      arg1 = Number(arg1.toString().replace('.', '')) // 小数变整数：12.123 => 12123
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    // 小数位数一样，那么直接转成整数
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  // 或者不用上面的if else
  // 直接 return (arg1 * m  + arg2 * m) / m;
  // 整数相加后，变回小数
  return (arg1 + arg2) / m
}

function accMul (arg1: null |number, arg2: null | number): number {
  let total = 0
  if (arg1 && arg2) {
    let m = 0; const s1 = arg1.toString(); const s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {
    }
    try {
      m += s2.split('.')[1].length
    } catch (e) {
    }
    total = Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  }
  return total
}

export default createStore<GlobalDataProps>({
  state: {
    baseInfo: {
      shop: '',
      date: `${new Date().getMonth() + 1}月${new Date().getDate()}日`
    },

    products: [
      { name: '', price: null, count: null }
    ],

    otherInfo: {
      tryEat: false,
      tryEatCount: 0,
      giveaway: false,
      giveawayInfo: '',
      remarks: ''
    }
  },
  mutations: {
    addProduct (state, payLoad) {
      state.products.push(payLoad)
    }
  },
  getters: {
    getTotal: (state) => {
      return state.products.reduce((sum, item) => accAdd(sum, accMul(item.price, item.count)), 0)
    }

  }
})
