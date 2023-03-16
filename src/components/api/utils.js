export const getDifferedState = async (setState) => {
  let differedState
  await new Promise((resolve) =>
    setState((data) => {
      differedState = data
      resolve()
      return data
    })
  )
  return differedState
}
