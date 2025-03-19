
import { denoPlugins } from "$fresh/src/build/deps.ts";
import { FreshContext ,RouteContext,Handlers, PageProps} from "$fresh/server.ts";
import { Button } from "../components/Button.tsx";
import { ComponentChildren } from "preact";
import { useSignal ,Signal} from "@preact/signals";
import { ComponentChild } from "preact/src/index.d.ts";
import { useEffect } from "preact/hooks";


interface Props {
  textvalue : Signal<string>; // 🔹 Accept signal as prop
}

 export default function Inputfield({textvalue}:Props) {
    var items:Signal<string[]>=useSignal([])
    useEffect(() => {
      
      async function fetchData() {
        console.log("aa")

      var res= await fetch("https://apiedge-eu-central-1.knowunity.com/knows/"+textvalue.value)
      

      res= await fetch("https://apiedge-eu-central-1.knowunity.com/knows/"+textvalue.value)
      var objectjson=await res.json()
      
      for (const page of objectjson.knowDocumentPages) {
        items.value=[...items.value,page.imageUrl] 

         console.log(page.imageUrl)
      
      }
      


      console.log("aa")
   
      }

      if(textvalue.value!=""){
      fetchData();
      }else{
        console.log("error couldntr find")
      }

      
    }, [textvalue.value]); // Re-fetch when `count.value` changes
  

  return (
        <>
     
    <div class="input-container">
        <span class="input-prefix">  `{'>'}` </span>
        <input class="hacker-input"  onInput={(event:InputEvent
        )=> {const target = event.target as HTMLInputElement;
          textvalue.value =extractUUID(target.value)  } } type="text" placeholder="Enter command..." autocomplete="off" /> 
    </div>

    <h2>{ extractUUID( textvalue.value ) }</h2>
    <div class="image-container">
     <h1>{ textvalue.value} ss </h1> 
    {returnedlists(items.value)
    }
</div>
    </> 
  )
}
function returnedlists (imageurl:string[]): preact.JSX.Element[] {
  var listofdiv=[] 
  for(var imurl of imageurl){
    listofdiv.push(
      <div class="image-item">
        <h3>{imurl}jj</h3>
        <img src={imurl} ></img>
      {console.log("jjij")}
    </div>
    )
  }
  return listofdiv
  
}

function extractUUID(url: string): string | "" {
    // Regular expression to match UUID format in the URL
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
    
    // Find the UUID in the URL
    const match = url.match(uuidRegex);
    
    // Return the UUID if found, otherwise return null
    return match ? match[0] : "";
  }
