<template>
  <div class="mobile-demo">
    <!-- 顶部导航 -->
    <DMobileNavBar
      :title="currentTitle"
      :left-arrow="activeDemo !== 'home'"
      @click-left="activeDemo = 'home'"
      fixed
    />

    <!-- 首页：组件列表 -->
    <template v-if="activeDemo === 'home'">
      <div class="demo-home">
        <div class="demo-home__header">
          <div class="demo-home__logo">◆</div>
          <h2 class="demo-home__title">Dream UI Mobile</h2>
          <p class="demo-home__desc">玻璃拟态移动端组件库 · {{ totalComponents }} 个组件</p>
        </div>
        <DMobileCellGroup v-for="group in navGroups" :key="group.title" :title="group.title">
          <DMobileCell
            v-for="item in group.items"
            :key="item.key"
            :title="item.label"
            :value="item.tag"
            is-link
            @click="activeDemo = item.key"
          />
        </DMobileCellGroup>
      </div>
    </template>

    <!-- ====== NavBar 导航栏 ====== -->
    <template v-if="activeDemo === 'navbar'">
      <DemoBlock title="基础用法" :code="codes.navbar">
        <DMobileNavBar title="页面标题" />
      </DemoBlock>
      <DemoBlock title="返回按钮" :code="codes.navbarBack">
        <DMobileNavBar title="标题" left-arrow left-text="返回" />
      </DemoBlock>
    </template>

    <!-- ====== TabBar 标签栏 ====== -->
    <template v-if="activeDemo === 'tabbar'">
      <DemoBlock title="基础用法" :code="codes.tabbar">
        <DMobileTabBar v-model="activeTab" :items="tabBarItems" :fixed="false" :placeholder="false" />
      </DemoBlock>
      <DemoBlock title="带徽章" :code="codes.tabbarBadge">
        <DMobileTabBar v-model="activeTab2" :items="tabBarBadgeItems" :fixed="false" :placeholder="false" />
      </DemoBlock>
    </template>

    <!-- ====== Tabs 标签页 ====== -->
    <template v-if="activeDemo === 'tabs'">
      <DemoBlock title="基础用法" :code="codes.tabs">
        <DMobileTabs v-model="activeTabName" :tabs="tabsList">
          <div style="padding: 8px 0; font-size: 14px; color: rgba(255,255,255,0.6);">
            当前标签：{{ activeTabName }}
          </div>
        </DMobileTabs>
      </DemoBlock>
    </template>

    <!-- ====== Cell 单元格 ====== -->
    <template v-if="activeDemo === 'cell'">
      <DemoBlock title="基础用法" :code="codes.cell">
        <DMobileCellGroup>
          <DMobileCell title="单元格" value="内容" />
          <DMobileCell title="单元格" value="内容" label="描述信息" />
        </DMobileCellGroup>
      </DemoBlock>
      <DemoBlock title="展示图标">
        <DMobileCellGroup>
          <DMobileCell title="设置" icon="⚙️" is-link />
          <DMobileCell title="帮助" icon="❓" is-link />
          <DMobileCell title="关于" icon="💡" value="v1.0.2" is-link />
        </DMobileCellGroup>
      </DemoBlock>
      <DemoBlock title="卡片风格">
        <DMobileCellGroup title="分组标题" inset>
          <DMobileCell title="Wi-Fi" value="已连接" is-link />
          <DMobileCell title="蓝牙" value="已开启" is-link />
        </DMobileCellGroup>
      </DemoBlock>
    </template>

    <!-- ====== Field 输入框 ====== -->
    <template v-if="activeDemo === 'field'">
      <DemoBlock title="基础用法" :code="codes.field">
        <DMobileCellGroup>
          <DMobileField v-model="fieldVal1" label="用户名" placeholder="请输入用户名" clearable />
          <DMobileField v-model="fieldVal2" label="密码" type="password" placeholder="请输入密码" />
        </DMobileCellGroup>
      </DemoBlock>
      <DemoBlock title="多行文本">
        <DMobileField v-model="fieldVal3" label="留言" type="textarea" placeholder="请输入留言" :maxlength="100" show-word-limit />
      </DemoBlock>
    </template>

    <!-- ====== Switch 开关 ====== -->
    <template v-if="activeDemo === 'switch'">
      <DemoBlock title="基础用法" :code="codes.switchDemo">
        <DMobileCellGroup>
          <DMobileCell title="开关" center>
            <template #extra><DMobileSwitch v-model="switchVal1" /></template>
          </DMobileCell>
          <DMobileCell title="禁用状态" center>
            <template #extra><DMobileSwitch v-model="switchVal2" disabled /></template>
          </DMobileCell>
          <DMobileCell title="加载状态" center>
            <template #extra><DMobileSwitch v-model="switchVal3" loading /></template>
          </DMobileCell>
        </DMobileCellGroup>
      </DemoBlock>
    </template>

    <!-- ====== Tag 标签 ====== -->
    <template v-if="activeDemo === 'tag'">
      <DemoBlock title="类型" :code="codes.tag">
        <div class="demo-tags">
          <DMobileTag text="默认" />
          <DMobileTag text="主要" type="primary" />
          <DMobileTag text="成功" type="success" />
          <DMobileTag text="警告" type="warning" />
          <DMobileTag text="危险" type="danger" />
        </div>
      </DemoBlock>
      <DemoBlock title="圆角 & 尺寸">
        <div class="demo-tags">
          <DMobileTag text="小号" type="primary" size="small" round />
          <DMobileTag text="中号" type="success" round />
          <DMobileTag text="大号" type="warning" size="large" round />
          <DMobileTag text="可关闭" type="danger" closeable round />
        </div>
      </DemoBlock>
    </template>

    <!-- ====== Divider 分隔线 ====== -->
    <template v-if="activeDemo === 'divider'">
      <DemoBlock title="基础用法" :code="codes.divider">
        <DMobileDivider />
        <DMobileDivider text="文字" />
        <DMobileDivider text="左侧" content-position="left" />
        <DMobileDivider text="虚线" dashed />
      </DemoBlock>
    </template>

    <!-- ====== Popup 弹出层 ====== -->
    <template v-if="activeDemo === 'popup'">
      <DemoBlock title="弹出位置" :code="codes.popup">
        <DMobileCellGroup>
          <DMobileCell title="底部弹出" is-link @click="showPopup('bottom')" />
          <DMobileCell title="顶部弹出" is-link @click="showPopup('top')" />
          <DMobileCell title="居中弹出" is-link @click="showPopup('center')" />
        </DMobileCellGroup>
      </DemoBlock>
      <DMobilePopup v-model="popupVisible" :position="popupPos" closeable>
        <div :style="popupStyle">
          <p style="text-align:center; color: rgba(255,255,255,0.6); margin: 0;">{{ popupPos }} 方向弹出</p>
        </div>
      </DMobilePopup>
    </template>

    <!-- ====== Dialog 对话框 ====== -->
    <template v-if="activeDemo === 'dialog'">
      <DemoBlock title="基础用法" :code="codes.dialog">
        <DMobileCellGroup>
          <DMobileCell title="提示弹窗" is-link @click="dialog1 = true" />
          <DMobileCell title="确认弹窗" is-link @click="dialog2 = true" />
        </DMobileCellGroup>
      </DemoBlock>
      <DMobileDialog v-model="dialog1" title="提示" message="这是一条提示信息" />
      <DMobileDialog v-model="dialog2" title="确认操作" message="确定要执行此操作吗？" show-cancel-button />
    </template>

    <!-- ====== ActionSheet 动作面板 ====== -->
    <template v-if="activeDemo === 'actionsheet'">
      <DemoBlock title="基础用法" :code="codes.actionsheet">
        <DMobileCellGroup>
          <DMobileCell title="基础用法" is-link @click="actionSheet1 = true" />
          <DMobileCell title="带描述信息" is-link @click="actionSheet2 = true" />
        </DMobileCellGroup>
      </DemoBlock>
      <DMobileActionSheet v-model="actionSheet1" :actions="[{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]" />
      <DMobileActionSheet v-model="actionSheet2" title="标题" description="这是一段描述信息" :actions="[{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]" />
    </template>

    <!-- ====== Toast 轻提示 ====== -->
    <template v-if="activeDemo === 'toast'">
      <DemoBlock title="提示类型" :code="codes.toast">
        <DMobileCellGroup>
          <DMobileCell title="文字提示" is-link @click="showToast('text', '这是文字提示')" />
          <DMobileCell title="成功提示" is-link @click="showToast('success', '操作成功')" />
          <DMobileCell title="失败提示" is-link @click="showToast('fail', '操作失败')" />
          <DMobileCell title="加载提示" is-link @click="showToast('loading', '加载中...')" />
        </DMobileCellGroup>
      </DemoBlock>
      <DMobileToast v-model="toastVisible" :message="toastMsg" :type="toastType" />
    </template>

    <!-- ====== Loading 加载 ====== -->
    <template v-if="activeDemo === 'loading'">
      <DemoBlock title="基础用法" :code="codes.loading">
        <div class="demo-center"><DMobileLoading /></div>
      </DemoBlock>
      <DemoBlock title="加载文案">
        <div class="demo-center"><DMobileLoading text="加载中..." /></div>
      </DemoBlock>
      <DemoBlock title="垂直排列">
        <div class="demo-center"><DMobileLoading text="正在加载" vertical :size="30" /></div>
      </DemoBlock>
    </template>

    <!-- ====== SearchBar 搜索栏 ====== -->
    <template v-if="activeDemo === 'searchbar'">
      <DemoBlock title="基础用法" :code="codes.searchbar">
        <DMobileSearchBar v-model="searchVal" placeholder="搜索组件..." />
      </DemoBlock>
      <DemoBlock title="带搜索按钮">
        <DMobileSearchBar v-model="searchVal2" placeholder="搜索..." show-action />
      </DemoBlock>
    </template>

    <!-- ====== Stepper 步进器 ====== -->
    <template v-if="activeDemo === 'stepper'">
      <DemoBlock title="基础用法" :code="codes.stepper">
        <DMobileCellGroup>
          <DMobileCell title="基础用法" center>
            <template #extra><DMobileStepper v-model="stepVal1" /></template>
          </DMobileCell>
          <DMobileCell title="步长为 5" center>
            <template #extra><DMobileStepper v-model="stepVal2" :step="5" :max="100" /></template>
          </DMobileCell>
          <DMobileCell title="圆角风格" center>
            <template #extra><DMobileStepper v-model="stepVal4" theme="round" /></template>
          </DMobileCell>
        </DMobileCellGroup>
      </DemoBlock>
    </template>

    <!-- ====== PasswordInput 密码输入 ====== -->
    <template v-if="activeDemo === 'passwordinput'">
      <DemoBlock title="基础用法" :code="codes.passwordinput">
        <DMobilePasswordInput :value="pwdVal" :focused="kbShow" info="密码为 6 位数字" @focus="kbShow = true" />
      </DemoBlock>
      <DMobileNumberKeyboard v-model="kbShow" @input="onKbInput" @delete="onKbDel" />
    </template>

    <!-- ====== Picker 选择器 ====== -->
    <template v-if="activeDemo === 'picker'">
      <DemoBlock title="基础用法" :code="codes.picker">
        <DMobileCellGroup>
          <DMobileCell title="选择城市" :value="pickerResult || '请选择'" is-link @click="pickerShow = true" />
        </DMobileCellGroup>
      </DemoBlock>
      <DMobilePicker v-model="pickerShow" title="选择城市" :columns="[['北京', '上海', '广州', '深圳', '杭州', '成都']]" @confirm="onPickerConfirm" />
    </template>

    <!-- ====== Progress 进度条 ====== -->
    <template v-if="activeDemo === 'progress'">
      <DemoBlock title="基础用法" :code="codes.progress">
        <DMobileProgress :percentage="30" />
        <DMobileProgress :percentage="60" :stroke-width="6" />
        <DMobileProgress :percentage="progressVal" />
        <div class="demo-center" style="margin-top: 8px; gap: 12px;">
          <DMobileTag text="-10" type="danger" round @click="progressVal = Math.max(0, progressVal - 10)" />
          <DMobileTag text="+10" type="primary" round @click="progressVal = Math.min(100, progressVal + 10)" />
        </div>
      </DemoBlock>
    </template>

    <!-- ====== Collapse 折叠面板 ====== -->
    <template v-if="activeDemo === 'collapse'">
      <DemoBlock title="基础用法" :code="codes.collapse">
        <DMobileCollapse v-model="collapseVal" :items="collapseItems" />
      </DemoBlock>
      <DemoBlock title="手风琴">
        <DMobileCollapse v-model="collapseVal2" :items="collapseItems" accordion />
      </DemoBlock>
    </template>

    <!-- ====== Empty 空状态 ====== -->
    <template v-if="activeDemo === 'empty'">
      <DemoBlock title="基础用法" :code="codes.empty">
        <DMobileEmpty />
      </DemoBlock>
      <DemoBlock title="自定义描述">
        <DMobileEmpty description="当前没有订单数据" />
      </DemoBlock>
    </template>

    <!-- ====== NoticeBar 通知栏 ====== -->
    <template v-if="activeDemo === 'noticebar'">
      <DemoBlock title="基础用法" :code="codes.noticebar">
        <DMobileNoticeBar text="Dream UI 移动端组件库已发布，赶快来体验全新的玻璃拟态组件吧！" />
      </DemoBlock>
      <DemoBlock title="可关闭">
        <DMobileNoticeBar text="这是一条可关闭的通知" mode="closeable" />
      </DemoBlock>
    </template>

    <!-- ====== CountDown 倒计时 ====== -->
    <template v-if="activeDemo === 'countdown'">
      <DemoBlock title="基础用法" :code="codes.countdown">
        <DMobileCellGroup>
          <DMobileCell title="默认格式" center>
            <template #extra><DMobileCountDown :time="cdTime" /></template>
          </DMobileCell>
          <DMobileCell title="自定义格式" center>
            <template #extra><DMobileCountDown :time="cdTime" format="DD 天 HH 时 mm 分" /></template>
          </DMobileCell>
        </DMobileCellGroup>
      </DemoBlock>
    </template>

    <!-- ====== Skeleton 骨架屏 ====== -->
    <template v-if="activeDemo === 'skeleton'">
      <DemoBlock title="带头像" :code="codes.skeleton">
        <DMobileSkeleton :loading="true" avatar title :row="3" />
      </DemoBlock>
      <DemoBlock title="不带头像">
        <DMobileSkeleton :loading="true" title :row="4" />
      </DemoBlock>
    </template>

    <!-- ====== SwipeCell 滑动单元格 ====== -->
    <template v-if="activeDemo === 'swipecell'">
      <DemoBlock title="左滑操作" :code="codes.swipecell">
        <DMobileSwipeCell>
          <DMobileCell title="左滑试试" value="查看操作" />
          <template #right>
            <div style="display:flex; height:100%;">
              <button class="demo-swipe-btn demo-swipe-btn--warn">收藏</button>
              <button class="demo-swipe-btn demo-swipe-btn--danger">删除</button>
            </div>
          </template>
        </DMobileSwipeCell>
      </DemoBlock>
    </template>

    <!-- ====== HorizontalPicker 横向选择器 ====== -->
    <template v-if="activeDemo === 'hpicker'">
      <DemoBlock title="基础用法" :code="codes.hpicker">
        <DMobileHorizontalPicker v-model="hpVal" :options="hpOptions" :height="60" />
        <p class="demo-block__result">当前选中：{{ hpVal || '未选择' }}</p>
      </DemoBlock>
    </template>

    <!-- ====== GridCard 网格卡片 ====== -->
    <template v-if="activeDemo === 'gridcard'">
      <DemoBlock title="多图网格" :code="codes.gridcard">
        <DMobileGridCard
          v-for="(c, i) in gridCards"
          :key="i"
          :title="c.title"
          :items="c.items"
          style="margin-bottom: 16px"
        />
      </DemoBlock>
    </template>

    <!-- ====== BackTop 回到顶部 ====== -->
    <template v-if="activeDemo === 'backtop'">
      <DemoBlock title="向下滚动页面" :code="codes.backtop">
        <div v-for="i in 25" :key="i" class="demo-scroll-item">
          <span>列表项 {{ i }}</span>
        </div>
      </DemoBlock>
      <DMobileBackTop :visibility-height="100" />
    </template>
  </div>
