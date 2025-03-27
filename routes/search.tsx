
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { needsEncoding } from "$std/media_types/_util.ts";
import { parseJsrSpecifier } from "https://jsr.io/@luca/esbuild-deno-loader/0.11.0/src/shared.ts";
import puppeteer from "npm:puppeteer";

import {
    search,
    OrganicResult, // Import the result types you need
    DictionaryResult,
    ResultTypes,
    searchWithPages
    // Import to filter results by type
  } from "npm:google-sr";
  import list from "npm:postcss@8.4.35/lib/list";
  import CardModel from "../islands/cardfield.tsx";
  import Searchfield from "../islands/searchbox.tsx";

interface Data {
    foo: string[][];
    frompuppet:boolean;
  }


class Link  {
    url:string
    titel:string
    description:string
    constructor( theurl: string,  tite: string,  descrip: string) {
        this.url=theurl
        this.titel=tite
        this.description=descrip
    }
}
  
  export const handler: Handlers<Data> = {

    async GET(req, ctx) {

        var listoflinks:string[][]=[]
        var ispuppet=false;
        const message = decodeURIComponent(ctx.url.searchParams.get("name") || "");
        var knows=await  startpupetter("sport")
        if(knows.length>1){
          ispuppet=true;
          listoflinks=knows;
        }else{
        const queryResult = await search({
            query: "site:https://knowunity.de/knows/ "+message,
            // Specify the result types explicitly ([OrganicResult] is the default, but it is recommended to always specify the result type)
            resultTypes: [OrganicResult, DictionaryResult],
            // Optional: Customize the request using AxiosRequestConfig (e.g., enabling safe search)
            requestConfig: {
              params: {
                safe: "active", 
                // Enable "safe mode"
              },
            },
          });
          
          // will return a SearchResult[]
          for (const i of queryResult) {
              if (i && 'description' in i) {
                if (i.description && i.link && i.title !== null) {

                  var urlstring:string[] = await getfirstimage(extractUUID(i.link))

                    listoflinks.push([i.description,i.title,...urlstring]);
                }
            }
          }
        }
      return ctx.render({ foo: listoflinks ,frompuppet:ispuppet});
    },
  };
export default  function Search(probs:PageProps<Data>) {
    const url = probs.url
    var listof:preact.JSX.Element[]=[];
    if (!probs.data || !probs.data.foo) {
      return <p>No data available.</p>;
  }

    for(var a of probs.data.foo){
        
        

        listof.push(
              <CardModel cardtitle={a[1]} carddescription={a[0]} cardimage={a.slice(2)}></CardModel>
        )

    }

    return (
            <>
            <Searchfield></Searchfield>
            <br></br>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

</div>
{listof}
            </>
    )
}

async function  getfirstimage(codedurl:string):Promise<string[]>{

  var res= await fetch("https://apiedge-eu-central-1.knowunity.com/knows/"+codedurl)
  var objectjson=await res.json()
  var x:number=0;
  var imagesurl: string[]=[]
  try{
  for(var i of objectjson.knowDocumentPages){
    imagesurl.push(i.imageUrl)
  }

  imagesurl=imagesurl.toReversed();
  }catch{
    console.log("error")
  }
  return imagesurl;

}

function extractUUID(url: string): string | "" {
  // Regular expression to match UUID format in the URL
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  
  // Find the UUID in the URL
  const match = url.match(uuidRegex);
  
  // Return the UUID if found, otherwise return null
  return match ? match[0] : "";
}





