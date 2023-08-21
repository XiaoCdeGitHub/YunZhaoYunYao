// JavaScript 根据需要动态加载脚本并设置参数
// refer to https://xmanyou.com/javascript-dynamically-load-script-and-set-parameters/
async function loadJsAsync(src: string, async = false, options?: any, doc?: Document) {
  return new Promise<void>((resolve, reject) => {
    const docT = doc || document
    const script = docT.createElement('script')
    script.src = src
    script.async = async
    if (options) {
      for (const key in options) {
        // script[key] = options[key];
        script.setAttribute(key, options[key])
      }
    }

    const onload = () => {
      script.removeEventListener('load', onload)
      // resolve in onload callback for async loading
      if (!async)
        resolve()
    }

    script.addEventListener('load', onload)
    script.addEventListener('error', (err) => {
      console.error(err)
      reject(new Error(`Failed to load ${src}`))
    })

    // document.head.appendChild(script);
    ;(docT.getElementsByTagName('head')[0] || docT.documentElement).appendChild(script)

    // resolve immediately for sync loading
    if (async)
      resolve()
  })
}

export { loadJsAsync }
