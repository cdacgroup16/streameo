import { Categories } from "../categories/categories"
import { User } from "../users/user"

export class Video {
  _id: string
  title: string
  description: string
  duration: number
  category: Categories
  tags: [string]
  views: number
  language: [string]
  link_low: string
  link_med: string
  link_high: string
  privacy: string
  user: User
  active: Boolean
  poster: {
    src: string
    path: string
    size: number
    type: string
    processed: string
  }
  video: {
    path_temp: string
    path_low: string
    path_med: string
    path_high: string
    size: number
    type: string
    processed: string
  }
}
