export interface Entries {
  entries: PostData[]
}

export interface PostData {
  title: string
  url: string
  created_at: string
}

export interface PostDataProps {
  postData: PostData
}

export interface PostDataListProps {
  postDataList: PostData[]
}