</template>

<script setup lang="ts">
/**
 * MobileDemo - 移动端组件演示页面（用于 iframe 嵌入）
 * @author buchi
 * @since 2026-02-09
 */
import { ref, computed, onMounted, onBeforeUnmount, watch, defineComponent, h } from 'vue'
import {
  DMobileNavBar, DMobileTabBar, DMobileTabs,
  DMobileCell, DMobileCellGroup,
  DMobileTag, DMobileDivider, DMobileEmpty, DMobileLoading,
  DMobilePopup, DMobileActionSheet, DMobileDialog, DMobileToast, DMobileSwipeCell,
  DMobileField, DMobileSwitch, DMobileSearchBar,
  DMobileStepper, DMobileNumberKeyboard, DMobilePasswordInput, DMobilePicker,
  DMobileProgress, DMobileCollapse, DMobileNoticeBar,
  DMobileCountDown, DMobileSkeleton,
  DMobileHorizontalPicker, DMobileGridCard, DMobileBackTop,
} from '../components/dream-mobile'

// ========== DemoBlock 子组件 ==========
const DemoBlock = defineComponent({
  name: 'DemoBlock',
  props: { title: { type: String, default: '' }, code: { type: String, default: '' } },
  setup(props, { slots }) {
    const open = ref(false)
    return () => h('div', { class: 'demo-block' }, [
      h('div', { class: 'demo-block__head' }, [
        h('p', { class: 'demo-block__title' }, props.title),
        props.code ? h('span', {
          class: ['demo-block__code-btn', open.value ? 'demo-block__code-btn--open' : ''],
          onClick: () => { open.value = !open.value }
        }, '{ }') : null,
      ]),
      slots.default?.(),
      open.value && props.code ? h('pre', { class: 'demo-block__code' }, h('code', null, props.code)) : null,
    ])
  }
})

