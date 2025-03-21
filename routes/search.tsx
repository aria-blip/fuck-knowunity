
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { needsEncoding } from "$std/media_types/_util.ts";
import { parseJsrSpecifier } from "https://jsr.io/@luca/esbuild-deno-loader/0.11.0/src/shared.ts";
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

interface Data {
    foo: string[][];
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
        console.log("search")
        var listoflinks:string[][]=[]
        
        const message = decodeURIComponent(ctx.url.searchParams.get("name") || "");

        
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
          console.log(listoflinks+"listoflinks")
      return ctx.render({ foo: listoflinks });
    },
  };
export default  function Search(probs:PageProps<Data>) {
    const url = probs.url
    var listof:preact.JSX.Element[]=[];
    if (!probs.data || !probs.data.foo) {
      console.log( probs.data)
      return <p>No data available.</p>;
  }

    for(var a of probs.data.foo){
        
        

        listof.push(
            CardModel({cardtitle:a[1],carddescription:a[0],cardimage:a.slice(2)})
        )
        console.log(a[2])

    }

    return (
            <>
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
  imagesurl.push(objectjson.knowDocumentPages[0].imageUrl)
  imagesurl.push(objectjson.knowDocumentPages[1].imageUrl)
  imagesurl.push(objectjson.knowDocumentPages[2].imageUrl)
  imagesurl.push(objectjson.knowDocumentPages[3].imageUrl)

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
