import { useSignal ,Signal} from "@preact/signals";
import { ComponentChild } from "preact/src/index.d.ts";
import { useEffect } from "preact/hooks";

interface Props {
  searchgoogle:string
  textinput:string
}


export default function Searchfield({searchgoogle,textinput}:Props) {
    var textvalue= useSignal("")

    var skd=searchgoogle+"-input-container"

  return (
        <>
     



    <div class={skd }>
    <input type="text"  onInput={(event:InputEvent
        )=> {const target = event.target as HTMLInputElement;
          textvalue.value =target.value 
        
        } 
          
          }  id="inputli" class="input-field" placeholder={textinput}  />


    <button class="search-button" onClick={ ()=> { 
          globalThis.location.href = "../search?name=" + 
          encodeURIComponent(textvalue.value)+ 
          "&google=" + searchgoogle;
    }  
  } >
      <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#806600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </button>
  </div>
  <br></br>

    </> 
  )
}