// ========== 导航分组 ==========
const navGroups = [
  {
    title: '导航',
    items: [
      { key: 'navbar', label: 'NavBar 导航栏', tag: 'DMobileNavBar' },
      { key: 'tabbar', label: 'TabBar 标签栏', tag: 'DMobileTabBar' },
      { key: 'tabs', label: 'Tabs 标签页', tag: 'DMobileTabs' },
    ],
  },
  {
    title: '基础',
    items: [
      { key: 'cell', label: 'Cell 单元格', tag: 'DMobileCell' },
      { key: 'tag', label: 'Tag 标签', tag: 'DMobileTag' },
      { key: 'divider', label: 'Divider 分隔线', tag: 'DMobileDivider' },
      { key: 'empty', label: 'Empty 空状态', tag: 'DMobileEmpty' },
      { key: 'loading', label: 'Loading 加载', tag: 'DMobileLoading' },
    ],
  },
  {
    title: '表单',
    items: [
      { key: 'field', label: 'Field 输入框', tag: 'DMobileField' },
      { key: 'switch', label: 'Switch 开关', tag: 'DMobileSwitch' },
      { key: 'searchbar', label: 'SearchBar 搜索栏', tag: 'DMobileSearchBar' },
      { key: 'stepper', label: 'Stepper 步进器', tag: 'DMobileStepper' },
      { key: 'passwordinput', label: 'PasswordInput 密码', tag: 'DMobilePasswordInput' },
      { key: 'picker', label: 'Picker 选择器', tag: 'DMobilePicker' },
    ],
  },
  {
    title: '反馈',
    items: [
      { key: 'popup', label: 'Popup 弹出层', tag: 'DMobilePopup' },
      { key: 'dialog', label: 'Dialog 对话框', tag: 'DMobileDialog' },
      { key: 'actionsheet', label: 'ActionSheet 动作面板', tag: 'DMobileActionSheet' },
      { key: 'toast', label: 'Toast 轻提示', tag: 'DMobileToast' },
    ],
  },
  {
    title: '展示',
    items: [
      { key: 'progress', label: 'Progress 进度条', tag: 'DMobileProgress' },
      { key: 'collapse', label: 'Collapse 折叠面板', tag: 'DMobileCollapse' },
      { key: 'noticebar', label: 'NoticeBar 通知栏', tag: 'DMobileNoticeBar' },
      { key: 'countdown', label: 'CountDown 倒计时', tag: 'DMobileCountDown' },
      { key: 'skeleton', label: 'Skeleton 骨架屏', tag: 'DMobileSkeleton' },
      { key: 'gridcard', label: 'GridCard 网格卡片', tag: 'DMobileGridCard' },
      { key: 'hpicker', label: 'HorizontalPicker 横向选择', tag: 'DMobileHorizontalPicker' },
    ],
  },
  {
    title: '交互',
    items: [
      { key: 'swipecell', label: 'SwipeCell 滑动单元格', tag: 'DMobileSwipeCell' },
      { key: 'backtop', label: 'BackTop 回到顶部', tag: 'DMobileBackTop' },
    ],
  },
]

