import type { IImage } from "~/types"

export interface IDesign {
    img: IImage,
    id: string,
    name: string,
    design_id: number,
    is_published: boolean
}