<template>
  <div
    class="typeahead typeahead--searchable position-relative"
    ref="reference"
    :id="selectId"
    :aria-disabled="props.disabled"
    :class="{ 'typeahead--disabled': props.disabled }"
  >
    <div
      :id="`${selectId}_typeahead__combobox`"
      role="combobox"
      :aria-expanded="isDropDownOpen"
      ref="typeAheadContainer"
      :aria-owns="`${selectId}_typeahead__listbox`"
      :class="{ 'typeahead--open': isDropDownOpen }"
      aria-label="search for options"
      class="typeahead__dropdown-toggle position-relative"
    >
      <div class="typeahead__selected-options" @click="handleOptionsClick">
        <span
          class="typeahead__selected"
          :style="ghostOpacityDynamicStyles"
          ref="selectedPlaceholderRef"
          :class="{ 'is-placeholder': isPlaceholder }"
          v-if="!hasInput"
          >{{ ghostValue || model?.text || placeholder }}</span
        >
        <input
          type="search"
          :id="`${selectId}_typeahead__search`"
          aria-autocomplete="list"
          :aria-labelledby="`${selectId}_typeahead__combobox`"
          :aria-controls="`${selectId}_typeahead__listbox`"
          autocomplete="off"
          ref="typeaheadQuery"
          @focus="handleDropdownClick"
          :aria-activedescendant="`${selectId}_option_${hoverIndex}`"
          v-model="query"
          class="typeahead__search"
        />
      </div>
      <div class="typeahead__actions ps-space-xxs">
        <button
          type="button"
          v-if="isDisplayClearButton"
          title="clear selected"
          tabindex="0"
          @click="clearSelected"
          aria-label="clear selected"
          class="typeahead__action me-space-xxs"
          :class="actionClasses"
        >
          <font-awesome-icon icon="fa-close" />
        </button>
        <button
          type="button"
          class="typeahead__action me-space-xxs"
          :class="actionClasses"
          aria-label="expand selection"
          @click="handleDropdownClick"
        >
          <font-awesome-icon
            icon="fa-angle-down"
            :class="{ 'fa-rotate-180': isDropDownOpen }"
            class="typeahead__dropdown-icon"
          />
        </button>
      </div>
    </div>

    <Transition
      name="fade"
      @before-leave="handleCollapseHide"
      @enter="handleCollapseShown"
    >
      <ul
        :id="`${selectId}_typeahead__listbox`"
        role="listbox"
        :style="{ ...dynamicStyles, ...floatingStyles }"
        v-show="isDropDownOpen"
        tabindex="-1"
        ref="dropdownList"
        class="typeahead__dropdown-menu"
        :class="{ 'typeahead__dropdown-menu--shown': isDropDownOpen }"
      >
        <template v-if="results.length > 0">
          <li
            v-for="({ item }, i) in results"
            role="option"
            :value="item.value"
            :id="`${selectId}_option_${i}`"
            @mouseenter="handleHover(i, item)"
            class="typeahead__dropdown-option"
            :class="{
              'typeahead__dropdown-option--highlighted': hoverIndex === i,
            }"
            :ref="(el) => functionRef(el, i)"
            @click="handleChangeOption(item)"
          >
            {{ item.text }}
          </li>
        </template>
        <template v-else>
          <li class="typeahead__dropdown-option--empty">No results found.</li>
        </template>
      </ul>
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { onClickOutside, onKeyStroke, useCssVar } from '@vueuse/core'
import type { FuseResult } from 'fuse.js'
import { useFuse, type UseFuseOptions } from '@vueuse/integrations/useFuse'
import { ref, reactive, computed, watch, onBeforeUpdate } from 'vue'
/*
 ********************************************
 *  types
 ********************************************
 */

type OptionType = {
  value: string
  text: string
  category?: string
  areaOfInterestOptions?: string[]
}
type Props = {
  options: OptionType[]
  placeholder?: string
  isEditable?: boolean
  height?: string
  highlightBgColor?: string
  highlightTextColor?: string
  actionVarint?: string
  disabled?: boolean
  preselectOpacity?: string
  id: string
  clearable?: boolean
}

/*
 ********************************************
 *  data
 ********************************************
 */
const isDropDownOpen = ref<boolean>(false)
const query = ref<string>('')
const typeAheadContainer = ref<HTMLElement | null>(null)
const typeaheadQuery = ref<HTMLElement | null>(null)
const hoverIndex = ref<number>(0)
const isHoverActive = ref<boolean>(false)
const dropdownList = ref<HTMLElement | null>(null)
const selectedPlaceholderRef = ref<HTMLElement | null>(null)
const resultElements = ref<
  Array<Element | globalThis.ComponentPublicInstance | null> | []