const totalComponents = computed(() => navGroups.reduce((sum, g) => sum + g.items.length, 0))

// ========== 当前激活 ==========
const activeDemo = ref('home')

const syncHash = () => {
  const hash = window.location.hash.replace('#', '')
  if (hash) activeDemo.value = hash
}

onMounted(() => {
  syncHash()
  window.addEventListener('hashchange', syncHash)
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'switchDemo') activeDemo.value = e.data.key
  })
})
onBeforeUnmount(() => { window.removeEventListener('hashchange', syncHash) })
watch(activeDemo, (val) => { window.location.hash = val === 'home' ? '' : val })

// 标题映射 — 自动从 navGroups 生成
const titleMap = computed(() => {
  const m: Record<string, string> = { home: 'Dream UI Mobile' }
  navGroups.forEach(g => g.items.forEach(i => { m[i.key] = i.label }))
  return m
})
const currentTitle = computed(() => titleMap.value[activeDemo.value] || 'Dream UI Mobile')

// ========== TabBar ==========
const activeTab = ref(0)
const activeTab2 = ref(0)
const tabBarItems = [
  { key: 0, label: '首页', icon: '🏠' },
  { key: 1, label: '分类', icon: '📋' },
  { key: 2, label: '消息', icon: '💬' },
  { key: 3, label: '我的', icon: '👤' },
]
const tabBarBadgeItems = [
  { key: 0, label: '首页', icon: '🏠' },
  { key: 1, label: '分类', icon: '📋', badge: '5' },
  { key: 2, label: '消息', icon: '💬', badge: '99+' },
  { key: 3, label: '我的', icon: '👤' },
]

