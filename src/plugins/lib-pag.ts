export async function initPag(url: string, elementId: string) {
  try {
    const { PAGInit } = await import('libpag')
    const pag = await PAGInit({
      locateFile: (file) => {
        if (import.meta.env.MODE === 'development')
          return `${import.meta.env.BASE_URL}${file}`

        else
          return `${import.meta.env.BASE_URL}static/${file}`
      },
    })
    const response = await fetch(url)
    const blob = await response.blob()
    const file = new window.File(
      [blob],
      url.replace(/(.*\/)*([^.]+)/i, '$2'),
    )
    const pagExample = await pag.PAGFile.load(file)
    const pagViewExample = await pag.PAGView.init(pagExample, elementId)
    pagViewExample?.setRepeatCount(0)
    return pagViewExample
  }
  catch (err) {
    console.error(err)
    throw new Error('初始化pag失败')
  }
}
