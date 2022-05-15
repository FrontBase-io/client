import { ColourType } from '../../Types/System'

export const colour = (colour: ColourType) =>
  `rgb(${colour.r}, ${colour.g}, ${colour.b})`