// ========== Tabs ==========
const activeTabName = ref('tab1')
const tabsList = [
  { name: 'tab1', title: '全部' },
  { name: 'tab2', title: '进行中' },
  { name: 'tab3', title: '已完成' },
]

// ========== Field ==========
const fieldVal1 = ref('')
const fieldVal2 = ref('')
const fieldVal3 = ref('')

// ========== Switch ==========
const switchVal1 = ref(true)
const switchVal2 = ref(true)
const switchVal3 = ref(true)

// ========== Popup ==========
const popupVisible = ref(false)
const popupPos = ref<'top' | 'bottom' | 'left' | 'right' | 'center'>('bottom')
const showPopup = (pos: typeof popupPos.value) => { popupPos.value = pos; popupVisible.value = true }
const popupStyle = computed(() => {
  if (popupPos.value === 'center') return { padding: '40px 30px' }
  if (['left', 'right'].includes(popupPos.value)) return { padding: '40px 20px', minHeight: '200px', display: 'flex', alignItems: 'center' }
  return { padding: '40px 20px' }
})

// ========== Dialog ==========
const dialog1 = ref(false)
const dialog2 = ref(false)

// ========== ActionSheet ==========
const actionSheet1 = ref(false)
const actionSheet2 = ref(false)

// ========== Toast ==========
const toastVisible = ref(false)
const toastMsg = ref('')
const toastType = ref<'text' | 'success' | 'fail' | 'loading'>('text')
const showToast = (type: typeof toastType.value, msg: string) => {
  toastType.value = type; toastMsg.value = msg; toastVisible.value = true
}