>([])
const selectedElement = ref<HTMLElement | null>(null)
/*
 ********************************************
 *  props
 ********************************************
 */
const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search for options',
  height: '350px',
  highlightBgColor: 'secondary',
  highlightTextColor: 'dark-3',
  actionVarint: 'dark-2',
  preselectOpacity: '0.4',
  disabled: false,
  clearable: true,
})

/**
 * Emits for TypeAheadSelect component.
 *
 * @emits hidden - Emitted when the dropdown is hidden.
 * @emits shown - Emitted when the dropdown is shown.
 * @emits changed - Emitted after a user initiated change of the modal value.
 * @emits searching - Emitted when searching is performed.
 * @emits cleared - Emitted when the input is cleared.
 */
const emits = defineEmits<{
  (e: 'hidden'): void
  (e: 'shown'): void
  (e: 'changed', val: OptionType | null): void
  (e: 'searching', query: string): void
  (e: 'cleared'): void
}>()

/*
 ********************************************
 * external composable
 ********************************************
 */

//  2 way binding
const model = defineModel<OptionType | null>({ required: true })

const reference = ref(null)
const { floatingStyles } = useFloating(reference, dropdownList, {
  whileElementsMounted: autoUpdate,
  strategy: 'absolute',
  open: isDropDownOpen,
  transform: false,
  placement: 'bottom',
  middleware: [flip(), offset(-2.2), shift()],
})

onClickOutside(typeAheadContainer, () => {
  handleDropDownClose()
  selectedElement.value = null
  query.value = ''
})

const fuseOptions: UseFuseOptions<OptionType> = {
  fuseOptions: {
    keys: ['text'],
    isCaseSensitive: false,
    includeScore: false,
    useExtendedSearch: true,
    includeMatches: true,
    minMatchCharLength: 1,
    shouldSort: true,
    findAllMatches: false,
    location: 0,
    threshold: 0.4,
    distance: 300,
  },
  matchAllWhenSearchEmpty: true,
}

const searchOptions = ref<OptionType[]>([])
const { results } = useFuse(query, searchOptions, fuseOptions)

const hoverColor = useCssVar(
  `--rds-${props.highlightBgColor}`,
  typeAheadContainer
)
const hoverTextColor = useCssVar(
  `--rds-${props.highlightTextColor}`,
  typeAheadContainer
)
onKeyStroke('ArrowDown', (e) => {
  if (isDropDownOpen.value) {
    e.preventDefault()
    if (hoverIndex.value < results.value.length - 1) {
      hoverIndex.value++
    }
  }
})
// arrow up
onKeyStroke('ArrowUp', (e: Event) => {
  if (isDropDownOpen.value) {
    if (hoverIndex.value > 0) {
      e.preventDefault()
      hoverIndex.value--
    }
  }
})
onKeyStroke(['Tab', 'Escape'], () => {
  if (isDropDownOpen.value) {
    handleDropDownClose()
  }
})
// enter
onKeyStroke('Enter', (e: Event) => {
  if (isDropDownOpen.value) {
    e.preventDefault()
    handleChangeOption(results.value[hoverIndex.value].item)
    query.value = ''
    typeaheadQuery.value?.blur()
  }
})
const handleOptionsClick = () => {
  typeaheadQuery.value?.focus()
}
/*
 ********************************************
 *  computed
 ********************************************
 */

const ghostValue = computed<string | null>(() => {
  return selectedElement.value?.innerText as string
})

const isDisplayClearButton = computed(() => {
  return model.value !== null && props.clearable
})

const selectId = computed(() => props.id)

const hasInput = computed(() => query.value !== '')
const isPlaceholder = computed(() => {
  return model.value === null && isDropDownOpen.value === false
})
const dynamicStyles = computed(() => {
  return {
    '--dropdown-height': props.height,
    '--highlight-bg-color': hoverColor.value,
    '--highlight-text-color': hoverTextColor.value,
  }
})

const ghostOpacityDynamicStyles = computed(() => {
  return {
    '--typeahead-preselect-opacity': props.preselectOpacity,
  }
})

const actionClasses = computed(() => {
  return `text-${props.actionVarint}`
})

const functionRef = (
  el: Element | globalThis.ComponentPublicInstance | null,
  index: number
) => {
  resultElements.value[index] = el
}

/*
 ********************************************
 *  watch
 ********************************************
 */
