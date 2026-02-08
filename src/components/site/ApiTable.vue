<template>
  <div class="api-table">
    <h4 class="api-table__title">{{ title }}</h4>
    <div class="api-table__wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows" :key="i">
            <td v-for="(col, j) in columns" :key="j">
              <code v-if="j === 0" class="api-table__name">{{ row[col] }}</code>
              <span v-else>{{ row[col] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * ApiTable - Props / Events / Slots API 文档表格
 * @author buchi
 * @since 2026-02-08
 */
defineOptions({ name: 'ApiTable' })

defineProps<{
  title: string
  columns: string[]
  rows: Record<string, string>[]
}>()
</script>

<style scoped lang="scss">
.api-table {
  margin-top: var(--dream-space-2xl);

  &__title {
    font-size: var(--dream-text-lg);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
    margin: 0 0 var(--dream-space-md);
  }

  &__wrapper {
    overflow-x: auto;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--dream-radius-md);
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.02);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--dream-text-sm);
  }

  thead {
    background: rgba(255, 255, 255, 0.04);
  }

  th {
    text-align: left;
    padding: 10px 16px;
    color: var(--dream-text-secondary);
    font-weight: var(--dream-font-medium);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    white-space: nowrap;
  }

  td {
    padding: 10px 16px;
    color: var(--dream-text-secondary);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  tr:last-child td {
    border-bottom: none;
  }

  &__name {
    font-family: var(--dream-font-mono);
    font-size: 12px;
    background: rgba(255, 255, 255, 0.06);
    padding: 2px 6px;
    border-radius: 4px;
    color: var(--dream-text-primary);
  }
}
</style>
