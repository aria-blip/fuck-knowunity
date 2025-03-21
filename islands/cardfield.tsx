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


<div class="card">
      <div class="card-content p-3">
        <h2 class="card-title">{cardtitle}</h2>
          <p class="card-description">{carddescription}</p>
      </div>

      {cardimage.length > 1 ? (
        <div id={sanitizedId} class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            {cardimage.map((img, index) => (
              <div class={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img src={img} class="d-block w-100" alt="Slide" />
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
          <img src={cardimage[0]} class="d-block w-100" alt="Card Image" />
        </div>
      )}
    </div>
</>
    )

}