import { useSignal ,Signal} from "@preact/signals";
import { ComponentChild } from "preact/src/index.d.ts";
import { useEffect } from "preact/hooks";

interface Props {
    cardtitle:string,
    carddescription:string,
    cardimage:string[]
}
  
export default function CardModel({cardtitle,carddescription,cardimage}:Props) {

    const currentIndex = useSignal(0);

    const nextImage = () => {
      currentIndex.value = (currentIndex.value + 1) % cardimage.length;
    };
  
    const prevImage = () => {
      currentIndex.value = (currentIndex.value - 1 + cardimage.length) % cardimage.length;
    };
    const sanitizedId = `carousel-${cardtitle.replace(/[^a-zA-Z0-9-_]/g, "")}`;

return (
<>




<div class="card" onClick={ () => {

const urlParams = cardimage.map(url => `url=${encodeURIComponent(url)}`).join('&');
globalThis.location.href = `../?${urlParams}`;
}}>
<div class="card-content">
    <h2 class="card-title">{cardtitle}</h2>
    <div class="d-flex align-items-center justify-content-between">
      <p class="card-description flex-grow-1 me-2 w-70">{carddescription}</p>
      <button class="download-btn w-30" onClick={async ()=> {
console.log("working")
const urlParams = cardimage.map(url => `url=${encodeURIComponent(url)}`).join('&');
globalThis.location.href = `../greet/download?${urlParams}`;
 
}}>
      <img       onError={(e) => (e.currentTarget.style.display = "none")} 
 src="https://cdn-icons-png.flaticon.com/512/0/532.png" alt="Download Icon" class="download-icon"></img>
      </button>
    </div>
  </div>

  {cardimage.length > 100 ? (
  <div id={sanitizedId} class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      {cardimage.slice(0, 6).map((img, index) => ( // Maximal 6 Bilder
        <div class={`carousel-item ${index === 0 ? "active" : ""}`}>
          <img       onError={(e) => (e.currentTarget.style.display = "none")} 
 src={img} class="d-block w-100" alt="Slide" />
        </div>
      ))}
    </div>

    {/* Carousel Controls */}
    <button class="carousel-control-prev" type="button" data-bs-target={`#${sanitizedId}`} data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target={`#${sanitizedId}`} data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
) : (
  <div class="card-image">
    <img 
      src={cardimage[0]} 
      onError={(e) => (e.currentTarget.style.display = "none")} 
      class="d-block w-100" 
      alt="Card Image" 
    />
  </div>
)}
    </div>
</>
    )

}