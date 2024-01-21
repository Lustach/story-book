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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1e5081;
  margin: auto;
}
.verification {
  &_container {
    text-align: center;
    position: relative;
    margin: auto;
    height: 100px;
  }
  &_form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

form {
  display: flex;
  flex-direction: row;
  gap: 18px;
}
input[type='number'] {
  width: 150px;
  height: 50px;
  font-size: 50px;
  text-align: center;
  caret-color: transparent !important;
  border: 2px solid;
  &:focus {
    border-color: rgb(6, 103, 194);
    box-shadow: 12px 5px 0 0;
  }
  &:active {
    border-color: rgb(0, 93, 180);
  }
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

@media only screen and (max-width: 1080px) {
  input[type='number'] {
    width: 80px;
  }
}
@media only screen and (max-width: 600px) {
  input[type='number'] {
    width: 40px;
  }
}
@media only screen and (max-width: 500px) {
  form {
    gap: 8px;
  }
  input[type='number'] {
    width: 12vw;
    font-size: 40px;
  }
}
</style>