// ========== SearchBar ==========
const searchVal = ref('')
const searchVal2 = ref('')

// ========== Stepper ==========
const stepVal1 = ref(1)
const stepVal2 = ref(10)
const stepVal4 = ref(1)

// ========== PasswordInput ==========
const pwdVal = ref('')
const kbShow = ref(false)
const onKbInput = (key: string) => { if (pwdVal.value.length < 6) pwdVal.value += key }
const onKbDel = () => { pwdVal.value = pwdVal.value.slice(0, -1) }

// ========== Picker ==========
const pickerShow = ref(false)
const pickerResult = ref('')
const onPickerConfirm = (vals: string[]) => { pickerResult.value = vals.join(' ') }

// ========== Progress ==========
const progressVal = ref(50)

// ========== Collapse ==========
const collapseVal = ref<string[]>([])
const collapseVal2 = ref<string[]>([])
const collapseItems = [
  { name: 'a', title: '什么是玻璃拟态？', content: 'Glassmorphism 是一种 UI 设计风格，通过磨砂玻璃效果、半透明背景、边缘光晕营造深度层次感。' },
  { name: 'b', title: '如何使用组件？', content: '通过 import { DMobileXxx } from "dream-ui/dream-mobile" 导入，然后在 template 中使用即可。' },
  { name: 'c', title: '是否支持暗色主题？', content: '当然！Dream UI 天然适配深色背景，所有组件基于透明度和 CSS 变量实现主题适配。' },
]

