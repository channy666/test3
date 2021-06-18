const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'

function getPrize(cb) {
  let request = new XMLHttpRequest()
  const errorMessage = '系統不穩定，請再試一次'
  request.open('GET', apiUrl, true)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      let data 
      try {
        data = JSON.parse(request.response)
      } catch(err) {
        cb(errorMessage)
        return
      }
          
      if (data.prize !== 'FIRST' && data.prize !== 'SECOND' && data.prize !== 'THIRD' && data.prize !== 'NONE') {
        cb(errorMessage)
        return
      }
      cb(null, data.prize)
    } else {
      cb(errorMessage)
      return
    }
  }
  request.onerror = function() {
    cb(errorMessage)
  }
  request.send()
}  


document.querySelector('.lottery__btn').addEventListener('click',
  (e) => {
    getPrize(function(err, prize) {
      if (err) {
        alert(err)
        return
      }

      const results = {
        FIRST: {
          className: 'first',
          content: '恭喜你中頭獎了！日本東京來回雙人遊！'
        },
        SECOND: {
          className: 'second',
          content: '二獎！90 吋電視一台！'
        },
        THIRD: {
          className: 'third',
          content: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
        },
        NONE: {
          className: 'none',
          content: '銘謝惠顧'
        }
      }
      
      const className = results[prize].className
      const content = results[prize].content
      //const {className, content} = result[prize]

      document.querySelector('.section').classList.add(className)
      document.querySelector('.result__content').innerText = content
      document.querySelector('.lottery').classList.add('hide')
      document.querySelector('.result').classList.remove('hide')
    })
  }
)


  document.querySelector('.result__btn').addEventListener('click',
  function() {
    window.location.reload()
  }
)























  /*  
    const request = new XMLHttpRequest()
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        const response = request.responseText
        const result = JSON.parse(response).prize

        if (result === 'FIRST') {
          changeClass.classList.add('first')
          resultContent.innerText = '恭喜你中頭獎了！日本東京來回雙人遊！'
          return
        }

        if (result === 'SECOND') {
          changeClass.classList.add('second')
          resultContent.innerText = '二獎！90 吋電視一台！'
          return
        }

        if (result === 'THIRD') {
          changeClass.classList.add('third')
          resultContent.innerText = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
          return
        }

        if (result === "NONE") {
          changeClass.classList.add('none')
          resultContent.innerText = '銘謝惠顧'
          return
        }

        alert('系統不穩定，請再試一次')

      } else {
        alert('系統不穩定，請再試一次')
      }
    }
    
    request.onerror = function() {
      alert('系統不穩定，請再試一次')
    }

    request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true)
    request.send()

    */