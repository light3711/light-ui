import { useState } from "react"

export const useGetPageData = (pageSize, array) => {
    const [page, setPage] = useState(1)
    const newArray = [...array]
    let r = [[]]
    for (let i = 0; i < Math.ceil(newArray.length / pageSize); i++) {
      let start = i * pageSize
      let end = start + pageSize
      r.push(newArray.slice(start, end))
    }
    const _result = r[page]

    return { sourceResult: _result, page, setPage, newArray: r }

  }