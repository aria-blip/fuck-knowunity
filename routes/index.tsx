import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import Inputfield from "../islands/Inputfield.tsx";
import Searchfield from "../islands/searchbox.tsx";


export default function Home() {
  const count = useSignal(3);
  var thesig=useSignal("")
  return (

    <div class="px-4 py-8 mx-auto ">

<Searchfield></Searchfield>

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
          <Inputfield textvalue={thesig}></Inputfield>
       {//<Counter count={count} />
       } 
      </div>
    </div>
  );
}
