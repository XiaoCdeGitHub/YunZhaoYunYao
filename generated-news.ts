/* eslint-disable unicorn/prefer-node-protocol */
/* eslint-disable no-console */
import https from 'node:https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as cheerio from 'cheerio';
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

console.log('__dirname', __dirname)

const newsItem = `
<a class="news-item f-r-s-c mb-8 bg-write" href="/news-details-{{article_id}}">
  <img class="f-n" src="{{image}}">
  <div class="f-c-b-s h100 news-item-text ml-6">
    <div>
      <p class="title">{{title}}</p>
      <p class="mt-3">{{description}}</p>
    </div>
    <div>{{date}}</div>
  </div>
</a>
`
const newsMobiItem = `
<a class="news-item" href="/news-details-mobi-{{article_id}}">
<img class="news-item-img" src="{{image}}">
<div class="news-item-text">
  <div>
    <p class="title">{{title}}</p>
    <p class="sub-title">{{description}}</p>
    <div class="time">
      <img src="/img/mobi-news/clock.png" alt=""/>
      {{date}}
    </div>
  </div>
  <div></div>
</div>
</a>
`
const nginxCofItem = `
    location {{path}} {
      alias   /usr/share/nginx/html/;
      index {{htmlName}};
    }

`

/**
 * @recommendItem {string} 相关推荐
 */
const recommendItem = `
<a class="news-item" href="/news-details-mobi-{{article_id}}">
<img class="news-item-img" src="{{image}}">
<div class="news-item-text">
  <div>
    <p class="title">{{title}}</p>
    <p class="sub-title">{{description}}</p>
  </div>
  <div></div>
</div>
</a>`

const nginxCofMobiItem = `
    location {{path}} {
      alias   /usr/share/nginx/html/;
      index {{htmlName}};
    }

`

const newsImgPrefix = /http:\/\/download.yeez.tech\/img\//g
const newsImgPrefixS = /https:\/\/download.yeez.tech\/img\//g

const newsImgCdnPrefix = 'https://cdn.yeez.tech/img/news/'

let websiteConf = fs.readFileSync(path.join(__dirname, '/src/plugins/nginx.conf'), 'utf8')

function replaceImgPrefix(url: string): string {
  if (url) {
    url = url.replace(newsImgPrefix, newsImgCdnPrefix)
    url = url.replace(newsImgPrefixS, newsImgCdnPrefix)
    return url
  }
  else { return url }
}

async function init() {
  const res = await getNews()
  const list = JSON.parse((res && (res as any)) || '{}').article_list
  // console.log(list[0])
  createdNews(list)
  createdNewsMobi(list)
  createdNewsDetails(list)
  createdNewsDetailsMobi(list)
  createdNewsNginxConf(list)
  createdNewsMobiNginxConf(list)
}

function createdNews(list: any) {
  const newsVue = fs.readFileSync(path.join(__dirname, '/src/plugins/news_base.vue'), 'utf8')
  let newsList = ''
  list.forEach((i: any) => {
    i.image = replaceImgPrefix(i.image)
    let text = newsItem.replace('{{image}}', i.image)
    text = text.replace('{{title}}', i.title)
    text = text.replace('{{description}}', i.description)
    text = text.replace('{{date}}', i.date)
    text = text.replace('{{article_id}}', i.article_id)
    newsList += text
  })
  const textVue = newsVue.replace('%\'newsList\'%', newsList)
  fs.writeFile(path.join(__dirname, '/src/pages/news.vue'), textVue, 'utf8', (err) => {
    if (err)
      throw err
    // console.log('success createdNews')
  })
}
function createdNewsMobi(list: any) {
  const newsVue = fs.readFileSync(path.join(__dirname, '/src/plugins/news_base_mobi.vue'), 'utf8')
  let newsList = ''
  list.forEach((i: any) => {
    i.image = replaceImgPrefix(i.image)
    let text = newsMobiItem.replace('{{image}}', i.image)
    text = text.replace('{{title}}', i.title)
    text = text.replace('{{description}}', i.description)
    text = text.replace('{{date}}', i.date)
    text = text.replace('{{article_id}}', i.article_id)
    newsList += text
  })
  const textVue = newsVue.replace('%\'newsList\'%', newsList)
  fs.writeFile(path.join(__dirname, '/src/components/mobi/news-mobi.vue'), textVue, 'utf8', (err) => {
    if (err)
      throw err
    // console.log('success createdNews')
  })
}