// ========== CountDown ==========
const cdTime = 30 * 60 * 60 * 1000

// ========== HorizontalPicker ==========
const hpVal = ref('')
const hpOptions = [
  { label: '全部', value: 'all' }, { label: '上衣', value: 'top' },
  { label: '裤装', value: 'pants' }, { label: '鞋靴', value: 'shoes' },
  { label: '配饰', value: 'acc' }, { label: '包袋', value: 'bags' },
  { label: '运动', value: 'sports' },
]

// ========== GridCard ==========
const gridCards = [
  { title: '12 件上衣', items: Array.from({ length: 12 }, (_, i) => ({ id: `t${i}`, label: `上衣${i + 1}` })) },
  { title: '4 件裤装', items: Array.from({ length: 4 }, (_, i) => ({ id: `p${i}`, label: `裤装${i + 1}` })) },
  { title: '1 件外套', items: [{ id: 'j0', label: '外套1' }] },
]

// ========== 代码示例 ==========
const codes: Record<string, string> = {
  navbar: `<DMobileNavBar title="页面标题" />`,
  navbarBack: `<DMobileNavBar title="标题" left-arrow left-text="返回" />`,
  tabbar: `<DMobileTabBar
  v-model="active"
  :items="[
    { key: 0, label: '首页', icon: '🏠' },
    { key: 1, label: '分类', icon: '📋' },
  ]"
/>`,
  tabbarBadge: `<DMobileTabBar
  v-model="active"
  :items="[
    { key: 0, label: '消息', icon: '💬', badge: '99+' },
  ]"
/>`,
  tabs: `<DMobileTabs
  v-model="active"
  :tabs="[
    { name: 'tab1', title: '全部' },
    { name: 'tab2', title: '进行中' },
  ]"
>
  <div>当前标签内容</div>
</DMobileTabs>`,
  cell: `<DMobileCellGroup>
  <DMobileCell title="单元格" value="内容" />
  <DMobileCell title="单元格" value="内容" label="描述信息" />
</DMobileCellGroup>`,
  field: `<DMobileField
  v-model="value"
  label="用户名"
  placeholder="请输入用户名"
  clearable
/>`,
  switchDemo: `<DMobileSwitch v-model="checked" />
<DMobileSwitch v-model="val" disabled />
<DMobileSwitch v-model="val" loading />`,
  tag: `<DMobileTag text="默认" />
<DMobileTag text="主要" type="primary" />
<DMobileTag text="成功" type="success" round />
<DMobileTag text="可关闭" type="danger" closeable />`,
  divider: `<DMobileDivider />
<DMobileDivider text="文字" />
<DMobileDivider text="左侧" content-position="left" />`,
  popup: `<DMobileCell title="底部弹出" is-link @click="show = true" />
<DMobilePopup v-model="show" position="bottom" closeable>
  <div>弹出内容</div>
</DMobilePopup>`,
  dialog: `<DMobileDialog
  v-model="show"
  title="提示"
  message="确定要执行吗？"
  show-cancel-button
/>`,
  actionsheet: `<DMobileActionSheet
  v-model="show"
  :actions="[
    { name: '选项一' },
    { name: '选项二' },
  ]"
/>`,
  toast: `<DMobileCell title="成功提示" @click="showToast('success', '操作成功')" />
<DMobileToast v-model="show" message="操作成功" type="success" />`,
  loading: `<DMobileLoading />
<DMobileLoading text="加载中..." />
<DMobileLoading text="正在加载" vertical />`,
  searchbar: `<DMobileSearchBar v-model="value" placeholder="搜索..." />`,
  stepper: `<DMobileStepper v-model="value" />
<DMobileStepper v-model="value" :step="5" :max="100" />`,
  passwordinput: `<DMobilePasswordInput
  :value="pwd"
  :focused="showKeyboard"
  @focus="showKeyboard = true"
/>
<DMobileNumberKeyboard v-model="showKeyboard" />`,
  picker: `<DMobilePicker
  v-model="show"
  title="选择城市"
  :columns="[['北京', '上海', '广州']]"
  @confirm="onConfirm"
/>`,
  progress: `<DMobileProgress :percentage="50" />
<DMobileProgress :percentage="80" :stroke-width="6" />`,
  collapse: `<DMobileCollapse
  v-model="active"
  :items="[
    { name: 'a', title: '标题', content: '内容文字' },
  ]"
/>`,
  empty: `<DMobileEmpty description="暂无数据" />`,
  noticebar: `<DMobileNoticeBar text="这是一条滚动通知信息" />
<DMobileNoticeBar text="可关闭" mode="closeable" />`,
  countdown: `<DMobileCountDown :time="30 * 60 * 1000" />`,
  skeleton: `<DMobileSkeleton :loading="true" avatar title :row="3" />`,
  swipecell: `<DMobileSwipeCell>
  <DMobileCell title="左滑试试" value="操作" />
  <template #right>
    <button>删除</button>
  </template>
</DMobileSwipeCell>`,
  hpicker: `<DMobileHorizontalPicker
  v-model="value"
  :options="[
    { label: '全部', value: 'all' },
    { label: '上衣', value: 'top' },
  ]"
/>`,
  gridcard: `<DMobileGridCard
  title="12 件上衣"
  :items="items"
/>`,
  backtop: `<DMobileBackTop :visibility-height="100" />`,
}
</script>

