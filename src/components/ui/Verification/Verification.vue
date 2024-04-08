<script setup lang="ts">
let code: string[] = Array(6)
let dataFromPaste: string[] | undefined
const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function isNumber(event: Event) {
  ;(event.currentTarget as HTMLInputElement).value = ''
  const keyPressed: string = (event as KeyboardEvent).key
  if (!keysAllowed.includes(keyPressed)) {
    event.preventDefault()
  }
}
function handleInput(event: InputEvent): void {
  const inputType = (event as InputEvent).inputType
  let currentActiveElement = event.target as HTMLInputElement

  if (inputType === 'insertText') (currentActiveElement.nextElementSibling as HTMLElement)?.focus()

  if (inputType === 'insertFromPaste' && dataFromPaste) {
    for (const num of dataFromPaste) {
      let id: number = parseInt(currentActiveElement.id.split('_')[1])
      currentActiveElement.value = num
      code[id] = num
      if (currentActiveElement.nextElementSibling) {
        currentActiveElement = currentActiveElement.nextElementSibling as HTMLInputElement
        ;(currentActiveElement as HTMLElement)?.focus()
      }
    }
  }
}
function handleDelete(event: Event) {
  let value = (event.target as HTMLInputElement).value
  let currentActiveElement = event.target as HTMLInputElement
  if (!value) (currentActiveElement.previousElementSibling as HTMLElement)?.focus()
}

function onPaste(event: Event) {
  dataFromPaste = (event as ClipboardEvent).clipboardData?.getData('text').trim().split('')
  if (dataFromPaste) {
    for (const num of dataFromPaste) {
      if (!keysAllowed.includes(num)) event.preventDefault()
    }
  }
}
</script>

<template>
  <div class="verification_container">
    <div class="verification_form">
      <form>
        <input
          v-for="(n, index) in code"
          :key="index"
          type="number"
          pattern="\d*"
          :id="'input_' + index"
          maxlength="1"
          v-model="code[index]"
          @input="handleInput"
          @keypress="isNumber"
          @keydown.delete="handleDelete"
          @paste="onPaste"
        />
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.verification {
  &_container {
    text-align: center;
    position: relative;
    margin: auto;
    height: 100px;
  }
  &_form {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

form {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 18px;
}
input[type='number'] {
  border-radius: 0.25rem;
  max-width: 150px;
  width: 100%;
  height: 50px;
  font-size: 2rem;
  text-align: center;
  caret-color: transparent !important;
  border: 2px solid;
  &:focus {
    border: 2px solid gray;
    box-shadow: 12px 5px 0 0 gray;
    outline: none;
  }
  &:active {
  }
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

@media only screen and (max-width: 1080px) {
  input[type='number'] {
    max-width: 80px;
    width: 100%;
    font-size: 2rem;
  }
}
@media only screen and (max-width: 500px) {
  form {
    gap: 8px;
  }
  input[type='number'] {
    max-width: 12vw;
    width: 100%;
    font-size: 40px;
  }
}
</style>