function createdNewsDetails(list: any) {
  const newsDetailsVue = fs.readFileSync(path.join(__dirname, '/src/plugins/news_details.vue'), 'utf8')
  // console.log('newsDetailsVue',newsDetailsVue);
  list.forEach((i: any) => {
    const $ = cheerio.load(i.content);
    let firstParagraphText = '';
    $('p').each((index, element) => {
      const $element = $(element);
    
      if($element.text()) {
        firstParagraphText = $element.text();
        return false; 
      }
      $element.find('*').each((index, subElement) => {
        const $subElement = $(subElement);
        if($subElement.text()) {
          firstParagraphText = $subElement.text();
          return false;
        }
      });
      if(firstParagraphText) return false;
    });
    console.log('匹配到的第一个符合规则的文本---------',firstParagraphText);
    i.content = replaceImgPrefix(i.content)
    let useHead = `
  <script setup lang="ts">
    useHead({
      title: '${i.title}',
      meta: [
            {
              name: 'description',
              content: '${(firstParagraphText)}'
            },
            {
              name: 'keywords',
              content: '熠智科技,区块链,隐私计算,数据合作,数据服务产品',
            },
          ],
    })
    defineOptions({
      name: 'NewsPage',
    })
  </script>
`;
    let textVue = useHead + newsDetailsVue
    textVue = textVue.replace('%\'title\'%', i.title)
    textVue = textVue.replace('%\'content\'%', i.content)
    fs.writeFile(path.join(__dirname, `/src/pages/news-details-${i.article_id}.vue`), textVue, 'utf8', (err) => {
      if (err)
        throw err
    })


  })
}
function createdNewsDetailsMobi(list: any) {
  const newsDetailsVue = fs.readFileSync(path.join(__dirname, '/src/plugins/news_details_mobi.vue'), 'utf8')
  for (let index = 0; index < list.length; index++) {
    list[index].content = replaceImgPrefix(list[index].content)
    let textVue = newsDetailsVue.replace('%\'title\'%', list[index].title)
    textVue = textVue.replace('%\'date\'%', list[index].date)
    textVue = textVue.replace('%\'content\'%', list[index].content)
    if (index + 3 < list.length) {
      let newsList = ''
      for (let j = 1; j < 4; j++) {
        let recommend = recommendItem.replace('{{image}}', list[index + j].image)
        recommend = recommend.replace('{{title}}', list[index + j].title)
        recommend = recommend.replace('{{description}}', list[index + j].description)
        recommend = recommend.replace('{{article_id}}', list[index + j].article_id)
        newsList += recommend
      }
      textVue = textVue.replace('%\'recommend\'%', newsList)
    }

    fs.writeFile(path.join(__dirname, `/src/pages/news-details-mobi-${list[index].article_id}.vue`), textVue, 'utf8', (err) => {
      if (err)
        throw err
      // console.log('success', list[index].article_id)
    })
  }
}

function createdNewsNginxConf(list: any) {
  let confList = ''
  list.forEach((i: any) => {
    let text = nginxCofItem.replace('{{path}}', `/news-details-${i.article_id}`)
    text = text.replace('{{htmlName}}', `news-details-${i.article_id}.html`)
    confList += text
  })
  websiteConf = websiteConf.replace('#%newDetails%', confList)
}
function createdNewsMobiNginxConf(list: any) {
  let confList = ''
  list.forEach((i: any) => {
    let text = nginxCofMobiItem.replace('{{path}}', `/news-details-mobi-${i.article_id}`)
    text = text.replace('{{htmlName}}', `news-details-mobi-${i.article_id}.html`)
    confList += text
  })
  const textVue = websiteConf.replace('#%newDetailsMobi%', confList)
  fs.writeFile(path.join(__dirname, '/website.conf'), textVue, 'utf8', (err) => {
    if (err)
      throw err
    console.log('website.conf success')
  })
}

function getNews() {
  return new Promise((resolve, reject) => {
    try {
      const body: any = []
      https.get('https://api.yeez.tech/article', (res) => {
        res.on('data', (d) => {
          // console.log('https data')
          body.push(d)
        }).on('error', (e) => {
          console.log('https error', e)
          reject(e)
        })
        res.on('end', () => {
          console.log('get end')
          // eslint-disable-next-line n/prefer-global/buffer
          const buf = Buffer.concat(body)
          if (res.statusCode === 200)
            resolve(buf.toString())

          else
            reject(buf.toString())
        })
      })
    }
    catch (err) {
      console.log('https support is disabled!')
    }
  })
}

init()
