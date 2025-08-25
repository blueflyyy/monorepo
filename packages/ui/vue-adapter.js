import { defineCustomElement } from 'vue'

export function createVueComponent(component) {
  return defineCustomElement(component)
}