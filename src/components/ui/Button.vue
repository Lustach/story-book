<template>
  <button
    :id="id"
    :style="cssVars"
    :disabled="disabled"
    class="primary-button"
    :class="{ 'no-decoration': noDecoration, loading }"
    :data-qa="dataQa"
    @click="loading ? () => {} : $emit('click', $event)"
  >
    <loadingIcon v-if="loading" class="rotating" />
    <slot v-else />
  </button>
</template>

<script>
import loadingIcon from '@/assets/icons/load-btn.svg'

export default {
  components: { loadingIcon },
  name: 'PrimaryButton',
  props: {
    isIcon: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: '#6A4BFF'
    },
    loading: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#FFFFFF'
    },
    hoverColor: {
      type: String,
      default: '#FFFFFF'
    },
    hoverBgColor: {
      type: String,
      default: '#1A53F0'
    },
    noDecoration: {
      type: Boolean,
      default: false
    },
    boxShadow: {
      type: String,
      default: '0px 0px 25px rgba(106, 75, 255, 0.3)'
    },
    border: {
      type: String,
      default: 'none'
    },
    hoverBorder: {
      type: String,
      default: 'none'
    },
    dataQa: {
      type: [String, null],
      default: null
    },
    id: {
      type: String
    }
  },
  emits: ['click'],
  computed: {
    cssVars() {
      return {
        '--backgroundColor': this.bgColor,
        '--textColor': this.color,
        '--hoveredColor': this.hoverColor,
        '--hoverededBgColor': this.hoverBgColor,
        '--buttonShadow': this.boxShadow,
        '--buttonBorder': this.border,
        '--buttonHoverBorder': this.hoverBorder
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.primary-button {
  width: 200px;
  min-height: 60px;
  border-radius: 50px;
  box-shadow: var(--buttonShadow);
  font-family: 'Panton_SemiBold';
  font-size: 20px;
  line-height: 24px;
  background: var(--backgroundColor);
  color: var(--textColor);
  border: var(--buttonBorder);
  z-index: 1;
  @include lg {
    width: 160px;
    min-height: 56px;
    font-size: 14px;
    line-height: 17px;
  }
  @include md {
    width: 120px;
    min-height: 40px;
    font-size: 14px;
    line-height: 17px;
  }
  &:hover {
    background: var(--hoverededBgColor);
    color: var(--hoveredColor);
    border: var(--buttonHoverBorder);
  }
  &:disabled,
  & [disabled] {
    background: $too-ligth-blue;
    cursor: pointer;
    box-shadow: none;
    pointer-events: none;
  }

  &.loading {
    background: #c3ceeb;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 7px;
    }
  }
}
.social-button {
  width: 114px;
  height: 60px;
  background: $white;
  border: 1px solid $too-ligth-blue;
  border-radius: 8px;
  &:hover {
    border-color: transparent;
    box-shadow: 0px 15px 50px rgba(80, 100, 124, 0.1), 0px 10px 15px rgba(80, 100, 124, 0.16);
    & svg {
      fill: $black;
    }
  }
  &--disabled {
    cursor: not-allowed;
    background: #e2e8ef;
    &:hover {
      border-color: $too-ligth-blue;
      box-shadow: none;
      & svg {
        fill: rgb(26, 83, 240);
      }
    }
  }
}
.edit-button {
  background: $orange-with-op;
  color: $orange;
  height: 30px;
  min-width: 40px;
  font-family: 'Panton_Bold';
  font-size: 14px;
  line-height: 17px;
  border-radius: 4px;
  position: relative;

  @include md {
    font-size: 12px;
  }

  &:hover {
    background: $ligth-blue-with-op;
    color: $ligth-blue;
  }
  &:disabled,
  & [disabled] {
    background: $mid-gray-with-op;
    cursor: pointer;
    color: $mid-gray;
  }
}
.icon-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: var(--bgColor);

  &:hover {
    background: $blue;
  }

  & svg {
    height: 50%;
    fill: $white;
  }
}
.no-decoration {
  font-family: 'Panton_Bold';
  font-size: 18px;
  line-height: 27px;
  color: $too-dark-blue;
  width: auto;
  min-height: auto;
  box-shadow: none;
  text-decoration: underline;
  background: none;
  @include md {
    width: auto;
    min-height: auto;
  }
  &:hover {
    background: none;
    color: $blue;
    box-shadow: none;
  }
  &:disabled,
  & [disabled] {
    background: none;
    cursor: pointer;
    box-shadow: none;
    color: $mid-gray;
  }
}

@-webkit-keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}
</style>