watch(query, (newVal) => {
  emits('searching', newVal)
  hoverIndex.value = 0
})

watch(model, (val) => {
  if (val == null) {
    handleDropDownClose()
    selectedElement.value = null
  }
})

watch(hoverIndex, () => {
  selectedElement.value = resultElements.value[hoverIndex.value] as HTMLElement
  selectedElement.value.scrollIntoView({ block: 'nearest' })
})

watch(isDropDownOpen, (val) => {
  if (val === true) {
    emits('shown')
  } else {
    emits('hidden')
  }
})

/*
 ********************************************
 *  Methods
 ********************************************
 */
const handleDropdownClick = (e: Event) => {
  if (isDropDownOpen.value === true) {
    isDropDownOpen.value = false
  } else {
    hoverIndex.value = 0
    if (model.value !== null && !hasInput.value) {
      const selectedIndex = results.value.findIndex(
        (result: FuseResult<OptionType>) =>
          result.item.value === model.value?.value
      )
      hoverIndex.value = selectedIndex !== -1 ? selectedIndex : 0
    }
    typeaheadQuery.value?.focus()
    isDropDownOpen.value = true
  }
}
const clearSelected = () => {
  model.value = null
  query.value = ''
  typeaheadQuery.value?.focus()
  emits('changed', model.value)
  emits('cleared')
}
const handleChangeOption = (option: OptionType) => {
  model.value = option
  handleDropDownClose()
}
const handleHover = (i: number, item: OptionType) => {
  hoverIndex.value = i
  isHoverActive.value = true
}
const handleDropDownClose = () => {
  isDropDownOpen.value = false
}

const handleCollapseHide = (el: Element) => {
  ;(el as HTMLElement).style.pointerEvents = 'none'
}
const handleCollapseShown = (el: Element) => {
  ;(el as HTMLElement).style.pointerEvents = 'auto'
}
watch(model, (val) => {
  emits('changed', model.value)
})
onBeforeUpdate(() => {
  searchOptions.value = props.options
})
</script>
<style lang="scss" scoped>
.typeahead--open {
  .typeahead__selected {
    position: absolute;
    opacity: var(--typeahead-preselect-opacity);
  }
}
.typeahead {
  position: relative;
  .is-placeholder {
    opacity: var(--typeahead-preselect-opacity);
    color: #191919;
  }
  &--disabled {
    opacity: var(--typeahead-preselect-opacity);
    pointer-events: none;
    cursor: not-allowed;
  }
  &__dropdown-toggle {
    display: flex;
    background-color: var(--rds-body-bg);
    border: 1px solid var(--rds-border-color);
    border-radius: var(--rds-border-radius-sm);
    white-space: normal;
    padding: 8px;
  }
  &__selected-options {
    display: flex;
    flex-basis: 100%;
    flex-grow: 1;
    flex-wrap: nowrap;
    padding: 0 2px;
    position: relative;
    overflow: hidden;
  }
  &__selected {
    display: flex;
    align-self: center;
    font-size: var(--rds-font-size);
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 120px;
  }
  &__actions {
    display: flex;
    align-items: center;
  }
  &__search {
    flex-grow: 1;
    padding: 0;
    margin: 0;
    position: relative;
    z-index: 5;
    background-color: transparent;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--rds-text-color);
    appearance: none;
    border: 1px solid transparent;
    box-shadow: none;
    z-index: 1;
    width: 0;
    max-width: 100%;
    outline: none;
  }
  &__action {
    appearance: none;
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;

    & svg {
      height: 1.5rem;
      transition: transform 0.15s;
    }
  }
  &__dropdown {
    &-menu {
      width: 100%;
      z-index: 1000;
      padding: 5px 0;
      margin: 0.125rem 0 0;
      font-size: 1rem;
      color: var(--rds-text-color);
      text-align: left;
      list-style: none;
      background-color: var(--rds-body-bg);
      background-clip: padding-box;
      border: var(--rds-border-width) solid var(--rds-border-color);
      border-top: 0;
      border-radius: 0 0 var(--rds-border-radius-sm),
        var(--rds-border-radius-sm);
      max-height: var(--dropdown-height);
      margin: 0;
      min-width: 100%;
      vertical-align: top;
      overflow-y: scroll;
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
    }
    &-option {
      padding: 8px 12px;
      cursor: pointer;
      background-color: var(--rds-body-bg);
      color: var(--rds-text-color);
      &--highlighted {
        background-color: var(--highlight-bg-color);
        color: var(--highlight-text-color);
      }
      &--empty {
        padding: 8px 12px;
        color: var(--rds-text-color);
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
