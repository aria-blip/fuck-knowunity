import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import Inputfield from "../islands/Inputfield.tsx";


export default function Home() {
  const count = useSignal(3);
  var thesig=useSignal("")
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to FUCK KNOWUNITY  {thesig.value}</h1>
        <Inputfield textvalue={thesig}></Inputfield>
       {//<Counter count={count} />
       } 
      </div>
    </div>
  );
}