<style lang="scss">
body:has(.mobile-demo) { background: transparent !important; }

.mobile-demo {
  min-height: 100vh;
  position: relative;
  color: rgba(255, 255, 255, 0.95);
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  background: transparent;

  /* ===== DemoBlock ===== */
  .demo-block {
    padding: 0 16px 16px;

    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0 12px;
    }

    &__title {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.45);
      margin: 0;
      padding: 0;
    }

    &__code-btn {
      font-size: 12px;
      font-family: 'SF Mono', 'Fira Code', monospace;
      color: rgba(255, 255, 255, 0.30);
      cursor: pointer;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.2s;
      -webkit-tap-highlight-color: transparent;

      &:active, &--open {
        color: rgba(125, 211, 252, 0.8);
        border-color: rgba(125, 211, 252, 0.25);
        background: rgba(125, 211, 252, 0.06);
      }
    }

    &__code {
      margin: 12px 0 0;
      padding: 12px;
      font-size: 11px;
      line-height: 1.6;
      font-family: 'SF Mono', 'Fira Code', monospace;
      color: rgba(125, 211, 252, 0.75);
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      overflow-x: auto;
      white-space: pre;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.02);

      code { font: inherit; color: inherit; }
    }

    &__result {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      margin: 12px 0 0;
    }
  }

  /* ===== 首页 ===== */
  .demo-home {
    &__header {
      text-align: center;
      padding: 30px 20px 20px;
    }
    &__logo {
      font-size: 36px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 8px;
    }
    &__title {
      font-size: 22px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      margin: 0 0 6px;
      letter-spacing: -0.02em;
    }
    &__desc {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.4);
      margin: 0 0 16px;
    }
  }

  /* ===== 辅助 ===== */
  .demo-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .demo-center {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }

  .demo-swipe-btn {
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-size: 13px;
    color: #fff;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    &--primary { background: rgba(96, 165, 250, 0.85); }
    &--warn { background: rgba(251, 191, 36, 0.85); }
    &--danger { background: rgba(248, 113, 113, 0.85); }
  }

  .demo-scroll-item {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
