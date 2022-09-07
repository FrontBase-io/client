import { ColorType } from '../Types/Data'

export const getColor = (color: ColorType) =>
  `rgb(${color.r},${color.g},${color.b})`

function ColorToHex(color: number) {
  var hexadecimal = color.toString(16)
  return hexadecimal.length == 1 ? '0' + hexadecimal : hexadecimal
}

export const getHex = (color: ColorType) =>
  `#${ColorToHex(color.r)}${ColorToHex(color.g)}${ColorToHex(color.b)}`
