(function({ validateUrl }){
  const urlInputId = 'urlinput'
  const urlLabelId = 'urllabel'
  const urlErrId = 'urlerr'
  const urlTransformBtnId = 'transformbutton'
  const tUrlLinkId = 'turllink'

  const urlInput = document.getElementById(urlInputId)
  const urlLabel = document.getElementById(urlLabelId)
  const urlErr = document.getElementById(urlErrId)
  const urlTransformBtn = document.getElementById(urlTransformBtnId)
  const tUrlLink = document.getElementById(tUrlLinkId)

  tUrlLink.innerText = `${window.location.protocol}//aaa-coo-lin.${window.location.host}`

  urlInput.onkeyup = () => {
    if (urlInput.value.length > 0) {
      urlLabel.classList.add('input__filled')
    } else {
      urlLabel.classList.remove('input__filled')
    }

    if (!validateUrl(urlInput.value) && urlInput.value.length > 0) {
      urlErr.classList.remove('hidden')
    } else {
      urlErr.classList.add('hidden')
    }
  }

  urlTransformBtn.onclick = () => {
    let { value } = urlInput
    if (validateUrl(value)) {
      getTransformedUrl(value)
        .then(res => res.json())
        .then(res => {
          let { url } = res
          tUrlLink.innerText = `${window.location.protocol}//${url}.${window.location.host}`
          tUrlLink.setAttribute('href', `${window.location.protocol}//${url}.${window.location.host}`)
        })
    } else {
      window.alert('URL is not valid')
    }
  }

  const getTransformedUrl = (url) => {
    return fetch('/api/', {
      method: 'POST',
      body: JSON.stringify({ url })
    })
  }
})(EXPORTS)