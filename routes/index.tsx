import { useSignal,Signal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import Inputfield from "../islands/Inputfield.tsx";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

import Searchfield from "../islands/searchbox.tsx";


export default function Home(props: PageProps) {
  let thesig=useSignal("")
  let theimglist:Signal<string[]>=useSignal([])

  const url = new URL(props.url);
  const urls = url.searchParams.getAll("url"); 
  for(var i of urls){
    theimglist.value=[...theimglist.value,i]
  }

  return (

    <div class="px-4 py-8 mx-auto ">


      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
   <div class="header-container">
    <div class="decorative-line"></div>
    <h1>Welcome to <span class="blue-text"> F***</span> <span class="yellow-highlight">Knowunity</span></h1>
    <div class="decorative-line"></div>
  </div>
  <br></br>
  <h4>Du kannst knowunity link hier kopieren (durch den App -&gt; Auf gewünchte Know -&gt; pfdeil oben klicken -&gt; link hier pasten ) </h4>
          <Inputfield textvalue={thesig} imageslist={theimglist}></Inputfield>
       {//<Counter count={count} />
       } 
       <hr></hr>

  <h4>Wenn du kein Link findest schreibe die Keywords hier - durch Knowunity </h4>

<Searchfield textinput="Suche durch Knowunity (dauert länger 1min )" searchgoogle="false" ></Searchfield>
<hr></hr>
<h4>Wenn du kein Link findest schreibe die Keywords hier - durch Google </h4>

<Searchfield textinput="Suche durch Google (dauert schneller 5 sekunden)" searchgoogle="true" ></Searchfield>
      </div>
    </div>
  );
}