async function startpupetter(searchinput:string):Promise<string[][]>{
  var theultimatelist:string[][]=[];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1900, height: 1024});
  
  await page.goto("https://knowunity.de/auth/signin");
  console.log("done");
  
  
  
  const element = await page.waitForSelector('::-p-xpath(//*[@id="email"])');
  const element2 = await page.waitForSelector('::-p-xpath(//*[@id="password"])');
  
  if(element && element2) {
    console.log("element found");
    await element.type("realyohanliebert@gmail.com");
    await element2.type("Aria2005");
  
  
    const loginbutt = await page.waitForSelector('::-p-xpath(//*[@id="__next"]/div/main/div/div[2]/div/div[3]/div[1]/form/div/button)');
    
    if(loginbutt) {
      console.log("login button found");
      await loginbutt.click();
      try {
        const loginbuttt = await page.waitForSelector('::-p-xpath(/html/body/div[2]/div/div/div/div/div[2]/div/div[2]/div)');
        if(loginbuttt) {
             console.log("element found");
        await getknows(searchinput).then((value) => {
          for (let i = 0; i < value.length; i++) {
         //  console.log(value[i][0]); 0 is secret imag code
          //  console.log(value[i][1]); 1 is title
            console.log(value[i][1]); // 2 is desc


          }
          theultimatelist=value;
          return value;
        });    
          
          
          return theultimatelist;
  
        }
  
  
      
      }
      catch(e) {
        return theultimatelist;}
        
  
  }
  }
  return theultimatelist;
  
  
  
  async function getknows(theurlsearch:string):Promise<string[][]>{
    var finallist:string[][]=[];
    theurlsearch=theurlsearch.replace(" ","+");
    const theurl="https://knowunity.de/app/search?query="+ theurlsearch +"+&subjectId=&utm_content=app_header"
    await page.goto(theurl);
    const firstdiv = await page.waitForSelector('::-p-xpath(//*[@id="__next"]/div/main/div/div/main/div[1]/div/div[2]/div/div[2]/div/div[1]/div[2]/div[1])').then(async () => {
      var broken=false
      for (let i = 1; i < 250; i++) {
        try{  	                  

          let listofimgages: string[] = [];
          var title:any= await page.waitForSelector('::-p-xpath(//*[@id="__next"]/div/main/div/div/main/div[1]/div/div[2]/div/div[2]/div/div['+i+']/div[2]/div[3]/div[2]/p[1])',{timeout: 1000});
          var desc:any=await page.waitForSelector('::-p-xpath(//*[@id="__next"]/div/main/div/div/main/div[1]/div/div[2]/div/div[2]/div/div['+i+']/div[2]/div[3]/div[2]/p[2])',{timeout: 1000});
          var aa:any= await page.waitForSelector('::-p-xpath(//*[@id="__next"]/div/main/div/div/main/div[1]/div/div[2]/div/div[2]/div/div['+i+']/div[2]/div[1]/img)',{timeout: 1000});
          if (aa && title && desc) {
            const descText:any = await desc.evaluate((desc: { innerText: any; }) =>  desc.innerText); // Get the innerHTML of the element
            const titleText :any= await title.evaluate((title: { innerText: any; }) => title.innerText); // Get the innerText of the element
            const imageSrc:any = await aa.evaluate((img:{ src: any; }) => img.src); // Get the src attribute
            if(imageSrc.length<95){
            let updatedimg: string = "";
            const match = imageSrc.match(/CONTENT\/([^_]+)/);
            
            if (match) {
                updatedimg = match[1];
            }
            for (let i = 1; i < 20; i++) {
              let vo=(await fetch("https://content-eu-central-1.knowunity.com/CONTENT/"+updatedimg[1]+"_image_page_"+i.toString+".webp")).ok

              if(vo==false){
                break;
              }

              listofimgages.push("https://content-eu-central-1.knowunity.com/CONTENT/"+updatedimg[1]+"_image_page_"+i.toString+".webp");
            }
           // console.log(updatedimg[1]);
            finallist.push([descText.toString(),titleText.toString(),...listofimgages]);

          }
  
  
          } else {
            console.log("Selector 'aa' is null");
          }
          
        }catch(e){
          broken=true;
        }
        if(broken){
          break;
        }
      
    }});
    console.log("done");
  page.close();
  browser.close();
    return finallist;
  
  }
  }
  